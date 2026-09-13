import type { ClueKind } from "./course";

export type LabClue = {
  id: string;
  kind: ClueKind;
  label: string;
  explanation: string;
};

export type LabCase = {
  id: string;
  code: string;
  title: string;
  channel: "sms" | "email" | "chat" | "page" | "premio";
  channelLabel: string;
  briefing: string;
  objective: string;
  debrief: string;
  safeAction: string;
  clues: LabClue[];
};

export const LABS: LabCase[] = [
  {
    id: "sms-banco",
    code: "CASO A",
    title: "O SMS do banco",
    channel: "sms",
    channelLabel: "SMS",
    briefing:
      "Uma mensagem chegou dizendo que a conta será bloqueada. Inspecione o texto e marque cada evidência.",
    objective: "Encontre as 4 pistas escondidas no SMS.",
    debrief:
      "O banco real não manda link curto com domínio estranho nem ameaça de bloqueio em minutos. O caminho seguro é abrir o aplicativo que você já tem instalado — nunca o atalho da mensagem.",
    safeAction:
      "Abrir o aplicativo oficial do banco e checar avisos por lá. Se nada aparecer, ignorar o SMS.",
    clues: [
      {
        id: "urgencia",
        kind: "pressao",
        label: "Bloqueio em 10 minutos",
        explanation:
          "Relógio curto existe para impedir que você pense. Instituições reais raramente impõem prazo de minutos por SMS.",
      },
      {
        id: "dominio",
        kind: "link",
        label: "Domínio falso",
        explanation:
          "nuvembank-seguro.tk não é o domínio do banco. Sufixo estranho e hífen extra são clássicos de imitação.",
      },
      {
        id: "isca-acesso",
        kind: "isca",
        label: "Alerta de acesso suspeito",
        explanation:
          "A isca usa um medo verdadeiro (alguém na conta) para justificar o clique imediato.",
      },
      {
        id: "confirme",
        kind: "pedido",
        label: "Confirmar identidade pelo link",
        explanation:
          "Identidade se confirma no app ou no caixa eletrônico — não num link que chegou no celular.",
      },
    ],
  },
  {
    id: "email-entrega",
    code: "CASO B",
    title: "A taxa da encomenda",
    channel: "email",
    channelLabel: "E-mail",
    briefing:
      "Um e-mail avisa que a encomenda está retida. Há uma taxa pequena para “liberar”. Marque o que não fecha.",
    objective: "Encontre as 5 evidências no e-mail.",
    debrief:
      "Taxa minúscula + encomenda retida + remetente genérico é um dos golpes mais comuns. Transportadoras oficiais mostram o rastreio no site ou no app delas, sem pedir cartão por e-mail.",
    safeAction:
      "Abrir o app da loja ou da transportadora pelo ícone que você já usa e buscar o código de rastreio lá.",
    clues: [
      {
        id: "remetente",
        kind: "inconsistencia",
        label: "Remetente no Gmail",
        explanation:
          "Empresa de entrega não escreve de uma caixa gratuita com nome fantasia. O endereço não combina com a marca.",
      },
      {
        id: "assunto",
        kind: "isca",
        label: "Encomenda retida",
        explanation:
          "A isca é a encomenda que você talvez esteja esperando. O cérebro completa o resto.",
      },
      {
        id: "taxa",
        kind: "pedido",
        label: "Taxa de R$ 2,90",
        explanation:
          "Valores baixos reduzem a desconfiança. O objetivo é o cartão, não os R$ 2,90.",
      },
      {
        id: "link-xyz",
        kind: "link",
        label: "Link com .xyz",
        explanation:
          "O destino não é o site da transportadora. Domínio genérico + caminho /taxa é bandeira vermelha.",
      },
      {
        id: "portugues",
        kind: "inconsistencia",
        label: "Texto torto",
        explanation:
          "Erro de concordância e tom estranho não provam sozinhos, mas somam ao restante do padrão.",
      },
    ],
  },
  {
    id: "chat-pix",
    code: "CASO C",
    title: "O PIX da chefia",
    channel: "chat",
    channelLabel: "Chat",
    briefing:
      "Alguém se passando por um superior pede um PIX urgente. Analise o isolamento, o pedido e o canal.",
    objective: "Encontre as 5 pistas nesta conversa.",
    debrief:
      "Golpe do falso superior: urgência, reunião, “não ligue”, valor redondo e chave nova. A contraprova é um canal que você já usava — ramal, e-mail corporativo, conversa anterior.",
    safeAction:
      "Ligar no ramal conhecido ou perguntar pessoalmente. Não pagar. Não responder o comprovante.",
    clues: [
      {
        id: "reuniao",
        kind: "pressao",
        label: "Estou em reunião",
        explanation:
          "A reunião impede pergunta. Isolar a vítima é parte do roteiro, não um detalhe.",
      },
      {
        id: "nao-ligue",
        kind: "pressao",
        label: "Não ligue agora",
        explanation:
          "Quem pede segredo e bloqueia a verificação está escondendo o golpe, não o conselho.",
      },
      {
        id: "pix",
        kind: "pedido",
        label: "PIX de R$ 1.850",
        explanation:
          "Pedido financeiro inesperado por mensagem, mesmo “do chefe”, deve ser conferido fora do chat.",
      },
      {
        id: "chave",
        kind: "inconsistencia",
        label: "Chave pessoal nova",
        explanation:
          "Fornecedor da empresa quase nunca recebe em celular pessoal recém-informado numa pressa.",
      },
      {
        id: "tom",
        kind: "inconsistencia",
        label: "Tom informal demais",
        explanation:
          "Urgência + intimidade forçada (“tô no mute”, “me salva”) tenta encurtar a desconfiança.",
      },
    ],
  },
  {
    id: "pagina-clone",
    code: "CASO D",
    title: "A página gêmea",
    channel: "page",
    channelLabel: "Página",
    briefing:
      "Duas telas de login. Uma é o serviço. A outra é a armadilha. Compare URL, cadeado, campos e pressão.",
    objective: "Marque as 5 diferenças na página da direita.",
    debrief:
      "Clonar visual é barato. O que não clona bem: o domínio, o cadeado verdadeiro, a ausência de relógio e a quantidade de campos. Se a página pede mais do que o app pede, saia.",
    safeAction:
      "Fechar a aba, abrir o navegador, digitar o endereço oficial ou usar o aplicativo. Nunca colar senha na página da mensagem.",
    clues: [
      {
        id: "url",
        kind: "link",
        label: "URL imitadora",
        explanation:
          "banco-litoral.secure-login.net coloca o nome da marca à esquerda, mas o dono do site é outro.",
      },
      {
        id: "cadeado",
        kind: "inconsistencia",
        label: "Conexão não confiável",
        explanation:
          "Aviso de conexão insegura ou cadeado ausente já basta para não inserir senha.",
      },
      {
        id: "timer",
        kind: "pressao",
        label: "Cronômetro na tela",
        explanation:
          "Serviço real de banco não coloca countdown de bloqueio na página de login.",
      },
      {
        id: "campos",
        kind: "pedido",
        label: "Campos a mais",
        explanation:
          "Código SMS + validade do cartão no mesmo login é pedido demais. É colheita de dados.",
      },
      {
        id: "botao",
        kind: "isca",
        label: "Botão de pânico",
        explanation:
          "“Confirmar agora ou perder acesso” é isca visual. Login verdadeiro é calmo.",
      },
    ],
  },
  {
    id: "premio",
    code: "CASO E",
    title: "O prêmio impossível",
    channel: "premio",
    channelLabel: "Sorteio",
    briefing:
      "Você “ganhou” um celular. Para resgatar, pedem CPF e cartão “só da taxa de envio”. Desmonte a oferta.",
    objective: "Encontre as 4 evidências da armadilha.",
    debrief:
      "Prêmio que você não inscreveu + taxa para receber + dados de cartão. Se fosse real, ninguém cobraria o prêmio de você. Oferta que parece sorte grande demais quase sempre é isca.",
    safeAction:
      "Não clicar, não informar CPF nem cartão. Fechar. Se já informou cartão, contatar o banco pelo app oficial.",
    clues: [
      {
        id: "ganhou",
        kind: "isca",
        label: "Prêmio que você não pediu",
        explanation:
          "Sorteio sem inscrição é o gancho clássico. A curiosidade faz o resto.",
      },
      {
        id: "prazo",
        kind: "pressao",
        label: "Expira em 2 horas",
        explanation:
          "Prazo curto impede que você procure o sorteio verdadeiro — que não existe.",
      },
      {
        id: "cartao",
        kind: "pedido",
        label: "Cartão para taxa de envio",
        explanation:
          "Quem “ganha” um aparelho não paga com número de cartão completo. Isso é o objetivo do golpe.",
      },
      {
        id: "site",
        kind: "link",
        label: "Site de resgate duvidoso",
        explanation:
          "O domínio mistura marca famosa com “premio-resgate”. Não é o site da fabricante nem de uma loja conhecida.",
      },
    ],
  },
];

export function labById(id: string) {
  return LABS.find((l) => l.id === id) ?? null;
}

export type LabNav = { id: string; title: string; code: string };

export const SOC_NAV: LabNav = {
  id: "soc",
  title: "Caso F · Terminal SOC",
  code: "CASO F",
};

export const LAB_SEQUENCE: LabNav[] = [
  ...LABS.map((l) => ({ id: l.id, title: l.title, code: l.code })),
  SOC_NAV,
];

export function adjacentLab(id: string): { prev: LabNav | null; next: LabNav | null } {
  const seq = LAB_SEQUENCE;
  const i = seq.findIndex((l) => l.id === id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? seq[i - 1] ?? null : null,
    next: i < seq.length - 1 ? seq[i + 1] ?? null : null,
  };
}
