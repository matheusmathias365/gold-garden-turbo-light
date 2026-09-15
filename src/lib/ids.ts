import { CHALLENGES } from "./challenges";
import { LESSONS } from "./course";
import { LABS } from "./lab-data";
import { PLANTAO_ID } from "./plantao";
import { QR_CASE_ID } from "./qr-caso";
import { X_CASE_ID } from "./elo-caso";
import { VOZ_CASE_ID } from "./voz-caso";

export const TERMINAL_ID = "soc";
export const PROTOCOL_ID = "protocol";
export { PLANTAO_ID };
export { QR_CASE_ID };
export { VOZ_CASE_ID };
export { X_CASE_ID };

export const LESSON_IDS = LESSONS.map((l) => l.id);
export const LAB_IDS = [...LABS.map((l) => l.id), TERMINAL_ID];
export const CHALLENGE_IDS = CHALLENGES.map((c) => c.id);

export const ALL_IDS = [
  ...LESSON_IDS,
  ...LAB_IDS,
  ...CHALLENGE_IDS,
  PROTOCOL_ID,
];

export function countDone(completed: string[], ids: readonly string[]) {
  return ids.filter((id) => completed.includes(id)).length;
}
