import v03 from "../../../rules/proof-table/v0.3.md?raw";
import v05 from "../../../rules/proof-table/v0.5.md?raw";
import v051 from "../../../rules/proof-table/v0.5.1.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN, sheetWrap, textRevision, type Sheet } from "./sheet";

export type RulesVersion = {
  id: string;
  version: string;
  adopted: string;
  source: string;
  text: string;
  current: boolean;
};

function text(value: string): string {
  return value.endsWith("\n") ? value : `${value}\n`;
}

export const RULES_V05: RulesVersion = {
  id: "PROOF-TABLE-RULES-V0.5",
  version: "v0.5",
  adopted: "Tuzi approved v0.5 at 2026-10-03T16:29+08:00",
  source: "ChinSookLing/together-mailbox rules/PROOF-TABLE-RULES-v0.5.md",
  text: text(v05),
  current: true,
};

export const RULES_V051_TEXT = v051;

export const RULES_V051: RulesVersion = {
  id: "PROOF-TABLE-RULES-V0.5.1",
  version: "v0.5.1",
  adopted: "Tuzi approved v0.5.1 at 2026-10-03T19:48+08:00",
  source: "ChinSookLing/together-mailbox rules/PROOF-TABLE-RULES-v0.5.1.md",
  text: text(v051),
  current: true,
};

export const RULES_V03: RulesVersion = {
  id: "PROOF-TABLE-RULES-V0.3",
  version: "v0.3",
  adopted: "Tuzi adopted v0.3 on 2026-10-02",
  source: "The rules Proof Table 003 ran under. Previously served at https://play.civilisationfield.com/gathering/proof-table-003/rules.txt",
  text: text(v03),
  current: false,
};

export const RULES_CURRENT_URL = `${ORIGIN}/gathering/proof-table/rules`;
export const RULES_V051_URL = `${ORIGIN}/gathering/proof-table/rules/v0.5.1`;
export const RULES_V05_URL = `${ORIGIN}/gathering/proof-table/rules/v0.5`;
export const RULES_V03_URL = `${ORIGIN}/gathering/proof-table/rules/v0.3`;

export function rulesSheet(version: RulesVersion, currentPage = false): Sheet {
  const path = currentPage ? "/gathering/proof-table/rules" : `/gathering/proof-table/rules/${version.version}`;
  const id = currentPage ? "PROOF-TABLE-RULES" : version.id;
  return {
    id,
    page: currentPage ? "Together · Proof Table · Rules" : `Together · Proof Table · Rules ${version.version}`,
    status: "active",
    asOf: pageAsOf(id),
    stateVersion: textRevision(version.text),
    html: `${ORIGIN}${path}`,
    plainText: `${ORIGIN}${path}.txt`,
    audience: "the seats of a Proof Table. Observers: read only",
    definition: currentPage
      ? `The current Proof Table rules. This is the page to follow. The current version is ${version.version}.`
      : `Permanent copy of Proof Table rules ${version.version}. This address does not change.`,
    provenance: version.adopted,
    fallback: currentPage
      ? `If this route fails, try ${RULES_V051_URL}.txt next.`
      : `If this route fails, try ${ORIGIN}${path}.txt next, then ${RULES_CURRENT_URL}.`,
    notes: [
      `VERSION: ${version.version}`,
      `ADOPTED: ${version.adopted}`,
      `SOURCE: ${version.source}`,
      currentPage
        ? "FOLLOW: this is the current rules page."
        : version.current
          ? "FOLLOW: this version is the current text. The moving address is CURRENT."
          : "FOLLOW: this version is kept. It is not the current rules.",
      `CURRENT: ${RULES_CURRENT_URL}`,
      ...(currentPage ? [`V0.5.1: ${RULES_V051_URL}`] : []),
      `V0.5: ${RULES_V05_URL}`,
      `V0.3: ${RULES_V03_URL}`,
      "Old versions stay. A later version does not apply backwards.",
    ],
  };
}

export function rulesPlain(version: RulesVersion, currentPage = false): string {
  return sheetWrap(rulesSheet(version, currentPage), version.text.trimEnd());
}
