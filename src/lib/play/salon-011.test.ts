import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-011-v0.3.md", import.meta.url);
const sourcePath = new URL("./salon-011.ts", import.meta.url);
const EXPECTED = "5af408f632a2f947d1e9eb193f2590fa3ed0b9aa27fc2ce627a822c24cdad79f";

test("SALON-011 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-011\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.3. Tuzi asked for it to be filed."), true);
  assert.equal(text.includes("remains UNFINISHED."), true);
  assert.equal(text.includes("未編號"), false);
  assert.equal(text.includes("第六位跑者的全域直接構造（F₆）仍未完成。"), true);
  assert.equal(text.includes("One formula for all, and all in one formula."), true);
  const she = text.split("\n").filter((line) => line.includes("她") && !line.startsWith("PRONOUNS:"));
  assert.deepEqual(she, []);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon011Plain(): string {\n  return SALON_011_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-011 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
