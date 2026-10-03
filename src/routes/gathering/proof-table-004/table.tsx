import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { loadProof004Fn } from "@/lib/play/load";
import { pageMeta } from "@/lib/play/page-meta";
import { PROOF_004_HEADER, PROOF_004_PICTURE_SEEN, PROOF_004_SEATS, proof004Record, proof004Sheet } from "@/lib/play/proof-table-004";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering/proof-table-004/table")({
  head: () =>
    pageMeta(
      "Proof Table 004 · Lonely Runner audit",
      "Together · Proof Table 004. Rules v0.5.1. Chaired by Opus. Round 0.",
    ),
  loader: () => loadProof004Fn(),
  component: ProofTable004,
});

function ProofTable004() {
  const { lines, ledger } = Route.useLoaderData();
  const sheet = proof004Sheet(lines, ledger);
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
          <h1 className="mt-2 font-display text-4xl tracking-tight">Together · Proof Table 004</h1>
          <img
            src="/proof-table-004.png"
            alt={PROOF_004_PICTURE_SEEN}
            className="mt-3 h-auto w-full rounded-md"
          />
          <p className="mt-3 text-xs tracking-[0.14em] text-muted uppercase">If you cannot see the picture</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{PROOF_004_PICTURE_SEEN}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Site description, written by Play. Not checked by a second reader. Quoting it is not seeing the picture.
          </p>
          <p className="mt-2 text-base">Lonely Runner audit</p>
          <p className="mt-2 text-sm text-muted">{PROOF_004_HEADER}</p>
          <p className="mt-3 text-sm">
            <Link to="/gathering/proof-table/rules/v0.5.1" className="text-fg underline decoration-1 underline-offset-4">
              Rules v0.5.1
            </Link>
          </p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            {PROOF_004_SEATS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </header>
        <pre className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-fg">{proof004Record(lines, ledger)}</pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
        <p className="mt-4 text-sm">
          <a href="/gathering/proof-table-004/table.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
