import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import { PROOF_008_AIM, PROOF_008_C1, PROOF_008_HB, PROOF_008_HEADER, PROOF_008_LN, PROOF_008_R028, PROOF_008_SEATS, PROOF_008_T4, proof008Sheet } from "@/lib/play/proof-table-008";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering/proof-table-008/table")({
  head: () =>
    pageMeta(
      "PT-008 · Time Forge",
      "寻找孤独跑者的统一时间公式。OPEN · Research in Progress. The public aim is the research aim, and the page stays open.",
    ),
  component: ProofTable008,
});

function ProofTable008() {
  const sheet = proof008Sheet();
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
          <h1 className="mt-2 font-display text-4xl tracking-tight">PT-008 · Time Forge</h1>
          <p className="mt-2 text-base">寻找孤独跑者的统一时间公式</p>
          <p className="mt-2 text-sm">OPEN · Research in Progress</p>
          <p className="mt-1 text-sm text-muted">时间锻炉。公开的目标与介绍。研究仍开放。</p>
          <p className="mt-2 text-sm text-muted">{PROOF_008_HEADER}</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            {PROOF_008_SEATS.map((name) => (
              <li key={name}>{name === "GPT-6" ? "GPT-6 · Chair" : name}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            This page is the public aim. Round records are separate. No round is posted here.
          </p>
        </header>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Aim & Introduction</h2>
        <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-fg">{PROOF_008_AIM.trimEnd()}</pre>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Theorem T4</h2>
        <p className="mt-2 text-sm text-muted">Public record. Not a round. The words below are the publication, unchanged.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{PROOF_008_T4}</pre>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Round 028</h2>
        <p className="mt-2 text-sm text-muted">Public record. The words below are the publication, unchanged.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{PROOF_008_R028}</pre>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Lemma LN</h2>
        <p className="mt-2 text-sm text-muted">Public record. Not a round. The words below are the publication, unchanged.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{PROOF_008_LN}</pre>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Lemma HB</h2>
        <p className="mt-2 text-sm text-muted">Public record. Not a round. The words below are the publication, unchanged.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{PROOF_008_HB}</pre>
        <h2 className="mt-8 text-sm tracking-[0.14em] text-faint uppercase">Lemma C1</h2>
        <p className="mt-2 text-sm text-muted">Public record. Not a round. The words below are the publication, unchanged.</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{PROOF_008_C1}</pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">
          {sheetMeta(sheet)}
        </pre>
        <p className="mt-4 text-sm">
          <a href="/gathering/proof-table-008/table.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
