import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T8-v0.7.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "233db8f2d354e3262078288973dfb3febd5b0810eb56a7088bf65294f3c31897";

test("T8 manuscript is the filed draft", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("PT-008 · Time Forge · Gathering\n"), true);
  assert.equal(text.includes("Gathering v0.7"), true);
  assert.equal(text.includes("WEB OFF"), true);
  assert.equal(text.includes("附录 F · 160／96／32 分子覆盖映射收尾审计（2026-11-21）"), true);
  assert.equal(text.endsWith("不改台账。"), true);
});

test("the proof-table ledger is untouched", () => {
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("PT008-T8"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});
