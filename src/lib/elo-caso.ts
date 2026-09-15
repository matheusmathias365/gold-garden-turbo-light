export const X_CASE_ID = "elo";
export const X_SERIES = "X01";

export type EloOpt = { id: string; t: string };

export type EloEv = {
  id: string;
  code: string;
  title: string;
  kicker: string;
  lines: { who: "suporte" | "ana" | "nota"; t: string }[];
  q: string;
  opts: EloOpt[];
  correct: string;
  debrief: string;
  miss: Record<string, string>;
};

export const ELO_EVIDENCE: EloEv[] = [
  {
    id: "autoridade",
    code: "EVIDÊNCIA 01",
    title: "A ligação",
    kicker: "Transcrição · 14:08",
    lines: [
      { who: "suporte", t: "Boa tarde. Estou falando com Ana?" },
      { who: "ana", t: "Sim. Quem está falando?" },
      {
        who: "suporte",
        t: "Meu nome é Rafael, sou da equipe de segurança. Detectamos uma tentativa de acesso à sua conta.",
      },
      { who: "ana", t: "Mas eu não tentei acessar." },
      {
        who: "suporte",
        t: "Por isso estamos entrando em contato. Precisamos confirmar algumas informações.",
      },
      {
        who: "suporte",
        t: "Antes de continuarmos, você pode confirmar apenas o departamento em que trabalha?",
      },
      { who: "ana", t: "Financeiro." },
      {
        who: "suporte",
        t: "Perfeito. É justamente a conta do financeiro que apresentou o alerta.",
      },
    ],
    q: "Qual técnica aparece primeiro?",
    opts: [
      { id: "a", t: "Curiosidade" },
      { id: "b", t: "Autoridade" },
      { id: "c", t: "Escassez" },
      { id: "d", t: "Reciprocidade" },
    ],
    correct: "b",
    debrief:
      "Ele se apresenta como segurança, cita alerta na conta, fala como quem já está do lado de dentro. Autoridade. Ainda não pediu senha — pediu o crachá da conversa.",
    miss: {
      a: "Curiosidade puxa cliques em prêmio e link. Aqui o gancho é o crachá: “sou da segurança”. A aula: quem se apresenta no lugar do ramal está usando autoridade.",
      c: "Escassez é “só restam dois”. Nesta ligação o relógio ainda não entrou. A aula: nomeie a técnica que está na frase agora — não a que você já conhece.",
      d: "Reciprocidade é favor por favor. Ele ainda não “ajudou”. A aula: o primeiro movimento desta conversa é se vestir de setor oficial.",
    },
  },
  {
    id: "confianca",
    code: "EVIDÊNCIA 02",
    title: "A confiança",
    kicker: "Transcrição · 14:11",
    lines: [
      {
        who: "suporte",
        t: "Não precisa me passar sua senha. Só quero ajudá-la a verificar se o alerta é legítimo.",
      },
      { who: "ana", t: "Tá. O que eu preciso fazer?" },
      {
        who: "suporte",
        t: "Nada demais por enquanto. Só confirma se você está no computador da empresa.",
      },
      { who: "nota", t: "O pedido ainda é pequeno. A resistência cai." },
    ],
    q: "Por que essa abordagem pode ser eficaz?",
    opts: [
      { id: "a", t: "Porque elimina qualquer risco." },
      { id: "b", t: "Porque faz o pedido parecer pequeno e seguro." },
      { id: "c", t: "Porque sistemas de segurança sempre ligam para funcionários." },
      { id: "d", t: "Porque o suporte pode exigir senhas." },
    ],
    correct: "b",
    debrief:
      "O atacante começa com um pedido que parece inofensivo. Quem diz “não quero a senha” ganha a porta. Depois o pedido cresce. Isso se chama solicitação gradual — não é verificação real de TI.",
    miss: {
      a: "Não elimina risco. Só parece. A aula: “não preciso da senha” é o passo pequeno que reduz a desconfiança.",
      c: "TI de verdade não liga no pessoal para “confirmar alerta”. A aula: canal oficial é o portal ou o ramal que você já usa — não a ligação que chegou.",
      d: "Suporte de verdade não pede senha nesta conversa, e o golpe também começa dizendo que não vai pedir. A aula: o perigo está no pedido pequeno, não no óbvio.",
    },
  },
  {
    id: "urgencia",
    code: "EVIDÊNCIA 03",
    title: "A pressão",
    kicker: "Transcrição · 14:14",
    lines: [
      {
        who: "suporte",
        t: "Ana, preciso resolver isso agora porque o sistema vai bloquear temporariamente seu acesso.",
      },
      { who: "ana", t: "Bloquear? Mas eu tenho um fechamento hoje." },
      {
        who: "suporte",
        t: "Por isso liguei. Se a gente não concluir em alguns minutos, o financeiro fica fora.",
      },
      { who: "nota", t: "A mesma conversa já usou autoridade. Agora soma o relógio." },
    ],
    q: "Qual técnica entra agora — além da autoridade que já estava na linha?",
    opts: [
      { id: "a", t: "Reciprocidade" },
      { id: "b", t: "Escassez de produto" },
      { id: "c", t: "Urgência / pressão de tempo" },
      { id: "d", t: "Curiosidade" },
    ],
    correct: "c",
    debrief:
      "Urgência. Uma conversa não usa uma técnica só. Autoridade abre; o relógio impede a contraprova — ligar no ramal, olhar o chamado no portal. A lição: conte as camadas.",
    miss: {
      a: "Reciprocidade seria “eu te ajudei, agora me ajuda”. O que entrou agora é o relógio. A aula: autoridade já estava; a novidade é a pressão de tempo.",
      b: "Escassez de produto é estoque. Aqui é “o sistema vai bloquear”. A aula: urgência existe para você não ligar de volta.",
      d: "Curiosidade puxa o clique. Esta frase puxa o pulso. A aula: “agora / minutos / bloqueio” = não dê tempo à contraprova.",
    },
  },
  {
    id: "vazamento",
    code: "EVIDÊNCIA 04",
    title: "A informação",
    kicker: "Transcrição · 14:17",
    lines: [
      {
        who: "suporte",
        t: "Não vou pedir sua senha. Só preciso confirmar se o procedimento que você recebeu ontem foi realizado.",
      },
      {
        who: "ana",
        t: "Você está falando daquele procedimento que o pessoal do financeiro comentou?",
      },
      { who: "suporte", t: "Exatamente." },
      {
        who: "nota",
        t: "Ele não citou o procedimento. Ela entregou o nome. Ele só confirmou.",
      },
    ],
    q: "Quem revelou a informação importante?",
    opts: [
      { id: "a", t: "O atacante já sabia do procedimento." },
      { id: "b", t: "A própria Ana." },
      { id: "c", t: "O departamento de TI, por e-mail oficial." },
      { id: "d", t: "O sistema de alerta da empresa." },
    ],
    correct: "b",
    debrief:
      "A vítima forneceu. Engenharia social nem sempre chega com o dossiê pronto. Às vezes cria um vazio para a pessoa preencher. Quem pergunta “é aquele procedimento?” já abriu o arquivo.",
    miss: {
      a: "Ele não citou o procedimento. Só disse “o que você recebeu ontem”. A aula: quem completa a frase do atacante entrega a informação.",
      c: "Não há e-mail oficial nesta transcrição. A aula: a informação saiu da boca da Ana, não de um chamado.",
      d: "Não existe alerta de sistema na linha. A aula: o vazio na pergunta é a isca — a vítima preenche.",
    },
  },
  {
    id: "elo",
    code: "EVIDÊNCIA 05",
    title: "O elo",
    kicker: "Análise do investigador",
    lines: [
      { who: "nota", t: "O atacante utilizou, na mesma ligação:" },
      { who: "nota", t: "☑ Autoridade" },
      { who: "nota", t: "☑ Urgência" },
      { who: "nota", t: "☑ Construção de confiança" },
      { who: "nota", t: "☑ Solicitações graduais" },
      { who: "nota", t: "☑ Informações fornecidas pela vítima" },
    ],
    q: "Por que a vítima caiu?",
    opts: [
      { id: "a", t: "Porque ela foi ingênua." },
      { id: "b", t: "Porque o atacante invadiu o servidor." },
      {
        id: "c",
        t: "Porque o ataque explorou confiança, pressão, autoridade e o desejo de resolver rápido.",
      },
      { id: "d", t: "Porque o suporte de TI sempre liga para o financeiro." },
    ],
    correct: "c",
    debrief:
      "Não foi ingenuidade. Foram fatores humanos normais, empilhados. O atacante não precisou invadir o sistema. Tentou convencer uma pessoa a abrir a porta.",
    miss: {
      a: "Chamar de ingênua fecha o caso errado. A aula: pessoas competentes caem quando autoridade, relógio e pedido pequeno se empilham.",
      b: "Ninguém invadiu o servidor nesta história. A aula: a porta que ele queria era a conversa.",
      d: "TI de verdade não opera assim no celular pessoal. A aula: o golpe funciona porque parece o procedimento, não porque o procedimento é esse.",
    },
  },
];

export const ELO_IDS = ELO_EVIDENCE.map((e) => e.id);

export const ELO_TECH = [
  "AUTORIDADE",
  "URGÊNCIA",
  "MEDO",
  "CONFIANÇA",
  "RECIPROCIDADE",
  "CURIOSIDADE",
  "ESCASSEZ",
] as const;

export function eloById(id: string) {
  return ELO_EVIDENCE.find((e) => e.id === id) ?? null;
}

export function adjacentElo(id: string) {
  const i = ELO_IDS.indexOf(id);
  return {
    prev: i > 0 ? ELO_IDS[i - 1] : null,
    next: i >= 0 && i < ELO_IDS.length - 1 ? ELO_IDS[i + 1] : null,
  };
}

export function judgeElo(ev: EloEv, pick: string) {
  return { ok: pick === ev.correct };
}
