import { create } from "zustand";

export const XP_NEED = 1500;
const SS_KEY = "op-xp-session-v1";

type Snap = { xp: number; awarded: string[] };

function load(): Snap {
  if (typeof sessionStorage === "undefined") return { xp: 0, awarded: [] };
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    if (!raw) return { xp: 0, awarded: [] };
    const p = JSON.parse(raw) as Partial<Snap>;
    const xp = Number(p.xp);
    const awarded = Array.isArray(p.awarded)
      ? p.awarded.filter((x) => typeof x === "string").slice(0, 80)
      : [];
    return { xp: Number.isFinite(xp) ? Math.max(0, Math.min(8000, xp)) : 0, awarded };
  } catch {
    return { xp: 0, awarded: [] };
  }
}

function save(s: Snap) {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(SS_KEY, JSON.stringify(s));
  } catch {
    /* */
  }
}

type XpState = Snap & {
  award: (key: string, amount: number) => void;
  resetSession: () => void;
};

export const useSessionXp = create<XpState>((set, get) => ({
  ...load(),
  award(key, amount) {
    const k = String(key).slice(0, 64);
    const n = Math.floor(Number(amount));
    if (!k || n <= 0) return;
    if (get().awarded.includes(k)) return;
    const next: Snap = {
      xp: Math.min(8000, get().xp + n),
      awarded: [...get().awarded, k].slice(0, 80),
    };
    save(next);
    set(next);
  },
  resetSession() {
    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.removeItem(SS_KEY);
      } catch {
        /* */
      }
    }
    set({ xp: 0, awarded: [] });
  },
}));

export function awardXp(key: string, amount: number) {
  useSessionXp.getState().award(key, amount);
}

export function xVisible(qrDone: boolean, vozDone: boolean, xDone: boolean) {
  return qrDone || vozDone || xDone;
}

export function xOpen(vozDone: boolean, xDone: boolean) {
  return vozDone || xDone;
}
