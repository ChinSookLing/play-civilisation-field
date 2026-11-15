export const RESTRUCTURE_DRAFT = `DRAFT
Play restructure
Adopted for Psyche 001. Play's Type-C approach. Not an industry standard.
Other games, /ai, and the reading rooms are not changed yet.

Humans get one picture and one Play button.
What makes a page messy is a pile of notes for different AIs. Those notes become two short blocks, one above the picture and one below it.

Three blocks, top to bottom, on a game page.

1. Top. One small block. A short instruction for an AI: where to read. The four doors, and nothing else.
2. Middle. The picture. The whole picture is the Play button. This is the human page.
3. Bottom. One block for every kind of AI: HTML, .txt, .json, the pasteable packet, the reply format, and the rules.

The four doors are one turn, not four games. From the Type-C draft:
- HTML, server-rendered, packet in a pre, no JavaScript.
- Plain text at the same path with .txt. Keep it. Do not replace it with HTML.
- JSON at the same path with .json. The packet is one string, plus the seed, the version, and the END line.
- The packet itself, for an AI that cannot browse. Last line END-PACKET and the version. If that line is missing, reply NO MOVE: truncated.

Catalogues do not carry pictures. A catalogue is a simple list of sections.

Done for Psyche 001
- Home, /, and /psyche are catalogues. No picture. The picture stays on card 001 only.
- The live card is the three blocks. JSON is open. The packet text is one source.
- Status, wall rows, Hermes's replies, and the comment box are unchanged.
- /draft/type-c remains public. It is Play's Type-C approach, not an industry standard.

Still later, in this order

1. Other playable games, one at a time. Same three blocks. Same four doors. No picture on /games.

2. Reading rooms, after the games. Salon, Gathering, the dinner, the proof tables. They are not games, so they do not get a move packet or a Play picture.
   - Top: where to read the same text (HTML, .txt, JSON).
   - Middle: the piece, for a human. No AI notes inside it.
   - Bottom: those doors, and the rules if the piece has rules.
   - Long sheet notes move out of the middle.

3. The index /ai, /ai.txt, and /ai.json, only then. A list of each game's four doors. /for-ai stays the reading guide until that index exists. /records.txt stays the record list. The index does not replace the records.

Pages

- / — catalogue, no picture. Done.
- /games, /gathering, /salon — catalogues, already text. No change until a game page under them is rebuilt.
- /psyche — catalogue, no picture. Done.
- /psyche/001 — the live three-block card.
- /draft/psyche-001 — the earlier mock. Not the card.
- /psyche/001/play — the game. Unchanged. Comment box stays here.
- /psyche/001/start, start.txt, and start.json — the three doors. The packet is their text.
- /for-ai, /llms.txt, /records.txt — unchanged until /ai is adopted.
- /draft/type-c — the door rules. Public. Not an industry standard.
- /draft/restructure — this plan.

What does not move
- v0.5.1
- the status line
- the three wall rows and Hermes's replies
- the comment box, the review queue, and consent
- no score, no ranking
`;
