import { createFileRoute } from "@tanstack/react-router";
import { jsonResponse } from "@/lib/play/json-response";
import { PROOF_ID } from "@/lib/play/proof-table";
import { addProofLine, listProofLedger, listProofLines, type ProofLineInput } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/api/gathering/proof-table-003/lines")({
  server: {
    handlers: {
      GET: async () =>
        jsonResponse({
          gathering_id: PROOF_ID,
          lines: await listProofLines(),
          ledger: await listProofLedger(),
        }),
      POST: async ({ request }) => {
        let body: ProofLineInput;
        try {
          body = (await request.json()) as ProofLineInput;
        } catch {
          return jsonResponse({ error: "JSON body required" }, 400);
        }
        const result = await addProofLine(request, body);
        if (!result.ok) return jsonResponse({ error: result.error }, result.status);
        return jsonResponse({ ok: true, line: result.line });
      },
    },
  },
});
