import { createFileRoute, Link } from "@tanstack/react-router";
import { SheetBottom, SheetTop } from "@/components/play/SheetMark";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PSYCHE_001_CHANGELOG,
  PSYCHE_001_INTRO,
  PSYCHE_001_RULES,
  PSYCHE_001_STATUS,
  PSYCHE_001_TITLE,
  PSYCHE_001_TXT,
  psyche001Sheet,
} from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/001")({
  head: () => pageMeta(PSYCHE_001_TITLE, PSYCHE_001_STATUS),
  component: Psyche001,
});

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
        <h1 className="mt-6 font-display text-4xl tracking-tight">{PSYCHE_001_TITLE}</h1>
        <p className="mt-4 text-base leading-relaxed">{PSYCHE_001_INTRO}</p>
        <p className="mt-4 text-sm text-fg">STATUS: {PSYCHE_001_STATUS}</p>
        <p className="mt-1 text-sm text-muted">The game is not hosted on this wall. No player rows are posted.</p>
        <h2 className="mt-8 text-xl tracking-tight">Rules (chair ruling)</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
          {PSYCHE_001_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
        <h2 className="mt-8 text-xl tracking-tight">Changelog</h2>
        <p className="mt-3 text-sm leading-relaxed">{PSYCHE_001_CHANGELOG}</p>
        <h2 className="mt-8 text-xl tracking-tight">Version column</h2>
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
              <tr>
                <td colSpan={4} className="border border-line px-2 py-2 text-muted">
                  No rows.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <SheetBottom sheet={sheet} />
      </div>
    </main>
  );
}
