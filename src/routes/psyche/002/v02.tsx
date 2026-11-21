import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { psycheV02PageHtml } from "@/lib/play/psyche-002-v02";

export const Route = createFileRoute("/psyche/002/v02")({
  server: {
    handlers: {
      GET: () => textResponse(psycheV02PageHtml(), "text/html; charset=utf-8"),
    },
  },
});
