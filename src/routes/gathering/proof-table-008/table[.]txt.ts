import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { proof008Plain } from "@/lib/play/proof-table-008";

export const Route = createFileRoute("/gathering/proof-table-008/table.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(proof008Plain(), "text/plain; charset=utf-8"),
    },
  },
});
