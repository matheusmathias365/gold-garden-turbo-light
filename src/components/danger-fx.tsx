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

const LOOKALIKES: Record<string, string[]> = {
  a: ["a", "A", "α", "а", "@", "4", "å"],
  b: ["b", "B", "ß", "8"],
  c: ["c", "C", "с", "ç"],
  ç: ["ç", "c", "C", "ç"],
  d: ["d", "D", "đ"],
  e: ["e", "E", "ε", "е", "3"],
  f: ["f", "F"],
  g: ["g", "G", "9"],
  h: ["h", "H", "ħ", "н", "ĥ", "#"],
  i: ["i", "I", "í", "1", "|"],
  j: ["j", "J"],
  k: ["k", "K"],
  l: ["l", "L", "1", "|"],
  m: ["m", "M"],
  n: ["n", "N", "η"],
  o: ["o", "O", "0", "ο", "о", "ø"],
  p: ["p", "P", "ρ", "р"],
  q: ["q", "Q"],
  r: ["r", "R", "г"],
  s: ["s", "S", "$", "5"],
  t: ["t", "T", "т"],
  u: ["u", "U", "υ"],
  v: ["v", "V"],
  w: ["w", "W"],
  x: ["x", "X", "×"],
  y: ["y", "Y", "¥"],
  z: ["z", "Z", "2"],
  ã: ["ã", "a", "á", "@", "Ã"],
};

type FailCh = {
  raw: string;
  ch: string;
  face: string;
  scaleY: number;
  y: number;
  skew: number;
  rotate: number;
  weight: number;
};

function wordFrame(text: string, tick: number, hot: boolean): FailCh[] {
  const brand = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
  return Array.from(text, (raw, i) => {
    const key = raw.toLowerCase();
    const pool = LOOKALIKES[key] ?? [raw];
    const corrupt = hot && (tick + i) % 3 !== 1;
    const pick = pool[(tick + i * 2) % pool.length] ?? raw;
    return {
      raw,
      ch: corrupt ? pick : raw,
      face: corrupt ? (FACE[(tick + i * 2) % FACE.length] ?? FACE[0]!) : brand,
      scaleY: corrupt ? 0.72 + ((tick + i * 5) % 6) * 0.1 : 1,
      y: corrupt ? ((tick * 3 + i * 11) % 11) - 5 : 0,
      skew: corrupt ? ((tick + i * 7) % 13) - 6 : 0,
      rotate: corrupt ? ((tick * 2 + i * 5) % 9) - 4 : 0,
      weight: corrupt ? 500 + ((tick + i) % 3) * 100 : 600,
    };
  });
}

export function FailWord({
  text,
  reduce,
  hot = true,
  align = "center",
  tone = "danger",
  className,
}: {
  text: string;
  reduce?: boolean;
  hot?: boolean;
  align?: "center" | "start";
  tone?: "danger" | "accent" | "fg";
  className?: string;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setTick((n) => n + 1), hot ? 95 : 160);
    return () => window.clearInterval(id);
  }, [reduce, hot]);

  const letters = useMemo(() => wordFrame(text, tick, hot && !reduce), [text, tick, hot, reduce]);
  const frame = letters.map((l) => l.ch).join("");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={cn(
        "hahaha-fail",
        align === "start" && "title-fail",
        tone === "accent" && "title-fail-accent",
        tone === "fg" && "title-fail-fg",
        className,
      )}
      aria-label={text}
      data-text={text}
    >
      <span className="hahaha-slot" aria-hidden>
        {text}
      </span>
      <span className="hahaha-fx" aria-hidden>
        <span className="hahaha-rgb hahaha-rgb-c">{frame}</span>
        <span className="hahaha-rgb hahaha-rgb-m">{frame}</span>
        <span className="hahaha-word">
          {letters.map((l, i) => (
            <span key={`${text}-${i}`} className="hahaha-cell">
              <span className="hahaha-cell-slot">{l.raw}</span>
              <span
                className="hahaha-ch"
                style={{
                  fontFamily: l.face,
                  fontWeight: l.weight,
                  transform: `translateY(${l.y}px) skewX(${l.skew}deg) rotate(${l.rotate}deg) scaleY(${l.scaleY})`,
                }}
              >
                {l.ch}
              </span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}

function FailLaugh() {
  return (
    <FailWord
      text="hahaha"
      hot
      className="font-display text-5xl font-semibold tracking-tight text-danger md:text-7xl"
    />
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
