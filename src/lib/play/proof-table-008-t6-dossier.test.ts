import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseT6Dossier } from "./proof-table-008-t6-dossier-read.ts";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T6-Gathering-v0.1.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "e3e268b23d0c97a0cb402c7ccb69861a3d9b845b7d7b5f0ffce5ccfb4784878d";

test("T6 dossier manuscript is the filed text and stays off the ledger", () => {
  const bytes = readFileSync(manuscriptPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), EXPECTED);
  const text = bytes.toString("utf8");
  const blocks = parseT6Dossier(text);
  assert.equal(blocks.filter((block) => block.kind === "math").length, 6);
  assert.equal(blocks.filter((block) => block.kind === "code").length, 6);
  assert.equal(blocks.filter((block) => block.kind === "table").length > 5, true);
  assert.equal(blocks.some((block) => block.kind === "heading" && block.id === "appendix"), true);
  const rendered = blocks
    .map((block) => {
      if (block.kind === "heading") return block.text;
      if (block.kind === "paragraph") return block.lines.join("\n");
      if (block.kind === "list") return block.items.join("\n");
      if (block.kind === "table") return [block.header, ...block.rows].flat().join("\n");
      if (block.kind === "math" || block.kind === "code") return block.kind === "math" ? block.tex : block.text;
      return "";
    })
    .join("\n");
  assert.equal(blocks.filter((block) => block.kind === "image").length, 1);
  assert.equal(rendered.includes("鏡像待補"), false);
  assert.equal(rendered.includes("bf9140ab1d2f33740212762c9b5f8864b9af40e9"), true);
  assert.equal(rendered.includes("f8e9be66fd2611c30eadd98760944f688ff659b0"), true);
  assert.equal(rendered.includes("歷史補檔"), false);
  assert.equal(rendered.includes("chatgpt.com"), false);
  assert.equal(rendered.includes("f2a09e1251c71b2bb25f7f564521f0a5236eb08dd3c2d3a0cc2e2b8c5997a54a"), true);
  assert.equal(rendered.includes("Z ≥ 15"), true);
  assert.equal(rendered.includes("Z = 14"), true);
  assert.equal(rendered.includes("第三步　低 Z 全量重放"), true);
  assert.equal(rendered.includes("83,105,159 組中非本原的五元組"), true);
  assert.equal(rendered.includes("2,559,819 組已計入總數，可由正規化還原時間。"), true);
  assert.equal(rendered.includes("可將各相位胞與閉基本方形"), true);
  assert.equal(text.includes("$Z\\ge 15$"), false);
  assert.equal(text.includes("可以交閉基本方形"), false);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("PT008-T6-DOSSIER"), false);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("t6-dossier"), false);
});
