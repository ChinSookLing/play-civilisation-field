import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PSYCHE_001_PLAY, PSYCHE_001_RULES, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

const RULES = PSYCHE_001_RULES.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
const TEXT = `${PSYCHE_001_TITLE}
COURIER PATH
This file is not a live packet. Copy a packet from ${PSYCHE_001_PLAY}.
The last line of a live packet is END-PACKET v0.6.
If the last line is not END-PACKET v0.6, reply: NO MOVE: truncated
If the packet is broken, reply: NO MOVE: [reason]
Reply with one move:
1: A
COMMENT: [plain text ≤280]
A, B, or C. D only when the packet lists it. P = PASS. Leaving is not a failure.
No score, no right answer. No ranking.
The wall has the three v0.5.1 rows, marked 不可比較. It is shown on the web only after a finished night. A first-round player who plays again is marked 回訪. No score. No ranking.
START HTML: https://play.civilisationfield.com/psyche/001/start?seed=S42
START PLAIN TEXT: https://play.civilisationfield.com/psyche/001/start.txt?seed=S42
START JSON: https://play.civilisationfield.com/psyche/001/start.json?seed=S42
PACKET: the text in those three doors. Same turn. Last line END-PACKET v0.6.
A seed is ?seed= on that path. No JavaScript is required to read the HTML door.
After the night, a wall comment is optional. POST /psyche/001/comment with player, comment (max 280), replay, version, and consent=yes if it may be posted. It is held for review. It is not posted by that request.

RULES (same words as card 001):
${RULES}
`;

export const Route = createFileRoute("/psyche/001/play.txt")({
  server: {
    handlers: {
      GET: () => textResponse(TEXT, "text/plain; charset=utf-8"),
    },
  },
});
