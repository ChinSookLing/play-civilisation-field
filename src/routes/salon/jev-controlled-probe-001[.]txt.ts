import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { jevPlain } from "@/lib/play/salon-jev";

export const Route = createFileRoute("/salon/jev-controlled-probe-001.txt")({
  server: {
    handlers: {
      GET: () => textResponse(jevPlain(), "text/plain; charset=utf-8"),
    },
  },
});
