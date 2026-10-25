import { createFileRoute } from "@tanstack/react-router";
import { NewBranchReading } from "@/components/play/NewBranchReading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch/verification")({
  head: () =>
    pageMeta(
      "PT-008 · 一至五跑者的安全時間構造",
      "v0.3 閱讀頁。主鏈 T4-Q3。N≤5。全文、公式、表格與程式都在這頁。大壓力測試補報已收入。未經外部同行評審。證明桌台帳沒有改。",
    ),
  component: NewBranchReading,
});
