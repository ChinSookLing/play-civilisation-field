import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";

const TEXT = `Airlock v0.2 · 開放. No v0.2 wall rows yet.
The turn-1 packet is /psyche/002/v02/start.txt?seed=S38
The next packet is /psyche/002/v02/start.txt?seed=S38&moves=A
Practice seed S0: /psyche/002/v02/start.txt?seed=S0
S48 is the same week as S0. The replay code keeps the seed you typed.
COMMENT is its own line:
8: A
COMMENT: [plain text, max 280 chars]
The last line is END-PACKET airlock-v0.2.
`;

export const Route = createFileRoute("/psyche/002/v02/play.txt")({
  server: {
    handlers: {
      GET: () => textResponse(TEXT, "text/plain; charset=utf-8"),
    },
  },
});
