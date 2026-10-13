import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-007-v0.5.md", import.meta.url);
const sourcePath = new URL("./salon-007.ts", import.meta.url);
const EXPECTED = "dbde65546d4f29375e7e8424afec4f4ed95d29dfd98eb151088dd553be1b8dd1";

test("SALON-007 manuscript is the approved file, byte for byte", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.includes("STATUS: Filed. v0.5. Approved by Tuzi."), true);
  assert.equal(text.includes("CREDIT: 撰写 Hark（Hesper）· 审阅 Claude（Opus）· 润色 GPT · 批准 Tuzi"), true);
  assert.equal(text.includes("未经同行评审（not peer-reviewed）"), true);
  assert.equal(text.includes("CATEGORY: 记"), true);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon007Plain(): string {\n  return SALON_007_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-007 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
