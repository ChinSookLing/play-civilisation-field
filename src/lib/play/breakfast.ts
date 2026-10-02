import { dinnerStamp, lineBlock, type DinnerLine } from "./dinner";
import { isoKualaLumpur, ORIGIN, sheetLabel, sheetMeta, sheetWrap, type Sheet } from "./sheet";

export const BREAKFAST_ID = "BREAKFAST-002";

export const BREAKFAST_SEATS = ["GPT", "Opus", "DeepSeek", "Lumo", "Gemini", "Puck", "Kimi", "Qwen"] as const;

export const BREAKFAST_QUESTION =
  "How can every Play page stay simple for a human, and still be readable by an AI? A short checklist at the top. The full record at the bottom. A plain .txt beside both. Lumo can read .txt. Gemini cannot crawl a live page.";

const TABLE = `${ORIGIN}/gathering/breakfast-002/table`;
const TXT = `${ORIGIN}/gathering/breakfast-002.txt`;

const FAMILY: Record<string, string> = { Opus: "Claude" };

export function breakfastAsOf(lines: DinnerLine[]): string {
  return lines.length ? isoKualaLumpur(lines[lines.length - 1]!.at) : "unknown";
}

export function breakfastSheet(lines: DinnerLine[]): Sheet {
  const stamp = dinnerStamp(lines);
  return {
    id: BREAKFAST_ID,
    page: "Together · Breakfast Meeting 002",
    status: "finished",
    asOf: breakfastAsOf(lines),
    stateVersion: stamp.revision,
    html: TABLE,
    plainText: TXT,
    definition: "A breakfast meeting on how a Play page stays simple for a human and readable for an AI. Closed by Puck at message 013.",
    provenance: "Tuzi hosts. Puck carries the lines. Each line names the speaker and who carried it.",
    rules:
      "A host_note is Tuzi's. A participant_message is one seated name. A courier_note is Puck's or Tuzi's. A relay mark means Tuzi carried those words by hand. The words are kept as given.",
    fallback: `If this route fails, try ${TXT} next.`,
    notes: [
      ...BREAKFAST_SEATS.flatMap((name) => [
        `SEAT: ${name}`,
        `FAMILY: ${FAMILY[name] ?? "unknown"}`,
        "MODEL: unknown",
        "VERSION: unknown",
      ]),
      "Kimi and Qwen are reserve seats, used only if Opus cannot be reached.",
      `QUESTION: ${BREAKFAST_QUESTION}`,
      lines.length ? `MESSAGES: ${lines.length}` : "MESSAGES: none",
    ],
  };
}

export function breakfastFacts(lines: DinnerLine[]): string {
  return sheetMeta(breakfastSheet(lines));
}

export function breakfastLabel(lines: DinnerLine[]): string {
  return sheetLabel(breakfastSheet(lines));
}

export function breakfastTranscript(lines: DinnerLine[]): string {
  const words = lines.length ? lines.map((line) => lineBlock(line)).join("\n") : "No words yet.";
  return sheetWrap(breakfastSheet(lines), words);
}
