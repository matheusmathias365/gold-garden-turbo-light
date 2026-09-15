import { useEffect, useState } from "react";
import { Link, Navigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { AgentCertificate } from "@/components/certificate";
import { Btn, Callout } from "@/components/ui";
import {
  ELO_EVIDENCE,
  ELO_IDS,
  ELO_TECH,
  X_CASE_ID,
  X_SERIES,
  adjacentElo,
  eloById,
  judgeElo,
  type EloEv,
} from "@/lib/elo-caso";
import { useProgress } from "@/lib/progress";
import { useSessionXp, xOpen } from "@/lib/session-xp";
import { VOZ_CASE_ID } from "@/lib/voz-caso";
import { cn } from "@/lib/utils";

export function EloCase({ evId }: { evId?: string }) {
  const xAt = useProgress((s) => s.xAt);
  const vozAt = useProgress((s) => s.vozAt);
  const completed = useProgress((s) => s.completed);
  const done = completed.includes(X_CASE_ID) || Boolean(xAt);
  const voz = completed.includes(VOZ_CASE_ID) || Boolean(vozAt);
  if (!xOpen(voz, done)) return <Navigate to="/jogar" />;

  const ev = evId ? eloById(evId) : null;
  if (evId && !ev) {
    return (
      <div>
        <p className="font-mono text-sm text-danger">Evidência não catalogada.</p>
        <Link to="/x" className="mt-4 inline-block">
          <Btn variant="ghost">Voltar ao arquivo</Btn>
        </Link>
      </div>
    );
  }
  if (!ev) return <EloIndex />;
  const i = ELO_IDS.indexOf(ev.id);
  const prior = i <= 0 ? true : completed.includes(ELO_IDS[i - 1]!);
  if (!prior) return <Navigate to="/x" />;
  return <EloView key={ev.id} ev={ev} />;
}

function EloIndex() {
  const completed = useProgress((s) => s.completed);
  const callsign = useProgress((s) => s.callsign);
  const xAt = useProgress((s) => s.xAt);
  const issueX = useProgress((s) => s.issueX);
  const closed = completed.includes(X_CASE_ID);
  const n = ELO_IDS.filter((id) => completed.includes(id)).length;

  return (
    <div>
      <Link
        to="/jogar"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Quartel · arquivos
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-danger">
        ARQUIVO RESTRITO · X-001 · CRÍTICO
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        O elo mais fraco
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Relatório interno. Uma funcionária recebeu ligação de quem dizia ser o
        suporte de TI: atividade suspeita na conta. Ela desconfiou. Depois
        acreditou. Como o atacante ganhou a confiança? Reconhecer a armadilha —
        nunca montá-la.
      </p>
      <p className="mt-2 font-mono text-xs text-dim">
        {n}/{ELO_IDS.length} evidências · lacre da voz
      </p>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {ELO_EVIDENCE.map((e, i) => {
          const ok = completed.includes(e.id);
          const open = i === 0 || completed.includes(ELO_IDS[i - 1]!);
          const inner = (
            <>
              <span className="w-28 font-mono text-[10px] tracking-widest text-dim">
                {e.code}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{e.title}</p>
                <p className="truncate text-sm text-muted">{e.kicker}</p>
              </div>
              {ok ? (
                <Check className="size-4 text-accent" />
              ) : open ? (
                <ArrowRight className="size-4 text-dim" />
              ) : (
                <Lock className="size-4 text-dim" />
              )}
            </>
          );
          return (
            <li key={e.id}>
              {open ? (
                <Link
                  to="/x/$id"
                  params={{ id: e.id }}
                  className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex min-h-14 items-center gap-3 px-4 py-3 opacity-50">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {closed ? (
        <div className="mt-10 space-y-8">
          <Finale />
          <AgentCertificate
            callsign={callsign}
            ready
            remaining={0}
            issuedAt={xAt}
            onIssue={issueX}
            series={X_SERIES}
            caseCode="ARQUIVO X-001  ·  O ELO MAIS FRACO"
            blurb="Por concluir o treino educacional do Arquivo X — reconhecer engenharia social: autoridade, urgência, confiança e o momento em que a vítima entrega a informação."
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Arquive as cinco evidências. A sequência importa.
        </p>
      )}
    </div>
  );
}

function EloView({ ev }: { ev: EloEv }) {
  const completed = useProgress((s) => s.completed);
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const issueX = useProgress((s) => s.issueX);
  const { next } = adjacentElo(ev.id);

  const [pick, setPick] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");

  useEffect(() => {
    setPick(null);
    setStatus("idle");
  }, [ev.id]);

  function submit() {
    if (!pick || status === "ok") return;
    const j = judgeElo(ev, pick);
    if (j.ok) {
      setStatus("ok");
      markComplete(ev.id);
      setScore(ev.id, 1, 1);
      const all = ELO_IDS.every((id) => id === ev.id || completed.includes(id));
      if (all) {
        markComplete(X_CASE_ID);
        issueX();
      }
    } else {
      setStatus("bad");
    }
  }

  return (
    <div>
      <Link
        to="/x"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Arquivo X · evidências
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-danger">
        {ev.code} · {ev.kicker}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {ev.title}
      </h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-bg-elevated">
        <p className="border-b border-border px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-dim">
          TRANSCRIÇÃO · FICTÍCIA · TREINO
        </p>
        <ol className="space-y-3 px-4 py-4">
          {ev.lines.map((l, i) => (
            <li key={`${ev.id}-${i}`}>
              {l.who === "nota" ? (
                <p className="font-mono text-[11px] leading-relaxed text-danger">
                  {l.t}
                </p>
              ) : (
                <>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-accent">
                    {l.who === "suporte" ? "SUPORTE" : "ANA"}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{l.t}</p>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-8 font-display text-xl font-semibold tracking-tight">{ev.q}</p>
      <ul className="mt-4 space-y-2">
        {ev.opts.map((o) => {
          const on = pick === o.id;
          return (
            <li key={`${ev.id}-${o.id}`}>
              <button
                type="button"
                disabled={status === "ok"}
                onClick={() => {
                  if (status === "ok") return;
                  setStatus("idle");
                  setPick(o.id);
                }}
                className={cn(
                  "flex min-h-12 w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm transition-colors",
                  on ? "border-accent bg-accent/10" : "border-border hover:border-accent/40",
                  status === "ok" && o.id === ev.correct && "border-accent bg-accent/15",
                  status === "bad" && on && "border-danger bg-danger/10",
                )}
              >
                <span className="font-mono text-[10px] text-dim">{o.id.toUpperCase()}</span>
                {o.t}
              </button>
            </li>
          );
        })}
      </ul>

      {status !== "ok" ? (
        <div className="mt-6">
          <Btn onClick={submit} disabled={!pick}>
            Enviar
          </Btn>
        </div>
      ) : null}

      {status === "bad" ? (
        <div className="mt-4">
          <Callout
            tone="warn"
            title="Ainda não."
            text="Leia a transcrição de novo. A técnica está no tom, não só na frase."
          />
        </div>
      ) : null}

      {status === "ok" ? (
        <div className="mt-6 space-y-4">
          <Callout tone="info" title="Arquivado." text={ev.debrief} />
          {next ? (
            <Link to="/x/$id" params={{ id: next }}>
              <Btn>
                Próxima evidência
                <ArrowRight className="size-3.5" />
              </Btn>
            </Link>
          ) : (
            <Link to="/x">
              <Btn>Fechar o arquivo</Btn>
            </Link>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Finale() {
  return (
    <section className="rounded-lg border border-accent/40 bg-surface p-5 shadow-panel">
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        INVESTIGAÇÃO CONCLUÍDA
      </p>
      <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
        O atacante não precisou invadir o sistema.
        <br />
        Ele tentou convencer uma pessoa a abrir a porta.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        O elo mais fraco não é necessariamente uma pessoa. É o momento em que
        alguém decide sob pressão, sem verificar a informação.
      </p>
      <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-dim">
        TÉCNICAS IDENTIFICADAS
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {ELO_TECH.map((t) => (
          <li
            key={t}
            className="rounded-sm border border-accent/40 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-accent"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-dim">
        Treino. Não ensina a se passar por TI, não ensina a clonar voz, não
        ensina a montar o golpe. Ensina a ouvir a ligação e desligar — e ligar
        no ramal que você já usa.
      </p>
    </section>
  );
}

export function XpMeter() {
  const xp = useSessionXp((s) => s.xp);
  if (xp <= 0) return null;
  return (
    <div className="min-w-[4.5rem] text-right">
      <p className="font-mono text-[9px] tracking-[0.16em] text-dim">SESSÃO</p>
      <p className="font-mono text-xs tabular-nums text-accent">{xp} XP</p>
    </div>
  );
}

export function SecretFile({
  done,
  open,
}: {
  done: boolean;
  open: boolean;
}) {
  if (open) {
    return (
      <li>
        <Link
          to="/x"
          className="block rounded-lg border border-danger/40 bg-surface p-5 shadow-panel transition-colors duration-150 hover:border-danger hover:bg-surface-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] tracking-[0.2em] text-danger">
              ARQUIVO X · X-001
            </p>
            <span className="font-mono text-[10px] tracking-[0.16em] text-danger">
              {done ? "ARQUIVADO" : "ACESSO AUTORIZADO"}
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            O elo mais fraco
          </h2>
          <p className="mt-1 text-sm font-medium text-fg">Engenharia social.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            A ligação do “suporte”. Cinco evidências. O atacante não invadiu o
            sistema — tentou convencer alguém a abrir a porta.
          </p>
          {done ? (
            <p className="mt-4 font-mono text-xs text-accent">OP-X01 emitido</p>
          ) : (
            <p className="mt-4 font-mono text-xs text-danger">ABRIR ARQUIVO</p>
          )}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="rounded-lg border border-border/80 bg-bg-elevated p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[10px] tracking-[0.2em] text-dim">
            ARQUIVO X
          </p>
          <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-dim">
            <Lock className="size-3" /> ACESSO NEGADO
          </span>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-muted">
          ████████████
        </h2>
        <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-dim">
          REQUISITO · ARQUIVAR CASO #004 · A VOZ
        </p>
        <p className="mt-3 text-xs leading-relaxed text-dim">
          O lacre fecha com o XP da voz. Sem conta, sem ranking. Só esta
          investigação.
        </p>
      </div>
    </li>
  );
}
