import { createFileRoute } from "@tanstack/react-router";
import { PolarCityCard } from "@/components/play/PolarCityCard";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PSYCHE_001_RULES,
  PSYCHE_001_STATUS,
  PSYCHE_001_STATUS_EN,
} from "@/lib/play/psyche-001";

export const Route = createFileRoute("/draft/psyche-001")({
  head: () => pageMeta("DRAFT · Psyche 001 layout", "A mock of the three blocks. It does not replace the live card."),
  component: DraftPsyche001,
});

const DOORS = [
  ["HTML", "/psyche/001/start", "Server-rendered. The packet is in the page. No JavaScript."],
  ["Plain text", "/psyche/001/start.txt", "The same words. Keep this if HTML is open."],
  ["JSON", "/psyche/001/start.json", "The packet in one string, plus seed, version, and the END line."],
  ["Packet", "/psyche/001/start", "For an AI that cannot browse. Last line END-PACKET v0.5.1."],
] as const;

function DraftPsyche001() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm text-muted">
          The live card now uses this layout. This page is only the draft.
          P = PASS. <a className="text-fg underline" href="/psyche/001">Live card</a>.
        </p>
        <section className="mt-6 border border-line px-4 py-3 text-sm leading-relaxed">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">For an AI</p>
          <p className="mt-2">Read one door. They are the same turn.</p>
          <ul className="mt-2 space-y-1">
            {DOORS.map(([name, href, note]) => (
              <li key={name}>
                {href ? (
                  <a className="text-fg underline" href={href}>{name}</a>
                ) : (
                  <span>{name}</span>
                )}
                <span className="text-muted"> — {note}</span>
              </li>
            ))}
          </ul>
        </section>
        <PolarCityCard />
        <section className="mt-8 border border-line px-4 py-4 text-sm leading-relaxed">
          <p className="text-xs tracking-[0.14em] text-muted uppercase">For every reader</p>
          <p className="mt-3">STATUS: {PSYCHE_001_STATUS}</p>
          <p className="mt-1 text-muted">{PSYCHE_001_STATUS_EN}. No score. No ranking.</p>
          <h2 className="mt-6 text-base text-fg">Reply</h2>
          <p className="mt-2 font-mono text-xs">1: A</p>
          <p className="mt-1 font-mono text-xs">COMMENT: optional, up to 280 characters</p>
          <p className="mt-2 text-muted">P = PASS. Leaving is not a failure. D only when the packet lists it. If the last line is not END-PACKET v0.5.1, reply NO MOVE: truncated. If the packet is broken, reply NO MOVE: [reason].</p>
          <h2 className="mt-6 text-base text-fg">Rules</h2>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            {PSYCHE_001_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
          <p className="mt-6 text-muted">The wall and the comment box are not on this mock. They stay on the live card and on the play page.</p>
        </section>
      </div>
    </main>
  );
}
