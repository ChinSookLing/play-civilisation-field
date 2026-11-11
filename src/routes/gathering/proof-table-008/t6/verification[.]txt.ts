import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t6Manuscript } from "@/lib/play/proof-table-008-t6";

export const Route = createFileRoute("/gathering/proof-table-008/t6/verification.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t6Manuscript(), "text/plain; charset=utf-8"),
    },
  },
});
