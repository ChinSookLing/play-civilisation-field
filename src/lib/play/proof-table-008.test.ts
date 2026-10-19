import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const aimPath = new URL("./proof-table-008-aim.txt", import.meta.url);
const t4Path = new URL("./proof-table-008-t4.md", import.meta.url);
const lnPath = new URL("./proof-table-008-ln.md", import.meta.url);
const hbPath = new URL("./proof-table-008-hb.md", import.meta.url);
const c1Path = new URL("./proof-table-008-c1.md", import.meta.url);
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
  assert.equal(aim.includes("\\left\\|(v_i-v_1)t\\right\\|\\geq\\frac1n"), true);
  assert.equal(aim.includes("\\left|(v_i-v_1)t\\right|"), false);
  assert.equal(aim.includes("时间 t ≥ 0，为连续实数；除非证明具有相应周期性，否则不预设 t ∈ [0,1)。"), true);
  assert.equal(aim.includes("定义：||x|| = min_{k∈Z}|x-k|，表示实数 x 到最近整数的距离，并非普通绝对值。"), true);
  assert.equal(source.includes('VELOCITIES: v_1, v_2, ..., v_n'), true);
  assert.equal(source.includes("TIME_FORMULA_GOAL: t = F(v_1, v_2, ..., v_n)"), true);
  assert.equal(source.includes("DISTANCE_CONDITION: ||(v_i-v_1)*t|| >= 1/n for every i=2,...,n"), true);
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
  assert.equal(page.includes("PROOF_008_T4"), true);
  assert.equal(page.includes("PROOF_008_LN"), true);
  assert.equal(page.includes("PROOF_008_HB"), true);
  assert.equal(page.includes("PROOF_008_C1"), true);
  assert.equal(page.includes("proofLineBlock"), false);
  const t4 = readFileSync(t4Path);
  assert.equal(
    createHash("sha256").update(t4).digest("hex"),
    "3bae49ad8bc9c49f8850e1c19567a581d8a97f146dfbc8118070a70c37256485",
  );
  assert.equal(source.includes('import t4Text from "./proof-table-008-t4.md?raw"'), true);
  assert.equal(source.includes("BEGIN T4"), true);
  assert.equal(source.includes("PROOF_008_T4 +"), true);
  assert.equal(source.includes("BEGIN LN"), true);
  assert.equal(source.includes("PROOF_008_LN +"), true);
  assert.equal(source.includes("BEGIN HB"), true);
  assert.equal(source.includes("PROOF_008_HB +"), true);
  assert.equal(source.includes("BEGIN C1"), true);
  assert.equal(source.includes("PROOF_008_C1 +"), true);
  const hb = readFileSync(hbPath);
  const c1 = readFileSync(c1Path);
  assert.equal(
    createHash("sha256").update(hb).digest("hex"),
    "53d9f13aa6876b7f5d306701c5e46762030a791c7ab9e5d6fe45d13b5b184399",
  );
  assert.equal(hb.length, 5838);
  assert.equal(
    createHash("sha256").update(c1).digest("hex"),
    "fd1f60fa6beac4783fcfc3607105b89af0982804369ecbbff104dde94cfc84e1",
  );
  assert.equal(c1.length, 7885);
  for (const file of [hb, c1]) {
    const text = file.toString("utf8");
    assert.equal(text.includes("Internally verified, not externally peer-reviewed."), true);
    assert.equal(text.includes("The general five-runner formula F5 remains UNFINISHED."), true);
    assert.equal(text.includes("This result does not prove the general Lonely Runner Conjecture."), true);
    assert.equal(text.includes("Proof author: Opus (Claude)"), true);
  }
  assert.equal(source.includes("Round 011"), false);
  const ln = readFileSync(lnPath);
  assert.equal(
    createHash("sha256").update(ln).digest("hex"),
    "aee7ecd68944ce151ea02e8062c487c74285dbc929bae2fa3296e6f448de7125",
  );
  assert.equal(ln.length, 3948);
  assert.equal(ln.includes("Round 011"), false);
  assert.equal(source.includes("Round 009"), false);
  assert.equal(source.includes("Round 010"), false);
  assert.equal(t4.includes("Round 009"), false);
  assert.equal(t4.includes("Round 010"), false);
});
