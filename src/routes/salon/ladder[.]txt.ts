import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salonPlain } from "@/lib/play/salon-piece";

export const Route = createFileRoute("/salon/ladder.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salonPlain(), "text/plain; charset=utf-8"),
    },
  },
});
