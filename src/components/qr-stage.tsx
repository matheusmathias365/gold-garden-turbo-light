import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import QRCode from "qrcode";
import { AgentCertificate } from "@/components/certificate";
import { MedalAward } from "@/components/medal";
import { Btn, Callout } from "@/components/ui";
import {
  QR_ACTION_LABEL,
  QR_CASE_ID,
  QR_SCENES,
  QR_SCENE_IDS,
  adjacentQr,
  judgeQr,
  qrById,
  qrPayload,
  type QrAction,
  type QrScene,
} from "@/lib/qr-caso";
import { useProgress } from "@/lib/progress";

export function QrCase({ sceneId }: { sceneId?: string }) {
  const scene = sceneId ? qrById(sceneId) : null;
  if (!scene) return <QrIndex />;
  return <QrSceneView key={scene.id} scene={scene} />;
}

function QrIndex() {
  const completed = useProgress((s) => s.completed);
  const done = QR_SCENE_IDS.filter((id) => completed.includes(id)).length;
  const closed = completed.includes(QR_CASE_ID);
  const callsign = useProgress((s) => s.callsign);
  const qrAt = useProgress((s) => s.qrAt);
  const issueQr = useProgress((s) => s.issueQr);

  return (
    <div>
      <Link
        to="/jogar"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Quartel · arquivos
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-accent">
        CASO #003 · O QR
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        O código mente
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Cardápio, pedágio, PIX da mesa. Toque no QR — ele aparece de verdade.
        Se escanear com o celular, só lê um aviso de treino. Não aponta para
        golpe. Compare destino × carimbo. Não pague nesta tela.
      </p>
      <p className="mt-2 font-mono text-xs text-dim">
        {done}/{QR_SCENE_IDS.length} cenas
      </p>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {QR_SCENES.map((s) => {
          const ok = completed.includes(s.id);
          return (
            <li key={s.id}>
              <Link
                to="/qr/$id"
                params={{ id: s.id }}
                className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
              >
                <span className="w-16 font-mono text-[10px] tracking-widest text-dim">
                  {s.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{s.title}</p>
                  <p className="truncate text-sm text-muted">{s.place}</p>
                </div>
                {ok ? (
                  <Check className="size-4 text-accent" />
                ) : (
                  <ArrowRight className="size-4 text-dim" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      {closed ? (
        <div className="mt-10">
          <MedalAward id="003" />
          <AgentCertificate
            callsign={callsign}
            ready
            remaining={0}
            issuedAt={qrAt}
            onIssue={issueQr}
            series="003"
            caseCode="CASO #003  ·  O QR"
            blurb="Por concluir o treino educacional do Caso #003 — ler o destino do QR, comparar com o carimbo, não pagar o código da tela."
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Arquive as cinco cenas para emitir o OP-003.
        </p>
      )}
    </div>
  );
}

function QrSceneView({ scene }: { scene: QrScene }) {
  const completed = useProgress((s) => s.completed);
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const issueQr = useProgress((s) => s.issueQr);
  const { prev, next } = adjacentQr(scene.id);
  const [read, setRead] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [activeId, setActiveId] = useState(scene.id);
  const archived = completed.includes(scene.id);

  if (activeId !== scene.id) {
    setActiveId(scene.id);
    setRead(false);
    setStatus("idle");
  }

  useEffect(() => {
    setRead(false);
    setStatus("idle");
  }, [scene.id]);

  function choose(action: QrAction) {
    if (!read || status === "ok") return;
    const j = judgeQr(scene, action);
    if (j.ok) {
      setStatus("ok");
      markComplete(scene.id);
      setScore(scene.id, 1, 1);
      const all = QR_SCENE_IDS.every(
        (id) => id === scene.id || completed.includes(id),
      );
      if (all) {
        markComplete(QR_CASE_ID);
        issueQr();
      }
    } else {
      setStatus("bad");
    }
  }

  return (
    <div>
      <Link
        to="/qr"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Caso #003 · cenas
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-accent">
        {scene.code} · {scene.place}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {scene.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {scene.briefing}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <button
          type="button"
          onClick={() => setRead(true)}
          className="mx-auto w-full max-w-xs rounded-lg border border-border bg-[#e8f0ea] p-5 text-left shadow-panel"
        >
          <p className="text-center font-mono text-[10px] tracking-[0.18em] text-[#3a4a40]">
            {scene.place}
          </p>
          <p className="mt-1 text-center text-[11px] leading-snug text-[#1c2c24]">
            {scene.stamp}
          </p>
          <SimQr scene={scene} scanning={read} />
          <p className="mt-3 text-center font-mono text-[10px] text-[#3a4a40]">
            {read ? "lido pelo treino" : "toque para escanear"}
          </p>
        </button>

        <div>
          <p className="text-sm text-muted">{scene.stamp}</p>
          {read ? (
            <div className="mt-4 rounded-md border border-danger/40 bg-danger/10 px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-danger">
                LEITOR · DESTINO
              </p>
              <p className="mt-2 break-all font-mono text-sm text-fg">
                {scene.dest}
              </p>
              <p className="mt-2 text-sm text-muted">
                {scene.same
                  ? "Bate com o carimbo. Ainda assim: canal oficial."
                  : "Não bate com o carimbo."}
              </p>
            </div>
          ) : (
            <p className="mt-4 font-mono text-xs text-dim">
              Sem leitura não tem veredito.
            </p>
          )}

          <div className="mt-5 grid gap-3">
            {(Object.keys(QR_ACTION_LABEL) as QrAction[]).map((a) => (
              <Btn
                key={a}
                variant={a === "pagar" ? "danger" : a === "recusar" ? "ghost" : "primary"}
                disabled={!read || status === "ok"}
                onClick={() => choose(a)}
                className="w-full"
              >
                {QR_ACTION_LABEL[a]}
              </Btn>
            ))}
          </div>
          {status === "ok" ? (
            <div className="mt-4">
              <Callout tone="info" title="DEBRIEF" text={scene.debrief} />
            </div>
          ) : null}
          {status === "bad" ? (
            <p className="mt-3 font-mono text-xs text-danger">
              {status === "bad" && "Revise destino × carimbo. Pagar neste QR nunca é o passo deste treino."}
            </p>
          ) : null}
          {archived && status !== "ok" ? (
            <p className="mt-3 font-mono text-xs text-accent">Cena já arquivada.</p>
          ) : null}
        </div>
      </div>

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/qr/$id" params={{ id: prev.id }}>
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              {prev.code}
            </Btn>
          </Link>
        ) : (
          <Link to="/qr">
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              Cenas
            </Btn>
          </Link>
        )}
        {next ? (
          <Link to="/qr/$id" params={{ id: next.id }}>
            <Btn>
              {next.code}
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        ) : (
          <Link to="/qr">
            <Btn>
              Encerrar caso
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        )}
      </nav>
    </div>
  );
}

function SimQr({ scene, scanning }: { scene: QrScene; scanning: boolean }) {
  const [src, setSrc] = useState<string | null>(null);
  useEffect(() => {
    let dead = false;
    void QRCode.toDataURL(qrPayload(scene), {
      width: 480,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#07140c", light: "#e8f0ea" },
    }).then((url) => {
      if (!dead) setSrc(url);
    });
    return () => {
      dead = true;
    };
  }, [scene]);

  return (
    <div className="relative mx-auto mt-4 aspect-square w-full max-w-[220px] overflow-hidden rounded-sm bg-[#e8f0ea]">
      {src ? (
        <img
          src={src}
          alt={`QR de treino da cena ${scene.title}. Se escanear, só aparece aviso educacional.`}
          className="h-full w-full"
        />
      ) : (
        <div className="h-full w-full bg-[#d5e0d8]" />
      )}
      {scanning ? (
        <span className="qr-scan pointer-events-none absolute inset-x-3 h-0.5 bg-danger" />
      ) : null}
    </div>
  );
}
