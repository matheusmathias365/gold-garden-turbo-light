import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as LockOpen, g as ArrowLeft, h as ArrowRight, p as Check, s as Lock } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-tDyxefdI.mjs";
import { A as useProgress, D as labById, _ as RequireAgent, l as EMPTY_CLUES, o as Callout, r as Btn, s as ClueTag, u as FilePanel, w as cn, x as adjacentLab } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._id-CRWDwqcw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LabStage({ lab }) {
	const found = useProgress((s) => s.clues[lab.id] ?? EMPTY_CLUES);
	const addClue = useProgress((s) => s.addClue);
	const markComplete = useProgress((s) => s.markComplete);
	const completed = useProgress((s) => s.completed);
	const setScore = useProgress((s) => s.setScore);
	const [flash, setFlash] = (0, import_react.useState)(null);
	const allFound = lab.clues.every((c) => found.includes(c.id));
	const archived = completed.includes(lab.id);
	const { prev, next } = adjacentLab(lab.id);
	function onFind(id, decoy) {
		if (decoy || id === "decoy") {
			setFlash("Sem valor de evidência.");
			window.setTimeout(() => setFlash(null), 1400);
			return;
		}
		addClue(lab.id, id);
	}
	function archive() {
		markComplete(lab.id);
		setScore(lab.id, found.length, lab.clues.length);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: [
				lab.code,
				" · ",
				lab.channelLabel
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: lab.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: lab.briefing
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-xs text-dim",
			children: lab.objective
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				lab.channel === "sms" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SmsEvidence, {
					found,
					onFind
				}),
				lab.channel === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailEvidence, {
					found,
					onFind
				}),
				lab.channel === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatEvidence, {
					found,
					onFind
				}),
				lab.channel === "page" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageEvidence, {
					found,
					onFind
				}),
				lab.channel === "premio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PremioEvidence, {
					found,
					onFind
				}),
				flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-warn",
					children: flash
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-xs text-dim",
					children: "Toque nas partes suspeitas da evidência."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePanel, {
				code: "PISTAS",
				title: `${found.length}/${lab.clues.length} catalogadas`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: lab.clues.map((clue) => {
						const ok = found.includes(clue.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("rounded-md px-3 py-3", ok ? "bg-surface-2" : "bg-bg"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClueTag, { kind: clue.kind }), ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-3.5 text-accent",
										strokeWidth: 2
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-dim",
										children: "????"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-medium",
									children: ok ? clue.label : "Pista oculta"
								}),
								ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: clue.explanation
								}) : null
							]
						}, clue.id);
					})
				})
			})]
		}),
		allFound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					tone: "info",
					title: "DEBRIEF",
					text: lab.debrief
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
					tone: "warn",
					title: "AÇÃO SEGURA",
					text: lab.safeAction
				}),
				!archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: archive,
					children: "Arquivar caso"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-mono text-xs text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Caso arquivado"]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mt-8 flex flex-wrap items-center justify-between gap-3",
			children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lab/$id",
				params: { id: prev.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), prev.title]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lab",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Laboratório"]
				})
			}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lab/$id",
				params: { id: next.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: [next.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lab/$id",
				params: { id: "soc" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: ["Terminal SOC", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
			})]
		})
	] });
}
function Mark({ id, decoy, found, onFind, children }) {
	const isFound = id ? found.includes(id) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => onFind(id ?? "decoy", decoy || !id),
		className: cn("rounded-xs px-0.5 py-0.5 text-left underline decoration-dotted decoration-from-font underline-offset-2 transition-colors duration-150", isFound ? "bg-danger/15 text-danger decoration-danger" : "decoration-dim hover:bg-accent/10 hover:text-accent"),
		children
	});
}
function SmsEvidence({ found, onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-sm rounded-xl bg-bg-elevated p-3 shadow-panel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-surface-2 px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center font-mono text-[10px] tracking-widest text-dim",
				children: "SMS · agora"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-md rounded-tl-xs bg-surface px-3 py-3 text-sm leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						decoy: true,
						found,
						onFind,
						children: "NUVEMBANK:"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "isca-acesso",
						found,
						onFind,
						children: "Detectamos um acesso suspeito"
					}),
					". Sua conta será",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "urgencia",
						found,
						onFind,
						children: "BLOQUEADA em 10 minutos"
					}),
					".",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "confirme",
						found,
						onFind,
						children: "Confirme sua identidade"
					}),
					":",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "dominio",
						found,
						onFind,
						children: "nuvembank-seguro.tk/acesso"
					})
				]
			})]
		})
	});
}
function EmailEvidence({ found, onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg-elevated shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 border-b border-border px-4 py-3 font-mono text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-dim",
				children: "De "
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Mark, {
				id: "remetente",
				found,
				onFind,
				children: ["Entrega Rapida ", "<entregarapida.notificacao@gmail.com>"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-dim",
				children: "Assunto "
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				id: "assunto",
				found,
				onFind,
				children: "Sua encomenda está RETIDA — taxa de R$ 2,90"
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4 text-sm leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Prezado cliente, sua encomenda não pode ser entregue. Pague a",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "taxa",
						found,
						onFind,
						children: "taxa de R$ 2,90"
					}),
					" ",
					"para liberar hoje."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Acesse:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "link-xyz",
						found,
						onFind,
						children: "rastreio-taxa.xyz/liberar"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
					id: "portugues",
					found,
					onFind,
					children: "Caso não pagar em 3 hora a encomenda sera devolvido ao remetente."
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-dim",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						decoy: true,
						found,
						onFind,
						children: "Atenciosamente, Central de Logística"
					})
				})
			]
		})]
	});
}
function ChatEvidence({ found, onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-xl bg-bg-elevated p-3 shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-center font-mono text-[10px] tracking-widest text-dim",
			children: "Conversa · “Chefe — financeiro”"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2 text-sm leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bubble, { children: [
					"Oi, tudo certo? Preciso de um favor rápido.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "reuniao",
						found,
						onFind,
						children: "Tô em reunião, no mute"
					}),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bubble, { children: [
					"Paga um",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "pix",
						found,
						onFind,
						children: "PIX de R$ 1.850"
					}),
					" ",
					"pra esse fornecedor.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "nao-ligue",
						found,
						onFind,
						children: "Não liga agora"
					}),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Bubble, { children: [
					"Chave:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "chave",
						found,
						onFind,
						children: "11988880000 (celular pessoal novo)"
					}),
					".",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "tom",
						found,
						onFind,
						children: "Me salva nessa, depois a gente acerta."
					})
				] })
			]
		})]
	});
}
function Bubble({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-[92%] rounded-md rounded-tl-xs bg-surface px-3 py-2.5",
		children
	});
}
function PageEvidence({ found, onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MiniBrowser, {
			url: "https://app.banconorte.com.br/login",
			secure: true,
			title: "ORIGINAL?",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Banco Norte"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs text-muted",
					children: "Agência e conta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-9 rounded-sm bg-surface-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-2 block text-xs text-muted",
					children: "Senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-9 rounded-sm bg-surface-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-9 rounded-sm bg-accent/80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-mono text-[10px] text-dim",
					children: "CNPJ 00.000.000/0001-00"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MiniBrowser, {
			url: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				id: "url",
				found,
				onFind,
				children: "banco-litoral.secure-login.net"
			}),
			secure: false,
			title: "ARMADILHA?",
			lock: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				id: "cadeado",
				found,
				onFind,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-3" }), " Não seguro"]
				})
			}),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Banco Norte"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "timer",
						found,
						onFind,
						children: "Bloqueio em 00:09:41"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-3 block text-xs text-muted",
					children: "Agência e conta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-9 rounded-sm bg-surface-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-2 block text-xs text-muted",
					children: "Senha"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-9 rounded-sm bg-surface-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "campos",
						found,
						onFind,
						children: "Código SMS + validade do cartão"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-1 h-9 rounded-sm bg-surface-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "botao",
						found,
						onFind,
						children: "Confirmar agora ou perder acesso"
					})
				})
			]
		})]
	});
}
function MiniBrowser({ url, secure, title, lock, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg bg-bg-elevated shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border px-3 py-2",
			children: [lock ?? (secure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-3 text-danger" })), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-0 truncate font-mono text-[10px] text-muted",
				children: url
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-widest text-dim",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm",
				children
			})]
		})]
	});
}
function PremioEvidence({ found, onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg bg-bg-elevated shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border px-4 py-3 font-mono text-[10px] text-dim",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
				id: "site",
				found,
				onFind,
				children: "mega-premio-resgate.net/iphone"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 px-4 py-4 text-sm leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg font-medium",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "ganhou",
						found,
						onFind,
						children: "Você ganhou um celular — resgate agora"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
					id: "prazo",
					found,
					onFind,
					children: "Oferta expira em 2 horas"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Pague só a",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						id: "cartao",
						found,
						onFind,
						children: "taxa de envio com número do cartão completo"
					}),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-dim",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
						decoy: true,
						found,
						onFind,
						children: "Parabéns, cliente especial."
					})
				})
			]
		})]
	});
}
var HELP = [
	"help                 lista de comandos",
	"ls                   evidências no caso",
	"cat <arquivo>        lê evidência",
	"headers              cabeçalhos de msg-07.eml",
	"whois <domínio>      registro simulado",
	"trace <url>          destino real do link",
	"compare              domínio oficial × suspeito",
	"clues                pistas já extraídas",
	"verdict phishing|legitimo",
	"hint                 uma dica",
	"clear                limpa o terminal"
].join("\n");
function TerminalSoc() {
	const found = useProgress((s) => s.clues["soc"] ?? EMPTY_CLUES);
	const addClue = useProgress((s) => s.addClue);
	const markComplete = useProgress((s) => s.markComplete);
	const setScore = useProgress((s) => s.setScore);
	const archived = useProgress((s) => s.completed).includes("soc");
	const [input, setInput] = (0, import_react.useState)("");
	const [hist, setHist] = (0, import_react.useState)([]);
	const [hIdx, setHIdx] = (0, import_react.useState)(-1);
	const [lines, setLines] = (0, import_react.useState)([{
		kind: "ok",
		text: "SOC sandbox — análise defensiva. Sem rede real."
	}, {
		kind: "out",
		text: "caso-001 carregado. digite help."
	}]);
	const endRef = (0, import_react.useRef)(null);
	const fieldRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ block: "end" });
	}, [lines]);
	function push(extra) {
		setLines((cur) => [...cur, ...extra]);
	}
	function clue(id) {
		addClue("soc", id);
	}
	function run(raw) {
		const cmd = raw.trim();
		if (!cmd) return;
		setHist((h) => [...h, cmd]);
		setHIdx(-1);
		const parts = cmd.split(/\s+/);
		const c = (parts[0] ?? "").toLowerCase();
		const arg = parts.slice(1).join(" ").toLowerCase();
		const out = [{
			kind: "in",
			text: `root@soc:/caso-001# ${cmd}`
		}];
		if (c === "help") out.push({
			kind: "out",
			text: HELP
		});
		else if (c === "clear") {
			setLines([]);
			setInput("");
			return;
		} else if (c === "ls") out.push({
			kind: "out",
			text: "msg-07.eml\nlink-alvo.txt\nregistro.log"
		});
		else if (c === "cat") {
			if (arg.includes("msg")) {
				out.push({
					kind: "out",
					text: [
						"De: Banco Norte Segurança <alerta@banco-n0rte.com>",
						"Para: voce@email.com",
						"Assunto: URGENTE — Conta bloqueada em 10 minutos",
						"",
						"Detectamos acesso em outro estado. Clique e informe senha + SMS:",
						"https://banco-n0rte.tk/login"
					].join("\n")
				});
				clue("urgencia-body");
			} else if (arg.includes("link")) {
				out.push({
					kind: "out",
					text: "exibido: banco-norte.com.br/seguranca\nreal:    http://banco-n0rte.tk/login"
				});
				clue("lookalike");
			} else if (arg.includes("registro")) {
				out.push({
					kind: "out",
					text: "banco-n0rte.com — criado há 2 dias — privacy redacted"
				});
				clue("domain-age");
			} else out.push({
				kind: "bad",
				text: "arquivo não encontrado"
			});
		} else if (c === "headers") {
			out.push({
				kind: "out",
				text: [
					"Return-Path: bounce@mailer-xyz.tk",
					"From: alerta@banco-n0rte.com",
					"Reply-To: suporte@mailer-xyz.tk",
					"SPF: fail",
					"DKIM: fail"
				].join("\n")
			});
			clue("headers-fail");
		} else if (c === "whois") {
			if (arg.includes("n0rte") || arg.includes("n0rte.tk")) {
				out.push({
					kind: "out",
					text: "banco-n0rte.com · criado há 2 dias · registrante oculto"
				});
				clue("domain-age");
			} else if (arg.includes("norte")) out.push({
				kind: "out",
				text: "banco-norte.com.br · registro corporativo antigo · DNS oficial"
			});
			else out.push({
				kind: "out",
				text: "domínio fora do dossiê. tente banco-n0rte.com"
			});
		} else if (c === "trace") {
			out.push({
				kind: "out",
				text: "destino real: http://banco-n0rte.tk/login  (zero no lugar do o)"
			});
			clue("lookalike");
		} else if (c === "compare") {
			out.push({
				kind: "out",
				text: "oficial:  banco-norte.com.br\nsuspeito: banco-n0rte.com  ← 1 caractere (0 × o)"
			});
			clue("lookalike");
		} else if (c === "clues") out.push({
			kind: "out",
			text: found.length === 0 ? "nenhuma pista extraída ainda" : `pistas: ${found.join(", ")}`
		});
		else if (c === "hint") out.push({
			kind: "out",
			text: "comece por cat msg-07.eml, depois headers e whois banco-n0rte.com"
		});
		else if (c === "verdict") {
			if (arg === "phishing") {
				if (found.length < 3) out.push({
					kind: "bad",
					text: "evidência insuficiente. extraia pelo menos 3 pistas (cat, headers, whois/trace)."
				});
				else {
					out.push({
						kind: "ok",
						text: "VEREDITO ACEITO. phishing por imitação de banco. não usar o link. abrir o app oficial."
					});
					markComplete("soc");
					setScore("soc", found.length, 4);
				}
			} else if (arg === "legitimo" || arg === "legítimo") out.push({
				kind: "bad",
				text: "veredito rejeitado. releia headers e o domínio com zero."
			});
			else out.push({
				kind: "bad",
				text: "uso: verdict phishing | legitimo"
			});
		} else out.push({
			kind: "bad",
			text: `comando não reconhecido: ${c}. digite help.`
		});
		push(out);
		setInput("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: "CASO F · TERMINAL SOC"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: "Sandbox de análise"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Investigação defensiva. Os comandos só leem evidências simuladas — não há rede, exploit ou envio. Extraia pistas e emita o veredito."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 overflow-hidden rounded-lg bg-bg-elevated shadow-panel",
			onClick: () => fieldRef.current?.focus(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] tracking-widest text-dim",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "root@soc:/caso-001" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "sandbox"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[420px] overflow-y-auto px-3 py-3 font-mono text-xs leading-relaxed",
					children: [lines.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: line.kind === "in" ? "mt-2 whitespace-pre-wrap text-accent" : line.kind === "ok" ? "whitespace-pre-wrap text-accent" : line.kind === "bad" ? "whitespace-pre-wrap text-danger" : "whitespace-pre-wrap text-muted",
						children: line.text
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex items-center gap-2 border-t border-border px-3 py-2",
					onSubmit: (e) => {
						e.preventDefault();
						run(input);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-accent",
						children: "›"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fieldRef,
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "ArrowUp") {
								e.preventDefault();
								if (hist.length) {
									const ni = Math.min(hist.length - 1, hIdx + 1);
									setHIdx(ni);
									setInput(hist[hist.length - 1 - ni] ?? "");
								}
							} else if (e.key === "ArrowDown") {
								e.preventDefault();
								const ni = hIdx - 1;
								if (ni < 0) {
									setHIdx(-1);
									setInput("");
								} else {
									setHIdx(ni);
									setInput(hist[hist.length - 1 - ni] ?? "");
								}
							}
						},
						className: "h-11 min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none",
						placeholder: "help",
						autoCapitalize: "none",
						autoCorrect: "off",
						spellCheck: false,
						"aria-label": "Comando do terminal"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 font-mono text-xs tabular-nums text-dim",
			children: [
				"pistas extraídas ",
				found.length,
				"/4"
			]
		}),
		archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
				tone: "info",
				title: "CASO ENCERRADO NESTE LAB",
				text: "Imitação de banco: domínio com zero, cabeçalhos falhos, pedido de senha e SMS. Contraprova no aplicativo oficial."
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mt-8 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/lab",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Laboratório"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desafios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: ["Desafios", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
			})]
		})
	] });
}
function Page() {
	const { id } = Route.useParams();
	if (id === "soc") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalSoc, {});
	const lab = labById(id);
	if (!lab) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-sm text-danger",
		children: "Evidência não catalogada."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/lab",
		className: "mt-4 inline-block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			variant: "ghost",
			children: "Voltar ao laboratório"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabStage, { lab });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) });
//#endregion
export { SplitComponent as component };
