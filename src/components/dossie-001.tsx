import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Fingerprint,
  FolderLock,
  ShieldAlert,
  TerminalSquare,
  Trophy,
} from "lucide-react";
import { CHALLENGES } from "@/lib/challenges";
import { LESSONS } from "@/lib/course";
import {
  ALL_IDS,
  CHALLENGE_IDS,
  LAB_IDS,
  LESSON_IDS,
  countDone,
} from "@/lib/ids";
import { LABS } from "@/lib/lab-data";
import { useProgress } from "@/lib/progress";
import { FilePanel, Rail } from "@/components/ui";
import { LegalNotice } from "@/components/legal-notice";
import { CrtFrame, Ticker, AppHeader } from "@/components/shell";

export function Dossie001() {
  const completed = useProgress((s) => s.completed);
  const callsign = useProgress((s) => s.callsign);

  const lessons = countDone(completed, LESSON_IDS);
  const labs = countDone(completed, LAB_IDS);
  const challenges = countDone(completed, CHALLENGE_IDS);
  const protocol = completed.includes("protocol");
  const total = countDone(completed, ALL_IDS);
  const ready = total === ALL_IDS.length;

  return (
    <CrtFrame>
      <Ticker />
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24">
        <Link
          to="/jogar"
          className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
        >
          <ArrowLeft className="size-3.5" />
          Quartel · arquivos
        </Link>
        <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-accent">
          CASO #001 · AGENTE {callsign || "—"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Operação Phishing
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Treina o olho. SMS, e-mail, PIX do “chefe”, página gêmea, prêmio.
          Briefing, laboratório, desafios e o protocolo se você já clicou.
          Certificado série OP-001.
        </p>
        <div className="mt-5">
          <Rail value={total} max={ALL_IDS.length} />
          <p className="mt-2 font-mono text-xs tabular-nums text-dim">
            {total}/{ALL_IDS.length} arquivos catalogados
          </p>
        </div>

        <div className="mt-6">
          <LegalNotice />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ModuleCard
            to="/briefing"
            icon={BookOpen}
            code="MÓDULO 01"
            title="Briefing"
            copy="O que é phishing, como o golpe se monta e as cinco pistas."
            done={lessons}
            max={LESSON_IDS.length}
          />
          <ModuleCard
            to="/lab"
            icon={TerminalSquare}
            code="MÓDULO HACKER"
            title="Laboratório SOC"
            copy="Inspecione SMS, e-mail, chat, página gêmea e o terminal."
            done={labs}
            max={LAB_IDS.length}
            featured
          />
          <ModuleCard
            to="/desafios"
            icon={Trophy}
            code="MÓDULO 03"
            title="Desafios"
            copy="Provas de detetive. Errou, lê o debrief e tenta de novo."
            done={challenges}
            max={CHALLENGE_IDS.length}
          />
          <ModuleCard
            to="/protocolo"
            icon={ShieldAlert}
            code="PROTOCOLO"
            title="E se eu cliquei?"
            copy="Incidente detectado. O que fazer nos primeiros minutos."
            done={protocol ? 1 : 0}
            max={1}
          />
        </div>

        <div className="mt-4">
          <Link
            to="/caso"
            className="block rounded-lg bg-surface shadow-panel transition-colors duration-150 hover:bg-surface-2"
          >
            <div className="flex items-center gap-4 px-4 py-4">
              <FolderLock className="size-5 text-accent" strokeWidth={1.75} />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
                  ARQUIVO FINAL · OP-001
                </p>
                <p className="text-base font-medium">
                  {ready
                    ? "Certificado do agente — baixar"
                    : "Caso em aberto — complete para certificar"}
                </p>
              </div>
              <Fingerprint className="size-4 text-dim" strokeWidth={1.75} />
            </div>
          </Link>
        </div>

        <FilePanel
          code="LEITURA RÁPIDA"
          title="As quatro marcas"
          className="mt-4"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Pressão", "Relógio, medo, “não ligue”."],
              ["Inconsistência", "Remetente, domínio, tom, erros."],
              ["Pedido suspeito", "Senha, SMS, PIX, cartão."],
              ["Indução ao clique", "Link, botão, atalho da mensagem."],
            ].map(([t, b]) => (
              <li key={t} className="rounded-md bg-surface-2 px-3 py-3">
                <p className="font-medium text-fg">{t}</p>
                <p className="mt-1 text-sm text-muted">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Se encontrar as quatro, você provavelmente encontrou a armadilha.
          </p>
        </FilePanel>

        <p className="mt-8 font-mono text-[10px] tracking-widest text-dim">
          {LESSONS.length} arquivos · {LABS.length + 1} labs · {CHALLENGES.length}{" "}
          desafios
        </p>
      </main>
    </CrtFrame>
  );
}

function ModuleCard({
  to,
  icon: Icon,
  code,
  title,
  copy,
  done,
  max,
  featured,
}: {
  to: "/briefing" | "/lab" | "/desafios" | "/protocolo";
  icon: typeof BookOpen;
  code: string;
  title: string;
  copy: string;
  done: number;
  max: number;
  featured?: boolean;
}) {
  return (
    <Link
      to={to}
      className="group block rounded-lg bg-surface p-4 shadow-panel transition-colors duration-150 hover:bg-surface-2"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
          {code}
        </p>
        <Icon
          className={featured ? "size-5 text-accent" : "size-5 text-muted"}
          strokeWidth={1.75}
        />
      </div>
      <h2 className="mt-3 text-xl font-medium">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{copy}</p>
      <div className="mt-4">
        <Rail value={done} max={max} />
        <p className="mt-2 font-mono text-xs tabular-nums text-dim">
          {done}/{max}
        </p>
      </div>
    </Link>
  );
}
