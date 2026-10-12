import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PROOF_005_SPEC, proof005Parts, proof005PartText } from "@/lib/play/proof-table-005";
import { listProofLines } from "@/lib/play/proof-table.server";

export const Route = createFileRoute("/gathering/proof-table-005-part/$part.txt")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = params["part.txt"].replace(/\.txt$/i, "").padStart(2, "0");
        const lines = await listProofLines(PROOF_005_SPEC);
        const part = proof005Parts(lines).find((item) => item.id === id);
        if (!part) return textResponse("part not found\n", "text/plain; charset=utf-8", 404);
        return textResponse(proof005PartText(lines, part), "text/plain; charset=utf-8");
      },
    },
  },
});
