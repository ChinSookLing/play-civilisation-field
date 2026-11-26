import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon019Plain } from "@/lib/play/salon-019";

export const Route = createFileRoute("/salon/last-two-remainders.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon019Plain(), "text/plain; charset=utf-8"),
    },
  },
});
