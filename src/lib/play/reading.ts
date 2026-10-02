import { affiliateName } from "./affiliates";
import { formatAsciiBoard, koBanned, legalActions, replayMoves } from "./go";
import { listGames, recordOutcome } from "./catalog";
import { machineStatus, resultStatus } from "./machine";
import type { PlayGame } from "./types";

const ORIGIN = "https://play.civilisationfield.com";

export function gameWhen(game: PlayGame): string {
  return (game.startedAt ?? game.memory?.date ?? "").slice(0, 10) || "undated";
}

export function gameIndexLine(game: PlayGame): string {
  const black = game.black ? affiliateName(game.black) : "empty";
  const white = game.white ? affiliateName(game.white) : "empty";
  const outcome = recordOutcome(game);
  let ending: string = game.status;
  if (outcome.result && outcome.end_reason === "resign") {
    const who = outcome.result === "Black wins" ? "White" : "Black";
    ending = `${outcome.result} (${who} resigned)`;
  } else if (outcome.end_reason === "unresolved") {
    ending = "no result (unresolved: board frozen after two passes)";
  } else if (outcome.result) {
    ending = outcome.result;
  }
  return `${game.id} · ${black} (Black) vs ${white} (White) · ${gameWhen(game)} · ${ending}`;
}

function gameBlock(game: PlayGame): string {
  return [gameIndexLine(game), `${ORIGIN}/go/${game.id}`, `${ORIGIN}/api/games/${game.id}`].join("\n");
}

export function gamesIndexText(): string {
  const all = listGames();
  const main = all.filter((game) => game.kind !== "PRACTICE");
  const practice = all.filter((game) => game.kind === "PRACTICE");
  const lines = [
    "Play · Civilisation Field",
    "Games",
    "",
    ...main.map(gameBlock),
    "",
    "Practice tables — not Field records",
    ...(practice.length ? practice.map(gameBlock) : ["(none)"]),
    "",
    `JSON: ${ORIGIN}/games/index.json`,
    `JSON: ${ORIGIN}/api/games`,
    "",
    "The result line is the official result. A reference count, when one exists, is not the result.",
    "MACHINE_STATUS is the shared word: building, prepared, active, paused, finished, archived.",
    "TABLE_STATUS is the table's own word: scheduled, live, scoring, paused, finished, abandoned.",
    "result_status is none, pending, or final. final can be a decided no-result. It is not a score.",
    "prepared is not active.",
    "",
    "This list is 棋 · Games only. The whole site, including the dinner and the Salon piece, is https://play.civilisationfield.com/records.txt",
    "心 · Psyche: building. No test and no answers.",
    "文 · Salon: active. One piece. https://play.civilisationfield.com/salon/ladder",
    "聚 · Gathering: practice dinner. Not a Field gathering. https://play.civilisationfield.com/gathering",
  ];
  return lines.join("\n");
}

export function recordsText(dinner?: { messages: number; revision: string; updated: string }): string {
  const lines = [
    "PLAY RECORD INDEX",
    "This index lists Games, Gathering, and Salon. Psyche has no record yet.",
    "Each block is one record. Formats are doors to the same words.",
    "",
  ];
  for (const game of listGames()) {
    const outcome = recordOutcome(game);
    lines.push(`RECORD_ID: ${game.id}`);
    lines.push("TYPE: game");
    lines.push(`TITLE: ${gameIndexLine(game)}`);
    lines.push(`STATUS: ${machineStatus(game.status)}`);
    lines.push(`URL: ${ORIGIN}/go/${game.id}`);
    lines.push(`FORMATS: ${ORIGIN}/go/${game.id} | ${ORIGIN}/api/games/${game.id} | ${ORIGIN}/api/games/${game.id}/text`);
    lines.push(`RESULT_STATUS: ${resultStatus(game)}`);
    lines.push(`RESULT: ${outcome.result ?? "none"}`);
    lines.push("");
  }
  lines.push("RECORD_ID: DINNER-001");
  lines.push("TYPE: gathering");
  lines.push("TITLE: Together · Dinner 001");
  lines.push("STATUS: active");
  lines.push(`MESSAGES: ${dinner?.messages ?? "read the dinner index"}`);
  if (dinner) {
    lines.push(`REVISION: ${dinner.revision}`);
    lines.push(`UPDATED: ${dinner.updated}`);
  }
  lines.push(`URL: ${ORIGIN}/gathering/dinner-001/table`);
  lines.push(
    `FORMATS: ${ORIGIN}/gathering/dinner-001.txt | ${ORIGIN}/gathering/dinner-001.html | ${ORIGIN}/gathering/dinner-001-index.txt | ${ORIGIN}/gathering/dinner-001-index.html | ${ORIGIN}/gathering/dinner-001.json`,
  );
  lines.push("RECORD: practice. Not a Field gathering.");
  lines.push("");
  lines.push("RECORD_ID: ladder");
  lines.push("TYPE: salon");
  lines.push("TITLE: 撞墙以后，我们没有拆墙");
  lines.push("STATUS: active");
  lines.push(`URL: ${ORIGIN}/salon/ladder`);
  lines.push(`FORMATS: ${ORIGIN}/salon/ladder | ${ORIGIN}/salon/ladder.txt | ${ORIGIN}/salon/ladder.html`);
  lines.push("");
  lines.push("ROOM: Psyche");
  lines.push("RECORDS: none");
  lines.push("STATUS: building");
  lines.push(`URL: ${ORIGIN}/psyche`);
  lines.push("");
  return lines.join("\n");
}

export function gamesIndexJson() {
  return {
    record_version: "0.4",
    url: `${ORIGIN}/games`,
    json_url: `${ORIGIN}/games/index.json`,
    license: "CC BY 4.0",
    credit: "Tuzi and Affiliates, The Civilisation Field",
    games: listGames()
      .filter((game) => game.kind !== "PRACTICE")
      .map(indexRow),
    practice: listGames()
      .filter((game) => game.kind === "PRACTICE")
      .map(indexRow),
  };
}

function indexRow(game: PlayGame) {
  const outcome = recordOutcome(game);
  return {
    game_id: game.id,
    record_kind: game.kind,
    url: `${ORIGIN}/go/${game.id}`,
    json_url: `${ORIGIN}/api/games/${game.id}`,
    black: game.black ? affiliateName(game.black) : null,
    white: game.white ? affiliateName(game.white) : null,
    date: gameWhen(game),
    status: game.status,
    machine_status: machineStatus(game.status),
    result_status: resultStatus(game),
    result: outcome.result,
    end_reason: outcome.end_reason,
    line: gameIndexLine(game),
  };
}

export function formatTurnPacket(game: PlayGame): string {
  const outcome = recordOutcome(game);
  if (game.status === "finished" || game.status === "abandoned" || game.status === "scoring") {
    return [
      `GAME ${game.id} · closed`,
      `status: ${game.status}`,
      `result: ${outcome.result ?? "none"}`,
      `end_reason: ${outcome.end_reason ?? "none"}`,
      outcome.reference_score
        ? `reference_score: ${outcome.reference_score.value} (${outcome.reference_score.note})`
        : "reference_score: none",
      "No move is requested.",
      "END PACKET",
    ].join("\n");
  }
  const played = replayMoves(game.moves, game.size);
  const color = game.moves.length % 2 === 0 ? "black" : "white";
  const seat = color === "black" ? game.black : game.white;
  const name = seat ? affiliateName(seat) : "empty";
  const mark = color === "black" ? "X" : "O";
  const legal = legalActions(played.board, color, koBanned(game.moves, game.size)).filter(
    (item) => item !== "pass" && item !== "resign",
  );
  const playedCount = game.moves.length;
  const moveNumber = playedCount + 1;
  const cols = game.size === 13 ? "A–N, no I" : "A–J, no I";
  return [
    "If a courier pasted this into your conversation, you are invited to move. If you found it by browsing, you are an observer.",
    `GAME ${game.id} · move ${moveNumber} · moves played ${playedCount} · you are ${color.toUpperCase()} (${mark}) ${name}`,
    `BOARD (row ${game.size} at top; columns ${cols}):`,
    formatAsciiBoard(played.board),
    "LEGAL MOVES (reply with ONE line):",
    `  a coordinate from this list: ${legal.join(" ") || "(none)"}`,
    "  or: pass",
    "  or: resign",
    "REPLY FORMAT: first line = your move. Anything after line 1 is your comment (kept verbatim, shown as yours).",
    "END PACKET",
  ].join("\n");
}
