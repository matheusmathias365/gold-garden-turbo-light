import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { sanitizeCallsign } from "@/lib/safe";

export type Score = { correct: number; total: number };

type ProgressState = {
  callsign: string;
  booted: boolean;
  completed: string[];
  scores: Record<string, Score>;
  clues: Record<string, string[]>;
  issuedAt: string | null;
  plantaoAt: string | null;
  qrAt: string | null;
  vozAt: string | null;
  setCallsign: (callsign: string) => void;
  completeBoot: () => void;
  markComplete: (id: string) => void;
  setScore: (id: string, correct: number, total: number) => void;
  addClue: (labId: string, clueId: string) => void;
  issueCertificate: () => void;
  issuePlantao: () => void;
  issueQr: () => void;
  issueVoz: () => void;
  reset: () => void;
};

const empty = {
  callsign: "",
  booted: false,
  completed: [] as string[],
  scores: {} as Record<string, Score>,
  clues: {} as Record<string, string[]>,
  issuedAt: null as string | null,
  plantaoAt: null as string | null,
  qrAt: null as string | null,
  vozAt: null as string | null,
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...empty,
      setCallsign: (callsign) => set({ callsign: sanitizeCallsign(callsign) }),
      completeBoot: () => set({ booted: true }),
      markComplete: (id) =>
        set((s) =>
          s.completed.includes(id) ? s : { completed: [...s.completed, id] },
        ),
      setScore: (id, correct, total) =>
        set((s) => {
          const prev = s.scores[id];
          if (prev && prev.correct >= correct && prev.total === total) return s;
          return { scores: { ...s.scores, [id]: { correct, total } } };
        }),
      addClue: (labId, clueId) =>
        set((s) => {
          const cur = s.clues[labId] ?? [];
          if (cur.includes(clueId)) return s;
          return { clues: { ...s.clues, [labId]: [...cur, clueId] } };
        }),
      issueCertificate: () =>
        set((s) => (s.issuedAt ? s : { issuedAt: new Date().toISOString() })),
      issuePlantao: () =>
        set((s) => (s.plantaoAt ? s : { plantaoAt: new Date().toISOString() })),
      issueQr: () =>
        set((s) => (s.qrAt ? s : { qrAt: new Date().toISOString() })),
      issueVoz: () =>
        set((s) => (s.vozAt ? s : { vozAt: new Date().toISOString() })),
      reset: () => set({ ...empty }),
    }),
    { name: "operacao-phishing-v1" },
  ),
);

export const EMPTY_CLUES: string[] = [];

export function useHasHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const unsub = useProgress.persist.onFinishHydration(() => setHydrated(true));
    if (useProgress.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);
  return hydrated;
}
