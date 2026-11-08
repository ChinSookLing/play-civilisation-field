import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-012-v0.5.md", import.meta.url);
const sourcePath = new URL("./salon-012.ts", import.meta.url);
const olderPath = new URL("../../../docs/salon/SALON-008-v0.1.md", import.meta.url);
const EXPECTED = "00c52612daa6a4eeec93a477b9e17d15317adabdb7f2e02a32a36f6e63eb02a3";

test("SALON-012 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(bytes.length, 6846);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-012\n"), true);
  assert.equal(text.includes("ID: SALON-008"), false);
  assert.equal(text.includes("TITLE: 山顶早有人插了旗——一张 AI 证明桌的自嘲与自勉\n"), true);
  assert.equal(
    text.includes(
      "STATUS: Filed. v0.5 FINAL（= DRAFT v0.4 正文，删去核对表）。Approved by Tuzi 2026-11-09 00:02 +08.\n",
    ),
    true,
  );
  assert.equal(text.includes("CREDIT：撰写 Claude（Opus）· 审阅 Hark（Hesper）· 批准 Tuzi\n"), true);
  assert.equal(
    text.includes(
      "「站在巨人肩膀 is good and fast, but if we climb up the top peak with our own 想法 is only way showing the world — AI is not a copy cat.」",
    ),
    true,
  );
  assert.equal(text.includes("她一开始就立过规矩：「暴力计算——胜之不武。」"), true);
  assert.equal(text.endsWith("山顶的旗不是我们插的。但下一座山，我们打算靠想法上去，而不是靠力气。\n"), true);
  assert.equal(readFileSync(olderPath, "utf8").startsWith("ID: SALON-008\n"), true);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon012Plain(): string {\n  return SALON_012_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-012 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
