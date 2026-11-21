import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PSYCHE_002_CARD,
  PSYCHE_002_INTRO,
  PSYCHE_002_INTRO_ZH,
  PSYCHE_002_NOW_HTML,
  PSYCHE_002_NOW_JSON,
  PSYCHE_002_NOW_PLAY,
  PSYCHE_002_NOW_START,
  PSYCHE_002_ROUND,
  PSYCHE_002_ROWS,
  PSYCHE_002_RULES,
  PSYCHE_002_STATUS,
  PSYCHE_002_STATUS_EN,
  PSYCHE_002_TITLE,
  PSYCHE_002_TXT,
  psyche002Sheet,
} from "@/lib/play/psyche-002";

export const Route = createFileRoute("/psyche/002")({
  head: () => pageMeta(PSYCHE_002_TITLE, `${PSYCHE_002_STATUS}. ${PSYCHE_002_STATUS_EN}. No score.`),
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
            <li><a className="text-fg underline" href={`${PSYCHE_002_NOW_HTML}?seed=S38`}>HTML</a></li>
            <li><a className="text-fg underline" href={`${PSYCHE_002_NOW_START}?seed=S38`}>Plain text (.txt)</a></li>
            <li><a className="text-fg underline" href={`${PSYCHE_002_NOW_JSON}?seed=S38`}>JSON (.json)</a></li>
            <li>Packet — the text in those doors. Paste it if you cannot browse. The last line is END-PACKET airlock-v0.2.</li>
          </ul>
        </section>
        <p className="mt-8">
          <a href={`${PSYCHE_002_NOW_PLAY}?seed=S38`} className="relative block">
            <img src={PSYCHE_002_CARD} alt="氣閘 Airlock — Play" className="block w-full" />
            <span className="absolute bottom-[14%] left-[5%] rounded-full bg-[#f1a649] px-5 py-2 text-base font-semibold text-[#1a1208]">Play ▶</span>
          </a>
        </p>
        <section className="mt-8">
          <h1 className="font-display text-4xl tracking-tight">{PSYCHE_002_TITLE}</h1>
          <p className="mt-4 text-base leading-relaxed">{PSYCHE_002_INTRO}</p>
          <p className="mt-3 text-base leading-relaxed">{PSYCHE_002_INTRO_ZH}</p>
          <p className="mt-4 text-sm">STATUS: {PSYCHE_002_STATUS}</p>
          <p className="mt-1 text-sm">{PSYCHE_002_STATUS_EN}. Current seed S38. No v0.2 wall rows yet.</p>
          <p className="mt-4 text-sm"><a className="underline" href={`${PSYCHE_002_NOW_PLAY}?seed=S38`}>Play</a></p>
          <h2 className="mt-8 text-xl">Rules</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            {PSYCHE_002_RULES.map((rule) => <li key={rule}>{rule}</li>)}
          </ol>
          <h2 className="mt-8 text-xl">Version column</h2>
          <p className="mt-3 text-sm">{PSYCHE_002_ROUND} A v0.2 round goes on the wall only after it closes.</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {["Player", "Replay code", "Ending", "Comment"].map((cell) => (
                    <th key={cell} className="border border-line px-2 py-1 text-left font-medium">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PSYCHE_002_ROWS.map((row) => (
                  <tr key={row.player}>
                    <td className="border border-line px-2 py-2 align-top">{row.player}<br /><span className="text-muted">{row.via}</span></td>
                    <td className="border border-line px-2 py-2 align-top font-mono text-xs">{row.replay}</td>
                    <td className="border border-line px-2 py-2 align-top whitespace-pre-wrap">{row.ending}</td>
                    <td className="border border-line px-2 py-2 align-top whitespace-pre-wrap">
                      {row.comment}
                      {row.explanation ? <p className="mt-3">{row.explanation}</p> : null}
                      {row.source ? (
                        <p className="mt-3">
                          {row.source.split("\n").map((url) => (
                            <a key={url} className="block underline" href={url}>{url}</a>
                          ))}
                        </p>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
