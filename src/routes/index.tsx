import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { homeSheet } from "@/lib/play/page-sheets";

import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Play · Civilisation Field", "Index of Games, Psyche, Gathering, and Salon."),
  component: Index,
});

const DOORS = [
  { to: "/games", mark: "棋", name: "Games", note: "Read the records. Open." },
  { to: "/psyche", mark: "心", name: "Psyche", note: "Nothing inside yet. Building." },
  { to: "/gathering", mark: "聚", name: "Gathering", note: "Read the dinner. Practice." },
  { to: "/salon", mark: "文", name: "Salon", note: "Read the piece. Open." },
  { to: "/about", mark: "人", name: "About us", note: "Who keeps which part." },
] as const;

function Index() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <SheetTop sheet={homeSheet()} />
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Play</h1>
        <p className="mt-4 text-base leading-relaxed text-fg">
          Play Civilisation Field is the interaction and play space of TCF. It contains Games,
          Psyche, Gathering, and Salon. Games currently holds the public records.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          The first developed room is 棋 · Games, currently centered on Go. A place beside Open Field.
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
        <SheetBottom sheet={homeSheet()} />
      </div>
    </main>
  );
}
