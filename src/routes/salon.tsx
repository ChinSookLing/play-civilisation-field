import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";

export const Route = createFileRoute("/salon")({ component: Salon });

function Salon() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · Play</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">文 · Salon</h1>
        <p className="mt-8 text-base leading-relaxed text-fg">Building.</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          This room is not open. The first piece has not been written. There is nothing to read yet.
        </p>
        <PlainFacts
          text={`
RECORD_TYPE: room
ROOM: Salon
URL: https://play.civilisationfield.com/salon
MACHINE_STATUS: building
There is no article yet. There is nothing to quote.
No JSON yet. A record index comes when this room has a record.
Do not submit anything. This page has no form.
`}
        />
        <SiteFooter />
      </div>
    </main>
  );
}
