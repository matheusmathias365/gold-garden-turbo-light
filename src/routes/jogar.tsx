import { createFileRoute } from "@tanstack/react-router";
import { BootScreen } from "@/components/boot-screen";
import { Hq } from "@/components/hq";
import { Splash } from "@/components/shell";
import { useHasHydrated, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/jogar")({ component: Jogar });

function Jogar() {
  const hydrated = useHasHydrated();
  const booted = useProgress((s) => s.booted);
  if (!hydrated) return <Splash label="SINCRONIZANDO ARQUIVO" />;
  if (!booted) return <BootScreen />;
  return <Hq />;
}
