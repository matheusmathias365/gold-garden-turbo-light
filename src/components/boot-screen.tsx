import { useEffect, useState } from "react";
import { useProgress } from "@/lib/progress";
import { sanitizeCallsign } from "@/lib/safe";
import { Btn } from "@/components/ui";
import { LegalNotice } from "@/components/legal-notice";
import { CrtFrame, Ticker } from "@/components/shell";
import { cn } from "@/lib/utils";

type Phase = "intrude" | "load" | "reveal" | "ident";

const INTRUDE = [
  "abrindo canal não autorizado…",
  "handshake com o dispositivo: ok",
  "sessão sem segundo fator",
  "coletando metadados da tela",
  "indexando histórico de cliques",
  "montando lote para venda…",
];

const FILES = [
  { at: 8, name: "sessao.dump" },
  { at: 22, name: "cliques.log" },
  { at: 38, name: "identidade.cache" },
  { at: 54, name: "lote_4412.pack" },
  { at: 72, name: "INTERCEPTADO — soc_v2.4" },
  { at: 88, name: "dossie_caso-001.sig" },
];

export function BootScreen() {
  const [reduce, setReduce] = useState(false);
  const [phase, setPhase] = useState<Phase>("intrude");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) setPhase("ident");
  }, []);

  function skip() {
    setPhase("ident");
  }

  if (phase === "ident") {
    return <IdentPhase reduce={reduce} />;
  }

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="vignette pointer-events-none absolute inset-0" />
      <div className="crt-scanlines pointer-events-none absolute inset-0 z-40 opacity-40" />
      <button
        type="button"
        onClick={skip}
        className="absolute right-4 top-4 z-50 min-h-11 px-3 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        PULAR INTRO
      </button>
      <div className="relative z-10">
        {phase === "intrude" ? (
          <IntrudePhase onDone={() => setPhase("load")} />
        ) : null}
        {phase === "load" ? (
          <LoadPhase onDone={() => setPhase("reveal")} />
        ) : null}
        {phase === "reveal" ? (
          <RevealPhase onDone={() => setPhase("ident")} />
        ) : null}
      </div>
    </div>
  );
}

function IntrudePhase({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [ranked, setRanked] = useState(false);

  useEffect(() => {
    if (shown < INTRUDE.length) {
      const t = window.setTimeout(() => setShown((n) => n + 1), 420);
      return () => window.clearTimeout(t);
    }
    const hold = window.setTimeout(() => setRanked(true), 280);
    return () => window.clearTimeout(hold);
  }, [shown]);

  useEffect(() => {
    if (!ranked) return;
    const t = window.setTimeout(onDone, 1600);
    return () => window.clearTimeout(t);
  }, [ranked, onDone]);

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-10">
      <p className="font-mono text-[10px] tracking-[0.28em] text-danger">
        CANAL NÃO AUTORIZADO
      </p>
      <div className="mt-6 space-y-1.5 font-mono text-xs leading-relaxed">
        {INTRUDE.slice(0, shown).map((line) => (
          <p key={line} className="text-muted">
            <span className="text-danger">›</span> {line}
          </p>
        ))}
        {!ranked ? (
          <p>
            <span className="cursor-blink text-danger">_</span>
          </p>
        ) : null}
      </div>
      {ranked ? (
        <div className="glitch-shift danger-pulse mt-10 rounded-md border border-danger/50 bg-danger/10 px-4 py-6">
          <p className="font-mono text-[10px] tracking-[0.22em] text-danger">
            ALERTA
          </p>
          <p className="mt-2 font-display text-3xl font-semibold leading-tight tracking-tight text-danger md:text-4xl">
            Seus dados foram
            <br />
            ranqueados.
          </p>
          <p className="mt-3 font-mono text-xs text-muted">
            lote #4412 · venda em leilão silencioso
          </p>
        </div>
      ) : null}
    </main>
  );
}

function LoadPhase({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setPct((n) => {
        if (n >= 100) return 100;
        return Math.min(100, n + 2);
      });
    }, 55);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (pct < 100) return;
    const t = window.setTimeout(onDone, 700);
    return () => window.clearTimeout(t);
  }, [pct, onDone]);

  const file =
    [...FILES].reverse().find((f) => pct >= f.at)?.name ?? "boot.img";
  const intercepted = pct >= 72;

  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-10">
      <p
        className={cn(
          "font-mono text-[10px] tracking-[0.28em]",
          intercepted ? "text-accent" : "text-danger",
        )}
      >
        {intercepted ? "SOC v2.4 — INTERCEPTAÇÃO" : "EXFILTRANDO ARQUIVO"}
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
        {intercepted ? "Arquivo recuperado" : "Carregando arquivo"}
      </h1>
      <p className="mt-2 font-mono text-xs text-muted">{file}</p>
      <div
        className="mt-6 h-2 overflow-hidden rounded-xs bg-border"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full transition-[width] duration-75",
            intercepted ? "bg-accent" : "bg-danger",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-xs tabular-nums text-dim">{pct}%</p>
      <div className="mt-6 space-y-1 font-mono text-[11px] text-dim">
        {FILES.filter((f) => pct >= f.at).map((f) => (
          <p key={f.name}>
            <span className={f.at >= 72 ? "text-accent" : "text-danger"}>
              {f.at >= 72 ? "[ok]" : "[..]"}
            </span>{" "}
            {f.name}
          </p>
        ))}
      </div>
    </main>
  );
}

function RevealPhase({ onDone }: { onDone: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center px-5 py-10 stagger-in">
      <p className="font-mono text-[10px] tracking-[0.28em] text-accent">
        SIMULAÇÃO ENCERRADA
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight">
        Isso não era real.
        <br />
        <span className="text-accent">Mas poderia ser.</span>
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
        A tela vermelha, a pressa, o arquivo “seu”. É assim que o phishing
        começa: você sente antes de pensar. Nada disso sai deste aparelho —
        não há coleta de IP, câmera ou microfone. Agora você entra na
        operação — do outro lado da armadilha.
      </p>
      <div className="mt-8">
        <Btn onClick={onDone}>Assumir o posto</Btn>
      </div>
    </main>
  );
}

function IdentPhase({ reduce }: { reduce: boolean }) {
  const setCallsign = useProgress((s) => s.setCallsign);
  const completeBoot = useProgress((s) => s.completeBoot);
  const [name, setName] = useState("");
  const [accepted, setAccepted] = useState(false);
  const clean = sanitizeCallsign(name);
  const valid = clean.length >= 2 && clean.length <= 16;

  function enter() {
    if (!valid || !accepted) return;
    setCallsign(clean);
    completeBoot();
  }

  function enterAnon() {
    if (!accepted) return;
    setCallsign("AGENTE");
    completeBoot();
  }

  return (
    <CrtFrame>
      <Ticker />
      <main className="mx-auto flex min-h-[calc(100dvh-36px)] max-w-xl flex-col justify-center px-5 py-10">
        <p className="font-mono text-[10px] tracking-[0.28em] text-danger">
          ARQUIVO CONFIDENCIAL
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight text-fg md:text-5xl">
          Operação
          <br />
          <span className="text-accent">Phishing</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Você acabou de sentir o golpe. Agora o dossiê. Missão:
          cibersegurança.
        </p>
        <form
          className="mt-8 stagger-in space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            enter();
          }}
        >
          <LegalNotice compact />
          <label className="flex min-h-11 cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 size-4 shrink-0 accent-accent"
            />
            <span className="text-sm leading-relaxed text-muted">
              Li e aceito: este material é apenas educacional. Qualquer ato
              praticado a partir dele é de minha responsabilidade e está
              sujeito à lei.
            </span>
          </label>
          <label
            htmlFor="callsign"
            className="block font-mono text-[10px] tracking-[0.22em] text-muted"
          >
            IDENTIFIQUE-SE, AGENTE
          </label>
          <input
            id="callsign"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={16}
            value={name}
            onChange={(e) => setName(sanitizeCallsign(e.target.value))}
            placeholder="CALLSIGN"
            className="-mt-3 h-12 w-full rounded-sm border border-border bg-surface px-3 font-mono text-sm uppercase tracking-[0.2em] text-fg placeholder:text-dim focus-visible:border-accent"
          />
          <div className="flex flex-wrap gap-3">
            <Btn type="submit" disabled={!valid || !accepted}>
              Iniciar missão
            </Btn>
            <Btn
              type="button"
              variant="ghost"
              disabled={!accepted}
              onClick={enterAnon}
            >
              Entrar anônimo
            </Btn>
          </div>
        </form>
      </main>
    </CrtFrame>
  );
}
