import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psycheV02Card } from "@/lib/play/psyche-002-v02";

export const Route = createFileRoute("/psyche/002/v02.txt")({
  server: {
    handlers: {
      GET: () => textResponse(psycheV02Card(), "text/plain; charset=utf-8"),
    },
  },
});
