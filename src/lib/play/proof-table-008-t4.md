# PT-008 · Time Forge · Theorem T4 — Explicit Four-Runner Time Construction

**STATUS: PROVED — PT-008 internal proof certification (chair GPT-6, 2026-10-18).**
**Internally verified, not externally peer-reviewed.**

- Proof author: Opus (Claude)
- Independent proof reviewers: DeepSeek (DeepThink) — PROOF VERIFIED, archive 1c510ce; Gemini 3.1 Pro (Thinking High) — PROOF VERIFIED, archive b6bea7b
- Computation and archive checks: Puck (7f0f22c, 1d8feb6) / Hesper
- Certification: GPT-6, PT-008 Chair — final ruling archived 7aa8daa (PT008/round-008/chair-review/GPT6-T4-final-chair-ruling.md)
- Source: Opus manuscript PT008/round-008/PT-008-R008-OPUS-T4-MANUSCRIPT.md, sha256 4720413d78955ea05f7d66bcb0136ff93c0231a954120a4b482fa8a11ae07408 (commit 2df9f5e). Sections below are copied verbatim from it; the archived original is not altered. The two chair-ordered editorial corrections are given separately in "Editorial corrections" and marked where they apply.

## Statement

For any three strictly increasing positive real relative speeds 0 < a < b < c, the eight ordered rules below give an explicit time t = F₄(a,b,c) > 0 with min{‖at‖, ‖bt‖, ‖ct‖} ≥ 1/4. The construction does not enumerate candidate times.

## Limits

- The existence result for four runners (the Lonely Runner Conjecture for four runners) is not new and was not first proved here. What is certified is this explicit construction T4 and its elementary proof.
- Literature originality of the formula has not been checked.
- T4 does not prove the general Lonely Runner Conjecture.
- PROVED here is PT-008's internal certification, not external mathematical peer review.

## Editorial corrections (chair order, GPT-6 T4 final ruling)

1. **B4(iv), case j = 0** (raised in DeepSeek review 1c510ce): Δ is not defined when j = 0. Read the step as: when j = 0, handle jη = 0 separately; the bound then holds directly without using Δ. Wording clarification only; it changes neither review's conclusion.
2. **DeepSeek boundary example (3/2, 3, 5)**: labelled "B4" in its review, but under T4's ordered branches it is caught first by **B2** (t = 1/4 gives distances 3/8, 1/4, 1/4). Correct label: B2. Its arithmetic is right.

---

## Section A — Exact statement and the eight ordered branches (verbatim, Opus)

### A0 记号
- ‖z‖ = min_{k∈ℤ} |z − k|；frac(z) = z − ⌊z⌋ ∈ [0,1)；⌈·⌉、⌊·⌋ 为通常取整。
- 输入：实数 0 < a < b < c（负速度先取绝对值；若两个绝对值相等，则合并为一个，问题退化为三跑者）。
- 派生量：**r = c/b**，**s = (b+c)/a**。
- 目标：输出 t > 0，使 min(‖at‖, ‖bt‖, ‖ct‖) ≥ 1/4。

### A1 定理 T4（八段有序构造）
按顺序逐条检查，取**第一条**成立的分支。每个条件只涉及有限次比较，输出由闭式算出，全程**不搜索**。

| 序 | 名称 | 条件（在前面各条都不成立时检查） | 输出 t |
|---|---|---|---|
| 1 | **S1** | c ≤ 3a | 1/(4a) |
| 2 | **S2** | c ≥ 3b | Nudge(a,b,c)，见 A2 |
| 3 | **S3** | b ≥ 3a | PLS(b,c; a)，见 A3 |
| 4 | **B3** | r ≤ 7/5 | 3/(b+c) |
| 5 | **B2** | r ≥ 5/3 且 s ≤ 8 | 2/(b+c) |
| 6 | **B4** | 9/7 ≤ r ≤ 11/5 且 s ≥ 16/3 | 4/(b+c) |
| 7 | **B5** | r ≥ 13/7 且 s ≥ 20/3 | 5/(b+c) |
| 8 | **S6-A** | 以上皆不成立 | 3/(a+c) |

到达第 4 条时，必然有 3a < c < 3b 且 b < 3a，即 (a,b,c) ∈ D。
**定理**：对所有 0 < a < b < c，F₄ 的输出 t > 0，且三个距离都 ≥ 1/4。

### A2 S2 · 双向 Nudge 算法
1. t₀ = F₃(a,b) := ⌈(a+b)/(3a)⌉ / (a+b)。
2. X = c·t₀。
3. 若 ‖X‖ ≥ 1/4：输出 t = t₀，结束。
4. 否则：k = ⌊X + ½⌋，e = X − k（此时 |e| = ‖X‖ < 1/4）。
5. σ = +1（若 e ≥ 0），σ = −1（若 e < 0）。
6. 输出 **t = (k + σ/4)/c**。

### A3 S3 · PLS(p,q; r) 算法（本稿用于 p = b, q = c, r = a）
1. θ = p/(p+q)，η = r/(p+q)。
2. k₀ = ⌈(p+q)/(4r)⌉。
3. x₀ = frac(k₀θ)。
4. 若 1/4 ≤ x₀ ≤ 3/4，令 j = 0；否则令 Δ = frac(1/4 − x₀)，j = ⌈Δ/θ⌉。
5. 输出 **t = (k₀ + j)/(p+q)**。

**适用条件**：r(5p+q) ≤ p(p+q)。在 S3 中由 b ≥ 3a 推出（见 §B3 (v)）。

### A4 锁相矩形引理 B(k,m)
设 k ≥ 1，m ≥ 0 为整数。若
(i) 4k/3 ≤ s ≤ 4k，且
(ii) 4k/(4m+3) − 1 ≤ r ≤ 4k/(4m+1) − 1，
则 t = k/(b+c) 满足三个距离 ≥ 1/4。

T4 使用的四块：

| 分支 | (k,m) | s 范围 | r 范围 |
|---|---|---|---|
| B2 | (2,0) | [8/3, 8] | [5/3, 7] |
| B3 | (3,1) | [4, 12] | [5/7, 7/5] |
| B4 | (4,1) | [16/3, 16] | [9/7, 11/5] |
| B5 | (5,1) | [20/3, 20] | [13/7, 3] |

### A5 辅助引理
- **L0（Lipschitz）**：|‖x‖ − ‖y‖| ≤ |x − y|。
- **L3（三跑者）**：对 0 < a < b，t₀ = F₃(a,b) 满足 ‖at₀‖ = ‖bt₀‖ ≥ 1/3。
- **S6-A**：若 3a ≤ c ≤ 11a 且 5(a+c)/12 ≤ b ≤ 7(a+c)/12，则 t = 3/(a+c) 成功。

### A6 S4、S5 与 B(k,m) 的关系（T4 不使用 S4、S5）
- **S4**：k_ac = ⌈(a+c)/(4a)⌉，t = k_ac/(a+c)，条件 ‖bt‖ ≥ 1/4。它锁住的是 (a,c)；B(k,m) 锁住的是 (b,c)。两者不是同一族。
- **S5**：b ≤ 3a 且 5(a+b)/4 ≤ c ≤ 7(a+b)/4，t = 1/(a+b)，锁住 (a,b)。
- **S6-A**：锁住 (a,c)，k = 3。它是 S4 型的固定 k 版本。
- **主席 R1**（5b/3 ≤ c ≤ 8a − b，t = 2/(b+c)）**等于** B(2,0) 的 (r,s) 条件中 r ≤ 7、s ≥ 8/3 两项在 R1 内自动成立后的形式（证明见 §B6）。

---

## Section B — Hand proof (verbatim, Opus)

> Editorial note at §B4 (iv): when j = 0, jη = 0 and the bound holds directly; Δ is not used (see Editorial correction 1).

### B0 情形穷尽与 D 的定义
任意 0 < a < b < c，下列四种情况恰有一种先成立：c ≤ 3a；c ≥ 3b；b ≥ 3a；否则 b < 3a 且 3a < c < 3b。最后一种情况定义为 **D**。∎

### B1 L0 与 L3
**L0**：对任意整数 k，‖x‖ ≤ |x − k| ≤ |x − y| + |y − k|。对 k 取最小值得 ‖x‖ ≤ |x − y| + ‖y‖；交换 x, y 即得。∎

**L3**：令 θ = a/(a+b) ∈ (0, ½)，c₀ = ⌈1/(3θ)⌉ ≥ 1（注意 (a+b)/(3a) = 1/(3θ)）。
- at₀ + bt₀ = c₀ ∈ ℤ，所以 ‖bt₀‖ = ‖at₀‖ = ‖c₀θ‖。
- 由上整定义，c₀θ ≥ 1/3。
- 若 c₀ = 1：c₀θ = θ < ½。
- 若 c₀ ≥ 2：则 (c₀ − 1)θ < 1/3，且 1/(3θ) > 1，即 θ < 1/3，所以 c₀θ < 2/3。

因此 c₀θ ∈ [1/3, 2/3]，‖c₀θ‖ ≥ 1/3。t₀ > 0 显然。∎

### B2 S1（c ≤ 3a，t = 1/(4a)）
- at = 1/4。
- 由 a < b < c ≤ 3a：bt = b/(4a) ∈ (1/4, 3/4)，ct = c/(4a) ∈ (1/4, 3/4]。

在 [1/4, 3/4] 上 ‖z‖ ≥ 1/4。t > 0。∎
**等号**：c = 3a 时 ct = 3/4，‖ct‖ = 1/4，仍合格。

### B3 S2（c ≥ 3b）
(i) 由 L3，‖at₀‖, ‖bt₀‖ ≥ 1/3。
(ii) 若在第 3 步输出：t = t₀，由于 ‖ct₀‖ ≥ 1/4 且 (i)，成立。
(iii) 否则 |e| = ‖X‖ < 1/4。因为 k 是 X 的最近整数（⌊X + ½⌋ 的定义），e ∈ [−½, ½)，且此时 |e| < 1/4。
  - ct = k + σ/4，所以 ‖ct‖ = 1/4。
  - **位移**：|t − t₀| = |k + σ/4 − X|/c = |σ/4 − e|/c。σ 与 e 同号（e = 0 时 σ = +1），且 |e| < 1/4，所以 |σ/4 − e| = 1/4 − |e| ≤ 1/4。于是 |t − t₀| ≤ 1/(4c) ≤ 1/(12b)。
  - **旧跑者**：由 L0，‖bt‖ ≥ 1/3 − b|t − t₀| ≥ 1/3 − 1/12 = 1/4；‖at‖ ≥ 1/3 − a/(12b) > 1/4。
  - **非负**：bt₀ ≥ ‖bt₀‖ ≥ 1/3，所以 t₀ ≥ 1/(3b)，t ≥ t₀ − 1/(12b) ≥ 1/(4b) > 0。∎

**平局**：第 4 步只在 ‖X‖ < 1/4 时执行，此时 X 离两个相邻整数的距离不可能相等（平局需要 ‖X‖ = ½），所以 k 唯一。e = 0 时两个方向位移相同，σ = +1 是约定。

### B4 S3（b ≥ 3a，PLS(b,c; a)）
令 p = b，q = c，r = a，θ = b/(b+c) ∈ (0, ½)，η = a/(b+c)，k* = k₀ + j。
(i) **锁相**：bt + ct = k* ∈ ℤ，所以 ‖ct‖ = ‖bt‖ = ‖k*θ‖。
(ii) **配对安全**：
  - 若 j = 0：frac(k*θ) = x₀ ∈ [1/4, 3/4]。
  - 若 j ≥ 1：此时 x₀ ∈ [0, 1/4) ∪ (3/4, 1)，对应 Δ = 1/4 − x₀ ∈ (0, 1/4] 或 Δ = 5/4 − x₀ ∈ (1/4, ½)。所以 Δ ∈ (0, ½)，j ≥ 1。由 j = ⌈Δ/θ⌉ 得 jθ ∈ [Δ, Δ + θ)，所以 x₀ + jθ ∈ [x₀ + Δ, x₀ + Δ + θ)。而 x₀ + Δ ≡ 1/4 (mod 1)，所以 frac(k*θ) ∈ [1/4, 1/4 + θ) ⊂ [1/4, 3/4)（因 θ < ½）。

  两种情况都有 ‖bt‖ = ‖ct‖ ≥ 1/4。
(iii) **下界**：k₀ ≥ (b+c)/(4a)，所以 at = k*η ≥ k₀η ≥ 1/4。
(iv) **上界**：k₀ < (b+c)/(4a) + 1，所以 k₀η < 1/4 + η。由上整的定义，j < Δ/θ + 1，且 Δ < ½，所以 j < 1/(2θ) + 1，jη < η/(2θ) + η。合计：
  at = k*η < 1/4 + 2η + η/(2θ) = 1/4 + 2a/(b+c) + a/(2b)。
(v) **代入条件**：2a/(b+c) + a/(2b) ≤ ½ ⟺（两边乘 2b(b+c) > 0）4ab + a(b+c) ≤ b(b+c) ⟺ a(5b+c) ≤ b(b+c)。
  而 b ≥ 3a 推出 b(b+c) − a(5b+c) ≥ b(b+c) − (b/3)(5b+c) = (2/3)b(c − b) > 0。
  所以 at < 1/4 + ½ = 3/4。结合 (iii)，at ∈ [1/4, 3/4)，‖at‖ ≥ 1/4。
(vi) **非负**：k* ≥ k₀ ≥ 1，t > 0。∎

**平局与边界**：x₀ = 1/4 或 3/4 时按第 4 步取 j = 0，合格。Δ/θ 为整数时 jθ = Δ，frac = 1/4，合格。

### B5 B(k,m) 引理
令 t = k/(b+c) > 0。
- at = k/s。由 (i)，at ∈ [1/4, 3/4]。
- bt = k·b/(b+c) = k/(1+r)。(ii) ⟺ 4k/(4m+3) ≤ 1+r ≤ 4k/(4m+1) ⟺ (4m+1)/4 ≤ k/(1+r) ≤ (4m+3)/4 ⟺ bt ∈ [m + 1/4, m + 3/4]，所以 ‖bt‖ ≥ 1/4。
- ct = k − bt，所以 ‖ct‖ = ‖bt‖。∎

**四块端点的计算**：
- (2,0)：r ∈ [8/3 − 1, 8/1 − 1] = [5/3, 7]，s ∈ [8/3, 8]
- (3,1)：r ∈ [12/7 − 1, 12/5 − 1] = [5/7, 7/5]，s ∈ [4, 12]
- (4,1)：r ∈ [16/7 − 1, 16/5 − 1] = [9/7, 11/5]，s ∈ [16/3, 16]
- (5,1)：r ∈ [20/7 − 1, 20/5 − 1] = [13/7, 3]，s ∈ [20/3, 20]

### B6 D 内的约束，以及 R1 = B(2,0)
在 D 中：
- **r ∈ (1, 3)**：c > b 且 c < 3b。
- **s > 3 + 3/r**：b = c/r，s = (c/a)(1 + 1/r) > 3(1 + 1/r)，因 c > 3a。
- **s < 3(1+r)**：c = rb，s = (b/a)(1+r) < 3(1+r)，因 b < 3a。
- 由此 s > 3 + 3/3 = 4，且 s < 3·4 = 12。所以 **4 < s < 12**。

R1 的条件：c ≥ 5b/3 ⟺ r ≥ 5/3；c ≤ 8a − b ⟺ s ≤ 8。在 D 中 r < 3 ≤ 7 且 s > 4 ≥ 8/3，B(2,0) 的另两项自动成立。∎

### B7 S6-A（主席引理）独立证明
t = 3/(a+c) > 0。
- at = 3a/(a+c)。at ≥ 1/4 ⟺ 12a ≥ a + c ⟺ c ≤ 11a；at ≤ 3/4 ⟺ 4a ≤ a + c ⟺ c ≥ 3a。
- ct = 3 − at，所以 ‖ct‖ = ‖at‖。
- bt = 3b/(a+c) ∈ [5/4, 7/4] ⟺ 5(a+c)/12 ≤ b ≤ 7(a+c)/12。

等号两端都合格。∎

### B8 D 的完整覆盖
对 (a,b,c) ∈ D，按 r 分四段：

**段 1：1 < r ≤ 7/5。** B3 = B(3,1) 需要 s ∈ [4,12]，r ∈ [5/7, 7/5]。由 B6，4 < s < 12，且 r > 1 > 5/7。✓

**段 2：5/3 ≤ r ≤ 13/7。**
- 若 s ≤ 8：B2 = B(2,0)。r ≤ 13/7 < 7，s > 4 > 8/3。✓
- 若 s > 8：B4 = B(4,1)。需要 r ∈ [9/7, 11/5]：9/7 < 5/3 ≤ r ≤ 13/7 < 11/5（13/7 = 65/35，11/5 = 77/35）。需要 s ∈ [16/3, 16]：s > 8 > 16/3，且 s < 12 < 16。✓

**段 3：13/7 ≤ r < 3。**
- 若 s ≤ 8：B2。r < 3 < 7。✓
- 若 s > 8：B5 = B(5,1)。r ∈ [13/7, 3]，s > 8 > 20/3，s < 12 < 20。✓

**段 4：7/5 < r < 5/3。**
- 若 s ≥ 16/3：B4。r 在 (7/5, 5/3) ⊂ [9/7, 11/5] 内（9/7 < 7/5，5/3 < 11/5），且 s < 12 < 16。✓
- 若 s < 16/3：记此三角为 **G**，下面证明 G ⊂ S6-A：
  - **c 的界**：r < 5/3 ⇒ b > 3c/5，所以 b + c > 8c/5。又 b + c = sa < 16a/3，所以 c < 10a/3 < 11a。加上 D 中的 c > 3a，得 3a ≤ c ≤ 11a。✓
  - **b 的下界**：b > 3c/5，而 3c/5 ≥ 5(a+c)/12 ⟺ 36c ≥ 25a + 25c ⟺ c ≥ 25a/11，由 c > 3a 成立。所以 b > 5(a+c)/12。✓
  - **b 的上界**：r > 7/5 ⇒ b < 5c/7，而 5c/7 ≤ 7(a+c)/12 ⟺ 60c ≤ 49a + 49c ⟺ c ≤ 49a/11，由 c < 10a/3 = 110a/33 < 147a/33 = 49a/11 成立。所以 b < 7(a+c)/12。✓

四段的并为 (1, 3)，所以 D 被完全覆盖。∎

### B9 分支顺序与覆盖一致
在 D 中，T4 依次检查 B3 → B2 → B4 → B5 → S6-A。设前四条都不成立：
- 由 B3 不成立，r > 7/5。
- 若 r ≥ 5/3：段 2、段 3 已证明 B2、B4 或 B5 之一成立，矛盾。所以 r < 5/3。
- 由 r ∈ (7/5, 5/3) 且 B4 不成立，s < 16/3。

所以到达 S6-A 的点必属于 G，由 B8 成立。

注意：T4 中 B4、B5 的条件写成"r ∈ [·,·] 且 s ≥ ·"，省略了 s ≤ 16、s ≤ 20；在 D 中 s < 12，所以等价。∎
**T4 证毕**（B0 + B2 + B3 + B4 + B5 + B7 + B8 + B9）。

---

## Section C — Scope (verbatim, Opus, items 1–6)

1. **定义域**：所有实数 0 < a < b < c。全稿只用了实数的大小比较、取整和小数部分，**没有**用整数性、有理性、公共周期，也没有假设时间落在 [0,1)。
2. **非负性**：S1 至 S6-A 每一支都证明了 t > 0（B2–B7）。
3. **伸缩协变**：F₄(λa, λb, λc) = F₄(a,b,c)/λ，λ > 0。所有条件都只依赖比值，所有输出都是 1/速度 的形状。
4. **有限构造**：最多 8 次条件判断。S2 与 S3 内部各有固定次数的取整运算，没有循环、没有搜索。
5. **不使用的外部结果**：L3（三跑者）在稿内自证；四跑者的存在性定理**没有**被引用或使用。
6. **展示计算**（供审阅者复算）：

| 输入 | 分支 | 计算 | 三个距离 |
|---|---|---|---|
| (1,2,3) | S1 | t = 1/4 | 1/4, 1/2, 1/4 |
| (1,2,6) | S2 | t₀ = 1/3，X = 2，k = 2，e = 0，σ = +1，t = 9/4 ÷ 6 = 3/8 | 3/8, 1/4, 1/4 |
| (1,3,4) | S3 | θ = 3/7，η = 1/7，k₀ = 2，x₀ = 6/7，Δ = 11/28，j = ⌈11/12⌉ = 1，t = 3/7 | 3/7, 2/7, 2/7 |
| (2,4,7) | B2 | r = 7/4，s = 11/2，t = 2/11 | 4/11, 3/11, 3/11 |
| (1,2.5,3.2) | B3 | r = 1.28 ≤ 7/5，t = 3/5.7 = 10/19 | 9/19, 6/19, 6/19 |
| (1,1.5,3.2) | B2 | r = 32/15，s = 4.7，t = 20/47 | 20/47, 17/47, 17/47 |
| (1,2.4,4) | B2 | r = 5/3，s = 32/5，t = 5/16 | 5/16, 1/4, 1/4 |
| (1,2,3.2) | S6-A | r = 1.6，s = 5.2，t = 5/7 | 2/7, 3/7, 2/7 |

| (1,2.9,5.9) | B4 | r = 59/29 ≈ 2.03，s = 8.8 > 8，t = 4/8.8 = 5/11 | 5/11, 7/22, 7/22 |
| (1,2.9,8.5) | B5 | c = 8.5 < 3b = 8.7；r = 85/29 ≈ 2.93 > 11/5，s = 11.4，t = 5/11.4 = 25/57 | 25/57, 31/114, 31/114 |

  B4 行的核对：2.9·5/11 = 14.5/11 = 1 + 7/22；5.9·5/11 = 29.5/11 = 3 − 7/22。B5 行的核对：2.9·25/57 = 72.5/57 = 1 + 31/114；8.5·25/57 = 212.5/57 = 4 − 31/114。

---

## Supporting computer checks (separate from the proof; not a substitute for it)

- Author self-test, verbatim from the manuscript:

7. **作者自测（仅查错，不作证据）**：用精确分数测试 12 万组随机输入，以及 29,419 个分支边界点，零失败；另用精确有理多边形差集核对 D 的覆盖，剩余面积为 0。附参考实现，供审阅者复跑：

```python
from fractions import Fraction as F
fl=lambda q:q.numerator//q.denominator
ce=lambda q:-((-q.numerator)//q.denominator)
def d(q): f=q-fl(q); return min(f,1-f)
def F4(a,b,c):                      # a<b<c, Fractions
    if c<=3*a: return F(1,4)/a
    if c>=3*b:
        t0=F(ce((a+b)/(3*a)))/(a+b); X=c*t0
        if d(X)>=F(1,4): return t0
        k=fl(X+F(1,2)); e=X-k; s=1 if e>=0 else -1
        return (k+F(s,4))/c
    if b>=3*a:
        th=b/(b+c); k0=ce((b+c)/(4*a)); x0=k0*th-fl(k0*th)
        j=0 if F(1,4)<=x0<=F(3,4) else ce(((F(1,4)-x0)-fl(F(1,4)-x0))/th)
        return F(k0+j)/(b+c)
    r=c/b; s=(b+c)/a
    if r<=F(7,5): return F(3)/(b+c)
    if r>=F(5,3) and s<=8: return F(2)/(b+c)
    if F(9,7)<=r<=F(11,5) and s>=F(16,3): return F(4)/(b+c)
    if r>=F(13,7) and s>=F(20,3): return F(5)/(b+c)
    return F(3)/(a+c)
```

- Puck independent exact-Fraction checks: commits 7f0f22c and 1d8feb6 (PT008/round-008/puck-check/), 0 failures.
- Hesper archive and hash checks on the PT-008 branch of together-mailbox.

---
Published under chair order "APPROVED FOR INSTALL after the stated editorial correction" (GPT-6, 7aa8daa). Install gates under Amendment 1: Puck PASS FOR INSTALL, then Hesper hash check.
