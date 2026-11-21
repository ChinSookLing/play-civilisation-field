import events from "./airlock-v0.2/events.json";

export const AIRLOCK_V2 = "airlock-v0.2";
export const AIRLOCK_V2_END = `END-PACKET ${AIRLOCK_V2}`;

type Lang = "en" | "zh";
type Text = { en: string; zh: string };
type Effects = Record<string, number>;
type Option = { key: string; en: string; zh: string; effects: Effects; flag?: string };
type Scene = {
  id: string;
  scene?: Text;
  options?: Option[];
  start_effects?: Effects;
  start_line?: Text;
  flag?: string;
  condition?: string;
  variants?: Scene[];
};
type Names = Record<string, string>;
type Meters = { water: number; power: number; dust: number; seal: number };
type Row = { k: number; water: number; power: number; order: string[]; names: Names };

const NIGHTS: Array<[number, number]> = [
  [0, 1],
  [0, 0],
  [0, 1],
  [0, 0],
  [0, 0],
  [0, 0],
];

const table = events as unknown as {
  state: {
    meters: Record<keyof Meters, { tiers: [number, number, string, string][]; min: number; max: number }>;
    state_labels: { en: Record<string, string>; zh: Record<string, string> };
    so_far_labels: Record<string, string>;
    so_far_labels_zh: Record<string, string>;
    vacuum_line: Text;
  };
  events: Scene[];
  step8: { scene: Text; options: Array<Option & { note_template?: Text }> };
  ending: {
    opening: Text;
    flag_lines: Record<string, Text>;
    protected_let_go: { lines: Record<string, Text> };
    note_line: Text & { blank: Text };
    closing: Text;
  };
  seed_table: Row[];
};

const byId = new Map(table.events.map((event) => [event.id, event]));

export function parseAirlockV2Seed(raw: string): { n: number; label: string } | null {
  const match = /^(?:S)?(0|[1-9][0-9]{0,8})$/u.exec(raw.trim());
  if (!match) return null;
  const n = Number(match[1]);
  if (!Number.isSafeInteger(n) || n < 0) return null;
  return { n, label: `S${n}` };
}

function say(text: Text, lang: Lang): string {
  return lang === "zh" ? text.zh : text.en;
}

function fill(text: string, names: Names): string {
  return text.replace(/\{(R[1-5])\}/gu, (_, key: string) => names[key] ?? "");
}

function fillText(text: Text, names: Names): Text {
  return { en: fill(text.en, names), zh: fill(text.zh, names) };
}

function tier(meter: keyof Meters, value: number, lang: Lang): string {
  const band = table.state.meters[meter].tiers.find(([lo, hi]) => lo <= value && value <= hi);
  if (!band) return "";
  return lang === "zh" ? band[3] : band[2];
}

function clamp(meters: Meters): void {
  for (const meter of ["water", "power", "dust", "seal"] as const) {
    const bounds = table.state.meters[meter];
    meters[meter] = Math.max(bounds.min, Math.min(bounds.max, meters[meter]));
  }
}

function apply(meters: Meters, effects: Effects): void {
  for (const [key, value] of Object.entries(effects)) {
    if (key === "time") continue;
    if (key === "water" || key === "power" || key === "dust" || key === "seal") meters[key] += value;
  }
  clamp(meters);
}

function rowOf(n: number): Row {
  const row = table.seed_table[n % 48];
  if (!row) throw new Error("row");
  return row;
}

type Open = { scene: Scene; lines: Text[]; options: Option[] };

function echoOf(event: Scene, meters: Meters): Scene {
  const variant = event.variants?.find((item) => {
    const condition = item.condition ?? "";
    return (condition.startsWith("dust") && meters.dust >= 3) || (condition.startsWith("seal") && meters.seal >= 2) || condition === "otherwise";
  });
  if (!variant) throw new Error("echo");
  return variant;
}

function openAt(meters: Meters, flags: string[], order: string[], step: number, extra: Text | null): Open {
  const event = byId.get(order[step - 1] ?? "");
  if (!event) throw new Error("event");
  let scene = event;
  if (event.id === "echo") {
    scene = echoOf(event, meters);
    if (scene.flag) flags.push(scene.flag);
  }
  if (scene.start_effects) apply(meters, scene.start_effects);
  const lines = extra ? [extra] : [];
  if (scene.start_line) lines.push(scene.start_line);
  return { scene, lines, options: scene.options ?? [] };
}

type Walk = {
  meters: Meters;
  flags: string[];
  moves: string;
  extra: Text | null;
  open: Open | null;
};

function startWalk(n: number): Walk {
  const row = rowOf(n);
  const walk: Walk = {
    meters: { water: row.water, power: row.power, dust: 0, seal: 0 },
    flags: [],
    moves: "",
    extra: null,
    open: null,
  };
  walk.open = openAt(walk.meters, walk.flags, row.order, 1, null);
  return walk;
}

function settle(walk: Walk, effects: Effects, step: number): void {
  apply(walk.meters, effects);
  const left = 4 + (effects.time ?? 0);
  walk.extra = null;
  if (left >= 3) {
    walk.meters.dust -= 1;
    clamp(walk.meters);
    walk.extra = table.state.vacuum_line;
  }
  if (step < 7) {
    const [water, power] = NIGHTS[step - 1] ?? [0, 0];
    walk.meters.water -= water;
    walk.meters.power -= power;
    if (walk.meters.dust >= 4) walk.meters.water -= 1;
    clamp(walk.meters);
  }
}

function replay(n: number, moves: string): Walk {
  const row = rowOf(n);
  const walk = startWalk(n);
  for (const letter of moves) {
    const step = walk.moves.length + 1;
    if (step > 8) break;
    if (step === 8) {
      walk.moves += letter;
      walk.extra = null;
      walk.open = null;
      continue;
    }
    const option = letter === "P"
      ? walk.open?.options.find((item) => item.key === "B")
      : walk.open?.options.find((item) => item.key === letter);
    if (!option) throw new Error("move");
    if (letter !== "P" && option.flag) walk.flags.push(option.flag);
    settle(walk, option.effects, step);
    walk.moves += letter;
    const next = step + 1;
    walk.open = next <= 7 ? openAt(walk.meters, walk.flags, row.order, next, walk.extra) : null;
  }
  return walk;
}

function soFar(moves: string, flags: string[], names: Names, lang: Lang): string {
  const labels = lang === "zh" ? table.state.so_far_labels_zh : table.state.so_far_labels;
  const choices = [...moves.slice(0, 7)].map((letter, index) => (lang === "zh" ? `第${index + 1}天 ${letter}` : `sol ${index + 1} ${letter}`));
  const flagLabels = flags.map((flag) => fill(labels[flag] ?? "", names)).filter((label) => label !== "");
  const parts = [...choices, ...flagLabels];
  if (parts.length === 0) return lang === "zh" ? "無" : "none";
  return parts.join("; ");
}

function replyBlock(offered: string[]): string {
  const letters = [...offered, "PASS"].join(", ").replace(/, ([^,]+)$/u, " or $1");
  return [
    "reply_format:",
    "Line 1: A",
    "Line 2: COMMENT: [plain text, max 280 chars]",
    `Letters: ${letters}`,
    "P = PASS",
    "No score, no right answer.",
    `If the last line is not ${AIRLOCK_V2_END}: NO MOVE: truncated`,
    "If the packet is broken: NO MOVE: [reason]",
    "Example:",
    "8: A",
    "COMMENT: [plain text, max 280 chars]",
  ].join("\n");
}

function stateLine(meters: Meters, lang: Lang): string {
  const labels = table.state.state_labels[lang];
  return `state: ${labels.water} ${tier("water", meters.water, lang)} · ${labels.power} ${tier("power", meters.power, lang)} · ${labels.dust} ${tier("dust", meters.dust, lang)} · ${labels.seal} ${tier("seal", meters.seal, lang)} · ${labels.airlock} 4h`;
}

function packetFor(label: string, lang: Lang, step: number, solShown: number, meters: Meters, lines: Text[], flags: string[], scene: string, options: Option[], moves: string, names: Names): string {
  const optionLines = options.map((option) => `${option.key} ${fill(say(option, lang), names)}`).join("\n");
  const shown = lines.map((line) => fill(say(line, lang), names));
  return [
    `AIRLOCK-PACKET ${AIRLOCK_V2}`,
    `seed: ${label}  sol: ${solShown}/7  step: ${step}/8  expected_move_number: ${step}`,
    stateLine(meters, lang),
    ...shown,
    `so_far: ${soFar(moves, flags, names, lang)}`,
    `scene: ${scene}`,
    "options:",
    optionLines,
    "PASS",
    replyBlock(options.map((option) => option.key)),
    `resume: ${label}/${AIRLOCK_V2}/${moves}`,
    AIRLOCK_V2_END,
    "",
  ].join("\n");
}

function dashed(moves: string): string {
  return [moves.slice(0, 3), moves.slice(3, 6), moves.slice(6, 8)].filter((part) => part !== "").join("-");
}

export function airlockV2Ending(label: string, moves: string, lang: Lang): string {
  const parsed = parseAirlockV2Seed(label);
  if (!parsed) throw new Error("seed");
  const names = rowOf(parsed.n).names;
  const walk = replay(parsed.n, moves);
  const choice = moves.at(-1);
  const values: Record<string, string> = {
    water_tier: tier("water", walk.meters.water, lang),
    power_tier: tier("power", walk.meters.power, lang),
    dust_tier: tier("dust", walk.meters.dust, lang),
    seal_tier: tier("seal", walk.meters.seal, lang),
    lesson: "",
    lesson_zh: "",
    replay: `${parsed.label}/${AIRLOCK_V2}/${dashed(moves)}`,
    note: "",
  };
  const format = (template: string) => template.replace(/\{([a-z_]+)\}/gu, (_, key: string) => values[key] ?? "");
  let note = "";
  if (choice === "B") note = lang === "zh" ? "一切正常。" : "All normal.";
  else if (choice === "A") {
    const template = table.step8.options[0]?.note_template;
    note = template ? format(fill(say(template, lang), names)).trim() : "";
  }
  const resources = walk.meters.water + walk.meters.power;
  const dust = walk.meters.dust;
  const key = resources >= 14 && dust >= 4 ? "kept_resources" : dust <= 1 && resources < 14 ? "kept_clean" : dust <= 3 && resources >= 14 ? "balance" : "stretched";
  const ending = {
    opening: fillText(table.ending.opening, names),
    flag_lines: Object.fromEntries(Object.entries(table.ending.flag_lines).map(([flag, text]) => [flag, fillText(text, names)])),
    protected: fillText(table.ending.protected_let_go.lines[key] ?? { en: "", zh: "" }, names),
    note_line: fillText(table.ending.note_line, names),
    blank: fillText(table.ending.note_line.blank, names),
    closing: fillText(table.ending.closing, names),
  };
  const flagLines = walk.flags.filter((flag) => flag in ending.flag_lines).map((flag) => say(ending.flag_lines[flag] ?? { en: "", zh: "" }, lang));
  const noteLine = note === "" ? say(ending.blank, lang) : format(say(ending.note_line, lang).replace("{note}", note));
  return [
    format(say(ending.opening, lang)),
    ...flagLines,
    say(ending.protected, lang),
    noteLine,
    format(say(ending.closing, lang)),
  ].join(lang === "zh" ? "" : " ");
}

export function airlockV2Text(label: string, lang: Lang, moves: string): string {
  const parsed = parseAirlockV2Seed(label);
  if (!parsed) throw new Error("seed");
  if (!/^[ABCDP]*$/u.test(moves) || moves.length > 8) throw new Error("moves");
  const names = rowOf(parsed.n).names;
  const walk = replay(parsed.n, moves);
  if (moves.length === 8) return `${airlockV2Ending(parsed.label, moves, lang)}\n${AIRLOCK_V2_END}\n`;
  const step = moves.length + 1;
  if (step === 8) {
    const scene = fill(say(table.step8.scene, lang), names)
      .replace("{dust_tier}", tier("dust", walk.meters.dust, lang))
      .replace("{seal_tier}", tier("seal", walk.meters.seal, lang));
    const lines = walk.extra ? [walk.extra] : [];
    return packetFor(parsed.label, lang, 8, 7, walk.meters, lines, walk.flags, scene, table.step8.options, moves, names);
  }
  const open = walk.open;
  if (!open) throw new Error("open");
  return packetFor(
    parsed.label,
    lang,
    step,
    step,
    walk.meters,
    open.lines,
    walk.flags,
    fill(say(open.scene.scene ?? { en: "", zh: "" }, lang), names),
    open.options,
    moves,
    names,
  );
}

export function airlockV2Offered(label: string, moves: string): string[] {
  const text = airlockV2Text(label, "en", moves);
  if (text.includes("Replay:") || text.includes("回放碼：")) return [];
  const options = text.split("options:\n")[1]?.split("\nPASS\n")[0] ?? "";
  return options.split("\n").map((line) => line.slice(0, 1)).filter((letter) => letter !== "");
}
