import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t6Entrance } from "@/lib/play/proof-table-008-t6";

export const Route = createFileRoute("/gathering/proof-table-008/t6.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t6Entrance(), "text/plain; charset=utf-8"),
    },
  },
});
