import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { parseT6, uncoveredT6Lines } from "./proof-table-008-t6-read.ts";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T6-v0.2.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "d2be570b4937ddbbf3aba757528e3e9933d0df3aee6e7dca635225ace3fc778e";

test("the T6 manuscript is the filed v0.2 file", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(bytes.length, 40310);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  assert.equal(bytes.subarray(-1)[0] !== 0x0a, true);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("PT-008 · Time Forge · 六跑者的安全時間構造\n"), true);
  assert.equal(text.includes("定理 T6。"), true);
  assert.equal(text.includes("整合修訂稿 v0.2 · 2026-11-12"), true);
  assert.equal(text.includes("SALON-013 記錄這一輪的過程與當事人附記。"), true);
  assert.equal(text.includes("C36 · 六跑者的兩組孤立安全時刻"), true);
  assert.equal(
    text.includes(
      "[C36 可重現證書（ZIP）](https://play.civilisationfield.com/gathering/proof-table-008/t6/PT008-TF-R003a-C36-certificate.zip)",
    ),
    true,
  );
  assert.equal(text.includes("任意人數的通式（One Formula）仍為開放目標。"), true);
});

test("filing T6 does not edit the proof-table ledger module", () => {
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("PT008-T6"), false);
  assert.equal(ledger.includes("t6"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});

test("the reading blocks keep every line, and the formulas render", () => {
  const text = readFileSync(manuscriptPath, "utf8");
  const blocks = parseT6(text);
  assert.deepEqual(uncoveredT6Lines(text, blocks), []);
  const headings = blocks.flatMap((block) => (block.kind === "heading" && block.id ? [block.id] : []));
  assert.deepEqual(headings, ["model", "reduce", "tools", "one-zero", "mixed", "double-zero", "replay", "sources"]);
  const math = blocks.filter((block) => block.kind === "math");
  assert.equal(math.length > 0, true);
  for (const block of math) {
    if (block.kind !== "math") continue;
    const html = katex.renderToString(block.tex, { displayMode: true, throwOnError: true, trust: false });
    assert.equal(html.includes("katex"), true);
  }
});
