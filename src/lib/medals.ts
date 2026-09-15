export type MedalId = "001" | "002" | "003" | "004" | "x";

export type MedalDef = {
  id: MedalId;
  series: string;
  vector: string;
  title: string;
};

export const MEDALS: MedalDef[] = [
  { id: "001", series: "OP-001", vector: "OLHO", title: "Operação Phishing" },
  { id: "002", series: "OP-002", vector: "PRESSA", title: "Plantão SOC" },
  { id: "003", series: "OP-003", vector: "QR", title: "O QR" },
  { id: "004", series: "OP-004", vector: "VOZ", title: "A voz" },
  { id: "x", series: "X-001", vector: "ELO", title: "O elo mais fraco" },
];

export function medalById(id: MedalId) {
  return MEDALS.find((m) => m.id === id) ?? MEDALS[0]!;
}
