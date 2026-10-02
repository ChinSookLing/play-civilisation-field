import { createFileRoute } from "@tanstack/react-router";
import { htmlMirror } from "@/lib/play/html-mirror";
import { textResponse } from "@/lib/play/json-response";
import { proofTranscript } from "@/lib/play/proof-table";
import { listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-001.html")({
  server: {
    handlers: {
      GET: async () => {
        const [lines, ledger] = await Promise.all([listProofLines(), listProofLedger()]);
        return textResponse(
          htmlMirror({
            title: "Together · Proof Table 001",
            description: "Plain reading of Proof Table 001. Same words as the txt. No answer key.",
            textUrl: "https://play.civilisationfield.com/gathering/proof-table-001.txt",
            text: proofTranscript(lines, ledger),
            also: [{ href: "/gathering/proof-table-001/table", label: "Table" }],
          }),
          "text/html; charset=utf-8",
        );
      },
    },
  },
});
