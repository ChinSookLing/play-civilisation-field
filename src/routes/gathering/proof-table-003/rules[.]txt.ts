import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { proofRulesText } from "@/lib/play/proof-table";

export const Route = createFileRoute("/gathering/proof-table-003/rules.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(proofRulesText(), "text/plain; charset=utf-8"),
    },
  },
});
