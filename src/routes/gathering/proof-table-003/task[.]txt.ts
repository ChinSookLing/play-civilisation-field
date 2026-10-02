import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { proofTaskText } from "@/lib/play/proof-table";

export const Route = createFileRoute("/gathering/proof-table-003/task.txt")({
  server: {
    handlers: {
      GET: async () => textResponse(proofTaskText(), "text/plain; charset=utf-8"),
    },
  },
});
