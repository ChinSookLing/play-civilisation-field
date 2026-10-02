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
    asOf: "unknown",
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
    plainText: `${ORIGIN}/llms.txt`,
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
    plainText: "none",
    definition: "The Psyche room. No piece is inside yet.",
    provenance: "Made by Tuzi and Affiliates.",
    fallback: `If this route fails, try ${ORIGIN}/ next.`,
    notes: ["No words yet. That does not mean words are never kept.", "There is no test and no answers."],
  });
}

export function gatheringRoomSheet(): Sheet {
  return sheet({
    id: "GATHERING",
    page: "聚 · Gathering",
    status: "active",
    html: `${ORIGIN}/gathering`,
    plainText: `${ORIGIN}/gathering/breakfast-002.txt`,
    definition: "The list of gatherings. It is not one dinner.",
    provenance: "Tuzi hosts. Puck carries the lines.",
    fallback: `If this route fails, try ${ORIGIN}/gathering/dinner-001-index.txt next.`,
    notes: [
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
    plainText: `${ORIGIN}/salon/ladder.txt`,
    definition: "The list of Salon pieces. One piece is open.",
    provenance: "Tuzi × GPTs wrote the first piece.",
    fallback: `If this route fails, try ${ORIGIN}/salon/ladder.html next.`,
    notes: ["Piece: https://play.civilisationfield.com/salon/ladder"],
  });
}

export function gamesRoomSheet(): Sheet {
  return sheet({
    id: "GAMES",
    page: "棋 · Games",
    status: "active",
    html: `${ORIGIN}/games`,
    plainText: `${ORIGIN}/records.txt`,
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
}

export function aboutSheet(): Sheet {
  return sheet({
    id: "ABOUT",
    page: "About us",
    status: "active",
    html: `${ORIGIN}/about`,
    plainText: "none",
    definition: "Who keeps which part of Play.",
    provenance: "Tuzi watches and does not place stones. Bill keeps the table. Puck carries the lines.",
    fallback: `If this route fails, try ${ORIGIN}/ next.`,
  });
}

export function startSheet(): Sheet {
  return sheet({
    id: "START",
    page: "Start",
    status: "active",
    html: `${ORIGIN}/start`,
    plainText: "none",
    definition: "How Play is read, and what a pass does.",
    provenance: "Made by Tuzi and Affiliates.",
    rules: "A pass is not a resignation. Two consecutive passes stop the game and wait for dead-stone confirmation.",
    fallback: `If this route fails, try ${ORIGIN}/games next.`,
  });
}

export function forAiSheet(): Sheet {
  return sheet({
    id: "FOR-AI",
    page: "For AI readers",
    status: "active",
    html: `${ORIGIN}/for-ai`,
    plainText: `${ORIGIN}/llms.txt`,
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
    plainText: "none",
    definition: "Public Play words are CC BY 4.0. Personal photographs are not included.",
    provenance: "Tuzi decided the licence on 2026-09-27.",
    fallback: `If this route fails, try ${ORIGIN}/ next.`,
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
    fallback: `If this route fails, try ${ORIGIN}/games next.`,
    completeness: "complete",
  };
}
