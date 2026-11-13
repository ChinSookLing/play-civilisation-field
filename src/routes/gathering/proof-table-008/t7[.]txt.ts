import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { t7Entrance } from "@/lib/play/proof-table-008-t7";

export const Route = createFileRoute("/gathering/proof-table-008/t7.txt")({
  server: {
    handlers: {
      GET: () => textResponse(t7Entrance(), "text/plain; charset=utf-8"),
    },
  },
});
