import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { RULES_V051, rulesPlain } from "@/lib/play/proof-rules";

export const Route = createFileRoute("/gathering/proof-table/rules.txt")({
  server: {
    handlers: {
      GET: () => textResponse(rulesPlain(RULES_V051, true), "text/plain; charset=utf-8"),
    },
  },
});
