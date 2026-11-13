import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t7Manuscript } from "@/lib/play/proof-table-008-t7";

export const Route = createFileRoute("/gathering/proof-table-008/t7/verification.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t7Manuscript(), "text/plain; charset=utf-8"),
    },
  },
});
