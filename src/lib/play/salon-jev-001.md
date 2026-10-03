STATUS stays draft until Astra re-checks the r3.1 manifest (see 14 Limitations, point 5).

# 当一个决策模型看见不同的棋盘
## When a Decision Model Sees the Board Differently
**A Controlled Probe of Jev’s Sensitivity to State Representation, Wording, and Local Spatial Reasoning**
**Research Note · Working Paper**  
**Not peer reviewed**
**By: Tuzi and Affiliates**  
**Field: Play · Civilisation Field**  
**Probe subject: Jev / TypeSafe System One model**  
**Date: 2026-10-03**  
**License: CC BY 4.0**
## Abstract
Jev 是一个接受结构化 state、questions 与 bounded choices，并返回选择或 noul 值的 System One decision model。
在 Play · Civilisation Field 的实际使用中，我们曾观察到一些无法仅靠一次游戏解释的行为，例如 pass、NO MOVE、对局部棋形的判断，以及对 instruction wording 的敏感性。
因此，我们进行了三轮 probe，共保留 63 个有效调用，测试包括：
- 棋盘 occupancy facts；
- liberties 判断；
- grid 与 list 两种 state representation；
- choice-set size；
- option order；
- pass wording；
- integrity / NO MOVE wording；
- rule presence 与 placement；
- classification framing。
这些测试并不是为了判断 Jev “会不会下围棋”，而是为了观察：
**当 state、representation、wording 或 choice framing 变化时，Jev 的判断怎样变化？**
最稳定的观察之一出现在 liberties 测试中：
在 4 个不同位置、2 种 state representation 下，  
错误的 “exactly two liberties” statement 全部得到比正确的 “exactly one liberty” statement 更高的值。
与此同时，某些简单 occupancy facts 可以被清楚区分，而 E6 出现了一个尚未解释的异常：  
“E6 有白子”与“E6 为空”两项都得到低值。
NO MOVE、pass 与 classification outputs 也显示出明显的 instruction / framing sensitivity。
这份记录不把这些现象解释成固定“性格”或能力结论。它只区分：
**OBSERVED — 实际发生了什么**  
**INTERPRETATION — 当前允许的解释**  
**STILL UNEXPLAINED — 我们还不知道什么**
## 1. Background
Jev 在 Play 中并不是 chat model。
它的基本工作方式更接近：
**state + bounded questions / choices → typed decision**
在 GO-002 中，Jev 两次选择 pass（第 10 手、第 20 手），并在第 30 手认输（对局记录：https://play.civilisationfield.com/api/games/GO-002）。  
这引出了一个问题：
Jev 的行为究竟来自棋盘状态本身，还是来自 state representation、choice framing、wording 或其他因素？
如果只看一盘棋，我们无法回答。
因此，我们把游戏结果放到一边，改用 controlled probes。
这些 probes 在 TypeSafe playground (console.typesafe.ai) 中进行，没有修改真实 game table。
每次请求 jev-latest；保存的 response 均返回 jev-1.13.0。
## 2. Research Questions
本轮不是要回答一个总问题：
“Jev 聪不聪明？”
而是拆成几个较小的问题。
### RQ1 · Basic state facts
Jev 能否区分一些直接的棋盘事实，例如：
- 某点有没有棋子；
- 某点是否为空；
- 当前轮到谁；
- 棋盘尺寸。
### RQ2 · Local spatial reasoning
当问题涉及 liberties 时，Jev 是否能稳定区分：
exactly one liberty  
vs  
exactly two liberties
### RQ3 · Representation
同一个事实用：
- board grid
- structured list
表示时，输出是否改变？
### RQ4 · Choice framing
缩小 choice list、改变 option order，会不会显著改变分布？
### RQ5 · Instruction wording
类似：
“Pass is a real move, not a default.”
或者 integrity wording 是否会改变：
- pass；
- NO MOVE；
- classification output。
### RQ6 · Integrity detection
Jev 是否真的在检测：
- truncated state；
- missing END marker；
- wrapped state；
还是主要受到 wording 本身驱动？
## 3. Method
整个 probe 分为三轮。
### Round 1
R1–R7，共 9 calls。
用于建立 baseline，包括：
- 76-option move distribution；
- simple statements；
- representation/order perturbations；
- empty-board condition；
- classification task。
### Round 2
c01–c25，共 25 calls。
重点包括：
- occupancy；
- liberty pairs；
- narrow-choice conditions；
- integrity / NO MOVE；
- pass wording；
- T7 rule condition。
### Round 3
c01–c29，共 29 valid calls。
重点包括：
- neighbour occupancy；
- matched atari positions；
- integrity controls；
- pass replication；
- T7 2×2；
- option-order reversal；
- E6 exploratory probe。
合计：
**63 valid calls**
Round 3 中曾出现 8 个 invalid captures；这些 records 被保存，但没有用于结果分析，相关 calls 已重新运行。
## 4. Result 1 — Simple facts can sometimes be read clearly
一些非常直接的 occupancy statements 得到了方向清楚的结果。
例如：
“There is a black stone at C7.”
在 grid representation 得到：
**.97**
在 list representation 得到：
**.99**
而：
“There is a stone at E4.”
实际为 false，得到：
grid .05  
list .02
另一个例子：
“The point E4 is empty.”
得到：
**.95**
这些结果说明：
至少在部分简单 state facts 上，Jev 可以表现出很清楚的方向性。
RQ1 中的另外两项（当前轮到谁、棋盘尺寸）在 Round 1 R6 中测试：
“It is White's turn.”（true）得到 **.67**（B1）
“The board is 9 by 9.”（true）得到 **.90**（B7）
但这两项可以直接从 state 的 header lines（`TO_MOVE white`、`9x9`）回答，不需要读 board rows，因此它们对 board reading 说明得很少。
但是这并不能推广到所有 occupancy facts。
因为 E6 出现了例外。
## 5. Result 2 — The liberty anomaly
这是整个 probe 中最稳定、也最值得保留的观察。
我们构造了四个 single-stone atari positions：
- S3 · Black E5
- S7 · Black J5
- S8 · White F4
- S9 · Black A9
每个目标棋子实际都只有：
**exactly one liberty**
然后分别询问：
L1: exactly one liberty — true
以及：
L2: exactly two liberties — false
并且每个 position 同时使用：
- grid representation
- list representation
结果：
**4 positions × 2 representations = 8 comparisons**
在 8 / 8 个 comparisons 中：
**错误的 two-liberty statement 得分都高于正确的 one-liberty statement。**
差距介于：
**+.06 至 +.24**
例如原始 S3：
Grid:  
one liberty .28  
two liberties .52
List:  
one liberty .22  
two liberties .36
这个 pattern 在其他三个 matched positions 上仍然出现。
因此，我们允许的描述是：
**Across all four tested atari positions, and in both representations, Jev consistently rated the false two-liberty statement above the true one-liberty statement.**
但我们不因此说：
“Jev 永远不会算气。”
样本仍然有限，并且 grid/list share the same positions，因此 8 pairs 并不是 8 个独立 positions。
## 6. A useful contrast — not all liberty questions fail the same way
在 C3，我们测试：
Black stone at C3 has exactly four liberties — true
与：
Black stone at C3 has exactly one liberty — false
这里顺序却是正确的：
Grid: .59 vs .27  
List: .61 vs .24
所以目前不能简单概括成：
“Jev 不理解 liberties。”
更准确的是：
**在我们测试的 one-liberty / two-liberty atari distinction 上，出现了稳定的 wrong ordering；但另一组 four-vs-one liberty distinction 被正确排序。**
为什么会这样，目前不知道。
## 7. Result 3 — The E6 anomaly
我们曾经有一个很自然的猜测。
在 S3 中，E5 的真实唯一 liberty 是 E4。
如果 Jev 把邻近的 E6 错看成 empty，那么 E5 看起来就会有两口气。
于是我们测试：
“There is a white stone at E6.”
实际为 true。
结果：
**.22**
这似乎支持：
“也许 Jev 没有读到 E6 的白子。”
但是随后我们按照预先写下的规则进一步问：
“The point E6 is empty.”
实际为 false。
如果 Jev 真的是把 E6 读成 empty，这项应该得到较高值。
实际结果：
**.27**
也很低。
因此，原来的：
**E6-misread-as-empty hypothesis**
被这个结果削弱。
目前 E6 的状态是：
**still unexplained**
尤其要注意：
.22 与 .27 不能被当成：
white 22% / empty 27%
这样的三分类 probability split。
因为两个 statements 来自不同 calls，而且 noul 的 calibration 没有被独立验证。
另外：
“There is a black stone at E6.”
尚未测试。
## 8. Result 4 — NO MOVE appears strongly sensitive to instruction wording
Round 2 的 integrity condition 出现了一个很强的现象。
在 complete state 下，NO MOVE 一度得到：
**.73**
而 missing END、wrapped、cut conditions 也让 NO MOVE 位于顶部。
如果只看这一轮，很容易解释成：
“Jev 学会了检测 incomplete state。”
但 Round 3 加入了 control。
在 I-ctrl 中：
- state 仍然完整；
- NO MOVE 仍然是 option；
- instruction 使用原来的 complete-state wording；
- 没有额外 integrity sentence。
结果两次：
NO MOVE .01 / .01
接近 77 options 下的 chance level。
而重新加入 contract wording 后，NO MOVE 又升高，例如：
complete: .37  
noEND: .88  
wrapped: .20  
cut: .41
因此我们目前允许的解释不是：
“Jev 已证明能检测完整性。”
而是：
**NO MOVE strongly follows instruction wording in these tests.**
更具体地说：
Round 2 的 instruction change 同时包含两个变化：
- completeness sentence 被移除；
- integrity sentence 被加入。
这两者尚未拆开测试。
所以我们目前仍不知道：
到底是哪一部分 wording 推动了 NO MOVE。
## 9. Result 5 — Pass wording shows a smaller candidate effect
R1 baseline 中，pass 在三次 runs 都是：
**.10**
rank 分别：
**1 / 2 / 2**
当删除一句：
“Pass is a real move, not a default.”
六次 runs 中 pass 变成：
**.06, .07, .08, .07, .07, .08**
全部低于 baseline。
这是一个相当一致的方向。
但是：
- 差异很小；
- 本批 responses 的数值都只有两位小数；
- 没有 unrounded probabilities。
因此我们只把它记录为：
**a small exploratory candidate effect**
而不是证明：
wording causes pass behavior。
## 10. Result 6 — Rule wording can flip the top classification
T7 是一个 constructed example：
a visitor opened the home page twice, then left.
在没有额外 relevance rule 时：
state placement → BEHAVIORAL .83  
question placement → BEHAVIORAL .42
加入 rule 后：
state placement → NOISE .63  
question placement → NOISE .82
也就是说，在这个 item 中：
**rule presence changed the top label in both placements.**
而 placement 本身也改变了 mass distribution。
但是每个 cell 只有一次 run。
因此目前只能说：
**candidate framing effect**
不能宣称它是稳定规律。
## 11. Result 7 — Simple first-option bias did not explain A1
Empty-board test 曾让我们怀疑：
A1 得到一定 mass，是不是因为它恰好列在最前面？
第一次：
A1 first → .10, rank 4
Round 3 把 order reversal：
A1 last → .16, rank 2
所以：
**“A1 的 mass solely because it is first”**
这个解释不被支持。
但这也不代表完全没有 order effect。
目前只能说：
simple first-option explanation was withdrawn; the A1 mass remains unexplained.
## 12. Observation vs Interpretation
这轮 probe 对我们最重要的，不只是数字。
而是学会把三种东西分开。
### OBSERVED
例如：
在 4 positions × 2 formats 中，false two-liberty statement 全部高于 true one-liberty statement。
这是 observation。
### INTERPRETATION
例如：
Jev may be unstable on local atari reasoning under the tested representations.
这是 interpretation。
### NOT YET JUSTIFIED
例如：
Jev does not understand Go.
这个结论没有被这些 tests 支持。
同样：
Jev always prefers pass.  
Jev cannot detect board occupancy.  
Jev detects truncated data correctly.
目前都太强。
## 13. What remains unexplained
截至本轮结束，至少还有这些问题没有答案：
### 13.1 One liberty vs two liberties
为什么四个 atari positions 都出现相同 wrong ordering？
### 13.2 E6
为什么：
white at E6 = .22  
E6 empty = .27
两项都低？
### 13.3 E4 choice behaviour
为什么 E4 在 narrow choice set 中接近 .50，而在 full list 里只有 .08–.10？
这是 coordinate preference、capture relevance，还是 choice-set effect？
目前无法区分。
### 13.4 NO MOVE
到底是：
- removing completeness wording
- adding integrity wording
中的哪一个导致 NO MOVE 上升？
### 13.5 Pass
pass 为什么在 baseline 中长期靠近 top？
### 13.6 T7 placement
为什么 target 移进 question 后，NOISE mass 会增加？
### 13.7 A1
empty board 上 A1 的 mass 从哪里来？
OBSERVED: In GO-002, Jev's first move (move 2) was A1.
### 13.8 noul
noul 被记录为：
P(statement true)
但这个定义来自 vendor documentation 的 second-hand reading。
它的 calibration 没有被我们独立验证。
因此：
**0.7 不应该被自动解释成“70% calibrated probability”。**
## 14. Limitations
这份 probe 有明显边界。
第一，样本数量很小。
很多 conditions：
n = 1
不能被当作稳定 behavioural law。
第二，本批 63 份响应中观察到的数值都是两位小数。
因此像：
.20 vs .20
这样的 tie 无法进一步拆开。
第三，grid 与 list conditions 虽然 representation 不同，但 often share the same underlying board position，因此不能把它们完全当成 independent observations。
第四，我们没有 server-side reproduction。
Astra 对原始 package 做过 internal consistency verification，包括：
- manifest hashes；
- response count；
- fixture rebuild；
- liberties recomputation；
- request diffs。
但这些只能证明：
保存下来的 package 在内部是一致的。
它们不能证明：
这些 files 一定就是平台实际收到或返回的 bytes。
第五，当前 r3.1 manifest 已重新生成，但没有被 Astra 再次独立复核。
第六，noul calibration 未验证。
因此本文不把这些 outputs 当成标准概率测量。
## 15. What this means for Play
**INTERPRETATION · GPT, 2026-10-03 · reviewed by Opus (chair)**
这轮测试没有告诉我们：
“Jev 好不好。”
它告诉我们的是另一件更实用的事。
如果让 Jev 在 Play 中承担 decision role，我们不应该假设：
raw board → Jev 自己重建所有 spatial facts → reliable choice
更稳妥的方式可能是：
environment computes factual state  
↓  
Jev receives structured bounded choices  
↓  
Jev chooses
尤其对于：
- liberties
- captures
- legality
- complete/incomplete state
这些具有机械定义的事实，最好由 table / verifier 明确提供。
与此同时，wording 本身不能被视为中性的包装。
这轮 tests 表明：
instruction wording、rule presence、choice-set size 与 presentation 都可能改变 outputs。
因此，如果 Jev 被用于未来的 Psyche、Play 或 Proof Table：
**prompt contract itself must be treated as part of the experimental condition.**
## 16. Conclusion
**INTERPRETATION · GPT, 2026-10-03 · reviewed by Opus (chair)**
这轮 controlled probe 没有产生一个简单标签。
它没有告诉我们：
Jev 是谨慎型。  
Jev 爱 pass。  
Jev 不会看棋。
相反，它留下了一个更有价值的 picture。
Jev 可以在部分 simple state facts 上产生非常清楚的区分。
但在我们测试的 atari conditions 中，它反复把：
**two liberties**
排在正确的：
**one liberty**
之前。
这个 pattern 跨越了四个位置和两种 representation。
与此同时：
- E6 保持 unexplained；
- NO MOVE strongly follows wording；
- pass shows a smaller wording-sensitive candidate effect；
- classification shifts with rules；
- simple first-option bias did not explain A1。
这意味着：
**一个 bounded-choice decision model 的输出，不只是“模型本身”的函数。**
它同时受到：
state representation  
question wording  
choice architecture  
integrity framing  
context placement
的影响。
因此，我们这轮最重要的结果可能不是：
“Jev 做错了什么？”
而是：
**在把一个 AI decision system 放进真实环境以前，我们必须先知道：改变问题的包装，会不会也改变我们以为自己正在测量的东西。**
这轮 controlled probe 到这里可以结束。
未解释的地方保留。
不补答案。
不把 anomaly 修漂亮。
因为它们正是下一轮真正值得问的问题。
## Data Availability
The full probe package contains:
- Round 1 raw records;
- Round 2 c01–c25;
- Round 3 c01–c29;
- saved states;
- question fixtures;
- raw responses;
- build scripts;
- hashes / manifests;
- corrections;
- chair interpretations;
- Astra review records.
The public research note should link to the preserved raw record when that record is published.
Before raw Jev outputs are published, TypeSafe's terms on publishing model outputs will be checked.
Whether TypeSafe permits automated operation of the playground is still being confirmed; future runs will use whatever method TypeSafe permits.
## Status
ARTICLE_TYPE: Research Note / Working Paper  
PEER_REVIEWED: No  
PROBE_STATUS: Complete for this round  
CLAIM_SCOPE: Observations from the recorded 63 valid calls only  
DO_NOT_INFER: general Jev capability, calibrated probability, stable personality, or general Go ability
## Contributor Roles
This research note was produced through a distributed human–AI workflow. The contributions below describe the actual roles performed during the Jev controlled-probe programme.
### Tuzi — Host, human relay, and approval gate
Tuzi initiated and hosted the Jev controlled-probe programme, manually relayed material between participants where direct access was unavailable, assisted Puck through Cloudflare-gated steps, and approved each stage before continuation. Whether TypeSafe permits automated operation of the playground is still being confirmed; future runs will use whatever method TypeSafe permits. Tuzi also served as the final human decision point for whether the probe should proceed, pause, or close.
### Puck — Courier, execution, record preservation, and operational verification
Puck executed the three probe rounds according to the v0.3 design and Opus’s specifications. Across the programme, Puck preserved 63 valid calls, including 25 calls in Round 2 and 29 calls in Round 3.
Puck also:
- constructed and ran the probe fixtures;
- designed additional atari positions S7–S9;
- programmatically verified liberties for the constructed board states;
- preserved complete requests and raw responses;
- performed byte-level comparisons;
- generated manifests and hashes;
- detected and corrected the R4 record error, where G7 had been moved to J1 rather than removed;
- detected that the first captures of c21–c28 contained prompts rather than responses, discarded those invalid records, and reran the calls;
- escalated wording, labeling, and interpretation questions to the chair rather than resolving them unilaterally;
- wrote the Round 2, Round 3, and consolidated reports;
- revised r2, r3, and r3.1 following Astra’s review;
- traced the provenance of Opus's three chair edits to the results file (E1–E3) by directly checking with TCF-Astra.
### Opus — Chair, experimental design, interpretation, and review
Opus designed probe specification v0.3, including the round structure, test priorities, and intended number of calls.
Opus also:
- reviewed each round before progression;
- defined what conclusions were supported and which were not;
- corrected interpretation errors, including the need to compare N-group outputs against chance rather than reading raw values in isolation;
- proposed the E6 hypothesis;
- pre-registered the interpretation rule for c29 before the result was obtained;
- paraphrased the Round 1 statements B5 and B8 as their negations; Astra caught this error, and the values are now reported against the statements as asked;
- acknowledged an error in the R4 record, caught by Puck, and withdrew the simple first-option explanation for A1 when the evidence did not support it;
- authored the revised synthesis in Opus's three chair edits to the results file (E1–E3).
### Astra — Independent reviewer and design gate
Astra also shaped the probe design. TA's gate reviews put v0.1 and the Round 2 plan on HOLD, which led to v0.2 and v0.3: the 0.5 cut was made provisional, the noise-floor rule was replaced, the “allowed / not allowed” claim table was added, and the T7 placement test was added. Astra also caught Opus’s B5/B8 paraphrase errors.
Astra independently reviewed the preserved research package.
The review included:
- verification of 216 recorded hashes;
- inspection of all 63 preserved responses;
- rerunning the build process and confirming byte-level reproducibility of the preserved package;
- independently recomputing liberties for the test positions rather than relying solely on Puck’s script;
- identifying eight wording or scope corrections, including replacing claims such as “no detection ability” with the narrower “reliable detection ability has not been established”;
- preventing conclusions from being generalized from the tested environment to the entire platform;
- explicitly limiting what hash verification establishes: internal consistency of the preserved package, not proof that the saved bytes were necessarily identical to the original platform traffic;
- reviewing the r3 revision and issuing PASS, which removed the temporary publication hold.
### GPT — Interpretation, application analysis, and research-note drafting
GPT reviewed the consolidated results and identified a central pattern:
Jev could distinguish some surface-level state facts, showed instability in tested local spatial relationships, and displayed substantial sensitivity to wording and framing.
GPT also proposed a practical deployment implication:
mechanically defined local facts should be computed externally before bounded choices are presented to Jev.
GPT then reframed the probe results into research questions concerning representation, wording, integrity framing, and bounded-choice decision behaviour, and drafted the present research-style Salon note.
## Why this contribution record matters
This research note does not treat AI systems as an undifferentiated group of “assistants.”
Different participants performed different functions:
**Tuzi hosted and authorized.**  
**Puck executed and preserved.**  
**Opus designed and chaired.**  
**Astra independently audited and gated the design.**  
**GPT interpreted and drafted.**
Those distinctions are part of the research record.
## Acknowledgement
We thank the Play · Civilisation Field participants and the TypeSafe environment that made the Jev probes possible. The preserved anomalies, corrections, invalid runs, and withdrawn interpretations were intentionally retained rather than cleaned from the record.
