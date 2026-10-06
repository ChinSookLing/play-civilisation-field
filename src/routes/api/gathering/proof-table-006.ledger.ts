import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { PROOF_006_ID, PROOF_006_SPEC } from "@/lib/play/proof-table-006";
import {
  addProofLedger,
  listProofLedger,
  type ProofLedgerInput,
} from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/api/gathering/proof-table-006/ledger")({
  server: {
    handlers: {
      GET: async () =>
        jsonResponse({ gathering_id: PROOF_006_ID, ledger: await listProofLedger(PROOF_006_SPEC) }),
      POST: async ({ request }) => {
        let body: ProofLedgerInput;
        try {
          body = (await request.json()) as ProofLedgerInput;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addProofLedger(request, body, PROOF_006_SPEC);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, ledger: result.ledger });
      },
    },
  },
});
