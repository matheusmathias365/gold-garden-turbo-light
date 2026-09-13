import { _ as Link, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ChevronRight, i as SquareTerminal, p as Check } from "../_libs/lucide-react.mjs";
import { A as useProgress, E as countDone, _ as RequireAgent, d as LABS, f as LAB_IDS, g as Rail } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab.index-0t8zlka1.js
var import_jsx_runtime = require_jsx_runtime();
function LabIndex() {
	const completed = useProgress((s) => s.completed);
	const done = countDone(completed, LAB_IDS);
	const soc = completed.includes("soc");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: "MÓDULO HACKER · LABORATÓRIO SOC"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: "Evidências reais, ambiente seguro"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Cinco casos para marcar pistas e um terminal de análise. Nada aqui envia dados, abre golpe ou ensina a atacar — só a desmontar a isca."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rail, {
				value: done,
				max: LAB_IDS.length
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs tabular-nums text-dim",
				children: [
					done,
					"/",
					LAB_IDS.length
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/lab/$id",
			params: { id: "soc" },
			className: "mt-6 flex items-start gap-4 rounded-lg bg-surface p-4 shadow-panel hover:bg-surface-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareTerminal, {
					className: "mt-0.5 size-5 text-accent",
					strokeWidth: 1.75
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.2em] text-accent",
							children: "CASO F · DESTAQUE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-medium",
							children: "Terminal SOC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Comandos de leitura: headers, whois, trace. Emita o veredito."
						})
					]
				}),
				soc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-dim" })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel",
			children: LABS.map((lab) => {
				const ok = completed.includes(lab.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/lab/$id",
					params: { id: lab.id },
					className: "flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-16 font-mono text-[10px] tracking-widest text-dim",
							children: lab.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: lab.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-muted",
								children: lab.channelLabel
							})]
						}),
						ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-dim" })
					]
				}) }, lab.id);
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LabIndex, {}) });
//#endregion
export { SplitComponent as component };
