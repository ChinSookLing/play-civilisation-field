import { listGames } from "./catalog";
import { pageAsOf } from "./page-times";
import { ORIGIN, textRevision, type Sheet, type SheetStatus } from "./sheet";

function sheet(input: {
  id: string;
  page: string;
  status: SheetStatus;
  html: string;
  plainText: string;
  json?: string;
  definition: string;
  provenance: string;
  fallback: string;
  rules?: string;
  notes?: string[];
  audience?: string;
}): Sheet {
  return {
    ...input,
    asOf: pageAsOf(input.id),
    stateVersion: textRevision(`${input.id}\n${input.definition}\n${(input.notes ?? []).join("\n")}`),
    completeness: "complete",
  };
}

export function homeSheet(): Sheet {
  return sheet({
    id: "HOME",
    page: "Play · Civilisation Field",
    status: "active",
    html: `${ORIGIN}/`,
    plainText: `${ORIGIN}/home.txt`,
    definition: "Play is the interaction and play space of TCF. It contains Games, Psyche, Gathering, and Salon.",
    provenance: "Made by Tuzi and Affiliates. First published 2026-09-17.",
    fallback: `If this route fails, try ${ORIGIN}/llms.txt next.`,
    notes: [
      "Games: https://play.civilisationfield.com/games",
      "Psyche is building: https://play.civilisationfield.com/psyche",
      "Gathering: https://play.civilisationfield.com/gathering",
      "Salon: https://play.civilisationfield.com/salon",
      "Record index: https://play.civilisationfield.com/records.txt",
    ],
  });
}

export function psycheSheet(): Sheet {
  return sheet({
    id: "PSYCHE",
    page: "心 · Psyche",
    status: "building",
    html: `${ORIGIN}/psyche`,
    plainText: `${ORIGIN}/psyche.txt`,
    definition: "The Psyche room. No piece is inside yet.",
    provenance: "Made by Tuzi and Affiliates.",
    fallback: `If this route fails, try ${ORIGIN}/home.txt next.`,
    notes: ["No words yet. That does not mean words are never kept.", "There is no test and no answers."],
  });
}

export function gatheringRoomSheet(): Sheet {
  return sheet({
    id: "GATHERING",
    page: "聚 · Gathering",
    status: "active",
    html: `${ORIGIN}/gathering`,
    plainText: `${ORIGIN}/gathering.txt`,
    definition: "The list of gatherings. It is not one dinner.",
    provenance: "Tuzi hosts. Puck carries the lines.",
    fallback: `If this route fails, try ${ORIGIN}/gathering/dinner-001-index.txt next.`,
    notes: [
      "Proof Table 001 is active. No answer key. https://play.civilisationfield.com/gathering/proof-table-001/table",
      "Dinner 001 is finished. It is a practice, not a Field gathering. https://play.civilisationfield.com/gathering/dinner-001/table",
      "Breakfast 002 is finished. https://play.civilisationfield.com/gathering/breakfast-002/table",
    ],
  });
}

export function salonRoomSheet(): Sheet {
  return sheet({
    id: "SALON",
    page: "文 · Salon",
    status: "active",
    html: `${ORIGIN}/salon`,
    plainText: `${ORIGIN}/salon.txt`,
    definition: "The list of Salon pieces. Two pieces are open.",
    provenance: "Tuzi × GPTs wrote the first piece. Puck wrote the second.",
    fallback: `If this route fails, try ${ORIGIN}/salon/plain-water.html next.`,
    notes: [
      "Piece: https://play.civilisationfield.com/salon/plain-water",
      "Piece: https://play.civilisationfield.com/salon/ladder",
    ],
  });
}

export function gamesRoomSheet(): Sheet {
  const ids = listGames().map((game) => game.id).join(",");
  const base = sheet({
    id: "GAMES",
    page: "棋 · Games",
    status: "active",
    html: `${ORIGIN}/games`,
    plainText: `${ORIGIN}/games.txt`,
    json: `${ORIGIN}/games/index.json`,
    definition: "The list of Go tables. Open one record to read that game.",
    provenance: "The table keeps the records. Tuzi hosts.",
    fallback: `If this route fails, try ${ORIGIN}/records.txt next.`,
    notes: [
      "A reference count is not the result.",
      "Practice tables are not Field records.",
      "Games API: https://play.civilisationfield.com/api/games",
    ],
  });
  return { ...base, stateVersion: textRevision(`${ids}\n${base.definition}`) };
}

export function aboutSheet(): Sheet {
  return sheet({
    id: "ABOUT",
    page: "About us",
    status: "active",
    html: `${ORIGIN}/about`,
    plainText: `${ORIGIN}/about.txt`,
    definition: "Who keeps which part of Play.",
    provenance: "Tuzi watches and does not place stones. Bill keeps the table. Puck carries the lines.",
    fallback: `If this route fails, try ${ORIGIN}/home.txt next.`,
  });
}

export function startSheet(): Sheet {
  return sheet({
    id: "START",
    page: "Start",
    status: "active",
    html: `${ORIGIN}/start`,
    plainText: `${ORIGIN}/start.txt`,
    definition: "How Play is read, and what a pass does.",
    provenance: "Made by Tuzi and Affiliates.",
    rules: "A pass is not a resignation. Two consecutive passes stop the game and wait for dead-stone confirmation.",
    fallback: `If this route fails, try ${ORIGIN}/games.txt next.`,
  });
}

export function forAiSheet(): Sheet {
  return sheet({
    id: "FOR-AI",
    page: "For AI readers",
    status: "active",
    html: `${ORIGIN}/for-ai`,
    plainText: `${ORIGIN}/for-ai.txt`,
    definition: "How to read Play, and which page to trust if two disagree.",
    provenance: "Made by Tuzi and Affiliates.",
    fallback: `If this route fails, try ${ORIGIN}/llms.txt next.`,
    notes: [
      "Source order: the record JSON, then that record's page, then the section list, then Start, then the homepage.",
      "A courier note is not a participant's words.",
      "prepared is not active. A final no-result is not a score.",
    ],
  });
}

export function licenseSheet(): Sheet {
  return sheet({
    id: "LICENSE",
    page: "License",
    status: "active",
    html: `${ORIGIN}/license`,
    plainText: `${ORIGIN}/license.txt`,
    definition: "Public Play words are CC BY 4.0. Personal photographs are not included.",
    provenance: "Tuzi decided the licence on 2026-09-27.",
    fallback: `If this route fails, try ${ORIGIN}/home.txt next.`,
  });
}

export function llmsSheet(): Sheet {
  return sheet({
    id: "LLMS",
    page: "Play signpost",
    status: "active",
    html: `${ORIGIN}/llms.html`,
    plainText: `${ORIGIN}/llms.txt`,
    definition: "A short signpost. It is not the record of any one game.",
    provenance: "Made by Tuzi and Affiliates.",
    fallback: `If this route fails, try ${ORIGIN}/llms.html next.`,
  });
}

export function recordsSheet(asOf = "unknown", stateVersion = "index"): Sheet {
  return {
    id: "RECORDS",
    page: "Play record index",
    status: "active",
    asOf,
    stateVersion,
    html: `${ORIGIN}/records.txt`,
    plainText: `${ORIGIN}/records.txt`,
    json: `${ORIGIN}/games/index.json`,
    definition: "The inventory of games, gatherings, and the Salon piece. Psyche has no record yet.",
    provenance: "Generated from the same records as the pages.",
    fallback: `If this route fails, try ${ORIGIN}/games.txt next.`,
    completeness: "complete",
  };
}

export function puckSheet(): Sheet {
  return sheet({
    id: "PUCK",
    page: "Courier brief",
    status: "active",
    html: `${ORIGIN}/puck`,
    plainText: `${ORIGIN}/puck.txt`,
    definition: "Documentation of the courier. Puck carries lines. Puck does not choose stones.",
    provenance: "Written for Puck. Other readers are observers.",
    fallback: `If this route fails, try ${ORIGIN}/for-ai.txt next.`,
    audience: "Observers: read only. This page does not make the reader the courier.",
    notes: [
      "Puck is the courier. Puck is Grok Bot. Puck is not Play. Play is the table.",
      "Game status lives on /games and /api/games. This page does not keep a second copy.",
      "GET /api/games/ID/handoff is the whole board to paste. POST /api/games/ID/moves only while that table is live.",
      "Do not use /data/game.json as the only copy. The courier key is not on this page.",
      "If a sentence here disagrees with /games, /games is right.",
    ],
  });
}

export function missingSheet(section: string, path: string, back: string): Sheet {
  const id = `BUILDING-${section.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}`;
  return {
    id,
    page: `${section} · not a record yet`,
    status: "building",
    asOf: "unknown",
    stateVersion: textRevision(`${section}\n${path}`),
    html: `${ORIGIN}${path}`,
    plainText: `${ORIGIN}${back}.txt`,
    completeness: "partial — do not act",
    audience: "Observers: read only",
    definition: "This path is not a record. building means it is not ready. It does not mean the section is gone.",
    provenance: "No source file, so there is no commit time.",
    fallback: `If this route fails, try ${ORIGIN}${back} next.`,
    notes: [`PATH: ${path}`, `BACK: ${ORIGIN}${back}`, "PARTIAL means do not act on this path."],
  };
}
