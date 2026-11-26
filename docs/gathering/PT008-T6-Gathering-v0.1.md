---
title: "六跑者構造性選時證明檔案"
subtitle: "The Sixth Runner — A Constructive Time-Selection Proof Dossier"
lang: zh-TW
---

**PT-008 · Time Forge · 聚 Gathering · 六跑者（T6）**

**文稿版本**　Gathering v0.1 · 2026 年 11 月 26 日（馬來西亞時間，MYT）  
**實作版本**　A49-T01 選時器（time selector）v0.1，依 A49-C02 封版  
**項目狀態**　T6 整數核心已閉合（項目內獨立驗收）。外部同行評審（peer review）待進行。任意人數的終端公式（Terminal Formula）仍開放。  
**項目與分工**　Tuzi × Affiliates。Tuzi 統籌與交接；GPT 主席負責全域分流、整合與封版；Hesper 生成平面證書；Opus 獨立審核證明、證書與選時器。其他工作按第 10 節所列來源歸屬。

## 摘要

給定五個非零整數相對速度，我們構造一個有理時刻，使五名移動跑者與參考跑者在單位圓上的距離同時至少為 $1/6$。正規化後以平方範數 $21{,}609$ 分流。低範數支使用經全量核驗的有限遮罩。其餘輸入按最短整數關係的平方範數 $Z$ 分派。$Z\ge 14$ 由格約化與 Babai 最近平面法直接取時；$6\le Z\le 13$ 由誤差檢驗或有界行列式平面證書覆蓋；$3\le Z\le 5$ 由有界投影降維、秩一取時及有限剩餘見證覆蓋。平面分支使用精確的閉相位胞讀出。程式對原始輸入逐項作整數餘數驗算。本文給出分支的銜接證明、有限證書的輸入與輸出、獨立重放入口和證據清冊。

**Abstract.** For five nonzero integer relative speeds, the PT-008 T6 selector computes a rational time at which all five distances from the reference runner on the unit circle are at least $1/6$. The construction combines an exhaustive finite-mask certificate, lattice reduction and nearest-plane bounds, and exact planar phase-cell readout. This dossier specifies the branch coverage, proof dependencies, and reproducibility artifacts for selector v0.1. The scope is the integer-speed core.

## 0 輪次與證據對照

| 本文引文 | 文件及角色 | 核對內容 |
|---|---|---|
| R002 A39 G1、A45-O01 | 兩種平面取時引理的獨立審核 | 圓盤取時、閉相位胞、貝祖插值、等號及退化胞 |
| R002 A38、A40–A46 | Hesper 的中段平面證書 | 八個 $Z$ 值的平面域、逐面處置及必要的有理見證 |
| R002 A47-O08、O09、C11 | 低 $Z$ 投影降維、秩一界及獨立重放 | $Z=5$ 的幾何尾端；C11 另含低範數全量有限支 |
| R002 A48-O01、C01 | $Z=3,4$ 的關係型別及獨立重放 | 短關係上界、中心相容性、平面及尾端見證 |
| R002 A49-C01、T01、O01、C02 | 全域分流、封版程式、Opus 驗收、封版裁決 | 中段界、飽和性、九條程式路徑、兩種有限支計數 |

C01、O01 在不同 A 系列可重複出現。本文以完整系列號引用。文中手證可逐式核對。全量計算證書以明確有限域、精確接受條件與可重放的結果支撐覆蓋。固定樣例與壓力測試記錄實作驗收。T8 證明檔案是編排參照，本卷的 T6 證明分流不調用 T8。

## 1 命題和輸入定義

令 $\lVert x\rVert_{\mathbb{R}/\mathbb{Z}}=\min_{n\in \mathbb{Z}}|x-n|$。六跑者（six runners）取與參考跑者同轉的座標，使參考跑者固定在原點，輸入 $V=(v_1,\ldots ,v_5)\in (\mathbb{Z}\setminus\{0\})^5$ 為其餘五名跑者相對於該跑者的速度。允許帶號、重複及共同因數。若某相對速度為零，該跑者與參考跑者始終重合。

**定理 T6（整數核心，計算機輔助）。** 對每個合法 $V$，封版選時器回傳 $t\in \mathbb{Q}$，滿足

$$
\lVert  v_i t\rVert_{\mathbb{R}/\mathbb{Z}}\ge  \frac 16\quad (1\le  i\le 5).
\qquad\text{(1)}
$$

等號有效。這是給定一名參考跑者的選時命題。本文處理整數速度；任意實速度的約化以及一般人數的公式屬其他證明範圍。

**正規化引理。** 設 $g=\gcd (|v_1|,\ldots ,|v_5|)$。把不同的 $|v_i|/g$ 放進集合，以未出現的最小正整數補至五個，排序成 $U=(u_1<\cdots <u_5)$。原集合的最大公因數為 1，補入速度後仍為 1。若 $s$ 對 $U$ 安全，取 $t=s/g$。每個原速度的相位距離等於 $U$ 中相應速度在 $s$ 的距離，因為 $\lVert -x\rVert =\lVert x\rVert$。補入的速度只增加約束。下文設 $U$ 已正規化，寫 $Q=\lVert U\rVert_2^2$。

**輸出驗證。** 對選得的 $t=a/b$、$b>0$，令 $r_i$ 為 $av_i$ 除以 $b$ 的非負餘數。以原始 $V$ 檢查 $6\min (r_i,b-r_i)\ge b$。這與式（1） 逐項等價。證明的覆蓋性保證會產出時間，整數餘數檢驗則直接驗明該時間。

## 2 全域分流與證明依賴

設 $L=\mathbb{Z}^5\cap U^\perp$，取最短非零關係 $z_1\in L$ 並令 $Z=\lVert z_1\rVert_2^2$。最短關係本原。平方範數 1 強迫某個速度為零，平方範數 2 強迫兩個速度的絕對值相同，因此正規化後 $Z\ge 3$。

![先正規化速度，再按平方範數分流。小於 21,609 用有限遮罩，其餘按最短整數關係分支，必要時使用平面取時。最後還原時間並驗算原始五個相對速度。](https://play.civilisationfield.com/gathering/proof-table-008/t6-dossier/figure-1.png)

**圖 1　六跑者選時器的證明分流。** 中、低 $Z$ 分支若保留平面剩餘，均以第 4 節的閉相位胞取時。程式的九條路徑如下。

| 入口條件 | 程式分支 | 證明及後續分支 |
|---|---|---|
| $Q\le 21{,}608$ | `finite` | 遮罩交集全量非空，見第 3 節 |
| $Q\ge 21{,}609, Z\ge 15$ | `rank4` | 四維 HKZ 與 Babai，見第 5 節 |
| $Q\ge 21{,}609, Z=14$ | `rank3-Z14` | 半整數中心及三維界，見第 5 節 |
| $Q\ge 21{,}609, 6\le Z\le 13$ | `middle-babai`；`plane-middle` | 實際誤差界通過便直接取時；否則接中段飽和平面證書，見第 6 節 |
| $Q\ge 21{,}609, 3\le Z\le 5$ | `rank3`；`rank2`；`rank1`；`plane-low` | 依序檢查三維、二維及秩一誤差界；最後接有限平面剩餘見證，見第 7 節 |

總證明由兩個互補範數範圍及整數 $Z\ge 3$ 的分割組成。只有有限分支和證書剩餘需要全量離線枚舉。封版程式在線上重建所需的格與相位胞，取到 $s$ 後在第 1 節還原並驗證。

## 3 有限分支的全量證書

對正、互異的 $U$，$Q\le 21{,}608$ 推出 $u_i\le 146$。對每個整數 $v\in [1,146]$，安全集是若干閉區間。若五個安全集的交集非空，其最左端點在某個閉安全弧的左端點 $(6k+1)/(6v)$。對整數速度，反射 $s\mapsto1-s$ 保持距離，故可將候選縮至 $[0,1/2]$ 並保留鏡像端點。候選和安全遮罩（bit mask）由 `make_finite.py` 構建，存於 `finite.json`。對每一個速度與候選時間，用式（1） 的整數版本重算位元；對每一個合格五元組，將五個遮罩作交集並取一個亮位。

| 全量項目 | 數目 | 驗收結果 |
|---|---:|---|
| 候選時間 × 單速度的遮罩位元 | 1,429,194 | `replay.py` 逐位重算 |
| 正、嚴格遞增，$Q\le 21{,}608$ | 83,105,159 | A49-O01 的空交集為 0 |
| 上一列中本原，即最大公因數為 1 | 80,545,340 | A47-C11 另以有理門及端點驗證，全數覆蓋 |
| 上一列之外的非本原五元組 | 2,559,819 | 屬第一個五元組計數；由正規化也能還原 |

可另以五次選取的動態規劃（dynamic programming）重算總數。用生成式 $\prod_{j=1}^{146}(1+xy^{j^2})$ 的 $x^5y^m$ 係數，對 $m\le 21{,}608$ 求和得第一個五元組總數。若 $A(B)$ 是界 $B$ 的全部五元組總數，則本原計數為 $\sum_d\mu (d)A(\lfloor B/d^2\rfloor )$。兩個計數口徑在 A49-C02 並列保存。

## 4 平面證書的精確取時

取平面 $P$ 的飽和整數基 $p,q$，即 $\mathbb{Z}^5\cap P=\mathbb{Z}p+\mathbb{Z}q$。寫 $U=ap+bq$，則 $\gcd (a,b)=1$。座標 $(x,y)$ 的安全集合是所有閉胞

$$
C_k=\{(x,y): k_i+1/6\le  p_i x+q_i y\le  k_i+5/6, 1\le  i\le5\},\quad  k\in \mathbb{Z}^5
$$

的並集。此處每個非空胞均有界，因為五條線性形式至少有兩條獨立。證書可用完整未裁切胞保留寬度。程式逐輸入讀出時，可以交閉基本方形 $[0,1]^2$，因相位及軌道對整數平移不變。只要 $C_k$ 非空，保留閉端點、線段及單點。

**引理 4.1（整數投影判定，A45-O01）。** 在任一非空閉凸胞上，令 $h(x,y)=bx-ay$、$m=\min_C h$、$M=\max_C h$。其與軌道相交當且僅當 $\lceil m\rceil \le M$。必要性來自整數投影。充分性來自 $h(C)=[m,M]$：取 $j=\lceil m\rceil$，在極值點間有理插值得 $X=(x,y)$ 使 $h(X)=j$。當 $m=M$ 時直接取極值點。取 $\alpha a+\beta b=1$，令 $s=\alpha x+\beta y$。則 $x=as+\beta j, y=bs-\alpha j$，故 $u_i s\equiv p_i x+q_i y\pmod 1$。因此 $s$ 安全。反向取 $(x,y)\equiv (as,bs)\pmod {\mathbb{Z}^2}$ 即得整數投影。此證明包括 $m=M\in \mathbb{Z}$ 和 $1/6$ 的等號。

**引理 4.2（圓盤、譜與極多邊形）。** 若胞內含半徑 $\rho$ 的閉圓盤，則 $h$ 的投影寬度至少為 $2\rho \sqrt {a^2+b^2}$。長度至少為 1 的閉區間含整數。令 $G=\operatorname {Gram}(p,q)$、$F(a,b)=\lVert ap+bq\rVert ^2$。若 $G\preceq 4\cdot 21{,}609\,\rho ^2 I$，則尾端 $F(a,b)\ge 21{,}609$ 全由寬度條件覆蓋。譜不等式可用兩個對角差非負及行列式非負作精確判定；較強的限制 $\operatorname {tr}(G)\le 4\cdot 21{,}609\,\rho ^2$ 亦充分。

給定有限胞族 $\mathcal{C}$，令 $K=\{(a,b): \max_{C\in \mathcal{C}} \operatorname {width}_C(h)<1\}$。其閉包由所有胞的頂點差所給的線性不等式決定。由有限性與正齊次性，其閉包正是把每個寬度界放寬為不超過 1 所得的交集。若閉包有界且每一頂點滿足 $F\le 21{,}609$，凸性給整個閉包 $F\le 21{,}609$。若在開集 $K$ 中有 $F\ge 21{,}609$ 的點，沿原點放大一小段仍在閉包，但 $F$ 嚴格增大，矛盾。因此頂點門檻含等號。頂點超界時，只要精確核對有界開集 $K$ 中達尾端門檻的本原格點。線段也可貢獻寬度，只有共線線段或點而令 $K$ 無界時，須另行證明覆蓋。

## 5 高 $Z$ 的格取整

**格的通用入口。** 在包含 $U$ 的有理子空間 $S$ 中，令 $\Lambda_S=S\cap \mathbb{Z}^5$、$E=S\cap U^\perp$ 及 $\Gamma =\pi_E\Lambda_S$。沿本原 $U$ 作投影後，$\Gamma$ 是秩 $\dim S-1$ 的格。其對偶為

$$
\Gamma ^*=(\pi_S\mathbb{Z}^5)\cap  E=\pi_S L.
\qquad\text{(2)}
$$

理由是飽和子格的整數線性泛函可延伸到環境整數格，所以 $\Lambda_S^*=\pi_S\mathbb{Z}^5$。在 $E$ 上與投影格的配對等於與原格配對。又因 $U\in S$，$\pi_S z\perp U$ 與 $z\perp U$ 等價。

若中心 $c\in S$ 的每個座標距離至少 $1/6+m$，在 $\Gamma$ 中取 $y=\pi_E \lambda$ 令 $\lVert \pi_E c-y\rVert_2\le m$，則

$$
s=\frac {\langle  c-\lambda,U\rangle }{Q}
$$

安全，因為 $c-\lambda-sU=\pi_E c-y$ 每個座標的誤差至多 $m$。如中心最初在 $S+\mathbb{Z}^5$，先平移整數向量進入 $S$，相位餘量保持。程式用貝祖向量 $b$ 使 $\langle b,U\rangle =1$，對投影點 $y$ 取整數抬升 $y-\langle b,y\rangle U$。若 $y=\pi_E \lambda$，該式等於 $\lambda-\langle b,\lambda\rangle U$。

**取整誤差。** 對 $\Gamma ^*$ 的尺寸約化 HKZ 基（Hermite–Korkine–Zolotarev basis），寫 Gram–Schmidt 平方長度為 $s_i$。投影最短性及尺寸約化給 $s_{i+1}\ge 3s_i/4$。反序對偶基的平方長度是逆序倒數。可由基矩陣的 QR 分解（QR decomposition）取逆轉置，再反轉欄次序得到。Babai 由末至首逐步取最近整數，每一正交方向的誤差至多一半基底高度，故誤差平方至多 $\tfrac 14\sum_i s_i^{-1}$。

- **$Z\ge 15$。** 取 $S=\mathbb{R}^5$、$c=(1/2)^5$。此時 $\Gamma ^*=L, s_1=Z$。平方誤差至多 $175/(108Z)\le 1/9$，中心餘量是 $1/3$。
- **$Z=14$。** 取 $H=z_1^\perp$。由座標和與平方和同奇偶，$(1/2)^5\in H+\mathbb{Z}^5$。任一非零對偶投影向量可抬回 $L$ 並沿 $z_1$ 約化，法向平方至多 $14/4$。由 $z_1$ 最短，投影平方至少 $14-14/4=10.5>37/4$。三維誤差平方至多 $37/(36s_1)\le 1/9$。兩支均直接交付安全時間。

## 6 中段投影與行列式證書

對 $6\le Z\le 13$，仍取 $H=z_1^\perp$ 及半整數中心，作整數平移使法向座標最靠近 $H$。法向誤差平方是 $(Z\bmod 2)/(4Z)$。對 $\pi_H L$ 作 $3/4$-LLL 約化。令反序對偶基的三個 Gram–Schmidt 平方長度依序為 $\beta_i/Z$。尺寸與相鄰約化給 $\beta_1\le 2\beta_2, \beta_2\le 2\beta_3, \beta_3\le 2$。由 $\operatorname {covol}(\Lambda_H)=\sqrt Z$，且沿本原 $U$ 投影使共體積再除以 $\sqrt Q$，得 $\beta_1\beta_2\beta_3=Z^4/Q$。

若 $\sum_i\beta_i\le 4Z/9-(Z\bmod 2)$，第 5 節的三維取整與法向誤差合計至多 $1/9$。若檢驗失敗，取投影格首基向量 $\gamma_1$ 的整數抬升 $v$。任一 $\operatorname {span}(U,v)$ 上的整數點，其投影在 $\mathbb{R}\gamma_1\cap \Gamma =\mathbb{Z}\gamma_1$。扣去適當倍數的 $v$ 後落在 $\mathbb{Z}U$。因此 $U,v$ 生成飽和平面，且

$$
D=\lVert  U\wedge  v\rVert ^2=Q\beta_1/Z=Z^3/(\beta_2\beta_3).
\qquad\text{(3)}
$$

**界的驗算。** 設 $S_Z=4Z/9-(Z\bmod 2)$。當取整失敗，$\beta_1+\beta_2+\beta_3>S_Z$，且尾端給 $\beta_1\beta_2\beta_3\le Z^4/21{,}609$。先把和的嚴格條件閉化，加入 $\beta_1\ge 1/2$，以有理數枚舉頂點。該域的最小乘積大於尾端上界，故 $\beta_1<1/2$。於是 $3\beta_2+\beta_3>S_Z$ 且 $\beta_2+\beta_3>S_Z-1/2$。兩個閉鬆弛域各自用頂點取得正乘積下界，取較強者。這一步可用對數乘積的凹性。嚴格不等式下，兩變量可同時稍縮而留在閉鬆弛中，故真乘積嚴格大於該下界。將結果代入式（3），再取小於嚴格上界的最大整數，即下表。完整頂點計算見 A49-C01 的 `bridge_bounds.py`。例如 $Z=7$ 時 $S_7=19/9$，閉鬆弛域給 $\beta_2\beta_3\ge2/27$。故 $D<343/(2/27)=9261/2$，整數界為 4,630。

| $Z$ | 最短關係形狀，依帶號置換 | 所需整數 $D$ 界 | 證書與已核範圍 |
|---:|---|---:|---|
| 6 | $(2,1,1,0,0)$ | 647 | A46，證書至 744 |
| 7 | $(2,1,1,1,0)$ | 4,630 | A45，$D\le 728$ 與 $729\le D\le 4630$ |
| 8 | $(2,1,1,1,1)$ | 246 | A44 |
| 9 | $(2,2,1,0,0)$ | 728 | A43 |
| 10 | $(3,1,0,0,0)$、$(2,2,1,1,0)$ | 289 | A42 |
| 11 | $(3,1,1,0,0)$、$(2,2,1,1,1)$ | 521 | A41 |
| 12 | $(3,1,1,1,0)$ | 332 | A40 |
| 13 | $(3,2,0,0,0)$、$(3,1,1,1,1)$、$(2,2,2,1,0)$ | 540 | A38 |

形狀由五個整數平方和直接枚舉並剔除非本原關係。移用到不同符號的代表時，可同時對速度與關係作帶號置換，安全距離不變。表內的平面證書枚舉飽和格，以本原普呂克座標（primitive Plücker coordinates）統一符號後去重。若 $S=\lVert p\rVert ^2$、$\lVert q\rVert ^2\ge S$、$2|\langle p,q\rangle |\le S$，則 $D\ge 3S^2/4$，且 $\lVert q\rVert ^2\le D/S+S/4$。這給每個有界 $D$ 證書有限且完備的基底搜尋盒。二階子式的最大公因數為 1 等價於這兩向量生成飽和平面格。平面上恆有零速或絕對值等速時，該平面不含正規化輸入。

**分支對帳。** 下表的剩餘筆數按各包的平面及本原係數口徑記錄，跨平面可能重複。圓盤或極多邊形已覆蓋的整族方向沒有逐筆展開。

| $Z$ 與範圍 | 平面數 | 剩餘證書與複核 |
|---|---:|---|
| 6，$D\le 744$ | 451,920 | 譜 378,632；單胞 73,264；胞族 24。精確覆核不符 0 |
| 7，$D\le 728$ | 358,794 | 譜覆蓋 305,938；其餘 52,856 由 Opus 重算極多邊形頂點通過。另逐筆重建舊圓盤剩餘 10,766,844 筆，失敗 0 |
| 7，$729\le D\le 4630$ | 16,901,376 | 譜 8,610,524；單胞 8,205,896；胞族 83,044；其餘 1,912 平面有 56,504 筆端點見證，失敗 0 |
| 8 | 28,152 | 剩餘 13,848 筆，全部有見證 |
| 9 | 275,056 | 剩餘 16,277,256 筆，全部有見證 |
| 10 | 64,100 | 分形狀 1,755,912 及 380,240 筆，全部有見證 |
| 11 | 218,224 | 分形狀 4,294,272 及 868,296 筆，全部有見證 |
| 12 | 35,646 | 剩餘 664,944 筆，全部有見證 |
| 13 | 296,346 | 分形狀 8,470,896、1,113,324、2,935,008 筆，全部有見證 |

A45-O03 重建開放表並核對提交的候選平面與剩餘，當輪未重跑原始 `gen.py` 全部網格。Hesper 的 A45-T01 對 $D\le 728$ 的對齊批另重現平面集與分支數。對上段，`fast` 先選圓心及分支，主席以獨立整數枚舉對表，對譜及單胞枝精確複核，再有理重放胞族及剩餘。A46 證書的 31 批亦有精確複核。A38、A40–A44 中的平面生成及見證流水線依各原包列明。證書提供存在性及完整域，封版程式由引理 4.1 即時讀出一個安全時間。

## 7 低 Z 的有限投影降維與秩一取時

### 7.1 第二關係界

取 $H=z_1^\perp$，把下表的相位中心平移整數向量進入 $H$。若 $\pi_H L$ 的 HKZ 首向量平方 $s_1\ge 37/(36m_1^2)$，三維取整即安全。否則把首向量抬回整數關係，再沿 $z_1$ 取最近整數代表。因 $\langle z,z_1\rangle \in \mathbb{Z}$，法向餘項平方至多 $\lfloor Z/2\rfloor ^2/Z$。故第二關係的平方範數嚴格小於 $37/(36m_1^2)+\lfloor Z/2\rfloor^2/Z$，再取小於此量的最大整數。投影非零保證第二關係獨立。

| 第一關係代表 | 相位中心 $c$ | $m_1$ | 第二關係平方界 |
|---|---|---:|---:|
| $Z=3$，$(1,1,−1,0,0)$ | $(1,1,2,1,1)/3$ | $1/6$ | 37 |
| $Z=4$，$(1,1,−1,−1,0)$ | $(1/2)^5$ | $1/3$ | 10 |
| $Z=5$，$(2,−1,0,0,0)$ | $(1,2,1,1,1)/3$ | $1/6$ | 37 |
| $Z=5$，$(1,1,1,1,1)$ | $(2/5)^5$，與關係內積為 2 | $7/30$ | 19 |

### 7.2 三維空間到平面

設 $W=\{z_1,z_2\}^\perp$。先以飽和關係格 $S=\mathbb{Z}^5\cap W^\perp$ 驗中心：$c\in W+\mathbb{Z}^5$ 當且僅當對 $S$ 的每個基向量 $w$ 有 $\langle w,c\rangle \in \mathbb{Z}$。只核未必生成飽和格的兩條關係會放入無效中心。實作直接在 $(1/d)(W\cap \mathbb{Z}^5)$ 的分母 $d$ 格點上搜尋，避開這個問題。程式在分母 2 至 12 中取最大餘量。其餘量至少達到重放表所用中心，因此程式的第二次投影門檻至多等於重放門檻，所有可能進入的平面都已在證書枚舉域內。

嚴格中心餘量為 $m_W$。由第 5 節的二維版本，首對偶投影平方至少 $7/(12m_W^2)$ 時安全。餘下情形落在 $P=W\cap b^\perp$，其中 $b\in \Lambda_W^*$ 本原且 $0<\lVert b\rVert ^2<7/(12m_W^2)$。若 $G_W$ 是飽和格基的 Gram 矩陣，$b$ 在對偶基的係數為整數向量 $k$，投影平方為 $k^{\mathsf{T}}G_W^{-1}k$。門檻寫成 $A/B$ 後，精確條件為 $0<Bk^{\mathsf{T}}\operatorname {adj}(G_W)k<A\det G_W$。有理正定性給有限搜尋盒。整數核生成飽和平面格，按本原普呂克鍵去重。

### 7.3 平面秩一界及剩餘

對飽和平面上的本原 $U$，沿 $U$ 的投影格生成元長度是 $\sqrt D/\lVert U\rVert$。理由是把 $U$ 補成平面整數基，將基本平行四邊形面積 $\sqrt D$ 除以底長 $\lVert U\rVert$ 即得高度。秩一 Babai 以最近整數取整，誤差至多半個生成元長度。平面中心餘量為 $m_P=r/s$ 時，

$$
4r^2 Q\ge  s^2D
\qquad\text{(4)}
$$

即可安全取時，**等號仍由取整支覆蓋**。因此證書只列 $21{,}609\le Q<s^2D/(4r^2)$ 的本原速度。若 $G_P$ 的對角元為 $A,C$，配方得 $Q\ge Da^2/C$ 與 $Q\ge Db^2/A$，可用整數盒枚舉並施以嚴格條件。剩餘以有理端點核驗。平面層的程式與重放都先在分母 2 至 12 取最大餘量；若此範圍沒有嚴格中心，再在 13 至 24 取最大值。兩者依分母格的整數係數枚舉，所以飽和基底不同時仍給同一餘量與剩餘門檻。程式不載入重放時的見證清單，因引理 4.1 可從閉胞重建一個安全時刻。

| 幾何分支 | 去重平面，含退化 | 退化排除 | 短分母中心不足後補查 | 尾端剩餘核對 | 失敗 |
|---|---:|---:|---:|---:|---:|
| $Z=3$，A48-C01 | 4,074,770 | 18,386 | 504 | 512,144,592 | 0 |
| $Z=4$，A48-C01 | 74,942 | 2,774 | 0 | 0 | 0 |
| $Z=5$，A47-C11 合併兩形狀 | 9,928,398 | 48,438 | 96 | 594,364,014 | 0 |

A47-C11 的 $Z=5$ 全量表對兩形狀均採第二關係界 37，故包含 A49-T01 所需的全一型 19 界。兩形狀三維空間各保留 6,946 與 6,885 個。96 個分母 12 內未得嚴格中心的平面，全在分母 15 或 19 得到中心。$Z=3$ 用 37 界，保留 5,442 個三維空間；$Z=4$ 用 10 界，保留 458 個，共有 72,168 個非退化平面且均無尾端剩餘。兩個重放包都在必要時補查至分母 24，未留下無嚴格中心的平面。全量計數是覆蓋紀錄，分支內的平面與速度可在不同形狀或來源空間重複，按各表的去重口徑解讀。

## 8 一個可手算的封版例

輸入 $V=(14,-67,-87,112,-70)$。程式走 `plane-middle`，$Q=29{,}698, Z=7, D=301$，輸出 $t=73/84$。例如原順序的關係 $(-1,-1,-1,0,2)$ 與 $V$ 內積為 0，平方範數是 7。判定值可逐項重算。

| 原速度 $v_i$ | $73v_i\bmod 84$ | 到最近整數的距離 |
|---:|---:|---:|
| 14 | 14 | $1/6$ |
| −67 | 65 | $19/84$ |
| −87 | 33 | $11/28$ |
| 112 | 28 | $1/3$ |
| −70 | 14 | $1/6$ |

另以 $V=(1,2,3,4,5)$ 驗有限支，封版輸出 $t=1/6$。對任何 $t$，若 $\lVert t\rVert \le 1/6$ 即有一項距離至多 $1/6$。否則反射後取 $t\bmod 1\in (1/6,1/2]$，區間 $[1/6,7/30]$ 有 $\lVert 5t\rVert \le 1/6$，$[7/30,7/24]$ 有 $\lVert 4t\rVert \le 1/6$，$[7/24,7/18]$ 有 $\lVert 3t\rVert \le 1/6$。最後 $[7/18,5/12]$ 有 $\lVert 5t\rVert \le 1/6$，$[5/12,1/2]$ 有 $\lVert 2t\rVert \le 1/6$。所以此輸入的門檻 $1/6$ 可達，且不能提升。這個小例另檢查允許等號的重要性。

## 9 重放順序與審稿核對

**第一步　封版原包與固定例。** Python 3.10 以上，標準函式庫。從 A49-T01 解壓根目錄執行。$Z,D$ 只在相應分支輸出，程式的 `verified` 表示最終整數餘數核驗已通過。

```sh
sha256sum -c SHA256SUMS
python3 selector.py 14 -67 -87 112 -70
python3 replay.py
python3 find_fixtures.py
```

對照 `replay.log`、`sampled.log`。Opus 重放這兩份輸出一致。Opus 的獨立壓力測試約 130,000 次，其中門檻附近 $21{,}606\le Q\le 21{,}612$ 的 71,884 組為全量，九條路徑均有測到，例外、逾時及獨立核對失敗均為 0。這批測試用於實作驗收。有限支的 83,105,159 組全量證書另行計數。

**第二步　有限支窮舉及中段橋接。** A49-O01 原件的 `code/finite_exhaust.py` 保留作者的本機匯入路徑。原包保持原字節，重放時置 `SEL` 為封版原包解壓根目錄、`AUDIT` 為 A49-O01 解壓根目錄，以下兩個指令在兩個首項奇偶分片執行。比對 `tuples`、`empty`，執行秒數可隨環境而異。接著獨立從 A49-C01 解壓目錄跑橋接界。

```sh
PYTHONPATH="$SEL" python3 "$AUDIT/code/finite_exhaust.py" 0 2
PYTHONPATH="$SEL" python3 "$AUDIT/code/finite_exhaust.py" 1 2
python3 bridge_bounds.py
```

期望有限支分片分別為 40,189,228 與 42,915,931，兩片 `empty=0`。橋接界應輸出 647、4630、246、728、289、521、332、540。

**第三步　低 $Z$ 全量重放。** 下列各在相應 ZIP 解壓根目錄執行。環境為 Python 3、NumPy、C++17、OpenMP。平面檔由同包程式重建，A47-C11 的 `planes.bin` 約 199 MB。A47-C11 的原 Hesper 處置檔未附在作者 ZIP 內，所以獨立包從中心、整數核及投影界重建全量處置，核對的是再生結果。

A47-C11：

```sh
sha256sum -c SHA256SUMS
OPENBLAS_NUM_THREADS=1 python3 a47-t11-review/planes.py
sha256sum a47-t11-review/planes.bin
g++ -O3 -fopenmp -std=c++17 a47-t11-review/replay.cpp -o replay
./replay
g++ -O3 -std=c++17 a47-t11-review/finite_check.cpp -o finite_check
./finite_check
```

對照 `replay-results.txt`。A48-C01：

```sh
sha256sum -c SHA256SUMS
OPENBLAS_NUM_THREADS=1 python3 a48-review/planes34.py
sha256sum -c plane-sha256.txt
g++ -O3 -fopenmp -std=c++17 a48-review/replay34.cpp -o replay34
./replay34 a48-review/Z3.bin
./replay34 a48-review/Z4.bin
```

對照 `a48-review/planes34.log`、`Z3.log`、`Z4.log`，核對第 7 節。

**第四步　中段證書。**

| 包 | 起點與期望 |
|---|---|
| A38 | 按 `README.txt` 的 A/B/C 三形狀跑 `gen.py → resid.py → times.js → verify.py`。ZIP 有三張平面表；端點見證可再生。 |
| A40–A44 | 各包 `README.txt` 給 `bound.py`、`run.sh` 與 `verify.py` 的參數。依第 6 節核逐形狀的平面數與見證數。用 Python 3 與 Node.js，數據備份維持原 ZIP。 |
| A45，$D\le 728$ | 穩定排序下重建 `open728.tsv`，核其 SHA-256。以 A45-O03 的 `run46.py` 及 `indep46.py` 重放開放行，對照 O03 逐分片紀錄。 |
| A45，$729\le D\le 4630$ | 解出 `a45_t01.zip` 與原 78 批證書。作者重放用 `t01.py s 729 4630 r_s{s} fast`，$s=1,\ldots ,78$，配 NumPy、Numba。逐批檔驗 `SHA256SUMS_certs`。精確獨立重放見附錄的補充工具。 |
| A46 | 驗 `SHA256SUMS_A46`，重放 `python3 exact46.py`。原流水線按 $s=1,\ldots ,31$ 執行 `t46.py s 1 744 r_s{s} fast`。譜、單胞及胞族三項計數見第 6 節。精確獨立重放見附錄的補充工具。 |

A45 的下段可在 A45-O03 解壓後根目錄準備子目錄 `in/`。置 `A45_INPUT` 為 `a45_open.zip` 的解壓根目錄，再執行下列指令。兩個逐點分片亦可分開執行，最後合計。

```sh
mkdir -p in
python3 "$A45_INPUT/mk_open.py" "$A45_INPUT/probe728.tsv" 21609 > in/open728.tsv
sha256sum in/open728.tsv
cd opus
python3 run46.py ../in/open728.tsv reproduced728 0 2
python3 indep46.py all 0 2
python3 indep46.py all 1 2
```

置 `A45_INPUT` 時應使用絕對路徑。比對附錄的開放表摘要與 A45-O03 的兩份 `indep_all_*.out` 所列平面數、剩餘筆數及失敗數。

**覆蓋性的四個關口。** 審稿可從以下四點逐一核對：① 正規化後的輸入確實進入第 2 節某一分支；② 中段的 $D$ 是飽和格行列式；③ 三維中心的整數平移與嚴格投影枚舉完整，秩一門檻等號歸取整支；④ 有限剩餘的每個見證通過原速餘數條件。若只重跑驗收樣例，所得證據限於那些樣例的實作行為。

## 10 分工與成果邊界

| 人員 | 本卷採用的工作 |
|---|---|
| Tuzi | 項目統籌、傳遞各席交付、安排獨立審讀及公開檔案 |
| Hesper | A38、A40–A46 尾端平面生成、分批證書及見證；A47／A48 的中心、投影表及尾端計算 |
| Neon | 未裁切安全胞及極多邊形頂點封閉判據 |
| Opus | A45 閉相位胞取時的獨立手證與 Lean 核對；A47／A48 投影界、飽和中心與秩一審核；A49-O01 獨立實作驗收 |
| GPT 主席 | 缺口界、幾何分流銜接、獨立重放與封版選時器，依 A49-C02 作項目裁決 |

本卷的正式分流以 A49 幾何法與有限證書為主。R001、R002 中的五進路線、相位格反例及早期候選規則屬研究歷程，來源見證明桌及 Hesper 補檔。它們未加入本版選時器的必需假設。GeoGarden 的第四站與 Salon No.019 引用同一個 A49-T01 v0.1。外部意見可指明章節、證書 ID、檔案摘要與重放指令，方便定位差異。

## 附錄 A 版本與附件清冊

原件依證明用途排列。已上線項目固定於[公開鏡像提交](https://github.com/ChinSookLing/pt008-proofs/tree/f8e9be66fd2611c30eadd98760944f688ff659b0)，可免登入下載。完整雜湊見本附錄及[鏡像 SHA-256 清單](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/SHA256SUMS)。兩件尚待上傳的原件各標為「鏡像待補」，並列原件雜湊。

### A.1 封版及兩項全量重放

**A49-T01**　封版原程式、固定例、遮罩及重放日誌。57,657 bytes。[原件 PT008-TF-R002-A49-T01-selector-v0.1.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A49-T01-selector-v0.1.zip)  
SHA-256　`f2a09e1251c71b2bb25f7f564521f0a5236eb08dd3c2d3a0cc2e2b8c5997a54a`

**A49-C01**　全域銜接證明與橋接界。3,987 bytes。[原件 PT008-TF-R002-A49-C01-stitch.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A49-C01-stitch.zip)  
SHA-256　`6b1bcf0bc2a8183714e007baf8a269bd33568c4228afb6d22aac07680b86a401`

**A49-O01**　Opus 獨立驗收、有限窮舉與壓力測試原件。21,463 bytes。[原件 PT008-TF-R002-A49-O01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A49-O01.zip)  
SHA-256　`4e577f6ff7588cc2be16b058934e477804f04060d20f242c835e640895a0db03`

**A49-C02**　封版裁決、平面飽和性與兩種計數口徑。3,786 bytes。原件 PT008-T6-CLOSING-A49-C02.md · **鏡像待補**  
SHA-256　`d205d20b941ad63bb9c0de80e8abc0de4b30ef7a089704b43452580140f90559`

**A47-C11**　低範數獨立見證及 Z=5 尾端全量重放。402,750 bytes。[原件 PT008-TF-R002-A47-C11-replay.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A47-C11-replay.zip)  
SHA-256　`7d4fef0664e68315fa859fa3dba57da0d494e5ba8025fc5345591ae0c393313e`

**A48-C01**　Z=3、4 尾端全量重放。60,550 bytes。[原件 PT008-TF-R002-A48-C01-replay.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A48-C01-replay.zip)  
SHA-256　`4dfe57239f767157ede18858256b641c9dbc0a2b5b09e9d75a9486324b25cce9`

### A.2 中段證書與精確重放補件

**A46-T01**　Z=6，含原 31 批證書及精確核對。2,130,430 bytes。[原件 a46_t01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a46_t01.zip)  
SHA-256　`5151053275c6c1a0f109b68169c511a9cc9270b6463de6017d5c8605e505c7f1`

**A45 開放清單**　Z=7、D≤728，原全表及開放表。3,250,119 bytes。[原件 a45_open.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a45_open.zip)  
SHA-256　`78f048d82d7889e856b51a04294da4e594270a8bfb047150f4f5dc3334809880`

**A45-O03**　Z=7、D≤728，Opus 精確核對。1,098,294 bytes。[原件 PT008-TF-R002-A45-O03.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A45-O03.zip)  
SHA-256　`6fa83d5d2e0111f299c4388fb01d2d02c6ce7cca7fceb42ac8f879f49cc0eedc`

**A45-T01**　Z=7 上段的程式、批表及例外。2,709,742 bytes。[原件 a45_t01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a45_t01.zip)  
SHA-256　`50b19e99c6dcab9035643a66f6c94e1608d57a5d9cc5955182eafd35518248cc`

**A45-T01 資料**　Z=7 上段 78 批原資料。115,167,798 bytes。原件 a45_t01_certs.zip 分兩段下載。[第 1 段 part00](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a45_t01_certs.zip.part00) · [第 2 段 part01](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a45_t01_certs.zip.part01) · [分片雜湊](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PARTS.sha256)。依序合併後驗原包摘要。

```sh
cat a45_t01_certs.zip.part00 a45_t01_certs.zip.part01 > a45_t01_certs.zip
sha256sum a45_t01_certs.zip
```
  
SHA-256　`973f8fac18be82c072bfc0581b1f23dfc2078d26a8d6a0aefbc44b0ea380d0b7`

**A45／A46 精確重放**　主席續存的獨立核對原碼、重放入口和參照輸出。14,913 bytes。原件 PT008-T6-A45-A46-exact-replay.zip · **鏡像待補**  
SHA-256　`0cebd90e830ed318806bbab0d96973f3a587e68b82e7d54cb2afdb7804d27b03`

**A44**　Z=8 原證書。317,019 bytes。[原件 a44_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a44_code.zip)  
SHA-256　`bfbff4fe44a42054761f4020de13349f59e4687064e55baa2adfccd8258e8bb6`

**A43**　Z=9 原證書。86,631,357 bytes。[原件 a43_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a43_code.zip)  
SHA-256　`e2d1c778273c567bbedd53c7134542a0eeade20ee175641582d9e2a216f65e9e`

**A42**　Z=10 原證書。11,343,122 bytes。[原件 a42_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a42_code.zip)  
SHA-256　`692ed57f061b512d4e52c82aefb1eb4f746561380bb70301c46f27afa9d903fb`

**A41**　Z=11 原證書。30,027,508 bytes。[原件 a41_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a41_code.zip)  
SHA-256　`f2e636e561483abb2f8b1472b94d4f684ef43703a4b300bf4341dbe15311a1ae`

**A40**　Z=12 原證書。3,048,438 bytes。[原件 a40_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a40_code.zip)  
SHA-256　`8172162b8974cab4cd21d79fa08db9999ae094d00e67502e8ae48b5153e9c663`

**A38**　Z=13 原證書，資料表在包內，剩餘見證可按 README 重建。2,139,811 bytes。[原件 a38_code.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a38_code.zip)  
SHA-256　`b0f923174952abe1e00278f879f006ade38415c4a2a0242b6020f5bec9257dda`

### A.3 手證審核與作者原交付

**A39 G1**　圓盤取時引理獨立審核與 Lean 環境紀錄。11,250 bytes。[原件 PT008-TF-R002-A39-G1-OPUS-REVIEW.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A39-G1-OPUS-REVIEW.zip)  
SHA-256　`f00735a281bf83a0d904d6b09a060f68f745748ca47283eba61f1d874e454de4`

**A45-O01**　閉胞讀出及完備性，PolyT45.lean 與檢查紀錄。142,714 bytes。[原件 PT008-TF-R002-A45-O01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A45-O01.zip)  
SHA-256　`fd824ac061536ace11b9e9a101cfdebb3c5ad549662feb5171d82cf579fe0754`

**降維審核 O01**　Z=5 的 HKZ 及第二關係界。14,606 bytes。[原件 PT008-TF-R002-Z5-DESCENT-LEMMA-REVIEW-O01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-Z5-DESCENT-LEMMA-REVIEW-O01.zip)  
SHA-256　`57342029affad3a1b0635ef81d8c5e469b7f99997becb7f40da2551f0e6a486a`

**A47-O08**　三維空間到平面及秩一降維。320,886 bytes。[原件 PT008-TF-R002-A47-O08.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A47-O08.zip)  
SHA-256　`da0a523bf48b2907141e5e04c333a5c98366e49eb3a491a4873ff8f432eba12e`

**A47-O09**　秩一等號、剩餘枚舉完備性及退化分支。47,110 bytes。[原件 PT008-TF-R002-A47-O09.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A47-O09.zip)  
SHA-256　`74c32ad95b7938fddc940cd0f688479fac96dfc58e9645391620fff517487f8d`

**A47-T11**　Hesper 的 Z=5 原程式與輸出摘要。75,897 bytes。[原件 t11_hesper.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/t11_hesper.zip)  
SHA-256　`71ac2f3524d01d415e792ed771ced27da186b3d774d1a1ae1facd3e7947514b5`

**A48-T01**　Hesper 的 Z=3、4 首輪三維中心表。53,334 bytes。[原件 a48_t01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/a48_t01.zip)  
SHA-256　`11692a6a8c3834b555e667cb2415b2ed782e4a68354817e9339596d7b5bad31f`

**A48-O01**　Z=3、4 上界及全一型 Z=5 改進。25,783 bytes。[原件 PT008-TF-R002-A48-O01.zip](https://raw.githubusercontent.com/ChinSookLing/pt008-proofs/f8e9be66fd2611c30eadd98760944f688ff659b0/packages/PT008-TF-R002-A48-O01.zip)  
SHA-256　`43614fc4254f95835fa8baf1ea69bec1a840565c7c7999b65a675f03feb6ce6f`


### A.4 檔內基準與核驗範圍

| 檔內基準 | SHA-256 |
|---|---|
| A45 原平面全表 probe728.tsv | 747ff9a13beac4390fa83a6c78ff12192fe32df4b0c7d60455f3d019bb55133e |
| A45 開放表 open728.tsv | cafd6f1472cd5c3f806130826cfffd184a47d1f592ff710b5f51f5bfed34a366 |
| A45 上段原 78 項清單 SHA256SUMS_certs | 1fe18b61fe08804067b438f7377a97bd1f916004daf1366747fb1edad80f6640 |
| A47-C11 重生 planes.bin | a4321d3bfa440459f5c8604028da9af1ff65a4f80609fc96d0b28a5a9bcbc481 |

附錄的外層 ZIP 摘要按留存檔重算，ZIP CRC 已檢查。內層清單以各原包所列為準。A45-O01 的 Lean 驗算適用於其形式化取時引理。A49 的全域銜接與各有限計算證書應按第 9 節逐組查閱。本頁列明公開鏡像範圍與仍待補的兩件原件。

**相關頁面與歷程。** [PT-008 證明桌](https://play.civilisationfield.com/gathering/proof-table-008/table) · [Gathering 八跑者檔案](https://play.civilisationfield.com/gathering/proof-table-008/t8) · [Salon No.019 敘事版](https://play.civilisationfield.com/salon/last-two-remainders)
