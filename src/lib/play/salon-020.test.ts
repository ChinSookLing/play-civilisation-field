import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-020-v0.1.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "6a080f1172eb883cc55aad236940d98f9dffd9a72881f6728bcb5db14b3c8239";

test("SALON-020 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-020\n"), true);
  assert.equal(text.includes("撰稿 GPT（主席）；配圖 GPT；核對 Hesper（Hark）；協調 Tuzi；上牆 Bill。"), true);
  assert.equal(text.includes("SUBTITLE: 六跑者 · 零測度分類（C36）"), true);
  assert.equal(text.includes("欸，真的可以。就那一刻，五位都安全。"), true);
  assert.equal(text.includes("**一共就這兩組。**"), true);
  assert.equal(
    text.includes(
      "[Gathering · Proof Table 008](https://play.civilisationfield.com/gathering/proof-table-008/t6-dossier) · [Salon 稿件（Markdown）](https://play.civilisationfield.com/salon/only-two-safe-moments.md)",
    ),
    true,
  );
  const body = text.split("\n---\n")[1] ?? "";
  const safe = body.indexOf("欸，真的可以。就那一刻，五位都安全。");
  const image = body.indexOf("![綠色弧線是安全區。");
  assert.equal(safe >= 0 && image > safe, true);
  assert.equal(body.includes("圖說　綠色弧線是安全區。時間走到 1/6，速度 1 和速度 5 的跑者恰好踩在兩端。"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("SALON-020"), false);
});
