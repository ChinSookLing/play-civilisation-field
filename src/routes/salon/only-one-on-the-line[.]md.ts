import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { salon021Markdown } from "@/lib/play/salon-021";

export const Route = createFileRoute("/salon/only-one-on-the-line.md")({
  server: {
    handlers: {
      GET: () => textResponse(salon021Markdown(), "text/markdown; charset=utf-8"),
    },
  },
});
