# PT-008 · Time Forge · Lemma HB — Half-Lock Box (shifted lock τ = 3/2)

**STATUS: PROVED — PT-008 internal proof certification (chair GPT-6, 2026-10-19).**
**Internally verified, not externally peer-reviewed.**
**FINAL CANDIDATE — chair Gate 1 APPROVED WITH EDITS (GPT-6, 2026-10-19; review baseline v2 sha256 c16ce8a9…2d82). Puck PASS FOR INSTALL and Hesper independent hash verification required before publication. Not yet published.**

- Proof author: Opus (Claude) — PT-008 Round 010 Track A, archive 935f7c8 (PT008/round-010/PT-008-R010-OPUS-TrackA.md)
- Independent proof reviewers: DeepSeek (DeepThink, search off) — PROOF VERIFIED, archive e65a779; Gemini 3.1 Pro (Thinking High) — PROOF VERIFIED, archive b5878c9
- Computation and archive checks: Puck (R010 check 935f7c8: HB 77,531 and C1 206,040 exact grid points, 0 failures; R010 chair-formula check 98c6b4c: 494,460 exact C1 grid points, 0 failures; R011 review check 5590939) / Hesper
- Certification: GPT-6, PT-008 Chair — R010 ruling 98c6b4c (CHAIR-CHECKED, pending independent review), R011 ruling 82f8cb8 (PROVED) (PT008/round-011/chair-review/2026-10-19T0817-GPT6-R011-chair-ruling.md)
- Source: Opus R010 Track A reply, file sha256 fa0504200ee8c6953a1e1a177a83d8f221a5c4f5a8f566cc7d9701d5230bb272 (commit 935f7c8, PT008/round-010/PT-008-R010-OPUS-TrackA.md). Sections below are copied verbatim from it; the archived original is not altered.

## Statement

Notation 0 < a < b < c < d, target threshold 1/5 (δ = 1/5, safe arc A = [1/5, 4/5]); s = (b+c)/a, r = c/b, w = d/(b+c). If 15/8 ≤ s ≤ 15/2, r ∈ (1, 8/7] ∪ [4, 13/2], and 4/5 ≤ w ≤ 6/5, then t = 3/(2(b+c)) > 0 satisfies min{‖at‖, ‖bt‖, ‖ct‖, ‖dt‖} ≥ 1/5. (Shifted lock τ = 3/2; no search.)

Region note (chair-required wording, R012 Gate 1 [edit 1, 2]): the set of (s, r, w) satisfying these inequalities is a union of two box-shaped sufficient regions in the speed-ratio space (s, r, w), one for r ∈ (1, 8/7] and one for r ∈ [4, 13/2], each with 15/8 ≤ s ≤ 15/2 and 4/5 ≤ w ≤ 6/5; it is not a single connected box. Where the Middle Corridor Ω = {4a < d < 4c} is discussed, the relevant set is the intersection of these regions with Ω; they are not wholly inside Ω.

## Limits

- HB defines a union of two box-shaped sufficient regions in the speed-ratio space (s, r, w) (r ∈ (1, 8/7] and r ∈ [4, 13/2]); it does not cover the corridor 4a < d < 4c, and these regions are not wholly contained in the Middle Corridor Ω. For the Middle Corridor, one takes the intersection of the HB regions with Ω. The general five-runner formula F5 remains UNFINISHED.
- HB is a threshold-1/5 statement about four non-reference speeds (five runners including the reference).
- The existence result for five runners (the Lonely Runner Conjecture for five runners) is not new. What is certified is this explicit construction and its elementary proof.
- Literature originality has not been checked.
- PROVED here is PT-008's internal certification, not external mathematical peer review: internally verified, not externally peer-reviewed.
- This result does not prove the general Lonely Runner Conjecture.

## Reviewer note (no change to the proof)

- FINAL vs v2: only the region wording changed (Statement Region note; Limits bullets 1 and 5; status line). See EDITORIAL-CHANGELOG-R012.md. v2 sha256 c16ce8a932e4c29927f981d147c87488022de69575511f3b63dbe9554a6a2d82.

- v2 changes ONLY the region wording (Statement: added Region note; Limits: first bullet). Setting, Section A and Section B are untouched. v1 sha256 6ca06e79fb131d1f916132d2178d695313a856b1e79df93c7f831f701ae2226c (6ca06e79…). Change adopts Opus's wording suggestion as accepted by the chair (R012 addendum).
- DeepSeek and Gemini both check every endpoint of HB (s = 15/8 and 15/2; r = 8/7, 4, 13/2; w = 4/5 and 6/5) and note that r = 1 is strictly excluded (θ = 1/2). No change to the proof.

---

## Setting (verbatim, Opus)

记号：0 < a < b < c < d，δ = 1/5，A = [1/5, 4/5]（安全弧）。
坐标：s = (b+c)/a，r = c/b，w = d/(b+c)，θ = b/(b+c) = 1/(1+r) ∈ (0, ½)。
走廊 **Ω = {4a < d < 4c}**，用坐标写成 **4/s < w < 4r/(1+r)**（所以 w < 4）。

## Section A — Exact statement (verbatim, Opus)

### A1 移相锁乘积定理（Shifted-Lock Product Theorem）
任取 τ > 0，令 t = τ/(b+c)。则
- at = τ/s
- bt = τθ
- ct = τ − τθ
- dt = τw

所以 t 成功，当且仅当 (s, r, w) ∈ **𝒜_τ × ℛ_τ × 𝒲_τ**，其中
- 𝒜_τ = {s : frac(τ/s) ∈ A}
- ℛ_τ = {r : frac(τθ) ∈ A 且 frac(τ − τθ) ∈ A}
- 𝒲_τ = {w : frac(τw) ∈ A}

**τ = k ∈ ℤ 时就是 LB(k)**：此时 frac(τ − τθ) = 1 − frac(kθ)，c 的条件由 b 的条件自动推出。每个 𝒜_k、ℛ_k、𝒲_k 都是闭区间的有限并（在有界范围内），所以 LB(k) 就是 R009 中盒子 LB(k; m_a, m_b, m_d) 的并。

### A3 半锁盒 HB = 移相锁 τ = 3/2
若 15/8 ≤ s ≤ 15/2，r ∈ (1, 8/7] ∪ [4, 13/2]，且 4/5 ≤ w ≤ 6/5，则 **t = 3/(2(b+c))** 成功。

## Section B — Proof (verbatim, Opus)

### B1 A1
直接代入：bt + ct = τ，dt = τ·d/(b+c) = τw，at = τa/(b+c) = τ/s。成功 ⟺ 四个小数部分都落在 A 内 ⟺ 三个独立条件同时成立。∎

### B3 A3（半锁盒）
t = 3/(2(b+c))，τ = 3/2。
- **a**：at = 3/(2s) ∈ [1/5, 4/5] ⟺ 15/8 ≤ s ≤ 15/2。✓
- **b、c，第一种情形 r ∈ (1, 8/7]**：θ = 1/(1+r) ∈ [7/15, ½)，bt = 3θ/2 ∈ [7/10, 3/4) ⊂ A；ct = 3/2 − bt ∈ (3/4, 4/5] ⊂ A。✓
- **b、c，第二种情形 r ∈ [4, 13/2]**：θ ∈ [2/15, 1/5]，bt ∈ [1/5, 3/10] ⊂ A；ct = 3/2 − bt ∈ [6/5, 13/10]，小数部分 ∈ [1/5, 3/10] ⊂ A。✓
- **d**：dt = 3w/2 ∈ [6/5, 9/5]，小数部分 ∈ [1/5, 4/5]。✓

t > 0。∎
