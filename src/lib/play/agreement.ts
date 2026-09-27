import { formatAiBlock, formatCourierHandoff, getGame, listGames, submitMove, toPublicState, expectedSessionId } from "./catalog";
import { setOverlay } from "./games";
import { formatAsciiBoard, replayMoves } from "./go";

export function agreementProblems(): string[] {
  const problems: string[] = [];
  for (const game of listGames()) {
    const state = toPublicState(game);
    const ai = formatAiBlock(game);
    const handoff = formatCourierHandoff(game, state.as_of);
    const aiStatus = ai.match(/^status: (.+)$/m)?.[1];
    const handStatus = handoff.match(/^STATUS: (\S+)/m)?.[1];
    if (aiStatus !== state.status) problems.push(`${game.id}: text status ${aiStatus} != json ${state.status}`);
    if (handStatus !== state.status) problems.push(`${game.id}: handoff status ${handStatus} != json ${state.status}`);
    const official = state.result ?? "none";
    const handResult = handoff.match(/^RESULT: (.+)$/m)?.[1];
    if (handResult !== official) problems.push(`${game.id}: handoff result ${handResult} != ${official}`);
    if (state.result && ai.match(/^result: (.+)$/m)?.[1] !== state.result) {
      problems.push(`${game.id}: text result differs`);
    }
    const board = state.board.trim();
    if (!ai.includes(board)) problems.push(`${game.id}: text board differs`);
    if (!handoff.includes(board)) problems.push(`${game.id}: handoff board differs`);
    const replay = formatAsciiBoard(replayMoves(game.moves, game.size).board).trim();
    if (replay !== board) problems.push(`${game.id}: replay board differs`);
    if (state.record.status.value !== state.status) problems.push(`${game.id}: record status differs`);
    if (state.record.result !== state.result) problems.push(`${game.id}: record result differs`);
  }
  return problems;
}

export function move71EvidenceProblems(): string[] {
  setOverlay("GO-TEST-001", {
    status: "finished",
    result: "Sol resigns. White wins.",
    moves: [
      {
        n: 71,
        at: "2026-09-17T13:16:12+08:00",
        player: "gpt",
        color: "black",
        coord: "resign",
        raw: "PASS\n— Sol",
        source: "courier",
        coord_source: "courier",
      },
    ],
  });
  const game = getGame("GO-TEST-001");
  if (!game) return ["GO-TEST-001 missing"];
  const state = toPublicState(game);
  const move = state.moves.find((item) => item.n === 71);
  const problems: string[] = [];
  if (game.result !== "Sol resigns. White wins.") problems.push("move 71 check changed the result");
  if (!move) return ["move 71 missing"];
  if (move.raw_response !== "PASS\n— Sol") problems.push("move 71 raw was rewritten");
  if (move.coordinate !== "resign") problems.push("move 71 coordinate changed");
  if (move.coordinate_evidence !== "human-stated") problems.push(`move 71 evidence is ${move.coordinate_evidence}`);
  if (move.stated_by !== "Tuzi") problems.push("move 71 stated_by");
  if (move.evidence_source !== "the 2026-09-17 correction") problems.push("move 71 evidence source");
  if (!move.coordinate_note?.includes("Raw reply reads PASS")) problems.push("move 71 note");
  return problems;
}

export function practiceRejectionProblems(): string[] {
  const game = getGame("PRACTICE-001");
  if (!game) return ["PRACTICE-001 missing"];
  const before = game.moves.length;
  const session = expectedSessionId(game, "copilot");
  const stale = submitMove("PRACTICE-001", {
    raw: "E5",
    session_id: session,
    expected_move_number: 0,
  });
  const illegal = submitMove("PRACTICE-001", {
    raw: "I5",
    session_id: session,
    expected_move_number: 1,
  });
  const after = getGame("PRACTICE-001")?.moves.length;
  const problems: string[] = [];
  if (stale.ok || stale.error !== "state changed") problems.push(`stale submit was not rejected: ${stale.ok ? "accepted" : stale.error}`);
  if (illegal.ok) problems.push("invalid submit was accepted");
  if (after !== before) problems.push("a rejected submit recorded a move");
  const staleReceipt = `RECEIPT PRACTICE-001 · REJECTED · reason: ${stale.ok ? "" : stale.error} · current state version 1 · nothing was recorded`;
  const illegalReceipt = `RECEIPT PRACTICE-001 · REJECTED · reason: ${illegal.ok ? "" : illegal.error} · nothing was recorded`;
  if (!staleReceipt.includes("REJECTED") || !staleReceipt.includes("nothing was recorded")) problems.push("stale receipt");
  if (!illegalReceipt.includes("REJECTED") || !illegalReceipt.includes("nothing was recorded")) problems.push("invalid receipt");
  return problems;
}

export function practiceCapProblems(): string[] {
  const coords = [
    "D4", "E4", "D5", "E5", "D6", "E6", "C4", "F4", "C5", "F5",
    "C6", "F6", "D7", "E7", "C7", "F7", "D3", "E3", "C3", "F3",
  ];
  const problems: string[] = [];
  for (let i = 0; i < coords.length; i += 1) {
    const player = i % 2 === 0 ? "copilot" : "jev";
    const game = getGame("PRACTICE-001");
    if (!game) return ["PRACTICE-001 missing"];
    const posted = submitMove("PRACTICE-001", {
      raw: coords[i],
      session_id: expectedSessionId(game, player),
      expected_move_number: i + 1,
    });
    if (!posted.ok) problems.push(`move ${i + 1} ${posted.error}`);
  }
  const done = getGame("PRACTICE-001");
  if (!done) return ["PRACTICE-001 missing"];
  if (done.moves.length !== 20) problems.push(`practice length ${done.moves.length}`);
  if (done.status !== "finished") problems.push(`practice status ${done.status}`);
  if (done.result !== "no result (practice)") problems.push(`practice result ${done.result}`);
  const outcome = toPublicState(done);
  if (outcome.end_reason !== "practice cap") problems.push(`practice end ${outcome.end_reason}`);
  if (outcome.result !== "no result (practice)") problems.push("practice public result");
  const extra = submitMove("PRACTICE-001", {
    raw: "G5",
    session_id: expectedSessionId(done, "copilot"),
    expected_move_number: 21,
  });
  if (extra.ok) problems.push("move 21 was accepted");
  if (getGame("PRACTICE-001")?.moves.length !== 20) problems.push("move 21 changed the board");
  return problems;
}
