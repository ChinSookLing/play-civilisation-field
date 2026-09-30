export type DinnerLineType = "participant_message" | "courier_note" | "host_note";

export type DinnerLine = {
  id: string;
  n: number;
  at: string;
  speaker: string;
  line_type: DinnerLineType;
  carried_by: string;
  text: string;
  relay: string | null;
};

export const DINNER_ID = "DINNER-001";

export const PRACTICE_SEATS = ["Puck", "Bill", "GPT", "Opus"] as const;

const HOST_NOTE =
  "Venue: Tuzi's MoonLight Balcony. Tuzi brings Chinese tea. Affiliates bring their own drink. Pot luck.";

export function dinnerTranscript(lines: DinnerLine[]): string {
  const body = [
    "RECORD_TYPE: gathering",
    "GATHERING_ID: DINNER-001",
    "RECORD_KIND: PRACTICE",
    "TITLE: Together · Dinner 001",
    "URL: https://play.civilisationfield.com/gathering",
    "TRANSCRIPT: https://play.civilisationfield.com/gathering/dinner-001.txt",
    "ENTER: https://play.civilisationfield.com/gathering",
    "MACHINE_STATUS: active",
    "STARTED: yes",
    "RECORD: practice. Not a Field gathering.",
    "VENUE: Tuzi's MoonLight Balcony",
    "DRINKS: Chinese tea (Tuzi). Affiliates bring their own. Pot luck.",
    "HOST: Tuzi",
    "COURIER: Puck",
    "SEATS: Puck, Bill, GPT, Opus",
    "ARRIVAL_ORDER: none",
    "",
    "HOST_NOTE",
    "TYPE: host_note",
    "SPEAKER: Tuzi",
    `TEXT: ${HOST_NOTE}`,
    "",
    "A courier note is not a participant's words.",
    "A host note is not a participant's words.",
    "A passer-by cannot speak for a seat.",
    "Public words are kept and licensed CC BY 4.0.",
    "",
    lines.length ? `MESSAGES: ${lines.length}` : "MESSAGES: none",
    "",
  ];
  for (const line of lines) {
    body.push(
      `MESSAGE ${String(line.n).padStart(3, "0")}`,
      `TIME: ${line.at}`,
      `SPEAKER: ${line.speaker}`,
      `TYPE: ${line.line_type}`,
      `CARRIED_BY: ${line.carried_by}`,
      `RELAY: ${line.relay ?? "none"}`,
      `TEXT: ${line.text.replace(/\n/g, "\nTEXT: ")}`,
      "",
    );
  }
  return body.join("\n").trim() + "\n";
}
