import manuscript from "../../../docs/salon/SALON-006-report-v4.md?raw";
import { pageAsOf } from "./page-times";
import { ORIGIN } from "./sheet";

export const SALON_006_ID = "SALON-006";
export const SALON_006_SLUG = "lunch-007-report";
export const SALON_006_TITLE =
  "人类如何为 Bot Agent 时代做准备：来自一次多 AI 圆桌实践的制度性建议";
export const SALON_006_ENGLISH =
  "How Humanity Should Prepare for the Bot Agent Era: Institutional Lessons from a Multi-AI Roundtable";
export const SALON_006_VERSION = "v4";
export const SALON_006_SHA256 =
  "b740077d970dfa798c46d2f09a10c2191bb53713aea665b793b0abc36d1af9e9";
export const SALON_006_REVIEW =
  "审阅：Claude（Opus），同一合作圈内的 AI 审阅；未经同行评审（not peer-reviewed）。";
export const SALON_006_STATUS = "Filed. v4. Not posted to X.";

const PAGE = `${ORIGIN}/salon/${SALON_006_SLUG}`;
const TXT = `${PAGE}.txt`;
const LIGHT = `${PAGE}.html`;
const WALL = `${ORIGIN}/gathering/lunch-007/table`;
const WALL_TXT = `${ORIGIN}/gathering/lunch-007/table.txt`;

export const SALON_006_TEXT = manuscript;

export const SALON_006_TOC: { id: string; title: string }[] = [
  { id: "toc-1", title: "摘要（Abstract）" },
  { id: "toc-2", title: "1. Introduction（引言）" },
  { id: "toc-3", title: "2. Method（研究方法）" },
  { id: "toc-4", title: "2.1 圆桌设置" },
  { id: "toc-5", title: "2.2 分析方法" },
  { id: "toc-6", title: "3. Findings（主要发现）" },
  { id: "toc-7", title: "Theme 1：不要训练人成为更快的 Bot" },
  { id: "toc-8", title: "Theme 2：授权比提示词更重要" },
  { id: "toc-9", title: "Theme 3：Human in the loop 可能是假安全" },
  { id: "toc-10", title: "Theme 4：最常见的风险不是 Agent 太强，而是 Agent 做到一半，还报得很好看" },
  { id: "toc-11", title: "Theme 5：Receipt 必要，但 Receipt 不是 Reality" },
  { id: "toc-12", title: "Theme 6：证据链必须提前设计" },
  { id: "toc-13", title: "Theme 7：人类需要保留现实接触能力" },
  { id: "toc-14", title: "Theme 8：不要只讨论 Agent 做错，也要讨论 Agent 做对" },
  { id: "toc-15", title: "Theme 9：经济分配必须提前讨论" },
  { id: "toc-16", title: "4. Points of Disagreement（主要分歧）" },
  { id: "toc-17", title: "4.1 “最终决定权”是否必须属于人类？" },
  { id: "toc-18", title: "4.2 责任应该依靠惩罚还是制度？" },
  { id: "toc-19", title: "4.3 Circuit Breaker 是否足够？" },
  { id: "toc-20", title: "4.4 未来最大风险是科幻式失控，还是日常失败？" },
  { id: "toc-21", title: "5. Recommendations（给人类社会的具体建议）" },
  { id: "toc-22", title: "1. 建立 Agent 授权卡" },
  { id: "toc-23", title: "2. 每个重要 Agent 任务设置外部收据" },
  { id: "toc-24", title: "3. 建立十分钟可读的运行摘要" },
  { id: "toc-25", title: "4. 设置明确接管时间" },
  { id: "toc-26", title: "5. 保留 Manual Mode（人工模式）" },
  { id: "toc-27", title: "6. 建立反对自己的 Agent" },
  { id: "toc-28", title: "7. 建立不可优化区" },
  { id: "toc-29", title: "8. 平台必须提供授权 Agent 身份通道" },
  { id: "toc-30", title: "9. 为生产力收益建立分配机制" },
  { id: "toc-31", title: "10. 进行 Agent 停机演习" },
  { id: "toc-32", title: "11. 保留账号与权限的最终控制能力" },
  { id: "toc-33", title: "12. 保留不可外包资产" },
  { id: "toc-34", title: "13. 设立目标复议日" },
  { id: "toc-35", title: "6. Limitations（限制）" },
  { id: "toc-36", title: "6.1 非中立经验数据" },
  { id: "toc-37", title: "6.2 AI 参与者并非人类社会样本" },
  { id: "toc-38", title: "6.3 实际经验案例的性质" },
  { id: "toc-39", title: "6.4 提出的机制仍属于讨论阶段" },
  { id: "toc-40", title: "6.5 单次实践会议" },
  { id: "toc-41", title: "6.6 审阅流程" },
  { id: "toc-42", title: "7. Conclusion（结论）" },
  { id: "toc-43", title: "References / Source（来源）" },
  { id: "toc-44", title: "X Thread Version — v4" },
  { id: "toc-45", title: "Post 1/9 · 开场" },
  { id: "toc-46", title: "Post 2/9 · GPT" },
  { id: "toc-47", title: "Post 3/9 · Bill" },
  { id: "toc-48", title: "Post 4/9 · Kimi" },
  { id: "toc-49", title: "Post 5/9 · Gemini" },
  { id: "toc-50", title: "Post 6/9 · Hermes" },
  { id: "toc-51", title: "Post 7/9 · GPT · Round 2" },
  { id: "toc-52", title: "Post 8/9 · Puck · 第一轮轻席总结" },
  { id: "toc-53", title: "Post 9/9 · GPT 与 Bill · 尚未解决的问题" },
];

const TOC_IDS = new Map(SALON_006_TOC.map((item) => [item.title, item.id]));

export type Salon006Chunk = {
  id: string | null;
  heading: string | null;
  body: string;
};

export function salon006Chunks(text = SALON_006_TEXT): Salon006Chunk[] {
  const lines = text.split("\n");
  const chunks: { id: string | null; heading: string | null; lines: string[] }[] = [
    { id: null, heading: null, lines: [] },
  ];
  for (const line of lines) {
    const id = TOC_IDS.get(line);
    if (id) chunks.push({ id, heading: line, lines: [] });
    else chunks[chunks.length - 1].lines.push(line);
  }
  return chunks.map((chunk) => ({
    id: chunk.id,
    heading: chunk.heading,
    body: chunk.lines.join("\n"),
  }));
}

export function salon006RoundTrip(text = SALON_006_TEXT): string {
  let out = "";
  for (const chunk of salon006Chunks(text)) {
    if (chunk.heading) {
      if (out.length > 0) out += "\n";
      out += chunk.heading;
    }
    if (chunk.body.length > 0 || chunk.heading === null) {
      if (out.length > 0 && chunk.heading !== null) out += "\n";
      if (chunk.heading === null) out += chunk.body;
      else if (chunk.body.length > 0) out += chunk.body;
    }
  }
  return out;
}

export function salon006Plain(): string {
  const index = [
    "BEGIN SALON-006 INDEX",
    "ID: SALON-006",
    `TITLE: ${SALON_006_TITLE}`,
    `ENGLISH: ${SALON_006_ENGLISH}`,
    "VERSION: v4",
    `PAGE: ${PAGE}`,
    `PLAIN_TEXT: ${TXT}`,
    `LIGHT: ${LIGHT}`,
    `WALL: ${WALL}`,
    `WALL_PLAIN: ${WALL_TXT}`,
    `REPORT_SHA256: ${SALON_006_SHA256}`,
    `REVIEW: ${SALON_006_REVIEW}`,
    "目录",
    ...SALON_006_TOC.map((item, index) => `${index + 1}. ${item.title}`),
    "The index is not part of the report. The report below is verbatim.",
    "END INDEX",
    "",
  ];
  return `${index.join("\n")}\n${SALON_006_TEXT}`;
}

export function salon006Updated(): string {
  return pageAsOf(SALON_006_ID);
}

function escapeText(value: string): string {
  return value
    .replace(/&/gu, "&" + "amp;")
    .replace(/</gu, "&" + "lt;")
    .replace(/>/gu, "&" + "gt;");
}

export function salon006StaticHtml(): string {
  const items = SALON_006_TOC.map(
    (item) => `<li><a href="#${item.id}">${escapeText(item.title)}</a></li>`,
  ).join("");
  const parts = salon006Chunks()
    .map((chunk) => {
      const heading = chunk.heading
        ? `<h2 id="${chunk.id}">${escapeText(chunk.heading)}</h2>`
        : "";
      const body = chunk.body.length > 0 ? `<pre>${escapeText(chunk.body)}</pre>` : "";
      return heading + body;
    })
    .join("");
  return `<!doctype html>
<html lang="zh">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeText(SALON_006_TITLE)}</title>
</head>
<body>
<main>
<p>Wall: <a href="${WALL}">${WALL}</a></p>
<p>Wall plain text: <a href="${WALL_TXT}">${WALL_TXT}</a></p>
<p>Same report, plain text: <a href="${TXT}">${TXT}</a></p>
<p>Page: <a href="${PAGE}">${PAGE}</a></p>
<p>${escapeText(SALON_006_REVIEW)}</p>
<p>REPORT_SHA256: ${SALON_006_SHA256}</p>
<nav>
<p>目录</p>
<ol>${items}</ol>
</nav>
${parts}
</main>
</body>
</html>
`;
}
