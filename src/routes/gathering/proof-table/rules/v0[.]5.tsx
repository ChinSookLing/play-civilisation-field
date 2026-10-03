import { createFileRoute } from "@tanstack/react-router";
import { RulesView } from "@/components/play/RulesView";
import { pageMeta } from "@/lib/play/page-meta";
import { RULES_V05 } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules/v0.5")({
  head: () => pageMeta("Proof Table rules v0.5", "Permanent address for rules v0.5."),
  component: () => <RulesView version={RULES_V05} />,
});
