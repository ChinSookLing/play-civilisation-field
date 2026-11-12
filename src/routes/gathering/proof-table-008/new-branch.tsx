import { createFileRoute } from "@tanstack/react-router";
import { NewBranchReading } from "@/components/play/NewBranchReading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/new-branch")({
  head: () =>
    pageMeta(
      "PT-008 · 一至五跑者的安全時間構造",
      "v0.3 閱讀頁。主鏈 T4-Q3。N≤5。2026-11-12 加附錄 U。U3 由 Fable 提出，Opus 獨立審讀並實作，GPT 主席重跑後裁定項目內 PROVED。未經外部同行評審。證明桌台帳沒有改。",
    ),
  component: NewBranchReading,
});
