import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { PROOF_ID } from "@/lib/play/proof-table";
import { addProofLedger, listProofLedger, type ProofLedgerInput } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/api/gathering/proof-table-001/ledger")({
  server: {
    handlers: {
      GET: async () => jsonResponse({ gathering_id: PROOF_ID, ledger: await listProofLedger() }),
      POST: async ({ request }) => {
        let body: ProofLedgerInput;
        try {
          body = (await request.json()) as ProofLedgerInput;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addProofLedger(request, body);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, ledger: result.ledger });
      },
    },
  },
});
