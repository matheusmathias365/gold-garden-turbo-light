import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShieldAlert, d as Fingerprint, i as SquareTerminal, m as BookOpen, n as Trophy, o as RotateCcw, u as FolderLock } from "../_libs/lucide-react.mjs";
import { A as useProgress, E as countDone, a as CHALLENGE_IDS, c as CrtFrame, d as LABS, f as LAB_IDS, g as Rail, i as CHALLENGES, k as useHasHydrated, m as LESSON_IDS, n as AppHeader, p as LESSONS, r as Btn, t as ALL_IDS, u as FilePanel, y as Ticker } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-w0C5iPvZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LOGS = [
	"SOC v2.4 — núcleo de defesa",
	"carregando dossiê caso #001…",
	"[ok] motor de pistas",
	"[ok] sandbox de evidências",
	"[ok] protocolo de emergência",
	"aviso: este arquivo ensina a reconhecer e evitar phishing.",
	"não contém instruções para atacar pessoas."
];
function BootScreen() {
	const setCallsign = useProgress((s) => s.setCallsign);
	const completeBoot = useProgress((s) => s.completeBoot);
	const [shown, setShown] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [reduce, setReduce] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduce(mq.matches);
		if (mq.matches) {
			setShown(LOGS.length);
			return;
		}
		if (shown >= LOGS.length) return;
		const t = window.setTimeout(() => setShown((n) => n + 1), 280);
		return () => window.clearTimeout(t);
	}, [shown]);
	const ready = shown >= LOGS.length;
	const valid = name.trim().length >= 2 && name.trim().length <= 16;
	function enter() {
		if (!valid) return;
		setCallsign(name.trim().toUpperCase());
		completeBoot();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CrtFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-[calc(100dvh-36px)] max-w-xl flex-col justify-center px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] tracking-[0.28em] text-danger",
				children: "ARQUIVO CONFIDENCIAL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-3 font-display text-4xl font-semibold leading-none tracking-tight text-fg md:text-5xl",
				children: [
					"Operação",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "Phishing"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-md text-sm leading-relaxed text-muted",
				children: "Uma mensagem. Um clique. Um golpe. Descubra a armadilha antes que seja tarde."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-1.5 font-mono text-xs leading-relaxed text-accent",
				children: [LOGS.slice(0, shown).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-dim",
							children: "›"
						}),
						" ",
						line
					]
				}, line)), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "cursor-blink text-accent",
					children: "_"
				}) }) : null]
			}),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 stagger-in",
				onSubmit: (e) => {
					e.preventDefault();
					enter();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "callsign",
						className: "font-mono text-[10px] tracking-[0.22em] text-muted",
						children: "IDENTIFIQUE-SE, AGENTE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "callsign",
						autoComplete: "off",
						autoFocus: !reduce,
						maxLength: 16,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "CALLSIGN",
						className: "mt-2 h-12 w-full rounded-sm border border-border bg-surface px-3 font-mono text-sm uppercase tracking-[0.2em] text-fg placeholder:text-dim focus-visible:border-accent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							disabled: !valid,
							children: "Iniciar missão"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "button",
							variant: "ghost",
							onClick: () => {
								setCallsign("AGENTE");
								completeBoot();
							},
							children: "Entrar anônimo"
						})]
					})
				]
			}) : null
		]
	})] });
}
function Hq() {
	const completed = useProgress((s) => s.completed);
	const callsign = useProgress((s) => s.callsign);
	const reset = useProgress((s) => s.reset);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const lessons = countDone(completed, LESSON_IDS);
	const labs = countDone(completed, LAB_IDS);
	const challenges = countDone(completed, CHALLENGE_IDS);
	const protocol = completed.includes("protocol");
	const total = countDone(completed, ALL_IDS);
	const ready = total === ALL_IDS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CrtFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-5xl px-4 py-6 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] tracking-[0.22em] text-accent",
					children: ["QUARTEL-GENERAL · AGENTE ", callsign || "—"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl",
					children: "Desvendar o phishing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
					children: "Mini curso de conscientização. Pense como um analista. Defenda-se como um especialista. A missão é reconhecer a armadilha — nunca reproduzi-la."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
						value: total,
						max: ALL_IDS.length
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs tabular-nums text-dim",
						children: [
							total,
							"/",
							ALL_IDS.length,
							" arquivos catalogados"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
							to: "/briefing",
							icon: BookOpen,
							code: "MÓDULO 01",
							title: "Briefing",
							copy: "O que é phishing, como o golpe se monta e as cinco pistas.",
							done: lessons,
							max: LESSON_IDS.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
							to: "/lab",
							icon: SquareTerminal,
							code: "MÓDULO HACKER",
							title: "Laboratório SOC",
							copy: "Inspecione SMS, e-mail, chat, página gêmea e o terminal.",
							done: labs,
							max: LAB_IDS.length,
							featured: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
							to: "/desafios",
							icon: Trophy,
							code: "MÓDULO 03",
							title: "Desafios",
							copy: "Provas de detetive. Errou, lê o debrief e tenta de novo.",
							done: challenges,
							max: CHALLENGE_IDS.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModuleCard, {
							to: "/protocolo",
							icon: ShieldAlert,
							code: "PROTOCOLO",
							title: "E se eu cliquei?",
							copy: "Incidente detectado. O que fazer nos primeiros minutos.",
							done: protocol ? 1 : 0,
							max: 1
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/caso",
						className: "block rounded-lg bg-surface shadow-panel transition-colors duration-150 hover:border-accent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderLock, {
									className: "size-5 text-accent",
									strokeWidth: 1.75
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] tracking-[0.2em] text-accent",
										children: "ARQUIVO FINAL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-base font-medium",
										children: ready ? "Caso encerrado — ficha do agente" : "Caso em aberto"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, {
									className: "size-4 text-dim",
									strokeWidth: 1.75
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePanel, {
					code: "LEITURA RÁPIDA",
					title: "As quatro marcas",
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							["Pressão", "Relógio, medo, “não ligue”."],
							["Inconsistência", "Remetente, domínio, tom, erros."],
							["Pedido suspeito", "Senha, SMS, PIX, cartão."],
							["Indução ao clique", "Link, botão, atalho da mensagem."]
						].map(([t, b]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md bg-surface-2 px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-fg",
								children: t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: b
							})]
						}, t))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Se encontrar as quatro, você provavelmente encontrou a armadilha."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-8 font-mono text-[10px] tracking-widest text-dim",
					children: [
						LESSONS.length,
						" arquivos · ",
						LABS.length + 1,
						" labs · ",
						CHALLENGES.length,
						" ",
						"desafios"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: confirmReset ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Zerar progresso deste dispositivo?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "danger",
								onClick: () => reset(),
								children: "Confirmar"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => setConfirmReset(false),
								children: "Cancelar"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						variant: "dim",
						onClick: () => setConfirmReset(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							className: "size-3.5",
							strokeWidth: 1.75
						}), "Reiniciar operação"]
					})
				})
			]
		})
	] });
}
function ModuleCard({ to, icon: Icon, code, title, copy, done, max, featured }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group block rounded-lg bg-surface p-4 shadow-panel transition-colors duration-150 hover:bg-surface-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[10px] tracking-[0.2em] text-accent",
					children: code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: featured ? "size-5 text-accent" : "size-5 text-muted",
					strokeWidth: 1.75
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-xl font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: copy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
					value: done,
					max
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-xs tabular-nums text-dim",
					children: [
						done,
						"/",
						max
					]
				})]
			})
		]
	});
}
function Home() {
	const hydrated = useHasHydrated();
	const booted = useProgress((s) => s.booted);
	if (!hydrated || !booted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hq, {});
}
//#endregion
export { Home as component };
