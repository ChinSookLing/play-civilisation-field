import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { RULES_V03, rulesPlain } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules/v0.3.txt")({
  server: {
    handlers: {
      GET: () => textResponse(rulesPlain(RULES_V03), "text/plain; charset=utf-8"),
    },
  },
});
