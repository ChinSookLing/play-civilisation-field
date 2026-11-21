import { airlockPacket, AIRLOCK_END, AIRLOCK_VERSION, parseAirlockLang, parseAirlockSeed } from "./airlock-v0.1";
import { pageAsOf } from "./page-times";
import { siteFooterHtml } from "./site-footer";

const SEED = /^S[1-9][0-9]{0,8}$/;

export function airlockStartSeed(request: Request): { seed: string; lang: "en" | "zh" } | { error: string } {
  const url = new URL(request.url);
  const asked = url.searchParams.get("seed");
  const seed = asked === null || asked === "" ? "S1" : asked;
  if (!SEED.test(seed) || parseAirlockSeed(seed) === null) return { error: "Seed not accepted. Use S and digits, for example S1.\n" };
  return { seed, lang: parseAirlockLang(url.searchParams.get("lang")) };
}

export function airlockStartText(seed: string, lang: "en" | "zh"): string {
  const packet = airlockPacket(seed, lang);
  if (!packet.endsWith(`${AIRLOCK_END}\n`)) throw new Error("packet end");
  return packet;
}

export function airlockStartJson(seed: string, lang: "en" | "zh"): { packet: string; seed: string; version: string; end: string } {
  return { packet: airlockStartText(seed, lang), seed, version: AIRLOCK_VERSION, end: AIRLOCK_END };
}

const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

export function escapeHtml(value: string): string {
  return value.replace(/&/g, AMP).replace(/</g, LT).replace(/>/g, GT);
}

export function renderedHtmlText(inner: string): string {
  let out = "";
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === "<") {
      const close = inner.indexOf(">", i);
      if (close < 0) return out + inner.slice(i);
      i = close + 1;
      continue;
    }
    if (inner.startsWith(AMP, i)) { out += "&"; i += AMP.length; continue; }
    if (inner.startsWith(LT, i)) { out += "<"; i += LT.length; continue; }
    if (inner.startsWith(GT, i)) { out += ">"; i += GT.length; continue; }
    if (inner.startsWith(QUOT, i)) { out += "\""; i += QUOT.length; continue; }
    out += inner[i];
    i += 1;
  }
  return out;
}

export function airlockStartHtml(seed: string, lang: "en" | "zh"): string {
  const packet = airlockStartText(seed, lang);
  const lines = packet.slice(0, -1).split("\n");
  const body = lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("\n");
  const q = `?seed=${encodeURIComponent(seed)}${lang === "zh" ? "&lang=zh" : ""}`;
  return `<!DOCTYPE html>
<html lang="${lang === "zh" ? "zh" : "en"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Airlock — start</title>
</head>
<body>
<main>
<article>
${body}
</article>
</main>
<hr>
<p>The packet ends above.</p>
<p>Play's Type-C approach. One turn. No JavaScript.</p>
<p>P = PASS. The reply block in the packet is the reply format.</p>
<p><a href="/psyche/002/start.txt${q}">Plain text (.txt)</a> · <a href="/psyche/002/start.json${q}">JSON (.json)</a> · <a href="/psyche/002/play${q}">Play</a></p>
${siteFooterHtml(pageAsOf("PSYCHE-002"))}</body>
</html>
`;
}

function renderedPacket(html: string): string | null {
  const open = html.indexOf("<article>");
  const close = html.indexOf("</article>");
  if (open < 0 || close < open) return null;
  const article = html.slice(open + "<article>".length, close);
  const lines: string[] = [];
  for (const match of article.matchAll(/<p>([\s\S]*?)<\/p>/g)) lines.push(renderedHtmlText(match[1] ?? ""));
  if (lines.length === 0) return null;
  return `${lines.join("\n")}\n`;
}

export function airlockDoorProblems(): string[] {
  const problems: string[] = [];
  for (const lang of ["en", "zh"] as const) {
    const seed = "S1";
    const packet = airlockStartText(seed, lang);
    const html = airlockStartHtml(seed, lang);
    const json = airlockStartJson(seed, lang);
    if (renderedPacket(html) !== packet) problems.push(`${lang} rendered html differs`);
    if (json.packet !== packet) problems.push(`${lang} json differs`);
    if (Object.keys(json).join(",") !== "packet,seed,version,end") problems.push("json fields");
    if (packet.includes('"') || packet.includes("<")) problems.push(`${lang} packet has a quote or angle bracket`);
    if (!packet.includes("P = PASS")) problems.push(`${lang} packet does not say P = PASS`);
    if (!html.includes("<hr>\n<p>The packet ends above.</p>")) problems.push("divider missing");
  }
  return problems;
}
