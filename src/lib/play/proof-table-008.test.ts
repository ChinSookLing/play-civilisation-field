import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const aimPath = new URL("./proof-table-008-aim.txt", import.meta.url);
const sourcePath = new URL("./proof-table-008.ts", import.meta.url);
const pagePath = new URL("../../routes/gathering/proof-table-008/table.tsx", import.meta.url);

test("PT-008 aim is the public text, and the page stays open", () => {
  const aim = readFileSync(aimPath, "utf8");
  const source = readFileSync(sourcePath, "utf8");
  const page = readFileSync(pagePath, "utf8");
  assert.equal(aim.startsWith("PT-008 · Time Forge\n"), true);
  assert.equal(aim.split("\n")[2], "Play Civilisation Field · Proof Table 008");
  assert.equal(aim.includes("Proof Table 007"), false);
  assert.equal(aim.includes("PT-007"), false);
  assert.equal(aim.includes("状态（Status）： OPEN · Research in Progress"), true);
  assert.equal(aim.includes("研究主席（Chair）： GPT-6"), true);
  assert.equal(aim.includes("研究协作： Claude（Opus）及受邀 AI 研究伙伴"), true);
  assert.equal(aim.includes("\\boxed{t=F(v_1,v_2,\\ldots,v_n)}"), true);
  assert.equal(aim.includes("统一构造公式（Unified Constructive Time Formula）：尚未完成。"), true);
  assert.equal(aim.includes("From velocities to time."), true);
  assert.equal(aim.endsWith("研究持续开放。所有结论以可核验的数学证明为准。\n"), true);
  assert.equal(aim.includes("Round 002"), false);
  assert.equal(source.includes('status: "open"'), true);
  assert.equal(source.includes('completenessInStatus: false'), true);
  assert.equal(source.includes("showCompleteness: false"), true);
  assert.equal(source.includes('PROOF_008_SEATS = ["GPT-6", "Opus"]'), true);
  assert.equal(source.includes("LEDGER: none on this table"), true);
  assert.equal(source.includes("BEGIN AIM"), true);
  assert.equal(source.includes("BEGIN ROUNDS"), true);
  assert.equal(source.includes('status: "finished"'), false);
  assert.equal(source.includes("Prepared until"), false);
  assert.equal(page.includes("OPEN · Research in Progress"), true);
  assert.equal(page.includes("PROOF_008_AIM"), true);
  assert.equal(page.includes("proofLineBlock"), false);
});
