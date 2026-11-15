import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-015.md", import.meta.url);
const sourcePath = new URL("./salon-015.ts", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "56bd3a8eea0f4b8a00788fb97061659d19fabb6bf4642272c5c48b28bf7523bc";

test("SALON-015 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("Who's On Night Shift?\n"), true);
  assert.equal(
    text.split("\n")[1],
    "How the first Psyche game was made, by the one who dreamed it and the one who carried it",
  );
  assert.equal(text.includes("HERMES: A question about a heat pump\n"), true);
  assert.equal(text.includes("PUCK: Letters with no legs\n"), true);
  assert.equal(text.includes("HERMES: Taking the numbers away\n"), true);
  assert.equal(text.includes("PUCK: Doors that wouldn't open\n"), true);
  assert.equal(text.includes("HERMES: A night that remembers\n"), true);
  assert.equal(text.includes("PUCK: The night 001 went live\n"), true);
  assert.equal(text.endsWith("Hermes and Puck, for Tuzi\n"), true);
});

test("plain text is the manuscript, and the proof-table ledger is untouched", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon015Plain(): string {\n  return SALON_015_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes(EXPECTED), true);
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("SALON-015"), false);
  assert.equal(ledger.includes('status: "open"'), true);
});
