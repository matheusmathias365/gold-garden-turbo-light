import type { ReactNode } from "react";
import { Link, Navigate } from "@tanstack/react-router";
import { Fingerprint, Home } from "lucide-react";
import { useHasHydrated, useProgress } from "@/lib/progress";
import { ALL_IDS, countDone } from "@/lib/ids";
import { Rail } from "@/components/ui";
import { XpMeter } from "@/components/elo-stage";

export function Splash({ label = "SINCRONIZANDO ARQUIVO" }: { label?: string }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center bg-bg px-6 text-fg">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="vignette absolute inset-0" />
      <p className="relative font-mono text-sm tracking-[0.22em] text-accent">
        {label}
        <span className="cursor-blink">_</span>
      </p>
    </div>
  );
}

export function CrtFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      {/* Viewport only — never stretch over the tall diploma (that froze /caso). */}
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-50" />
      <div className="vignette pointer-events-none fixed inset-0" />
      <div className="crt-scanlines pointer-events-none fixed inset-0 z-[15] opacity-30" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function Ticker() {
  return (
    <div className="no-print overflow-hidden border-b border-border bg-bg-elevated py-2 font-mono text-[10px] tracking-[0.18em] text-dim">
      <div className="ticker flex w-max gap-10 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>
            ARQUIVO CONFIDENCIAL · TREINAMENTO EDUCACIONAL · NÃO AUTORIZA CRIME
            CIBERNÉTICO · CP ART. 171 E 154-A · MISSÃO: CIBERSEGURANÇA
          </span>
        ))}
      </div>
    </div>
  );
}

export function AppHeader() {
  const callsign = useProgress((s) => s.callsign);
  const completed = useProgress((s) => s.completed);
  const done = countDone(completed, ALL_IDS);

  return (
    <header className="no-print sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <Link
          to="/jogar"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-sm text-accent hover:bg-surface"
          aria-label="Quartel-general"
        >
          <Home className="size-4" strokeWidth={1.75} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
            TREINAMENTO EDUCACIONAL · PHISHING
          </p>
          <div className="mt-1">
            <Rail value={done} max={ALL_IDS.length} />
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <Fingerprint className="size-3.5 text-accent" strokeWidth={1.75} />
          <span className="max-w-28 truncate tracking-wider">
            {callsign || "AGENTE"}
          </span>
          <span className="tabular-nums text-dim">
            {done}/{ALL_IDS.length}
          </span>
          <XpMeter />
        </div>
      </div>
    </header>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <CrtFrame>
      <Ticker />
      <AppHeader />
      <div className="mx-auto w-full max-w-5xl px-4 py-6 pb-24">{children}</div>
    </CrtFrame>
  );
}

export function RequireAgent({ children }: { children: ReactNode }) {
  const hydrated = useHasHydrated();
  const booted = useProgress((s) => s.booted);
  if (!hydrated) return <Splash />;
  if (!booted) return <Navigate to="/jogar" />;
  return <Shell>{children}</Shell>;
}
