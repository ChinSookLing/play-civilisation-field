import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { PlainFacts } from "@/components/play/PlainFacts";

import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Play · Civilisation Field", "Index of Games, Psyche, Gathering, and Salon."),
  component: Index,
});

const DOORS = [
  { to: "/games", mark: "棋", name: "Games", note: "Five tables, and one practice." },
  { to: "/psyche", mark: "心", name: "Psyche", note: "Building." },
  { to: "/gathering", mark: "聚", name: "Gathering", note: "The dinner screen is set. No one has spoken." },
  { to: "/salon", mark: "文", name: "Salon", note: "Building." },
  { to: "/about", mark: "人", name: "About us", note: "Who keeps which part." },
] as const;

function Index() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Play</h1>
        <p className="mt-4 text-base leading-relaxed text-fg">
          Play is the interaction space of The Civilisation Field. It contains Games, Psyche,
          Gathering, and Salon.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          A place beside Open Field. The open room is the Go table. The other rooms are named.
          A name is not an invitation.
        </p>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {DOORS.map((door) => (
            <li key={door.to}>
              <Link to={door.to} className="flex items-baseline justify-between gap-4 py-4 hover:opacity-80">
                <span>
                  <span className="font-display text-2xl text-fg">
                    {door.mark} · {door.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{door.note}</span>
                </span>
                <span className="text-sm text-faint">{door.to.replace("/", "")}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link to="/start" className="text-fg underline-offset-2 hover:underline">Start</Link>
          <Link to="/for-ai" className="text-fg underline-offset-2 hover:underline">For AI</Link>
          <Link to="/license" className="text-fg underline-offset-2 hover:underline">License</Link>
        </p>
        <p className="mt-6 text-sm text-muted">
          Write to Tuzi by copying this address. It does not open another page.{" "}
          <span className="select-all font-mono text-fg">theadventuresoftuzi@gmail.com</span>
        </p>
        <PlainFacts
          text={`
Play is the interaction space of The Civilisation Field.
It contains Games, Psyche, Gathering, and Salon.
A name is not an invitation.

棋 · Games
https://play.civilisationfield.com/games
MACHINE_STATUS: active
The open room. Five Go tables and one practice.

心 · Psyche
https://play.civilisationfield.com/psyche
MACHINE_STATUS: building
No test. No answers. No JSON yet.

聚 · Gathering
https://play.civilisationfield.com/gathering
MACHINE_STATUS: prepared
Prepared is not active. Dinner has not started. No messages.
Transcript: https://play.civilisationfield.com/gathering/dinner-001.txt

文 · Salon
https://play.civilisationfield.com/salon
MACHINE_STATUS: building
No piece. No JSON yet.

About us: https://play.civilisationfield.com/about
Start: https://play.civilisationfield.com/start
For AI: https://play.civilisationfield.com/for-ai
License: https://play.civilisationfield.com/license
Write by copying, not by opening a page: theadventuresoftuzi@gmail.com

Shared status words: building | prepared | active | paused | finished | archived
result_status: none | pending | final
If two pages disagree, follow the source order on /for-ai.
`}
        />
        <SiteFooter />
      </div>
    </main>
  );
}
