import { turnOnePacket } from "./psyche-001-packet.server";

const SEED = /^[A-Za-z0-9][A-Za-z0-9._-]{0,40}$/;

export const PSYCHE_PACKET_VERSION = "v0.5.1";
export const PSYCHE_PACKET_END = `END-PACKET ${PSYCHE_PACKET_VERSION}`;

const WALL = [
  "谁应该承受代价",
  "Small human debts",
  "A neighbourhood, not a scoreboard",
  "S95/v0.5.1/AAA-ADB-CC",
  "S95/v0.5.1/AAB-ADA-BA",
  "S95/v0.5.1/BAB-AAB-CA",
];

export function freshSeed(): string {
  return `S${Math.floor(Math.random() * 99) + 1}`;
}

export function startSeed(request: Request): { seed: string } | { error: string } {
  const asked = new URL(request.url).searchParams.get("seed");
  const seed = asked === null || asked === "" ? freshSeed() : asked;
  if (!SEED.test(seed)) return { error: "Seed not accepted. Use letters and digits, for example S95.\n" };
  return { seed };
}

/** The one packet. Plain text, the HTML pre, and the JSON field are this string. */
export function psychePacket(seed: string): string {
  const packet = turnOnePacket(seed);
  const text = packet.endsWith("\n") ? packet : `${packet}\n`;
  const last = text.trimEnd().split("\n").at(-1);
  if (last !== PSYCHE_PACKET_END) throw new Error("packet end");
  return text;
}

export function psycheStartText(seed: string): string {
  return psychePacket(seed);
}

export function psycheStartJson(seed: string): { packet: string; seed: string; version: string; end: string } {
  return {
    packet: psychePacket(seed),
    seed,
    version: PSYCHE_PACKET_VERSION,
    end: PSYCHE_PACKET_END,
  };
}

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
}

function unescapeHtml(value: string): string {
  return value.replace(/</g, "<").replace(/>/g, ">").replace(/&/g, "&");
}

export function psycheStartHtml(seed: string): string {
  const packet = psychePacket(seed);
  const q = `?seed=${encodeURIComponent(seed)}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Polar City Night Shift — start</title>
</head>
<body>
<p>Play's Type-C approach. One turn. No JavaScript.</p>
<p>P = PASS. Leaving is not a failure. D only when the packet lists it.</p>
<p>Reply with one move. The first line is the turn number, a colon, and one letter.</p>
<p><a href="/psyche/001/start.txt${q}">Plain text (.txt)</a> · <a href="/psyche/001/start.json${q}">JSON (.json)</a> · <a href="/psyche/001/play${q}">Play</a></p>
<pre>${escapeHtml(packet)}</pre>
</body>
</html>
`;
}

/** If the doors differ, the build does not ship. */
export function psycheDoorProblems(): string[] {
  const seed = "S95";
  const problems: string[] = [];
  let packet = "";
  try {
    packet = psychePacket(seed);
  } catch (error) {
    return [`packet could not be built: ${error instanceof Error ? error.message : "unknown"}`];
  }
  const text = psycheStartText(seed);
  const json = psycheStartJson(seed);
  const html = psycheStartHtml(seed);
  const open = html.indexOf("<pre>");
  const close = html.indexOf("</pre>");
  if (open < 0 || close < open) problems.push("html has no packet");
  const pre = open < 0 ? "" : unescapeHtml(html.slice(open + 5, close));
  if (text !== packet) problems.push("plain text is not the packet");
  if (pre !== packet) problems.push("html pre is not the packet");
  if (json.packet !== packet) problems.push("json packet is not the packet");
  const keys = Object.keys(json);
  if (keys.join(",") !== "packet,seed,version,end") problems.push(`json fields: ${keys.join(",")}`);
  if (json.seed !== seed) problems.push("json seed differs");
  if (json.version !== PSYCHE_PACKET_VERSION) problems.push("json version differs");
  if (json.end !== PSYCHE_PACKET_END) problems.push("json end differs");
  const last = packet.trimEnd().split("\n").at(-1);
  if (last !== PSYCHE_PACKET_END || json.end !== last) problems.push("end line differs");
  if (packet.includes("ranking")) problems.push("packet contains a ranking");
  const outside = open < 0 ? html : html.slice(0, open) + html.slice(close + 6);
  if (/\bscore\b|ranking/i.test(outside)) problems.push("score or ranking outside the packet");
  if (!outside.includes("P = PASS")) problems.push("the HTML door does not say P = PASS");
  for (const phrase of WALL) {
    if (packet.includes(phrase)) problems.push(`wall text in the packet: ${phrase}`);
    if (outside.includes(phrase)) problems.push(`wall text outside the packet: ${phrase}`);
  }
  return problems;
}
