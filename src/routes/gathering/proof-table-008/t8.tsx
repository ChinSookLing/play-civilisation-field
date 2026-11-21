import { createFileRoute } from "@tanstack/react-router";
import { T8Reading } from "@/components/play/T8Reading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/t8")({
  head: () =>
    pageMeta(
      "PT-008 · 八跑者構造性選時證明檔案",
      "Gathering v0.7 歸檔草稿。項目級 T8 CLOSED 只記整數核心。不是自足論文。未經外部同行評審。任意人數通式仍開放。證明桌維持 OPEN。",
    ),
  component: T8Reading,
});
