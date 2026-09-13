import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ChevronRight, p as Check } from "../_libs/lucide-react.mjs";
import { A as useProgress, E as countDone, _ as RequireAgent, a as CHALLENGE_IDS, g as Rail, i as CHALLENGES } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desafios.index-DmGSIKmq.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	const completed = useProgress((s) => s.completed);
	const scores = useProgress((s) => s.scores);
	const done = countDone(completed, CHALLENGE_IDS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: "MÓDULO 03 · DESAFIOS"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: "Provas de detetive"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Cinco testes. Errar faz parte — o debrief ensina. Só avança o carimbo com a leitura certa."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
				value: done,
				max: CHALLENGE_IDS.length
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs tabular-nums text-dim",
				children: [
					done,
					"/",
					CHALLENGE_IDS.length
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel",
			children: CHALLENGES.map((ch) => {
				const ok = completed.includes(ch.id);
				const score = scores[ch.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/desafios/$id",
					params: { id: ch.id },
					className: "flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-24 font-mono text-[10px] tracking-widest text-dim",
							children: ch.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: ch.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: ch.kicker
							})]
						}),
						ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-mono text-xs text-accent",
							children: [score ? `${score.correct}/${score.total}` : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-dim" })
					]
				}) }, ch.id);
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Index, {}) });
//#endregion
export { SplitComponent as component };
