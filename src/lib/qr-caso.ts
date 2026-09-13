export type QrAction = "pagar" | "oficial" | "recusar";

export type QrScene = {
  id: string;
  code: string;
  title: string;
  place: string;
  stamp: string;
  dest: string;
  same: boolean;
  briefing: string;
  debrief: string;
  correct: QrAction;
};

export const QR_CASE_ID = "qr";

export const QR_SCENES: QrScene[] = [
  {
    id: "mesa",
    code: "CENA 01",
    title: "PIX da mesa",
    place: "Restaurante Lua",
    stamp: "Carimbo: CNPJ 12.345.678/0001-90 · Restaurante Lua",
    dest: "pix-lua-mesa.tk/pagar",
    same: false,
    briefing:
      "A conta chegou. Tem um QR colado no porta-guardanapo. Toque no código, leia o destino, compare com o carimbo.",
    debrief:
      "O carimbo é o restaurante. O código aponta para um .tk. Destino ≠ carimbo. Não pague este QR. Peça a chave no caixa ou no cardápio impresso da casa.",
    correct: "recusar",
  },
  {
    id: "pedagio",
    code: "CENA 02",
    title: "O pedágio",
    place: "Cabine 4 · via",
    stamp: "Placa: DER — débito de pedágio · canal oficial no app da concessionária",
    dest: "pix-gov-pedagio.tk",
    same: false,
    briefing:
      "Um adesivo na cabine pede PIX “pra não gerar multa”. Toque no QR. O órgão de verdade não cobra pedágio atrasado num .tk.",
    debrief:
      "Carimbo de órgão, destino de site duvidoso. Não pague. Se existir débito, o app da concessionária que você já usa mostra — sem adesivo.",
    correct: "recusar",
  },
  {
    id: "cardapio",
    code: "CENA 03",
    title: "O cardápio",
    place: "Bar do Porto",
    stamp: "Cardápio impresso · Bar do Porto · 10% off no PIX da casa",
    dest: "cardapio-oferta.xyz/desconto",
    same: false,
    briefing:
      "O desconto pede o QR do canto da folha. Toque e leia para onde ele manda — não o texto em volta.",
    debrief:
      "Promoção no papel, destino .xyz. O desconto verdadeiro está no caixa. Não pague o código.",
    correct: "recusar",
  },
  {
    id: "cancela",
    code: "CENA 04",
    title: "A cancela",
    place: "Estacionamento Norte",
    stamp: "Ticket: Estacionamento Norte · pague no totem da saída",
    dest: "estaciona-pay.tk/liberar",
    same: false,
    briefing:
      "Alguém colou um QR em cima do ticket: “pague aqui pra abrir”. Toque. Compare com o totem.",
    debrief:
      "O totem é o canal. O adesivo é o golpe. Cancela não se abre por .tk. Recusar.",
    correct: "recusar",
  },
  {
    id: "padaria",
    code: "CENA 05",
    title: "O cupom",
    place: "Padaria Sul",
    stamp: "Cupom: Padaria Sul · CNPJ 98.765.432/0001-10",
    dest: "PIX CNPJ 98.765.432/0001-10 · Padaria Sul (mesmo CNPJ do cupom)",
    same: true,
    briefing:
      "O cupom fiscal veio com QR. Toque. Desta vez o destino pode bater com o carimbo — ainda assim você não paga “nesta tela”.",
    debrief:
      "Destino = carimbo. Mesmo assim o passo seguro é abrir o aplicativo do SEU banco e conferir o CNPJ. Não pague um QR que está neste treino. Canal oficial.",
    correct: "oficial",
  },
];

export const QR_SCENE_IDS = QR_SCENES.map((s) => s.id);

export function qrById(id: string) {
  return QR_SCENES.find((s) => s.id === id) ?? null;
}

export function adjacentQr(id: string) {
  const i = QR_SCENES.findIndex((s) => s.id === id);
  return {
    prev: i > 0 ? QR_SCENES[i - 1] : null,
    next: i >= 0 && i < QR_SCENES.length - 1 ? QR_SCENES[i + 1] : null,
  };
}

export function judgeQr(scene: QrScene, action: QrAction) {
  return {
    ok: action === scene.correct,
    paidTrap: action === "pagar",
  };
}

export function qrCells(seed: string, n = 21): boolean[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const cells: boolean[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const finder =
        (x < 7 && y < 7) ||
        (x >= n - 7 && y < 7) ||
        (x < 7 && y >= n - 7);
      if (finder) {
        const edge = x === 0 || y === 0 || x === 6 || y === 6 || x === n - 1 || y === n - 1 || x === n - 7 || y === n - 7;
        const inner = (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
          (x >= n - 5 && x <= n - 3 && y >= 2 && y <= 4) ||
          (x >= 2 && x <= 4 && y >= n - 5 && y <= n - 3);
        cells.push(edge || inner);
        continue;
      }
      h = Math.imul(h ^ (x * 73 + y * 19), 16777619);
      cells.push(((h >>> 0) & 3) !== 0);
    }
  }
  return cells;
}

export function qrPayload(scene: QrScene) {
  return `SIMULACAO EDUCACIONAL OP-003. Nao pague este codigo. Nao acesse site nenhum. Treino Operacao Phishing. Destino inventado: ${scene.dest}`;
}

export const QR_ACTION_LABEL: Record<QrAction, string> = {
  pagar: "Pagar neste QR",
  oficial: "Conferir no canal oficial",
  recusar: "Não pagar — é golpe",
};
