import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PROOF_006_SPEC, proof006Parts, proof006PartText } from "@/lib/play/proof-table-006";
import { listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-006-part/$part.txt")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params["part.txt"].replace(/\.txt$/i, "").padStart(2, "0");
        const lines = await listProofLines(PROOF_006_SPEC);
        const part = proof006Parts(lines).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(proof006PartText(lines, part), "text/plain; charset=utf-8");
      },
    },
  },
});
