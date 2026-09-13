/** Callsign stays on-device. Letters/numbers only — no markup, no path. */
export function sanitizeCallsign(raw: string) {
  return raw
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N} \-_.]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 16)
    .toUpperCase();
}

export function safeFilePart(raw: string) {
  const s = sanitizeCallsign(raw).replace(/[^\p{L}\p{N}\-_]/gu, "") || "agente";
  return s.slice(0, 24);
}

export function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}
