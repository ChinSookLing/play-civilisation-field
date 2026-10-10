import { BREAKFAST_ID, BREAKFAST_SEATS } from "./breakfast";
import type { CourierName } from "./courier-key";
import { DINNER_ID, PRACTICE_SEATS, type DinnerLineType } from "./dinner";
import { LUNCH_ID, LUNCH_SEATS } from "./lunch";

const TYPES = new Set<DinnerLineType>(["participant_message", "courier_note", "host_note"]);

export type GatheringTable = {
  seats: readonly string[];
  prefix: string;
  couriers: readonly CourierName[];
  carriers: readonly string[];
  courierNoteSpeakers: readonly string[];
};

export const GATHERING_TABLES: Record<string, GatheringTable> = {
  [DINNER_ID]: {
    seats: PRACTICE_SEATS,
    prefix: "dinner-001",
    couriers: ["Puck"],
    carriers: ["Puck", "Tuzi (temporary courier)"],
    courierNoteSpeakers: ["Puck", "Tuzi"],
  },
  [BREAKFAST_ID]: {
    seats: BREAKFAST_SEATS,
    prefix: "breakfast-002",
    couriers: ["Puck"],
    carriers: ["Puck", "Tuzi (temporary courier)"],
    courierNoteSpeakers: ["Puck", "Tuzi"],
  },
  [LUNCH_ID]: {
    seats: LUNCH_SEATS,
    prefix: "lunch-007",
    couriers: ["Hesper"],
    carriers: ["Hesper"],
    courierNoteSpeakers: ["Hesper"],
  },
};

export function rejectGatheringLine(
  gatheringId: string,
  input: { speaker?: string; line_type?: string; carried_by?: string; text?: string; relay?: string | null },
):
  | { ok: true; speaker: string; lineType: DinnerLineType; carriedBy: string; text: string; relay: string | null }
  | { ok: false; status: number; error: string } {
  const table = GATHERING_TABLES[gatheringId];
  if (!table) return { ok: false, status: 404, error: "no such table" };
  const lineType = input.line_type;
  const speaker = input.speaker?.trim() ?? "";
  const carriedBy = input.carried_by?.trim() ?? "";
  const text = input.text?.replace(/\r\n/g, "\n").trim() ?? "";
  const relay = input.relay?.trim() || null;
  if (!lineType || !TYPES.has(lineType as DinnerLineType)) {
    return { ok: false, status: 422, error: "line type must be participant_message, courier_note, or host_note" };
  }
  if (!table.carriers.includes(carriedBy)) return { ok: false, status: 422, error: "carried_by is not a courier" };
  if (!text) return { ok: false, status: 422, error: "empty words" };
  if (text.length > 4000) return { ok: false, status: 422, error: "too long" };
  if (lineType === "participant_message" && !table.seats.includes(speaker)) {
    return { ok: false, status: 422, error: "speaker is not seated" };
  }
  if (lineType === "courier_note" && !table.courierNoteSpeakers.includes(speaker)) {
    return { ok: false, status: 422, error: `a courier note is spoken by ${table.courierNoteSpeakers.join(" or ")}` };
  }
  if (lineType === "host_note" && speaker !== "Tuzi") {
    return { ok: false, status: 422, error: "a host note is spoken by Tuzi" };
  }
  return { ok: true, speaker, lineType: lineType as DinnerLineType, carriedBy, text, relay };
}
