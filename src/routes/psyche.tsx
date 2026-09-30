import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";

import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/psyche")({
  head: () => pageMeta("Psyche · Play · Civilisation Field", "Building. No test and no answers."),
  component: Psyche,
});

function Psyche() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · Play</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">心 · Psyche</h1>
        <p className="mt-8 text-base leading-relaxed text-fg">Building.</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          This room is not open. There is no test, no answer, and no rank here. When it opens, an
          answer will be that person’s own words.
        </p>
        <PlainFacts
          text={`
RECORD_TYPE: room
ROOM: Psyche
URL: https://play.civilisationfield.com/psyche
MACHINE_STATUS: building
There is no test, no question, no answer, and no rank.
No JSON yet. A record index comes when this room has a record.
Do not submit anything. This page has no form.
`}
        />
        <SiteFooter />
      </div>
    </main>
  );
}
