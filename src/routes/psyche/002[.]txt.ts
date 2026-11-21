import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psyche002Card } from "@/lib/play/psyche-002";

export const Route = createFileRoute("/psyche/002.txt")({
  server: {
    handlers: {
      GET: () => textResponse(psyche002Card(), "text/plain; charset=utf-8"),
    },
  },
});
