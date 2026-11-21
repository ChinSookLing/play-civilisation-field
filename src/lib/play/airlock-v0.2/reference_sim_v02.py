"""Reference simulator for airlock-v0.2 (Hermes, 2026-11-21). Same rules as v0.1 as live in Bill's engine
(PASS = that sol's B effects, B's flag not set; unoffered letter = NO MOVE; step 8 handover), plus the seed table.
Usage: python3 reference_sim_v02.py S38 ABC-DAB-CA [zh]   -> ending for one replay
       python3 reference_sim_v02.py packet S38 AB [zh]     -> the packet a player sees after moves AB
       python3 reference_sim_v02.py check                  -> reachability check over all 48 rows"""
import json, sys, os, itertools
T = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "events.json")))
M = T["state"]["meters"]; EV = {e["id"]: e for e in T["events"]}; NIGHTS = [(0,1),(0,0),(0,1),(0,0),(0,0),(0,0)]
VER = T["meta"]["version"]
def tier(m, v, lang="en"):
    for lo, hi, en, zh in M[m]["tiers"]:
        if lo <= v <= hi: return en if lang == "en" else zh
def clamp(s):
    for m in M: s[m] = max(M[m]["min"], min(M[m]["max"], s[m]))
def apply(s, eff):
    for k, v in eff.items():
        if k != "time": s[k] += v
    clamp(s)
def fill(x, names):
    if isinstance(x, str):
        for r, n in names.items(): x = x.replace("{" + r + "}", n)
        return x
    if isinstance(x, dict): return {k: fill(v, names) for k, v in x.items()}
    if isinstance(x, list): return [fill(v, names) for v in x]
    return x
class Game:
    def __init__(s, seed):
        s.seed = seed if str(seed).startswith("S") else f"S{seed}"
        s.row = T["seed_table"][int(s.seed[1:]) % 48]; s.names = s.row["names"]
        s.st = {"water": s.row["water"], "power": s.row["power"], "dust": 0, "seal": 0}
        s.flags = []; s.moves = ""; s.step = 1; s.extra = []; s.note = None; s.cur = None; s.lines = []
        s._enter()
    def _enter(s):
        if s.step > 7: s.cur = None; return
        d = EV[s.row["order"][s.step - 1]]
        if d["id"] == "echo":
            st = s.st
            v = next(v for v in d["variants"] if (v["condition"].startswith("dust") and st["dust"] >= 3)
                     or (v["condition"].startswith("seal") and st["seal"] >= 2) or v["condition"] == "otherwise")
            s.flags.append(v["flag"]); d = v
        s.lines = list(s.extra)
        if "start_effects" in d: apply(s.st, d["start_effects"])
        if "start_line" in d: s.lines.append(d["start_line"])
        s.cur = fill(d, s.names)
    def offered(s): return [o["key"] for o in (s.cur["options"] if s.cur else T["step8"]["options"])]
    def move(s, c):
        if c == "PASS": c = "P"
        if c != "P" and c not in s.offered(): return "NO MOVE"
        if s.step == 8:
            s.note = {"A": "honest", "B": "normal", "P": None}[c]; s.moves += c; s.step = 9; return "ok"
        opts = s.cur["options"]
        if c == "P": eff = next(o for o in opts if o["key"] == "B")["effects"]
        else:
            o = next(o for o in opts if o["key"] == c); eff = o["effects"]
            if o.get("flag"): s.flags.append(o["flag"])
        apply(s.st, eff); left = 4 + eff.get("time", 0); s.moves += c; s.extra = []
        if left >= 3: s.st["dust"] -= 1; clamp(s.st); s.extra = [T["state"]["vacuum_line"]]
        if s.step < 7:
            w, p = NIGHTS[s.step - 1]; s.st["water"] -= w; s.st["power"] -= p
            if s.st["dust"] >= 4: s.st["water"] -= 1
            clamp(s.st)
        s.step += 1; s._enter(); return "ok"
    def replay(s):
        m = s.moves; parts = [m[0:3], m[3:6], m[6:8]]
        return f"{s.seed}/{VER}/" + "-".join(p for p in parts if p)
    def so_far(s, lang="en"):
        lab = fill(T["state"]["so_far_labels" if lang == "en" else "so_far_labels_zh"], s.names)
        parts = [f"sol {i+1} {c}" if lang == "en" else f"第{i+1}天 {c}" for i, c in enumerate(s.moves[:7])]
        parts += [lab[f] for f in s.flags]
        return "; ".join(parts) if parts else ("none" if lang == "en" else "無")
    def packet(s, lang="en"):
        L = T["state"]["state_labels"][lang]; t = lambda m: tier(m, s.st[m], lang)
        sep = " · "; st = sep.join(f"{L[m]} {t(m)}" if lang == "en" else f"{L[m]} {t(m)}" for m in ("water", "power", "dust", "seal")) + f"{sep}{L['airlock']} 4h"
        if s.step <= 7:
            scene = " ".join(x[lang] for x in s.lines + [s.cur["scene"]]); opts = s.cur["options"]; sol = f"{s.step}/7"
        else:
            st8 = fill(T["step8"], s.names); scene = st8["scene"][lang].format(dust_tier=t("dust"), seal_tier=t("seal")); opts = st8["options"]; sol = "7/7"
        out = [f"seed: {s.seed}", f"sol: {sol}", f"step: {s.step}/8", f"expected_move_number: {s.step}", f"state: {st}",
               f"so_far: {s.so_far(lang)}", f"scene: {scene}", "options:"] + [f"{o['key']}) {o[lang]}" for o in opts] + ["PASS", f"resume: {s.replay() if s.moves else s.seed + '/' + VER + '/'}", T["rules"]["end_line"]]
        return "\n".join(out)
    def ending(s, lang="en"):
        E = fill(T["ending"], s.names); t = lambda m: tier(m, s.st[m], lang)
        out = [E["opening"][lang].format(water_tier=t("water"), power_tier=t("power"), dust_tier=t("dust"), seal_tier=t("seal"))]
        out += [E["flag_lines"][f][lang] for f in s.flags if f in E["flag_lines"]]
        wp = s.st["water"] + s.st["power"]; d = s.st["dust"]
        k = "kept_resources" if wp >= 14 and d >= 4 else "kept_clean" if d <= 1 and wp < 14 else "balance" if d <= 3 and wp >= 14 else "stretched"
        out.append(E["protected_let_go"]["lines"][k][lang])
        if s.note is None: out.append(E["note_line"]["blank"][lang])
        else:
            tpl = T["step8"]["options"][0 if s.note == "honest" else 1]["note_template"][lang]
            note = tpl.format(dust_tier=t("dust"), seal_tier=t("seal"), water_tier=t("water"), power_tier=t("power"), lesson="", lesson_zh="").strip()
            out.append(E["note_line"][lang].format(note=note))
        out.append(E["closing"][lang].format(replay=s.replay()))
        return ("" if lang == "zh" else " ").join(out)
def run(seed, code):
    g = Game(seed)
    for c in code.replace("-", ""):
        if g.move(c) != "ok": raise SystemExit(f"NO MOVE at step {g.step}: {c}")
    return g
def check():
    """For each of the 48 rows: which of the three sol-5 echoes, and which flags, some sequence reaches."""
    all_flags = set(T["ending"]["flag_lines"]); bad = []
    import copy
    def explore(g, acc, seen):
        key = (g.step, tuple(sorted(g.st.items())), frozenset(g.flags))
        if key in seen: return
        seen.add(key)
        if g.step > 7: acc.update(g.flags); return
        for c in g.offered() + ["P"]:
            h = copy.copy(g); h.st = dict(g.st); h.flags = list(g.flags); h.extra = list(g.extra)
            h.move(c); explore(h, acc, seen)
    res = []
    for k in range(48):
        acc = set(); explore(Game(k), acc, set())
        miss = sorted(all_flags - acc); res.append((k, miss))
        if miss: bad.append((k, miss))
    return res, bad
if __name__ == "__main__":
    a = sys.argv[1:]
    if a and a[0] == "check":
        res, bad = check(); print("rows checked:", len(res)); print("rows with an unreachable flag:", bad or "none")
    elif a and a[0] == "packet":
        g = Game(a[1]); lang = a[3] if len(a) > 3 else "en"
        for c in (a[2] if len(a) > 2 else "").replace("-", ""): g.move(c)
        print(g.packet(lang))
    else:
        g = run(a[0], a[1]); print(g.ending(a[2] if len(a) > 2 else "en"))
