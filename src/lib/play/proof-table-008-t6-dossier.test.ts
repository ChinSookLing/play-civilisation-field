import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parseT6Dossier } from "./proof-table-008-t6-dossier-read.ts";

const manuscriptPath = new URL("../../../docs/gathering/PT008-T6-Gathering-v0.1.md", import.meta.url);
const ledgerPath = new URL("./proof-table-008.ts", import.meta.url);
const EXPECTED = "054daa205d4d3334145adfd066070bb2803641c846fd81e59292ed685c7fc1e0";

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
  assert.equal(rendered.includes("A49-C02"), true);
  assert.equal(rendered.includes("f2a09e1251c71b2bb25f7f564521f0a5236eb08dd3c2d3a0cc2e2b8c5997a54a"), true);
  assert.equal(rendered.includes("Salon No.019"), true);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("PT008-T6-DOSSIER"), false);
  assert.equal(readFileSync(ledgerPath, "utf8").includes("t6-dossier"), false);
});
