import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon012Plain } from "@/lib/play/salon-012";

export const Route = createFileRoute("/salon/summit-flag.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon012Plain(), "text/plain; charset=utf-8"),
    },
  },
});
