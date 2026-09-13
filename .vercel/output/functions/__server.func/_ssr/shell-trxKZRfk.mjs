import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, v as Navigate, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Fingerprint, l as House } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-trxKZRfk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLUE_META = {
	isca: {
		label: "Isca",
		short: "ISCA",
		tone: "accent"
	},
	pressao: {
		label: "Pressão",
		short: "PRESSÃO",
		tone: "danger"
	},
	inconsistencia: {
		label: "Inconsistência",
		short: "FALHA",
		tone: "warn"
	},
	link: {
		label: "Link / canal",
		short: "LINK",
		tone: "accent"
	},
	pedido: {
		label: "Pedido suspeito",
		short: "PEDIDO",
		tone: "danger"
	}
};
var LESSONS = [
	{
		id: "o-que-e",
		code: "ARQUIVO 01",
		title: "O que é phishing",
		kicker: "A armadilha tem nome.",
		takeaway: "Phishing é engano. O objetivo é fazer você acreditar antes de fazer você clicar.",
		blocks: [
			{
				type: "lead",
				text: "Phishing é uma tentativa de enganar alguém para obter informações, dinheiro ou acesso a contas."
			},
			{
				type: "quote",
				text: "O criminoso geralmente se passa por uma empresa, banco, serviço ou pessoa conhecida."
			},
			{
				type: "list",
				items: [
					{
						title: "Identidade falsa",
						body: "Usa logo, nome e tom de alguém em quem você já confia."
					},
					{
						title: "Pedido convincente",
						body: "Pede uma ação simples: clicar, responder, confirmar, pagar."
					},
					{
						title: "Canal comum",
						body: "Chega por SMS, e-mail, mensagem, anúncio ou página quase idêntica."
					}
				]
			},
			{
				type: "callout",
				tone: "info",
				title: "A arma principal",
				text: "Não é o computador. É a engenharia social — manipular a atenção, o medo e a confiança."
			}
		]
	},
	{
		id: "estrategia",
		code: "ARQUIVO 02",
		title: "Como o golpe funciona",
		kicker: "Cinco movimentos. Um padrão.",
		takeaway: "Isca, pressão, engano, clique, objetivo. Quebre qualquer etapa e o golpe falha.",
		blocks: [
			{
				type: "lead",
				text: "Quase todo phishing segue a mesma sequência. Reconhecer o padrão vale mais do que memorizar exemplos."
			},
			{
				type: "steps",
				items: [
					{
						n: "01",
						title: "Isca",
						body: "Uma mensagem chama sua atenção — prêmio, boleto, conta, ameaça."
					},
					{
						n: "02",
						title: "Pressão",
						body: "Você é incentivado a agir rápido, antes de pensar."
					},
					{
						n: "03",
						title: "Engano",
						body: "O criminoso imita algo confiável: banco, chefe, entrega, suporte."
					},
					{
						n: "04",
						title: "Clique",
						body: "Você é levado a uma ação: link, código, pagamento, resposta."
					},
					{
						n: "05",
						title: "Objetivo",
						body: "Informações, acesso ou dinheiro podem ser roubados."
					}
				]
			},
			{
				type: "callout",
				tone: "warn",
				title: "Leitura de analista",
				text: "Se uma mensagem tenta pular a verificação, trate isso como evidência — não como urgência real."
			}
		]
	},
	{
		id: "isca",
		code: "PISTA 01",
		title: "A isca",
		kicker: "O que fisga a atenção.",
		takeaway: "Quando uma mensagem provoca medo, curiosidade ou urgência, pare. Isso já é a isca.",
		blocks: [
			{
				type: "lead",
				text: "A isca não precisa ser sofisticada. Precisa ser emocional o bastante para você reagir."
			},
			{
				type: "phrases",
				items: [
					"Sua conta será bloqueada.",
					"Pagamento pendente.",
					"Você ganhou um prêmio.",
					"Detectamos uma atividade suspeita.",
					"Clique agora para resolver."
				]
			},
			{
				type: "list",
				items: [
					{
						title: "Medo",
						body: "Perda de conta, nome sujo, processo, bloqueio."
					},
					{
						title: "Ganância ou sorte",
						body: "Prêmio, reembolso, oportunidade exclusiva."
					},
					{
						title: "Autoridade",
						body: "Banco, chefia, suporte, órgão oficial."
					},
					{
						title: "Curiosidade",
						body: "Foto, denúncia, documento, “você precisa ver isso”."
					}
				]
			},
			{
				type: "callout",
				tone: "info",
				title: "Regra da isca",
				text: "Emoção alta + pedido de ação imediata = sinal para desacelerar, não para acelerar."
			}
		]
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
				text: "Quanto menos tempo você tiver para analisar, maior a chance de cometer um erro."
			},
			{
				type: "quote",
				text: "URGÊNCIA + MEDO + CURIOSIDADE. Essa é a fórmula."
			},
			{
				type: "list",
				items: [
					{
						title: "Relógio falso",
						body: "“Em 10 minutos”, “última chance”, “expira hoje”."
					},
					{
						title: "Isolamento",
						body: "“Não ligue”, “não conte para ninguém”, “estou em reunião”."
					},
					{
						title: "Consequência inflada",
						body: "Bloqueio, demissão, processo, perda do prêmio."
					}
				]
			},
			{
				type: "callout",
				tone: "danger",
				title: "Protocolo pessoal",
				text: "Se o corpo acelerar, a regra é uma só: nada de senha, código, PIX ou clique até verificar por um canal que você já conhecia."
			}
		]
	},
	{
		id: "inconsistencias",
		code: "PISTA 03",
		title: "Desvendando a mensagem",
		kicker: "Procure as rachaduras.",
		takeaway: "Uma pista isolada pode não provar nada. Várias juntas formam o padrão.",
		blocks: [
			{
				type: "lead",
				text: "Trate cada mensagem suspeita como evidência. Faça perguntas de detetive."
			},
			{
				type: "checks",
				items: [
					"Quem realmente enviou isso?",
					"O endereço do remetente parece legítimo?",
					"A mensagem contém erros estranhos ou tom atípico?",
					"Existe pressão para agir imediatamente?",
					"O link corresponde ao serviço mencionado?",
					"Estão pedindo informações que normalmente não seriam solicitadas?"
				]
			},
			{
				type: "callout",
				tone: "info",
				title: "Padrão, não coincidência",
				text: "Logo certo e texto errado. Nome certo e domínio errado. Tom de banco e pedido de PIX. Cruze as pistas."
			}
		]
	},
	{
		id: "link",
		code: "PISTA 04",
		title: "O link é a pista",
		kicker: "Não confie apenas na aparência.",
		takeaway: "Uma página pode parecer exatamente igual à original. A aparência não comprova autenticidade.",
		blocks: [
			{
				type: "lead",
				text: "Logo, cores, botões e textos podem ser imitados. O endereço e o caminho até a página, quase nunca fecham perfeitamente."
			},
			{
				type: "list",
				items: [
					{
						title: "Domínio parecido",
						body: "nuvembank.com.br.secure.net não é nuvembank.com.br."
					},
					{
						title: "Letra trocada",
						body: "rn no lugar de m, 0 no lugar de o, um acento a menos."
					},
					{
						title: "Página extra",
						body: "Pede cartão, SMS e selfie numa tela que o serviço real nunca pede juntas."
					}
				]
			},
			{
				type: "callout",
				tone: "warn",
				title: "Antes de inserir qualquer informação",
				text: "Confirme se você realmente está no serviço correto. Digite o endereço que você já conhece ou abra o aplicativo oficial — não use o atalho da mensagem."
			}
		]
	},
	{
		id: "pedido",
		code: "PISTA 05",
		title: "O pedido suspeito",
		kicker: "O que estão pedindo?",
		takeaway: "Código recebido por SMS ou aplicativo não deve ser compartilhado com quem está do outro lado da conversa.",
		blocks: [
			{
				type: "lead",
				text: "Desconfie de solicitações inesperadas. Empresas sérias quase nunca pedem segredo por mensagem."
			},
			{
				type: "phrases",
				items: [
					"Senha da conta",
					"Código de autenticação",
					"Dados bancários e cartão",
					"Informações pessoais (CPF, selfie, documento)",
					"Pagamento ou PIX para “liberar” algo"
				]
			},
			{
				type: "callout",
				tone: "danger",
				title: "Regra de ouro",
				text: "Quem pede o código que acabou de chegar no seu celular não está protegendo a conta. Está tentando entrar nela."
			}
		]
	},
	{
		id: "contraprova",
		code: "ARQUIVO 08",
		title: "A contraprova",
		kicker: "Como verificar sem cair.",
		takeaway: "Não use os contatos fornecidos na própria mensagem. Confirme a informação fora dela.",
		blocks: [
			{
				type: "lead",
				text: "Recebeu uma mensagem suspeita? A verificação acontece em outro canal — um que você já usava antes."
			},
			{
				type: "steps",
				items: [
					{
						n: "01",
						title: "Pare o clique",
						body: "Não siga o atalho, o número nem o botão da mensagem."
					},
					{
						n: "02",
						title: "Abra o oficial",
						body: "Aplicativo, site digitado por você, ou contato que já estava salvo."
					},
					{
						n: "03",
						title: "Procure o aviso",
						body: "Se a ameaça fosse real, ela apareceria também no canal oficial."
					},
					{
						n: "04",
						title: "Só então aja",
						body: "Se não houver nada no oficial, archive e ignore. Era isca."
					}
				]
			},
			{
				type: "callout",
				tone: "info",
				title: "O ciclo de defesa",
				text: "PARAR → ANALISAR → VERIFICAR → AGIR. O phishing depende de você inverter essa ordem."
			}
		]
	}
];
function lessonIndex(id) {
	return LESSONS.findIndex((l) => l.id === id);
}
function adjacentLesson(id) {
	const i = lessonIndex(id);
	return {
		prev: i > 0 ? LESSONS[i - 1] : null,
		next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null
	};
}
var empty = {
	callsign: "",
	booted: false,
	completed: [],
	scores: {},
	clues: {}
};
var useProgress = create()(persist((set) => ({
	...empty,
	setCallsign: (callsign) => set({ callsign }),
	completeBoot: () => set({ booted: true }),
	markComplete: (id) => set((s) => s.completed.includes(id) ? s : { completed: [...s.completed, id] }),
	setScore: (id, correct, total) => set((s) => {
		const prev = s.scores[id];
		if (prev && prev.correct >= correct && prev.total === total) return s;
		return { scores: {
			...s.scores,
			[id]: {
				correct,
				total
			}
		} };
	}),
	addClue: (labId, clueId) => set((s) => {
		const cur = s.clues[labId] ?? [];
		if (cur.includes(clueId)) return s;
		return { clues: {
			...s.clues,
			[labId]: [...cur, clueId]
		} };
	}),
	reset: () => set({ ...empty })
}), { name: "operacao-phishing-v1" }));
var EMPTY_CLUES = [];
function useHasHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const unsub = useProgress.persist.onFinishHydration(() => setHydrated(true));
		if (useProgress.persist.hasHydrated()) setHydrated(true);
		return unsub;
	}, []);
	return hydrated;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Btn({ variant = "primary", className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-4 font-mono text-sm tracking-wide transition-colors duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40", variant === "primary" && "bg-accent text-bg hover:bg-accent/90", variant === "ghost" && "border border-border bg-transparent text-fg hover:border-accent hover:text-accent", variant === "danger" && "border border-danger/50 text-danger hover:bg-danger/10", variant === "dim" && "text-muted hover:text-fg", className),
		...props,
		children
	});
}
function FilePanel({ code, title, classified, children, footer, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("overflow-hidden rounded-lg bg-surface shadow-panel", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.22em] text-accent",
						children: code
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium leading-snug text-fg",
						children: title
					})]
				}), classified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-xs border border-danger/40 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-danger",
					children: "CONFIDENCIAL"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 md:p-5",
				children
			}),
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-4 py-3",
				children: footer
			}) : null
		]
	});
}
function ClueTag({ kind }) {
	const meta = CLUE_META[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-xs border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em]", meta.tone === "danger" && "border-danger/40 text-danger", meta.tone === "warn" && "border-warn/40 text-warn", meta.tone === "accent" && "border-accent/40 text-accent"),
		children: meta.short
	});
}
function Rail({ value, max }) {
	const pct = max <= 0 ? 0 : Math.min(100, Math.round(value / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1 w-full overflow-hidden rounded-xs bg-border",
		role: "progressbar",
		"aria-valuenow": value,
		"aria-valuemin": 0,
		"aria-valuemax": max,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full bg-accent transition-[width] duration-300 ease-out",
			style: { width: `${pct}%` }
		})
	});
}
function Callout({ tone = "info", title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("rounded-md border-l-2 bg-surface-2 px-3 py-3", tone === "danger" && "border-danger", tone === "warn" && "border-warn", tone === "info" && "border-accent"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.18em] text-muted",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-fg",
			children: text
		})]
	});
}
function Stamp({ label, tone = "accent" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("stamp-in pointer-events-none select-none rounded-sm border-2 px-4 py-2 font-mono text-sm font-semibold tracking-[0.28em]", tone === "accent" && "border-accent text-accent", tone === "danger" && "border-danger text-danger"),
		children: label
	});
}
var CHALLENGES = [
	{
		id: "c1",
		code: "DESAFIO 01",
		title: "Primeiro movimento",
		kicker: "Uma mensagem. Dez minutos. O que você faz?",
		kind: "single",
		prompt: "Você recebe: “URGENTE! Detectamos uma tentativa de acesso. Sua conta será bloqueada em 10 minutos. Clique aqui para confirmar sua identidade.”",
		detail: "Qual é a primeira coisa que você faria?",
		options: [
			{
				id: "a",
				text: "Clicar imediatamente no link"
			},
			{
				id: "b",
				text: "Responder à mensagem pedindo mais detalhes"
			},
			{
				id: "c",
				text: "Verificar o aviso por um canal oficial",
				correct: true
			},
			{
				id: "d",
				text: "Informar o código que chegou no celular"
			}
		],
		explain: "A primeira ação nunca é o atalho da própria mensagem. Abra o aplicativo ou o site que você já usava e procure o aviso lá. Se não existir, era isca."
	},
	{
		id: "c2",
		code: "DESAFIO 02",
		title: "A arma principal",
		kicker: "O que realmente opera o golpe?",
		kind: "single",
		prompt: "Phishing usa páginas falsas, remetentes forjados e links imitadores. Ainda assim, a arma principal não é o computador.",
		detail: "O que move o ataque?",
		options: [
			{
				id: "a",
				text: "Um vírus que se instala sozinho ao ler a mensagem"
			},
			{
				id: "b",
				text: "Engenharia social — fazer você acreditar antes de clicar",
				correct: true
			},
			{
				id: "c",
				text: "Um supercomputador quebrando a senha"
			},
			{
				id: "d",
				text: "O Wi-Fi público, sempre"
			}
		],
		explain: "O phishing manipula atenção, medo e confiança. A página falsa só funciona se você entregar a ação. Por isso a defesa começa na cabeça, não no antivírus."
	},
	{
		id: "c3",
		code: "DESAFIO 03",
		title: "O ciclo de defesa",
		kicker: "Toque na ordem certa.",
		kind: "order",
		prompt: "O golpe depende de você confiar antes de verificar. Monte o ciclo que quebra essa sequência.",
		options: [
			{
				id: "parar",
				text: "PARAR — não clicar, não responder, não informar"
			},
			{
				id: "analisar",
				text: "ANALISAR — isca, pressão, inconsistência, pedido"
			},
			{
				id: "verificar",
				text: "VERIFICAR — canal oficial que você já conhecia"
			},
			{
				id: "agir",
				text: "AGIR — só depois da contraprova"
			}
		],
		order: [
			"parar",
			"analisar",
			"verificar",
			"agir"
		],
		explain: "PARAR → ANALISAR → VERIFICAR → AGIR. Inverter a ordem é exatamente o que o golpista precisa."
	},
	{
		id: "c4",
		code: "DESAFIO 04",
		title: "Leitura de evidência",
		kicker: "Marque tudo o que é pista. Ignore o resto.",
		kind: "multi",
		prompt: "Mensagem no app: “Sua conta será desativada em 15 minutos. Envie o código que acabamos de mandar para reativar. Ajuda: wa.me-verify.info”",
		detail: "Quais itens são evidência real? Há iscas no checklist.",
		options: [
			{
				id: "pressao",
				text: "Ameaça de desativação com relógio curto",
				correct: true
			},
			{
				id: "pedido",
				text: "Pedido do código de autenticação",
				correct: true
			},
			{
				id: "link",
				text: "Endereço que não é o serviço oficial",
				correct: true
			},
			{
				id: "logo",
				text: "Se o visual parecer oficial, a mensagem é segura"
			},
			{
				id: "pt",
				text: "Um erro de português, sozinho, já prova o golpe"
			},
			{
				id: "remetente",
				text: "Pedido inesperado de ação imediata por canal frio",
				correct: true
			}
		],
		explain: "Pressão, pedido de código, domínio estranho e canal inesperado formam o padrão. Aparência não autentica. Erro de português soma, mas isolado não fecha o caso."
	},
	{
		id: "c5",
		code: "DESAFIO 05",
		title: "Caso final",
		kicker: "As quatro marcas da armadilha.",
		kind: "multi",
		prompt: "E-mail: “NuvemBank — URGENTE. Detectamos acesso em outro estado. Valide agora ou perderá o Pix. Informe a senha e o SMS. Link: nuvembank.secure-login.net/desbloqueio”",
		detail: "Quais das quatro pistas-mestras estão nesta mensagem?",
		options: [
			{
				id: "pressao",
				text: "Pressão — urgência e ameaça de perda",
				correct: true
			},
			{
				id: "inconsistencia",
				text: "Inconsistência — domínio que só parece o banco",
				correct: true
			},
			{
				id: "pedido",
				text: "Pedido suspeito — senha e código SMS",
				correct: true
			},
			{
				id: "clique",
				text: "Indução ao clique — link de “desbloqueio”",
				correct: true
			},
			{
				id: "oficial",
				text: "Canal oficial — o e-mail já basta como prova de autenticidade"
			}
		],
		explain: "As quatro estão lá: pressão, inconsistência, pedido e indução ao clique. Encontrou as quatro, encontrou a armadilha. Contraprova no aplicativo — nunca neste e-mail."
	}
];
function challengeById(id) {
	return CHALLENGES.find((c) => c.id === id) ?? null;
}
function adjacentChallenge(id) {
	const i = CHALLENGES.findIndex((c) => c.id === id);
	return {
		prev: i > 0 ? CHALLENGES[i - 1] : null,
		next: i >= 0 && i < CHALLENGES.length - 1 ? CHALLENGES[i + 1] : null
	};
}
function correctIds(challenge) {
	if (challenge.kind === "order") return challenge.order ?? [];
	return challenge.options.filter((o) => o.correct).map((o) => o.id);
}
var LABS = [
	{
		id: "sms-banco",
		code: "CASO A",
		title: "O SMS do banco",
		channel: "sms",
		channelLabel: "SMS",
		briefing: "Uma mensagem chegou dizendo que a conta será bloqueada. Inspecione o texto e marque cada evidência.",
		objective: "Encontre as 4 pistas escondidas no SMS.",
		debrief: "O banco real não manda link curto com domínio estranho nem ameaça de bloqueio em minutos. O caminho seguro é abrir o aplicativo que você já tem instalado — nunca o atalho da mensagem.",
		safeAction: "Abrir o aplicativo oficial do banco e checar avisos por lá. Se nada aparecer, ignorar o SMS.",
		clues: [
			{
				id: "urgencia",
				kind: "pressao",
				label: "Bloqueio em 10 minutos",
				explanation: "Relógio curto existe para impedir que você pense. Instituições reais raramente impõem prazo de minutos por SMS."
			},
			{
				id: "dominio",
				kind: "link",
				label: "Domínio falso",
				explanation: "nuvembank-seguro.tk não é o domínio do banco. Sufixo estranho e hífen extra são clássicos de imitação."
			},
			{
				id: "isca-acesso",
				kind: "isca",
				label: "Alerta de acesso suspeito",
				explanation: "A isca usa um medo verdadeiro (alguém na conta) para justificar o clique imediato."
			},
			{
				id: "confirme",
				kind: "pedido",
				label: "Confirmar identidade pelo link",
				explanation: "Identidade se confirma no app ou no caixa eletrônico — não num link que chegou no celular."
			}
		]
	},
	{
		id: "email-entrega",
		code: "CASO B",
		title: "A taxa da encomenda",
		channel: "email",
		channelLabel: "E-mail",
		briefing: "Um e-mail avisa que a encomenda está retida. Há uma taxa pequena para “liberar”. Marque o que não fecha.",
		objective: "Encontre as 5 evidências no e-mail.",
		debrief: "Taxa minúscula + encomenda retida + remetente genérico é um dos golpes mais comuns. Transportadoras oficiais mostram o rastreio no site ou no app delas, sem pedir cartão por e-mail.",
		safeAction: "Abrir o app da loja ou da transportadora pelo ícone que você já usa e buscar o código de rastreio lá.",
		clues: [
			{
				id: "remetente",
				kind: "inconsistencia",
				label: "Remetente no Gmail",
				explanation: "Empresa de entrega não escreve de uma caixa gratuita com nome fantasia. O endereço não combina com a marca."
			},
			{
				id: "assunto",
				kind: "isca",
				label: "Encomenda retida",
				explanation: "A isca é a encomenda que você talvez esteja esperando. O cérebro completa o resto."
			},
			{
				id: "taxa",
				kind: "pedido",
				label: "Taxa de R$ 2,90",
				explanation: "Valores baixos reduzem a desconfiança. O objetivo é o cartão, não os R$ 2,90."
			},
			{
				id: "link-xyz",
				kind: "link",
				label: "Link com .xyz",
				explanation: "O destino não é o site da transportadora. Domínio genérico + caminho /taxa é bandeira vermelha."
			},
			{
				id: "portugues",
				kind: "inconsistencia",
				label: "Texto torto",
				explanation: "Erro de concordância e tom estranho não provam sozinhos, mas somam ao restante do padrão."
			}
		]
	},
	{
		id: "chat-pix",
		code: "CASO C",
		title: "O PIX da chefia",
		channel: "chat",
		channelLabel: "Chat",
		briefing: "Alguém se passando por um superior pede um PIX urgente. Analise o isolamento, o pedido e o canal.",
		objective: "Encontre as 5 pistas nesta conversa.",
		debrief: "Golpe do falso superior: urgência, reunião, “não ligue”, valor redondo e chave nova. A contraprova é um canal que você já usava — ramal, e-mail corporativo, conversa anterior.",
		safeAction: "Ligar no ramal conhecido ou perguntar pessoalmente. Não pagar. Não responder o comprovante.",
		clues: [
			{
				id: "reuniao",
				kind: "pressao",
				label: "Estou em reunião",
				explanation: "A reunião impede pergunta. Isolar a vítima é parte do roteiro, não um detalhe."
			},
			{
				id: "nao-ligue",
				kind: "pressao",
				label: "Não ligue agora",
				explanation: "Quem pede segredo e bloqueia a verificação está escondendo o golpe, não o conselho."
			},
			{
				id: "pix",
				kind: "pedido",
				label: "PIX de R$ 1.850",
				explanation: "Pedido financeiro inesperado por mensagem, mesmo “do chefe”, deve ser conferido fora do chat."
			},
			{
				id: "chave",
				kind: "inconsistencia",
				label: "Chave pessoal nova",
				explanation: "Fornecedor da empresa quase nunca recebe em celular pessoal recém-informado numa pressa."
			},
			{
				id: "tom",
				kind: "inconsistencia",
				label: "Tom informal demais",
				explanation: "Urgência + intimidade forçada (“tô no mute”, “me salva”) tenta encurtar a desconfiança."
			}
		]
	},
	{
		id: "pagina-clone",
		code: "CASO D",
		title: "A página gêmea",
		channel: "page",
		channelLabel: "Página",
		briefing: "Duas telas de login. Uma é o serviço. A outra é a armadilha. Compare URL, cadeado, campos e pressão.",
		objective: "Marque as 5 diferenças na página da direita.",
		debrief: "Clonar visual é barato. O que não clona bem: o domínio, o cadeado verdadeiro, a ausência de relógio e a quantidade de campos. Se a página pede mais do que o app pede, saia.",
		safeAction: "Fechar a aba, abrir o navegador, digitar o endereço oficial ou usar o aplicativo. Nunca colar senha na página da mensagem.",
		clues: [
			{
				id: "url",
				kind: "link",
				label: "URL imitadora",
				explanation: "banco-litoral.secure-login.net coloca o nome da marca à esquerda, mas o dono do site é outro."
			},
			{
				id: "cadeado",
				kind: "inconsistencia",
				label: "Conexão não confiável",
				explanation: "Aviso de conexão insegura ou cadeado ausente já basta para não inserir senha."
			},
			{
				id: "timer",
				kind: "pressao",
				label: "Cronômetro na tela",
				explanation: "Serviço real de banco não coloca countdown de bloqueio na página de login."
			},
			{
				id: "campos",
				kind: "pedido",
				label: "Campos a mais",
				explanation: "Código SMS + validade do cartão no mesmo login é pedido demais. É colheita de dados."
			},
			{
				id: "botao",
				kind: "isca",
				label: "Botão de pânico",
				explanation: "“Confirmar agora ou perder acesso” é isca visual. Login verdadeiro é calmo."
			}
		]
	},
	{
		id: "premio",
		code: "CASO E",
		title: "O prêmio impossível",
		channel: "premio",
		channelLabel: "Sorteio",
		briefing: "Você “ganhou” um celular. Para resgatar, pedem CPF e cartão “só da taxa de envio”. Desmonte a oferta.",
		objective: "Encontre as 4 evidências da armadilha.",
		debrief: "Prêmio que você não inscreveu + taxa para receber + dados de cartão. Se fosse real, ninguém cobraria o prêmio de você. Oferta que parece sorte grande demais quase sempre é isca.",
		safeAction: "Não clicar, não informar CPF nem cartão. Fechar. Se já informou cartão, contatar o banco pelo app oficial.",
		clues: [
			{
				id: "ganhou",
				kind: "isca",
				label: "Prêmio que você não pediu",
				explanation: "Sorteio sem inscrição é o gancho clássico. A curiosidade faz o resto."
			},
			{
				id: "prazo",
				kind: "pressao",
				label: "Expira em 2 horas",
				explanation: "Prazo curto impede que você procure o sorteio verdadeiro — que não existe."
			},
			{
				id: "cartao",
				kind: "pedido",
				label: "Cartão para taxa de envio",
				explanation: "Quem “ganha” um aparelho não paga com número de cartão completo. Isso é o objetivo do golpe."
			},
			{
				id: "site",
				kind: "link",
				label: "Site de resgate duvidoso",
				explanation: "O domínio mistura marca famosa com “premio-resgate”. Não é o site da fabricante nem de uma loja conhecida."
			}
		]
	}
];
function labById(id) {
	return LABS.find((l) => l.id === id) ?? null;
}
function adjacentLab(id) {
	const i = LABS.findIndex((l) => l.id === id);
	return {
		prev: i > 0 ? LABS[i - 1] : null,
		next: i >= 0 && i < LABS.length - 1 ? LABS[i + 1] : null
	};
}
var PROTOCOL_ID = "protocol";
var LESSON_IDS = LESSONS.map((l) => l.id);
var LAB_IDS = [...LABS.map((l) => l.id), "soc"];
var CHALLENGE_IDS = CHALLENGES.map((c) => c.id);
var ALL_IDS = [
	...LESSON_IDS,
	...LAB_IDS,
	...CHALLENGE_IDS,
	PROTOCOL_ID
];
function countDone(completed, ids) {
	return ids.filter((id) => completed.includes(id)).length;
}
function Splash({ label = "SINCRONIZANDO ARQUIVO" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh items-center justify-center bg-bg px-6 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-0 opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "relative font-mono text-sm tracking-[0.22em] text-accent",
				children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cursor-blink",
					children: "_"
				})]
			})
		]
	});
}
function CrtFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg pointer-events-none absolute inset-0 opacity-50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "crt-scanlines pointer-events-none absolute inset-0 z-40 opacity-30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children
			})
		]
	});
}
function Ticker() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-print overflow-hidden border-b border-border bg-bg-elevated py-2 font-mono text-[10px] tracking-[0.18em] text-dim",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ticker flex w-max gap-10 whitespace-nowrap",
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ARQUIVO CONFIDENCIAL · TREINAMENTO DE DEFESA · SEM INSTRUÇÕES DE ATAQUE · CASO #001 PHISHING" }, i))
		})
	});
}
function AppHeader() {
	const callsign = useProgress((s) => s.callsign);
	const done = countDone(useProgress((s) => s.completed), ALL_IDS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "no-print sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-5xl items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex min-h-11 min-w-11 items-center justify-center rounded-sm text-accent hover:bg-surface",
					"aria-label": "Quartel-general",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
						className: "size-4",
						strokeWidth: 1.75
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.22em] text-accent",
						children: "CASO #001 · PHISHING"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
							value: done,
							max: ALL_IDS.length
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, {
							className: "size-3.5 text-accent",
							strokeWidth: 1.75
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "max-w-28 truncate tracking-wider",
							children: callsign || "AGENTE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums text-dim",
							children: [
								done,
								"/",
								ALL_IDS.length
							]
						})
					]
				})
			]
		})
	});
}
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CrtFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-5xl px-4 py-6 pb-24",
			children
		})
	] });
}
function RequireAgent({ children }) {
	const hydrated = useHasHydrated();
	const booted = useProgress((s) => s.booted);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {});
	if (!booted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children });
}
//#endregion
export { useProgress as A, challengeById as C, labById as D, countDone as E, lessonIndex as O, adjacentLesson as S, correctIds as T, RequireAgent as _, CHALLENGE_IDS as a, adjacentChallenge as b, CrtFrame as c, LABS as d, LAB_IDS as f, Rail as g, PROTOCOL_ID as h, CHALLENGES as i, useHasHydrated as k, EMPTY_CLUES as l, LESSON_IDS as m, AppHeader as n, Callout as o, LESSONS as p, Btn as r, ClueTag as s, ALL_IDS as t, FilePanel as u, Stamp as v, cn as w, adjacentLab as x, Ticker as y };
