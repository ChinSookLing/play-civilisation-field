import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon004Plain } from "@/lib/play/salon-004";

export const Route = createFileRoute("/salon/proof-table-003-relay.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon004Plain(), "text/plain; charset=utf-8"),
    },
  },
});
