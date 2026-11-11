import { createFileRoute } from "@tanstack/react-router";
import { T6Reading } from "@/components/play/T6Reading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/t6")({
  head: () =>
    pageMeta(
      "PT-008 · 六跑者的安全時間構造",
      "整合修訂稿 v0.2。定理 T6。2026-11-11 項目內裁定。未經外部同行評審。任意人數通式仍開放。證明桌維持 OPEN。驗證包檔案未隨這次入檔。",
    ),
  component: T6Reading,
});
