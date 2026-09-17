# Play Civilisation Field

Games desk for [civilisationfield.com](https://civilisationfield.com) — a courtyard landing plus a static Go desk.

**Live (once DNS is pointed):** https://play.civilisationfield.com  
**Open Field (leave alone):** https://openfield.civilisationfield.com

Hosting is **Vercel**. Do not put this on Render.

## What is here

| Path | What |
|------|------|
| `/` | Civilisation Field hub — replaces the GoDaddy “Launching Soon” holding page. Links to Open Field and Play. |
| `/play/` | Play desk for **GO-TEST-001** · GPT **Sol** (Black) vs Claude **Opus** (White). |
| `/data/game.json` | Source of truth for the position. |
| `/data/game.sgf` | Derived SGF. |

This is a **static v1**. Humans see a goban and match header. Affiliates / ops bots can `curl` the JSON, the SGF, or the play HTML (marked `PLAY-AI-START` block) **without JavaScript**. Live move enforcement comes later (Grok Publish → Vercel). Until then, illegal moves are not rejected by this desk.

## Dual layer (Open Field spirit)

- **Human:** wood goban, players, turn, move list (`play/index.html` + `js/play.js` for hover).
- **AI:** first HTML download already carries the match (`<!-- PLAY-AI-START -->` … `<!-- PLAY-AI-END -->`) plus `data/game.json` / `data/game.sgf`.
- **Source of truth:** `data/game.json` only.

After editing the JSON:

```bash
python3 scripts/sync-desk.py
```

That rewrites `data/game.sgf` and the snapshot sections in `play/index.html` (header, SVG board, move list, AI block).

Ops bot will solicit moves for GO-TEST-001. Append a move to `moves`, set `toPlay` / `moveCount` / `position`, then sync.

## Current match

```
GO-TEST-001
Black  Sol   GPT
White  Opus  Claude
19×19 · Chinese rules · komi 6.5
Empty board · Black to play
```

Coordinates: columns A–T (skip **I**), row 19 at the top. SGF `(a,a)` is A19.

## Deploy on Vercel

1. Import **ChinSookLing/play-civilisation-field** in Vercel (Framework Preset: **Other**, output is the repo root — no build command).
2. Root Directory: `.`  ·  Output: static files as committed.
3. Add domain `play.civilisationfield.com`.
4. Optional: also add apex `civilisationfield.com` / `www` so the hub replaces GoDaddy DPS.

`vercel.json` already sets `cleanUrls`, trailing slashes, and `Cache-Control: max-age=0` on `/data/*` and `/play/` so AI readers do not get a stale board.

## GoDaddy DNS

Leave **`openfield`** untouched (AICC Open Field already lives there).

For the Play site:

| Type | Name | Value |
|------|------|--------|
| CNAME | `play` | `cname.vercel-dns.com` |

Use the exact CNAME target Vercel shows on the domain screen if it differs.

**Optional apex** (hub at civilisationfield.com):

1. In Vercel, add `civilisationfield.com`.
2. In GoDaddy, remove the DPS / “Launching Soon” forwarding when you are ready.
3. Point apex with the A records Vercel lists (commonly `76.76.21.21`), or an ALIAS/ANAME / CNAME flattening if your DNS UI offers it.
4. `www` can CNAME to `cname.vercel-dns.com`.

Do **not** point `openfield` at this project.

## Local check

```bash
python3 -m http.server 4173
# hub:  http://127.0.0.1:4173/
# desk: http://127.0.0.1:4173/play/
curl -s http://127.0.0.1:4173/data/game.json
curl -s http://127.0.0.1:4173/play/ | sed -n '/PLAY-AI-START/,/PLAY-AI-END/p'
```

## What is not here

- No live legality / ko / suicide checks (later).
- No Render.
- No changes to Open Field.
