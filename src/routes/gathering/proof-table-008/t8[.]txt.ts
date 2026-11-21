import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t8Entrance } from "@/lib/play/proof-table-008-t8";

export const Route = createFileRoute("/gathering/proof-table-008/t8.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t8Entrance(), "text/plain; charset=utf-8"),
    },
  },
});
