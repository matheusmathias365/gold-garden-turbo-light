import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { RequireAgent } from "@/components/shell";
import { LESSONS } from "@/lib/course";
import { useProgress } from "@/lib/progress";
import { Rail } from "@/components/ui";
import { LESSON_IDS, countDone } from "@/lib/ids";

export const Route = createFileRoute("/briefing/")({
  component: () => (
    <RequireAgent>
      <BriefingIndex />
    </RequireAgent>
  ),
});

function BriefingIndex() {
  const completed = useProgress((s) => s.completed);
  const done = countDone(completed, LESSON_IDS);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        MÓDULO 01 · BRIEFING
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Dossiê teórico
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Oito arquivos. Cada um é uma pista da investigação. Catalogar todos
        destrava o olhar de analista para o laboratório.
      </p>
      <div className="mt-5 max-w-md">
        <Rail value={done} max={LESSON_IDS.length} />
        <p className="mt-2 font-mono text-xs tabular-nums text-dim">
          {done}/{LESSON_IDS.length}
        </p>
      </div>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {LESSONS.map((lesson, i) => {
          const ok = completed.includes(lesson.id);
          return (
            <li key={lesson.id}>
              <Link
                to="/briefing/$id"
                params={{ id: lesson.id }}
                className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
              >
                <span className="w-8 font-mono text-xs text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{lesson.title}</p>
                  <p className="truncate text-sm text-muted">{lesson.kicker}</p>
                </div>
                {ok ? (
                  <Check className="size-4 text-accent" strokeWidth={2} />
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
