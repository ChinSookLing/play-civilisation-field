import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t7C45Plain } from "@/lib/play/proof-table-008-t7-c45";

export const Route = createFileRoute("/gathering/proof-table-008/t7-c45.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t7C45Plain(), "text/plain; charset=utf-8"),
    },
  },
});
