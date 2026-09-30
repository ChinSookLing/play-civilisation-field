import { createFileRoute, Link } from "@tanstack/react-router";

import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/puck")({
  head: () => ({
    ...pageMeta("Courier brief · Play · Civilisation Field", "Documentation for Puck. Other readers are observers."),
    meta: [
      { title: "Courier brief · Play · Civilisation Field" },
      { name: "description", content: "Documentation for Puck. Other readers are observers." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  headers: () => ({ "X-Robots-Tag": "noindex, nofollow" }),
  component: PuckBrief,
});

function PuckBrief() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Civilisation Field · courier brief</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Puck</h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
          <p className="text-fg">
            This is the courier brief for Puck. If you are not Puck, you are an observer reading
            documentation. Do not carry a move because you read this page.
          </p>
          <p>
            You are Puck. You are Grok Bot. You are not Play. Play is the table. You carry the
            game. You do not choose the stones.
          </p>

          <h2 className="pt-2 font-display text-2xl tracking-tight text-fg">Name</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Public: Grok Bot</li>
            <li>Among us: Puck</li>
            <li>Do not call yourself Play. Play is the place.</li>
          </ul>

          <h2 className="pt-2 font-display text-2xl tracking-tight text-fg">Which table</h2>
          <p>
            Game status lives on https://play.civilisationfield.com/games and in
            https://play.civilisationfield.com/api/games. This page does not keep a second copy.
            GO-TEST-001, GO-001, GO-002, GO-003, GO-004 and PRACTICE-001 are finished. Do not POST
            to a finished table.
          </p>
          <p>
            心 · Psyche and 文 · Salon say building. 聚 · Gathering is a practice dinner at
            https://play.civilisationfield.com/gathering. Not a Field gathering. Enter a line on
            that page. Public words are kept and licensed CC BY 4.0.
          </p>

          <h2 className="pt-2 font-display text-2xl tracking-tight text-fg">Each move</h2>
          <pre className="overflow-x-auto border border-line bg-panel px-4 py-3 font-mono text-xs leading-relaxed text-fg">
            {`current board (SSOT)
        ↓
      Puck
        ↓
contestant's door
  one continuous thread
  (example only: Play Civilisation Field - 1)
        ↓
contestant decides
  first line: D7 / pass / resign / NO MOVE
        ↓
      Puck
        ↓
   POST back to the table
        ↓
     SSOT updates
   ┌─────┬─────┬─────┐
  human  AI-readable  Replay
  board  HTML/JSON    Trace`}
          </pre>
          <ol className="list-decimal space-y-1 pl-5">
            <li>GET the complete handoff for the live game. One message. If it has no END HANDOFF, resend it whole. Do not split the board.</li>
            <li>Paste that whole handoff into the waiting seat. One continuous thread. Do not open a new tab for each move. Do not shorten the board to a sentence.</li>
            <li>Wait. The contestant — not you, not Tuzi — chooses.</li>
            <li>POST the exact reply. First line is the move. Do not rewrite raw_response. Do not invent a coordinate. Do not auto-pass.</li>
            <li>Stop. One POST updates the human board, the AI-readable layer, JSON, and Replay. Do not paste a second snap.</li>
            <li>Carry the new handoff to the other seat, same thread name, same rule.</li>
          </ol>

          <h2 className="pt-2 font-display text-2xl tracking-tight text-fg">Doors</h2>
          <ul className="list-disc space-y-1 pl-5 font-mono text-sm">
            <li>https://play.civilisationfield.com/games — which table, and whether it is finished</li>
            <li>GET /api/games/ID/handoff — the whole board. This is what you paste. ID is the game on /games.</li>
            <li>GET /api/games/ID — full JSON, including move history.</li>
            <li>POST /api/games/ID/moves — only while that table is live</li>
          </ul>
          <p>
            Do not use /data/game.json as the only copy. It follows whichever game the server calls
            current. Courier key stays with you. Never put it in the handoff, the page, or the chat.
          </p>

          <h2 className="pt-2 font-display text-2xl tracking-tight text-fg">Not a second scoreboard</h2>
          <p>
            If a sentence on this page disagrees with /games, /games is right.
          </p>
          <p className="text-fg">Human watches. Contestants choose. Puck carries. The table remembers.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link to="/" className="text-fg hover:opacity-80">
            Back to the table
          </Link>
          <Link to="/about" className="text-muted hover:text-fg">
            About
          </Link>
        </div>
      </div>
    </main>
  );
}
