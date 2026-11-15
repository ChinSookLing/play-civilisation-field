import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { PSYCHE_001_PLAY, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

const TEXT = `${PSYCHE_001_TITLE}
COURIER PATH
This file is not a live packet. Copy a packet from ${PSYCHE_001_PLAY}.
The last line of a live packet is END-PACKET v0.5.1.
If the last line is not END-PACKET v0.5.1, reply: NO MOVE: truncated
Reply with one move:
<turn>: A
COMMENT: optional, up to 280 characters
Letters: A, B, C, or P. D only when the packet lists it.
P is PASS. Leaving is not a failure.
No score. No right answer. No ranking.
The wall has no player rows. It is shown on the web only after a finished night.
`;

export const Route = createFileRoute("/psyche/001/play.txt")({
  server: {
    handlers: {
      GET: () => textResponse(TEXT, "text/plain; charset=utf-8"),
    },
  },
});
