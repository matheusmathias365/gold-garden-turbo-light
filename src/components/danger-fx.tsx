import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Btn } from "@/components/ui";
import { cn } from "@/lib/utils";

const GLYPHS = "01ABCDEFxyz$#@!?/\\<>*%ΞΔλ¥";

type Glyph = { id: number; x: number; y: number; ch: string };

export function RedGlyphTrail({ enabled }: { enabled: boolean }) {
  const [glyphs, setGlyphs] = useState<Glyph[]>([]);
  const id = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function move(e: MouseEvent) {
      const now = performance.now();
      if (now - last.current < 32) return;
      last.current = now;
      const g: Glyph = {
        id: id.current++,
        x: e.clientX + (Math.random() * 18 - 9),
        y: e.clientY + (Math.random() * 18 - 9),
        ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0",
      };
      setGlyphs((prev) => [...prev.slice(-36), g]);
      window.setTimeout(() => {
        setGlyphs((prev) => prev.filter((x) => x.id !== g.id));
      }, 700);
    }
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[25] overflow-hidden" aria-hidden>
      {glyphs.map((g) => (
        <span
          key={g.id}
          className="glyph-red absolute font-mono text-xs font-semibold text-danger"
          style={{ left: g.x, top: g.y }}
        >
          {g.ch}
        </span>
      ))}
    </div>
  );
}

const FACE = [
  '"IBM Plex Mono", ui-monospace, Menlo, monospace',
  '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  'Georgia, "Times New Roman", serif',
  'Impact, "Arial Black", sans-serif',
  'Palatino, "Palatino Linotype", ui-serif, serif',
  '"Courier New", Courier, monospace',
  "cursive",
];

const GLYPH_H = ["h", "H", "ħ", "н", "ĥ", "ʜ", "#", "𝔥"];
const GLYPH_A = ["a", "A", "α", "а", "@", "4", "å", "ä"];

type FailCh = {
  ch: string;
  face: string;
  scaleY: number;
  y: number;
  skew: number;
  rotate: number;
  weight: number;
};

function failFrame(tick: number): FailCh[] {
  return Array.from({ length: 6 }, (_, i) => {
    const pool = i % 2 === 0 ? GLYPH_H : GLYPH_A;
    const real = i % 2 === 0 ? "h" : "a";
    const corrupt = (tick + i * 3) % 4 !== 1;
    const g = pool[(tick + i * 2) % pool.length] ?? real;
    return {
      ch: corrupt ? g : real,
      face: FACE[(tick + i * 2) % FACE.length] ?? FACE[0]!,
      scaleY: 0.68 + ((tick + i * 5) % 7) * 0.12,
      y: ((tick * 3 + i * 11) % 13) - 6,
      skew: ((tick + i * 7) % 17) - 8,
      rotate: ((tick * 2 + i * 5) % 11) - 5,
      weight: 500 + ((tick + i) % 3) * 100,
    };
  });
}

function FailLaugh() {
  const [tick, setTick] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((n) => n + 1), 95);
    return () => window.clearInterval(id);
  }, [reduce]);

  const letters = useMemo(() => failFrame(tick), [tick]);
  const frame = letters.map((l) => l.ch).join("");

  if (reduce) {
    return (
      <p className="font-mono text-4xl font-semibold tracking-[0.12em] text-danger md:text-6xl">
        hahaha
      </p>
    );
  }

  return (
    <p
      className="hahaha-fail font-display text-5xl font-semibold tracking-tight text-danger md:text-7xl"
      aria-label="hahaha"
      data-text={frame}
    >
      <span className="hahaha-rgb hahaha-rgb-c" aria-hidden>
        {frame}
      </span>
      <span className="hahaha-rgb hahaha-rgb-m" aria-hidden>
        {frame}
      </span>
      <span className="hahaha-word">
        {letters.map((l, i) => (
          <span
            key={i}
            className="hahaha-ch"
            style={{
              fontFamily: l.face,
              fontWeight: l.weight,
              transform: `translateY(${l.y}px) skewX(${l.skew}deg) rotate(${l.rotate}deg) scaleY(${l.scaleY})`,
            }}
          >
            {l.ch}
          </span>
        ))}
      </span>
    </p>
  );
}

export function PanicOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!open) {
      setBeat(0);
      return;
    }
    const t1 = window.setTimeout(() => setBeat(1), 180);
    const t2 = window.setTimeout(() => setBeat(2), 900);
    const t3 = window.setTimeout(() => setBeat(3), 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Simulação de pânico. É teatro educacional."
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-6"
    >
      <div className="emergency-wash pointer-events-none absolute inset-0" />
      <div className="relative max-w-2xl text-center">
        <FailLaugh />
        {beat >= 1 ? (
          <p className="mt-4 font-display text-2xl font-semibold text-fg md:text-4xl">
            você ainda não aprendeu?
          </p>
        ) : null}
        {beat >= 2 ? (
          <p className="mt-6 font-display text-3xl font-semibold uppercase tracking-tight text-danger md:text-5xl">
            foi clonado
          </p>
        ) : null}
        {beat >= 3 ? (
          <>
            <p className="mt-8 font-mono text-xs tracking-[0.2em] text-muted">
              É APENAS UMA SIMULAÇÃO. NADA FOI CLONADO. NENHUM DADO SAIU DAQUI.
            </p>
            <p className="mt-3 text-sm text-muted">
              O golpe usa o susto. O treino usa o mesmo susto — e devolve o
              controle.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/jogar">
                <Btn>Treinar agora</Btn>
              </Link>
              <Btn variant="ghost" onClick={onClose}>
                Fechar
              </Btn>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function PanicButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="no-print panic-stop fixed right-5 top-[62%] z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
      aria-label="Botão de pânico. Teatro. Não clona nada."
    >
      <span className="font-mono text-[9px] tracking-[0.22em] text-danger">
        NÃO APERTE
      </span>
      <span className="panic-glow inline-flex min-h-11 items-center justify-center rounded-md bg-danger px-6 font-mono text-[10px] font-semibold tracking-[0.2em] text-black">
        PÂNICO
      </span>
    </button>
  );
}
