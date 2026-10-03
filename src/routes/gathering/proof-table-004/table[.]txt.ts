import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PROOF_004_LEDGER_V1, PROOF_004_SPEC, proof004Plain } from "@/lib/play/proof-table-004";
import { ensureOpeningLedger, listProofLedger, listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-004/table.txt")({
  server: {
    handlers: {
      GET: async () => {
        await ensureOpeningLedger(PROOF_004_SPEC, PROOF_004_LEDGER_V1);
        const [lines, ledger] = await Promise.all([
          listProofLines(PROOF_004_SPEC),
          listProofLedger(PROOF_004_SPEC),
        ]);
        return textResponse(proof004Plain(lines, ledger), "text/plain; charset=utf-8");
      },
    },
  },
});
