import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import katex from "katex";
import { parseManuscript, uncoveredLines } from "./proof-table-008-new-branch-read.ts";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T1-T5-v0.3.md", import.meta.url);
const previousPath = new URL("../../../docs/gathering/PT008-T1-T5-v0.2.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "0e525229a8183bcb432619f5cb423625bbb1609bc6dea123f28fe9119c1bf267";

test("the new-branch manuscript is the filed v0.3 file", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  assert.equal(bytes.length, 45201);
  const text = bytes.toString("utf8");
  assert.equal(text.startsWith("# PT-008 · Time Forge · 新研究分支：一至五跑者的安全時間構造\n"), true);
  assert.equal(text.includes("> **2026-11-12 更新。**"), true);
  assert.equal(text.includes("**END · PT-008 NEW BRANCH · T1–T5 · v0.3**\n"), true);
  assert.equal(text.includes("## 附錄 U · 整數五跑者直接構造（2026-11-12 補記）"), true);
  assert.equal(text.includes("項目內已證（PROVED）"), true);
  assert.equal(
    text.endsWith(
      "[Opus 獨立審讀、實作及重現資料（PT-008-U3-R1-REVIEW-OPUS.zip）](https://chatgpt.com/library?file_id=libfile_0a8db8d3cf2481919e48df2cc770fab6&account_id=personal)\n",
    ),
    true,
  );
  assert.equal(text.includes("### V5. Opus 大壓力測試完成補報（v0.3 新增）"), true);
  assert.equal(text.includes("不是另一次 v0.3 數學認證"), true);
  const previous = readFileSync(previousPath);
  assert.equal(
    createHash("sha256").update(previous).digest("hex"),
    "000e9c68ef14b82574b82890a3b4e53e606afd937c13f95f9b68220fb004802d",
  );
});

test("filing the new branch does not edit the proof-table ledger module", () => {
  const ledger = readFileSync(ledgerPath, "utf8");
  assert.equal(ledger.includes("T4-Q3"), false);
  assert.equal(ledger.includes("new-branch"), false);
  assert.equal(ledger.includes("附錄 U"), false);
  assert.equal(ledger.includes('status: "open"'), true);
  const entrance = readFileSync(new URL("./proof-table-008-new-branch.ts", import.meta.url), "utf8");
  assert.equal(entrance.includes("2026-11-12 加附錄 U"), true);
  assert.equal(entrance.includes("U3 由 Fable 提出，Opus 獨立審讀並實作，GPT 主席重跑後裁定項目內 PROVED"), true);
  assert.equal(entrance.includes("未經外部同行評審（not externally peer-reviewed）"), true);
  assert.equal(entrance.includes("證明桌台帳不改"), true);
  assert.equal(entrance.includes(EXPECTED), true);
});

test("the reading blocks keep every line, and the formulas render", () => {
  const text = readFileSync(manuscriptPath, "utf8");
  const blocks = parseManuscript(text);
  assert.deepEqual(uncoveredLines(text, blocks), []);
  const headings = blocks.flatMap((block) => (block.kind === "heading" && block.id ? [block.id] : []));
  assert.deepEqual(headings, ["def", "one-to-four", "five", "proof", "review", "appendix", "appendix-u"]);
  const math = blocks.filter((block) => block.kind === "math");
  assert.equal(math.length, 24);
  for (const block of math) {
    if (block.kind !== "math") continue;
    const html = katex.renderToString(block.tex, { displayMode: true, throwOnError: true, trust: false });
    assert.equal(html.includes("katex"), true);
  }
  const code = blocks.filter((block) => block.kind === "code");
  assert.equal(code.length, 6);
  assert.equal(blocks.some((block) => block.kind === "table"), true);
});
