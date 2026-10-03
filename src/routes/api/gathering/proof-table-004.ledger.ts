import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { PROOF_004_ID, PROOF_004_LEDGER_V1, PROOF_004_SPEC } from "@/lib/play/proof-table-004";
import {
  addProofLedger,
  ensureOpeningLedger,
  listProofLedger,
  type ProofLedgerInput,
} from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/api/gathering/proof-table-004/ledger")({
  server: {
    handlers: {
      GET: async () => {
        await ensureOpeningLedger(PROOF_004_SPEC, PROOF_004_LEDGER_V1);
        return jsonResponse({ gathering_id: PROOF_004_ID, ledger: await listProofLedger(PROOF_004_SPEC) });
      },
      POST: async ({ request }) => {
        let body: ProofLedgerInput;
        try {
          body = (await request.json()) as ProofLedgerInput;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addProofLedger(request, body, PROOF_004_SPEC);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, ledger: result.ledger });
      },
    },
  },
});
