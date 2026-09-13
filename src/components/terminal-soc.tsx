import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TERMINAL_ID } from "@/lib/ids";
import { EMPTY_CLUES, useProgress } from "@/lib/progress";
import { LabCaseStrip } from "@/components/lab-stage";
import { Btn, Callout, FilePanel } from "@/components/ui";
import { adjacentLab } from "@/lib/lab-data";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "ok" | "bad"; text: string };

const HELP = [
  "Não precisa saber programar. Toque nos 5 passos acima.",
  "",
  "help                 esta lista",
  "ls                   arquivos do caso",
  "cat msg-07.eml       lê o e-mail",
  "headers              testa se o remetente é falso",
  "whois banco-n0rte.com   idade do domínio",
  "trace                para onde o link aponta",
  "compare              site oficial × suspeito",
  "clues                pistas já extraídas",
  "verdict phishing     fecha o caso",
  "hint                 próxima dica",
  "clear                limpa a tela",
].join("\n");

const CLUE_LABEL: Record<string, string> = {
  "urgencia-body": "Urgência e pedido de senha",
  "headers-fail": "E-mail não autenticado",
  "domain-age": "Domínio recém-criado",
  lookalike: "Zero no lugar da letra O",
};

const STEPS = [
  {
    n: "1",
    cmd: "cat msg-07.eml",
    title: "Ler o e-mail",
    body: "Abre a mensagem. Olhe o medo, o relógio e o que pedem.",
  },
  {
    n: "2",
    cmd: "headers",
    title: "Checar o remetente",
    body: "Teste de autenticidade. Se falhar, o banco não mandou isso.",
  },
  {
    n: "3",
    cmd: "whois banco-n0rte.com",
    title: "Ver o domínio",
    body: "Site de banco de verdade não nasce em 2 dias.",
  },
  {
    n: "4",
    cmd: "compare",
    title: "Comparar os sites",
    body: "Oficial: banco-norte. Falso: banco-n0rte (zero no O).",
  },
  {
    n: "5",
    cmd: "verdict phishing",
    title: "Fechar o caso",
    body: "Depois de 3 pistas, emite o veredito. Não use o link.",
  },
];

export function TerminalSoc() {
  const found = useProgress((s) => s.clues[TERMINAL_ID] ?? EMPTY_CLUES);
  const addClue = useProgress((s) => s.addClue);
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const completed = useProgress((s) => s.completed);
  const archived = completed.includes(TERMINAL_ID);
  const { prev } = adjacentLab(TERMINAL_ID);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [lines, setLines] = useState<Line[]>([
    { kind: "ok", text: "SOC sandbox — só leitura. Nada vai para a internet." },
    {
      kind: "out",
      text: "Toque no passo 1 abaixo. Ou digite help se preferir comandos.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function push(extra: Line[]) {
    setLines((cur) => [...cur, ...extra]);
  }

  function clue(id: string) {
    addClue(TERMINAL_ID, id);
  }

  function nextHint(have: string[]) {
    if (!have.includes("urgencia-body")) {
      return "Comece no passo 1 — “Ler o e-mail”. É só abrir a mensagem.";
    }
    if (!have.includes("headers-fail")) {
      return "Passo 2 — “Checar o remetente”. Vamos ver se o banco realmente enviou.";
    }
    if (!have.includes("domain-age")) {
      return "Passo 3 — “Ver o domínio”. Banco de verdade não registra site ontem.";
    }
    if (!have.includes("lookalike")) {
      return "Passo 4 — “Comparar os sites”. Tem um zero no lugar da letra O.";
    }
    return "Você já tem pistas. Passo 5 — “Fechar o caso”: verdict phishing.";
  }

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setHist((h) => [...h, cmd]);
    setHIdx(-1);
    const parts = cmd.split(/\s+/);
    const c = (parts[0] ?? "").toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();
    const out: Line[] = [{ kind: "in", text: `root@soc:/caso-001# ${cmd}` }];

    if (c === "help") {
      out.push({ kind: "out", text: HELP });
    } else if (c === "clear") {
      setLines([]);
      setInput("");
      return;
    } else if (c === "ls") {
      out.push({
        kind: "out",
        text: "msg-07.eml     ← o e-mail\nlink-alvo.txt  ← para onde o botão aponta\nregistro.log   ← idade do domínio",
      });
    } else if (c === "cat") {
      if (arg.includes("msg")) {
        out.push({
          kind: "out",
          text: [
            "De: Banco Norte Segurança <alerta@banco-n0rte.com>",
            "Para: voce@email.com",
            "Assunto: URGENTE — Conta bloqueada em 10 minutos",
            "",
            "Detectamos acesso em outro estado. Clique e informe senha + SMS:",
            "https://banco-n0rte.tk/login",
            "",
            "Leitura: medo + relógio + pedido de senha. Isso já é isca.",
          ].join("\n"),
        });
        clue("urgencia-body");
      } else if (arg.includes("link")) {
        out.push({
          kind: "out",
          text: "o botão mostra: banco-norte.com.br/seguranca\no destino real: http://banco-n0rte.tk/login\n(o zero no “n0rte” entrega a imitação)",
        });
        clue("lookalike");
      } else if (arg.includes("registro")) {
        out.push({
          kind: "out",
          text: "banco-n0rte.com — criado há 2 dias — dono oculto",
        });
        clue("domain-age");
      } else {
        out.push({
          kind: "bad",
          text: "arquivo não encontrado. toque no passo 1 ou digite: cat msg-07.eml",
        });
      }
    } else if (c === "headers") {
      out.push({
        kind: "out",
        text: [
          "Return-Path: bounce@mailer-xyz.tk",
          "From: alerta@banco-n0rte.com",
          "Reply-To: suporte@mailer-xyz.tk",
          "SPF: fail   ← o servidor não é do banco",
          "DKIM: fail  ← a assinatura não confere",
          "",
          "Tradução: este e-mail não saiu do Banco Norte.",
        ].join("\n"),
      });
      clue("headers-fail");
    } else if (c === "whois") {
      if (arg.includes("n0rte") || arg.includes("n0rte.tk") || arg === "") {
        out.push({
          kind: "out",
          text: "banco-n0rte.com · criado há 2 dias · registrante oculto\nSite de banco real tem anos. Dois dias = bandeira vermelha.",
        });
        clue("domain-age");
      } else if (arg.includes("norte")) {
        out.push({
          kind: "out",
          text: "banco-norte.com.br · registro antigo · DNS oficial da instituição",
        });
      } else {
        out.push({
          kind: "out",
          text: "domínio fora do dossiê. toque no passo 3.",
        });
      }
    } else if (c === "trace") {
      out.push({
        kind: "out",
        text: "destino real: http://banco-n0rte.tk/login\no “o” de norte virou o número 0. Imitação visual.",
      });
      clue("lookalike");
    } else if (c === "compare") {
      out.push({
        kind: "out",
        text: "oficial:  banco-norte.com.br\nsuspeito: banco-n0rte.com   ← 1 caractere (0 no lugar de o)\nNa vida real: abra o app do banco. Não use este link.",
      });
      clue("lookalike");
    } else if (c === "clues") {
      const names = found.map((id) => CLUE_LABEL[id] ?? id);
      out.push({
        kind: "out",
        text:
          names.length === 0
            ? "nenhuma pista ainda. toque no passo 1."
            : `pistas: ${names.join(" · ")}`,
      });
    } else if (c === "hint") {
      out.push({ kind: "out", text: nextHint(found) });
    } else if (c === "verdict") {
      if (arg === "phishing") {
        if (found.length < 3) {
          out.push({
            kind: "bad",
            text: `ainda faltam pistas (${found.length}/3). siga os passos 1 a 4.`,
          });
        } else {
          out.push({
            kind: "ok",
            text: "VEREDITO ACEITO. E-mail falso imitando banco. Na vida real: não clicar, abrir o app oficial, ignorar o recado.",
          });
          markComplete(TERMINAL_ID);
          setScore(TERMINAL_ID, found.length, 4);
        }
      } else if (arg === "legitimo" || arg === "legítimo") {
        out.push({
          kind: "bad",
          text: "veredito rejeitado. o domínio tem um zero e o e-mail falhou no teste. não é o banco.",
        });
      } else {
        out.push({
          kind: "bad",
          text: "toque no passo 5 ou digite: verdict phishing",
        });
      }
    } else {
      out.push({
        kind: "bad",
        text: `comando não reconhecido. toque num passo abaixo ou digite help.`,
      });
    }

    push(out);
    setInput("");
  }

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
        CASO F · TERMINAL SOC
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        E-mail do “banco”
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Chegou um aviso de conta bloqueada. Você não precisa saber comando nem
        programar: toque nos 5 passos, leia o que aparece e feche o caso. Tudo
        é simulado — nada sai da tela.
      </p>

      <FilePanel
        code="ROTEIRO PARA LEIGO"
        title="Como resolver este caso"
        className="mt-6"
      >
        <ol className="space-y-2">
          {STEPS.map((step) => (
            <li key={step.n}>
              <button
                type="button"
                onClick={() => run(step.cmd)}
                className="flex min-h-14 w-full items-start gap-3 rounded-md border border-border bg-bg px-3 py-3 text-left hover:border-accent/50"
              >
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-xs border border-accent/40 font-mono text-xs text-accent">
                  {step.n}
                </span>
                <span>
                  <span className="block font-medium text-fg">{step.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {step.body}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted">
          Objetivo: achar 3 pistas e tocar no passo 5. Se travar, toque em
          Dica.
        </p>
        <div className="mt-3">
          <Btn variant="ghost" onClick={() => run("hint")}>
            Dica
          </Btn>
        </div>
      </FilePanel>

      <div
        className="mt-6 overflow-hidden rounded-lg bg-bg-elevated shadow-panel"
        onClick={() => fieldRef.current?.focus()}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] tracking-widest text-dim">
          <span>leitura do caso</span>
          <span className="text-accent">sandbox</span>
        </div>
        <div className="max-h-[420px] overflow-y-auto px-3 py-3 font-mono text-xs leading-relaxed">
          {lines.map((line, i) => (
            <pre
              key={i}
              className={
                line.kind === "in"
                  ? "mt-2 whitespace-pre-wrap text-accent"
                  : line.kind === "ok"
                    ? "whitespace-pre-wrap text-accent"
                    : line.kind === "bad"
                      ? "whitespace-pre-wrap text-danger"
                      : "whitespace-pre-wrap text-muted"
              }
            >
              {line.text}
            </pre>
          ))}
          <div ref={endRef} />
        </div>
        <form
          className="flex items-center gap-2 border-t border-border px-3 py-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
        >
          <span className="font-mono text-xs text-accent">›</span>
          <input
            ref={fieldRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                if (hist.length) {
                  const ni = Math.min(hist.length - 1, hIdx + 1);
                  setHIdx(ni);
                  setInput(hist[hist.length - 1 - ni] ?? "");
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const ni = hIdx - 1;
                if (ni < 0) {
                  setHIdx(-1);
                  setInput("");
                } else {
                  setHIdx(ni);
                  setInput(hist[hist.length - 1 - ni] ?? "");
                }
              }
            }}
            className="h-11 min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none"
            placeholder="ou toque num passo acima"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Comando do terminal"
          />
        </form>
      </div>

      <ul className="mt-4 space-y-1.5">
        {Object.entries(CLUE_LABEL).map(([id, label]) => (
          <li
            key={id}
            className={cn(
              "font-mono text-xs",
              found.includes(id) ? "text-accent" : "text-dim",
            )}
          >
            {found.includes(id) ? "●" : "○"} {label}
          </li>
        ))}
      </ul>

      {archived ? (
        <div className="mt-6 space-y-3">
          <Callout
            tone="info"
            title="O QUE FAZER NA VIDA REAL"
            text="Não clique no link. Abra o aplicativo do banco que você já usa e veja se existe o aviso. Se não existir, ignore a mensagem. Nunca informe senha nem o código do SMS."
          />
        </div>
      ) : null}

      <LabCaseStrip current="soc" />

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
        <Link to="/desafios">
          <Btn>
            Desafios
            <ArrowRight className="size-4" />
          </Btn>
        </Link>
      </nav>
    </div>
  );
}
