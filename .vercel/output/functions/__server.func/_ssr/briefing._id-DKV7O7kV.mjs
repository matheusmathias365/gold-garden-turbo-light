import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowLeft, h as ArrowRight, p as Check } from "../_libs/lucide-react.mjs";
import { i as Route$4 } from "./router-tDyxefdI.mjs";
import { A as useProgress, O as lessonIndex, S as adjacentLesson, _ as RequireAgent, o as Callout, p as LESSONS, r as Btn, u as FilePanel } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/briefing._id-DKV7O7kV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonView({ lesson }) {
	const markComplete = useProgress((s) => s.markComplete);
	const done = useProgress((s) => s.completed).includes(lesson.id);
	const { prev, next } = adjacentLesson(lesson.id);
	const idx = lessonIndex(lesson.id);
	(0, import_react.useEffect)(() => {
		markComplete(lesson.id);
	}, [lesson.id, markComplete]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stagger-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[10px] tracking-[0.22em] text-accent",
				children: [
					lesson.code,
					" · ",
					idx + 1,
					"/",
					LESSONS.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl font-semibold tracking-tight",
				children: lesson.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: lesson.kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePanel, {
				code: "EVIDÊNCIA",
				title: lesson.takeaway,
				classified: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5",
					children: lesson.blocks.map((block, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockView, { block }, i))
				})
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 flex items-center gap-2 font-mono text-xs text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-3.5",
					strokeWidth: 2
				}), "Arquivo catalogado"]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-8 flex flex-wrap items-center justify-between gap-3",
				children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/briefing/$id",
					params: { id: prev.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						variant: "ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "size-4",
							strokeWidth: 1.75
						}), prev.title]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/briefing",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						variant: "ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Dossiê"]
					})
				}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/briefing/$id",
					params: { id: next.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: [next.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4",
						strokeWidth: 1.75
					})] })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/lab",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: ["Ir ao laboratório", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-4",
						strokeWidth: 1.75
					})] })
				})]
			})
		]
	});
}
function BlockView({ block }) {
	if (block.type === "lead") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base leading-relaxed text-fg",
		children: block.text
	});
	if (block.type === "quote") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
		className: "border-l-2 border-accent pl-4 font-mono text-sm leading-relaxed text-accent",
		children: block.text
	});
	if (block.type === "callout") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
		tone: block.tone,
		title: block.title,
		text: block.text
	});
	if (block.type === "steps") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-3",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-3 rounded-md bg-surface-2 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-accent",
				children: item.n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: item.body
			})] })]
		}, item.n))
	});
	if (block.type === "phrases") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "rounded-md border border-danger/30 bg-bg px-3 py-2.5 font-mono text-sm text-fg",
			children: item
		}, item))
	});
	if (block.type === "checks") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex gap-2 text-sm leading-relaxed",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-accent" }), item]
		}, item))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid gap-3 sm:grid-cols-2",
		children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-md bg-surface-2 px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: item.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: item.body
			})]
		}, item.title))
	});
}
function Page() {
	const { id } = Route$4.useParams();
	const lesson = LESSONS.find((l) => l.id === id);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-sm text-danger",
		children: "Arquivo não catalogado."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/briefing",
		className: "mt-4 inline-block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			variant: "ghost",
			children: "Voltar ao dossiê"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonView, { lesson });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) });
//#endregion
export { SplitComponent as component };
