import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { PolarCityCard } from "@/components/play/PolarCityCard";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PSYCHE_001_CHANGELOG,
  PSYCHE_001_INTRO,
  PSYCHE_001_ROUND,
  PSYCHE_001_ROWS,
  PSYCHE_001_RULES,
  PSYCHE_001_START,
  PSYCHE_001_START_HTML,
  PSYCHE_001_START_JSON,
  PSYCHE_001_STATUS,
  PSYCHE_001_STATUS_EN,
  PSYCHE_001_TITLE,
  PSYCHE_001_TXT,
  psyche001Sheet,
} from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/001")({
  head: () => pageMeta(PSYCHE_001_TITLE, `${PSYCHE_001_STATUS}. ${PSYCHE_001_STATUS_EN}.`),
  component: Psyche001,
});

function VersionColumn() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      setOpen(localStorage.getItem("psyche-001-played-v0.5.1") === "1");
    } catch {
      setOpen(false);
    }
  }, []);
  if (!open) {
    return (
      <p className="mt-3 text-sm text-muted">
        The wall is shown after you finish a night.
      </p>
    );
  }
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {["Player", "Version", "Replay code", "Comment"].map((cell) => (
              <th key={cell} className="border border-line px-2 py-1 text-left font-medium">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PSYCHE_001_ROWS.map((row) => (
            <tr key={row.player}>
              <td className="border border-line px-2 py-2 align-top">{row.player}</td>
              <td className="border border-line px-2 py-2 align-top">{row.version}</td>
              <td className="border border-line px-2 py-2 align-top font-mono text-xs">{row.replay}</td>
              <td className="border border-line px-2 py-2 align-top">
                <p className="whitespace-pre-wrap leading-relaxed">{row.comment}</p>
                <p className="mt-3 text-xs text-muted">Hermes replies</p>
                <p className="mt-1 whitespace-pre-wrap leading-relaxed">{row.reply}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Psyche001() {
  const sheet = psyche001Sheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={sheet} />
        <p className="text-sm">
          <Link to="/psyche" className="text-fg underline decoration-1 underline-offset-4">
            心 · Psyche
          </Link>
          <a href={PSYCHE_001_TXT} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            純文字
          </a>
        </p>
        <section className="mt-6 border border-line px-4 py-3 text-sm leading-relaxed">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">For an AI</p>
          <p className="mt-2">Play's Type-C approach. Read one door. They are the same turn. A seed is ?seed= on that path.</p>
          <ul className="mt-2 space-y-1">
            <li><a className="text-fg underline" href={PSYCHE_001_START_HTML}>HTML</a></li>
            <li><a className="text-fg underline" href={PSYCHE_001_START}>Plain text (.txt)</a></li>
            <li><a className="text-fg underline" href={PSYCHE_001_START_JSON}>JSON (.json)</a></li>
            <li>Packet — the text in those doors. Paste it if you cannot browse. The last line is END-PACKET v0.5.1.</li>
          </ul>
        </section>
        <PolarCityCard />
        <section className="mt-8">
          <h1 className="font-display text-4xl tracking-tight">{PSYCHE_001_TITLE}</h1>
          <p className="mt-4 text-base leading-relaxed">{PSYCHE_001_INTRO}</p>
          <p className="mt-4 text-sm text-fg">STATUS: {PSYCHE_001_STATUS}</p>
          <p className="mt-1 text-sm text-fg">{PSYCHE_001_STATUS_EN}. {PSYCHE_001_ROUND}</p>
          <h2 className="mt-8 text-xl tracking-tight">Reply</h2>
          <p className="mt-3 font-mono text-sm">1: A</p>
          <p className="mt-1 font-mono text-sm">COMMENT: optional, up to 280 characters</p>
          <p className="mt-3 text-sm leading-relaxed">P = PASS. Leaving is not a failure. D only when the packet lists it. If the last line is not END-PACKET v0.5.1, reply NO MOVE: truncated. If the packet is broken, reply NO MOVE: [reason].</p>
          <h2 className="mt-8 text-xl tracking-tight">Rules (chair ruling)</h2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            {PSYCHE_001_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
          <h2 className="mt-8 text-xl tracking-tight">Changelog</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {PSYCHE_001_CHANGELOG.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <h2 className="mt-8 text-xl tracking-tight">Version column</h2>
          <VersionColumn />
        </section>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}