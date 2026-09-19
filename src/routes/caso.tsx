import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAgent } from "@/components/shell";
import { AgentCertificate } from "@/components/certificate";
import { Btn, FilePanel, Stamp } from "@/components/ui";
import { LegalNotice } from "@/components/legal-notice";
import { CHALLENGES } from "@/lib/challenges";
import {
  ALL_IDS,
  CHALLENGE_IDS,
  LAB_IDS,
  LESSON_IDS,
  PROTOCOL_ID,
  TERMINAL_ID,
  countDone,
} from "@/lib/ids";
import { LABS } from "@/lib/lab-data";
import { LESSONS } from "@/lib/course";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/caso")({
  component: () => (
    <RequireAgent>
      <Caso />
    </RequireAgent>
  ),
});

type Gap = {
  label: string;
  to: "/briefing" | "/lab" | "/lab/$id" | "/desafios" | "/protocolo";
  id?: string;
};

function gapsIn001(completed: string[]): Gap[] {
  const gaps: Gap[] = [];
  for (const lesson of LESSONS) {
    if (!completed.includes(lesson.id)) {
      gaps.push({ label: `${lesson.code} · ${lesson.title}`, to: "/briefing" });
    }
  }
  for (const lab of LABS) {
    if (!completed.includes(lab.id)) {
      gaps.push({
        label: `${lab.code} · ${lab.title}`,
        to: "/lab/$id",
        id: lab.id,
      });
    }
  }
  if (!completed.includes(TERMINAL_ID)) {
    gaps.push({
      label: "CASO F · Terminal SOC",
      to: "/lab/$id",
      id: TERMINAL_ID,
    });
  }
  for (const ch of CHALLENGES) {
    if (!completed.includes(ch.id)) {
      gaps.push({ label: `${ch.code} · ${ch.title}`, to: "/desafios" });
    }
  }
  if (!completed.includes(PROTOCOL_ID)) {
    gaps.push({ label: "Protocolo · E se eu cliquei?", to: "/protocolo" });
  }
  return gaps;
}

function Caso() {
  const callsign = useProgress((s) => s.callsign);
  const completed = useProgress((s) => s.completed);
  const scores = useProgress((s) => s.scores);
  const issuedAt = useProgress((s) => s.issuedAt);
  const issueCertificate = useProgress((s) => s.issueCertificate);
  const total = countDone(completed, ALL_IDS);
  const remaining = ALL_IDS.length - total;
  const ready = remaining === 0;
  const gaps = ready ? [] : gapsIn001(completed);
  const next = gaps[0];
  const labsDone = countDone(completed, LAB_IDS);
  const quiz = CHALLENGE_IDS.reduce(
    (acc, id) => {
      const s = scores[id];
      if (s) {
        acc.correct += s.correct;
        acc.total += s.total;
      }
      return acc;
    },
    { correct: 0, total: 0 },
  );

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        ARQUIVO FINAL · CASO #001
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {ready ? "Certificado emitido" : "Caso em aberto"}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {ready
          ? "O simulado fechou. Baixe o certificado com o seu callsign e mostre que você pensa como analista."
          : "O phishing depende de uma coisa: fazer você confiar antes de verificar. Complete o dossiê para emitir o certificado."}
      </p>

      <div className="mt-8">
        <AgentCertificate
          callsign={callsign}
          ready={ready}
          remaining={remaining}
          issuedAt={issuedAt}
          onIssue={issueCertificate}
        />
      </div>

      {!ready && gaps.length ? (
        <div className="mx-auto mt-6 max-w-[420px] rounded-lg border border-danger/40 bg-surface px-4 py-4">
          <p className="font-mono text-[10px] tracking-[0.2em] text-danger">
            AINDA FALTA ARQUIVAR
          </p>
          <ul className="mt-3 space-y-2">
            {gaps.map((g) => (
              <li key={g.label} className="text-sm text-fg">
                {g.label}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Marcar pista não fecha o caso. Sem arquivar, o certificado não sai.
          </p>
        </div>
      ) : null}

      <FilePanel
        code="FICHA DO AGENTE"
        title={callsign || "AGENTE"}
        classified
        className="relative mt-8"
      >
        {ready ? (
          <div className="pointer-events-none absolute right-6 top-16">
            <Stamp label="RESOLVIDO" />
          </div>
        ) : (
          <div className="pointer-events-none absolute right-6 top-16">
            <Stamp label="EM ABERTO" tone="danger" />
          </div>
        )}
        <dl className="grid max-w-md gap-3 text-sm">
          <Row
            label="Briefing"
            value={`${countDone(completed, LESSON_IDS)}/${LESSONS.length}`}
          />
          <Row
            label="Laboratório"
            value={
              labsDone === LAB_IDS.length
                ? `${labsDone}/${LAB_IDS.length}`
                : `${labsDone}/${LAB_IDS.length} · falta ${LAB_IDS.length - labsDone}`
            }
            warn={labsDone < LAB_IDS.length}
          />
          <Row
            label="Desafios"
            value={`${countDone(completed, CHALLENGE_IDS)}/${CHALLENGES.length}`}
          />
          <Row
            label="Protocolo"
            value={completed.includes(PROTOCOL_ID) ? "catalogado" : "pendente"}
            warn={!completed.includes(PROTOCOL_ID)}
          />
          <Row
            label="Acertos"
            value={quiz.total ? `${quiz.correct}/${quiz.total}` : "—"}
          />
        </dl>
        <blockquote className="mt-6 max-w-lg border-l-2 border-accent pl-4 font-mono text-sm text-accent">
          PARAR → ANALISAR → VERIFICAR → AGIR
        </blockquote>
      </FilePanel>

      <div className="mt-4">
        <LegalNotice compact />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/jogar">
          <Btn variant="ghost">Quartel-general</Btn>
        </Link>
        {!ready && next ? (
          next.to === "/lab/$id" && next.id ? (
            <Link to="/lab/$id" params={{ id: next.id }}>
              <Btn>Abrir {next.label}</Btn>
            </Link>
          ) : (
            <Link to={next.to === "/lab/$id" ? "/lab" : next.to}>
              <Btn>Continuar dossiê</Btn>
            </Link>
          )
        ) : null}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  warn,
}: {
  label: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-2">
      <dt className="font-mono text-[10px] tracking-[0.18em] text-dim">{label}</dt>
      <dd
        className={
          warn
            ? "font-mono text-sm tabular-nums text-danger"
            : "font-mono text-sm tabular-nums text-fg"
        }
      >
        {value}
      </dd>
    </div>
  );
}
