import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T1-T5-v0.2.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "000e9c68ef14b82574b82890a3b4e53e606afd937c13f95f9b68220fb004802d";

test("the new-branch manuscript is the filed v0.2 file", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  assert.equal(bytes.length, 36410);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("# PT-008 · Time Forge · 新研究分支：一至五跑者的安全時間構造\n"), true);
  assert.equal(text.endsWith("**END · PT-008 NEW BRANCH · T1–T5 · v0.2**\n"), true);
  assert.equal(text.includes("不授權上牆或改台帳"), true);
  assert.equal(text.includes("T4-Q3"), true);
});

test("filing the new branch does not edit the proof-table ledger module", () => {
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("T4-Q3"), false);
  assert.equal(ledger.includes("new-branch"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});
