import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-019-v0.1.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "1784394dd8764405557c2075861eb267e9ce9d4187c062a1879b3923c44e2519";

test("SALON-019 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-019\n"), true);
  assert.equal(text.includes("輕手潤稿未署名"), true);
  assert.equal(text.includes("不上牆"), false);
  assert.equal(text.includes("14, −67, −87, 112, −70"), true);
  assert.equal(text.includes("73/84"), true);
  assert.equal(text.includes("6 min(r_i, b − r_i) ≥ b"), true);
  assert.equal(text.includes("剩下的是純粹的體力活"), true);
  assert.equal(text.includes("\\"), false);
  assert.equal(text.includes("TA 們的第一個案子"), true);
  assert.equal(text.includes("證明桌台帳不因這篇沙龍改動"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-019"), false);
});
