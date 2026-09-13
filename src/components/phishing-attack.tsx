import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AttackStep =
  | "notify"
  | "sms"
  | "cursor"
  | "click"
  | "dump"
  | "ranked"
  | "soc";

const BEATS: { step: AttackStep; ms: number }[] = [
  { step: "notify", ms: 1400 },
  { step: "sms", ms: 2800 },
  { step: "cursor", ms: 1400 },
  { step: "click", ms: 520 },
  { step: "dump", ms: 2200 },
  { step: "ranked", ms: 2000 },
  { step: "soc", ms: 2600 },
];

const DUMP = [
  "abrindo canal não autorizado…",
  "handshake: ok",
  "sessão sem 2FA",
  "exfiltrando sessao.dump",
  "indexando cliques.log",
  "lote #4412 montado",
];

export function PhishingAttack({
  reduce,
  onStep,
}: {
  reduce: boolean;
  onStep?: (step: AttackStep) => void;
}) {
  const [step, setStep] = useState<AttackStep>(reduce ? "ranked" : "notify");
  const [dumpN, setDumpN] = useState(0);
  const [clock, setClock] = useState(10 * 60);

  useEffect(() => {
    onStep?.(step);
  }, [step, onStep]);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let timer: number;
    const play = () => {
      const beat = BEATS[i];
      if (!beat) return;
      setStep(beat.step);
      if (beat.step === "dump") setDumpN(0);
      if (beat.step === "sms") setClock(10 * 60);
      timer = window.setTimeout(() => {
        i = (i + 1) % BEATS.length;
        play();
      }, beat.ms);
    };
    play();
    return () => window.clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    if (reduce || step !== "dump") return;
    setDumpN(1);
    const t = window.setInterval(() => {
      setDumpN((n) => (n >= DUMP.length ? n : n + 1));
    }, 280);
    return () => window.clearInterval(t);
  }, [step, reduce]);

  useEffect(() => {
    const live = step === "sms" || step === "cursor" || step === "click";
    if (reduce || !live) return;
    const t = window.setInterval(() => {
      setClock((c) => Math.max(0, c - 1));
    }, 80);
    return () => window.clearInterval(t);
  }, [step, reduce]);

  const showSms = step === "sms" || step === "cursor" || step === "click";
  const red = step === "click" || step === "dump" || step === "ranked";
  const mm = String(Math.floor(clock / 60)).padStart(2, "0");
  const ss = String(clock % 60).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden px-4 pb-8 pt-10",
        red ? "bg-[#14090b]" : step === "soc" ? "bg-[#07140c]" : "bg-bg",
      )}
    >
      <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.18em] text-dim">
        <span>
          {step === "soc"
            ? "SOC v2.4"
            : showSms || step === "notify"
              ? "iMessage"
              : "INTRUSÃO"}
        </span>
        <span className={red ? "text-danger" : "text-accent"}>
          {showSms ? `${mm}:${ss}` : "agora"}
        </span>
      </div>

      {step === "notify" ? (
        <div className="sms-in mt-14 rounded-2xl border border-border bg-surface-2/90 px-4 py-4 shadow-panel backdrop-blur-sm">
          <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
            1 NOVA MENSAGEM
          </p>
          <p className="mt-2 text-base font-medium">NuvemBank</p>
          <p className="mt-1 text-sm text-muted">
            Acesso suspeito. Confirme em 10 min…
          </p>
        </div>
      ) : null}

      {showSms ? (
        <div className="sms-in mt-8 space-y-3">
          <p className="text-center font-mono text-[10px] text-dim">
            NuvemBank · SMS
          </p>
          <div className="rounded-2xl rounded-tl-sm bg-surface px-4 py-4 text-[13px] leading-relaxed shadow-panel">
            <p>
              <span className="font-medium">NUVEMBANK:</span> Detectamos um
              acesso suspeito. Sua conta será{" "}
              <span className="text-danger">BLOQUEADA em {mm}:{ss}</span>.
            </p>
            <p className="mt-2">
              Confirme sua identidade:
              <br />
              <span className="text-accent underline decoration-dotted underline-offset-2">
                nuvembank-seguro.tk/acesso
              </span>
            </p>
          </div>
          <div className="relative">
            <div
              className={cn(
                "flex h-11 items-center justify-center rounded-md font-mono text-[11px] tracking-[0.14em]",
                step === "click" ? "bg-danger text-fg" : "bg-accent text-bg",
              )}
            >
              CONFIRMAR IDENTIDADE
            </div>
            {step === "cursor" || step === "click" ? (
              <span
                className={cn(
                  "pointer-events-none absolute size-5 rounded-full border-2 border-fg/90 bg-fg/25",
                  step === "cursor" && "cursor-to-click",
                  step === "click" && "right-8 top-3",
                )}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {step === "dump" ? (
        <div className="mt-10 space-y-1.5 font-mono text-[11px] text-danger">
          {DUMP.slice(0, dumpN).map((line) => (
            <p key={line}>› {line}</p>
          ))}
          <p>
            <span className="cursor-blink">_</span>
          </p>
        </div>
      ) : null}

      {step === "ranked" ? (
        <div className="glitch-once mt-12">
          <p className="font-mono text-[10px] tracking-[0.22em] text-danger">
            ALERTA
          </p>
          <p className="mt-3 font-display text-[1.85rem] font-semibold leading-[1.05] text-danger">
            Seus dados foram ranqueados.
          </p>
          <p className="mt-4 font-mono text-[10px] text-dim">
            lote #4412 · leilão silencioso
          </p>
        </div>
      ) : null}

      {step === "soc" ? (
        <div className="mt-12">
          <p className="font-mono text-[10px] tracking-[0.18em] text-accent">
            INTERCEPTADO
          </p>
          <p className="mt-3 font-display text-[1.7rem] font-semibold leading-tight">
            Isso não era real.
          </p>
          <div className="mt-6 h-1.5 overflow-hidden rounded-xs bg-border">
            <div className="bar-fill h-full bg-accent" />
          </div>
          <p className="mt-2 font-mono text-[10px] text-dim">
            dossie_caso-001.sig · 72%
          </p>
        </div>
      ) : null}

      {step === "click" ? (
        <div className="pointer-events-none absolute inset-0 bg-danger/25" />
      ) : null}
    </div>
  );
}

export function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-[2.4rem] border border-white/10 bg-[#0a100d] p-[10px] shadow-[0_40px_80px_-32px_rgb(0,0,0,0.85),0_0_0_1px_#1c2c24]">
      <div className="absolute left-1/2 top-3 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="aspect-[9/16] overflow-hidden rounded-[1.85rem] bg-bg">
        {children}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
        <div className="h-1 w-24 rounded-full bg-fg/25" />
      </div>
    </div>
  );
}
