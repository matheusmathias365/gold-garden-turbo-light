import { useEffect, useRef, useState } from "react";
import { Download, Lock, Share2 } from "lucide-react";
import {
  certSerial,
  downloadCertificate,
  renderCertificatePng,
  shareCertificate,
} from "@/lib/certificate";
import { Btn } from "@/components/ui";
import { cn } from "@/lib/utils";
import { sanitizeCallsign } from "@/lib/safe";

export function AgentCertificate({
  callsign,
  ready,
  remaining,
  issuedAt,
  onIssue,
  series = "001",
  caseCode,
  blurb,
}: {
  callsign: string;
  ready: boolean;
  remaining: number;
  issuedAt: string | null;
  onIssue: () => void;
  series?: string;
  caseCode?: string;
  blurb?: string;
}) {
  const name = sanitizeCallsign(callsign) || "AGENTE";
  const issued = issuedAt ?? new Date().toISOString();
  const serial = certSerial(name, series);
  const payload = {
    callsign: name,
    issuedAt: issued,
    serial,
    caseCode,
    blurb,
  };
  const [busy, setBusy] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const blobRef = useRef<Blob | null>(null);

  useEffect(() => {
    if (ready) onIssue();
  }, [ready, onIssue]);

  useEffect(() => {
    try {
      const file = new File(["x"], "x.png", { type: "image/png" });
      setCanShare(Boolean(navigator.canShare?.({ files: [file] })));
    } catch {
      setCanShare(false);
    }
  }, []);

  useEffect(() => {
    let dead = false;
    let url = "";
    blobRef.current = null;
    setPreview(null);
    void renderCertificatePng(payload).then((blob) => {
      if (dead) return;
      blobRef.current = blob;
      url = URL.createObjectURL(blob);
      setPreview(url);
    });
    return () => {
      dead = true;
      if (url) URL.revokeObjectURL(url);
    };
    // payload fields, not the object
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, issued, serial, caseCode, blurb]);

  async function save() {
    setBusy(true);
    try {
      await downloadCertificate(payload, blobRef.current ?? undefined);
    } finally {
      setBusy(false);
    }
  }

  async function share() {
    setBusy(true);
    try {
      await shareCertificate(payload, blobRef.current ?? undefined);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        className={cn(
          "relative mx-auto max-w-[420px] overflow-hidden rounded-lg border bg-bg-elevated shadow-panel",
          ready ? "border-accent/50" : "border-border",
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt={`Certificado de ${name}`}
            className="block w-full"
          />
        ) : (
          <div className="flex aspect-[9/16] items-center justify-center font-mono text-xs tracking-[0.2em] text-dim">
            MONTANDO DIPLOMA…
          </div>
        )}
        {!ready ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/80 px-6 text-center backdrop-blur-[2px]">
            <Lock className="size-6 text-accent" strokeWidth={1.75} />
            <p className="mt-3 font-display text-xl font-semibold">
              Certificado bloqueado
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              O nome <span className="text-fg">{name}</span> já está na ficha.
              Faltam {remaining} arquivo{remaining === 1 ? "" : "s"} para emitir.
            </p>
          </div>
        ) : null}
      </div>

      {ready ? (
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Btn onClick={() => void save()} disabled={busy || !preview}>
            <Download className="size-4" />
            Baixar para o Stories
          </Btn>
          {canShare ? (
            <Btn
              variant="ghost"
              onClick={() => void share()}
              disabled={busy || !preview}
            >
              <Share2 className="size-4" />
              Compartilhar
            </Btn>
          ) : null}
        </div>
      ) : null}
      {ready ? (
        <p className="mt-3 text-center text-xs text-muted">
          A imagem da tela é a mesma do arquivo. Formato 9:16 — cola no Stories.
        </p>
      ) : null}
    </div>
  );
}
