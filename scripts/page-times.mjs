import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const repo = process.argv[2] ?? process.cwd();
const shared = ["src/lib/play/sheet.ts"];

const files = {
  HOME: ["src/routes/index.tsx", "src/lib/play/page-sheets.ts", ...shared],
  "FOR-AI": ["src/routes/for-ai.tsx", "src/lib/play/page-sheets.ts", ...shared],
  ABOUT: ["src/routes/about.tsx", "src/lib/play/page-sheets.ts", ...shared],
  START: ["src/routes/start.tsx", "src/lib/play/page-sheets.ts", ...shared],
  LICENSE: ["src/routes/license.tsx", "src/lib/play/page-sheets.ts", ...shared],
  GAMES: ["src/routes/games.tsx", "src/lib/play/page-sheets.ts", "src/lib/play/catalog.ts", ...shared],
  PSYCHE: ["src/routes/psyche.tsx", "src/lib/play/page-sheets.ts", ...shared],
  GATHERING: ["src/routes/gathering/index.tsx", "src/lib/play/page-sheets.ts", ...shared],
  SALON: ["src/routes/salon/index.tsx", "src/lib/play/page-sheets.ts", ...shared],
  ladder: ["src/lib/play/salon-piece.ts", ...shared],
  "plain-water": ["src/lib/play/plain-water.ts", "src/routes/salon/plain-water.tsx", ...shared],
  PUCK: ["src/routes/puck.tsx", "src/lib/play/page-sheets.ts", ...shared],
  LLMS: ["src/lib/play/llms-guide.ts", "src/lib/play/page-sheets.ts", ...shared],
  NOTES: ["src/lib/play/field-notes.ts", ...shared],
};

function latest(paths) {
  let best = "";
  let bestMs = -1;
  for (const file of paths) {
    const raw = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
      cwd: repo,
      encoding: "utf8",
    }).trim();
    if (!raw) {
      console.error(`no commit time for ${file}`);
      process.exit(1);
    }
    const ms = Date.parse(raw);
    if (ms > bestMs) {
      bestMs = ms;
      best = raw;
    }
  }
  return best;
}

const lines = Object.entries(files).map(([id, paths]) => `  ${JSON.stringify(id)}: ${JSON.stringify(latest(paths))},`);

const out = `import { isoKualaLumpur } from "./sheet";

// Filled by scripts/page-times.mjs from git log -1 --format=%cI.
// Each value is the newest committer instant among that page's source files.
// pageAsOf converts it to +08:00. Missing ids stay "unknown".
export const PAGE_COMMITTED_AT: Record<string, string> = {
${lines.join("\n")}
};

export function pageAsOf(id: string): string {
  const raw = PAGE_COMMITTED_AT[id];
  if (!raw) return "unknown";
  return isoKualaLumpur(raw);
}
`;

const target = join(repo, "src/lib/play/page-times.ts");
writeFileSync(target, out);
console.log(`wrote ${target}`);
