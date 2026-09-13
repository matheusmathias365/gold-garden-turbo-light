import { i as __toESM } from "../_runtime.mjs";
import { _ as Link, b as require_jsx_runtime, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Check } from "../_libs/lucide-react.mjs";
import { A as useProgress, _ as RequireAgent, h as PROTOCOL_ID, o as Callout, r as Btn, u as FilePanel, w as cn } from "./shell-trxKZRfk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/protocolo-CTPbclb4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		id: "s1",
		n: "01",
		title: "Pare de interagir com a página",
		body: "Feche a aba. Não clique em mais nada, não baixe, não “confirme”."
	},
	{
		id: "s2",
		n: "02",
		title: "Não forneça mais informações",
		body: "Nada de senha, código, selfie, cartão ou PIX “para resolver”."
	},
	{
		id: "s3",
		n: "03",
		title: "Troque a senha no canal oficial",
		body: "Se informou senha, altere-a pelo aplicativo ou site que você já conhecia — nunca pelo link da mensagem."
	},
	{
		id: "s4",
		n: "04",
		title: "Ative a autenticação em dois fatores",
		body: "Quando o serviço oferecer, ligue o segundo fator. Não compartilhe o código que chegar."
	},
	{
		id: "s5",
		n: "05",
		title: "Monitore as contas",
		body: "Olhe lançamentos, sessões abertas e e-mails de “novo acesso”."
	},
	{
		id: "s6",
		n: "06",
		title: "Se houve pagamento ou fraude",
		body: "Contate imediatamente a instituição pelo canal oficial e registre o ocorrido."
	}
];
function Protocol() {
	const markComplete = useProgress((s) => s.markComplete);
	const archived = useProgress((s) => s.completed).includes(PROTOCOL_ID);
	const [checked, setChecked] = (0, import_react.useState)(archived ? STEPS.map((s) => s.id) : []);
	const all = STEPS.every((s) => checked.includes(s.id));
	function toggle(id) {
		setChecked((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] tracking-[0.22em] text-danger",
			children: "INCIDENTE DETECTADO"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-3xl font-semibold tracking-tight",
			children: "Protocolo de emergência"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted",
			children: "Clicou em algo suspeito? Agir rápido reduz o impacto. Marque cada passo conforme executar — ou conforme estudar a sequência."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FilePanel, {
			code: "CHECKLIST",
			title: "Primeiros minutos",
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: STEPS.map((step) => {
					const on = checked.includes(step.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(step.id),
						className: cn("flex min-h-14 w-full items-start gap-3 rounded-md border px-3 py-3 text-left transition-colors duration-150", on ? "border-accent/40 bg-accent/10" : "border-border bg-bg hover:border-accent/40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-xs border border-border font-mono text-[10px] text-muted",
							children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-accent" }) : step.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: step.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: step.body
						})] })]
					}) }, step.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: archived ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-accent",
					children: "Protocolo catalogado"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					disabled: !all,
					onClick: () => markComplete(PROTOCOL_ID),
					children: "Arquivar protocolo"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
				tone: "danger",
				title: "REGRA",
				text: "Código recebido por SMS ou aplicativo não se compartilha com quem está do outro lado da conversa."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/caso",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, { children: "Ficha do agente" })
			})
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAgent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protocol, {}) });
//#endregion
export { SplitComponent as component };
