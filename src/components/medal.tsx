import { medalById, type MedalId } from "@/lib/medals";
import { assetUrl, cn } from "@/lib/utils";

export function Medal({
  id,
  size = "lg",
  earned = true,
}: {
  id: MedalId;
  size?: "lg" | "sm";
  earned?: boolean;
  spin?: boolean;
}) {
  const m = medalById(id);
  const label = earned
    ? `Medalha ${m.series} ${m.vector}, caso concluído`
    : `Medalha ${m.series} bloqueada`;
  return (
    <img
      src={assetUrl("medals/hang.png")}
      alt={label}
      draggable={false}
      className={cn(
        "h-auto select-none",
        size === "sm" ? "w-16" : "w-44",
        !earned && "opacity-35 grayscale",
      )}
    />
  );
}

export function MedalAward({ id }: { id: MedalId }) {
  const m = medalById(id);
  return (
    <div className="relative isolate mb-10 overflow-hidden rounded-lg bg-bg px-5 py-12 text-center">
      <p className="font-mono text-[10px] tracking-[0.32em] text-accent">
        CONQUISTA DESBLOQUEADA
      </p>
      <div className="medal-drop mx-auto mt-8 w-[min(100%,240px)]">
        <img
          src={assetUrl("medals/hang.png")}
          alt={`Medalha Operação Phishing. ${m.series} ${m.vector}. Caso concluído.`}
          className="mx-auto h-auto w-full select-none"
          draggable={false}
        />
      </div>
      <p className="mt-8 font-mono text-[10px] tracking-[0.28em] text-accent">
        {m.series} · {m.vector}
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
    <section className="mt-8 overflow-hidden rounded-lg border border-border bg-bg px-4 py-6">
      <p className="font-mono text-[10px] tracking-[0.22em] text-dim">
        CONQUISTAS · {earned.length}/{ids.length}
      </p>
      <ul className="mt-5 flex flex-wrap items-end justify-center gap-6">
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
