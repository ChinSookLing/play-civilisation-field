import { createFileRoute, Link } from "@tanstack/react-router";
import { pageMeta } from "@/lib/play/page-meta";
import { RULES_V051_TEXT } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules/v0.5.1")({
  head: () => pageMeta("Proof Table rules v0.5.1", "Permanent address for rules v0.5.1."),
  component: RulesV051,
});

function RulesV051() {
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-2xl px-5 py-10">
        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-fg">{RULES_V051_TEXT}</pre>
        <p className="mt-6 text-sm">
          <a href="/gathering/proof-table/rules/v0.5.1.txt" className="text-fg underline decoration-1 underline-offset-4">
            Plain text
          </a>
          <Link to="/gathering/proof-table/rules" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Current rules
          </Link>
        </p>
      </div>
    </main>
  );
}
