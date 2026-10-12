import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  LEDGER_NONE_ON_TABLE,
  WALL_PART_BUDGET,
  chooseWhenOpen,
  ledgerBody,
  ledgerVersionNote,
  openTableSheetBits,
  wallCatalog,
  wallLatest,
  wallPartText,
  wallParts,
  wallRoundNote,
  type WallBlock,
} from "./proof-wall.ts";
import { statusLine, type Sheet } from "./sheet.ts";

function line(n: number, round: number | null, text: string): WallBlock {
  return {
    line: {
      n,
      at: "2026-10-11T02:00:00.000Z",
      line_type: "courier_note",
      speaker: "Hesper",
      round,
    },
    text,
  };
}

function sheetFrom(bits: ReturnType<typeof openTableSheetBits>, definition: string): Sheet {
  return {
    id: "PROOF-TABLE-TEST",
    page: "test",
    status: bits.status,
    asOf: "2026-10-12T10:00:00+08:00",
    stateVersion: "abcd1234",
    html: "https://play.civilisationfield.com/gathering/proof-table-006/table",
    plainText: "https://play.civilisationfield.com/gathering/proof-table-006/table.txt",
    completeness: bits.completeness,
    completenessInStatus: bits.completenessInStatus,
    audience: "seats",
    definition,
    provenance: "test",
    fallback: "fallback",
  };
}

test("open table STATUS does not say COMPLETE; a closed table still says prepared", () => {
  const open = statusLine(
    sheetFrom(openTableSheetBits(true), "The opening line is posted and the table is active."),
  );
  assert.equal(open.includes("COMPLETE"), false);
  assert.equal(open.includes("PARTIAL"), false);
  assert.match(open, /^STATUS: active · AS_OF: 2026-10-12T10:00:00\+08:00$/);
  const closed = statusLine(
    sheetFrom(openTableSheetBits(false), "Prepared until the opening line is posted."),
  );
  assert.match(closed, /^STATUS: prepared · PARTIAL · AS_OF: /);
  assert.equal(
    chooseWhenOpen(true, "active sentence", "Prepared until the opening line is posted.").includes(
      "Prepared until",
    ),
    false,
  );
  assert.match(
    chooseWhenOpen(false, "active sentence", "Prepared until the opening line is posted."),
    /Prepared until/,
  );
});

test("empty ledger says none on this table", () => {
  assert.equal(LEDGER_NONE_ON_TABLE, "none on this table");
  assert.equal(ledgerVersionNote(undefined), "LEDGER_VERSION: none on this table");
  assert.equal(ledgerBody(undefined), "LEDGER: none on this table");
  assert.equal(ledgerVersionNote("v3"), "LEDGER_VERSION: v3");
  assert.equal(ledgerBody("LEDGER v3\nkept"), "LEDGER v3\nkept");
  assert.equal(ledgerBody(undefined).includes("none yet"), false);
});

test("parts keep whole lines, rejoin to the wall, and the catalog has no body", () => {
  const secret = "SECRET-BODY-do-not-index";
  const big = "x".repeat(60_000);
  const blocks = [
    line(1, null, `${big}\n${secret}-1`),
    line(2, 4, `${big}\n${secret}-2`),
    line(3, 4, `short ${secret}-3`),
    line(4, 6, `tail ${secret}-4`),
  ];
  const parts = wallParts("proof-table-006", blocks);
  assert.ok(parts.length >= 2);
  for (const part of parts)
    assert.ok(
      part.chars <= WALL_PART_BUDGET ||
        parts.filter((item) => item.body === part.body).length === 1,
    );
  const rejoined = parts.map((part) => part.body).join("\n");
  assert.equal(rejoined, blocks.map((block) => block.text).join("\n"));
  for (const block of blocks) {
    const owners = parts.filter((part) => part.body.includes(block.text));
    assert.equal(owners.length, 1);
  }
  const catalog = JSON.stringify(wallCatalog(parts));
  assert.equal(catalog.includes(secret), false);
  assert.equal(catalog.includes("body"), false);
  const latest = wallLatest(blocks.map((block) => block.line));
  assert.equal(latest.includes(secret), false);
  assert.match(latest, /LINE 001 · .+ · courier_note · Hesper · round none/);
  assert.match(latest, /LINE 004 · .+ · round 6/);
  const rounds = wallRoundNote(blocks.map((block) => block.line));
  assert.match(rounds, /ROUND 4: 2 lines \(002, 003\)/);
  assert.match(rounds, /ROUND 6: 1 lines \(004\)/);
  assert.match(rounds, /ROUND_FIELD_EMPTY: 1 lines have no round number/);
  assert.equal(rounds.includes(secret), false);
  assert.equal(
    parts[0]!.url,
    "https://play.civilisationfield.com/gathering/proof-table-006-part/01.txt",
  );
});

test("one line longer than the budget stays one part", () => {
  const text = "Y".repeat(WALL_PART_BUDGET + 50);
  const parts = wallParts("proof-table-007", [line(9, null, text)]);
  assert.equal(parts.length, 1);
  assert.equal(parts[0]!.body, text);
  assert.equal(parts[0]!.from, "LINE 009");
  assert.equal(parts[0]!.to, "LINE 009");
  const wrapped = wallPartText({
    tableId: "PROOF-TABLE-007",
    title: "Together · Proof Table 007",
    part: parts[0]!,
    total: 1,
    asOf: "2026-10-12T10:00:00+08:00",
    opened: true,
    audience: "seats",
    provenance: "same record",
    tableUrl: "https://play.civilisationfield.com/gathering/proof-table-007/table",
    tableTxt: "https://play.civilisationfield.com/gathering/proof-table-007/table.txt",
    partsTxt: "https://play.civilisationfield.com/gathering/proof-table-007/parts.txt",
  });
  assert.match(wrapped, /STATUS: active · AS_OF: 2026-10-12T10:00:00\+08:00/);
  assert.equal(/STATUS:[^\n]*COMPLETE/.test(wrapped), false);
  const record = wrapped.split("BEGIN RECORD\n")[1]?.split("\nEND RECORD")[0];
  assert.equal(record, text);
});

test("latest keeps twenty catalog lines and invents no round", () => {
  const lines = Array.from({ length: 25 }, (_, index) => line(index + 1, null, `t${index}`).line);
  const latest = wallLatest(lines);
  assert.equal(latest.split("\n").length, 20);
  assert.equal(latest.includes("LINE 001"), false);
  assert.match(latest, /LINE 006 /);
  assert.match(latest, /LINE 025 /);
  assert.equal(latest.includes("ROUND 1:"), false);
});

test("PT006 page source keeps the wall format and the new defaults", () => {
  const table = readFileSync(new URL("./proof-table-006.ts", import.meta.url), "utf8");
  const page = readFileSync(
    new URL("../../routes/gathering/proof-table-006/table.tsx", import.meta.url),
    "utf8",
  );
  assert.match(table, /lines\.map\(\(line\) => proofLineBlock\(line, lines\)\)\.join\("\\n"\)/);
  assert.equal(table.includes("none yet"), false);
  assert.match(
    table,
    /lineTypes: \["host_note", "turn", "courier_note", "rerun_record", "read_record"\]/,
  );
  assert.match(table, /couriers: \["Puck", "Hesper"\]/);
  assert.equal(table.includes("chair_note"), false);
  assert.match(table, /PROOF_006_DEFINITION_OPEN =/);
  const openDef =
    table.split("PROOF_006_DEFINITION_OPEN =")[1]?.split("PROOF_006_DEFINITION_PREPARED")[0] ?? "";
  assert.equal(openDef.includes("Prepared until"), false);
  assert.match(table, /Prepared until the opening line is posted/);
  assert.equal(page.includes("proof006Record"), false);
  assert.equal(page.includes("Prepared until"), false);
  assert.match(page, /parts\.txt/);
});
