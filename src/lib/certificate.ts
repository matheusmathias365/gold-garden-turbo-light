import { safeFilePart, sanitizeCallsign } from "@/lib/safe";

export function certSerial(callsign: string, series = "001") {
  const key = sanitizeCallsign(callsign) || "AGENTE";
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const hex = (h >>> 0).toString(16).toUpperCase().padStart(8, "0").slice(0, 6);
  return `OP-${series}-${hex}`;
}

export function formatIssued(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

export const CERT_LEGAL =
  "Qualquer tentativa ou ataque baseado neste jogo é crime. A responsabilidade é de quem pratica — Código Penal, art. 171, § 2º-A (Lei nº 14.155/2021) e art. 154-A (Lei nº 12.737/2012).";

export type CertDraw = {
  callsign: string;
  issuedAt: string;
  serial: string;
  caseCode?: string;
  blurb?: string;
};

async function loadSideArt(): Promise<HTMLImageElement | null> {
  return await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = "/cert-side.jpg";
  });
}

function fitName(
  ctx: CanvasRenderingContext2D,
  name: string,
  maxWidth: number,
  maxSize: number,
) {
  let size = maxSize;
  ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
  while (size > 28 && ctx.measureText(name).width > maxWidth) {
    size -= 2;
    ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
  }
  return size;
}

export async function renderCertificatePng(data: CertDraw): Promise<Blob> {
  if (typeof document !== "undefined" && "fonts" in document) {
    await document.fonts.ready;
  }
  const w = 1080;
  const h = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");

  ctx.fillStyle = "#070b09";
  ctx.fillRect(0, 0, w, h);

  const art = await loadSideArt();
  const artH = 720;
  if (art) {
    const destW = w;
    const destH = artH;
    const srcRatio = art.width / art.height;
    let sx = 0;
    let sy = 0;
    let sw = art.width;
    let sh = art.height;
    if (srcRatio > destW / destH) {
      sw = art.height * (destW / destH);
      sx = (art.width - sw) / 2;
    } else {
      sh = art.width * (destH / destW);
      sy = (art.height - sh) / 2;
    }
    ctx.drawImage(art, sx, sy, sw, sh, 0, 0, destW, destH);
  } else {
    ctx.fillStyle = "#0c1812";
    ctx.fillRect(0, 0, w, artH);
  }

  const fade = ctx.createLinearGradient(0, artH - 220, 0, artH + 40);
  fade.addColorStop(0, "rgba(7,11,9,0)");
  fade.addColorStop(1, "#070b09");
  ctx.fillStyle = fade;
  ctx.fillRect(0, artH - 220, w, 280);

  ctx.strokeStyle = "rgba(61,207,122,0.55)";
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, w - 72, h - 72);
  ctx.strokeStyle = "rgba(61,207,122,0.22)";
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 50, w - 100, h - 100);

  ctx.strokeStyle = "#3dcf7a";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(36, 130);
  ctx.lineTo(36, 36);
  ctx.lineTo(140, 36);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w - 36, h - 130);
  ctx.lineTo(w - 36, h - 36);
  ctx.lineTo(w - 140, h - 36);
  ctx.stroke();

  ctx.save();
  ctx.translate(780, 150);
  ctx.rotate((-14 * Math.PI) / 180);
  ctx.strokeStyle = "#3dcf7a";
  ctx.lineWidth = 5;
  ctx.strokeRect(-168, -40, 336, 80);
  ctx.fillStyle = "#3dcf7a";
  ctx.font = "700 32px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("CERTIFICADO", 0, 12);
  ctx.restore();
  ctx.textAlign = "left";

  const x = 80;
  const maxW = w - 160;

  ctx.fillStyle = "#7a9a86";
  ctx.font = "600 18px 'IBM Plex Mono', monospace";
  ctx.fillText("TREINAMENTO EM", x, 760);
  ctx.fillStyle = "#d7efe0";
  ctx.font = "700 34px 'Space Grotesk', sans-serif";
  ctx.fillText("CIBERSEGURANÇA", x, 804);
  ctx.fillStyle = "#3dcf7a";
  ctx.font = "500 16px 'IBM Plex Mono', monospace";
  ctx.fillText("CONHECIMENTO É A MELHOR DEFESA", x, 836);

  ctx.fillStyle = "#4d6658";
  ctx.font = "500 16px 'IBM Plex Mono', monospace";
  ctx.fillText(data.caseCode ?? "CASO #001  ·  SOC v2.4", x, 888);

  ctx.fillStyle = "#7a9a86";
  ctx.font = "600 18px 'IBM Plex Mono', monospace";
  ctx.fillText("CERTIFICADO DE CONCLUSÃO", x, 960);

  ctx.fillStyle = "#d7efe0";
  ctx.font = "700 72px 'Space Grotesk', sans-serif";
  ctx.fillText("Operação", x, 1044);
  ctx.fillStyle = "#3dcf7a";
  ctx.fillText("Phishing", x, 1124);

  ctx.fillStyle = "#7a9a86";
  ctx.font = "500 16px 'IBM Plex Mono', monospace";
  ctx.fillText("CONSCIENTIZAÇÃO EM CIBERSEGURANÇA", x, 1168);

  ctx.fillStyle = "#4d6658";
  ctx.font = "500 16px 'IBM Plex Mono', monospace";
  ctx.fillText("ESTE CERTIFICADO É CONCEDIDO A", x, 1248);

  const name = data.callsign.trim().toUpperCase() || "AGENTE";
  ctx.fillStyle = "#d7efe0";
  const nameSize = fitName(ctx, name, maxW, 72);
  ctx.font = `700 ${nameSize}px "Space Grotesk", sans-serif`;
  ctx.fillText(name, x, 1330);

  ctx.strokeStyle = "#3dcf7a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, 1352);
  ctx.lineTo(x + maxW, 1352);
  ctx.stroke();

  ctx.fillStyle = "#9bb8a6";
  ctx.font = "400 24px 'Space Grotesk', sans-serif";
  wrapText(
    ctx,
    data.blurb ??
      "Por concluir com êxito o treinamento educacional “Operação Phishing”, demonstrando conhecimento sobre os principais riscos e boas práticas para identificar e evitar tentativas de phishing.",
    x,
    1404,
    maxW,
    34,
  );

  ctx.fillStyle = "#4d6658";
  ctx.font = "500 14px 'IBM Plex Mono', monospace";
  ctx.fillText("EMITIDO EM", x, 1540);
  ctx.fillStyle = "#d7efe0";
  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.fillText(formatIssued(data.issuedAt), x, 1578);

  ctx.fillStyle = "#4d6658";
  ctx.font = "500 14px 'IBM Plex Mono', monospace";
  ctx.fillText("SÉRIE / VALIDAÇÃO", 560, 1540);
  ctx.fillStyle = "#3dcf7a";
  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.fillText(data.serial, 560, 1578);

  ctx.strokeStyle = "#1c2c24";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, 1610);
  ctx.lineTo(x + maxW, 1610);
  ctx.stroke();

  ctx.fillStyle = "#3dcf7a";
  ctx.font = "700 14px 'IBM Plex Mono', monospace";
  ctx.fillText("IDENTIFIQUE", x, 1638);
  ctx.fillStyle = "#7a9a86";
  ctx.font = "500 13px 'IBM Plex Mono', monospace";
  ctx.fillText("PADRÕES SUSPEITOS", x, 1662);

  ctx.fillStyle = "#3dcf7a";
  ctx.font = "700 14px 'IBM Plex Mono', monospace";
  ctx.fillText("PENSE", 400, 1638);
  ctx.fillStyle = "#7a9a86";
  ctx.font = "500 13px 'IBM Plex Mono', monospace";
  ctx.fillText("ANTES DE CLICAR", 400, 1662);

  ctx.fillStyle = "#3dcf7a";
  ctx.font = "700 14px 'IBM Plex Mono', monospace";
  ctx.fillText("PROTEJA", 740, 1638);
  ctx.fillStyle = "#7a9a86";
  ctx.font = "500 13px 'IBM Plex Mono', monospace";
  ctx.fillText("SEUS DADOS", 740, 1662);

  ctx.strokeStyle = "rgba(229,72,77,0.55)";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, 1692, maxW, 164);
  ctx.fillStyle = "#e5484d";
  ctx.font = "700 14px 'IBM Plex Mono', monospace";
  ctx.fillText("AVISO LEGAL", x + 16, 1720);
  ctx.font = "500 16px 'IBM Plex Mono', monospace";
  wrapText(ctx, CERT_LEGAL, x + 16, 1752, maxW - 32, 24);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("png"));
    }, "image/png");
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, yy);
      line = word;
      yy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, yy);
}

export async function downloadCertificate(data: CertDraw, blob?: Blob) {
  const file = blob ?? (await renderCertificatePng(data));
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificado-operacao-phishing-${safeFilePart(data.callsign)}.png`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function shareCertificate(data: CertDraw, blob?: Blob) {
  const fileBlob = blob ?? (await renderCertificatePng(data));
  const file = new File(
    [fileBlob],
    `certificado-operacao-phishing-${safeFilePart(data.callsign)}.png`,
    { type: "image/png" },
  );
  const payload = {
    files: [file],
    title: "Certificado · Operação Phishing",
    text: `Agente ${sanitizeCallsign(data.callsign) || "AGENTE"} certificado na Operação Phishing. Treino educacional de cibersegurança.`,
  };
  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share(payload);
    return true;
  }
  await downloadCertificate(data, fileBlob);
  return false;
}
