import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Btn } from "@/components/ui";
import { cn } from "@/lib/utils";

const CINEMA_KEY = "op-x-cinema";

export function cinemaPending() {
  if (typeof sessionStorage === "undefined") return false;
  try {
    return sessionStorage.getItem(CINEMA_KEY) !== "seen";
  } catch {
    return false;
  }
}

export function markCinemaSeen() {
  try {
    sessionStorage.setItem(CINEMA_KEY, "seen");
  } catch {
    /* */
  }
}

export function CaseTrail({
  steps,
}: {
  steps: { n: string; label: string; done: boolean; current?: boolean }[];
}) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-y-2 font-mono text-[10px] tracking-[0.16em]">
      {steps.map((s, i) => (
        <li key={s.n} className="flex items-center">
          {i > 0 ? (
            <span
              className={cn(
                "mx-2 h-px w-6 sm:w-10",
                s.done || steps[i - 1]?.done ? "bg-accent/50" : "bg-border",
              )}
              aria-hidden
            />
          ) : null}
          <span
            className={cn(
              "rounded-sm border px-2 py-1",
              s.done && "border-accent/50 text-accent",
              s.current && !s.done && "border-accent text-fg",
              !s.done && !s.current && "border-border text-dim",
            )}
          >
            {s.n} {s.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export function ArchiveLog({
  code,
  title,
  nextHint,
}: {
  code: string;
  title: string;
  nextHint: string;
}) {
  return (
    <aside className="mt-8 overflow-hidden rounded-lg border border-accent/40 bg-bg-elevated p-5 shadow-panel">
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        CASO ARQUIVADO · {code}
      </p>
      <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
        {title}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        O dossiê fecha. A pista fica no quartel. Arquivar não é um botão de
        “próximo” — é o ato de registrar o que você viu, para não cair de novo.
      </p>
      <p className="mt-4 font-mono text-[11px] leading-relaxed text-dim">
        {nextHint}
      </p>
    </aside>
  );
}

export function UnlockX({
  open,
  onOpen,
  onStay,
}: {
  open: boolean;
  onOpen: () => void;
  onStay: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!open) return;
    setPhase(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase(3);
      return;
    }
    const t1 = window.setTimeout(() => setPhase(1), 400);
    const t2 = window.setTimeout(() => setPhase(2), 1100);
    const t3 = window.setTimeout(() => setPhase(3), 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg/90 px-5 backdrop-blur-[2px]"
      role="dialog"
      aria-labelledby="unlock-x-title"
    >
      <div className="emergency-wash pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative w-full max-w-lg rounded-lg border border-danger/40 bg-bg-elevated p-6 text-center shadow-panel md:p-10">
        <p
          className={cn(
            "font-mono text-[10px] tracking-[0.28em] text-danger",
            phase >= 1 && "stamp-in",
          )}
        >
          {phase >= 1 ? "ACESSO AUTORIZADO" : "AUTENTICANDO…"}
        </p>
        <h2
          id="unlock-x-title"
          className={cn(
            "mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl",
            phase >= 2 ? "text-fg" : "text-dim",
          )}
        >
          Arquivo X
        </h2>
        {phase >= 3 ? (
          <>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Você chegou até aqui. Agora começa uma investigação diferente de
              todas as anteriores. O conteúdo ainda não está nesta tela — está
              no arquivo.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/x" onClick={onOpen}>
                <Btn>Abrir arquivo</Btn>
              </Link>
              <Btn variant="ghost" onClick={onStay}>
                Ficar no quartel
              </Btn>
            </div>
          </>
        ) : (
          <p className="mt-6 font-mono text-xs tracking-[0.18em] text-dim">
            LACRE · CEDENDO
            <span className="cursor-blink">_</span>
          </p>
        )}
      </div>
    </div>
  );
}
