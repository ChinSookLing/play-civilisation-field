import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { proofRulesText } from "@/lib/play/proof-table";

export const Route = createFileRoute("/gathering/proof-table-001/rules.html")({
  server: {
    handlers: {
      GET: async () =>
        textResponse(
          htmlMirror({
            title: "Together · Proof Table 001 · Rules v0.3",
            description: "Rules v0.3 as adopted. Same words as the txt.",
            textUrl: "https://play.civilisationfield.com/gathering/proof-table-001/rules.txt",
            text: proofRulesText(),
            also: [{ href: "/gathering/proof-table-001/rules", label: "Rules" }],
          }),
          "text/html; charset=utf-8",
        ),
    },
  },
});
