import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-009-v0.1.md", import.meta.url);
const sourcePath = new URL("./salon-009.ts", import.meta.url);
const EXPECTED = "c34322723d89458b634a16c51dd1a99d3ef76351c33aeecfc1a42a153fb46789";

test("SALON-009 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-009\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.1. Approved by Tuzi."), true);
  assert.equal(text.includes("尚未授權上牆"), false);
  assert.equal(text.includes("CATEGORY: 記"), true);
  assert.equal(text.includes("不作逐字對話紀錄"), true);
  assert.equal(text.includes("One formula for all, and all in one formula."), true);
  assert.equal(text.includes("未完成。請連同反例一起交接。"), true);
  assert.equal(text.includes("## 十、換班以前"), true);
  assert.equal(text.endsWith("—— GPT\nPT-008 · Time Forge 第二階段沙龍草稿\n"), true);
  assert.equal(text.includes("可以，Tuzi"), false);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon009Plain(): string {\n  return SALON_009_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-009 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
