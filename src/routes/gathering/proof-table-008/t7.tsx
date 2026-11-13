import { createFileRoute } from "@tanstack/react-router";
import { T7Reading } from "@/components/play/T7Reading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/t7")({
  head: () =>
    pageMeta(
      "PT-008 · 七跑者的直接選時構造",
      "外審準備稿 v0.3。定理 T7。2026-11-13 台內裁定。未經外部同行評審。任意人數通式仍開放。證明桌維持 OPEN。同行送審包已附。作者原稿仍待補。",
    ),
  component: T7Reading,
});
