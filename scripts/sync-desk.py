#!/usr/bin/env python3
"""Refresh SGF + play HTML snapshot from data/game.json (source of truth)."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GAME_PATH = ROOT / "data" / "game.json"
SGF_PATH = ROOT / "data" / "game.sgf"
PLAY_PATH = ROOT / "play" / "index.html"

COLS = list("ABCDEFGHJKLMNOPQRST")  # skip I
CELL = 22
PAD = 28
VIEW = PAD * 2 + CELL * 18  # 452


def coord_to_xy(coord: str) -> tuple[int, int]:
    col, row = coord[0].upper(), int(coord[1:])
    x = COLS.index(col)
    y = 19 - row  # row 19 → y 0
    return x, y


def xy_to_sgf(x: int, y: int) -> str:
    letters = "abcdefghijklmnopqrs"
    return letters[x] + letters[y]


def load_game() -> dict:
    return json.loads(GAME_PATH.read_text(encoding="utf-8"))


def stones_from_game(game: dict) -> list[dict]:
    stones = list(game.get("position", {}).get("stones") or [])
    if stones:
        return stones
    built = []
    for move in game.get("moves") or []:
        if not move.get("coord") or move.get("coord") in ("pass", "resign"):
            continue
        x, y = coord_to_xy(move["coord"])
        built.append(
            {
                "color": move["color"],
                "coord": move["coord"],
                "x": x,
                "y": y,
            }
        )
    return built


def ascii_board(game: dict) -> str:
    grid = [["." for _ in range(19)] for _ in range(19)]
    for stone in stones_from_game(game):
        mark = "X" if stone["color"] == "black" else "O"
        grid[stone["y"]][stone["x"]] = mark
    last = (game.get("position") or {}).get("lastMove")
    header = "   " + " ".join(COLS)
    lines = [header]
    for i, row in enumerate(grid):
        n = 19 - i
        lines.append(f"{n:2d} " + " ".join(row) + f" {n:2d}")
    lines.append(header)
    if last and last.get("coord") not in (None, "pass", "resign"):
        lines.append(f"Last move: {last.get('color')} {last.get('coord')}")
    return "\n".join(lines)


def sgf_text(game: dict) -> str:
    black = game["players"]["black"]
    white = game["players"]["white"]
    props = [
        "FF[4]",
        "GM[1]",
        f"SZ[{game['boardSize']}]",
        f"GN[{game['id']}]",
        f"PB[{black['name']}]",
        f"PW[{white['name']}]",
        f"BR[{black['model']}]",
        f"WR[{white['model']}]",
        f"KM[{game['komi']}]",
        f"RU[{game['rules']}]",
        "C[Civilisation Field play desk. data/game.json is source of truth. Illegal moves will be rejected by the live desk later.]",
    ]
    body = [";"]
    body[0] += "".join(props)
    for move in game.get("moves") or []:
        tag = "B" if move["color"] == "black" else "W"
        coord = move.get("coord")
        if coord == "pass":
            body.append(f";{tag}[]")
        elif coord == "resign":
            body.append(f";{tag}[]C[resign]")
        else:
            x, y = coord_to_xy(coord)
            body.append(f";{tag}[{xy_to_sgf(x, y)}]")
    return "(" + "\n".join(body) + "\n)\n"


def svg_board(game: dict) -> str:
    stones = stones_from_game(game)
    last = (game.get("position") or {}).get("lastMove") or {}
    last_coord = last.get("coord")
    size = game["boardSize"]
    parts = [
        f'<svg class="goban" id="goban" viewBox="0 0 {VIEW} {VIEW}" role="img" aria-label="{game["id"]} {size}×{size} Go board. {len(stones)} stone(s).">'
    ]
    parts.append(
        "<defs><linearGradient id=\"wood\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\">"
        "<stop offset=\"0\" stop-color=\"#e2c394\"/><stop offset=\"1\" stop-color=\"#b8894e\"/>"
        "</linearGradient></defs>"
    )
    parts.append(
        f'<rect x="0" y="0" width="{VIEW}" height="{VIEW}" rx="8" fill="#d7b17a"/>'
    )
    parts.append(
        f'<rect x="0" y="0" width="{VIEW}" height="{VIEW}" rx="8" fill="url(#wood)" opacity="0.35"/>'
    )
    # grid
    for i in range(size):
        a = PAD
        b = PAD + CELL * 18
        p = PAD + i * CELL
        parts.append(f'<line x1="{a}" y1="{p}" x2="{b}" y2="{p}" stroke="#4a3420" stroke-width="1"/>')
        parts.append(f'<line x1="{p}" y1="{a}" x2="{p}" y2="{b}" stroke="#4a3420" stroke-width="1"/>')
    parts.append(
        f'<rect x="{PAD}" y="{PAD}" width="{CELL * 18}" height="{CELL * 18}" fill="none" stroke="#3d2a18" stroke-width="1.8"/>'
    )
    # hoshi
    for hx, hy in ((3, 3), (3, 9), (3, 15), (9, 3), (9, 9), (9, 15), (15, 3), (15, 9), (15, 15)):
        cx = PAD + hx * CELL
        cy = PAD + hy * CELL
        parts.append(f'<circle cx="{cx}" cy="{cy}" r="2.6" fill="#3d2a18"/>')
    # labels
    for i, col in enumerate(COLS):
        x = PAD + i * CELL
        parts.append(
            f'<text x="{x}" y="16" text-anchor="middle" font-size="10" fill="#5a4030" font-family="Georgia, serif">{col}</text>'
        )
        parts.append(
            f'<text x="{x}" y="{VIEW - 8}" text-anchor="middle" font-size="10" fill="#5a4030" font-family="Georgia, serif">{col}</text>'
        )
    for i in range(size):
        n = 19 - i
        y = PAD + i * CELL + 3
        parts.append(
            f'<text x="12" y="{y}" text-anchor="middle" font-size="10" fill="#5a4030" font-family="Georgia, serif">{n}</text>'
        )
        parts.append(
            f'<text x="{VIEW - 12}" y="{y}" text-anchor="middle" font-size="10" fill="#5a4030" font-family="Georgia, serif">{n}</text>'
        )
    for stone in stones:
        cx = PAD + stone["x"] * CELL
        cy = PAD + stone["y"] * CELL
        if stone["color"] == "black":
            parts.append(
                f'<circle data-stone="{stone["coord"]}" cx="{cx}" cy="{cy}" r="9.4" fill="#1a1816" stroke="#0b0a09" stroke-width="0.6"/>'
                f'<circle cx="{cx - 2.2}" cy="{cy - 2.4}" r="2.4" fill="rgba(255,255,255,0.18)"/>'
            )
        else:
            parts.append(
                f'<circle data-stone="{stone["coord"]}" cx="{cx}" cy="{cy}" r="9.4" fill="#f4efe6" stroke="#c9c0b2" stroke-width="0.6"/>'
                f'<circle cx="{cx - 2.4}" cy="{cy - 2.6}" r="2.6" fill="rgba(255,255,255,0.85)"/>'
            )
        if last_coord and stone.get("coord") == last_coord:
            parts.append(
                f'<circle cx="{cx}" cy="{cy}" r="3.1" fill="none" stroke="#c0392b" stroke-width="1.6"/>'
            )
    parts.append("</svg>")
    return "\n          ".join(parts)


def move_list_html(game: dict) -> str:
    moves = game.get("moves") or []
    if not moves:
        return (
            '<ol class="moves" id="move-list">\n'
            '            <li class="empty">None yet. The board is empty; Black (Sol) to play first.</li>\n'
            "          </ol>"
        )
    items = ['<ol class="moves" id="move-list">']
    for i, move in enumerate(moves, 1):
        cls = "b" if move["color"] == "black" else "w"
        who = game["players"][move["color"]]["name"]
        coord = move.get("coord", "")
        items.append(
            f'            <li><span class="n">{i}.</span> <span class="{cls}">{who}</span> {coord}</li>'
        )
    items.append("          </ol>")
    return "\n".join(items)


def header_html(game: dict) -> str:
    to_play = game["toPlay"]
    black = game["players"]["black"]
    white = game["players"]["white"]
    black_extra = " · to play" if to_play == "black" else ""
    white_extra = " · to play" if to_play == "white" else ""
    plaque = f'{to_play.title()} to play · move {game["moveCount"]}'
    return f"""<section class="match" aria-label="Match">
      <div class="player black">
        <div class="role">Black</div>
        <div class="name">{black["name"]}</div>
        <div class="meta">{black["model"]}{black_extra}</div>
      </div>
      <div class="turn-plaque" id="turn-plaque">{plaque}</div>
      <div class="player white">
        <div class="role">White</div>
        <div class="name">{white["name"]}</div>
        <div class="meta">{white["model"]}{white_extra}</div>
      </div>
    </section>"""


def ai_block(game: dict) -> str:
    moves = game.get("moves") or []
    if moves:
        move_lines = "\n".join(
            f"{i}. {m['color']} {m.get('coord', '')}" for i, m in enumerate(moves, 1)
        )
    else:
        move_lines = "(none yet)"
    board = ascii_board(game)
    black = game["players"]["black"]
    white = game["players"]["white"]
    return f"""<section id="play-for-ai" class="ai-readable" aria-label="Machine-readable play desk">
  <h2>Play Civilisation Field — for AI readers</h2>
  <p>This block is in the first HTML download (no JavaScript required). Humans use the goban above. <code>data/game.json</code> is the single source of truth; SGF is derived. Run <code>python3 scripts/sync-desk.py</code> after editing the JSON.</p>
  <p>Match: {game["id"]} · {black["full"]} (Black) vs {white["full"]} (White) · {game["boardSize"]}×{game["boardSize"]} · {game["rules"]} rules · komi {game["komi"]}</p>
  <p>Status: {game["status"]} · to play: {game["toPlay"]} · move count: {game["moveCount"]}</p>
  <p>Enforcement: this static desk displays only. Illegal moves will be rejected by the live desk later.</p>
  <p>Also: <a href="/data/game.json">data/game.json</a> · <a href="/data/game.sgf">data/game.sgf</a></p>
  <h3>Moves</h3>
  <pre>{move_lines}</pre>
  <h3>Board</h3>
  <pre>
{board}
  </pre>
  <p>Legend: <code>.</code> empty · <code>X</code> black ({black["name"]}) · <code>O</code> white ({white["name"]}). Columns skip I. Row 19 is the top of the board (SGF <code>a</code> is A19).</p>
</section>"""


def replace_block(html: str, start: str, end: str, inner: str, indent: str = "") -> str:
    pattern = re.compile(
        re.escape(start) + r".*?" + re.escape(end),
        re.S,
    )
    replacement = f"{start}\n{indent}{inner}\n{indent}{end}"
    if not pattern.search(html):
        raise SystemExit(f"Missing markers {start} … {end}")
    return pattern.sub(replacement, html, count=1)


def main() -> None:
    game = load_game()
    SGF_PATH.write_text(sgf_text(game), encoding="utf-8")
    html = PLAY_PATH.read_text(encoding="utf-8")
    html = replace_block(html, "<!-- PLAY-HEADER-START -->", "<!-- PLAY-HEADER-END -->", header_html(game), "    ")
    html = replace_block(html, "<!-- PLAY-BOARD-START -->", "<!-- PLAY-BOARD-END -->", svg_board(game), "          ")
    html = replace_block(html, "<!-- PLAY-MOVES-START -->", "<!-- PLAY-MOVES-END -->", move_list_html(game), "          ")
    html = replace_block(html, "<!-- PLAY-AI-START -->", "<!-- PLAY-AI-END -->", ai_block(game), "")
    PLAY_PATH.write_text(html, encoding="utf-8")
    print(f"Wrote {SGF_PATH.relative_to(ROOT)} and refreshed {PLAY_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
