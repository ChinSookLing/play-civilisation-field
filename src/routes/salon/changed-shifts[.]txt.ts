import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon009Plain } from "@/lib/play/salon-009";

export const Route = createFileRoute("/salon/changed-shifts.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon009Plain(), "text/plain; charset=utf-8"),
    },
  },
});
