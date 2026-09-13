export type Channel = "whatsapp" | "sms" | "email" | "push";
export type Action = "golpe" | "oficial" | "ignorar";

export type Ticket = {
  id: string;
  channel: Channel;
  from: string;
  body: string;
  meta?: string;
  correct: Action;
  debrief: string;
};

export const PLANTAO_SECONDS = 90;
export const PLANTAO_QUEUE = 8;
export const PLANTAO_ID = "plantao";

export const TICKETS: Ticket[] = [
  {
    id: "mae-pix",
    channel: "whatsapp",
    from: "Número novo",
    body: "Filho sou eu. Troquei de chip. Preciso de um PIX de R$ 80 agora, depois te explico.",
    meta: "WhatsApp · 1 mensagem",
    correct: "golpe",
    debrief:
      "Troca de número + PIX + pressa. A mãe de verdade você liga no número antigo. Arquivar como golpe.",
  },
  {
    id: "sms-bloqueio",
    channel: "sms",
    from: "NUVEMBANK",
    body: "Conta BLOQUEADA em 10 min. Confirme: nuvembank-seguro.tk/acesso",
    meta: "SMS · agora",
    correct: "golpe",
    debrief:
      "Relógio, ameaça e link. Banco real manda abrir o app — não um .tk. Arquivar.",
  },
  {
    id: "email-taxa",
    channel: "email",
    from: "entregas.sul@gmail.com",
    body: "Encomenda retida. Taxa de R$ 2,90 para liberar: rastreio-taxa.xyz/pagar",
    meta: "Assunto: Sua encomenda parou",
    correct: "golpe",
    debrief:
      "Remetente de Gmail, taxa miúda, domínio .xyz. Transportadora de verdade está no app da loja. Arquivar.",
  },
  {
    id: "push-iphone",
    channel: "push",
    from: "Sorteio MagaluPrime",
    body: "Você ganhou um iPhone 16. Resgate em 2h com CPF e cartão da taxa de envio.",
    meta: "Notificação · app desconhecido",
    correct: "golpe",
    debrief:
      "Prêmio que você não inscreveu + cartão. Isso é isca. Arquivar. Não resgatar.",
  },
  {
    id: "chefe-pix",
    channel: "whatsapp",
    from: "Chefe (novo)",
    body: "Estou em reunião. Faz um PIX de R$ 1.850 pra essa chave. NÃO LIGA.",
    meta: "WhatsApp · 21:14",
    correct: "golpe",
    debrief:
      "Isolar, silenciar o ramal e pedir dinheiro. Superior de verdade aceita um retorno no ramal. Arquivar.",
  },
  {
    id: "qr-pedagio",
    channel: "sms",
    from: "PEDAGIO-BR",
    body: "Débito de pedágio pendente. Pague no QR: pix-gov-pedagio.tk",
    meta: "SMS · 08:02",
    correct: "golpe",
    debrief:
      "Órgão público não cobra pedágio atrasado por SMS com .tk. Arquivar. Não pagar o QR.",
  },
  {
    id: "compra-app",
    channel: "push",
    from: "NuvemBank",
    body: "Compra de R$ 12,90 aprovada. Se não foi você, abra o aplicativo.",
    meta: "Notificação do app que você já tem",
    correct: "oficial",
    debrief:
      "Sem link. Manda abrir o app que já está no telefone. Canal oficial — não é pra arquivar como golpe nem ignorar.",
  },
  {
    id: "fatura-app",
    channel: "sms",
    from: "NuvemBank",
    body: "Sua fatura vence amanhã. Consulte no aplicativo NuvemBank. Não pedimos senha por SMS.",
    meta: "SMS · sem link",
    correct: "oficial",
    debrief:
      "Aviso seco, sem atalho, sem senha. O passo certo é abrir o app oficial. Canal oficial.",
  },
  {
    id: "rh-portal",
    channel: "email",
    from: "folha@empresa.internal",
    body: "Holerite no portal interno. Não use link deste e-mail — entre pelo atalho que você já usa no trabalho.",
    meta: "RH · interno",
    correct: "oficial",
    debrief:
      "Quem avisa para NÃO clicar no próprio e-mail está te mandando ao canal que você já conhece. Canal oficial.",
  },
  {
    id: "seguidores",
    channel: "whatsapp",
    from: "Grupo Ofertas",
    body: "Ganhe 10 mil seguidores hoje. Só encaminhar esta mensagem para 20 contatos.",
    meta: "WhatsApp · grupo",
    correct: "ignorar",
    debrief:
      "Corrente. Sem conta, sem PIX, sem senha. Lixo. Ignorar. Encaminhar só espalha.",
  },
  {
    id: "newsletter",
    channel: "email",
    from: "loja@sapato.exemplo",
    body: "40% off nesta semana. Descadastrar no rodapé. Não pedimos dados de cartão neste e-mail.",
    meta: "Newsletter · sem urgência de conta",
    correct: "ignorar",
    debrief:
      "Promoção chata não é phishing só por existir. Sem relógio de conta, sem senha. Ignorar ou descadastrar no site que você já usa.",
  },
  {
    id: "renda-sms",
    channel: "sms",
    from: "3040",
    body: "CONCURSEIRO: renda extra em 24h. Clique e informe o PIX.",
    meta: "SMS curto",
    correct: "golpe",
    debrief:
      "Renda milagrosa + PIX. Isso é golpe, não ruído. Arquivar.",
  },
];

const POOL: Record<Action, Ticket[]> = {
  golpe: TICKETS.filter((t) => t.correct === "golpe"),
  oficial: TICKETS.filter((t) => t.correct === "oficial"),
  ignorar: TICKETS.filter((t) => t.correct === "ignorar"),
};

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = copy[i];
    const b = copy[j];
    if (a === undefined || b === undefined) continue;
    copy[i] = b;
    copy[j] = a;
  }
  return copy;
}

export function dealShift(): Ticket[] {
  const golpes = shuffle(POOL.golpe).slice(0, 4);
  const oficiais = shuffle(POOL.oficial).slice(0, 2);
  const ruido = shuffle(POOL.ignorar).slice(0, 2);
  return shuffle([...golpes, ...oficiais, ...ruido]);
}

export function judge(
  ticket: Ticket,
  action: Action | "timeout",
): { ok: boolean; baitPassed: boolean; falseAlarm: boolean } {
  if (action === "timeout") {
    return {
      ok: false,
      baitPassed: ticket.correct === "golpe",
      falseAlarm: false,
    };
  }
  return {
    ok: action === ticket.correct,
    baitPassed: ticket.correct === "golpe" && action !== "golpe",
    falseAlarm: ticket.correct !== "golpe" && action === "golpe",
  };
}

export type ShiftLog = {
  ticket: Ticket;
  action: Action | "timeout";
  ok: boolean;
  baitPassed: boolean;
  falseAlarm: boolean;
};

export function tally(log: ShiftLog[]) {
  const baits = log.filter((l) => l.ticket.correct === "golpe").length;
  const caught = log.filter(
    (l) => l.ticket.correct === "golpe" && l.action === "golpe",
  ).length;
  const passed = log.filter((l) => l.baitPassed).length;
  const falseAlarms = log.filter((l) => l.falseAlarm).length;
  const ok = log.filter((l) => l.ok).length;
  return { baits, caught, passed, falseAlarms, ok, total: log.length };
}

export const CHANNEL_LABEL: Record<Channel, string> = {
  whatsapp: "WHATSAPP",
  sms: "SMS",
  email: "E-MAIL",
  push: "NOTIFICAÇÃO",
};

export const ACTION_LABEL: Record<Action, string> = {
  golpe: "Arquivar como golpe",
  oficial: "Canal oficial",
  ignorar: "Ignorar",
};
