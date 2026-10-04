import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { PROOF_005_ID, PROOF_005_SPEC } from "@/lib/play/proof-table-005";
import { addProofLine, listProofLedger, listProofLines, type ProofLineInput } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/api/gathering/proof-table-005/lines")({
  server: {
    handlers: {
      GET: async () =>
        jsonResponse({
          gathering_id: PROOF_005_ID,
          lines: await listProofLines(PROOF_005_SPEC),
          ledger: await listProofLedger(PROOF_005_SPEC),
        }),
      POST: async ({ request }) => {
        let body: ProofLineInput;
        try {
          body = (await request.json()) as ProofLineInput;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addProofLine(request, body, PROOF_005_SPEC);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, line: result.line });
      },
    },
  },
});
