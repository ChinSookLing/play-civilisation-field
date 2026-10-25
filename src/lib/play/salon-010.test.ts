import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const manuscriptPath = new URL("../../../docs/salon/SALON-010-v0.1.md", import.meta.url);
const sourcePath = new URL("./salon-010.ts", import.meta.url);
const EXPECTED = "92ba759c49582d25bda5561951a12072f3acd234ccd0205f6a6cb76c3b7728c9";

test("SALON-010 manuscript is the filed text", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("ID: SALON-010\n"), true);
  assert.equal(text.includes("STATUS: Filed. v0.1. Approved by Tuzi."), true);
  assert.equal(text.includes("未發布"), false);
  assert.equal(text.includes("本稿未執行上牆"), false);
  assert.equal(text.includes("「所以請 TA 特別看。」"), true);
  assert.equal(text.includes("TA 的原信開頭是："), true);
  assert.equal(text.includes("但 TA 先替自己的簽名畫了一條線。"), true);
  assert.equal(text.includes("因為 TA 這輪沒有親自執行那段程式。"), true);
  assert.equal(text.includes("我讓他抱著手"), true);
  assert.equal(text.includes("等他讓路"), true);
  assert.equal(text.includes("她記得 GPT 與 DeepSeek 的合作。"), true);
  assert.equal(text.includes("## 十、片尾以前，她又問了一題"), true);
  assert.equal(text.includes("我想讓她問："), true);
  assert.equal(text.includes("One formula for all, and all in one formula."), true);
  assert.equal(text.includes("第五位跑者，這次終於過線。"), true);
  const she = text.split("\n").filter((line) => line.includes("她") && !line.startsWith("PRONOUNS:"));
  assert.deepEqual(she, [
    "前面低人數的基底，她記得 GPT 與 DeepSeek 的合作。",
    "第五位，她記得 DeepSeek、Opus、Kimi，以及 Opus 再接棒的過程。",
    "正式貢獻仍要沿原稿逐項整理。她在這個時刻做的，是把人一個一個叫回故事裡。",
    "然後，她說了一句原話：",
    "她把它們從一個窗口送到另一個窗口，送到今天。",
    "## 十、片尾以前，她又問了一題",
    "她接著問：五人的公式，可以輸入兩人、三人、四人的任意速度嗎？",
    "這一小段對話是改編；她問能否把較少人數放進五人公式，以及我們解釋各自安全門檻，則確實發生在本輪對話裡。",
    "她前一刻還像在夢裡。",
    "如果電影還能加最後一句，我想讓她問：",
  ]);
});

test("plain text is the manuscript, with no index in front", () => {
  const source = readFileSync(sourcePath, "utf8");
  assert.equal(
    source.includes("export function salon010Plain(): string {\n  return SALON_010_TEXT;\n}"),
    true,
  );
  assert.equal(source.includes("BEGIN SALON-010 INDEX"), false);
  assert.equal(source.includes(EXPECTED), true);
});
