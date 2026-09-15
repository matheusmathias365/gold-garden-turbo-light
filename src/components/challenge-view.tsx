import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import {
  adjacentChallenge,
  correctIds,
  type Challenge,
} from "@/lib/challenges";
import { useProgress } from "@/lib/progress";
import { Btn, Callout, FilePanel } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ChallengeView({ challenge }: { challenge: Challenge }) {
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const { prev, next } = adjacentChallenge(challenge.id);

  const [picked, setPicked] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [activeId, setActiveId] = useState(challenge.id);

  if (activeId !== challenge.id) {
    setActiveId(challenge.id);
    setPicked([]);
    setOrder([]);
    setStatus("idle");
  }

  useEffect(() => {
    setPicked([]);
    setOrder([]);
    setStatus("idle");
  }, [challenge.id]);

  const needed = useMemo(() => correctIds(challenge), [challenge]);

  function toggle(id: string) {
    if (status === "ok") return;
    setStatus("idle");
    if (challenge.kind === "single") {
      setPicked([id]);
      return;
    }
    if (challenge.kind === "order") {
      setOrder((cur) =>
        cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
      );
      return;
    }
    setPicked((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  }

  function submit() {
    let ok = false;
    if (challenge.kind === "order") {
      ok =
        order.length === needed.length &&
        order.every((id, i) => id === needed[i]);
    } else if (challenge.kind === "single") {
      ok = picked.length === 1 && needed.includes(picked[0] ?? "");
    } else {
      const a = [...picked].sort().join(",");
      const b = [...needed].sort().join(",");
      ok = a === b;
    }
    if (ok) {
      setStatus("ok");
      markComplete(challenge.id);
      setScore(challenge.id, needed.length, needed.length);
    } else {
      setStatus("bad");
    }
  }

  const selected = challenge.kind === "order" ? order : picked;

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        {challenge.code}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {challenge.title}
      </h1>
      <p className="mt-2 text-sm text-muted">{challenge.kicker}</p>

      <FilePanel code="PROVA" title="Evidência" classified className="mt-6">
        <p className="text-sm leading-relaxed text-fg">{challenge.prompt}</p>
        {challenge.detail ? (
          <p className="mt-3 text-sm text-muted">{challenge.detail}</p>
        ) : null}

        <ul className="mt-5 space-y-2">
          {challenge.options.map((opt) => {
            const on = selected.includes(opt.id);
            const rank =
              challenge.kind === "order" && on
                ? order.indexOf(opt.id) + 1
                : null;
            return (
              <li key={`${challenge.id}-${opt.id}`}>
                <button
                  type="button"
                  onClick={() => toggle(opt.id)}
                  className={cn(
                    "flex min-h-12 w-full items-start gap-3 rounded-md border px-3 py-3 text-left text-sm transition-colors duration-150",
                    on
                      ? "border-accent bg-accent/10 text-fg"
                      : "border-border bg-bg text-fg hover:border-accent/50",
                    status === "bad" && on && "border-danger",
                    status === "ok" && on && "border-accent",
                  )}
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-xs border border-border font-mono text-[10px] text-muted">
                    {rank ?? (on ? "•" : "")}
                  </span>
                  <span>{opt.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Btn onClick={submit} disabled={selected.length === 0 || status === "ok"}>
            Emitir resposta
          </Btn>
          {status === "ok" ? (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-accent">
              <Check className="size-3.5" /> Correto
            </span>
          ) : null}
          {status === "bad" ? (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-danger">
              <X className="size-3.5" /> Revise as pistas e tente de novo
            </span>
          ) : null}
        </div>

          {status === "bad" ? (
            <div className="mt-5">
              <Callout
                tone="warn"
                title="Aula do erro."
                text="O que te pega quase nunca é o texto bonito. É o pedido, o relógio ou o destino do link. Volta nas pistas e emite de novo — acertar agora é treino, não prova."
              />
            </div>
          ) : null}
          {status === "ok" ? (
            <div className="mt-5">
              <Callout tone="info" title="DEBRIEF" text={challenge.explain} />
            </div>
          ) : null}
      </FilePanel>

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/desafios/$id" params={{ id: prev.id }}>
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              {prev.title}
            </Btn>
          </Link>
        ) : (
          <Link to="/desafios">
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              Desafios
            </Btn>
          </Link>
        )}
        {next ? (
          <Link to="/desafios/$id" params={{ id: next.id }}>
            <Btn>
              {next.title}
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        ) : (
          <Link to="/protocolo">
            <Btn>
              Protocolo de emergência
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        )}
      </nav>
    </div>
  );
}
