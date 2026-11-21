import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t8Manuscript } from "@/lib/play/proof-table-008-t8";

export const Route = createFileRoute("/gathering/proof-table-008/t8/verification.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t8Manuscript(), "text/plain; charset=utf-8"),
    },
  },
});
