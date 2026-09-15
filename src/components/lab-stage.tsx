import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Lock, Unlock } from "lucide-react";
import { adjacentLab, LAB_SEQUENCE, type LabCase } from "@/lib/lab-data";
import { EMPTY_CLUES, useProgress } from "@/lib/progress";
import { Btn, Callout, ClueTag, FilePanel } from "@/components/ui";
import { cn } from "@/lib/utils";

export function LabStage({ lab }: { lab: LabCase }) {
  const found = useProgress((s) => s.clues[lab.id] ?? EMPTY_CLUES);
  const addClue = useProgress((s) => s.addClue);
  const markComplete = useProgress((s) => s.markComplete);
  const completed = useProgress((s) => s.completed);
  const setScore = useProgress((s) => s.setScore);
  const [flash, setFlash] = useState<string | null>(null);
  const allFound = lab.clues.every((c) => found.includes(c.id));
  const archived = completed.includes(lab.id);
  const { prev, next } = adjacentLab(lab.id);
  const navigate = useNavigate();

  function onFind(id: string, decoy?: boolean) {
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

  function archiveAndGo() {
    archive();
    if (next) {
      void navigate({ to: "/lab/$id", params: { id: next.id } });
    }
  }

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        {lab.code} · {lab.channelLabel}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {lab.title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{lab.briefing}</p>
      <p className="mt-1 font-mono text-xs text-dim">{lab.objective}</p>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Marcar as pistas não fecha o caso. Toque em{" "}
        <span className="text-fg">Arquivar caso</span> no fim — sem isso o
        progresso e o certificado não contam.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          {lab.channel === "sms" && <SmsEvidence found={found} onFind={onFind} />}
          {lab.channel === "email" && (
            <EmailEvidence found={found} onFind={onFind} />
          )}
          {lab.channel === "chat" && <ChatEvidence found={found} onFind={onFind} />}
          {lab.channel === "page" && <PageEvidence found={found} onFind={onFind} />}
          {lab.channel === "premio" && (
            <PremioEvidence found={found} onFind={onFind} />
          )}
          {flash ? (
            <p className="mt-3 font-mono text-xs text-warn">{flash}</p>
          ) : (
            <p className="mt-3 font-mono text-xs text-dim">
              Toque nas partes suspeitas da evidência.
            </p>
          )}
        </div>

        <FilePanel
          code="PISTAS"
          title={`${found.length}/${lab.clues.length} catalogadas`}
        >
          <ul className="space-y-3">
            {lab.clues.map((clue) => {
              const ok = found.includes(clue.id);
              return (
                <li
                  key={clue.id}
                  className={cn(
                    "rounded-md px-3 py-3",
                    ok ? "bg-surface-2" : "bg-bg",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <ClueTag kind={clue.kind} />
                    {ok ? (
                      <Check className="size-3.5 text-accent" strokeWidth={2} />
                    ) : (
                      <span className="font-mono text-[10px] text-dim">????</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm font-medium">
                    {ok ? clue.label : "Pista oculta"}
                  </p>
                  {ok ? (
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {clue.explanation}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
          {!archived ? (
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-warn">
              {allFound
                ? "Pistas ok. Arquive o caso para concluir."
                : "Ache as pistas e depois arquive. Sem arquivar, o caso continua aberto."}
            </p>
          ) : (
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-accent">
              <Check className="size-3.5" /> Caso arquivado
            </p>
          )}
        </FilePanel>
      </div>

      {allFound ? (
        <div className="mt-6 space-y-4">
          <Callout tone="info" title="DEBRIEF" text={lab.debrief} />
          <Callout tone="warn" title="AÇÃO SEGURA" text={lab.safeAction} />
          {!archived ? (
            <div className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-4">
              <p className="font-mono text-[10px] tracking-[0.2em] text-accent">
                ETAPA FINAL
              </p>
              <p className="mt-1 text-base font-medium">
                Arquive o caso para concluir
              </p>
              <p className="mt-1 text-sm text-muted">
                Arquivar não é “próximo”. É registrar o que você viu: o dossiê
                fecha, a pista fica, o laboratório entra no progresso. Sem este
                passo o certificado não conta.
              </p>
              <div className="mt-4">
                <Btn onClick={archive}>Arquivar caso</Btn>
              </div>
            </div>
          ) : (
            <p className="flex items-center gap-2 font-mono text-xs text-accent">
              <Check className="size-3.5" /> Caso arquivado — pode seguir
            </p>
          )}
        </div>
      ) : null}

      <LabCaseStrip current={lab.id} />

      <nav className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/lab/$id" params={{ id: prev.id }}>
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              {prev.code}
            </Btn>
          </Link>
        ) : (
          <Link to="/lab">
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              Laboratório
            </Btn>
          </Link>
        )}
        {next ? (
          allFound && !archived ? (
            <Btn onClick={archiveAndGo}>
              Arquivar e ir a {next.code}
              <ArrowRight className="size-4" />
            </Btn>
          ) : (
            <Link to="/lab/$id" params={{ id: next.id }}>
              <Btn>
                {next.code}
                <ArrowRight className="size-4" />
              </Btn>
            </Link>
          )
        ) : (
          <Link to="/desafios">
            <Btn>
              Desafios
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        )}
      </nav>
    </div>
  );
}

export function LabCaseStrip({ current }: { current: string }) {
  return (
    <nav
      aria-label="Casos A a F"
      className="mt-8 flex flex-wrap items-center gap-2"
    >
      <Link
        to="/lab"
        className="inline-flex min-h-11 items-center px-2 font-mono text-[10px] tracking-[0.16em] text-dim hover:text-fg"
      >
        Lab
      </Link>
      {LAB_SEQUENCE.map((item) => {
        const on = item.id === current;
        const letter = item.code.replace("CASO ", "");
        return (
          <Link
            key={item.id}
            to="/lab/$id"
            params={{ id: item.id }}
            aria-current={on ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border font-mono text-xs",
              on
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted hover:border-accent/50 hover:text-fg",
            )}
          >
            {letter}
          </Link>
        );
      })}
    </nav>
  );
}

function Mark({
  id,
  decoy,
  found,
  onFind,
  children,
}: {
  id?: string;
  decoy?: boolean;
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
  children: ReactNode;
}) {
  const isFound = id ? found.includes(id) : false;
  return (
    <button
      type="button"
      onClick={() => onFind(id ?? "decoy", decoy || !id)}
      className={cn(
        "rounded-xs px-0.5 py-0.5 text-left underline decoration-dotted decoration-from-font underline-offset-2 transition-colors duration-150",
        isFound
          ? "bg-danger/15 text-danger decoration-danger"
          : "decoration-dim hover:bg-accent/10 hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

function SmsEvidence({
  found,
  onFind,
}: {
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-sm rounded-xl bg-bg-elevated p-3 shadow-panel">
      <div className="rounded-lg bg-surface-2 px-3 py-2">
        <p className="text-center font-mono text-[10px] tracking-widest text-dim">
          SMS · agora
        </p>
        <div className="mt-3 rounded-md rounded-tl-xs bg-surface px-3 py-3 text-sm leading-relaxed">
          <Mark decoy found={found} onFind={onFind}>
            NUVEMBANK:
          </Mark>{" "}
          <Mark id="isca-acesso" found={found} onFind={onFind}>
            Detectamos um acesso suspeito
          </Mark>
          . Sua conta será{" "}
          <Mark id="urgencia" found={found} onFind={onFind}>
            BLOQUEADA em 10 minutos
          </Mark>
          .{" "}
          <Mark id="confirme" found={found} onFind={onFind}>
            Confirme sua identidade
          </Mark>
          :{" "}
          <Mark id="dominio" found={found} onFind={onFind}>
            nuvembank-seguro.tk/acesso
          </Mark>
        </div>
      </div>
    </div>
  );
}

function EmailEvidence({
  found,
  onFind,
}: {
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
}) {
  return (
    <div className="rounded-lg bg-bg-elevated shadow-panel">
      <div className="space-y-1 border-b border-border px-4 py-3 font-mono text-xs">
        <p>
          <span className="text-dim">De </span>
          <Mark id="remetente" found={found} onFind={onFind}>
            Entrega Rapida {"<entregarapida.notificacao@gmail.com>"}
          </Mark>
        </p>
        <p>
          <span className="text-dim">Assunto </span>
          <Mark id="assunto" found={found} onFind={onFind}>
            Sua encomenda está RETIDA — taxa de R$ 2,90
          </Mark>
        </p>
      </div>
      <div className="space-y-3 px-4 py-4 text-sm leading-relaxed">
        <p>
          Prezado cliente, sua encomenda não pode ser entregue. Pague a{" "}
          <Mark id="taxa" found={found} onFind={onFind}>
            taxa de R$ 2,90
          </Mark>{" "}
          para liberar hoje.
        </p>
        <p>
          Acesse:{" "}
          <Mark id="link-xyz" found={found} onFind={onFind}>
            rastreio-taxa.xyz/liberar
          </Mark>
        </p>
        <p>
          <Mark id="portugues" found={found} onFind={onFind}>
            Caso não pagar em 3 hora a encomenda sera devolvido ao remetente.
          </Mark>
        </p>
        <p className="text-dim">
          <Mark decoy found={found} onFind={onFind}>
            Atenciosamente, Central de Logística
          </Mark>
        </p>
      </div>
    </div>
  );
}

function ChatEvidence({
  found,
  onFind,
}: {
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
}) {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-bg-elevated p-3 shadow-panel">
      <p className="mb-3 text-center font-mono text-[10px] tracking-widest text-dim">
        Conversa · “Chefe — financeiro”
      </p>
      <div className="space-y-2 text-sm leading-relaxed">
        <Bubble>
          Oi, tudo certo? Preciso de um favor rápido.{" "}
          <Mark id="reuniao" found={found} onFind={onFind}>
            Tô em reunião, no mute
          </Mark>
          .
        </Bubble>
        <Bubble>
          Paga um{" "}
          <Mark id="pix" found={found} onFind={onFind}>
            PIX de R$ 1.850
          </Mark>{" "}
          pra esse fornecedor.{" "}
          <Mark id="nao-ligue" found={found} onFind={onFind}>
            Não liga agora
          </Mark>
          .
        </Bubble>
        <Bubble>
          Chave:{" "}
          <Mark id="chave" found={found} onFind={onFind}>
            11988880000 (celular pessoal novo)
          </Mark>
          .{" "}
          <Mark id="tom" found={found} onFind={onFind}>
            Me salva nessa, depois a gente acerta.
          </Mark>
        </Bubble>
      </div>
    </div>
  );
}

function Bubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-md rounded-tl-xs bg-surface px-3 py-2.5">
      {children}
    </div>
  );
}

function PageEvidence({
  found,
  onFind,
}: {
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <MiniBrowser
        url="https://app.banconorte.com.br/login"
        secure
        title="ORIGINAL?"
      >
        <p className="font-medium">Banco Norte</p>
        <label className="mt-3 block text-xs text-muted">Agência e conta</label>
        <div className="mt-1 h-9 rounded-sm bg-surface-2" />
        <label className="mt-2 block text-xs text-muted">Senha</label>
        <div className="mt-1 h-9 rounded-sm bg-surface-2" />
        <div className="mt-3 h-9 rounded-sm bg-accent/80" />
        <p className="mt-3 font-mono text-[10px] text-dim">CNPJ 00.000.000/0001-00</p>
      </MiniBrowser>
      <MiniBrowser
        url={
          <Mark id="url" found={found} onFind={onFind}>
            banco-litoral.secure-login.net
          </Mark>
        }
        secure={false}
        title="ARMADILHA?"
        lock={
          <Mark id="cadeado" found={found} onFind={onFind}>
            <span className="inline-flex items-center gap-1">
              <Unlock className="size-3" /> Não seguro
            </span>
          </Mark>
        }
      >
        <p className="font-medium">Banco Norte</p>
        <p className="mt-1">
          <Mark id="timer" found={found} onFind={onFind}>
            Bloqueio em 00:09:41
          </Mark>
        </p>
        <label className="mt-3 block text-xs text-muted">Agência e conta</label>
        <div className="mt-1 h-9 rounded-sm bg-surface-2" />
        <label className="mt-2 block text-xs text-muted">Senha</label>
        <div className="mt-1 h-9 rounded-sm bg-surface-2" />
        <p className="mt-2">
          <Mark id="campos" found={found} onFind={onFind}>
            Código SMS + validade do cartão
          </Mark>
        </p>
        <div className="mt-1 h-9 rounded-sm bg-surface-2" />
        <p className="mt-3">
          <Mark id="botao" found={found} onFind={onFind}>
            Confirmar agora ou perder acesso
          </Mark>
        </p>
      </MiniBrowser>
    </div>
  );
}

function MiniBrowser({
  url,
  secure,
  title,
  lock,
  children,
}: {
  url: ReactNode;
  secure: boolean;
  title: string;
  lock?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-bg-elevated shadow-panel">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        {lock ??
          (secure ? (
            <Lock className="size-3 text-accent" />
          ) : (
            <Unlock className="size-3 text-danger" />
          ))}
        <p className="min-w-0 truncate font-mono text-[10px] text-muted">{url}</p>
      </div>
      <div className="px-3 py-3">
        <p className="font-mono text-[10px] tracking-widest text-dim">{title}</p>
        <div className="mt-2 text-sm">{children}</div>
      </div>
    </div>
  );
}

function PremioEvidence({
  found,
  onFind,
}: {
  found: string[];
  onFind: (id: string, decoy?: boolean) => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-bg-elevated shadow-panel">
      <div className="border-b border-border px-4 py-3 font-mono text-[10px] text-dim">
        <Mark id="site" found={found} onFind={onFind}>
          mega-premio-resgate.net/iphone
        </Mark>
      </div>
      <div className="space-y-3 px-4 py-4 text-sm leading-relaxed">
        <p className="text-lg font-medium">
          <Mark id="ganhou" found={found} onFind={onFind}>
            Você ganhou um celular — resgate agora
          </Mark>
        </p>
        <p>
          <Mark id="prazo" found={found} onFind={onFind}>
            Oferta expira em 2 horas
          </Mark>
        </p>
        <p>
          Pague só a{" "}
          <Mark id="cartao" found={found} onFind={onFind}>
            taxa de envio com número do cartão completo
          </Mark>
          .
        </p>
        <p className="text-dim">
          <Mark decoy found={found} onFind={onFind}>
            Parabéns, cliente especial.
          </Mark>
        </p>
      </div>
    </div>
  );
}
