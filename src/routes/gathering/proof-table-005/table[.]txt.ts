import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PROOF_005_SPEC, proof005Plain } from "@/lib/play/proof-table-005";
import { listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-005/table.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [lines, ledger] = await Promise.all([
          listProofLines(PROOF_005_SPEC),
          listProofLedger(PROOF_005_SPEC),
        ]);
        return textResponse(proof005Plain(lines, ledger), "text/plain; charset=utf-8");
      },
    },
  },
});
