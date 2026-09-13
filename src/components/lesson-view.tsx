import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";
import {
  adjacentLesson,
  type Block,
  type Lesson,
  LESSONS,
  lessonIndex,
} from "@/lib/course";
import { useProgress } from "@/lib/progress";
import { Btn, Callout, FilePanel } from "@/components/ui";

export function LessonView({ lesson }: { lesson: Lesson }) {
  const markComplete = useProgress((s) => s.markComplete);
  const completed = useProgress((s) => s.completed);
  const done = completed.includes(lesson.id);
  const { prev, next } = adjacentLesson(lesson.id);
  const idx = lessonIndex(lesson.id);

  useEffect(() => {
    markComplete(lesson.id);
  }, [lesson.id, markComplete]);

  return (
    <div className="stagger-in">
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        {lesson.code} · {idx + 1}/{LESSONS.length}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {lesson.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{lesson.kicker}</p>

      <FilePanel
        code="EVIDÊNCIA"
        title={lesson.takeaway}
        classified
        className="mt-6"
      >
        <div className="space-y-5">
          {lesson.blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>
      </FilePanel>

      {done ? (
        <p className="mt-4 flex items-center gap-2 font-mono text-xs text-accent">
          <Check className="size-3.5" strokeWidth={2} />
          Arquivo catalogado
        </p>
      ) : null}

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/briefing/$id" params={{ id: prev.id }}>
            <Btn variant="ghost">
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              {prev.title}
            </Btn>
          </Link>
        ) : (
          <Link to="/briefing">
            <Btn variant="ghost">
              <ArrowLeft className="size-4" strokeWidth={1.75} />
              Dossiê
            </Btn>
          </Link>
        )}
        {next ? (
          <Link to="/briefing/$id" params={{ id: next.id }}>
            <Btn>
              {next.title}
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Btn>
          </Link>
        ) : (
          <Link to="/lab">
            <Btn>
              Ir ao laboratório
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Btn>
          </Link>
        )}
      </nav>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "lead") {
    return <p className="text-base leading-relaxed text-fg">{block.text}</p>;
  }
  if (block.type === "quote") {
    return (
      <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm leading-relaxed text-accent">
        {block.text}
      </blockquote>
    );
  }
  if (block.type === "callout") {
    return <Callout tone={block.tone} title={block.title} text={block.text} />;
  }
  if (block.type === "steps") {
    return (
      <ol className="space-y-3">
        {block.items.map((item) => (
          <li key={item.n} className="flex gap-3 rounded-md bg-surface-2 p-3">
            <span className="font-mono text-xs text-accent">{item.n}</span>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === "phrases") {
    return (
      <ul className="space-y-2">
        {block.items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-danger/30 bg-bg px-3 py-2.5 font-mono text-sm text-fg"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "checks") {
    return (
      <ul className="space-y-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-relaxed">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {block.items.map((item) => (
        <li key={item.title} className="rounded-md bg-surface-2 px-3 py-3">
          <p className="font-medium">{item.title}</p>
          <p className="mt-1 text-sm text-muted">{item.body}</p>
        </li>
      ))}
    </ul>
  );
}
