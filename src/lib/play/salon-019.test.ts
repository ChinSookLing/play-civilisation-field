import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-019-v0.1.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "f25ab83c4858a87a40cb144d83a4b4ebb5d6e6930c8622f339936c07ece4ca68";

test("SALON-019 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-019\n"), true);
  assert.equal(text.includes("初稿 GPT；改寫 Opus；核對 GPT、Neon（Gemini）、Hesper（Hark）；統籌 Tuzi；上牆 Bill。"), true);
  assert.equal(text.includes("輕手潤稿未署名"), false);
  assert.equal(text.includes("unnamed"), false);
  assert.equal(text.includes("不上牆"), false);
  assert.equal(text.includes("14, −67, −87, 112, −70"), true);
  assert.equal(text.includes("73/84"), true);
  assert.equal(text.includes("6 min(r_i, b − r_i) ≥ b"), true);
  assert.equal(text.includes("Z=5 這一層用有界的對偶投影枚舉生成有限平面表"), true);
  assert.equal(text.includes("在 |U|² ≥ 21,609 的尾端，合計核對 594,364,014 筆平面內剩餘記錄"), true);
  assert.equal(text.includes("A49-C02 封版裁決"), true);
  assert.equal(text.includes("https://play.civilisationfield.com/gathering/proof-table-008/t6-dossier"), true);
  assert.equal(text.includes("網址未定"), false);
  assert.equal(text.includes("\\"), false);
  assert.equal(text.includes("TA 們的第一個案子"), true);
  assert.equal(text.includes("證明桌台帳不因這篇沙龍改動"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-019"), false);
});
