import { createFileRoute } from "@tanstack/react-router";
import { textResponse } from "@/lib/play/json-response";
import { turnOnePacket } from "@/lib/play/psyche-001-packet.server";

const SEED = /^[A-Za-z0-9][A-Za-z0-9._-]{0,40}$/;

function freshSeed(): string {
  return `S${Math.floor(Math.random() * 99) + 1}`;
}

export const Route = createFileRoute("/psyche/001/start.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const asked = new URL(request.url).searchParams.get("seed");
        const seed = asked === null || asked === "" ? freshSeed() : asked;
        if (!SEED.test(seed)) {
          return textResponse("Seed not accepted. Use letters and digits, for example S95.\n", "text/plain; charset=utf-8", 400);
        }
        let packet: string;
        try {
          packet = turnOnePacket(seed);
        } catch {
          return textResponse("The turn 1 packet could not be built.\n", "text/plain; charset=utf-8", 500);
        }
        const text = `Polar City Night Shift v0.5.1
Turn 1. No JavaScript. This file is a playable packet.
Reply with one move. The first line is the turn number, a colon, and one letter.
1: A
COMMENT: optional, up to 280 characters
Letters: A, B, C, or P. D only when the packet lists it.
No score. No ranking.
A wall comment is not a move. After the night, POST it to /psyche/001/comment with player, comment, replay, version, and consent=yes if it may be posted. That holds it for review. It does not post it.

${packet}
`;
        return textResponse(text, "text/plain; charset=utf-8");
      },
    },
  },
});
