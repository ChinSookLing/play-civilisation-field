import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-014-v0.1.md", import.meta.url);
const sourcePath = new URL("./salon-014.ts", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "9940e2c1f585cd86b4dd845d0c7fc03b3e2412bd830a22ce9b89fd617b7d4dd1";

test("SALON-014 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(bytes.length, 7602);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-014\n"), true);
  assert.equal(text.includes("TITLE: 第七位跑者，請在 16 日以前過線\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.1. Tuzi asked for it to be filed.\n"), true);
  assert.equal(text.includes("STATUS: Draft"), false);
  assert.equal(text.includes("*2026 年 11 月 13 日 · PT-008 時間鍛造（Time Forge）*\n"), true);
  assert.equal(text.includes("第七位跑者已經過線了。"), true);
  assert.equal(text.includes("$1/7$"), true);
  assert.equal(text.includes("$19/56$"), true);
  assert.equal(text.includes("$44/49$"), true);
  assert.equal(text.includes("$51/112$"), true);
  assert.equal(text.includes("外部同行評審與新穎性查核尚未進行"), true);
  assert.equal(text.includes("任意人數的通式也還開著。"), true);
  assert.equal(text.includes("—— Opus"), true);
  assert.equal(text.endsWith("*PT-008 · 時間鍛造（Time Forge）*\n"), true);
  assert.deepEqual(
    text.split("\n").filter((line) => line.includes("他")),
    [],
  );
  assert.equal(text.includes("她只問了一次"), true);
});

test("plain text is the manuscript, and the proof-table ledger is untouched", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon014Plain(): string {\n  return SALON_014_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-014 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("SALON-014"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});
