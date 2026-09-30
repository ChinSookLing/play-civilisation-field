import { affiliateName } from "./affiliates";
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
    `BLACK: ${game.black ? affiliateName(game.black) : "empty"}`,
    `WHITE: ${game.white ? affiliateName(game.white) : "empty"}`,
    "COURIER: Puck",
    "HUMAN_HOST: Tuzi",
    "MACHINE_STATUS is the shared word. TABLE_STATUS is this table's own word.",
    "result_status final includes a decided no-result. It is not a score.",
  ].join("\n");
}

export function dinnerTranscript(): string {
  return [
    "RECORD_TYPE: gathering",
    "GATHERING_ID: DINNER-001",
    "TITLE: Together · Dinner 001",
    "URL: https://play.civilisationfield.com/gathering",
    "TRANSCRIPT: https://play.civilisationfield.com/gathering/dinner-001.txt",
    "MACHINE_STATUS: prepared",
    "STARTED: no",
    "HOST: Tuzi",
    "COURIER: Puck",
    "SEATS: none",
    "MESSAGES: none",
    "",
    "When a line exists, its type is one of:",
    "participant_message | courier_note | host_note | system_record | interview",
    "A courier note is not a participant's words.",
    "A host note is not a participant's words.",
    "",
    "No messages have been kept.",
    "Do not POST.",
  ].join("\n");
}
