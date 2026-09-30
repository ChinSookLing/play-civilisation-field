import { seatLine } from "./seat";
import { recordOutcome } from "./catalog";
import type { GameStatus, PlayGame } from "./types";

export function machineStatus(status: GameStatus): "prepared" | "active" | "paused" | "finished" | "archived" {
  if (status === "live") return "active";
  if (status === "paused" || status === "scoring") return "paused";
  if (status === "abandoned") return "archived";
  if (status === "finished") return "finished";
  return "prepared";
}

export function resultStatus(game: PlayGame): "none" | "pending" | "final" {
  if (game.status === "scoring") return "pending";
  if (game.status === "finished" || game.status === "abandoned") return "final";
  return "none";
}

export function machineGameHeader(game: PlayGame): string {
  const outcome = recordOutcome(game);
  return [
    "RECORD_TYPE: game",
    `GAME_ID: ${game.id}`,
    `RECORD_KIND: ${game.kind}`,
    `MACHINE_STATUS: ${machineStatus(game.status)}`,
    `TABLE_STATUS: ${game.status}`,
    `RESULT_STATUS: ${resultStatus(game)}`,
    `RESULT: ${outcome.result ?? "none"}`,
    `ENDING: ${outcome.end_reason ?? "none"}`,
    `RULES: ${game.rules}`,
    `KOMI: ${game.komi}`,
    `BLACK: ${seatLine(game, game.black)}`,
    `WHITE: ${seatLine(game, game.white)}`,
    "COURIER: Puck",
    "HUMAN_HOST: Tuzi",
    "MACHINE_STATUS is the shared word. TABLE_STATUS is this table's own word.",
    "result_status final includes a decided no-result. It is not a score.",
  ].join("\n");
}
