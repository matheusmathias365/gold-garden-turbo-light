import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ClueKind } from "@/lib/course";
import { CLUE_META } from "@/lib/course";

type BtnVariant = "primary" | "ghost" | "danger" | "dim";

export function Btn({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 font-mono text-sm tracking-wide transition-colors duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-accent text-bg hover:bg-accent/90",
        variant === "ghost" &&
          "border border-border bg-transparent text-fg hover:border-accent hover:text-accent",
        variant === "danger" &&
          "border border-danger/50 text-danger hover:bg-danger/10",
        variant === "dim" && "text-muted hover:text-fg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function FilePanel({
  code,
  title,
  classified,
  children,
  footer,
  className,
}: {
  code?: string;
  title: string;
  classified?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg bg-surface shadow-panel",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          {code ? (
            <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
              {code}
            </p>
          ) : null}
          <h2 className="text-lg font-medium leading-snug text-fg">{title}</h2>
        </div>
        {classified ? (
          <span className="shrink-0 rounded-xs border border-danger/40 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-danger">
            CONFIDENCIAL
          </span>
        ) : null}
      </header>
      <div className="p-4 md:p-5">{children}</div>
      {footer ? (
        <footer className="border-t border-border px-4 py-3">{footer}</footer>
      ) : null}
    </section>
  );
}

export function ClueTag({ kind }: { kind: ClueKind }) {
  const meta = CLUE_META[kind];
  return (
    <span
      className={cn(
        "inline-flex rounded-xs border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em]",
        meta.tone === "danger" && "border-danger/40 text-danger",
        meta.tone === "warn" && "border-warn/40 text-warn",
        meta.tone === "accent" && "border-accent/40 text-accent",
      )}
    >
      {meta.short}
    </span>
  );
}

export function Rail({ value, max }: { value: number; max: number }) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className="h-1 w-full overflow-hidden rounded-xs bg-border"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="h-full bg-accent transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Callout({
  tone = "info",
  title,
  text,
}: {
  tone?: "info" | "warn" | "danger";
  title: string;
  text: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-md border-l-2 bg-surface-2 px-3 py-3",
        tone === "danger" && "border-danger",
        tone === "warn" && "border-warn",
        tone === "info" && "border-accent",
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.18em] text-muted">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-fg">{text}</p>
    </aside>
  );
}

export function Stamp({
  label,
  tone = "accent",
}: {
  label: string;
  tone?: "accent" | "danger";
}) {
  return (
    <div
      className={cn(
        "stamp-in pointer-events-none select-none rounded-sm border-2 px-4 py-2 font-mono text-sm font-semibold tracking-[0.28em]",
        tone === "accent" && "border-accent text-accent",
        tone === "danger" && "border-danger text-danger",
      )}
    >
      {label}
    </div>
  );
}
