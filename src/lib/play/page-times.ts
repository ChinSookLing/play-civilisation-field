import { isoKualaLumpur } from "./sheet";

// Filled by scripts/page-times.mjs from git log -1 --format=%cI.
// Each value is the newest committer instant among that page's source files.
// pageAsOf converts it to +08:00. Missing ids stay "unknown".
export const PAGE_COMMITTED_AT: Record<string, string> = {
  "HOME": "2026-10-17T06:52:05+00:00",
  "FOR-AI": "2026-10-17T06:52:05+00:00",
  "ABOUT": "2026-10-17T06:52:05+00:00",
  "START": "2026-10-17T06:52:05+00:00",
  "LICENSE": "2026-10-17T06:52:05+00:00",
  "GAMES": "2026-10-17T06:52:05+00:00",
  "PSYCHE": "2026-10-17T06:52:05+00:00",
  "GATHERING": "2026-10-17T06:52:05+00:00",
  "PROOF-TABLE-008": "2026-10-18T10:42:11+00:00",
  "PROOF-TABLE-RULES": "2026-10-17T06:28:16+00:00",
  "PROOF-TABLE-RULES-V0.5.1": "2026-10-17T06:28:16+00:00",
  "PROOF-TABLE-RULES-V0.5": "2026-10-17T06:28:16+00:00",
  "PROOF-TABLE-RULES-V0.3": "2026-10-17T06:28:16+00:00",
  "SALON": "2026-10-17T06:52:05+00:00",
  "ladder": "2026-10-17T06:28:16+00:00",
  "plain-water": "2026-10-17T06:28:16+00:00",
  "SALON-JEV-001": "2026-10-17T06:28:16+00:00",
  "SALON-007": "2026-10-17T06:28:16+00:00",
  "SALON-006": "2026-10-17T06:28:16+00:00",
  "SALON-005": "2026-10-17T06:28:16+00:00",
  "SALON-004": "2026-10-17T06:28:16+00:00",
  "PUCK": "2026-10-17T06:52:05+00:00",
  "LLMS": "2026-10-17T06:52:05+00:00",
  "NOTES": "2026-10-17T06:28:16+00:00",
};

export function pageAsOf(id: string): string {
  const raw = PAGE_COMMITTED_AT[id];
  if (!raw) return "unknown";
  return isoKualaLumpur(raw);
}
