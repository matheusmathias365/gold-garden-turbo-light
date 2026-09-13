import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { RequireAgent } from "@/components/shell";
import { Btn, Callout, FilePanel } from "@/components/ui";
import { PROTOCOL_ID } from "@/lib/ids";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "s1",
    n: "01",
    title: "Pare de interagir com a página",
    body: "Feche a aba. Não clique em mais nada, não baixe, não “confirme”.",
  },
  {
    id: "s2",
    n: "02",
    title: "Não forneça mais informações",
    body: "Nada de senha, código, selfie, cartão ou PIX “para resolver”.",
  },
  {
    id: "s3",
    n: "03",
    title: "Troque a senha no canal oficial",
    body: "Se informou senha, altere-a pelo aplicativo ou site que você já conhecia — nunca pelo link da mensagem.",
  },
  {
    id: "s4",
    n: "04",
    title: "Ative a autenticação em dois fatores",
    body: "Quando o serviço oferecer, ligue o segundo fator. Não compartilhe o código que chegar.",
  },
  {
    id: "s5",
    n: "05",
    title: "Monitore as contas",
    body: "Olhe lançamentos, sessões abertas e e-mails de “novo acesso”.",
  },
  {
    id: "s6",
    n: "06",
    title: "Se houve pagamento ou fraude",
    body: "Contate imediatamente a instituição pelo canal oficial e registre o ocorrido.",
  },
];

export const Route = createFileRoute("/protocolo")({
  component: () => (
    <RequireAgent>
      <Protocol />
    </RequireAgent>
  ),
});

function Protocol() {
  const markComplete = useProgress((s) => s.markComplete);
  const completed = useProgress((s) => s.completed);
  const archived = completed.includes(PROTOCOL_ID);
  const [checked, setChecked] = useState<string[]>(archived ? STEPS.map((s) => s.id) : []);
  const all = STEPS.every((s) => checked.includes(s.id));

  function toggle(id: string) {
    setChecked((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    );
  }

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-danger">
        INCIDENTE DETECTADO
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        Protocolo de emergência
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Clicou em algo suspeito? Agir rápido reduz o impacto. Marque cada passo
        conforme executar — ou conforme estudar a sequência.
      </p>

      <FilePanel code="CHECKLIST" title="Primeiros minutos" className="mt-6">
        <ol className="space-y-2">
          {STEPS.map((step) => {
            const on = checked.includes(step.id);
            return (
              <li key={step.id}>
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  className={cn(
                    "flex min-h-14 w-full items-start gap-3 rounded-md border px-3 py-3 text-left transition-colors duration-150",
                    on
                      ? "border-accent/40 bg-accent/10"
                      : "border-border bg-bg hover:border-accent/40",
                  )}
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-xs border border-border font-mono text-[10px] text-muted">
                    {on ? <Check className="size-3.5 text-accent" /> : step.n}
                  </span>
                  <span>
                    <span className="block font-medium">{step.title}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {step.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-5">
          {archived ? (
            <p className="font-mono text-xs text-accent">Protocolo catalogado</p>
          ) : (
            <Btn
              disabled={!all}
              onClick={() => markComplete(PROTOCOL_ID)}
            >
              Arquivar protocolo
            </Btn>
          )}
        </div>
      </FilePanel>

      <div className="mt-4">
        <Callout
          tone="danger"
          title="REGRA"
          text="Código recebido por SMS ou aplicativo não se compartilha com quem está do outro lado da conversa."
        />
      </div>

      <div className="mt-8">
        <Link to="/caso">
          <Btn>{archived ? "Emitir certificado" : "Ficha do agente"}</Btn>
        </Link>
      </div>
    </div>
  );
}
