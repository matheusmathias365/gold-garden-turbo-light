import { Link } from "@tanstack/react-router";
import { Lock, RotateCcw } from "lucide-react";
import { ALL_IDS, PLANTAO_ID, QR_CASE_ID, VOZ_CASE_ID, countDone } from "@/lib/ids";
import { useProgress } from "@/lib/progress";
import { Btn, Rail } from "@/components/ui";
import { LegalNotice } from "@/components/legal-notice";
import { CrtFrame, Ticker, AppHeader } from "@/components/shell";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Hq() {
  const completed = useProgress((s) => s.completed);
  const callsign = useProgress((s) => s.callsign);
  const reset = useProgress((s) => s.reset);
  const [confirmReset, setConfirmReset] = useState(false);

  const dossie = countDone(completed, ALL_IDS);
  const plantao = completed.includes(PLANTAO_ID);
  const qr = completed.includes(QR_CASE_ID);
  const voz = completed.includes(VOZ_CASE_ID);

  return (
    <CrtFrame>
      <Ticker />
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          QUARTEL-GENERAL · AGENTE {callsign || "—"}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Arquivos da operação
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          Cada dossiê treina um vetor. Escolha o arquivo. Reconhecer a
          armadilha — nunca montá-la. Material educacional.
        </p>

        <div className="mt-6">
          <LegalNotice />
        </div>

        <ul className="mt-8 space-y-4">
          <FileCard
            to="/dossie"
            code="CASO #001"
            series="OP-001"
            title="Operação Phishing"
            lead="Treina o olho."
            body="SMS, e-mail, PIX do “chefe”, página gêmea, prêmio. Briefing, laboratório A–F, desafios e o protocolo se você já clicou."
            done={dossie}
            max={ALL_IDS.length}
            open
          />
          <FileCard
            to="/plantao"
            code="CASO #002"
            series="OP-002"
            title="Plantão SOC"
            lead="Treina a pressa."
            body="Turno de 90 segundos. Fila de 8 recados — WhatsApp, SMS, e-mail, notificação. Arquivar como golpe, canal oficial ou ignorar. Cada plantão embaralha."
            done={plantao ? 1 : 0}
            max={1}
            open
          />
          <FileCard
            to="/qr"
            code="CASO #003"
            series="OP-003"
            title="O QR"
            lead="O código mente."
            body="Cardápio, pedágio, PIX da mesa. Toque no QR, leia o destino, compare com o carimbo. Não pague nesta tela."
            done={qr ? 1 : 0}
            max={1}
            open
          />
          <FileCard
            to="/voz"
            code="CASO #004"
            series="OP-004"
            title="A voz"
            lead="O canal, não o texto."
            body="Áudio curto. A voz pode parecer a da chefe, do pai, do banco. Deepfake cobre o timbre — não o ramal. Ligar no número oficial. Nunca transferir no susto."
            done={voz ? 1 : 0}
            max={1}
            open
          />
        </ul>

        <p className="mt-8 font-mono text-[10px] tracking-widest text-dim">
          4 dossiês abertos
        </p>

        <div className="mt-6">
          {confirmReset ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted">Zerar progresso deste dispositivo?</p>
              <Btn variant="danger" onClick={() => reset()}>
                Confirmar
              </Btn>
              <Btn variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancelar
              </Btn>
            </div>
          ) : (
            <Btn variant="dim" onClick={() => setConfirmReset(true)}>
              <RotateCcw className="size-3.5" strokeWidth={1.75} />
              Reiniciar operação
            </Btn>
          )}
        </div>
      </main>
    </CrtFrame>
  );
}

function FileCard({
  to,
  code,
  series,
  title,
  lead,
  body,
  done,
  max,
  open,
  sealed,
}: {
  to?: "/dossie" | "/plantao" | "/qr" | "/voz";
  code: string;
  series: string;
  title: string;
  lead: string;
  body: string;
  done?: number;
  max?: number;
  open?: boolean;
  sealed?: boolean;
}) {
  const inner = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={cn("font-mono text-[10px] tracking-[0.2em]", sealed ? "text-dim" : "text-accent")}>
          {code} · {series}
        </p>
        {sealed ? (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] text-dim">
            <Lock className="size-3" /> EM BREVE
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-[0.16em] text-accent">
            ABERTO
          </span>
        )}
      </div>
      <h2 className={cn("mt-3 font-display text-2xl font-semibold tracking-tight", sealed && "text-muted")}>
        {title}
      </h2>
      <p className="mt-1 text-sm font-medium text-fg">{lead}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      {open && max != null && done != null ? (
        <div className="mt-4">
          <Rail value={done} max={max} />
          <p className="mt-2 font-mono text-xs tabular-nums text-dim">
            {done}/{max}
          </p>
        </div>
      ) : null}
    </>
  );

  if (to && !sealed) {
    return (
      <li>
        <Link
          to={to}
          className="block rounded-lg border border-border bg-surface p-5 shadow-panel transition-colors duration-150 hover:border-accent/40 hover:bg-surface-2"
        >
          {inner}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div className="rounded-lg border border-border/70 bg-bg-elevated p-5 opacity-75">
        {inner}
      </div>
    </li>
  );
}
