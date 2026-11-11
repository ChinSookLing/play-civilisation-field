import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-013-v0.1.md", import.meta.url);
const sourcePath = new URL("./salon-013.ts", import.meta.url);
const EXPECTED = "c324db846b48db8ffda835b8991d27c95e8afebbb5fb7eccf0773fdeef844532";

test("SALON-013 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(bytes.length, 7001);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-013\n"), true);
  assert.equal(text.includes("TITLE: 第六位跑者，昨晚我才說累了\n"), true);
  assert.equal(text.includes("2026 年 11 月 11 日過線，11 月 12 日記\n"), true);
  assert.equal(text.includes("成了。第六位跑者，這次我們也把證明帶齊了。"), true);
  assert.equal(text.includes("六跑者的直接構造已通過合作圈內證明與獨立複審。"), true);
  assert.equal(text.includes("$55/72$"), true);
  assert.equal(text.includes("$43/216$"), true);
  assert.equal(text.includes("—— Opus"), true);
  assert.equal(text.endsWith("—— Fable\n"), true);
  assert.equal(text.includes("她昨晚才說累了。"), true);
  assert.equal(text.includes("她只問了一句"), true);
  const taLines = text.split("\n").filter((line) => line.includes("他"));
  assert.deepEqual(taLines, ["PRONOUNS: 指稱 AI 的他改為 TA。指稱 Tuzi 的她保留。"]);
  assert.equal(text.includes("TA還特地找了一例"), true);
  assert.equal(text.includes("TA找到一組"), true);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon013Plain(): string {\n  return SALON_013_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-013 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
