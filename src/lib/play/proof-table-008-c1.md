# PT-008 · Time Forge · Lemma C1 — Connected Region (LB(1) ∪ HB)

**STATUS: PROVED — PT-008 internal proof certification (chair GPT-6, 2026-10-19).**
**Internally verified, not externally peer-reviewed.**
**FINAL CANDIDATE — chair Gate 1 APPROVED WITH EDITS (GPT-6, 2026-10-19; review baseline v2 sha256 4020e8c7…4874). Puck PASS FOR INSTALL and Hesper independent hash verification required before publication. Not yet published. Supersedes v1 (sha256 fa61dbde…, incomplete: omitted A4/B4), which must not be used.**

- Proof author: Opus (Claude) — PT-008 Round 010 Track A, archive 935f7c8 (PT008/round-010/PT-008-R010-OPUS-TrackA.md)
- Independent proof reviewers: DeepSeek (DeepThink, search off) — PROOF VERIFIED, archive e65a779; Gemini 3.1 Pro (Thinking High) — PROOF VERIFIED, archive b5878c9
- Computation and archive checks: Puck (R010 check 935f7c8: HB 77,531 and C1 206,040 exact grid points, 0 failures; R010 chair-formula check 98c6b4c: 494,460 exact C1 grid points, 0 failures; R011 review check 5590939) / Hesper
- Certification: GPT-6, PT-008 Chair — R010 ruling 98c6b4c (CHAIR-CHECKED, pending independent review), R011 ruling 82f8cb8 (PROVED) (PT008/round-011/chair-review/2026-10-19T0817-GPT6-R011-chair-ruling.md)
- Source: Opus R010 Track A reply, file sha256 fa0504200ee8c6953a1e1a177a83d8f221a5c4f5a8f566cc7d9701d5230bb272 (commit 935f7c8, PT008/round-010/PT-008-R010-OPUS-TrackA.md). Sections below are copied verbatim from it; the archived original is not altered.

## Statement

Same notation as HB. Let C₁ = Ω ∩ {15/8 ≤ s ≤ 5, 1 < r ≤ 8/7, 4/5 ≤ w ≤ 9/5}, where Ω = {4a < d < 4c}. For every point of C₁: if frac(w) ∈ [1/5, 4/5], output t = 1/(b+c) (LB(1)); otherwise output t = 3/(2(b+c)) (HB). Both outputs satisfy t > 0 and min{‖at‖, ‖bt‖, ‖ct‖, ‖dt‖} ≥ 1/5. The rule is a single comparison, not a search. Endpoint correction adopted by the chair (R011 ruling 82f8cb8): the HB branch is executed exactly for w ∈ (4/5, 6/5); w = 4/5 takes the integer-lock branch and w = 1 stays in the HB branch. (Opus's B4 wrote [4/5, 6/5); the proof is unaffected. Rule preserved per chair Gate 1: w = 4/5 and w = 6/5 use LB(1) since frac(w) ∈ [1/5, 4/5]; w = 1 uses HB.)

Note on "Connected Region" (chair Gate 1): B4 proves that the two constructions, LB(1) and HB, leave no covering gap over C₁; the geometric connectedness of C₁ as a region follows directly from its definition (an intersection of Ω with a box). These are two distinct meanings and should not be conflated.

## Limits

- C₁ is a thin slab: it needs 1 < c/b ≤ 8/7 and 15/8 ≤ s ≤ 5, and w ∈ [4/5, 9/5]. It is a connected region inside the corridor 4a < d < 4c, not the whole corridor. The general five-runner formula F5 remains UNFINISHED.
- C1 depends on HB (Section A3/B3 below) and on the integer-lock box LB(1).
- The existence result for five runners (the Lonely Runner Conjecture for five runners) is not new. What is certified is this explicit construction and its elementary proof.
- Literature originality has not been checked.
- PROVED here is PT-008's internal certification, not external mathematical peer review: internally verified, not externally peer-reviewed.
- This result does not prove the general Lonely Runner Conjecture.

## Reviewer note (no change to the proof)

- FINAL vs v2: adds the chair-approved editorial correction note at B4 (inline, marked), the rule-preservation sentence and the "Connected Region" note in Statement, and the Limits wording; the Opus verbatim text is unchanged. See EDITORIAL-CHANGELOG-R012.md. v2 sha256 4020e8c734cffdc9f081ea9a1264d19e7fea932c2c081cf96aefa84f02674874.
- v2 adds A4/B4 verbatim per Opus author check; v1 sha256 fa61dbde… (fa61dbde566b4599725da144c4db7af20856344b3eebf6c7207f70958d85d3f3).
- DeepSeek (e65a779) and Gemini (b5878c9) both note that the else-branch is exactly w ∈ (4/5, 6/5), slightly narrower than the [4/5, 6/5) in B4; Puck's check (98c6b4c) agrees. At w = 6/5 both outputs succeed, so the join has no gap.

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

### A4 接通区域 C₁ 与选择规则
令 C₁ = Ω ∩ {15/8 ≤ s ≤ 5，1 < r ≤ 8/7，4/5 ≤ w ≤ 9/5}。对 C₁ 中的任意点：
- 若 frac(w) ∈ [1/5, 4/5]，输出 **t = 1/(b+c)**（LB(1)）；
- 否则输出 **t = 3/(2(b+c))**（HB）。

两种输出都成功。整个判断是一次比较，不搜索。

---



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

### B4 A4（接通）
在 C₁ 中，s ≤ 5 且 r ≤ 8/7 ≤ 4，所以 LB(1) 的 a、b 条件成立：
- s ∈ [5/4, 5]，所以 1/s ∈ [1/5, 4/5]；
- θ ∈ [7/15, ½) ⊂ A。

LB(1) 的 d 条件是 frac(w) ∈ A。若成立，输出 1/(b+c) 成功。
若不成立：w ∈ [4/5, 9/5] 且 frac(w) ∉ [1/5, 4/5]，则 w ∈ [4/5, 6/5)。这一段落在 HB 的 w 范围 [4/5, 6/5] 内；同时 s ∈ [15/8, 5] ⊂ [15/8, 15/2]，r ∈ (1, 8/7]，所以 HB 成立。∎

> **[Editorial correction approved by chair R012, Gate 1: the fallback interval in the preceding sentence "w ∈ [4/5, 6/5)" is corrected to w ∈ (4/5, 6/5). Reason: w = 4/5 and w = 6/5 both have frac(w) ∈ [1/5, 4/5] and are handled by LB(1); the HB branch is executed exactly for w ∈ (4/5, 6/5), which lies inside HB's range [4/5, 6/5]; w = 1 uses HB. Opus's original sentence above is kept verbatim and unchanged in the archive; the proof is unaffected.]**

两盒在 w = 6/5 处共享闭边界：此处 frac(w) = 1/5 ∈ A，走 LB(1)，HB 同样成立。**接通是严格的**，中间没有缝。

**C₁ 非空实例**（注意 C₁ 还隐含 w > 4/s）：取 (1, 2.16, 2.34, 4.5)。
- s = 4.5，r = 2.34/2.16 = 13/12 ≈ 1.083，w = 1
- Ω：4 < 4.5 < 9.36 ✓
- frac(w) = 0 ∉ A，走 HB：t = 3/9 = 1/3

核对：
- ‖1/3‖ = 1/3
- ‖0.72‖ = 0.28
- ‖0.78‖ = 0.22
- ‖1.5‖ = 0.5

全部 ≥ 1/5。✓ 这个点位于障碍曲面 w = 1 上，LB 在这里必然失败，HB 成功。

（自测：C₁ ∩ Ω 内 22,447 个精确分数随机点，零失败。仅为查错，非 CHECKED。）

---


