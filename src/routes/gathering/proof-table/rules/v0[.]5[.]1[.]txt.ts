import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { RULES_V051_TEXT } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules/v0.5.1.txt")({
  server: {
    handlers: {
      GET: () => textResponse(RULES_V051_TEXT, "text/plain; charset=utf-8"),
    },
  },
});
