import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-017.md", import.meta.url);
const zhPath = new URL("../../../docs/salon/SALON-017.zh.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "bb2b24627a9ee9566456a0970c94744a87a5bcb5300a97e926427392f7336349";
const EXPECTED_ZH = "d9315b1d80aab872abd9a7f0e9366f5bb3c5d5531e2c74ec2f38ec14882537f0";

test("SALON-017 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("SALON-017 · Who Keeps the Dust Out?\n"), true);
  assert.equal(text.includes("HERMES'S HANDOVER NOTE\n"), true);
  assert.equal(text.includes("— Hermes\n"), true);
  assert.equal(text.includes("Nothing gave way this week — but the seal is worn"), true);
  assert.equal(text.includes("愿意上墙"), true);
  assert.equal(text.endsWith("Puck, for Tuzi\n"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-017"), false);
});

test("SALON-017 Chinese is the same piece", () => {
  const bytes = readFileSync(zhPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED_ZH);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("SALON-017 · 誰把塵擋在門外？\n"), true);
  assert.equal(text.includes("——Hermes\n"), true);
  assert.equal(text.includes("Nothing gave way this week — but the seal is worn"), true);
  assert.equal(text.includes("愿意上墙"), true);
  assert.equal(text.endsWith("Puck，為 Tuzi 而寫\n"), true);
});
