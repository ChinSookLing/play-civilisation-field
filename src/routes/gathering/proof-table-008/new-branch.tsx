import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  NEW_BRANCH_ENTRANCE,
  NEW_BRANCH_MARKDOWN,
  NEW_BRANCH_SHA256,
  NEW_BRANCH_VERIFICATION,
  NEW_BRANCH_VERIFICATION_TXT,
  newBranchUpdated,
} from "@/lib/play/proof-table-008-new-branch";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch")({
  head: () =>
    pageMeta(
      "PT-008 · Time Forge · 新分支",
      "Filed v0.2. The chain is T4-Q3, not the old eight-branch T4. N≤5. The one formula for every number of runners is unfinished. The proof table ledger is unchanged.",
    ),
  component: NewBranchEntrance,
});

function NewBranchEntrance() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
            聚 · Gathering
          </Link>
          <Link to="/gathering/proof-table-008/table" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            PT-008 table
          </Link>
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight">PT-008 · 新分支</h1>
        <p className="mt-2 text-sm text-muted">T4-Q3。不是舊公開八分支。證明桌台帳沒有改。</p>
        <pre className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-fg">{NEW_BRANCH_ENTRANCE}</pre>
        <p className="mt-6 text-sm">
          <a href={NEW_BRANCH_VERIFICATION} className="text-fg underline decoration-1 underline-offset-4">
            完整核驗稿
          </a>
          <a href={NEW_BRANCH_VERIFICATION_TXT} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={NEW_BRANCH_MARKDOWN} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
        </p>
        <p className="mt-2 text-sm text-muted">SHA-256 {NEW_BRANCH_SHA256}</p>
        <SiteFooter updated={newBranchUpdated()} />
      </div>
    </main>
  );
}
