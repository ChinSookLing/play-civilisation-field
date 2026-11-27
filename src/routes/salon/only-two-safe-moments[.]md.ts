import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon020Markdown } from "@/lib/play/salon-020";

export const Route = createFileRoute("/salon/only-two-safe-moments.md")({
  server: {
    handlers: {
      GET: () => textResponse(salon020Markdown(), "text/markdown; charset=utf-8"),
    },
  },
});
