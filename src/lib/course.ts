export type ClueKind =
  | "isca"
  | "pressao"
  | "inconsistencia"
  | "link"
  | "pedido";

export const CLUE_META: Record<
  ClueKind,
  { label: string; short: string; tone: "accent" | "danger" | "warn" }
> = {
  isca: { label: "Isca", short: "ISCA", tone: "accent" },
  pressao: { label: "Pressão", short: "PRESSÃO", tone: "danger" },
  inconsistencia: { label: "Inconsistência", short: "FALHA", tone: "warn" },
  link: { label: "Link / canal", short: "LINK", tone: "accent" },
  pedido: { label: "Pedido suspeito", short: "PEDIDO", tone: "danger" },
};

export type Block =
  | { type: "lead"; text: string }
  | { type: "quote"; text: string }
  | { type: "callout"; tone: "warn" | "danger" | "info"; title: string; text: string }
  | { type: "steps"; items: { n: string; title: string; body: string }[] }
  | { type: "phrases"; items: string[] }
  | { type: "checks"; items: string[] }
  | { type: "list"; items: { title: string; body: string }[] };

export type Lesson = {
  id: string;
  code: string;
  title: string;
  kicker: string;
  takeaway: string;
  blocks: Block[];
};

export const LESSONS: Lesson[] = [
  {
    id: "o-que-e",
    code: "ARQUIVO 01",
    title: "O que é phishing",
    kicker: "A armadilha tem nome.",
    takeaway:
      "Phishing é engano. O objetivo é fazer você acreditar antes de fazer você clicar.",
    blocks: [
      {
        type: "lead",
        text: "Phishing é uma tentativa de enganar alguém para obter informações, dinheiro ou acesso a contas.",
      },
      {
        type: "quote",
        text: "O criminoso geralmente se passa por uma empresa, banco, serviço ou pessoa conhecida.",
      },
      {
        type: "list",
        items: [
          {
            title: "Identidade falsa",
            body: "Usa logo, nome e tom de alguém em quem você já confia.",
          },
          {
            title: "Pedido convincente",
            body: "Pede uma ação simples: clicar, responder, confirmar, pagar.",
          },
          {
            title: "Canal comum",
            body: "Chega por SMS, e-mail, mensagem, anúncio ou página quase idêntica.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "A arma principal",
        text: "Não é o computador. É a engenharia social — manipular a atenção, o medo e a confiança.",
      },
    ],
  },
  {
    id: "estrategia",
    code: "ARQUIVO 02",
    title: "Como o golpe funciona",
    kicker: "Cinco movimentos. Um padrão.",
    takeaway:
      "Isca, pressão, engano, clique, objetivo. Quebre qualquer etapa e o golpe falha.",
    blocks: [
      {
        type: "lead",
        text: "Quase todo phishing segue a mesma sequência. Reconhecer o padrão vale mais do que memorizar exemplos.",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "Isca",
            body: "Uma mensagem chama sua atenção — prêmio, boleto, conta, ameaça.",
          },
          {
            n: "02",
            title: "Pressão",
            body: "Você é incentivado a agir rápido, antes de pensar.",
          },
          {
            n: "03",
            title: "Engano",
            body: "O criminoso imita algo confiável: banco, chefe, entrega, suporte.",
          },
          {
            n: "04",
            title: "Clique",
            body: "Você é levado a uma ação: link, código, pagamento, resposta.",
          },
          {
            n: "05",
            title: "Objetivo",
            body: "Informações, acesso ou dinheiro podem ser roubados.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Leitura de analista",
        text: "Se uma mensagem tenta pular a verificação, trate isso como evidência — não como urgência real.",
      },
    ],
  },
  {
    id: "isca",
    code: "PISTA 01",
    title: "A isca",
    kicker: "O que fisga a atenção.",
    takeaway:
      "Quando uma mensagem provoca medo, curiosidade ou urgência, pare. Isso já é a isca.",
    blocks: [
      {
        type: "lead",
        text: "A isca não precisa ser sofisticada. Precisa ser emocional o bastante para você reagir.",
      },
      {
        type: "phrases",
        items: [
          "Sua conta será bloqueada.",
          "Pagamento pendente.",
          "Você ganhou um prêmio.",
          "Detectamos uma atividade suspeita.",
          "Clique agora para resolver.",
        ],
      },
      {
        type: "list",
        items: [
          {
            title: "Medo",
            body: "Perda de conta, nome sujo, processo, bloqueio.",
          },
          {
            title: "Ganância ou sorte",
            body: "Prêmio, reembolso, oportunidade exclusiva.",
          },
          {
            title: "Autoridade",
            body: "Banco, chefia, suporte, órgão oficial.",
          },
          {
            title: "Curiosidade",
            body: "Foto, denúncia, documento, “você precisa ver isso”.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Regra da isca",
        text: "Emoção alta + pedido de ação imediata = sinal para desacelerar, não para acelerar.",
      },
    ],
  },
  {
    id: "pressao",
    code: "PISTA 02",
    title: "O elemento mais perigoso",
    kicker: "Urgência. Medo. Curiosidade.",
    takeaway: "O golpista não quer que você pense. Pare. Respire. Verifique.",
    blocks: [
      {
        type: "lead",
        text: "Quanto menos tempo você tiver para analisar, maior a chance de cometer um erro.",
      },
      {
        type: "quote",
        text: "URGÊNCIA + MEDO + CURIOSIDADE. Essa é a fórmula.",
      },
      {
        type: "list",
        items: [
          {
            title: "Relógio falso",
            body: "“Em 10 minutos”, “última chance”, “expira hoje”.",
          },
          {
            title: "Isolamento",
            body: "“Não ligue”, “não conte para ninguém”, “estou em reunião”.",
          },
          {
            title: "Consequência inflada",
            body: "Bloqueio, demissão, processo, perda do prêmio.",
          },
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Protocolo pessoal",
        text: "Se o corpo acelerar, a regra é uma só: nada de senha, código, PIX ou clique até verificar por um canal que você já conhecia.",
      },
    ],
  },
  {
    id: "inconsistencias",
    code: "PISTA 03",
    title: "Desvendando a mensagem",
    kicker: "Procure as rachaduras.",
    takeaway:
      "Uma pista isolada pode não provar nada. Várias juntas formam o padrão.",
    blocks: [
      {
        type: "lead",
        text: "Trate cada mensagem suspeita como evidência. Faça perguntas de detetive.",
      },
      {
        type: "checks",
        items: [
          "Quem realmente enviou isso?",
          "O endereço do remetente parece legítimo?",
          "A mensagem contém erros estranhos ou tom atípico?",
          "Existe pressão para agir imediatamente?",
          "O link corresponde ao serviço mencionado?",
          "Estão pedindo informações que normalmente não seriam solicitadas?",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Padrão, não coincidência",
        text: "Logo certo e texto errado. Nome certo e domínio errado. Tom de banco e pedido de PIX. Cruze as pistas.",
      },
    ],
  },
  {
    id: "link",
    code: "PISTA 04",
    title: "O link é a pista",
    kicker: "Não confie apenas na aparência.",
    takeaway:
      "Uma página pode parecer exatamente igual à original. A aparência não comprova autenticidade.",
    blocks: [
      {
        type: "lead",
        text: "Logo, cores, botões e textos podem ser imitados. O endereço e o caminho até a página, quase nunca fecham perfeitamente.",
      },
      {
        type: "list",
        items: [
          {
            title: "Domínio parecido",
            body: "nuvembank.com.br.secure.net não é nuvembank.com.br.",
          },
          {
            title: "Letra trocada",
            body: "rn no lugar de m, 0 no lugar de o, um acento a menos.",
          },
          {
            title: "Página extra",
            body: "Pede cartão, SMS e selfie numa tela que o serviço real nunca pede juntas.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Antes de inserir qualquer informação",
        text: "Confirme se você realmente está no serviço correto. Digite o endereço que você já conhece ou abra o aplicativo oficial — não use o atalho da mensagem.",
      },
    ],
  },
  {
    id: "pedido",
    code: "PISTA 05",
    title: "O pedido suspeito",
    kicker: "O que estão pedindo?",
    takeaway:
      "Código recebido por SMS ou aplicativo não deve ser compartilhado com quem está do outro lado da conversa.",
    blocks: [
      {
        type: "lead",
        text: "Desconfie de solicitações inesperadas. Empresas sérias quase nunca pedem segredo por mensagem.",
      },
      {
        type: "phrases",
        items: [
          "Senha da conta",
          "Código de autenticação",
          "Dados bancários e cartão",
          "Informações pessoais (CPF, selfie, documento)",
          "Pagamento ou PIX para “liberar” algo",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Regra de ouro",
        text: "Quem pede o código que acabou de chegar no seu celular não está protegendo a conta. Está tentando entrar nela.",
      },
    ],
  },
  {
    id: "contraprova",
    code: "ARQUIVO 08",
    title: "A contraprova",
    kicker: "Como verificar sem cair.",
    takeaway:
      "Não use os contatos fornecidos na própria mensagem. Confirme a informação fora dela.",
    blocks: [
      {
        type: "lead",
        text: "Recebeu uma mensagem suspeita? A verificação acontece em outro canal — um que você já usava antes.",
      },
      {
        type: "steps",
        items: [
          {
            n: "01",
            title: "Pare o clique",
            body: "Não siga o atalho, o número nem o botão da mensagem.",
          },
          {
            n: "02",
            title: "Abra o oficial",
            body: "Aplicativo, site digitado por você, ou contato que já estava salvo.",
          },
          {
            n: "03",
            title: "Procure o aviso",
            body: "Se a ameaça fosse real, ela apareceria também no canal oficial.",
          },
          {
            n: "04",
            title: "Só então aja",
            body: "Se não houver nada no oficial, archive e ignore. Era isca.",
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "O ciclo de defesa",
        text: "PARAR → ANALISAR → VERIFICAR → AGIR. O phishing depende de você inverter essa ordem.",
      },
    ],
  },
];

export function lessonIndex(id: string) {
  return LESSONS.findIndex((l) => l.id === id);
}

export function adjacentLesson(id: string) {
  const i = lessonIndex(id);
  return {
    prev: i > 0 ? LESSONS[i - 1] : null,
    next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null,
  };
}
