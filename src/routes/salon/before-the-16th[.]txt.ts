import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon014Plain } from "@/lib/play/salon-014";

export const Route = createFileRoute("/salon/before-the-16th.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon014Plain(), "text/plain; charset=utf-8"),
    },
  },
});
