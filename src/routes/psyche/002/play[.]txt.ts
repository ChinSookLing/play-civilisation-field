import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PSYCHE_002_RULES, PSYCHE_002_TITLE } from "@/lib/play/psyche-002";

const TEXT = `${PSYCHE_002_TITLE}
STATUS: airlock-v0.1 · preview. Not open.
No score. No right answer.
The turn-1 packet is /psyche/002/start.txt?seed=S1
Chinese: add &lang=zh
P = PASS. A letter that is not offered is NO MOVE.

RULES:
${PSYCHE_002_RULES.map((rule, index) => `${index + 1}. ${rule}`).join("\n")}
`;

export const Route = createFileRoute("/psyche/002/play.txt")({
  server: {
    handlers: {
      GET: () => textResponse(TEXT, "text/plain; charset=utf-8"),
    },
  },
});
