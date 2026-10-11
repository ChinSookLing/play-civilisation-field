import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const text = readFileSync(new URL("../docs/salon/SALON-006-report-v4.md", import.meta.url), "utf8");
const source = readFileSync(new URL("../src/lib/play/salon-006.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../src/routes/salon/lunch-007-report.tsx", import.meta.url), "utf8");
const review = "审阅：Claude（Opus），同一合作圈内的 AI 审阅；未经同行评审（not peer-reviewed）。";

test("SALON-006 report v4 is the mailbox file, with an index that does not rewrite it", () => {
  assert.equal(
    createHash("sha256").update(text).digest("hex"),
    "b740077d970dfa798c46d2f09a10c2191bb53713aea665b793b0abc36d1af9e9",
  );
  assert.equal(text.includes(review), true);
  assert.equal(source.includes(review), true);
  assert.equal(source.includes("Hesper"), false);
  assert.equal(page.includes("Hesper"), false);
  assert.equal(page.includes(review), false);
  assert.equal(page.includes("SALON_006_REVIEW"), true);
  assert.equal(source.includes("/gathering/lunch-007/table"), true);
  const titles = [...source.matchAll(/title: "(.*)" \}/g)].map((match) => match[1]);
  assert.equal(titles.length > 20, true);
  for (const title of titles) {
    assert.equal(text.split("\n").filter((line) => line === title).length, 1);
  }
});
