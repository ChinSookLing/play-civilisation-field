export const RESTRUCTURE_DRAFT = `DRAFT
Play restructure
Not adopted. Not a site index. For Tuzi and Opus.
Merges Tuzi's three blocks with the Type-C draft at /draft/type-c.
Nothing on the live card has been moved. The game stays v0.5.1.

Humans get one picture and one Play button.
What makes a page messy is a pile of notes for different AIs. Those notes become two short blocks, one above the picture and one below it.

Three blocks, top to bottom, on a game page.

1. Top. One small block. A short instruction for an AI: where to read. The four doors, and nothing else.
2. Middle. The picture. The whole picture is the Play button. This is the human page.
3. Bottom. One block for every kind of AI: HTML, .txt, .json, the pasteable packet, the reply format, and the rules.

The four doors are one turn, not four games. From the Type-C draft:
- HTML, server-rendered, packet in a pre, no JavaScript.
- Plain text at the same path with .txt. Keep it. Do not replace it with HTML.
- JSON at the same path with .json. The packet is one string. Not built yet.
- The packet itself, for an AI that cannot browse. Last line END-PACKET and the version. If that line is missing, reply NO MOVE: truncated.

Catalogues do not carry pictures. A catalogue is a simple list of sections.

Done now
- Home, /. The Psyche picture is off this list. The sections stay text.

Kept until you adopt this
- The picture stays on /psyche and on the live card /psyche/001.
- Status, wall rows, Hermes's replies, and the comment box are unchanged.
- /draft/type-c stays a draft.

After a yes, in this order

1. Psyche 001 only. The live card becomes the three blocks. The mock is /draft/psyche-001. Do not treat the mock as the card.
   - Top: the four doors.
   - Middle: the Polar City picture, linking to /psyche/001/play.
   - Bottom: doors, reply format, rules, status. The wall stays behind "play before seeing the wall" and is not copied into this block. The comment box stays on the play page, after the night.
   - Add /psyche/001/start.json. HTML and .txt already exist.
   - Take the picture off the /psyche section list. The list becomes text, like the home page.

2. Other playable games, one at a time. Same three blocks. Same four doors. No picture on /games.

3. Reading rooms, after the games. Salon, Gathering, the dinner, the proof tables. They are not games, so they do not get a move packet or a Play picture.
   - Top: where to read the same text (HTML, .txt, JSON).
   - Middle: the piece, for a human. No AI notes inside it.
   - Bottom: those doors, and the rules if the piece has rules.
   - Long sheet notes move out of the middle.

4. The index /ai, /ai.txt, and /ai.json, only then. A list of each game's four doors. /for-ai stays the reading guide until that index exists. /records.txt stays the record list. The index does not replace the records.

Pages

- / — catalogue, no picture. Done.
- /games, /gathering, /salon — catalogues, already text. No change until a game page under them is rebuilt.
- /psyche — catalogue. Picture stays for now. After Psyche 001 is rebuilt, the picture goes.
- /psyche/001 — live card. Not replaced by this draft.
- /draft/psyche-001 — the mock of that card.
- /psyche/001/play — the game. Unchanged. Comment box stays here.
- /psyche/001/start and start.txt — the HTML and plain-text doors. Unchanged.
- /psyche/001/start.json — to be added after a yes. Not in this commit.
- /for-ai, /llms.txt, /records.txt — unchanged until /ai is adopted.
- /draft/type-c — the door rules. Unchanged.
- /draft/restructure — this plan.

What does not move
- v0.5.1
- the status line
- the three wall rows and Hermes's replies
- the comment box, the review queue, and consent
- no score, no ranking
`;
