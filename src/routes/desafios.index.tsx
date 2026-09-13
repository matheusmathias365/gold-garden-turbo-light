import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { RequireAgent } from "@/components/shell";
import { Rail } from "@/components/ui";
import { CHALLENGES } from "@/lib/challenges";
import { CHALLENGE_IDS, countDone } from "@/lib/ids";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/desafios/")({
  component: () => (
    <RequireAgent>
      <Index />
    </RequireAgent>
  ),
});

function Index() {
  const completed = useProgress((s) => s.completed);
  const scores = useProgress((s) => s.scores);
  const done = countDone(completed, CHALLENGE_IDS);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        MÓDULO 03 · DESAFIOS
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Provas de detetive
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Cinco testes. Errar faz parte — o debrief ensina. Só avança o carimbo
        com a leitura certa.
      </p>
      <div className="mt-5 max-w-md">
        <Rail value={done} max={CHALLENGE_IDS.length} />
        <p className="mt-2 font-mono text-xs tabular-nums text-dim">
          {done}/{CHALLENGE_IDS.length}
        </p>
      </div>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {CHALLENGES.map((ch) => {
          const ok = completed.includes(ch.id);
          const score = scores[ch.id];
          return (
            <li key={ch.id}>
              <Link
                to="/desafios/$id"
                params={{ id: ch.id }}
                className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
              >
                <span className="w-24 font-mono text-[10px] tracking-widest text-dim">
                  {ch.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{ch.title}</p>
                  <p className="truncate text-sm text-muted">{ch.kicker}</p>
                </div>
                {ok ? (
                  <span className="flex items-center gap-2 font-mono text-xs text-accent">
                    {score ? `${score.correct}/${score.total}` : null}
                    <Check className="size-4" />
                  </span>
                ) : (
                  <ChevronRight className="size-4 text-dim" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
