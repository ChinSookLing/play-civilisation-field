import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { parseT7, uncoveredT7Lines } from "./proof-table-008-t7-read.ts";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T7-v0.3.md", import.meta.url);
const packagePath = new URL(
  "../../../public/gathering/proof-table-008/t7/PT008-T7-Gathering-Review-v0.3.zip",
  import.meta.url,
);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const MANUSCRIPT = "8efb3c94f268d6606f18587b8399f025a2d9ee44ce9d8818c4678b49d892bd22";
const PACKAGE = "48f54cf5a1cbba7373938d083e7eacc3168d207bf9a9096af8e0d8f7a2a38234";

test("the T7 manuscript and review package are the filed bytes", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(bytes.length, 25789);
  assert.equal(bytes.subarray(-1)[0], 0x0a);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), MANUSCRIPT);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("# PT-008 Gathering｜七跑者的直接選時構造\n"), true);
  assert.equal(text.includes("外審準備稿 v0.3"), true);
  assert.equal(text.includes("**定理 T7（整數構造）。**"), true);
  assert.equal(text.includes("外部評審與新穎性查核尚未進行。"), true);
  assert.equal(text.includes("任意人數的通式（One Formula）仍開放。"), true);
  assert.equal(text.includes("SALON-014〈第七位跑者，請在 16 日以前過線〉"), true);
  assert.equal(text.endsWith("英文讀者可先讀 `REVIEW-GUIDE-EN.md`。\n"), true);
  const zip = readFileSync(packagePath);
  assert.equal(zip.length, 719265);
  assert.equal(createHash("sha256").update(zip).digest("hex"), PACKAGE);
});

test("filing T7 does not edit the proof-table ledger module", () => {
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("PT008-T7"), false);
  assert.equal(ledger.includes("t7"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});

test("the reading blocks keep the manuscript lines, and the formulas render", () => {
  const text = readFileSync(manuscriptPath, "utf8");
  const blocks = parseT7(text);
  assert.deepEqual(uncoveredT7Lines(text, blocks), []);
  const headings = blocks.flatMap((block) => (block.kind === "heading" && block.id ? [block.id] : []));
  assert.deepEqual(headings, ["abstract", "contract", "entrance", "join", "mixed", "replay", "index", "review"]);
  assert.equal(blocks.filter((block) => block.kind === "math").length, 6);
  assert.equal(blocks.filter((block) => block.kind === "code").length, 4);
  for (const block of blocks) {
    if (block.kind !== "math") continue;
    const html = katex.renderToString(block.tex, { displayMode: true, throwOnError: true, trust: false });
    assert.equal(html.includes("katex"), true);
  }
  const inline = text.match(/\$[^$\n]+\$/g) ?? [];
  assert.equal(inline.length > 0, true);
  for (const token of inline) {
    katex.renderToString(token.slice(1, -1), { displayMode: false, throwOnError: true, trust: false, strict: "ignore" });
  }
});
