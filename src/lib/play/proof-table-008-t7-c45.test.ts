import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const t7Path = new URL("../../../docs/gathering/PT008-T7-v0.3.md", import.meta.url);
const c45Path = new URL("../../../docs/gathering/PT008-T7-C45.md", import.meta.url);
const salonPath = new URL("../../../docs/salon/SALON-021-v0.1.md", import.meta.url);
const zipPath = new URL("../../../public/gathering/proof-table-008/t7-c45/PT008-TF-R003a-C45-evidence.zip", import.meta.url);
const rulingPath = new URL("../../../public/gathering/proof-table-008/t7-c45/PT008-TF-R003a-C45-Q46.md", import.meta.url);

test("T7 C45 record and SALON-021 stay off the old pages", () => {
  assert.equal(createHash("sha256").update(readFileSync(t7Path)).digest("hex"), "8efb3c94f268d6606f18587b8399f025a2d9ee44ce9d8818c4678b49d892bd22");
  assert.equal(createHash("sha256").update(readFileSync(c45Path)).digest("hex"), "02e8f0f968d84449cb5c1956cc3eb2d7340a35562d499c4125171f9511f3e62e");
  assert.equal(createHash("sha256").update(readFileSync(zipPath)).digest("hex"), "39e22f4e8f46d6a2186b6a61e9745329a42e88521cd8cbb783fc54d0dfa1bfdd");
  assert.equal(readFileSync(zipPath).length, 67597);
  assert.equal(createHash("sha256").update(readFileSync(rulingPath)).digest("hex"), "087a5113f77ceed153ee92cfbe32398f8371b9be262d1a89504b14f2740fde26");
  const c45 = readFileSync(c45Path, "utf8");
  assert.equal(c45.includes("[PT008-TF-R003a-C45-evidence.zip](https://play.civilisationfield.com/gathering/proof-table-008/t7-c45/PT008-TF-R003a-C45-evidence.zip)"), true);
  assert.equal(c45.includes("$v_1,\\ldots,v_6$"), true);
  const salon = readFileSync(salonPath, "utf8");
  assert.equal(createHash("sha256").update(readFileSync(salonPath)).digest("hex"), "690bf9a17769e2f9ff75ba3568639430b035f53793b1867ab86de309eb08b7b5");
  assert.equal(salon.includes("初稿 Neon · 數學與文字校訂 GPT · 數字核對 Hesper · 統籌 Tuzi · 上牆 Bill。"), true);
  assert.equal(salon.includes("[Gathering 的 PT008 紀錄](https://play.civilisationfield.com/gathering/proof-table-008/t7-c45)"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("PT008-T7-C45"), false);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-021"), false);
});
