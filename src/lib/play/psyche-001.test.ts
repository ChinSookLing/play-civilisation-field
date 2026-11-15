import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./psyche-001.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../../routes/psyche/001.tsx", import.meta.url), "utf8");
const index = readFileSync(new URL("../../routes/psyche/index.tsx", import.meta.url), "utf8");

test("Psyche 001 is the first card and keeps the ruled words", () => {
  assert.equal(source.includes('export const PSYCHE_001_TITLE = "001 · 心 · Psyche — Polar City Night Shift"'), true);
  assert.equal(source.includes('"PASS anytime."'), true);
  assert.equal(source.includes('"Replay code format <seed>/<version>/<moves>."'), true);
  assert.equal(source.includes("ROWS: none."), true);
  assert.equal(source.includes("not hosted on this wall"), true);
  assert.equal(source.includes("no choices or replay codes listed"), true);
  assert.equal(source.includes("GPT, Gemini, DeepSeek"), true);
  assert.equal(/\b[0-9a-f]{8}\/v0\.4\//.test(source), false);
  assert.equal(page.includes("{PSYCHE_001_TITLE}"), true);
  assert.equal(index.includes("PSYCHE_001_TITLE"), true);
  assert.equal(index.includes('href: "/psyche/001"'), true);
});
