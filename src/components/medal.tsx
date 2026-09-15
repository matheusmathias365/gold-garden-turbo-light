import { medalById, type MedalId } from "@/lib/medals";
import { assetUrl, cn } from "@/lib/utils";

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
  const label = earned
    ? `Medalha ${m.series} ${m.vector}, caso concluído`
    : `Medalha ${m.series} bloqueada`;
  return (
    <div
      className={cn(
        "op-medal",
        size === "sm" && "op-medal-sm",
        earned && spin && "is-award",
        !earned && "is-locked",
      )}
      role="img"
      aria-label={label}
    >
      <div className="op-ribbon" aria-hidden>
        <span className="op-cross" />
      </div>
      <div className="op-scene">
        <div className={cn("op-coin", earned && spin && "is-spin")}>
          <img
            src={assetUrl("medals/front.jpg")}
            alt=""
            className="op-face op-front"
            draggable={false}
          />
          <img
            src={assetUrl("medals/back.jpg")}
            alt=""
            className="op-face op-back"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export function MedalAward({ id }: { id: MedalId }) {
  const m = medalById(id);
  return (
    <div className="mb-10 flex flex-col items-center text-center">
      <p className="font-mono text-[10px] tracking-[0.28em] text-accent">
        CONQUISTA DESBLOQUEADA
      </p>
      <div className="medal-drop mt-4">
        <img
          src={assetUrl("medals/hang.jpg")}
          alt={`Medalha Operação Phishing. ${m.series} ${m.vector}. Caso concluído.`}
          className="mx-auto h-auto w-[min(100%,280px)]"
          draggable={false}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-accent">
        {m.series} · {m.vector}
      </p>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight">
        Caso concluído
      </p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {m.title}. A medalha entra no quartel. Conhecimento é a melhor defesa.
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
        CONQUISTAS · {earned.length}/{ids.length}
      </p>
      <ul className="mt-5 flex flex-wrap items-end justify-center gap-5">
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
