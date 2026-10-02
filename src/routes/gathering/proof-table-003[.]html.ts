import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { proofTranscript } from "@/lib/play/proof-table";
import { listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-003.html")({
  server: {
    handlers: {
      GET: async () => {
        const [lines, ledger] = await Promise.all([listProofLines(), listProofLedger()]);
        return textResponse(
          htmlMirror({
            title: "Together · Proof Table 003",
            description: "Plain reading of Proof Table 003. Same words as the txt. No answer key.",
            textUrl: "https://play.civilisationfield.com/gathering/proof-table-003.txt",
            text: proofTranscript(lines, ledger),
            also: [{ href: "/gathering/proof-table-003/table", label: "Table" }],
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
