import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as ArrowLeft, h as ArrowRight, p as Check, t as X } from "../_libs/lucide-react.mjs";
import { r as Route$2 } from "./router-tDyxefdI.mjs";
import { A as useProgress, C as challengeById, T as correctIds, _ as RequireAgent, b as adjacentChallenge, o as Callout, r as Btn, u as FilePanel, w as cn } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desafios._id-CYuN5iEu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChallengeView({ challenge }) {
	const markComplete = useProgress((s) => s.markComplete);
	const setScore = useProgress((s) => s.setScore);
	const done = useProgress((s) => s.completed).includes(challenge.id);
	const { prev, next } = adjacentChallenge(challenge.id);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [order, setOrder] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)(done ? "ok" : "idle");
	const needed = (0, import_react.useMemo)(() => correctIds(challenge), [challenge]);
	function toggle(id) {
		if (status === "ok") return;
		setStatus("idle");
		if (challenge.kind === "single") {
			setPicked([id]);
			return;
		}
		if (challenge.kind === "order") {
			setOrder((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
			return;
		}
		setPicked((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
	}
	function submit() {
		let ok = false;
		if (challenge.kind === "order") ok = order.length === needed.length && order.every((id, i) => id === needed[i]);
		else if (challenge.kind === "single") ok = picked.length === 1 && needed.includes(picked[0] ?? "");
		else ok = [...picked].sort().join(",") === [...needed].sort().join(",");
		if (ok) {
			setStatus("ok");
			markComplete(challenge.id);
			setScore(challenge.id, needed.length, needed.length);
		} else setStatus("bad");
	}
	const selected = challenge.kind === "order" ? order : picked;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-accent",
			children: challenge.code
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: challenge.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: challenge.kicker
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePanel, {
			code: "PROVA",
			title: "Evidência",
			classified: true,
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg",
					children: challenge.prompt
				}),
				challenge.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: challenge.detail
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2",
					children: challenge.options.map((opt) => {
						const on = selected.includes(opt.id);
						const rank = challenge.kind === "order" && on ? order.indexOf(opt.id) + 1 : null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggle(opt.id),
							className: cn("flex min-h-12 w-full items-start gap-3 rounded-md border px-3 py-3 text-left text-sm transition-colors duration-150", on ? "border-accent bg-accent/10 text-fg" : "border-border bg-bg text-fg hover:border-accent/50", status === "bad" && on && "border-danger", status === "ok" && on && "border-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-xs border border-border font-mono text-[10px] text-muted",
								children: rank ?? (on ? "•" : "")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.text })]
						}) }, opt.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: submit,
							disabled: selected.length === 0 || status === "ok",
							children: "Emitir resposta"
						}),
						status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 font-mono text-xs text-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Correto"]
						}) : null,
						status === "bad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 font-mono text-xs text-danger",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Revise as pistas e tente de novo"]
						}) : null
					]
				}),
				status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
						tone: "info",
						title: "DEBRIEF",
						text: challenge.explain
					})
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mt-8 flex flex-wrap items-center justify-between gap-3",
			children: [prev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desafios/$id",
				params: { id: prev.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), prev.title]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desafios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Desafios"]
				})
			}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desafios/$id",
				params: { id: next.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: [next.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/protocolo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, { children: ["Protocolo de emergência", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })] })
			})]
		})
	] });
}
function Page() {
	const { id } = Route$2.useParams();
	const challenge = challengeById(id);
	if (!challenge) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-mono text-sm text-danger",
		children: "Prova não catalogada."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/desafios",
		className: "mt-4 inline-block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			variant: "ghost",
			children: "Voltar aos desafios"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChallengeView, { challenge });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {}) });
//#endregion
export { SplitComponent as component };
