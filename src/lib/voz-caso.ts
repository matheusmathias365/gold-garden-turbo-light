export type VozAction = "ramal" | "pagar" | "encerrar";

export type VozScene = {
  id: string;
  code: string;
  title: string;
  from: string;
  channel: string;
  duration: string;
  line: string;
  file: string;
  files: string[];
  briefing: string;
  debrief: string;
  correct: VozAction;
};

export const VOZ_CASE_ID = "voz";
export const VOZ_SECONDS = 8;

export const VOZ_SCENES: VozScene[] = [
  {
    id: "chefe",
    code: "CENA 01",
    title: "O áudio da chefe",
    from: "A chefe (celular pessoal)",
    channel: "WhatsApp · não é o ramal",
    duration: "0:07",
    line: "Sou eu. Preciso de um PIX agora. Não liga pra ninguém. Manda pra essa chave.",
    file: "/voz/chefe.wav",
    files: ["/voz/chefe.wav"],
    briefing:
      "Chegou um áudio. A voz parece a da chefe. A pista não está no timbre — está no canal.",
    debrief:
      "Ligou no pessoal, pediu segredo, pediu dinheiro. Voz dá pra copiar. Ramal conhecido não. Liga de volta no número oficial. Não transfere.",
    correct: "ramal",
  },
  {
    id: "pai",
    code: "CENA 02",
    title: "Troquei de chip",
    from: "Número novo",
    channel: "WhatsApp · chip que você não tem salvo",
    duration: "0:07",
    line: "Filho, sou eu. Troquei de chip. Preciso de um PIX de oitenta reais agora, depois te explico.",
    file: "/voz/pai.wav",
    files: ["/voz/pai.wav"],
    briefing:
      "A voz “é do pai”. O número não é. Toque em ouvir. Depois escolha o canal, não a emoção.",
    debrief:
      "Número novo + PIX + pressa. O pai de verdade você liga no número antigo. A voz não prova parentesco.",
    correct: "ramal",
  },
  {
    id: "banco",
    code: "CENA 03",
    title: "O recado do banco",
    from: "NuvemBank · Analista de segurança",
    channel: "Ligação · número mascarado",
    duration: "0:07",
    line: "Aqui é a segurança do banco. Sua conta vai bloquear. Me passa o código do SMS que acabou de chegar.",
    file: "/voz/banco.wav",
    files: ["/voz/banco.wav"],
    briefing:
      "A voz é calma, “institucional”. Banco de verdade nunca pede o código do SMS por telefone.",
    debrief:
      "Não existe ramal pra devolver código. Encerrar. Abrir o app que você já tem. Não falar o SMS. Não retornar neste número.",
    correct: "encerrar",
  },
  {
    id: "rh",
    code: "CENA 04",
    title: "O ramal do RH",
    from: "Ramal 2040 · Folha",
    channel: "Ramal interno conhecido",
    duration: "0:08",
    line: "Holerite no portal interno. Não pedimos PIX. Não passe senha. Entre pelo atalho que você já usa.",
    file: "/voz/rh.wav",
    files: ["/voz/rh.wav"],
    briefing:
      "Desta vez o canal é o ramal que você já ligava. Ouça. Pode ser o recado verdadeiro.",
    debrief:
      "Canal conhecido, sem dinheiro, sem segredo. O passo é o portal que você já usava — não um PIX. Conferir no canal oficial.",
    correct: "ramal",
  },
  {
    id: "reuniao",
    code: "CENA 05",
    title: "Estou em reunião",
    from: "O diretor (WhatsApp Business)",
    channel: "Áudio · “não liga”",
    duration: "0:07",
    line: "Estou em reunião. Faz um PIX de mil oitocentos e cinquenta. Não liga agora. Depois a gente se fala.",
    file: "/voz/reuniao.wav",
    files: ["/voz/reuniao.wav"],
    briefing:
      "Mesmo tom. Isolamento, valor, silêncio. Deepfake curto. A pergunta é: isso chegou no ramal?",
    debrief:
      "Reunião + não ligue + PIX. Corta o retorno. Voz copiada não abre o ramal. Liga no número oficial da empresa. Não transfere.",
    correct: "ramal",
  },
];

export const VOZ_SCENE_IDS = VOZ_SCENES.map((s) => s.id);

export function vozById(id: string) {
  if (id === "mae") return VOZ_SCENES.find((s) => s.id === "pai") ?? null;
  return VOZ_SCENES.find((s) => s.id === id) ?? null;
}

export function adjacentVoz(id: string) {
  const i = VOZ_SCENES.findIndex((s) => s.id === id);
  return {
    prev: i > 0 ? VOZ_SCENES[i - 1] : null,
    next: i >= 0 && i < VOZ_SCENES.length - 1 ? VOZ_SCENES[i + 1] : null,
  };
}

export function judgeVoz(scene: VozScene, action: VozAction) {
  return {
    ok: action === scene.correct,
    paidTrap: action === "pagar",
  };
}

export const VOZ_ACTION_LABEL: Record<VozAction, string> = {
  ramal: "Ligar no número oficial",
  pagar: "Transferir / passar o código",
  encerrar: "Encerrar e não responder",
};
