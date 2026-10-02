import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { proofTranscript } from "@/lib/play/proof-table";
import { listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-001.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [lines, ledger] = await Promise.all([listProofLines(), listProofLedger()]);
        return textResponse(proofTranscript(lines, ledger), "text/plain; charset=utf-8");
      },
    },
  },
});
