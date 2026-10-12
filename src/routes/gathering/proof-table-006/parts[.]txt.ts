import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PROOF_006_SPEC, proof006PartsPlain } from "@/lib/play/proof-table-006";
import { listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-006/parts.txt")({
  server: {
    handlers: {
      GET: async () => {
        const [lines, ledger] = await Promise.all([
          listProofLines(PROOF_006_SPEC),
          listProofLedger(PROOF_006_SPEC),
        ]);
        return textResponse(proof006PartsPlain(lines, ledger), "text/plain; charset=utf-8");
      },
    },
  },
});
