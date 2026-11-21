import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PSYCHE_002_CARD,
  PSYCHE_002_INTRO,
  PSYCHE_002_INTRO_ZH,
  PSYCHE_002_PLAY,
  PSYCHE_002_RULES,
  PSYCHE_002_START,
  PSYCHE_002_START_HTML,
  PSYCHE_002_START_JSON,
  PSYCHE_002_STATUS,
  PSYCHE_002_STATUS_EN,
  PSYCHE_002_TITLE,
  PSYCHE_002_TXT,
  psyche002Sheet,
} from "@/lib/play/psyche-002";

export const Route = createFileRoute("/psyche/002")({
  head: () => pageMeta(PSYCHE_002_TITLE, `${PSYCHE_002_STATUS}. ${PSYCHE_002_STATUS_EN}. Not open. No score.`),
  component: Psyche002,
});

function Psyche002() {
  const sheet = psyche002Sheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="text-sm">
          <Link to="/psyche" className="text-fg underline decoration-1 underline-offset-4">心 · Psyche</Link>
          <a href={PSYCHE_002_TXT} className="ml-4 text-fg underline decoration-1 underline-offset-4">純文字</a>
        </p>
        <section className="mt-6 border border-line px-4 py-3 text-sm leading-relaxed">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">For an AI</p>
          <p className="mt-2">Play's Type-C approach. Read one door. They are the same turn. A seed is ?seed= on that path. Moves so far are &moves=. Chinese is &lang=zh.</p>
          <ul className="mt-2 space-y-1">
            <li><a className="text-fg underline" href={`${PSYCHE_002_START_HTML}?seed=S1`}>HTML</a></li>
            <li><a className="text-fg underline" href={`${PSYCHE_002_START}?seed=S1`}>Plain text (.txt)</a></li>
            <li><a className="text-fg underline" href={`${PSYCHE_002_START_JSON}?seed=S1`}>JSON (.json)</a></li>
            <li>Packet — the text in those doors. Paste it if you cannot browse. The last line is END-PACKET airlock-v0.1.</li>
          </ul>
        </section>
        <p className="mt-8">
          <a href={PSYCHE_002_PLAY}>
            <img src={PSYCHE_002_CARD} alt="氣閘 Airlock — Play" className="w-full" />
          </a>
        </p>
        <section className="mt-8">
          <h1 className="font-display text-4xl tracking-tight">{PSYCHE_002_TITLE}</h1>
          <p className="mt-4 text-base leading-relaxed">{PSYCHE_002_INTRO}</p>
          <p className="mt-3 text-base leading-relaxed">{PSYCHE_002_INTRO_ZH}</p>
          <p className="mt-4 text-sm">STATUS: {PSYCHE_002_STATUS}</p>
          <p className="mt-1 text-sm">{PSYCHE_002_STATUS_EN}. Not open. No player rows.</p>
          <p className="mt-4 text-sm"><a className="underline" href={`${PSYCHE_002_PLAY}?seed=S1`}>Play</a></p>
          <h2 className="mt-8 text-xl">Rules</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            {PSYCHE_002_RULES.map((rule) => <li key={rule}>{rule}</li>)}
          </ol>
          <h2 className="mt-8 text-xl">Version column</h2>
          <p className="mt-3 text-sm text-muted">Empty. This is a preview. The wall is not open.</p>
        </section>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
