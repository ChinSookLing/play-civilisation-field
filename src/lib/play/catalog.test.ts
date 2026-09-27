import assert from "node:assert/strict";
import test from "node:test";
import { bannerLabel, expectedSessionId, formatJevPlayground, getGame, resolvedResult, submitMove } from "./catalog.ts";
import { setOverlay } from "./games.ts";

function reset() {
  setOverlay("GO-TEST-001", {
    moves: [],
    status: "live",
    result: null,
    notes: [],
    sessions: {},
    dispatch: "test",
    updatedAt: "2026-09-17T14:00:00+08:00",
  });
}

test("wrong session cannot drop a stone", () => {
  reset();
  const rejected = submitMove("GO-TEST-001", {
    raw: "E5",
    session_id: "play-GO-TEST-001-claude",
    expected_move_number: 1,
  });
  assert.equal(rejected.ok, false);
  if (!rejected.ok) assert.match(rejected.error, /wrong seat/);
  assert.equal(getGame("GO-TEST-001")?.moves.length, 0);
});

test("duplicate POST with the same expected move does not double-play", () => {
  reset();
  const session = expectedSessionId(getGame("GO-TEST-001")!, "gpt");
  const first = submitMove("GO-TEST-001", {
    raw: "E5\ncenter",
    session_id: session,
    expected_move_number: 1,
  });
  assert.equal(first.ok, true);
  const second = submitMove("GO-TEST-001", {
    raw: "E5\ncenter",
    session_id: session,
    expected_move_number: 1,
  });
  assert.equal(second.ok, true);
  if (second.ok) assert.equal(second.duplicate, true);
  assert.equal(getGame("GO-TEST-001")?.moves.length, 1);
});

test("stale expected_move_number is state changed", () => {
  reset();
  const black = expectedSessionId(getGame("GO-TEST-001")!, "gpt");
  assert.equal(
    submitMove("GO-TEST-001", { raw: "E5", session_id: black, expected_move_number: 1 }).ok,
    true,
  );
  const white = expectedSessionId(getGame("GO-TEST-001")!, "claude");
  const stale = submitMove("GO-TEST-001", {
    raw: "C4",
    session_id: white,
    expected_move_number: 1,
  });
  assert.equal(stale.ok, false);
  if (!stale.ok) assert.equal(stale.error, "state changed");
  assert.equal(getGame("GO-TEST-001")?.moves.length, 1);
});

test("GO-TEST-001 drops the false Opus pass and records Sol resign", () => {
  setOverlay("GO-TEST-001", {
    status: "finished",
    result: "Both passed",
    notes: [],
    sessions: {},
    dispatch: "Both passed. The table is quiet.",
    updatedAt: "2026-09-17T13:16:12+08:00",
    moves: [
      {
        n: 70,
        color: "white",
        player: "claude",
        coord: "E7",
        at: "2026-09-17T13:15:00+08:00",
        raw: "E7",
      },
      {
        n: 71,
        color: "black",
        player: "gpt",
        coord: "pass",
        at: "2026-09-17T13:16:00+08:00",
        raw: "PASS\n— Sol",
        talk: "PASS\n— Sol",
      },
      {
        n: 72,
        color: "white",
        player: "claude",
        coord: "pass",
        at: "2026-09-17T13:16:12+08:00",
        raw: "PASS\n— Sol",
        talk: "PASS\n— Sol",
      },
    ],
  });
  const game = getGame("GO-TEST-001")!;
  assert.equal(game.moves.at(-1)?.n, 71);
  assert.equal(game.moves.at(-1)?.coord, "resign");
  assert.equal(game.moves.at(-1)?.player, "gpt");
  assert.equal(game.moves.at(-1)?.source, "courier");
  assert.equal(game.moves.at(-1)?.coord_source, "courier");
  assert.equal(game.moves.some((move) => move.n === 72), false);
  assert.equal(game.result, "Sol resigns. White wins.");
  assert.equal(resolvedResult(game), "White wins");
});

test("banner shows company and seat", () => {
  const game = getGame("GO-TEST-001")!;
  assert.equal(bannerLabel(game, "gpt"), "GPT (Sol)");
  assert.equal(bannerLabel(game, "claude"), "Claude (Opus)");
  const field = getGame("GO-001")!;
  assert.equal(bannerLabel(field, "kimi"), "Kimi (K3 Max)");
  assert.equal(bannerLabel(field, "claude"), "Claude (Opus 5 Max)");
});

test("protocol rejects wrong seat, stale, missing number, and buried coords", () => {
  reset();
  const black = expectedSessionId(getGame("GO-TEST-001")!, "gpt");
  const wrong = submitMove("GO-TEST-001", {
    raw: "E5",
    session_id: "play-GO-TEST-001-claude",
    expected_move_number: 1,
  });
  assert.equal(wrong.ok, false);
  if (!wrong.ok) assert.match(wrong.error, /wrong seat/);
  const missing = submitMove("GO-TEST-001", { raw: "E5", session_id: black });
  assert.equal(missing.ok, false);
  if (!missing.ok) assert.match(missing.error, /expected_move_number/);
  const first = submitMove("GO-TEST-001", {
    raw: "E5",
    session_id: black,
    expected_move_number: 1,
  });
  assert.equal(first.ok, true);
  const stale = submitMove("GO-TEST-001", {
    raw: "C4",
    session_id: expectedSessionId(getGame("GO-TEST-001")!, "claude"),
    expected_move_number: 1,
  });
  assert.equal(stale.ok, false);
  if (!stale.ok) assert.equal(stale.error, "state changed");
  const buried = submitMove("GO-TEST-001", {
    raw: "NO MOVE\nI looked at D3 and C4 but cannot verify.",
    session_id: expectedSessionId(getGame("GO-TEST-001")!, "claude"),
    expected_move_number: 2,
  });
  assert.equal(buried.ok, true);
  assert.equal(getGame("GO-TEST-001")?.moves.length, 1);
  assert.equal(getGame("GO-TEST-001")?.moves[0]?.coord, "E5");
});

test("Jev playground JSON stays under TypeSafe 2k paste limit", () => {
  const payload = formatJevPlayground(getGame("GO-002")!, "2026-09-21T18:00:00+08:00");
  const packed = JSON.stringify(payload);
  assert.equal(payload.playground.questions.next_move.criteria.E5, null);
  assert.equal(payload.playground.questions.next_move.criteria.pass, null);
  assert.equal("NO MOVE" in payload.playground.questions.next_move.criteria, false);
  assert.ok(payload.playground.state.includes("END JEV"));
  assert.ok(!packed.includes("REQUIRED RESPONSE"));
  assert.ok(packed.length < 2000, `jev json ${packed.length}`);
});
