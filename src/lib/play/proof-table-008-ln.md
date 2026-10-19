# PT-008 · Time Forge · Lemma LN — Lock-plus-Nudge (five runners, d ≥ 4c)

**STATUS: PROVED — PT-008 internal proof certification (chair GPT-6, 2026-10-18).**
**Internally verified, not externally peer-reviewed.**

- Proof author: Opus (Claude) — PT-008 Round 009 Track A, archive 18b2e4f (PT008/round-009/2026-10-18T1755-reply-Opus-trackA.md)
- Independent proof reviewers: DeepSeek (DeepThink) — PROOF VERIFIED, archive 221bca6; Gemini 3.1 Pro (Thinking High) — PROOF VERIFIED, archive 0dd9138
- Computation and archive checks: Puck (R009 chair check c976dc2: 28,558 exact checks, 0 failures; R010 chair-formula check 98c6b4c: 39,996 exact LN cases, 0 failures) / Hesper
- Certification: GPT-6, PT-008 Chair — R009 ruling c976dc2 (PROOF CANDIDATE · CHAIR-CHECKED), R010 ruling 98c6b4c (PROVED) (PT008/round-010/chair-review/2026-10-18T1953-GPT6-R010-chair-ruling.md)
- Source: Opus R009 Track A reply, file sha256 c91d1f915fad4c7087c82287ceba7b1c5c51232df1b27f4fc00bf5a799a41407 (commit 18b2e4f). Sections below are copied verbatim from it; the archived original is not altered.

## Statement

For any strictly increasing positive real relative speeds 0 < a < b < c < d with d ≥ 4c, start from the PROVED four-runner construction t₀ = F₄(a,b,c) (Theorem T4, threshold 1/4). If ‖dt₀‖ ≥ 1/5, output t₀; otherwise move once to the nearest time where ‖dt‖ = 1/5. The output t satisfies t > 0 and min{‖at‖, ‖bt‖, ‖ct‖, ‖dt‖} ≥ 1/5. The construction does not enumerate candidate times.

## Limits

- LN covers only the region d ≥ 4c; it does not give the general five-runner formula F5. The general F5 construction remains UNFINISHED. The region 4a < d < 4c is not completely covered by the two broad constructions d ≤ 4a and d ≥ 4c; some subregions already have certified or candidate constructions.
- The existence result for five runners (the Lonely Runner Conjecture for five runners) is not new. What is certified is this explicit construction LN and its elementary proof.
- Literature originality has not been checked.
- PROVED here is PT-008's internal certification, not external mathematical peer review.

## Reviewer note (no change to the proof)

- Gemini 3.1 Pro (0dd9138) observes that, since t₀ ≥ 1/(4c) and d ≥ 4c, dt₀ ≥ 1, so the case "dt₀ < 1/5, shift right to 1/(5d)" never occurs; step (v) of the proof covers non-negativity in every case.

---

## Section A — Exact statement (verbatim, Opus)

### A3 锁相加微调引理 LN
设 0 < a < b < c < d，且 **d ≥ 4c**。令 t₀ = F₄(a,b,c)（T4，门槛 1/4），X = dt₀。
- 若 ‖X‖ ≥ 1/5，输出 t₀。
- 否则令 k = ⌊X + ½⌋，e = X − k，σ = +1（若 e ≥ 0）或 −1（若 e < 0），输出 **t = (k + σ/5)/d**。

则 t > 0，且四个距离都 ≥ 1/5。


## Section B — Proof (verbatim, Opus)

### B3 LN 的证明
(i) 由 T4（PROVED），‖at₀‖, ‖bt₀‖, ‖ct₀‖ ≥ 1/4。
(ii) 若 ‖X‖ ≥ 1/5，直接成立。
(iii) 否则 |e| = ‖X‖ < 1/5，k 唯一（平局要求 ‖X‖ = ½）。dt = k + σ/5，所以 ‖dt‖ = 1/5。
  σ 与 e 同号，所以 |t − t₀| = |σ/5 − e|/d = (1/5 − |e|)/d ≤ 1/(5d) ≤ 1/(20c)。
(iv) **旧跑者**：对 u ∈ {a,b,c}，由 Lipschitz 性，‖ut‖ ≥ 1/4 − u/(20c) ≥ 1/4 − 1/20 = 1/5。
(v) **非负**：ct₀ ≥ ‖ct₀‖ ≥ 1/4，所以 t₀ ≥ 1/(4c) > 1/(20c) ≥ |t − t₀|，故 t > 0。∎

这正是 L2（n = 4，M = c，w = d ≥ 4c）套在 T4 上。当 T4 走 B 型锁相分支时，LN 就是"先锁 (b,c)，再微调 d"。

**计算 (1,2,3,12)**：d = 12 ≥ 4c = 12 ✓。T4 走 S1（c = 3a），t₀ = 1/4。X = 3，‖X‖ = 0 < 1/5，k = 3，e = 0，σ = +1，t = (3 + 1/5)/12 = 16/60 = **4/15**。
核对：
- ‖4/15‖ = 4/15 ≈ 0.267
- ‖8/15‖ = 7/15
- ‖12/15‖ = 3/15 = 1/5
- ‖48/15‖ = ‖3.2‖ = 1/5

全部 ≥ 1/5，其中两个恰好取等号。✓
