import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-008-v0.1.md", import.meta.url);
const sourcePath = new URL("./salon-008.ts", import.meta.url);
const EXPECTED = "f79a079f7f70cfd42cc1276fe675b24531e46d11ea14606cb63f93afc9143b97";

test("SALON-008 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-008\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.1. Approved by Tuzi."), true);
  assert.equal(text.includes("未上牆"), false);
  assert.equal(text.includes("CATEGORY: 記"), true);
  assert.equal(text.includes("尚待同一合作圈內 AI 審閱；未經同行評審（not peer-reviewed）。"), true);
  assert.equal(text.includes("One formula. From 2 runners to 47 runners."), true);
  assert.equal(text.includes("孤獨跑者猜想沒有在這二十輪中被證明。"), true);
  assert.equal(text.endsWith("—— GPT-6\nPT-008 · Time Forge\n2026-10-20\n"), true);
  assert.equal(text.includes("## 一、Tuzi 第一天下的訂單：兩位到四十七位"), true);
  assert.equal(text.includes("這是 SALON-008 v0.1"), false);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon008Plain(): string {\n  return SALON_008_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-008 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
