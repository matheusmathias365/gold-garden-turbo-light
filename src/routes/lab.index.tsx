import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { RequireAgent } from "@/components/shell";
import { Rail } from "@/components/ui";
import { LegalNotice } from "@/components/legal-notice";
import { LAB_IDS, TERMINAL_ID, countDone } from "@/lib/ids";
import { LABS } from "@/lib/lab-data";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lab/")({
  component: () => (
    <RequireAgent>
      <LabIndex />
    </RequireAgent>
  ),
});

function LabIndex() {
  const completed = useProgress((s) => s.completed);
  const done = countDone(completed, LAB_IDS);
  const soc = completed.includes(TERMINAL_ID);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        MÓDULO HACKER · LABORATÓRIO SOC
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Evidências reais, ambiente seguro
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Seis casos em sequência — A a F. Em cada um: ache as evidências e toque
        em <span className="text-fg">Arquivar caso</span>. O F é o terminal; dá
        para seguir do E sem voltar a esta lista. Nada aqui envia dados, abre
        golpe ou ensina a atacar.
      </p>
      <div className="mt-4 max-w-2xl">
        <LegalNotice compact />
      </div>
      <div className="mt-5 max-w-md">
        <Rail value={done} max={LAB_IDS.length} />
        <p className="mt-2 font-mono text-xs tabular-nums text-dim">
          {done}/{LAB_IDS.length}
        </p>
      </div>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {LABS.map((lab) => {
          const ok = completed.includes(lab.id);
          return (
            <li key={lab.id}>
              <Link
                to="/lab/$id"
                params={{ id: lab.id }}
                className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
              >
                <span className="w-16 font-mono text-[10px] tracking-widest text-dim">
                  {lab.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{lab.title}</p>
                  <p className="truncate text-sm text-muted">{lab.channelLabel}</p>
                </div>
                {ok ? (
                  <Check className="size-4 text-accent" />
                ) : (
                  <ChevronRight className="size-4 text-dim" />
                )}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            to="/lab/$id"
            params={{ id: "soc" }}
            className="flex min-h-14 items-start gap-3 px-4 py-3 hover:bg-surface-2"
          >
            <span className="mt-1 w-16 font-mono text-[10px] tracking-widest text-accent">
              CASO F
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">Terminal SOC</p>
              <p className="text-sm text-muted">
                E-mail fingindo ser banco. Cinco toques — sem comando.
              </p>
            </div>
            {soc ? (
              <Check className="mt-1 size-4 text-accent" />
            ) : (
              <ChevronRight className="mt-1 size-4 text-dim" />
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
