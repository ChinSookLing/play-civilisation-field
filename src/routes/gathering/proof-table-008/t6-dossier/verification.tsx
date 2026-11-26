import { createFileRoute } from "@tanstack/react-router";
import { T6DossierReading } from "@/components/play/T6DossierReading";
import { pageMeta } from "@/lib/play/page-meta";

export const Route = createFileRoute("/gathering/proof-table-008/t6-dossier/verification")({
  head: () =>
    pageMeta(
      "PT-008 · 六跑者構造性選時證明檔案",
      "Gathering v0.1。T6 整數核心項目內閉合。選時器 v0.1，依 A49-C02 封版。未經外部同行評審。任意人數通式仍開放。證明桌維持 OPEN。",
    ),
  component: T6DossierReading,
});
