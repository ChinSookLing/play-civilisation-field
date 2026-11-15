import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { RESTRUCTURE_DRAFT } from "@/lib/play/restructure-draft";

export const Route = createFileRoute("/draft/restructure.txt")({
  server: {
    handlers: {
      GET: () => textResponse(RESTRUCTURE_DRAFT, "text/plain; charset=utf-8"),
    },
  },
});
