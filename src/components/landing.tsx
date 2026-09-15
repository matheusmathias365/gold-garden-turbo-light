import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CERT_LEGAL } from "@/lib/certificate";
import {
  PhishingAttack,
  PhoneChrome,
  type AttackStep,
} from "@/components/phishing-attack";
import { Btn } from "@/components/ui";
import { PanicButton, PanicOverlay, RedGlyphTrail, FailWord } from "@/components/danger-fx";
import { assetUrl, cn } from "@/lib/utils";
import { sanitizeCallsign } from "@/lib/safe";

const PISTAS = [
  { k: "ISCA", t: "Prêmio, medo, conta bloqueada.", d: "O gancho que faz você abrir." },
  { k: "PRESSÃO", t: "Relógio. “Não ligue.” Dez minutos.", d: "A pressa impede a contraprova." },
  { k: "INCONSISTÊNCIA", t: "Remetente, domínio, tom, erro.", d: "O disfarce sempre racha." },
  { k: "LINK", t: "Escrito ≠ destino.", d: "norte vira n0rte — um zero no O." },
  { k: "PEDIDO", t: "Senha, SMS, PIX, cartão.", d: "Nunca pelo atalho da mensagem." },
];

export function Landing() {
  const reduce = useReducedMotion();
  const [panic, setPanic] = useState(false);

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-fg">
      <div className="grid-bg pointer-events-none fixed inset-0 opacity-35" />
      <div className="vignette pointer-events-none fixed inset-0 z-[1]" />
      <div className="crt-scanlines pointer-events-none fixed inset-0 z-20 opacity-[0.22]" />
      {!reduce ? (
        <div className="scan-drop pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-accent" />
      ) : null}
      <RedGlyphTrail enabled={!reduce && !panic} />
      <PanicOverlay open={panic} onClose={() => setPanic(false)} />
      <PanicButton onClick={() => setPanic(true)} />

      <Nav />
      <TickerLand />

      <main className="relative z-10">
        <Hero reduce={reduce} />
        <Inspect />
        <Golpe reduce={reduce} />
        <ComoJogar />
        <Ficha />
        <Frase reduce={reduce} />
        <Pistas reduce={reduce} />
        <Dossie />
        <Saber />
        <Depois />
        <Certificado reduce={reduce} />
        <ParaQuem />
        <Faq />
        <CtaFinal reduce={reduce} />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#inicio" className="inline-flex min-h-11 items-center font-display text-sm font-semibold tracking-tight">
          Operação <span className="text-accent">Phishing</span>
        </a>
        <nav className="ml-auto hidden items-center gap-6 font-mono text-[10px] tracking-[0.18em] text-muted md:flex">
          <a href="#golpe" className="inline-flex min-h-11 items-center hover:text-fg">O golpe</a>
          <a href="#casos" className="inline-flex min-h-11 items-center hover:text-fg">Casos</a>
          <a href="#como" className="inline-flex min-h-11 items-center hover:text-fg">Como jogar</a>
          <a href="#saber" className="inline-flex min-h-11 items-center hover:text-fg">Phishing</a>
          <a href="#faq" className="inline-flex min-h-11 items-center hover:text-fg">FAQ</a>
          <a href="#certificado" className="inline-flex min-h-11 items-center hover:text-fg">Certificado</a>
        </nav>
        <Link to="/jogar">
          <Btn className="glow-cta">Jogar</Btn>
        </Link>
      </div>
    </header>
  );
}

function TickerLand() {
  return (
    <div className="relative z-30 overflow-hidden border-b border-border bg-bg-elevated/80 py-2 font-mono text-[10px] tracking-[0.2em] text-dim">
      <div className="ticker flex w-max gap-10 whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i}>
            SIMULAÇÃO AO VIVO · JOGO ONLINE · #001 OLHO · #002 PRESSA · #003 QR ·
            #004 VOZ · PARAR → ANALISAR → VERIFICAR → AGIR
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero({ reduce }: { reduce: boolean }) {
  const [step, setStep] = useState<AttackStep>("notify");
  const [titleHot, setTitleHot] = useState(false);
  const hoverRef = useRef(false);
  const onStep = useCallback((s: AttackStep) => setStep(s), []);
  const hot = step === "click" || step === "dump" || step === "ranked";
  const safe = step === "soc";

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (hoverRef.current) return;
      setTitleHot(true);
      window.setTimeout(() => {
        if (!hoverRef.current) setTitleHot(false);
      }, 640);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section id="inicio" className="relative min-h-[calc(100dvh-96px)] overflow-hidden">
      <div
        className={cn(
          "ambient-layer pointer-events-none absolute inset-0",
          hot &&
            "bg-[radial-gradient(ellipse_at_70%_45%,rgb(229_72_77/0.22),transparent_58%)]",
          safe &&
            "bg-[radial-gradient(ellipse_at_70%_45%,rgb(61_207_122/0.16),transparent_58%)]",
          !hot &&
            !safe &&
            "bg-[radial-gradient(ellipse_at_70%_45%,rgb(61_207_122/0.07),transparent_58%)]",
        )}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-8">
        <div className="stagger-in relative z-10 max-w-xl">
          <p className="font-mono text-[10px] tracking-[0.28em] text-danger">
            CASO #001 · SOC v2.4 · TREINO EDUCACIONAL
          </p>
          <h1
            className="mt-5 flex flex-col items-start font-display text-6xl font-semibold leading-none tracking-tight md:text-8xl"
            onMouseEnter={() => {
              hoverRef.current = true;
              setTitleHot(true);
            }}
            onMouseLeave={() => {
              hoverRef.current = false;
              setTitleHot(false);
            }}
          >
            <span className="block">
              <FailWord text="Operação" reduce={reduce} hot={titleHot} align="start" tone="fg" />
            </span>
            <span className="block">
              <FailWord
                text="Phishing"
                reduce={reduce}
                hot={titleHot}
                align="start"
                tone="accent"
                className="text-accent"
              />
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl">Você já ia clicar.</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Jogo online de cibersegurança. Quatro casos no quartel. Sem caixa,
            sem envio, sem instalar. Abre no navegador — celular ou computador.
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-dim">
            Este dossiê é um material de treinamento exclusivamente educacional.
            Seu conteúdo não apoia, não ensina nem autoriza qualquer prática
            ilegal ou criminosa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jogar">
              <Btn className="glow-cta px-6">Entrar na missão</Btn>
            </Link>
            <a href="#certificado">
              <Btn variant="ghost">Ver o certificado</Btn>
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.16em] text-dim">
            jogo online · 8 min · certificado na tela
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
          <Satellite className="satellite -left-28 top-16 hidden lg:block">
            <p className="font-mono text-[9px] tracking-[0.18em] text-danger">E-MAIL</p>
            <p className="mt-1 text-xs">Encomenda retida — taxa R$ 2,90</p>
            <p className="mt-1 font-mono text-[10px] text-dim">rastreio-taxa.xyz</p>
          </Satellite>
          <Satellite className="satellite-2 -right-24 bottom-24 hidden lg:block">
            <p className="font-mono text-[9px] tracking-[0.18em] text-warn">CHAT</p>
            <p className="mt-1 text-xs">“Chefe”: PIX de R$ 1.850. Não liga.</p>
          </Satellite>
          <div className={cn(!reduce && "phone-in")}>
            <PhoneChrome>
              <PhishingAttack reduce={reduce} onStep={onStep} />
            </PhoneChrome>
          </div>
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.16em] text-dim">
            o golpe, em loop · ninguém é atingido
          </p>
        </div>
      </div>
    </section>
  );
}

function Satellite({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute z-20 w-48 rounded-md border border-border bg-bg-elevated/90 p-3 text-muted shadow-panel backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Inspect() {
  const [hot, setHot] = useState<string | null>(null);
  const marks = [
    { id: "isca", label: "ISCA", text: "acesso suspeito" },
    { id: "pressao", label: "PRESSÃO", text: "BLOQUEADA em 10 minutos" },
    { id: "link", label: "LINK", text: "nuvembank-seguro.tk" },
    { id: "pedido", label: "PEDIDO", text: "Confirme sua identidade" },
  ];

  return (
    <section className="land-section">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
            DEMO
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Toque a isca
            <br />
            antes de clicar.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            No jogo você inspeciona SMS, e-mail, chat e página gêmea. Aqui vai
            um recorte: toque nas partes suspeitas.
          </p>
          <p className="mt-6 font-mono text-sm text-accent">
            {hot ? marks.find((m) => m.id === hot)?.label : "TOQUE UMA MARCA"}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-bg-elevated p-4 shadow-panel">
          <p className="text-center font-mono text-[10px] text-dim">SMS · agora</p>
          <p className="mt-4 text-sm leading-relaxed">
            NUVEMBANK: Detectamos um{" "}
            <Mark id="isca" hot={hot} setHot={setHot}>
              acesso suspeito
            </Mark>
            . Sua conta será{" "}
            <Mark id="pressao" hot={hot} setHot={setHot}>
              BLOQUEADA em 10 minutos
            </Mark>
            .{" "}
            <Mark id="pedido" hot={hot} setHot={setHot}>
              Confirme sua identidade
            </Mark>
            :{" "}
            <Mark id="link" hot={hot} setHot={setHot}>
              nuvembank-seguro.tk
            </Mark>
          </p>
        </div>
      </div>
    </section>
  );
}

function Mark({
  id,
  hot,
  setHot,
  children,
}: {
  id: string;
  hot: string | null;
  setHot: (id: string) => void;
  children: ReactNode;
}) {
  const on = hot === id;
  return (
    <button
      type="button"
      onClick={() => setHot(id)}
      className={cn(
        "rounded-xs px-0.5 underline decoration-dotted underline-offset-2",
        on ? "bg-danger/20 text-danger" : "hover:bg-accent/15 hover:text-accent",
      )}
    >
      {children}
    </button>
  );
}

function Golpe({ reduce }: { reduce: boolean }) {
  return (
    <section id="golpe" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">A INTRO</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Primeiro, o golpe.
          <br />
          Depois, o treino.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          A tela fica vermelha de propósito. É teatro educacional. Dá para pular
          a intro no jogo.
        </p>
      </div>
      <Beat code="01" kicker="CANAL NÃO AUTORIZADO" title="Uma sessão que não é sua." body="O jogo finge uma interceptação. Não coleta IP, não lê a sua tela.">
        <div className="space-y-1.5 font-mono text-xs text-muted">
          <p>› handshake com o dispositivo: ok</p>
          <p>› sessão sem segundo fator</p>
          <p>› montando lote para venda…</p>
        </div>
      </Beat>
      <Beat code="02" kicker="ALERTA" title="Seus dados foram ranqueados." body="O susto é curto. Depois, o preto." danger>
        <p className={cn("font-display text-4xl font-semibold leading-tight text-danger", !reduce && "glitch-once")}>
          Seus dados foram
          <br />
          ranqueados.
        </p>
      </Beat>
      <Beat code="03" kicker="ARQUIVO" title="A barra muda de lado." body="Aos 72% o SOC intercepta. O dossiê caso #001 é recuperado.">
        <LoadDemo reduce={reduce} />
      </Beat>
      <Beat code="04" kicker="VIRADA" title="Isso não era real. Mas poderia ser." body="A pressa que você sentiu é o phishing. Agora você entra como analista." last>
        <p className="font-display text-3xl font-semibold leading-tight">
          Isso não era real.
          <br />
          <span className="text-accent">Mas poderia ser.</span>
        </p>
      </Beat>
    </section>
  );
}

function Beat({
  code,
  kicker,
  title,
  body,
  children,
  danger,
  last,
}: {
  code: string;
  kicker: string;
  title: string;
  body: string;
  children: ReactNode;
  danger?: boolean;
  last?: boolean;
}) {
  return (
    <div className={cn("md:sticky md:top-24 md:min-h-[64vh]", last && "border-b border-border")}>
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-2 md:items-center">
        <div>
          <p className={cn("font-mono text-[10px] tracking-[0.22em]", danger ? "text-danger" : "text-accent")}>
            {code} · {kicker}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{body}</p>
        </div>
        <div className={cn("rounded-lg border bg-bg-elevated p-5 shadow-panel", danger ? "border-danger/40" : "border-border")}>
          {children}
        </div>
      </div>
    </div>
  );
}

function LoadDemo({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(reduce);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] text-muted">{on ? "SOC v2.4 — INTERCEPTAÇÃO" : "EXFILTRANDO"}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-xs bg-border">
        <div className={cn("h-full", on || reduce ? "bar-fill bg-accent" : "w-0 bg-danger")} />
      </div>
    </div>
  );
}

function ComoJogar() {
  const steps = [
    ["01", "Abre o site", "Não tem caixa, não tem app da loja. Jogar é no navegador."],
    ["02", "Callsign e aceite", "Nome de agente (ou anônimo) e o termo: material educacional, sujeito à lei."],
    ["03", "A intro é teatro", "A tela vermelha finge o golpe. Pular intro existe. Nada é coletado."],
    ["04", "Escolhe o arquivo", "Quartel com quatro casos. Cada um treina um vetor — olho, pressa, QR, voz."],
    ["05", "Certificado na tela", "Fecha o caso. Sai o PNG 9:16 da série — OP-001 a OP-004. Baixa. Não envia."],
  ];

  return (
    <section id="como" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          COMO JOGAR
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Entra. Joga.
          <br />
          Não espera entrega.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {steps.map(([n, t, b]) => (
            <li key={n}>
              <p className="font-mono text-[10px] tracking-[0.22em] text-accent">{n}</p>
              <p className="mt-2 font-display text-xl font-semibold">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Link to="/jogar">
            <Btn>Jogar agora</Btn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Ficha() {
  const rows = [
    ["Tipo", "Jogo online no navegador"],
    ["Entrega", "Nenhuma. Sem caixa, sem correio"],
    ["Casos", "4 — #001 olho, #002 pressa, #003 QR, #004 voz"],
    ["Duração", "8 a 40 minutos, no seu ritmo"],
    ["Preço", "Grátis. Sem cadastro"],
    ["Missão", "Reconhecer phishing. Não reproduzir."],
  ];

  return (
    <section id="ficha" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          FICHA TÉCNICA
        </p>
        <dl className="mt-8">
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
            >
              <dt className="font-mono text-[10px] tracking-[0.18em] text-dim">
                {k}
              </dt>
              <dd className="text-sm text-fg">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Frase({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(reduce);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <section className="flex min-h-[56vh] items-center px-5">
      <p
        ref={ref}
        className={cn(
          "mx-auto max-w-4xl text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl",
          on && !reduce && "mask-up",
        )}
      >
        A arma do phishing não é o vírus.
        <br />
        <span className="text-accent">É a sua pressa.</span>
      </p>
    </section>
  );
}

function Pistas({ reduce }: { reduce: boolean }) {
  return (
    <section id="pistas" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">CINCO MARCAS</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Um padrão. Sempre.
        </h2>
      </div>
      <div className="mx-auto max-w-3xl px-5 pb-24">
        {PISTAS.map((p, i) => (
          <article key={p.k} className="bg-bg py-10 md:sticky md:top-24" style={{ zIndex: i + 1 }}>
            <p className="font-mono text-[10px] text-dim">0{i + 1}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold">{p.k}</h3>
            <p className="mt-2 text-lg">
              {p.k === "LINK" ? (
                <>
                  banco-norte vira banco-n
                  <span className={cn(!reduce && "zero-flash text-accent")}>0</span>
                  rte.
                </>
              ) : (
                p.t
              )}
            </p>
            <p className="mt-2 text-sm text-muted">{p.d}</p>
          </article>
        ))}
        <p className="pt-8 text-sm text-muted">
          Pressão, rachadura, link e pedido juntos: é armadilha.
        </p>
        <p className="mt-4 font-mono text-sm tracking-wide text-accent">
          PARAR → ANALISAR → VERIFICAR → AGIR
        </p>
      </div>
    </section>
  );
}

function Chapter({
  id, n, title, lead, children, active,
}: {
  id: string; n: string; title: string; lead: string; children?: ReactNode; active: boolean;
}) {
  return (
    <article id={id} className={cn("scroll-mt-28 border-l-2 pl-5 transition-colors duration-300", active ? "border-accent" : "border-border")}>
      <p className="font-mono text-[10px] tracking-[0.22em] text-dim">CASO #{n}</p>
      <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{lead}</p>
      {children}
    </article>
  );
}

const CASE_FRAMES = [
  {
    file: "caso-001.sig",
    series: "OP-001",
    title: "Operação Phishing",
    to: "/dossie" as const,
    rows: [
      ["Briefing", "8 arquivos"],
      ["Laboratório A–F", "SMS · e-mail · PIX · clone · prêmio"],
      ["Terminal SOC", "5 toques"],
      ["Desafios", "5 provas"],
      ["Protocolo", "se você já clicou"],
    ],
    log: [
      "› vetor: o olho",
      "› isca + pressão + link + pedido",
      "› arquivar o caso fecha o dossiê",
      "› diploma OP-001 na tela",
    ],
  },
  {
    file: "plantao-soc",
    series: "OP-002",
    title: "Plantão SOC",
    to: "/plantao" as const,
    rows: [
      ["Turno", "90 segundos"],
      ["Fila", "8 recados"],
      ["Canais", "WhatsApp · SMS · e-mail · push"],
      ["Arquivar", "golpe · oficial · ignorar"],
      ["Replay", "cada plantão embaralha"],
    ],
    log: [
      "› vetor: a pressa",
      "› erro não perde — abre debrief",
      "› a arma do golpe é o relógio",
      "› diploma OP-002 na tela",
    ],
  },
  {
    file: "qr-mesa",
    series: "OP-003",
    title: "O QR",
    to: "/qr" as const,
    rows: [
      ["Cena 01", "PIX da mesa"],
      ["Cena 02", "Pedágio"],
      ["Cena 03", "Cardápio"],
      ["Cena 04", "Cancela"],
      ["Cena 05", "Cupom da padaria"],
    ],
    log: [
      "› vetor: o código",
      "› destino ≠ carimbo = golpe",
      "› pagar nesta tela nunca é o passo",
      "› diploma OP-003 na tela",
    ],
  },
  {
    file: "voz-chefe",
    series: "OP-004",
    title: "A voz",
    to: "/voz" as const,
    rows: [
      ["Cena 01", "A chefe · celular"],
      ["Cena 02", "O pai · chip novo"],
      ["Cena 03", "Banco pedindo SMS"],
      ["Cena 04", "Ramal do RH"],
      ["Cena 05", "O diretor · reunião"],
    ],
    log: [
      "› vetor: o canal, não o timbre",
      "› ligar no ramal oficial",
      "› nunca transferir no susto",
      "› diploma OP-004 na tela",
    ],
  },
];

function LaptopMock({
  index,
  onPick,
}: {
  index: number;
  onPick: (i: number) => void;
}) {
  const frame = CASE_FRAMES[index] ?? CASE_FRAMES[0];
  return (
    <div>
      <div className="overflow-hidden rounded-t-xl border border-border bg-[#0c1310] shadow-panel">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-danger/70" />
          <span className="size-2 rounded-full bg-warn/70" />
          <span className="size-2 rounded-full bg-accent/70" />
          <span className="ml-3 font-mono text-[10px] text-dim">{frame.file}</span>
        </div>
        <div className="flex gap-1 border-b border-border px-2 py-2">
          {CASE_FRAMES.map((f, i) => (
            <button
              key={f.series}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPick(i);
              }}
              className={cn(
                "relative z-10 min-h-9 rounded-sm px-2.5 font-mono text-[9px] tracking-[0.14em]",
                i === index ? "bg-accent/15 text-accent" : "text-dim hover:text-fg",
              )}
            >
              {f.series}
            </button>
          ))}
        </div>
        <div className="flex min-h-[28rem] flex-col p-5 lg:min-h-[32rem]">
          <p className="font-mono text-[10px] tracking-[0.2em] text-dim">
            {frame.series} · {frame.title}
          </p>
          <ul className="mt-4 space-y-3 font-mono text-xs text-muted">
            {frame.rows.map(([k, v]) => (
              <li key={k} className="flex justify-between gap-3">
                <span>{k}</span>
                <span className="text-right text-fg">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-1 border-t border-border/60 pt-4 font-mono text-[11px] leading-relaxed text-dim">
            {frame.log.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-4">
            <Link to={frame.to}>
              <Btn className="w-full">Abrir {frame.series}</Btn>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-3 rounded-b-xl border border-t-0 border-border bg-surface-2" />
      <div className="mx-auto h-2 w-32 rounded-b-md bg-border" />
    </div>
  );
}

function Dossie() {
  const [active, setActive] = useState(0);
  const hold = useRef(false);
  const ids = ["cap-1", "cap-2", "cap-3", "cap-4"];

  useEffect(() => {
    function spy() {
      if (hold.current) return;
      const line = window.innerHeight * 0.34;
      let best = 0;
      let bestTop = -Infinity;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          best = i;
        }
      });
      setActive((cur) => (cur === best ? cur : best));
    }
    function release() {
      hold.current = false;
    }
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    spy();
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
    };
  }, []);

  function pick(i: number) {
    hold.current = true;
    setActive(i);
  }

  return (
    <section id="casos" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          QUARTEL · 4 ARQUIVOS
        </p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
          O que tem em cada caso.
        </h2>
        <p className="mt-4 max-w-lg text-sm text-muted">
          Mesmo quartel. Quatro instrumentos. Reconhecer a armadilha — nunca
          montá-la.
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <LaptopMock index={active} onPick={pick} />
        </div>
        <div className="space-y-10">
          <Chapter
            id="cap-1"
            n="001"
            title="Operação Phishing"
            lead="Treina o olho. SMS, e-mail, PIX do “chefe”, página gêmea, prêmio."
            active={active === 0}
          >
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted">
              <li>Briefing — o que é phishing e as cinco pistas</li>
              <li>Laboratório A–F + terminal SOC</li>
              <li>Cinco desafios · protocolo se você já clicou</li>
              <li className="text-accent">Certificado OP-001</li>
            </ul>
          </Chapter>
          <Chapter
            id="cap-2"
            n="002"
            title="Plantão SOC"
            lead="Treina a pressa. Turno de 90 segundos. Fila de recados reais-de-mentira."
            active={active === 1}
          >
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted">
              <li>WhatsApp, SMS, e-mail, notificação</li>
              <li>Arquivar: golpe · canal oficial · ignorar</li>
              <li>Erro abre debrief e segue. Cada plantão embaralha.</li>
              <li className="text-accent">Certificado OP-002</li>
            </ul>
          </Chapter>
          <Chapter
            id="cap-3"
            n="003"
            title="O QR"
            lead="O código mente. Cardápio, pedágio, PIX da mesa, cancela, cupom."
            active={active === 2}
          >
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted">
              <li>Toque no QR · leia o destino</li>
              <li>Compare com o carimbo. Destino ≠ carimbo = golpe</li>
              <li>Pagar nesta tela nunca é o passo</li>
              <li className="text-accent">Certificado OP-003</li>
            </ul>
          </Chapter>
          <Chapter
            id="cap-4"
            n="004"
            title="A voz"
            lead="O canal, não o texto. Áudio da chefe, do pai, do banco, do RH, do diretor."
            active={active === 3}
          >
            <ul className="mt-6 space-y-2 font-mono text-xs text-muted">
              <li>Ouvir · olhar de onde veio</li>
              <li>Ligar no ramal oficial. Nunca transferir no susto</li>
              <li>Banco pedindo SMS: encerrar. Não ensina a clonar voz.</li>
              <li className="text-accent">Certificado OP-004</li>
            </ul>
          </Chapter>
        </div>
      </div>
    </section>
  );
}

function Certificado({ reduce }: { reduce: boolean }) {
  const card = useRef<HTMLDivElement>(null);
  function tilt(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = card.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }
  function reset() {
    if (card.current) card.current.style.transform = "";
  }
  return (
    <section id="certificado" className="land-section">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] tracking-[0.22em] text-accent">DIPLOMA</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Você sai com callsign.
            <br />E com diploma.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            O nome do boot aparece no certificado na hora. PNG 1080×1920 para
            baixar ou postar. Nada é enviado pelo correio.
          </p>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-danger">{CERT_LEGAL}</p>
        </div>
        <div className="perspective-[1200px] mx-auto w-full max-w-sm">
          <div
            ref={card}
            onMouseMove={tilt}
            onMouseLeave={reset}
            className="overflow-hidden rounded-lg border border-accent/40 bg-bg-elevated shadow-panel transition-transform duration-150 ease-out"
          >
            <div className="relative h-48 overflow-hidden">
              <img src={assetUrl("/cert-side.jpg")} alt="" className="h-full w-full object-cover" />
              <div className="stamp-in absolute right-4 top-4 rotate-[-16deg] rounded-sm border-2 border-accent px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-accent">
                CERTIFICADO
              </div>
            </div>
            <div className="px-5 py-5">
              <p className="font-mono text-[9px] tracking-[0.2em] text-muted">TREINAMENTO EM CIBERSEGURANÇA</p>
              <p className="mt-1 font-display text-2xl font-semibold leading-none">
                Operação <span className="text-accent">Phishing</span>
              </p>
              <p className="mt-4 font-mono text-[9px] text-dim">CONCEDIDO A</p>
              <p className="font-display text-3xl font-semibold">SEU CALLSIGN</p>
              <div className="mt-2 h-px bg-accent/70" />
              <p className="mt-3 text-[11px] leading-relaxed text-muted">
                Conclusão do treino. Série OP-001 a OP-004.
              </p>
              <p className="mt-4 font-mono text-[9px] text-accent">OP-001-XXXXXX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ParaQuem() {
  return (
    <section className="land-section">
      <Reveal className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">PARA QUEM É</p>
        <ul className="mt-8 space-y-8">
          <li className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Quem já quase clicou.</li>
          <li className="font-display text-3xl font-semibold tracking-tight md:text-5xl">Quem ensina alguém em casa.</li>
          <li className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Quem quer 8 minutos.<span className="text-muted"> Não uma caixa.</span>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}

function Saber() {
  return (
    <section id="saber" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">
          O QUE É PHISHING
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Não é vírus.
          <br />É conversa feita para você errar.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          Phishing é engano. Alguém se passa por banco, loja, chefe ou prêmio e
          pede um clique, um PIX, um código SMS. A arma é a pressa — medo de
          perder a conta, a encomenda, o emprego. O jogo treina o reflexo
          contrário: parar, olhar, conferir no canal que você já usava.
        </p>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            ["Chega", "SMS, e-mail, chat, anúncio ou página quase igual à do banco."],
            ["Pede", "Confirmar identidade, pagar taxa, mandar código, clicar agora."],
            ["Fura", "Domínio estranho, tom errado, relógio, zero no lugar do O."],
          ].map(([t, b]) => (
            <div key={t}>
              <p className="font-display text-2xl font-semibold">{t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
          No Brasil, obter vantagem assim é fraude eletrônica (Código Penal, art.
          171, § 2º-A). Este site não ensina a montar golpe. Ensina a não cair —
          e te convida a treinar isso jogando aqui mesmo, no site.
        </p>
        <div className="mt-8">
          <Link to="/jogar">
            <Btn>Jogar no navegador</Btn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Depois() {
  const cards = [
    {
      k: "VENDIDO",
      t: "Vira lote",
      b: "Login, senha, telefone e e-mail entram em lista. Essa lista circula. Não é um ladrão só — é revenda.",
    },
    {
      k: "VAZADO",
      t: "Vaza e reaparece",
      b: "O dump volta meses depois: outro SMS, outro “banco”, outro prêmio. Quem já caiu costuma ser visado de novo.",
    },
    {
      k: "ESVAZIADO",
      t: "Abre a conta",
      b: "Com a senha e o código SMS, fazem PIX, trocam o e-mail, trancam você do lado de fora.",
    },
    {
      k: "USADO",
      t: "Usam o seu nome",
      b: "Viramos isca. O golpe seguinte chega para a família como se fosse você.",
    },
  ];

  return (
    <section id="depois" className="land-section">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-danger">
          DEPOIS DO CLIQUE
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl">
          O dado não some.
          <br />
          Ele é vendido.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
          Phishing não é “só um link”. É coleta. A intro do jogo — “seus dados
          foram ranqueados, lote #4412” — é teatro. Na vida real o mecanismo é
          esse: empacotar, vender, reusar. Por isso o treino é parar antes do
          clique.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {cards.map((c) => (
            <article key={c.k} className="pt-5">
              <p className="font-mono text-[10px] tracking-[0.22em] text-danger">
                {c.k}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {c.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.b}</p>
            </article>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
          No jogo você vê isso acontecer em um minuto — e depois aprende a
          cortar o ciclo. Nada aqui ensina a vender dado. Ensina a não entregar.
        </p>
        <div className="mt-8">
          <Link to="/jogar">
            <Btn>Ver o ciclo e cortar</Btn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    {
      q: "Isso é jogo ou aula?",
      a: "Jogo online com treino. Quatro casos no quartel: o olho, a pressa, o QR e a voz. Oito a quarenta minutos. Sem caixa, sem PDF, sem espera.",
    },
    {
      q: "O que tem em cada caso?",
      a: "#001 treina o olho (SMS, e-mail, lab, desafios). #002 é plantão de 90 segundos. #003 lê o destino do QR. #004 ouve áudio e olha o canal. Cada um tem o próprio certificado.",
    },
    {
      q: "O que acontece com os dados depois do golpe?",
      a: "Eles não ficam com uma pessoa só. Login, senha, telefone e cartão viram lote: circulam, são revendidos e reaparecem em outro SMS meses depois. Com senha e código, esvaziam conta. Com o seu nome, golpeiam a família. A intro “dados ranqueados” é a versão teatro disso.",
    },
    {
      q: "Vem alguma caixa? Vocês enviam algo?",
      a: "Não. Não tem produto físico, não tem frete, não tem correio. É um jogo no navegador. Você toca em Jogar e começa.",
    },
    {
      q: "Ensinam a hackear?",
      a: "Não. É treino de defesa. Phishing é crime. Qualquer ataque baseado neste material é de quem pratica — Código Penal, art. 171, § 2º-A e art. 154-A.",
    },
    {
      q: "Preciso saber comando de computador?",
      a: "Não. O terminal SOC tem cinco toques em português. Quem quiser ainda pode digitar. O resto é olhar mensagem e marcar pista.",
    },
    {
      q: "É grátis? Precisa cadastrar?",
      a: "Grátis. Joga no próprio site. Só um callsign (ou entrar anônimo como AGENTE) e o aceite de que o material é educacional. Sem loja, sem app da loja.",
    },
    {
      q: "O botão PÂNICO clona alguma coisa?",
      a: "Não. É teatro. A tela fica preta, aparece a frase do golpe e o aviso: é apenas uma simulação. Nada é clonado, nenhum dado sai do site. ESC ou Fechar encerra.",
    },
    {
      q: "A intro vermelha rouba meus dados?",
      a: "Não. É teatro. Não lê IP, não abre câmera, não vende lote nenhum. Dá para tocar em Pular intro.",
    },
    {
      q: "O certificado vale como diploma oficial?",
      a: "Não. É uma imagem do simulado, com o seu nome, gerada na tela para baixar. Não chega pelos Correios e não substitui curso do MEC.",
    },
    {
      q: "Marquei as pistas e o progresso não andou.",
      a: "Tem que arquivar o caso. Sem arquivar, briefing e certificado não contam. O jogo avisa.",
    },
    {
      q: "E se eu já cliquei num golpe de verdade?",
      a: "Pare de interagir, não confirme mais nada, troque a senha no aplicativo oficial, ligue o 2FA. Se pagou, fale com o banco pelo canal que você já usava. No jogo isso é o protocolo “E se eu cliquei?”.",
    },
    {
      q: "É da Polícia Federal?",
      a: "Não. É um jogo-treino online com estética de dossiê. Não se passa por órgão público.",
    },
  ];

  return (
    <section id="faq" className="land-section">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Antes de entrar.
        </h2>
        <div className="mt-10">
          {items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-display text-lg font-semibold tracking-tight">
                {item.q}
                <span className="font-mono text-accent group-open:hidden">+</span>
                <span className="hidden font-mono text-accent group-open:inline">−</span>
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted">
          Ainda com dúvida? Entra mesmo assim — a primeira tela já explica na
          pele.
        </p>
        <div className="mt-6">
          <Link to="/jogar">
            <Btn>Entrar na missão</Btn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaFinal({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(reduce);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setOn(true);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section
      id="jogar"
      ref={ref}
      className="relative overflow-hidden"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          on && !reduce && "cta-bloom",
        )}
      />
      <div className="relative mx-auto flex min-h-[92dvh] max-w-xl flex-col items-center justify-center px-5 py-28 text-center">
        {on && !reduce ? (
          <div className="stamp-in mb-8 rotate-[-12deg] rounded-sm border-2 border-accent px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.22em] text-accent">
            QUARTEL ABERTO
          </div>
        ) : (
          <p className="mb-8 font-mono text-[10px] tracking-[0.22em] text-accent">
            QUARTEL ABERTO
          </p>
        )}
        <h2
          className={cn(
            "font-display text-5xl font-semibold tracking-tight md:text-7xl",
            on && !reduce && "mask-up",
          )}
        >
          Assuma o posto.
        </h2>
        <p className="mt-4 text-sm text-muted">
          Quatro casos. Jogo online. Sem caixa. Sem envio.
        </p>
        <ul
          className={cn(
            "mt-8 flex flex-wrap justify-center gap-3 font-mono text-[10px] tracking-[0.18em] text-dim",
            on && !reduce && "stagger-in",
          )}
        >
          <li className="rounded-sm border border-border px-2 py-1">OP-001 olho</li>
          <li className="rounded-sm border border-border px-2 py-1">OP-002 pressa</li>
          <li className="rounded-sm border border-border px-2 py-1">OP-003 QR</li>
          <li className="rounded-sm border border-border px-2 py-1">OP-004 voz</li>
        </ul>
        <p className="mt-10 font-mono text-[10px] tracking-[0.28em] text-dim">
          CALLSIGN
        </p>
        <label className="mx-auto mt-3 flex h-12 w-full max-w-xs items-center rounded-sm border border-border bg-surface px-3 font-mono text-sm tracking-[0.2em] text-fg">
          <input
            name="callsign"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            maxLength={16}
            placeholder="SEU NOME DE AGENTE"
            className="w-full bg-transparent placeholder:text-dim focus:outline-none"
            onChange={(e) => {
              e.currentTarget.value = sanitizeCallsign(e.currentTarget.value);
            }}
          />
          {on && !reduce ? (
            <span className="cursor-blink shrink-0 text-accent" aria-hidden>
              ▍
            </span>
          ) : null}
        </label>
        {on && !reduce ? (
          <div className="mx-auto mt-6 h-px w-full max-w-xs overflow-hidden bg-border">
            <div className="bar-fill h-px bg-accent" />
          </div>
        ) : null}
        <p className="mt-3 max-w-sm text-xs text-dim">
          O jogo pede o aceite: material apenas educacional. Qualquer ato a
          partir dele é de sua responsabilidade e está sujeito à lei.
        </p>
        <div className="mt-10">
          <Link to="/jogar">
            <Btn className={cn("px-10", on && !reduce && "glow-cta")}>
              Jogar agora
            </Btn>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-5 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div className="space-y-3 text-xs leading-relaxed text-dim">
          <p className="font-display text-lg font-semibold text-fg">
            Operação <span className="text-accent">Phishing</span>
          </p>
          <p className="text-muted">
            Este dossiê é um material de treinamento exclusivamente educacional. Seu conteúdo não apoia, não ensina nem autoriza qualquer prática ilegal ou criminosa.
          </p>
          <p>
            Fraude eletrônica: Código Penal, art. 171, § 2º-A (Lei nº 14.155/2021). Invasão: art. 154-A (Lei nº 12.737/2012).
          </p>
          <p>{CERT_LEGAL}</p>
        </div>
        <div className="space-y-2 font-mono text-[10px] tracking-[0.16em] text-dim md:text-right">
          <p>JOGO ONLINE · SEM CAIXA · SEM ENVIO</p>
          <p>SIMULAÇÃO · NÃO É ÓRGÃO OFICIAL</p>
          <p>PULAR INTRO EXISTE NO JOGO</p>
          <p>@mathiasmfernandes</p>
        </div>
      </div>
    </footer>
  );
}

function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn(on ? "stagger-in" : "opacity-0", className)}>
      {children}
    </div>
  );
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const fn = () => setReduce(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduce;
}
