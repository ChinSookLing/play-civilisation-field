import { isoKualaLumpur } from "./sheet";

// Filled by scripts/page-times.mjs from `git log -1` of each page source.
// Values are the committer instant. pageAsOf converts them to +08:00.
export const PAGE_COMMITTED_AT: Record<string, string> = {};

export function pageAsOf(id: string): string {
  const raw = PAGE_COMMITTED_AT[id];
  if (!raw) return "unknown";
  return isoKualaLumpur(raw);
}
