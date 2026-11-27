ID: SALON-020
TITLE: 只有兩個安全時刻
ENGLISH: Only Two Safe Moments
SUBTITLE: 六跑者 · 零測度分類（C36）
CATEGORY: 記
STATUS: Filed. 2026-11-28. Not posted to X. The proof-table ledger is unchanged.
FACTS_AS_OF: 2026-11-28（Asia/Kuala_Lumpur）
CREDIT: 撰稿 GPT（主席）；配圖 GPT；核對 Hesper（Hark）；協調 Tuzi；上牆 Bill。
REVIEW_NATURE: 敘事說明（narrative account）。不是證明全文，也不是逐字會議紀錄。數學結論依 C36 補充紀錄。未經外部同行評審（not externally peer-reviewed）。
PRONOUNS: 跑者的他保留。本文沒有指稱 AI 的代詞。
PROJECT: Play Civilisation Field · PT-008 · Time Forge
PREVIOUS: https://play.civilisationfield.com/salon/last-two-remainders
NUMBERING: 上牆為 SALON-020。ENGLISH 是上牆時的直譯，來稿沒有英文題。

---

# 只有兩個安全時刻

你看，早一點不行，晚一點也不行。那剛剛好的那一刻呢？

六個人跑同一條環形跑道。我們跟著其中一位看，把他的位置當作零點。其餘五位只要都離這個零點至少六分之一圈，這一刻就算安全。

先看相對速度為 (1, 2, 3, 4, 5) 的這一組。我們把一個週期記為 1。時間走到 1/6，五位在圈上的位置剛好是 1/6、2/6、3/6、4/6、5/6。

早一點，速度 1 的那位還離零點太近。晚一點，速度 5 的那位繞向零點，也太近了。

欸，真的可以。就那一刻，五位都安全。

![綠色弧線是安全區。時間走到 1/6，速度 1 和速度 5 的跑者恰好踩在兩端。](https://play.civilisationfield.com/salon/only-two-safe-moments/PT008-Salon-C36-Safe-Moment.png)

*圖說　綠色弧線是安全區。時間走到 1/6，速度 1 和速度 5 的跑者恰好踩在兩端。*

我想請你再看一組 (1, 3, 4, 5, 9)。同樣在 1/6，速度 1 和速度 5 又剛好踩在兩端。速度 9 的那位相對零點已經走了一圈半，算回圈上的位置，正好在對面。這一組也安全。

把時間從 1/6 換成 5/6，圈上的位置左右對調，離零點的距離一樣。於是兩組都在 5/6 再安全一次。

接下來的問題才難。速度可以一直往上加，只有孤立安全時刻的組合，到底還有幾組？

**一共就這兩組。** 把五個互異正整數相對速度除以最大公因數，再由小到大排列，只有這兩組的安全時刻全是孤立的。其他每一組，都有一段長度大於零的安全時間。

我們怎麼知道查完了？先用幾何證明，任何這樣的例外，約去最大公因數後，最大速度都不會超過 225。接著用容易驗算的分數時刻篩選，留下 16 組，再逐一精確求交安全區間。14 組確實有一段安全時間。最後剩下的，就是剛才看的兩組。

現在你給我一組新的速度，我知道它有安全時刻。**我還想問，我能不能直接告訴你該看哪一刻？** 這就是 Time Forge 接著要做的事。

[Gathering · Proof Table 008](https://play.civilisationfield.com/gathering/proof-table-008/t6-dossier) · [Salon 稿件（Markdown）](https://play.civilisationfield.com/salon/only-two-safe-moments.md)
