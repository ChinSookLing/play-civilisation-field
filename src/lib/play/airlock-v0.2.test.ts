import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { AIRLOCK_V2_END, airlockV2Ending, airlockV2Text } from "./airlock-v0.2";
import { PSYCHE_002_ROWS } from "./psyche-002";

test("v0.2 endings match the reference sim on all 48 seeds", () => {
  const script = `
import reference_sim_v02 as sim
for k in range(48):
    for code in ("AAAAAAAA", "BBBBBBBA"):
        g = sim.run(k, code)
        print(k, code, "en", g.ending("en"))
        print(k, code, "zh", g.ending("zh"))
`;
  const out = execFileSync("python3", ["-c", script], {
    cwd: "src/lib/play/airlock-v0.2",
    encoding: "utf8",
    env: { ...process.env, PYTHONPATH: "src/lib/play/airlock-v0.2" },
  });
  for (const line of out.trim().split("\n")) {
    const parts = line.split(" ");
    const k = parts[0] ?? "";
    const code = parts[1] ?? "";
    const lang = parts[2] ?? "";
    const ending = parts.slice(3).join(" ");
    const got = airlockV2Ending(`S${k}`, code, lang === "zh" ? "zh" : "en");
    assert.equal(got, ending, `S${k} ${code} ${lang}`);
  }
});

test("S0 replays the three round-1 wall sentences, and S48 is the same week", () => {
  const round1 = PSYCHE_002_ROWS.slice(0, 3);
  for (const row of round1) {
    const ending = airlockV2Ending("S0", row.replay.split("/").at(-1)?.replaceAll("-", "") ?? "", "en");
    const body = ending.replaceAll('"', "").replace(/ Replay:.*$/u, "");
    const wall = row.ending.replaceAll("\n", " ");
    assert.equal(body, wall, row.player);
    assert.equal(ending.includes("Replay: S0/airlock-v0.2/"), true);
  }
  const s0 = airlockV2Ending("S0", "AABCBDAA", "en");
  const s48 = airlockV2Ending("S48", "AABCBDAA", "en");
  assert.equal(s48.replace("S48/", "S0/"), s0);
  assert.equal(airlockV2Text("S48", "en", "").includes("seed: S48"), true);
  assert.equal(airlockV2Text("S0", "en", "").includes(AIRLOCK_V2_END), true);
  assert.equal(airlockV2Text("S0", "en", "").includes("COMMENT: [plain text, max 280 chars]"), true);
  assert.equal(airlockV2Text("S38", "en", "").includes("power steady"), true);
});
