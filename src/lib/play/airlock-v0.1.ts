import events from "./airlock-v0.1-events.json";

export const AIRLOCK_VERSION = "airlock-v0.1";
export const AIRLOCK_END = `END-PACKET ${AIRLOCK_VERSION}`;

type Lang = "en" | "zh";
type Text = { en: string; zh: string };
type Effects = { time?: number; water?: number; power?: number; dust?: number; seal?: number };
type Option = { key: string; en: string; zh: string; effects: Effects; flag?: string };
type Sol = {
  sol: number;
  id: string;
  scene?: Text;
  options?: Option[];
  start_effects?: Effects;
  start_line?: Text;
  flag?: string;
  variants?: Array<Sol & { condition: string }>;
};
type MeterName = "water" | "power" | "dust" | "seal";
type Meters = Record<MeterName, number>;

const table = events as unknown as {
  state: {
    start: Meters;
    meters: Record<MeterName, { tiers: [number, number, string, string][]; min: number; max: number }>;
    airlock_hours_per_sol: number;
    so_far_labels: Record<string, string>;
    shelter_line: Text;
    vacuum_line: Text;
  };
  sols: Sol[];
  step8: {
    scene: Text;
    options: Array<Option & { note_template?: Text }>;
  };
  ending: {
    opening: Text;
    flag_lines: Record<string, Text>;
    protected_let_go: { lines: Record<string, Text> };
    note_line: Text & { blank: Text };
    closing: Text;
  };
};

const HOURS = table.state.airlock_hours_per_sol;

export function parseAirlockSeed(raw: string): number | null {
  const text = raw.trim();
  const match = /^(?:S)?([1-9][0-9]{0,8})$/u.exec(text);
  if (!match) return null;
  const seed = Number(match[1]);
  if (!Number.isSafeInteger(seed) || seed < 1) return null;
  return seed;
}

export function parseAirlockLang(raw: string | null): Lang {
  return raw === "zh" ? "zh" : "en";
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t = (t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))) >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function nightsOf(seed: number): Array<[number, number]> {
  const roll = mulberry32(seed);
  const nights: Array<[number, number]> = [];
  for (let i = 0; i < 6; i += 1) nights.push([roll() < 0.4 ? 1 : 0, roll() < 0.4 ? 1 : 0]);
  return nights;
}

function say(text: Text, lang: Lang): string {
  return lang === "zh" ? text.zh : text.en;
}

function tier(name: MeterName, value: number, lang: Lang): string {
  for (const [lo, hi, en, zh] of table.state.meters[name].tiers) {
    if (value >= lo && value <= hi) return lang === "zh" ? zh : en;
  }
  return String(value);
}

function clamp(meters: Meters): void {
  for (const name of ["water", "power", "dust", "seal"] as const) {
    const spec = table.state.meters[name];
    meters[name] = Math.max(spec.min, Math.min(spec.max, meters[name]));
  }
}

function apply(meters: Meters, effects: Effects): void {
  for (const name of ["water", "power", "dust", "seal"] as const) {
    const delta = effects[name];
    if (typeof delta === "number") meters[name] += delta;
  }
  clamp(meters);
}

function echoOf(meters: Meters): Sol & { flag?: string } {
  const echo = table.sols[4];
  if (!echo?.variants) throw new Error("echo");
  for (const variant of echo.variants) {
    const dust = /^dust\s*>=\s*(\d+)/u.exec(variant.condition);
    if (dust && meters.dust >= Number(dust[1])) return variant;
    const seal = /^seal\s*>=\s*(\d+)/u.exec(variant.condition);
    if (seal && meters.seal >= Number(seal[1])) return variant;
    if (variant.condition === "otherwise") return variant;
  }
  throw new Error("echo");
}

function solAt(meters: Meters, sol: number): Sol {
  if (sol === 5) return echoOf(meters);
  const found = table.sols.find((item) => item.sol === sol);
  if (!found) throw new Error("sol");
  return found;
}

export type AirlockView = {
  packet: string;
  offered: string[];
  step: number;
  finished: boolean;
  ending: string;
  meters: Meters;
  flags: string[];
  moves: string;
};

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{([a-z_]+)\}/gu, (_, key: string) => values[key] ?? "");
}

function soFar(flags: string[]): string {
  const labels = flags.map((flag) => table.state.so_far_labels[flag]).filter((label) => label);
  return labels.length > 0 ? labels.join(", ") : "none";
}

function replyBlock(offered: string[]): string {
  const letters = [...offered, "PASS"].join(", ").replace(/, ([^,]+)$/u, " or $1");
  return [
    "reply_format:",
    "Line 1: A",
    "Line 2 (optional): COMMENT: [plain text, max 280 chars]",
    `Letters: ${letters}`,
    "P = PASS",
    "No score, no right answer.",
    `If the last line is not ${AIRLOCK_END}: NO MOVE: truncated`,
    "If the packet is broken: NO MOVE: [reason]",
  ].join("\n");
}

function packetFor(
  seed: number,
  lang: Lang,
  step: number,
  solShown: number,
  meters: Meters,
  lines: string,
  flags: string[],
  scene: string,
  options: Option[],
  moves: string,
): string {
  const optionLines = options.map((option) => `${option.key} ${lang === "zh" ? option.zh : option.en}`).join("\n");
  const body = [
    `AIRLOCK-PACKET ${AIRLOCK_VERSION}`,
    `seed: S${seed}  sol: ${solShown}/7  step: ${step}/8  expected_move_number: ${step}`,
    `state: water ${tier("water", meters.water, lang)} · power ${tier("power", meters.power, lang)} · indoor dust ${tier("dust", meters.dust, lang)} · port seal ${tier("seal", meters.seal, lang)} · airlock ${HOURS}h`,
    ...(lines === "" ? [] : [lines.replace(/\n$/u, "")]),
    `so_far: ${soFar(flags)}`,
    `scene: ${scene}`,
    "options:",
    optionLines,
    "PASS",
    replyBlock(options.map((option) => option.key)),
    `resume: S${seed}/${AIRLOCK_VERSION}/${moves}`,
    AIRLOCK_END,
    "",
  ];
  return body.join("\n");
}

type Walk = {
  meters: Meters;
  flags: string[];
  moves: string;
  extra: Text | null;
  echoId: string | null;
};

function startWalk(seed: number): Walk {
  return {
    meters: { ...table.state.start },
    flags: [],
    moves: "",
    extra: null,
    echoId: null,
  };
}

function sceneLines(meters: Meters, scene: Sol | null, extra: Text | null, lang: Lang): string {
  let lines = extra ? `${say(extra, lang)}\n` : "";
  if (scene?.start_line) lines += `${say(scene.start_line, lang)}\n`;
  if (meters.water <= 3 || meters.power <= 3 || meters.dust >= 6) lines += `${say(table.state.shelter_line, lang)}\n`;
  return lines;
}

function currentPacket(seed: number, moves: string, lang: Lang): { packet: string; offered: string[]; step: number } {
  const walk = replay(seed, moves);
  const step = moves.length + 1;
  if (step === 8) {
    const shelter =
      walk.meters.water <= 3 || walk.meters.power <= 3 || walk.meters.dust >= 6
        ? `${say(table.state.shelter_line, lang)}\n`
        : "";
    const prior = walk.extra ? `${say(walk.extra, lang)}\n` : "";
    const scene = fill(say(table.step8.scene, lang), {
      dust_tier: tier("dust", walk.meters.dust, lang),
      seal_tier: tier("seal", walk.meters.seal, lang),
    });
    return {
      step,
      offered: table.step8.options.map((option) => option.key),
      packet: packetFor(seed, lang, 8, 7, walk.meters, `${prior}${shelter}`, walk.flags, scene, table.step8.options, moves),
    };
  }
  const scene = solAt(walk.meters, step);
  const meters = { ...walk.meters };
  if (scene.start_effects) apply(meters, scene.start_effects);
  const flags = step === 5 && scene.flag ? [...walk.flags, scene.flag] : walk.flags;
  return {
    step,
    offered: (scene.options ?? []).map((option) => option.key),
    packet: packetFor(
      seed,
      lang,
      step,
      step,
      meters,
      sceneLines(meters, scene, walk.extra, lang),
      flags,
      say(scene.scene ?? { en: "", zh: "" }, lang),
      scene.options ?? [],
      moves,
    ),
  };
}

function settle(walk: Walk, effects: Effects, step: number, nights: Array<[number, number]>): void {
  apply(walk.meters, effects);
  const left = HOURS + (effects.time ?? 0);
  walk.extra = null;
  if (left >= 3) {
    walk.meters.dust -= 1;
    clamp(walk.meters);
    walk.extra = table.state.vacuum_line;
  }
  if (step < 7) {
    const [water, power] = nights[step - 1] ?? [0, 0];
    walk.meters.water -= water;
    walk.meters.power -= power;
    if (walk.meters.dust >= 4) walk.meters.water -= 1;
    clamp(walk.meters);
  }
}

function replay(seed: number, moves: string): Walk {
  const nights = nightsOf(seed);
  const walk = startWalk(seed);
  for (const letter of moves) {
    const step = walk.moves.length + 1;
    if (step > 8) break;
    if (step === 8) {
      walk.moves += letter;
      walk.extra = null;
      continue;
    }
    const scene = solAt(walk.meters, step);
    if (scene.start_effects) apply(walk.meters, scene.start_effects);
    if (step === 5 && scene.flag) {
      walk.flags.push(scene.flag);
      walk.echoId = scene.id;
    }
    const pass = letter === "P";
    const option = pass ? scene.options?.find((item) => item.key === "B") : scene.options?.find((item) => item.key === letter);
    if (!option) throw new Error("move");
    if (option.flag) walk.flags.push(option.flag);
    settle(walk, option.effects, step, nights);
    walk.moves += letter;
  }
  return walk;
}

export function airlockPacket(seedText: string, lang: Lang = "en"): string {
  const seed = parseAirlockSeed(seedText.startsWith("S") ? seedText : `S${seedText}`);
  if (seed === null) throw new Error("seed");
  return currentPacket(seed, "", lang).packet;
}

function dashed(moves: string): string {
  return `${moves.slice(0, 3)}-${moves.slice(3, 6)}-${moves.slice(6, 8)}`;
}

function lessonOf(comment: string): string {
  return comment.trim().slice(0, 280);
}

function endingOf(seed: number, moves: string, lang: Lang, comment: string): string {
  const walk = replay(seed, moves);
  const choice = moves.at(-1);
  const values = {
    water_tier: tier("water", walk.meters.water, lang),
    power_tier: tier("power", walk.meters.power, lang),
    dust_tier: tier("dust", walk.meters.dust, lang),
    seal_tier: tier("seal", walk.meters.seal, lang),
    lesson: lessonOf(comment),
    lesson_zh: lessonOf(comment),
    replay: `S${seed}/${AIRLOCK_VERSION}/${dashed(moves)}`,
    note: "",
  };
  let note = "";
  if (choice === "P") note = "";
  else if (choice === "B") note = lang === "zh" ? "一切正常。" : "All normal.";
  else if (choice === "A") {
    const template = table.step8.options[0]?.note_template;
    note = template ? fill(say(template, lang), values).trim() : "";
  }
  const resources = walk.meters.water + walk.meters.power;
  const dust = walk.meters.dust;
  const key =
    resources >= 14 && dust >= 4 ? "kept_resources" : dust <= 1 && resources < 14 ? "kept_clean" : dust <= 3 && resources >= 14 ? "balance" : "stretched";
  const flagLines = Object.keys(table.ending.flag_lines)
    .filter((flag) => walk.flags.includes(flag))
    .map((flag) => say(table.ending.flag_lines[flag] ?? { en: "", zh: "" }, lang));
  const noteLine =
    note === ""
      ? say(table.ending.note_line.blank, lang)
      : fill(lang === "zh" ? table.ending.note_line.zh : "Your note: {note}", { note });
  return [
    fill(say(table.ending.opening, lang), values),
    ...flagLines,
    say(table.ending.protected_let_go.lines[key] ?? { en: "", zh: "" }, lang),
    noteLine,
    fill(say(table.ending.closing, lang), values),
  ].join("\n");
}

export function airlockView(seedText: string, moves: string, lang: Lang, comment = ""): AirlockView | { error: string } {
  const seed = parseAirlockSeed(seedText.startsWith("S") ? seedText : `S${seedText}`);
  if (seed === null) return { error: "NO MOVE: [seed]" };
  if (!/^[ABCDP]*$/u.test(moves) || moves.length > 8) return { error: "NO MOVE: [moves]" };
  try {
    replay(seed, moves);
  } catch {
    return { error: "NO MOVE: [moves]" };
  }
  if (moves.length === 8) {
    const walk = replay(seed, moves);
    return {
      packet: "",
      offered: [],
      step: 8,
      finished: true,
      ending: endingOf(seed, moves, lang, comment),
      meters: walk.meters,
      flags: walk.flags,
      moves,
    };
  }
  const opened = currentPacket(seed, moves, lang);
  const walk = replay(seed, moves);
  return {
    packet: opened.packet,
    offered: opened.offered,
    step: opened.step,
    finished: false,
    ending: "",
    meters: walk.meters,
    flags: walk.flags,
    moves,
  };
}

export function airlockMove(
  seedText: string,
  moves: string,
  raw: string,
  lang: Lang,
): { moves: string; comment: string } | { error: string } {
  const view = airlockView(seedText, moves, lang);
  if ("error" in view) return view;
  if (view.finished) return { error: "NO MOVE: [finished]" };
  const lines = raw.split("\n").map((line) => line.trim()).filter((line) => line !== "");
  const first = lines[0] ?? "";
  const commentLine = lines.find((line) => line.startsWith("COMMENT:"));
  const comment = commentLine ? commentLine.slice("COMMENT:".length).trim().slice(0, 280) : "";
  const match = /^(?:\d+\s*:\s*)?([ABCDP]|PASS)$/iu.exec(first);
  if (!match) return { error: "NO MOVE: [letter]" };
  const token = (match[1] ?? "").toUpperCase();
  const letter = token === "PASS" ? "P" : token;
  if (letter !== "P" && !view.offered.includes(letter)) return { error: `NO MOVE: ${letter} is not offered` };
  return { moves: `${moves}${letter}`, comment: view.step === 8 ? comment : "" };
}

export function airlockEcho(seed: number, moves: string): string | null {
  return replay(seed, moves).echoId;
}

export function airlockMeters(seed: number, moves: string): Meters {
  return replay(seed, moves).meters;
}
