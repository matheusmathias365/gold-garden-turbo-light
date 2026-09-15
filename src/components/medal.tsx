import { medalById, type MedalId } from "@/lib/medals";
import { cn } from "@/lib/utils";

const EDGES = 16;

export function Medal({
  id,
  size = "lg",
  earned = true,
  spin = false,
}: {
  id: MedalId;
  size?: "lg" | "sm";
  earned?: boolean;
  spin?: boolean;
}) {
  const m = medalById(id);
  return (
    <div className={cn("medal-scene", size === "sm" && "medal-scene-sm")} aria-hidden={!earned}>
      <div
        className={cn(
          "medal",
          `medal-${id}`,
          size === "sm" && "medal-sm",
          earned && spin && "is-spin",
          !earned && "is-locked",
        )}
      >
        {Array.from({ length: EDGES }, (_, i) => (
          <span
            key={i}
            className="medal-edge"
            style={{ ["--a" as string]: `${i * (360 / EDGES)}deg` }}
          />
        ))}
        <div className="medal-face medal-front">
          <span className="medal-ring" />
          <span className="medal-core">
            <span className="medal-series">{m.series}</span>
            <span className="medal-vector">{m.vector}</span>
          </span>
        </div>
        <div className="medal-face medal-back">
          <span className="medal-ring" />
          <span className="medal-core">
            <span className="medal-series">ARQUIVADO</span>
            <span className="medal-vector">SOC</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function MedalAward({ id }: { id: MedalId }) {
  const m = medalById(id);
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <p className="font-mono text-[10px] tracking-[0.28em] text-accent">
        MOEDA DO QUARTEL
      </p>
      <div className="mt-5">
        <Medal id={id} spin earned />
      </div>
      <p className="mt-6 font-display text-2xl font-semibold tracking-tight">
        Arquivo vencido
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {m.title}. A moeda fica no quartel — prova de que você leu o golpe,
        não de que montou um.
      </p>
    </div>
  );
}

export function MedalRack({
  earned,
  showX,
}: {
  earned: MedalId[];
  showX: boolean;
}) {
  const ids: MedalId[] = showX
    ? ["001", "002", "003", "004", "x"]
    : ["001", "002", "003", "004"];
  if (earned.length === 0) return null;
  return (
    <section className="mt-8 rounded-lg border border-border bg-bg-elevated px-4 py-5">
      <p className="font-mono text-[10px] tracking-[0.22em] text-dim">
        MOEDAS CONQUISTADAS · {earned.length}/{ids.length}
      </p>
      <ul className="mt-4 flex flex-wrap items-end justify-center gap-6">
        {ids.map((id) => {
          const on = earned.includes(id);
          const m = medalById(id);
          return (
            <li key={id} className="flex flex-col items-center gap-2">
              <Medal id={id} size="sm" earned={on} />
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.16em]",
                  on ? "text-accent" : "text-dim",
                )}
              >
                {on ? m.vector : "—"}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
