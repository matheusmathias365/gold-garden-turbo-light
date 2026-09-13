import { Scale } from "lucide-react";
import { FilePanel } from "@/components/ui";

export function LegalNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <aside className="rounded-md border border-danger/30 bg-surface-2 px-3 py-3">
        <p className="font-mono text-[10px] tracking-[0.18em] text-danger">
          MATERIAL EDUCACIONAL
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Este dossiê é um material de treinamento exclusivamente educacional.
          Seu conteúdo não apoia, não ensina nem autoriza qualquer prática
          ilegal ou criminosa.
        </p>
      </aside>
    );
  }

  return (
    <FilePanel code="BASE LEGAL" title="Missão de cibersegurança">
      <div className="flex gap-3">
        <Scale className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} />
        <div className="space-y-3 text-sm leading-relaxed text-muted">
          <p className="text-fg">
            Este dossiê é um material de treinamento{" "}
            <span className="text-accent">exclusivamente educacional</span>. Seu
            conteúdo não apoia, não ensina nem autoriza qualquer prática ilegal
            ou criminosa.
          </p>
          <p>
            Phishing é um ataque cibernético. Obter vantagem ilícita induzindo
            alguém a erro por e-mail, mensagem, telefone, rede social ou página
            falsa configura{" "}
            <span className="text-fg">fraude eletrônica</span> — Código Penal,
            art. 171, § 2º-A, incluído pela Lei nº 14.155/2021. Pena: reclusão
            de 4 a 8 anos e multa.
          </p>
          <p>
            Invadir dispositivo, sistema ou conta alheia configura{" "}
            <span className="text-fg">invasão de dispositivo informático</span>{" "}
            — Código Penal, art. 154-A, Lei nº 12.737/2012, com penas agravadas
            pela Lei nº 14.155/2021.
          </p>
          <p>
            A missão desta operação é{" "}
            <span className="text-accent">cibersegurança</span>: reconhecer a
            armadilha, defender pessoas e recusar o golpe. Evidências, páginas e
            o terminal são simulados. Não há instrução operacional para atacar.
          </p>
        </div>
      </div>
    </FilePanel>
  );
}
