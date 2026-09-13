import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useProgress, E as countDone, _ as RequireAgent, a as CHALLENGE_IDS, d as LABS, f as LAB_IDS, i as CHALLENGES, m as LESSON_IDS, p as LESSONS, r as Btn, t as ALL_IDS, u as FilePanel, v as Stamp } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/caso-CfioBk0H.js
var import_jsx_runtime = require_jsx_runtime();
function Caso() {
	const callsign = useProgress((s) => s.callsign);
	const completed = useProgress((s) => s.completed);
	const scores = useProgress((s) => s.scores);
	const ready = countDone(completed, ALL_IDS) === ALL_IDS.length;
	const quiz = CHALLENGE_IDS.reduce((acc, id) => {
		const s = scores[id];
		if (s) {
			acc.correct += s.correct;
			acc.total += s.total;
		}
		return acc;
	}, {
		correct: 0,
		total: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: "ARQUIVO FINAL · CASO #001"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: ready ? "Caso encerrado" : "Caso em aberto"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "O phishing depende de uma coisa: fazer você confiar antes de verificar. A defesa começa quando você quebra o ciclo."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePanel, {
			code: "FICHA DO AGENTE",
			title: callsign || "AGENTE",
			classified: true,
			className: "relative mt-6",
			children: [
				ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute right-6 top-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, { label: "RESOLVIDO" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute right-6 top-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
						label: "EM ABERTO",
						tone: "danger"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid max-w-md gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Briefing",
							value: `${countDone(completed, LESSON_IDS)}/${LESSONS.length}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Laboratório",
							value: `${countDone(completed, LAB_IDS)}/${LABS.length + 1}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Desafios",
							value: `${countDone(completed, CHALLENGE_IDS)}/${CHALLENGES.length}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Protocolo",
							value: completed.includes("protocol") ? "catalogado" : "pendente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Acertos",
							value: quiz.total ? `${quiz.correct}/${quiz.total}` : "—"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "mt-6 max-w-lg border-l-2 border-accent pl-4 font-mono text-sm text-accent",
					children: "PARAR → ANALISAR → VERIFICAR → AGIR"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-sm text-muted",
					children: "Nem todo alerta é verdadeiro. Nem toda mensagem é o que parece. Na próxima suspeita, procure a pressão, a inconsistência, o pedido e a indução ao clique."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					children: "Quartel-general"
				})
			}), !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/briefing",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, { children: "Continuar dossiê" })
			}) : null]
		})
	] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-baseline justify-between gap-4 border-b border-border py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-mono text-[10px] tracking-[0.18em] text-dim",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-sm tabular-nums text-fg",
			children: value
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Caso, {}) });
//#endregion
export { SplitComponent as component };
