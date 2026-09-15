import { useEffect, useRef, useState, type PointerEvent as PE } from "react";
import { medalById, type MedalId } from "@/lib/medals";
import { assetUrl, cn } from "@/lib/utils";

const EDGES = 18;

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
  const { ry, bind, dragging } = useSpin(spin && earned);

  return (
    <div
      className={cn(
        "op-medal",
        size === "sm" && "op-medal-sm",
        !earned && "is-locked",
        spin && "op-medal-lg",
      )}
      role="img"
      aria-label={label}
    >
      <div className="op-ribbon" aria-hidden>
        <span className="op-cross" />
      </div>
      <div className="op-bail" aria-hidden />
      <div
        className={cn("op-scene", spin && "is-live")}
        style={{ ["--ry" as string]: `${ry}deg` }}
        {...(spin && earned ? bind : {})}
      >
        <div className={cn("op-coin", dragging && "is-drag")}>
          {size !== "sm"
            ? Array.from({ length: EDGES }, (_, i) => (
                <i
                  key={i}
                  className="op-rim"
                  style={{ ["--a" as string]: `${i * (360 / EDGES)}deg` }}
                />
              ))
            : null}
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

function useSpin(active: boolean) {
  const [ry, setRy] = useState(-26);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(false);
  const lastX = useRef(0);
  const ryRef = useRef(-26);

  useEffect(() => {
    ryRef.current = ry;
  }, [ry]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const tick = () => {
      if (!drag.current) {
        ryRef.current += 0.55;
        setRy(ryRef.current);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [active]);

  function down(e: PE<HTMLDivElement>) {
    drag.current = true;
    setDragging(true);
    lastX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e: PE<HTMLDivElement>) {
    if (!drag.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    ryRef.current += dx * 0.6;
    setRy(ryRef.current);
  }
  function up(e: PE<HTMLDivElement>) {
    drag.current = false;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  const bind = {
    onPointerDown: down,
    onPointerMove: move,
    onPointerUp: up,
    onPointerCancel: up,
  };

  return { ry, bind, dragging };
}

export function MedalAward({ id }: { id: MedalId }) {
  const m = medalById(id);
  return (
    <div className="relative isolate mb-10 overflow-hidden rounded-lg bg-bg px-5 py-12 text-center">
      <p className="font-mono text-[10px] tracking-[0.32em] text-accent">
        CONQUISTA DESBLOQUEADA
      </p>
      <div className="medal-drop mt-8 flex justify-center">
        <Medal id={id} spin earned />
      </div>
      <p className="mt-8 font-mono text-[10px] tracking-[0.28em] text-accent">
        {m.series} · {m.vector}
      </p>
      <p className="mt-3 font-mono text-[10px] tracking-[0.18em] text-dim">
        Arraste para virar · conhecimento é a melhor defesa
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
