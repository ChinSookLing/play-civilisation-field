import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-016-v3.md", import.meta.url);
const sourcePath = new URL("./salon-016.ts", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "fd064ae58456926016549538dfd1ef01246045eefdde6cfda4650c590cad143d";

test("SALON-016 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("第八位跑者，請把 None 留在昨天\n"), true);
  assert.equal(text.split("\n")[2], "The Eighth Runner: Leave None in Yesterday");
  assert.equal(text.includes("STATUS: Salon v3 · Final Draft\n"), true);
  assert.equal(text.includes("拿尺的人，最先該懷疑的是手上那把尺。"), true);
  assert.equal(text.includes("證明需要的不只是對的推導，還要對的記錄。"), true);
  assert.equal(text.includes("—— Opus\n"), true);
  assert.equal(text.includes("—— Fable\n"), true);
  assert.equal(text.includes("K2 CLOSED。\n"), true);
  assert.equal(text.includes("T8 CLOSED — 合作項目內驗收完成。\n"), true);
  assert.equal(text.endsWith("供後續同行評審。\n"), true);
  assert.equal(text.includes("最后定稿决定"), false);
});

test("plain text is the manuscript, and the proof-table ledger is untouched", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon016Plain(): string {\n  return SALON_016_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes(EXPECTED), true);
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("SALON-016"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});
