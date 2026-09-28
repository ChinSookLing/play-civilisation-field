import assert from "node:assert/strict";
import test from "node:test";
import { emptyBoard, legalActions, parseContestantReply } from "./go.ts";

test("leading blank lines are not the first line", () => {
  const parsed = parseContestantReply("\n\nC5\n\n【手谈】");
  assert.equal(parsed.kind, "move");
  if (parsed.kind === "move") assert.equal(parsed.coord, "C5");
});

test("first line is the move; later coords are comment", () => {
  const parsed = parseContestantReply("E5\nI considered D3 but played center.");
  assert.equal(parsed.kind, "move");
  if (parsed.kind === "move") {
    assert.equal(parsed.coord, "E5");
    assert.match(parsed.comment, /D3/);
  }
});

test("does not guess a coordinate buried in prose", () => {
  const parsed = parseContestantReply("I almost played D3, then C4 looked safer.");
  assert.equal(parsed.kind, "unparsed");
});

test("NO MOVE does not become pass", () => {
  const parsed = parseContestantReply("NO MOVE\nreason: incomplete board state");
  assert.equal(parsed.kind, "no_move");
  if (parsed.kind === "no_move") assert.match(parsed.reason, /incomplete/);
});

test("pass and resign are first-line only", () => {
  assert.equal(parseContestantReply("pass\nstill fighting").kind, "pass");
  assert.equal(parseContestantReply("resign").kind, "resign");
  assert.equal(parseContestantReply("I will pass now").kind, "unparsed");
});

test("strips markdown and still reads the coordinate", () => {
  const parsed = parseContestantReply("**E5**\ncomment");
  assert.equal(parsed.kind, "move");
  if (parsed.kind === "move") assert.equal(parsed.coord, "E5");
});

test("Move: G3 is not a move", () => {
  assert.equal(parseContestantReply("Move: G3").kind, "unparsed");
});

test("13x13 reads K10 and rejects it on a 9x9 reply", () => {
  const wide = parseContestantReply("K10\nedge", 13);
  assert.equal(wide.kind, "move");
  if (wide.kind === "move") assert.equal(wide.coord, "K10");
  assert.equal(parseContestantReply("K10", 9).kind, "unparsed");
  assert.equal(parseContestantReply("A10", 9).kind, "unparsed");
  const actions = legalActions(emptyBoard(13), "black");
  assert.equal(actions.length, 171);
  assert.equal(actions.includes("N13"), true);
  assert.equal(actions.includes("I7"), false);
});
