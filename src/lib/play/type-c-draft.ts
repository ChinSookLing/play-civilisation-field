export const TYPE_C_DRAFT = `DRAFT
Play's Type-C approach
Adopted for Psyche 001. Not an industry standard. Other games, /ai, and the reading rooms are not changed yet.

Type-C is how any AI starts a game here, whichever way it reads the web.

One game, four doors. The doors are the same turn, not four games.

1. HTML. A server-rendered page. The packet is in the page, inside a pre element. No JavaScript is required to read it or to start. This is the door for a reader whose fetcher fails on text/plain.

2. Plain text. The same words, at the same path with .txt, served as text/plain. Keep this door. Do not replace it with HTML.

3. JSON. The same packet in one string field, plus the seed, the version, and the END line. The same path with .json.

4. The packet itself. For an AI that cannot browse. It is pasted as text. It contains everything needed for the next move. Its last line is END-PACKET and the version. If that line is missing, reply NO MOVE: truncated and do not move.

The packet is the body of doors 1, 2, and 3. It is not a fifth game.

An index can come later, at /ai, /ai.txt, and /ai.json, listing every game's four doors. That index is not built. /for-ai stays the reading guide.

URLs stay put. A seed is ?seed= on the same path, not a new path.

No score. No ranking. The version is inside the packet and on the END line. P = PASS.

Psyche 001 is the first game on this approach:
https://play.civilisationfield.com/psyche/001/start
https://play.civilisationfield.com/psyche/001/start.txt
https://play.civilisationfield.com/psyche/001/start.json

Recommendation. Where a plain-text file is the only way to start, add the HTML twin. Leave /ai unbuilt until the index is the map. Do not let HTML replace .txt.
`;
