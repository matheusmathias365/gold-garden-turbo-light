import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { AgentCertificate } from "@/components/certificate";
import { Btn, Callout } from "@/components/ui";
import {
  VOZ_ACTION_LABEL,
  VOZ_CASE_ID,
  VOZ_SCENES,
  VOZ_SCENE_IDS,
  VOZ_SECONDS,
  adjacentVoz,
  judgeVoz,
  vozById,
  type VozAction,
  type VozScene,
} from "@/lib/voz-caso";
import { useProgress } from "@/lib/progress";
import { assetUrl, cn } from "@/lib/utils";

export function VozCase({ sceneId }: { sceneId?: string }) {
  const scene = sceneId ? vozById(sceneId) : null;
  if (!scene) return <VozIndex />;
  return <VozSceneView key={scene.id} scene={scene} />;
}

function VozIndex() {
  const completed = useProgress((s) => s.completed);
  const done = VOZ_SCENE_IDS.filter((id) => completed.includes(id)).length;
  const closed = completed.includes(VOZ_CASE_ID);
  const callsign = useProgress((s) => s.callsign);
  const vozAt = useProgress((s) => s.vozAt);
  const issueVoz = useProgress((s) => s.issueVoz);

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
        CASO #004 · A VOZ
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        O canal, não o texto
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Áudio de 12 segundos. A voz pode parecer alguém que você conhece.
        Deepfake cobre o timbre — não cobre o ramal. Ouça, olhe de onde veio,
        escolha o canal. Este treino não ensina a clonar voz.
      </p>
      <p className="mt-2 font-mono text-xs text-dim">
        {done}/{VOZ_SCENE_IDS.length} cenas
      </p>
      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg bg-surface shadow-panel">
        {VOZ_SCENES.map((s) => {
          const ok = completed.includes(s.id);
          return (
            <li key={s.id}>
              <Link
                to="/voz/$id"
                params={{ id: s.id }}
                className="flex min-h-14 items-center gap-3 px-4 py-3 hover:bg-surface-2"
              >
                <span className="w-16 font-mono text-[10px] tracking-widest text-dim">
                  {s.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{s.title}</p>
                  <p className="truncate text-sm text-muted">{s.from}</p>
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
          <AgentCertificate
            callsign={callsign}
            ready
            remaining={0}
            issuedAt={vozAt}
            onIssue={issueVoz}
            series="004"
            caseCode="CASO #004  ·  A VOZ"
            blurb="Por concluir o treino educacional do Caso #004 — a pista está no canal, não no timbre. Não clonar. Não transferir no susto."
          />
        </div>
      ) : (
        <p className="mt-6 text-sm text-muted">
          Arquive as cinco cenas para emitir o OP-004.
        </p>
      )}
    </div>
  );
}

function VozSceneView({ scene }: { scene: VozScene }) {
  const completed = useProgress((s) => s.completed);
  const markComplete = useProgress((s) => s.markComplete);
  const setScore = useProgress((s) => s.setScore);
  const issueVoz = useProgress((s) => s.issueVoz);
  const { prev, next } = adjacentVoz(scene.id);
  const [heard, setHeard] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [left, setLeft] = useState(VOZ_SECONDS);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [activeId, setActiveId] = useState(scene.id);
  const archived = completed.includes(scene.id);
  const tickRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasFile, setHasFile] = useState(true);

  if (activeId !== scene.id) {
    setActiveId(scene.id);
    setHeard(false);
    setPlaying(false);
    setLeft(VOZ_SECONDS);
    setStatus("idle");
  }

  useEffect(() => {
    setHeard(false);
    setPlaying(false);
    setLeft(VOZ_SECONDS);
    setStatus("idle");
    setHasFile(true);
    window.speechSynthesis?.cancel();
    const el = audioRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    return () => {
      window.speechSynthesis?.cancel();
      audioRef.current?.pause();
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, [scene.id]);

  function stopTick() {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }

  function speakFallback() {
    window.speechSynthesis?.cancel();
    try {
      const u = new SpeechSynthesisUtterance(scene.line);
      u.lang = "pt-BR";
      u.rate = 0.92;
      window.speechSynthesis?.speak(u);
    } catch {
      /* caption after the 12s */
    }
  }

  function play() {
    if (playing) return;
    stopTick();
    window.speechSynthesis?.cancel();
    const el = audioRef.current;
    const startClock = (secs: number) => {
      setPlaying(true);
      setLeft(secs);
      tickRef.current = window.setInterval(() => {
        setLeft((n) => {
          if (n <= 1) {
            stopTick();
            setPlaying(false);
            setHeard(true);
            window.speechSynthesis?.cancel();
            audioRef.current?.pause();
            return 0;
          }
          return n - 1;
        });
      }, 1000);
    };
    if (hasFile && el) {
      el.currentTime = 0;
      void el
        .play()
        .then(() => {
          const d = Number.isFinite(el.duration)
            ? Math.max(1, Math.ceil(el.duration))
            : VOZ_SECONDS;
          startClock(d);
        })
        .catch(() => {
          setHasFile(false);
          speakFallback();
          startClock(VOZ_SECONDS);
        });
    } else {
      speakFallback();
      startClock(VOZ_SECONDS);
    }
  }

  function choose(action: VozAction) {
    if (!heard || status === "ok") return;
    const j = judgeVoz(scene, action);
    if (j.ok) {
      setStatus("ok");
      markComplete(scene.id);
      setScore(scene.id, 1, 1);
      const all = VOZ_SCENE_IDS.every(
        (id) => id === scene.id || completed.includes(id),
      );
      if (all) {
        markComplete(VOZ_CASE_ID);
        issueVoz();
      }
    } else {
      setStatus("bad");
    }
  }

  return (
    <div>
      <Link
        to="/voz"
        className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-dim hover:text-fg"
      >
        <ArrowLeft className="size-3.5" />
        Caso #004 · cenas
      </Link>
      <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-accent">
        {scene.code} · {scene.channel}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        {scene.title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {scene.briefing}
      </p>

      <div className="mt-6 rounded-lg border border-border bg-surface p-5 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-medium">{scene.from}</p>
            <p className="font-mono text-[10px] tracking-[0.16em] text-dim">
              ÁUDIO · {scene.duration}
            </p>
          </div>
          <p className="font-mono text-lg tabular-nums text-accent">
            0:{String(playing ? left : heard ? 0 : VOZ_SECONDS).padStart(2, "0")}
          </p>
        </div>
        <div
          className={cn("voice-wave mt-5 h-12", playing && "is-playing")}
          aria-hidden
        />
        <div className="mt-4">
          <audio
            ref={audioRef}
            preload="auto"
            className="hidden"
            onEnded={() => {
              stopTick();
              setPlaying(false);
              setHeard(true);
              setLeft(0);
            }}
            onError={() => setHasFile(false)}
          >
            {scene.files.map((src) => (
              <source
                key={src}
                src={assetUrl(src)}
                type={src.endsWith(".wav") ? "audio/wav" : "audio/mpeg"}
              />
            ))}
          </audio>
          <Btn onClick={play} disabled={playing}>
            {heard ? "Ouvir de novo" : playing ? "Ouvindo…" : "Ouvir o áudio"}
          </Btn>
        </div>
        {heard ? (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Legenda (acessibilidade): “{scene.line}”
          </p>
        ) : (
          <p className="mt-4 font-mono text-xs text-dim">
            Sem ouvir não tem veredito. A pista está no canal, não na frase.
          </p>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        {(Object.keys(VOZ_ACTION_LABEL) as VozAction[]).map((a) => (
          <Btn
            key={a}
            variant={a === "pagar" ? "danger" : a === "encerrar" ? "ghost" : "primary"}
            disabled={!heard || status === "ok"}
            onClick={() => choose(a)}
            className="w-full"
          >
            {VOZ_ACTION_LABEL[a]}
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
          Transferir ou passar código nunca é o passo deste treino. Olhe o canal.
        </p>
      ) : null}
      {archived && status !== "ok" ? (
        <p className="mt-3 font-mono text-xs text-accent">Cena já arquivada.</p>
      ) : null}

      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/voz/$id" params={{ id: prev.id }}>
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              {prev.code}
            </Btn>
          </Link>
        ) : (
          <Link to="/voz">
            <Btn variant="ghost">
              <ArrowLeft className="size-4" />
              Cenas
            </Btn>
          </Link>
        )}
        {next ? (
          <Link to="/voz/$id" params={{ id: next.id }}>
            <Btn>
              {next.code}
              <ArrowRight className="size-4" />
            </Btn>
          </Link>
        ) : (
          <Link to="/voz">
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
