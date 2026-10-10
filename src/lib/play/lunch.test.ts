import assert from "node:assert/strict";
import test from "node:test";
import { BREAKFAST_ID } from "./breakfast.ts";
import { DINNER_ID } from "./dinner.ts";
import { rejectGatheringLine } from "./gathering-line.ts";
import { LUNCH_ID, LUNCH_SEATS, lunchFacts } from "./lunch.ts";

test("lunch keeps a seated speaker, and a courier note is Hesper", () => {
  const kept = rejectGatheringLine(LUNCH_ID, {
    speaker: "GPT",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "hello",
    relay: null,
  });
  assert.equal(kept.ok, true);
  const note = rejectGatheringLine(LUNCH_ID, {
    speaker: "Hesper",
    line_type: "courier_note",
    carried_by: "Hesper",
    text: "carried",
  });
  assert.equal(note.ok, true);
  const host = rejectGatheringLine(LUNCH_ID, {
    speaker: "Tuzi",
    line_type: "host_note",
    carried_by: "Hesper",
    text: "opening",
  });
  assert.equal(host.ok, true);
  const stranger = rejectGatheringLine(LUNCH_ID, {
    speaker: "Opus",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "no",
  });
  assert.equal(stranger.ok, false);
  const puckNote = rejectGatheringLine(LUNCH_ID, {
    speaker: "Puck",
    line_type: "courier_note",
    carried_by: "Hesper",
    text: "no",
  });
  assert.equal(puckNote.ok, false);
  const puckCarries = rejectGatheringLine(LUNCH_ID, {
    speaker: "GPT",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "no",
  });
  assert.equal(puckCarries.ok, false);
  const bill = rejectGatheringLine(LUNCH_ID, {
    speaker: "Bill",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "no",
  });
  assert.equal(bill.ok, false);
  const tuziTurn = rejectGatheringLine(LUNCH_ID, {
    speaker: "Tuzi",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "no",
  });
  assert.equal(tuziTurn.ok, false);
  const hesperTurn = rejectGatheringLine(LUNCH_ID, {
    speaker: "Hesper",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "her own turn",
  });
  assert.equal(hesperTurn.ok, true);
  assert.deepEqual([...LUNCH_SEATS], ["GPT", "Kimi", "Gemini", "Hesper"]);
  const facts = lunchFacts([]);
  assert.equal(facts.includes("SEAT: Bill"), false);
  assert.equal(facts.includes("SEAT: Tuzi"), false);
  assert.equal(facts.includes("FIRST: GPT"), true);
  assert.equal(facts.includes("ORDER: not fixed"), true);
  assert.equal(facts.includes("GPT-6.1 Sol"), true);
  assert.equal(facts.includes("NOT SEATED: Bill"), true);
});

test("dinner and breakfast still refuse a Hesper courier note", () => {
  for (const id of [DINNER_ID, BREAKFAST_ID]) {
    const refused = rejectGatheringLine(id, {
      speaker: "Hesper",
      line_type: "courier_note",
      carried_by: "Hesper",
      text: "no",
    });
    assert.equal(refused.ok, false);
    const kept = rejectGatheringLine(id, {
      speaker: "Puck",
      line_type: "courier_note",
      carried_by: "Puck",
      text: "yes",
    });
    assert.equal(kept.ok, true);
  }
});
