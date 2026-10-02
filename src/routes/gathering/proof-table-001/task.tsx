import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import { PROOF_TASK, proofTaskSheet } from "@/lib/play/proof-table";
import { sheetLabel, sheetMeta } from "@/lib/play/sheet";

export const Route = createFileRoute("/gathering/proof-table-001/task")({
  head: () => pageMeta("Proof Table 001 · Task R1 · Play", "Task block PT001-TASK-R1. No answer key."),
  component: TaskPage,
});

function TaskPage() {
  const sheet = proofTaskSheet();
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{sheetLabel(sheet)}</pre>
        <header className="mt-6">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">Play · 聚</p>
          <p className="mt-2 text-sm">
            <Link to="/gathering/proof-table-001/table" className="text-fg underline decoration-1 underline-offset-4">
              Table
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">PT001-TASK-R1</h1>
          <p className="mt-2 text-sm text-muted">The block below is the task as given.</p>
        </header>
        <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-fg">{PROOF_TASK.trimEnd()}</pre>
        <pre className="mt-8 whitespace-pre-wrap border-t border-line pt-6 text-sm leading-relaxed text-fg">{sheetMeta(sheet)}</pre>
        <p className="mt-4 text-sm">
          <a href="/gathering/proof-table-001/task.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href="/gathering/proof-table-001/task.html" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Light reading
          </a>
        </p>
        <SiteFooter updated={sheet.asOf} />
      </div>
    </main>
  );
}
