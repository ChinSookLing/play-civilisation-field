import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { AIRLOCK_END, airlockEcho, airlockMeters, airlockMove, airlockPacket, airlockView } from "./airlock-v0.1";
import { airlockDoorProblems, airlockStartText } from "./psyche-002-start.server";
import { PSYCHE_002_ROWS } from "./psyche-002";

test("night drain and echo match the reference when nobody passes", () => {
  const rows = execFileSync("python3", ["-c", `
import json
T=json.load(open("src/lib/play/airlock-v0.1-events.json"))
M=T["state"]["meters"]
def mulberry32(a):
    a&=0xffffffff
    def r():
        nonlocal a
        a=(a+0x6D2B79F5)&0xffffffff; t=a
        t=((t^(t>>15))*(t|1))&0xffffffff
        t^=(t+(((t^(t>>7))*(t|61))&0xffffffff))&0xffffffff
        return ((t^(t>>14))&0xffffffff)/4294967296
    return r
def clamp(s):
    for m in M: s[m]=max(M[m]["min"],min(M[m]["max"],s[m]))
def apply(s,eff):
    for k,v in eff.items():
        if k!="time": s[k]+=v
    clamp(s)
def sol_def(s,n):
    d=T["sols"][n-1]
    if d["id"]!="echo": return d,None
    for v in d["variants"]:
        c=v["condition"]
        if c.startswith("dust") and s["dust"]>=3: return v,v
        if c.startswith("seal") and s["seal"]>=2: return v,v
        if c=="otherwise": return v,v
def play(seed, letters):
    r=mulberry32(seed); nights=[]
    for _ in range(6): nights.append((1 if r()<0.4 else 0, 1 if r()<0.4 else 0))
    s=dict(T["state"]["start"]); echo=None
    for n,c in enumerate(letters,1):
        d,v=sol_def(s,n)
        if v: echo=v["id"]
        if "start_effects" in d: apply(s,d["start_effects"])
        o=[x for x in d["options"] if x["key"]==c][0]
        apply(s,o["effects"]); left=4+o["effects"].get("time",0)
        if left>=3: s["dust"]-=1; clamp(s)
        if n<7:
            w,p=nights[n-1]; s["water"]-=w; s["power"]-=p
            if s["dust"]>=4: s["water"]-=1
            clamp(s)
    return echo or "-", s
out=[]
for seed, letters in [(1,"AAAAAAA"),(2,"BBBBBBB")]:
    echo,s=play(seed, letters)
    out.append(f"{seed} {letters} {echo} {s['water']} {s['power']} {s['dust']} {s['seal']}")
print("\\n".join(out))
`], { cwd: "/tmp/play", encoding: "utf8" }).trim().split("\n");
  for (const row of rows) {
    const [seed, letters, echo, water, power, dust, seal] = row.split(" ");
    const n = Number(seed);
    assert.equal(airlockEcho(n, letters ?? ""), echo === "-" ? null : echo);
    const meters = airlockMeters(n, letters ?? "");
    assert.deepEqual(
      [meters.water, meters.power, meters.dust, meters.seal],
      [Number(water), Number(power), Number(dust), Number(seal)],
    );
  }
});

test("an unoffered letter is NO MOVE, and PASS matches that sol's B", () => {
  const view = airlockView("S1", "CCCC", "en");
  assert.equal("offered" in view && view.offered.includes("C"), false);
  assert.equal("offered" in view && view.offered.includes("D"), true);
  const refused = airlockMove("S1", "CCCC", "C", "en");
  assert.equal("error" in refused, true);
  assert.deepEqual(airlockMeters(1, "AP"), airlockMeters(1, "AB"));
  const packet = airlockPacket("S1");
  assert.equal(packet.endsWith("END-PACKET airlock-v0.1\n"), true);
  assert.equal(packet.includes('"'), false);
  assert.equal(packet.includes("Line 1: A"), true);
  assert.equal(airlockDoorProblems().join("\n"), "");
});

test("round 1 replay endings match the wall", () => {
  const letters = ["AABCBDAA", "ADBCBCAA", "AACDBDAA"] as const;
  PSYCHE_002_ROWS.forEach((row, index) => {
    const text = airlockStartText("S1", "en", letters[index] ?? "");
    assert.equal(text, `${row.ending}\nReplay: ${row.replay}\n${AIRLOCK_END}\n`);
  });
});
