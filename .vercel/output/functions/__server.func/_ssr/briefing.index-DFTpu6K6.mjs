import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ChevronRight, p as Check } from "../_libs/lucide-react.mjs";
import { A as useProgress, E as countDone, _ as RequireAgent, g as Rail, m as LESSON_IDS, p as LESSONS } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/briefing.index-DFTpu6K6.js
var import_jsx_runtime = require_jsx_runtime();
function BriefingIndex() {
	const completed = useProgress((s) => s.completed);
	const done = countDone(completed, LESSON_IDS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: "MÓDULO 01 · BRIEFING"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: "Dossiê teórico"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Oito arquivos. Cada um é uma pista da investigação. Catalogar todos destrava o olhar de analista para o laboratório."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
				value: done,
				max: LESSON_IDS.length
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs tabular-nums text-dim",
				children: [
					done,
					"/",
					LESSON_IDS.length
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel",
			children: LESSONS.map((lesson, i) => {
				const ok = completed.includes(lesson.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/briefing/$id",
					params: { id: lesson.id },
					className: "flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 font-mono text-xs text-dim",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lesson.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: lesson.kicker
							})]
						}),
						ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4 text-accent",
							strokeWidth: 2
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-dim" })
					]
				}) }, lesson.id);
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingIndex, {}) });
//#endregion
export { SplitComponent as component };
