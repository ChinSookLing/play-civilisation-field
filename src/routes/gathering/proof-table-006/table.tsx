import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { loadProof006Fn } from "@/lib/play/load";
import { pageMeta } from "@/lib/play/page-meta";
import {
  PROOF_006_HEADER,
  PROOF_006_SEATS,
  proof006Record,
  proof006Sheet,
} from "@/lib/play/proof-table-006";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering/proof-table-006/table")({
  head: () =>
    pageMeta(
      "Proof Table 006 · Lonely Circle",
      "Together · Proof Table 006. One ticked speed picture. Prepared until the opening line is posted.",
    ),
  loader: () => loadProof006Fn(),
  component: ProofTable006,
});

function ProofTable006() {
  const { lines, ledger } = Route.useLoaderData();
  const sheet = proof006Sheet(lines, ledger);
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">
          {sheetLabel(sheet)}
        </pre>
        <header className="mt-6">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">Play · 聚</p>
          <p className="mt-2 text-sm">
            <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
              All gatherings
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Together · Proof Table 006</h1>
          <p className="mt-2 text-base">孤圈 · Lonely Circle</p>
          <p className="mt-1 text-sm text-muted">
            One ticked speed picture on one shared t. Not every speed tuple.
          </p>
          <p className="mt-2 text-sm text-muted">{PROOF_006_HEADER}</p>
          <p className="mt-3 text-sm">
            <Link
              to="/gathering/proof-table/rules/v0.5.1"
              className="text-fg underline decoration-1 underline-offset-4"
            >
              Rules v0.5.1
            </Link>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            {PROOF_006_SEATS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </header>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">
          {proof006Record(lines, ledger)}
        </pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">
          {sheetMeta(sheet)}
        </pre>
        <p className="mt-4 text-sm">
          <a
            href="/gathering/proof-table-006/table.txt"
            className="text-fg underline decoration-1 underline-offset-4"
          >
            Plain text
          </a>
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
