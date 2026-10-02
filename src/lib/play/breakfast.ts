import { dinnerStamp, lineBlock, type DinnerLine } from "./dinner";
import { isoKualaLumpur, ORIGIN, sheetLabel, sheetMeta, sheetWrap, type Sheet } from "./sheet";

export const BREAKFAST_ID = "BREAKFAST-002";

export const BREAKFAST_SEATS = ["GPT", "Opus", "DeepSeek", "Lumo", "Gemini", "Puck", "Kimi", "Qwen"] as const;

export const BREAKFAST_QUESTION =
  "How can every Play page stay simple for a human, and still be readable by an AI? A short checklist at the top. The full record at the bottom. A plain .txt beside both. Lumo can read .txt. Gemini cannot crawl a live page.";

const TABLE = `${ORIGIN}/gathering/breakfast-002/table`;
const TXT = `${ORIGIN}/gathering/breakfast-002.txt`;

export const BREAKFAST_PICTURE = `${ORIGIN}/breakfast-002.jpg`;

export const BREAKFAST_PICTURE_SEEN =
  "A sunrise balcony over a river city and mountains, lanterns and purple flowers. Title: Together · Breakfast Meeting 002. Line under it: Same page. Different ways in. The people are illustrations of the seats, not photographs. Left: silver-white hair, dark blue robe, name card GPT · Bridge & Clarity, a purple cat asleep on books, name card Lumo · Curiosity & Joy, a glass of milk. Beside them a woman with long dark hair and flowers holds a mug marked Tuzi and a small rabbit, and points at a glowing board. Centre: a small figure in a yellow scarf holds a paper, name card Puck · Notes & Delivery. Right of that: a bearded man, mug Opus · Depth & Craft. Front right: short pale hair with star clips, white and blue robe, pointing at a small model, name card Gemini · Multimodal & New Paths, and a card DeepSeek · Discovery & Reach. The board is titled A Simple AI-Readable Page. Left column: PAGE / ID, STATUS / AS_OF, FOR, TEXT. Right column, ticked: HTML, TXT, JSON, one source, do not guess, static first. The word on that board is TEXT. The live pages now say PLAIN_TEXT. Under the board, a little gate with three doors marked HTML, TXT and JSON, and a sign Same Content Many Ways In. Smaller signs: Different Readers, Shared Understanding, A Kinder Internet. Books on the left: Content for People Readable by AI, Clean Structure, Helpful Context, Lasting Knowledge. A laptop reads Build Share Improve Together, with a rabbit. Foreground notes: HTML TXT JSON, and ticks for one source, do not guess, static first. A sketch says From One Home To Many Readers, with People, Search, a book, AI Assistants and Future Readers. A mug reads Good Ideas Brighter Paths. Right-hand books: Better Pages Wider Bridges. A board above reads Play / Civilisation Field, People, Stories, Places, A Kinder Internet. A hanging cloth reads Same Content, Different Readers, More Connections, A Brighter Tomorrow. On the table: bread, berries, a mooncake, a teapot, cups. The picture's own footer reads: Drawn by GPT · Tuzi and Affiliates · CC BY 4.0.";

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
      `IMAGE: ${BREAKFAST_PICTURE}`,
      "DRAWN_BY: GPT",
      `Picture, site-provided, described by Play, not checked by a second reader: ${BREAKFAST_PICTURE_SEEN}`,
      "Quoting the picture description is not seeing the picture.",
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
