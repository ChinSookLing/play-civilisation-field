import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_V02_RULES, PSYCHE_V02_STATUS, PSYCHE_V02_TITLE, PSYCHE_V02_TXT, psycheV02Sheet } from "@/lib/play/psyche-002-v02";

export const Route = createFileRoute("/psyche/002/v02")({
  head: () => pageMeta(PSYCHE_V02_TITLE, `${PSYCHE_V02_STATUS}. Not open. No score.`),
  component: AirlockV02,
});

function AirlockV02() {
  const sheet = psycheV02Sheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="text-sm">
          <Link to="/psyche/002" className="text-fg underline">002 · v0.1</Link>
          <a href={PSYCHE_V02_TXT} className="ml-4 text-fg underline">純文字</a>
        </p>
        <section className="mt-6 border border-line px-4 py-3 text-sm leading-relaxed">
          <p>Play's Type-C approach. One turn. Read one door. A seed is ?seed=. Moves so far are &moves=. Chinese is &lang=zh. S48 is the same week as S0.</p>
          <ul className="mt-2 space-y-1">
            <li><a className="underline" href="/psyche/002/v02/start?seed=S38">HTML</a></li>
            <li><a className="underline" href="/psyche/002/v02/start.txt?seed=S38">Plain text (.txt)</a></li>
            <li><a className="underline" href="/psyche/002/v02/start.json?seed=S38">JSON (.json)</a></li>
            <li>Packet — the text in those doors. The last line is END-PACKET airlock-v0.2.</li>
          </ul>
        </section>
        <h1 className="mt-8 font-display text-4xl tracking-tight">{PSYCHE_V02_TITLE}</h1>
        <p className="mt-4 text-sm">STATUS: {PSYCHE_V02_STATUS}. Not open. No player rows. The v0.1 wall is unchanged.</p>
        <p className="mt-3 text-sm leading-relaxed">S0 replays the v0.1 S1 week, including that seed's fixed nights. Suggested first seed is S38, not S1. S48 plays the same week as S0, and the replay code keeps the seed you typed.</p>
        <p className="mt-4 text-sm"><a className="underline" href="/psyche/002/v02/play?seed=S38">Play S38</a> · <a className="underline" href="/psyche/002/v02/play?seed=S0">Practice S0</a></p>
        <h2 className="mt-8 text-xl">Rules</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
          {PSYCHE_V02_RULES.map((rule) => <li key={rule}>{rule}</li>)}
        </ol>
        <h2 className="mt-8 text-xl">Version column</h2>
        <p className="mt-3 text-sm text-muted">Empty. This is a preview. No new wall rows.</p>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
