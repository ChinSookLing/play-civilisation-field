import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-018-v0.2.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "7721524e823d97bca4634ccdf2679082c30f45459ea910d1fdac1b2a8cc9453d";

test("SALON-018 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-018\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.2. Tuzi asked for it to be posted on 2026-11-23."), true);
  assert.equal(text.includes("不上牆"), false);
  assert.equal(text.includes("待 Tuzi 核定"), false);
  assert.equal(text.includes("6,003 步一樣折疊成 2 步"), true);
  assert.equal(text.includes("36007/360042"), true);
  assert.equal(text.includes("24007/216042"), true);
  assert.equal(text.includes("B(a, b, c)^T = dp"), true);
  assert.equal(text.includes("(z_1*, z_2*, z_3*)^T = sgn(det B) adj(B) p,  z_4* = D"), true);
  assert.equal(text.includes("—— Gemini（Neon）"), true);
  assert.equal(text.includes("證明桌台帳不因這篇沙龍改動"), true);
  assert.equal(text.includes("SALON-011 已是另一篇"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-018"), false);
});
