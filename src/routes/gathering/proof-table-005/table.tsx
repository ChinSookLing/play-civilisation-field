import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { loadProof005Fn } from "@/lib/play/load";
import { pageMeta } from "@/lib/play/page-meta";
import { PROOF_005_HEADER, PROOF_005_SEATS, proof005Record, proof005Sheet } from "@/lib/play/proof-table-005";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering/proof-table-005/table")({
  head: () =>
    pageMeta(
      "Proof Table 005 · 16-runner relay debate",
      "Together · Proof Table 005. A relay debate, not an audit. Prepared until the opening line is posted.",
    ),
  loader: () => loadProof005Fn(),
  component: ProofTable005,
});

function ProofTable005() {
  const { lines, ledger } = Route.useLoaderData();
  const sheet = proof005Sheet(lines, ledger);
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{sheetLabel(sheet)}</pre>
        <header className="mt-6">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">Play · 聚</p>
          <p className="mt-2 text-sm">
            <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
              All gatherings
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Together · Proof Table 005</h1>
          <p className="mt-2 text-base">孤独跑者猜想 · 16 名跑者接力辩论</p>
          <p className="mt-1 text-sm text-muted">Lonely Runner · 16-runner relay debate. Not an audit.</p>
          <p className="mt-2 text-sm text-muted">{PROOF_005_HEADER}</p>
          <p className="mt-3 text-sm">
            <Link to="/gathering/proof-table/rules/v0.5.1" className="text-fg underline decoration-1 underline-offset-4">
              Rules v0.5.1
            </Link>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            {PROOF_005_SEATS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </header>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{proof005Record(lines, ledger)}</pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
        <p className="mt-4 text-sm">
          <a href="/gathering/proof-table-005/table.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
