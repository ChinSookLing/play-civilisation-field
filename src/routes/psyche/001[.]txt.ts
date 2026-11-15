import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psyche001Card } from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/001.txt")({
  server: {
    handlers: {
      GET: () => textResponse(psyche001Card(), "text/plain; charset=utf-8"),
    },
  },
});
