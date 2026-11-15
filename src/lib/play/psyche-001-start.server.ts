import { turnOnePacket } from "./psyche-001-packet.server";

const SEED = /^[A-Za-z0-9][A-Za-z0-9._-]{0,40}$/;

export function freshSeed(): string {
  return `S${Math.floor(Math.random() * 99) + 1}`;
}

export function startSeed(request: Request): { seed: string } | { error: string } {
  const asked = new URL(request.url).searchParams.get("seed");
  const seed = asked === null || asked === "" ? freshSeed() : asked;
  if (!SEED.test(seed)) return { error: "Seed not accepted. Use letters and digits, for example S95.\n" };
  return { seed };
}

/** Same words as start.txt. The last line is END-PACKET v0.5.1. */
export function startDocument(seed: string): string {
  const packet = turnOnePacket(seed);
  return `Polar City Night Shift v0.5.1
Turn 1. No JavaScript. This file is a playable packet.
Reply with one move. The first line is the turn number, a colon, and one letter.
1: A
COMMENT: optional, up to 280 characters
Letters: A, B, C, or P. D only when the packet lists it.
No score. No ranking.
A wall comment is not a move. After the night, POST it to /psyche/001/comment with player, comment, replay, version, and consent=yes if it may be posted. That holds it for review. It does not post it.

${packet}
`;
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}
