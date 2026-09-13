export type ChallengeKind = "single" | "multi" | "order";

export type ChallengeOption = {
  id: string;
  text: string;
  correct?: boolean;
};

export type Challenge = {
  id: string;
  code: string;
  title: string;
  kicker: string;
  kind: ChallengeKind;
  prompt: string;
  detail?: string;
  options: ChallengeOption[];
  order?: string[];
  explain: string;
};

export const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    code: "DESAFIO 01",
    title: "Primeiro movimento",
    kicker: "Uma mensagem. Dez minutos. O que você faz?",
    kind: "single",
    prompt:
      "Você recebe: “URGENTE! Detectamos uma tentativa de acesso. Sua conta será bloqueada em 10 minutos. Clique aqui para confirmar sua identidade.”",
    detail: "Qual é a primeira coisa que você faria?",
    options: [
      { id: "c1-a", text: "Clicar imediatamente no link" },
      { id: "c1-b", text: "Responder à mensagem pedindo mais detalhes" },
      { id: "c1-c", text: "Verificar o aviso por um canal oficial", correct: true },
      { id: "c1-d", text: "Informar o código que chegou no celular" },
    ],
    explain:
      "A primeira ação nunca é o atalho da própria mensagem. Abra o aplicativo ou o site que você já usava e procure o aviso lá. Se não existir, era isca.",
  },
  {
    id: "c2",
    code: "DESAFIO 02",
    title: "A arma principal",
    kicker: "O que realmente opera o golpe?",
    kind: "single",
    prompt:
      "Phishing usa páginas falsas, remetentes forjados e links imitadores. Ainda assim, a arma principal não é o computador.",
    detail: "O que move o ataque?",
    options: [
      { id: "c2-a", text: "Um vírus que se instala sozinho ao ler a mensagem" },
      { id: "c2-b", text: "Engenharia social — fazer você acreditar antes de clicar", correct: true },
      { id: "c2-c", text: "Um supercomputador quebrando a senha" },
      { id: "c2-d", text: "O Wi-Fi público, sempre" },
    ],
    explain:
      "O phishing manipula atenção, medo e confiança. A página falsa só funciona se você entregar a ação. Por isso a defesa começa na cabeça, não no antivírus.",
  },
  {
    id: "c3",
    code: "DESAFIO 03",
    title: "O ciclo de defesa",
    kicker: "Toque na ordem certa.",
    kind: "order",
    prompt:
      "O golpe depende de você confiar antes de verificar. Monte o ciclo que quebra essa sequência.",
    options: [
      { id: "c3-parar", text: "PARAR — não clicar, não responder, não informar" },
      { id: "c3-analisar", text: "ANALISAR — isca, pressão, inconsistência, pedido" },
      { id: "c3-verificar", text: "VERIFICAR — canal oficial que você já conhecia" },
      { id: "c3-agir", text: "AGIR — só depois da contraprova" },
    ],
    order: ["c3-parar", "c3-analisar", "c3-verificar", "c3-agir"],
    explain:
      "PARAR → ANALISAR → VERIFICAR → AGIR. Inverter a ordem é exatamente o que o golpista precisa.",
  },
  {
    id: "c4",
    code: "DESAFIO 04",
    title: "Leitura de evidência",
    kicker: "Marque tudo o que é pista. Ignore o resto.",
    kind: "multi",
    prompt:
      "Mensagem no app: “Sua conta será desativada em 15 minutos. Envie o código que acabamos de mandar para reativar. Ajuda: wa.me-verify.info”",
    detail: "Quais itens são evidência real? Há iscas no checklist.",
    options: [
      { id: "c4-pressao", text: "Ameaça de desativação com relógio curto", correct: true },
      { id: "c4-pedido", text: "Pedido do código de autenticação", correct: true },
      { id: "c4-link", text: "Endereço que não é o serviço oficial", correct: true },
      { id: "c4-logo", text: "Se o visual parecer oficial, a mensagem é segura" },
      { id: "c4-pt", text: "Um erro de português, sozinho, já prova o golpe" },
      { id: "c4-remetente", text: "Pedido inesperado de ação imediata por canal frio", correct: true },
    ],
    explain:
      "Pressão, pedido de código, domínio estranho e canal inesperado formam o padrão. Aparência não autentica. Erro de português soma, mas isolado não fecha o caso.",
  },
  {
    id: "c5",
    code: "DESAFIO 05",
    title: "Caso final",
    kicker: "As quatro marcas da armadilha.",
    kind: "multi",
    prompt:
      "E-mail: “NuvemBank — URGENTE. Detectamos acesso em outro estado. Valide agora ou perderá o Pix. Informe a senha e o SMS. Link: nuvembank.secure-login.net/desbloqueio”",
    detail: "Quais das quatro pistas-mestras estão nesta mensagem?",
    options: [
      { id: "c5-pressao", text: "Pressão — urgência e ameaça de perda", correct: true },
      { id: "c5-inconsistencia", text: "Inconsistência — domínio que só parece o banco", correct: true },
      { id: "c5-pedido", text: "Pedido suspeito — senha e código SMS", correct: true },
      { id: "c5-clique", text: "Indução ao clique — link de “desbloqueio”", correct: true },
      { id: "c5-oficial", text: "Canal oficial — o e-mail já basta como prova de autenticidade" },
    ],
    explain:
      "As quatro estão lá: pressão, inconsistência, pedido e indução ao clique. Encontrou as quatro, encontrou a armadilha. Contraprova no aplicativo — nunca neste e-mail.",
  },
];

export function challengeById(id: string) {
  return CHALLENGES.find((c) => c.id === id) ?? null;
}

export function adjacentChallenge(id: string) {
  const i = CHALLENGES.findIndex((c) => c.id === id);
  return {
    prev: i > 0 ? CHALLENGES[i - 1] : null,
    next: i >= 0 && i < CHALLENGES.length - 1 ? CHALLENGES[i + 1] : null,
  };
}

export function correctIds(challenge: Challenge): string[] {
  if (challenge.kind === "order") return challenge.order ?? [];
  return challenge.options.filter((o) => o.correct).map((o) => o.id);
}
