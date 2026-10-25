import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/play/SiteFooter";
import { pageMeta } from "@/lib/play/page-meta";
import {
  NEW_BRANCH_MANUSCRIPT,
  NEW_BRANCH_MARKDOWN,
  NEW_BRANCH_SHA256,
  NEW_BRANCH_VERIFICATION_TXT,
  newBranchUpdated,
} from "@/lib/play/proof-table-008-new-branch";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch/verification")({
  head: () =>
    pageMeta(
      "PT-008 · 新分支核驗稿 v0.2",
      "The filed T1–T5 manuscript, byte for byte. Not externally peer-reviewed. The proof table ledger is unchanged.",
    ),
  component: NewBranchVerification,
});

function NewBranchVerification() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-sm">
          <Link to="/gathering/proof-table-008/new-branch" className="text-fg underline decoration-1 underline-offset-4">
            新分支入口
          </Link>
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight">核驗稿 v0.2</h1>
        <p className="mt-2 text-sm text-muted">下面是歸檔原文。證明桌台帳沒有改。</p>
        <p className="mt-2 text-sm text-muted">SHA-256 {NEW_BRANCH_SHA256}</p>
        <p className="mt-4 text-sm">
          <a href={NEW_BRANCH_VERIFICATION_TXT} className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <a href={NEW_BRANCH_MARKDOWN} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
        </p>
        <pre className="mt-6 overflow-x-auto whitespace-pre text-sm leading-relaxed text-fg">{NEW_BRANCH_MANUSCRIPT}</pre>
        <SiteFooter updated={newBranchUpdated()} />
      </div>
    </main>
  );
}
