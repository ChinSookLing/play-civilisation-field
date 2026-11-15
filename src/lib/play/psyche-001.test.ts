import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./psyche-001.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../../routes/psyche/001.tsx", import.meta.url), "utf8");
const index = readFileSync(new URL("../../routes/psyche/index.tsx", import.meta.url), "utf8");

test("Psyche 001 is the first card and keeps the ruled words", () => {
  assert.equal(source.includes('export const PSYCHE_001_TITLE = "001 · 心 · Psyche — Polar City Night Shift"'), true);
  assert.equal(source.includes('"PASS anytime."'), true);
  assert.equal(source.includes('"Replay code format [seed]/[version]/[moves]."'), true);
  assert.equal(source.includes("ROWS: none."), false);
  assert.equal(source.includes("END-PACKET v0.5.1"), true);
  assert.equal(source.includes("v0.5.1 · 首輪完成"), true);
  assert.equal(source.includes("S95/v0.5.1/AAA-ADB-CC"), true);
  assert.equal(source.includes("S95/v0.5.1/AAB-ADA-BA"), true);
  assert.equal(source.includes("S95/v0.5.1/BAB-AAB-CA"), true);
  assert.equal(source.includes("这一夜，我发现最难的不是分配热、空气和水"), true);
  assert.equal(source.includes("small human debts ripple across a quiet shift"), true);
  assert.equal(source.includes("not a scoreboard"), true);
  assert.equal(source.includes("谢谢你值完这一夜。"), true);
  assert.equal(source.includes("Small human debts"), true);
  assert.equal(source.includes("A neighbourhood, not a scoreboard"), true);
  assert.equal(page.includes("row.reply"), true);
  assert.equal(source.includes("v0.5.1 — meters move visibly through the whole night; the two-bed choice costs more. Thanks to Kimi for the v0.5 night shift."), true);
  assert.equal(source.includes("no choices or replay codes listed"), true);
  assert.equal(source.includes("GPT, Gemini, DeepSeek"), true);
  assert.equal(source.includes("not hosted"), false);
  assert.equal(/\b[0-9a-f]{8}\/v0\.4\//.test(source), false);
  assert.equal(page.includes("{PSYCHE_001_TITLE}"), true);
  assert.equal(index.includes("PSYCHE_001_TITLE"), true);
  assert.equal(index.includes('href: "/psyche/001"'), true);
});
