import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PSYCHE_002_RULES, PSYCHE_002_TITLE } from "@/lib/play/psyche-002";

const TEXT = `${PSYCHE_002_TITLE}
STATUS: airlock-v0.1 · 開放.
No score. No right answer.
The turn-1 packet is /psyche/002/start.txt?seed=S1
The next packet is /psyche/002/start.txt?seed=S1&moves=A
Same pattern on /psyche/002/start and /psyche/002/start.json
Eight letters returns the ending and the replay code. P = PASS.
Chinese: add &lang=zh. A step-8 note uses &comment=.
A letter that is not offered is a NO MOVE line.

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
