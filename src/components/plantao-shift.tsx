import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { AgentCertificate } from "@/components/certificate";
import { MedalAward } from "@/components/medal";
import { Btn, Callout } from "@/components/ui";
import {
  ACTION_LABEL,
  CHANNEL_LABEL,
  PLANTAO_ID,
  PLANTAO_QUEUE,
  PLANTAO_SECONDS,
  dealShift,
  judge,
  tally,
  type Action,
  type ShiftLog,
  type Ticket,
} from "@/lib/plantao";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

type Phase = "brief" | "play" | "debrief" | "end";

export function PlantaoShift() {
  const callsign = useProgress((s) => s.callsign);
  const plantaoAt = useProgress((s) => s.plantaoAt);
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const issuePlantao = useProgress((s) => s.issuePlantao);

  const [phase, setPhase] = useState<Phase>("brief");
  const [queue, setQueue] = useState<Ticket[]>([]);
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(PLANTAO_SECONDS);
  const [log, setLog] = useState<ShiftLog[]>([]);
  const [pending, setPending] = useState<ShiftLog | null>(null);

  const ticket = queue[idx];

  useEffect(() => {
    if (phase !== "play") return;
    if (left <= 0) {
      timeoutRest();
      return;
    }
    const t = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, left]);

  function start() {
    setQueue(dealShift());
    setIdx(0);
    setLeft(PLANTAO_SECONDS);
    setLog([]);
    setPending(null);
    setPhase("play");
  }

  function apply(entry: ShiftLog, nextIdx: number) {
    const nextLog = [...log, entry];
    if (nextIdx >= queue.length) {
      finish(nextLog);
      return;
    }
    setLog(nextLog);
    setIdx(nextIdx);
    if (entry.ok) return;
    setPending(entry);
    setPhase("debrief");
  }

  function pick(action: Action) {
    if (!ticket || phase !== "play") return;
    const j = judge(ticket, action);
    apply({ ticket, action, ...j }, idx + 1);
  }

  function timeoutRest() {
    if (phase !== "play") return;
    const rest = queue.slice(idx);
    const extra: ShiftLog[] = rest.map((t) => ({
      ticket: t,
      action: "timeout" as const,
      ...judge(t, "timeout"),
    }));
    finish([...log, ...extra]);
  }

  function finish(finalLog: ShiftLog[]) {
    const s = tally(finalLog);
    setLog(finalLog);
    setPending(null);
    setPhase("end");
    markComplete(PLANTAO_ID);
    setScore(PLANTAO_ID, s.caught, s.baits || 1);
    issuePlantao();
  }

  function afterDebrief() {
    setPending(null);
    const nextIdx = idx;
    if (nextIdx >= queue.length) {
      finish(log);
      return;
    }
    setPhase("play");
  }

  const mm = String(Math.floor(Math.max(0, left) / 60)).padStart(2, "0");
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");
  const summary = tally(log);

  return (
    <div>
      <Link
        to="/jogar"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Quartel · arquivos
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-accent">
        CASO #002 · PLANTÃO SOC
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Turno de 90 segundos
      </h1>

      {phase === "brief" ? (
        <div className="mt-6 max-w-2xl space-y-4">
          <p className="text-sm leading-relaxed text-muted">
            Oito recados entram na fila: WhatsApp, SMS, e-mail, notificação.
            Para cada um, um gesto — arquivar como golpe, mandar ao canal
            oficial ou ignorar. Erro não encerra o plantão: abre o debrief e
            segue. No fim, o veredito: quantas iscas você deixou passar.
          </p>
          <p className="text-sm leading-relaxed text-muted">
            A arma é a pressa. Reconhecer a armadilha. Nunca montá-la. Cada
            plantão embaralha a fila. Replay à vontade. Série do certificado:
            OP-002.
          </p>
          <Callout
            tone="warn"
            title="REGRA"
            text="Material educacional. Não ensina a clonar voz, montar página falsa nem vender dado."
          />
          <div className="pt-2">
            <Btn onClick={start}>Assumir o plantão</Btn>
          </div>
        </div>
      ) : null}

      {phase === "play" && ticket ? (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-dim">
              {idx + 1}/{PLANTAO_QUEUE} · {CHANNEL_LABEL[ticket.channel]}
            </p>
            <p
              className={cn(
                "inline-flex items-center gap-2 font-mono text-lg tabular-nums",
                left <= 20 ? "text-danger" : "text-accent",
              )}
            >
              <Clock className="size-4" strokeWidth={1.75} />
              {mm}:{ss}
            </p>
          </div>
          <TicketCard ticket={ticket} />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {(Object.keys(ACTION_LABEL) as Action[]).map((a) => (
              <Btn
                key={a}
                variant={a === "golpe" ? "danger" : a === "oficial" ? "primary" : "ghost"}
                onClick={() => pick(a)}
                className="w-full"
              >
                {ACTION_LABEL[a]}
              </Btn>
            ))}
          </div>
        </div>
      ) : null}

      {phase === "debrief" && pending ? (
        <div className="mt-6 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.2em] text-danger">
            DEBRIEF · O RELÓGIO PAUSA
          </p>
          <TicketCard ticket={pending.ticket} />
          <div className="mt-4">
            <Callout
              tone="danger"
              title={
                pending.baitPassed
                  ? "Isca passou"
                  : pending.falseAlarm
                    ? "Alarme falso"
                    : "Veredito errado"
              }
              text={pending.ticket.debrief}
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            Você: {pending.action === "timeout" ? "tempo esgotou" : ACTION_LABEL[pending.action]}.
            Certo: {ACTION_LABEL[pending.ticket.correct]}.
          </p>
          <div className="mt-5">
            <Btn onClick={afterDebrief}>Seguir o plantão</Btn>
          </div>
        </div>
      ) : null}

      {phase === "end" ? (
        <div className="mt-6 max-w-2xl space-y-5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
            FIM DE TURNO
          </p>
          <p className="font-display text-3xl font-semibold tracking-tight">
            {summary.passed === 0
              ? "Nenhuma isca passou."
              : summary.passed === 1
                ? "1 isca passou."
                : `${summary.passed} iscas passaram.`}
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              Iscas arquivadas:{" "}
              <span className="text-fg">
                {summary.caught}/{summary.baits}
              </span>
            </li>
            <li>
              Alarmes falsos:{" "}
              <span className="text-fg">{summary.falseAlarms}</span>
            </li>
            <li>
              Acertos:{" "}
              <span className="text-fg">
                {summary.ok}/{summary.total}
              </span>
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-muted">
            Na vida real a fila não pausa. O treino é parar a mão antes do
            PIX, do QR e da senha.
          </p>
          <div className="flex flex-wrap gap-3">
            <Btn onClick={start}>Novo plantão</Btn>
            <Link to="/jogar">
              <Btn variant="ghost">Quartel-general</Btn>
            </Link>
          </div>
          <div className="pt-4">
            <MedalAward id="002" />
            <AgentCertificate
              callsign={callsign}
              ready
              remaining={0}
              issuedAt={plantaoAt}
              onIssue={issuePlantao}
              series="002"
              caseCode="CASO #002  ·  PLANTÃO SOC"
              blurb="Por concluir um plantão educacional do Caso #002 — Operação Phishing. Treino de triagem: reconhecer a armadilha sob pressa, sem montá-la."
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <article className="mt-4 rounded-lg border border-border bg-surface p-4 shadow-panel">
      <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
        {CHANNEL_LABEL[ticket.channel]}
      </p>
      <p className="mt-2 text-sm text-dim">{ticket.from}</p>
      {ticket.meta ? (
        <p className="font-mono text-[10px] text-dim">{ticket.meta}</p>
      ) : null}
      <p className="mt-3 text-base leading-relaxed text-fg">{ticket.body}</p>
    </article>
  );
}
