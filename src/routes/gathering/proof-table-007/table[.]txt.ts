import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { proof007Plain } from "@/lib/play/proof-table-007";

export const Route = createFileRoute("/gathering/proof-table-007/table.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(proof007Plain(), "text/plain; charset=utf-8"),
    },
  },
});
