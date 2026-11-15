import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon015Plain } from "@/lib/play/salon-015";

export const Route = createFileRoute("/salon/night-shift.txt")({
  server: {
    handlers: {
      GET: () => textResponse(salon015Plain(), "text/plain; charset=utf-8"),
    },
  },
});
