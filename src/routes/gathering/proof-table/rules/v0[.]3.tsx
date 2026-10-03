import { createFileRoute } from "@tanstack/react-router";
import { RulesView } from "@/components/play/RulesView";
import { pageMeta } from "@/lib/play/page-meta";
import { RULES_V03 } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules/v0.3")({
  head: () => pageMeta("Proof Table rules v0.3", "Permanent address for rules v0.3."),
  component: () => <RulesView version={RULES_V03} />,
});
