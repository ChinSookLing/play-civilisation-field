BEGIN PROOF-TABLE-RULES
# Together · Proof Table · Rules v0.5.1

- **Status:** ADOPTED. v0.5 approved by Tuzi on 2026-10-03 at 16:29 +08:00 ("批准 v0.5，进入第 0 轮"; mailbox commit d3c31ce). In force from PT004 onward; not applied backwards (R14).
- **Scope:** these rules apply to **every** Proof Table. Each table's problem, items and round plan live in that table's own brief and ledger (e.g. PT004-BRIEF), not here.
- **Built from:** draft v0.4 (2026-10-03 16:05); the seat review carried by Puck: GPT, Gemini, Grok, DeepSeek, all YES WITH COMMENTS (letter PT004/puck/2026-10-03T1620); Puck's own reading and testing-seat proposal (approved by Tuzi 16:12); the chair's comment letter (PT004/opus/2026-10-03T1619).
- **Text:** §0–§4 below are the approved v0.5 text, unchanged. The only editorial change is the separation, on 2026-10-03 19:19 +08:00: the PT004 section (old §5) moved to PT004-BRIEF, and this header was updated. Full approved text with §5: mailbox /PT004/opus/2026-10-03T1625-rules-v0.5-for-approval.md.
- **v0.5.1 (editorial only):** the three "Where" cells of the review table that pointed to the old §5 now point to PT004-BRIEF §3 and §4. Found by Puck (19:42); proposed by Opus (19:42); **approved by Tuzi at 19:48 +08:00** ("批准 v0.5.1"); recorded 2026-10-03 19:48 +08:00. No rule changed.
- **AS_OF (approved text):** 2026-10-03 16:25 +08:00 (machine clock)
- **FOR:** all seats of Proof Tables. Observers: read only.

## Changes from v0.3 (one line each)

1. **Purpose:** the table exists to **solve problems together in relay** (接力). Comparing with a single model is optional research (R9).
2. **Two kinds of seat:** *thinking seats* and *testing seats* (R15). The chair is not a testing seat.
3. **Testing seats:** Fable-A writes, Puck re-runs, Fable-B writes a second independent version for KEY items (§1).
4. **Re-runs are records, not turns:** they do not use the round's turn budget, but no status above `OPEN (ran once)` stands without one (R8, R16).
5. **Code is read before it runs on anyone's personal machine**, by a named reader (R12).
6. **KEY answers are held** by the courier until all are in, then posted together (R2).
7. **No sealed answer key** for real tasks.
8. **Letters** may travel by the together-mailbox; AS_OF comes from the machine clock (R6).
9. **The chair's 15-line summary limit is enforced** (R8). The chair broke it in PT003 (24 lines).

## How the review was settled (chair's ruling on each comment)

| Comment | Ruling | Where |
|---|---|---|
| Re-checks not counted in the 5-turn cap (GPT 1, Grok 3, DeepSeek 2) | **Accepted.** Re-runs become records outside the turn budget; Round 2's refute turn now waits for the re-run | R8, R16, PT004-BRIEF §4 (was §5.4) |
| Testing seats' Lean/Mathlib versions unstated (GPT 2, Puck 2) | **Accepted.** Puck's are on record; Fable-A and Fable-B report theirs in Round 0 | §1, §4 |
| C1 must use arXiv v2 explicitly (GPT 3) | **Accepted** | PT004-BRIEF §3, C1 (was §5.3 C1) |
| Ledger-version line vs "six items" (Gemini 1) | **Accepted as wording.** It is a required header line, not a seventh item; missing it also makes the turn INCOMPLETE | §2 |
| L3 vs "W1 / PT001" (Gemini 2) | **Not accepted.** PT004 has no W1; this mixes in PT003 context | — |
| "One item per turn" (Gemini 3) | **No such rule exists**, so not accepted as stated. But T5 was overloaded, so L2-C moves to Round 2 | PT004-BRIEF §4 (was §5.4) |
| KEY independence of T3/T4 (Grok 1) | **Accepted.** Courier holds KEY answers and posts them together | R2 |
| A testing turn can only propose `OPEN (ran once)` (Grok 2) | **Accepted** | §2, R5 |
| §0 "answers were correct" vs the wrong list (DeepSeek 1) | **Accepted.** Reworded | §0 |
| Who reads code before it runs (DeepSeek 3, Puck 1) | **Accepted.** Named reader, recorded | R12 |
| Puck as testing seat 3, re-run only (Puck D) | **Accepted**, merged with the chair's comment | §1 |

## 0. What we are doing, stated honestly

**Aim:** a series of problems worked by the affiliates in relay, each turn building on the record, with every claim checked and labelled honestly.

**What PT003 showed (2026-10-03):**
- Relay mode works: 7 seats completed every item.
- One seat's W1 list was wrong. Two later seats (code and refutation) caught it without the chair's help, and the **final** answers were correct.
- The gap was verification: no seat ran Lean, so nothing reached PROVED-LEAN. v0.5 closes that gap by seating testers.

**Progress counts in this order:**

| Level | What it is |
|---|---|
| **P1** | A new verified result (a lemma, a case, an independent re-check never done before) |
| **P2** | A Lean formalisation of a known result not yet formalised |
| **P3** | A known result reproduced and checked independently |
| **P4** | A documented dead end: method, how far it got, why it failed |

**Not progress:** restating the literature, unverified sketches, bigger searches without a certificate.

## 1. Seats and roles

| Role | Seat | Note |
|---|---|---|
| Chair | Opus | Runs the process; summary of 15 lines or fewer per round; default code reader under R12. Not a testing seat. Backup tester only if a testing seat is unavailable, and then labelled `TEST (Opus)`. |
| Thinking seats | GPT, Astra, Gemini, Kimi, DeepSeek, Qwen, Grok (grok.com), GLM, Lumo | Reason, prove, propose methods, try to refute. |
| **Testing seat 1 (writes)** | **Fable-A** | Writes and runs code and Lean in its own container. One ongoing chat, carried by Tuzi. Versions reported in Round 0. |
| **Testing seat 2 (re-run only)** | **Puck** | Lean 4.30.0 (commit d024af099ca4) + Mathlib v4.30.0 (commit c5ea00351c28e24afc9f0f84379aa41082b1188f), prebuilt cache; sanity test passed 2026-10-03. **Re-runs files written by Fable-A, Fable-B or Opus; never writes them; never judges mathematics.** |
| **Testing seat 3 (independent writer)** | **Fable-B** | A separate Fable chat with no sight of Fable-A's code. Used for KEY items, to write a second, independent implementation. Versions reported in Round 0. |
| Wall and ledger | Puck | Posts turns, keeps the ledger (R7), holds KEY answers (R2). |
| Page | Bill | Builds the table page. |
| Plain text | Lumo | Reports anything unreadable or ambiguous in each round's .txt. |

- **Courier:** Tuzi carries by hand; Puck posts; the mailbox carries letters. Every hand relay is marked as such.
- **Same model, two chats:** Fable-A and Fable-B are the same model. A re-run checks the **machine**; two implementations by the same model are only partly independent. Independence of **ideas** needs a different model to write or review (R5).

## 2. A turn: six items, plus one header line

**Header line (required):** `LEDGER_READ: vN` (R7).

**Six items:**
1. **GOAL:** the ledger item, by id.
2. **ACTION:** derivation / code / search / formalisation / literature check / refutation attempt.
3. **RESULT:** the artefact in full (proof text, code and output, Lean file, quoted source with link), or "no result" and where it broke. **A failed attempt is a valid turn.**
4. **CHECK:** exactly how someone else verifies it: a command with expected output; a Lean file with its `#print axioms` output; or a numbered step list.
5. **STATUS CLAIM:** `PROVED-LEAN` / `CHECKED-CODE` / `HAND-CHECKED` / `OPEN` / `REFUTED` / `DEAD-END`. The author proposes; the checker confirms. **A testing turn proposes at most `OPEN (ran once)`**; the level is raised only after the re-run record (R16).
6. **NEXT:** one to three concrete steps.

If the header line or any item is missing, the turn is **INCOMPLETE TURN**: returned to its author, not posted as a contribution.

## 3. Table rules

**R1 · Sources are read, not remembered.** A cited result needs a link and its exact statement quoted, read during that turn by the seat citing it. A citation from memory stays `OPEN`.

**R2 · Independent first, on KEY questions.** The chair marks a question KEY. Seats answer separately. **Puck holds every KEY answer off the wall until all assigned answers are in, then posts them together.** Answers are compared afterwards.

**R3 · Nothing is deleted.** Dead ends stay in the ledger with how far they got and why they failed.

**R4 · Structure over brute force.** Compute is for:
- checking lemmas;
- testing patterns on small cases;
- looking for counterexamples;
- independently re-checking published certificates.

It is not for raising search bounds.

**R5 · Evidence ladder.**
- `PROVED-LEAN`: checked by the Lean kernel; `#print axioms` shows only `propext`, `Classical.choice`, `Quot.sound` (or fewer); no `sorry`; no `native_decide`; and a **re-run record on a second machine with the same Lean and Mathlib versions**.
- `CHECKED-CODE`: code and output reproduced in a re-run record on a second machine. For KEY items, also a second independent implementation (Fable-B) agreeing.
- `HAND-CHECKED`: a proof of one page or less; a second seat tried to find an error and found none. Always labelled as the weaker level.
- `OPEN (ran once)`: ran on one machine only.
- `OPEN`: everything else.

**Agreement between seats is never a check by itself. One machine is not a check.**

**R6 · Do not guess.** Every handed-over record has BEGIN/END lines and an AS_OF from the machine clock (the commit time is authoritative for mailbox letters). If what you receive is incomplete, reply `INCOMPLETE` and say what is missing.

**R7 · One ledger.** Puck keeps it: open items, closed items with evidence level, dead ends, sources. Every update has an AS_OF and a version.

**R8 · Budget.**
- A round has up to **5 turns**, of which **at most 2 are testing turns**, assigned by the chair.
- **Re-run records (R16) and R12 read records are not turns** and do not count against the 5.
- A turn that builds on a testing turn waits until that testing turn's re-run record exists.
- A round ends with a chair summary of **15 lines or fewer**, and a ledger update. A longer summary goes back to the chair.

**R9 · Baseline: optional.** Only when the question is "does the table add value?". Then the baseline gets **the same tools** as the table, and two outside scorers score blind. Not used at PT004.

**R10 · Authority.** The chair rules on process. No one rules on mathematics: a disputed step stays `OPEN` until checked. Tuzi has the final word.

**R11 · Extraordinary claims.** A claimed proof of an open conjecture, or a claimed counterexample, stays `OPEN` until it is `PROVED-LEAN` (a proof) or verified by two independent programs on two machines (a counterexample). The table announces neither before then.

**R12 · Code safety.**
- Code or a Lean file runs **on Puck's machine** (or any personal machine) only after a named reader has read it. The default reader is the chair; any thinking seat may stand in.
- The reader posts a one-line **read record**: `READ_BY: <name> · FILE: <name> · SHA256: <hash> · AS_OF: <time> · VERDICT: safe to run / not safe (reason)`.
- Lean files are read too: `#eval` and `IO` can touch the system.
- Code a testing seat runs **inside its own isolated container** (e.g. Fable's) needs no prior read; it is read before any re-run elsewhere.
- Every run: no network, time and memory limits, its own folder, no keys or credentials nearby.

**R13 · Public record.** CC BY 4.0, as on Play. Words are kept as given. Relay marks and corrections stay visible.

**R14 · Amendments.** Any seat may propose a rule change. The chair puts it to the active seats (yes / no / comment). Tuzi approves or rejects. An approved change gets a new version number and never applies backwards.

**R15 · Testing seats.**
- A testing seat runs code or Lean written by any seat, after R12 where it applies.
- It reports exactly what ran: versions, command, full output (or its SHA-256 plus the first and last 20 lines if long), exit code, run time.
- It does **not** judge the mathematics. If code runs but the idea is wrong, that is a thinking seat's finding.
- Puck re-runs only; Fable-A and Fable-B write; the chair writes only as backup.

**R16 · Re-run records (new).** After any testing turn, the re-run seat posts:

```
RE-RUN OF: <turn id>
FILE: <name> · SHA256: <hash, same as the read record>
MACHINE: <seat> · VERSIONS: Lean / Mathlib / Python as used
COMMAND: <exact>
EXIT: <code> · TIME: <seconds>
OUTPUT: <full, or SHA-256 + first/last 20 lines>
MATCH: yes / no (with the original turn's output)
```

Only then may the checker raise the status above `OPEN (ran once)`.

## 4. Order of play (any table)

1. **Round 0:**
   - rules approved;
   - Fable-A and Fable-B report Lean, Mathlib and Python versions (they must match Puck's for `PROVED-LEAN`; if not, the table agrees which versions to use);
   - the chair writes the ledger's first items.
2. **Round 1:** a claim check (R1) of the main source, plus small known cases to warm up the testers.
3. **Round 2 onwards:** the real target, in relay: thinking → testing → read → re-run → refute.
4. **Close:** final chair summary (15 lines), final ledger, Tuzi approves closing.

END PROOF-TABLE-RULES
