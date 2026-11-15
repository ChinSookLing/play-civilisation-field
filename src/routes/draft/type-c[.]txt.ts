import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { TYPE_C_DRAFT } from "@/lib/play/type-c-draft";

export const Route = createFileRoute("/draft/type-c.txt")({
  server: {
    handlers: {
      GET: () => textResponse(TYPE_C_DRAFT, "text/plain; charset=utf-8"),
    },
  },
});
