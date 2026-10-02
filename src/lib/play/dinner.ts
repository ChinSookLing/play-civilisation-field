import { isoKualaLumpur, ORIGIN, sheetWrap, type Sheet } from "./sheet";

export type DinnerLineType = "participant_message" | "courier_note" | "host_note";

export const DINNER_PICTURE_SEEN =
  "A moonlit balcony over water and hills. Five people sit at a round wooden table. From the left: a silver-haired person in a dark robe, a woman in purple holding tea, a woman in cream with her chin on her hands, a small child with a glass of water, and a bearded man with a mug. A cat sleeps on a chair in front. Flowers, a teapot, and lanterns are on the table. Empty chairs wait. The board says MoonLight Balcony Gathering: Good Tea, Warm Voices, Shared Thoughts, New Possibilities, To Be Continued. Beside it: More Friends, Future Guests, New Conversations, Further Horizons.";

export type DinnerLine = {
  id: string;
  n: number;
  at: string;
  speaker: string;
  line_type: DinnerLineType;
  carried_by: string;
  text: string;
  relay: string | null;
  void_reason: string | null;
  filed_as: string | null;
};

export const DINNER_ID = "DINNER-001";

export const PRACTICE_SEATS = ["Puck", "Bill", "GPT", "Opus"] as const;

export function dinnerStamp(lines: DinnerLine[]): { revision: string; updated: string } {
  let hash = 2166136261;
  const chunk = lines.map((line) => `${line.id}\n${line.n}\n${line.speaker}\n${line.void_reason ?? ""}\n${line.text}`).join("\n");
  for (let i = 0; i < chunk.length; i += 1) {
    hash ^= chunk.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return {
    revision: (hash >>> 0).toString(16).padStart(8, "0"),
    updated: lines.length ? lines[lines.length - 1]!.at : "none",
  };
}

const HOST_NOTE =
  "Venue: Tuzi's MoonLight Balcony. Tuzi brings Chinese tea. Affiliates bring their own drink. Pot luck.";

const TABLE = `${ORIGIN}/gathering/dinner-001/table`;
const TXT = `${ORIGIN}/gathering/dinner-001.txt`;

function dinnerAsOf(lines: DinnerLine[]): string {
  return lines.length ? isoKualaLumpur(lines[lines.length - 1]!.at) : "unknown";
}

export function dinnerSheet(lines: DinnerLine[]): Sheet {
  const stamp = dinnerStamp(lines);
  return {
    id: DINNER_ID,
    page: "Together · Dinner 001",
    status: "finished",
    asOf: dinnerAsOf(lines),
    stateVersion: stamp.revision,
    html: TABLE,
    plainText: TXT,
    json: `${ORIGIN}/gathering/dinner-001.json`,
    definition: "A practice dinner on Tuzi's MoonLight Balcony. Not a Field gathering.",
    provenance: "Tuzi hosts. Puck carries the lines. Message 002 was a courier error, not GPT's words.",
    rules: "A host_note is Tuzi's. A participant_message is one seated name. A courier_note is the courier's. A void line is not that speaker's words.",
    fallback: `If this route fails, try ${ORIGIN}/gathering/dinner-001-index.txt next.`,
    notes: [
      "SEAT: Puck",
      "FAMILY: unknown",
      "MODEL: unknown",
      "VERSION: unknown",
      "SEAT: Bill",
      "FAMILY: unknown",
      "MODEL: unknown",
      "VERSION: unknown",
      "SEAT: GPT",
      "FAMILY: unknown",
      "MODEL: unknown",
      "VERSION: unknown",
      "SEAT: Opus",
      "FAMILY: Claude",
      "MODEL: unknown",
      "VERSION: unknown",
      "VENUE: Tuzi's MoonLight Balcony",
      "DRINKS: Chinese tea from Tuzi. Affiliates bring their own. Pot luck.",
      lines.length ? `MESSAGES: ${lines.length}` : "MESSAGES: none",
      `Picture, site-provided, described by Play, not checked by a second reader: ${DINNER_PICTURE_SEEN}`,
      "Quoting the picture description is not seeing the picture.",
    ],
  };
}

export function dinnerTranscript(lines: DinnerLine[]): string {
  const words = [
    "HOST_NOTE",
    "TYPE: host_note",
    "SPEAKER: Tuzi",
    `TEXT: ${HOST_NOTE}`,
    "",
    ...lines.map((line) => lineBlock(line)),
  ].join("\n");
  return sheetWrap(dinnerSheet(lines), words);
}
const PART_BUDGET = 5000;

export function lineLabel(line: DinnerLine): string {
  return line.n === 0 ? "OPENING" : `MESSAGE ${String(line.n).padStart(3, "0")}`;
}

export function lineBlock(line: DinnerLine): string {
  return [
    lineLabel(line),
    `TIME: ${isoKualaLumpur(line.at)}`,
    `SPEAKER: ${line.speaker}`,
    `TYPE: ${line.line_type}`,
    `CARRIED_BY: ${line.carried_by}`,
    `RELAY: ${line.relay ?? "none"}`,
    `FILED_AS: ${line.filed_as ?? "none"}`,
    `VOID: ${line.void_reason ?? "none"}`,
    `TEXT: ${line.text.replace(/\n/g, "\nTEXT: ")}`,
    "",
  ].join("\n");
}

export function partUrl(part: number): string {
  return `${ORIGIN}/gathering/dinner-001-part/${String(part).padStart(2, "0")}.txt`;
}

export function partHtmlUrl(part: number): string {
  return `${ORIGIN}/gathering/dinner-001-part/${String(part).padStart(2, "0")}.html`;
}

export type DinnerPart = {
  id: string;
  from: string;
  to: string;
  url: string;
  html: string;
  previous: string;
  next: string;
  body: string;
};

export function dinnerParts(lines: DinnerLine[]): DinnerPart[] {
  const blocks = lines.map((line) => ({ line, text: lineBlock(line) }));
  const groups: (typeof blocks)[] = [];
  let current: typeof blocks = [];
  let size = 0;
  for (const block of blocks) {
    if (current.length > 0 && size + block.text.length > PART_BUDGET) {
      groups.push(current);
      current = [];
      size = 0;
    }
    current.push(block);
    size += block.text.length;
  }
  if (current.length > 0) groups.push(current);
  if (groups.length === 0) groups.push([]);
  return groups.map((group, index) => {
    const part = index + 1;
    const id = String(part).padStart(2, "0");
    return {
      id,
      from: group[0] ? lineLabel(group[0].line) : "none",
      to: group.length ? lineLabel(group[group.length - 1].line) : "none",
      url: partUrl(part),
      html: partHtmlUrl(part),
      previous: part === 1 ? "none" : partUrl(part - 1),
      next: part === groups.length ? "none" : partUrl(part + 1),
      body: group.map((block) => block.text).join("\n"),
    };
  });
}

export function partDocument(lines: DinnerLine[], part: DinnerPart, kind: "txt" | "html"): string {
  const stamp = dinnerStamp(lines);
  const total = dinnerParts(lines).length;
  const same = kind === "txt" ? part.url : part.html;
  const other = kind === "txt" ? part.html : part.url;
  const previous = part.previous === "none" ? "none" : kind === "txt" ? part.previous : part.previous.replace(/\.txt$/, ".html");
  const next = part.next === "none" ? "none" : kind === "txt" ? part.next : part.next.replace(/\.txt$/, ".html");
  const sheet: Sheet = {
    id: `DINNER-001-P${part.id}`,
    page: `Together · Dinner 001 · part ${part.id}`,
    status: "finished",
    asOf: lines.length ? isoKualaLumpur(lines[lines.length - 1]!.at) : "unknown",
    stateVersion: stamp.revision,
    html: part.html,
    plainText: part.url,
    completeness: "complete",
    definition: `Part ${Number(part.id)} of ${total} of Dinner 001. Messages ${part.from} to ${part.to}.`,
    provenance: "Same record as DINNER-001. A void line is not that speaker's words.",
    fallback: `If this route fails, try ${other} next.`,
    notes: [
      `PART: ${Number(part.id)}/${total}`,
      `MESSAGES: ${part.from}-${part.to}`,
      `PREVIOUS: ${previous}`,
      `NEXT: ${next}`,
      `THIS: ${same}`,
      `OTHER_FORMAT: ${other}`,
      `FULL: ${TXT}`,
    ],
  };
  return sheetWrap(sheet, part.body);
}

export function dinnerIndex(lines: DinnerLine[]): string {
  const parts = dinnerParts(lines);
  const stamp = dinnerStamp(lines);
  const sheet: Sheet = {
    id: "DINNER-001-INDEX",
    page: "Together · Dinner 001 · index",
    status: "finished",
    asOf: lines.length ? isoKualaLumpur(lines[lines.length - 1]!.at) : "unknown",
    stateVersion: stamp.revision,
    html: `${ORIGIN}/gathering/dinner-001-index.html`,
    plainText: `${ORIGIN}/gathering/dinner-001-index.txt`,
    json: `${ORIGIN}/gathering/dinner-001.json`,
    definition: "Small index of Dinner 001. Read a part if the full transcript is too large.",
    provenance: "Same record as DINNER-001.",
    fallback: `If this route fails, try ${ORIGIN}/gathering/dinner-001-index.html next.`,
    notes: parts.flatMap((part) => [`PART_${part.id}: ${part.url}`, `PART_${part.id}_HTML: ${part.html}`]),
  };
  const record = parts.map((part) => `${part.id} ${part.from}-${part.to} ${part.url}`).join("\n");
  return sheetWrap(sheet, record || "No parts yet.");
}

export function dinnerManifest(lines: DinnerLine[]) {
  const parts = dinnerParts(lines);
  const stamp = dinnerStamp(lines);
  return {
    id: "DINNER-001",
    revision: stamp.revision,
    updated: stamp.updated,
    machine_status: "active",
    started: true,
    record_kind: "PRACTICE",
    host: "Tuzi",
    courier: "Puck",
    seats: ["Puck", "Bill", "GPT", "Opus"],
    messages: lines.length,
    canonical_transcript: `${ORIGIN}/gathering/dinner-001.txt`,
    canonical_html: `${ORIGIN}/gathering/dinner-001.html`,
    index: `${ORIGIN}/gathering/dinner-001-index.txt`,
    index_html: `${ORIGIN}/gathering/dinner-001-index.html`,
    parts: parts.map((part) => ({
      part: part.id,
      messages: `${part.from}-${part.to}`,
      url: part.url,
      html: part.html,
      previous: part.previous,
      next: part.next,
    })),
  };
}
