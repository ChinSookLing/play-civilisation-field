import assert from "node:assert/strict";
import test from "node:test";
import { BREAKFAST_ID } from "./breakfast.ts";
import { DINNER_ID } from "./dinner.ts";
import { rejectGatheringLine } from "./gathering-line.ts";
import { LUNCH_ID, LUNCH_SEATS, lunchFacts } from "./lunch.ts";

test("lunch seats GPT, Kimi, Gemini, Bill, and Puck, and Puck carries", () => {
  const kept = rejectGatheringLine(LUNCH_ID, {
    speaker: "GPT",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "hello",
    relay: null,
  });
  assert.equal(kept.ok, true);
  const bill = rejectGatheringLine(LUNCH_ID, {
    speaker: "Bill",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "seated",
  });
  assert.equal(bill.ok, true);
  const note = rejectGatheringLine(LUNCH_ID, {
    speaker: "Puck",
    line_type: "courier_note",
    carried_by: "Puck",
    text: "GPT speaks next",
  });
  assert.equal(note.ok, true);
  const host = rejectGatheringLine(LUNCH_ID, {
    speaker: "Puck",
    line_type: "host_note",
    carried_by: "Puck",
    text: "Kimi next",
  });
  assert.equal(host.ok, true);
  const tuziHost = rejectGatheringLine(LUNCH_ID, {
    speaker: "Tuzi",
    line_type: "host_note",
    carried_by: "Puck",
    text: "no",
  });
  assert.equal(tuziHost.ok, false);
  const hesperTurn = rejectGatheringLine(LUNCH_ID, {
    speaker: "Hesper",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "no",
  });
  assert.equal(hesperTurn.ok, false);
  const hesperCarries = rejectGatheringLine(LUNCH_ID, {
    speaker: "GPT",
    line_type: "participant_message",
    carried_by: "Hesper",
    text: "no",
  });
  assert.equal(hesperCarries.ok, false);
  const puckTurn = rejectGatheringLine(LUNCH_ID, {
    speaker: "Puck",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "a short piece",
  });
  assert.equal(puckTurn.ok, true);
  const hermes = rejectGatheringLine(LUNCH_ID, {
    speaker: "Hermes",
    line_type: "participant_message",
    carried_by: "Puck",
    text: "carried",
  });
  assert.equal(hermes.ok, true);
  const hermesNote = rejectGatheringLine(LUNCH_ID, {
    speaker: "Hermes",
    line_type: "courier_note",
    carried_by: "Puck",
    text: "no",
  });
  assert.equal(hermesNote.ok, false);
  assert.deepEqual([...LUNCH_SEATS], ["GPT", "Kimi", "Gemini", "Bill", "Hermes", "Puck"]);
  const facts = lunchFacts([]);
  assert.equal(facts.includes("SEAT: Bill"), true);
  assert.equal(facts.includes("SEAT: Puck"), true);
  assert.equal(facts.includes("SEAT: Hermes"), true);
  assert.equal(facts.includes("SEAT: Hesper"), false);
  assert.equal(facts.includes("Hesper"), false);
  assert.equal(facts.includes("handed"), false);
  assert.equal(facts.includes("hark.com"), false);
  assert.equal(facts.includes("FIRST: GPT"), true);
  assert.equal(facts.includes("How should Human be prepared for Bot Agent's Era"), true);
  assert.equal(facts.includes("light seat"), true);
  assert.equal(facts.includes("PT-007"), true);
});

test("dinner and breakfast still take a Tuzi host note and a Puck courier note", () => {
  for (const id of [DINNER_ID, BREAKFAST_ID]) {
    const host = rejectGatheringLine(id, {
      speaker: "Tuzi",
      line_type: "host_note",
      carried_by: "Puck",
      text: "yes",
    });
    assert.equal(host.ok, true);
    const puckHost = rejectGatheringLine(id, {
      speaker: "Puck",
      line_type: "host_note",
      carried_by: "Puck",
      text: "no",
    });
    assert.equal(puckHost.ok, false);
    const kept = rejectGatheringLine(id, {
      speaker: "Puck",
      line_type: "courier_note",
      carried_by: "Puck",
      text: "yes",
    });
    assert.equal(kept.ok, true);
  }
});
