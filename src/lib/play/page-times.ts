import { isoKualaLumpur } from "./sheet";

// Filled by scripts/page-times.mjs from git log -1 --format=%cI.
// Each value is the newest committer instant among that page's source files.
// pageAsOf converts it to +08:00. Missing ids stay "unknown".
export const PAGE_COMMITTED_AT: Record<string, string> = {
  "HOME": "2026-10-02T02:57:54+00:00",
  "FOR-AI": "2026-10-02T02:57:54+00:00",
  "ABOUT": "2026-10-02T02:57:54+00:00",
  "START": "2026-10-02T02:57:54+00:00",
  "LICENSE": "2026-10-02T02:57:54+00:00",
  "GAMES": "2026-10-02T02:57:54+00:00",
  "PSYCHE": "2026-10-02T02:57:54+00:00",
  "GATHERING": "2026-10-02T15:35:49+00:00",
  "SALON": "2026-10-03T03:50:12+00:00",
  "ladder": "2026-10-02T02:57:54+00:00",
  "PUCK": "2026-10-02T02:57:54+00:00",
  "LLMS": "2026-10-03T03:50:12+00:00",
  "plain-water": "2026-10-02T03:49:41+00:00",
  "NOTES": "2026-10-02T02:57:54+00:00",
  "PROOF-TABLE-003-RULES": "2026-10-02T15:23:45+00:00",
  "PROOF-TABLE-003-TASK": "2026-10-02T15:23:45+00:00",
  "SALON-JEV-001": "2026-10-03T03:50:12+00:00",
};

export function pageAsOf(id: string): string {
  const raw = PAGE_COMMITTED_AT[id];
  if (!raw) return "unknown";
  return isoKualaLumpur(raw);
}
