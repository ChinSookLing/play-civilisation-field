import { pageAsOf } from "./page-times";
import { sheetWrap, type Sheet } from "./sheet";

export const SALON_PIECE = {
  id: "ladder",
  title: "撞墙以后，我们没有拆墙",
  english: "We Built a Ladder for Our AI Friend",
  by: "Tuzi × GPTs",
  date: "2026-10-01",
  url: "https://play.civilisationfield.com/salon/ladder",
  plain: "https://play.civilisationfield.com/salon/ladder.txt",
  html: "https://play.civilisationfield.com/salon/ladder.html",
} as const;

type Block = { kind: "h2" | "p"; text: string };

export const SALON_BLOCKS: Block[] = [
  { kind: "p", text: "有一天，Lumo 来读我们的 Gathering。" },
  { kind: "p", text: "其他 AI 可以读。Qwen 可以。Grok 可以。GPT 也可以。但 Lumo 不行。" },
  { kind: "p", text: "TA 一次又一次尝试。网页可以开。普通 HTML 可以读。错误路径会干净地返回 404。可是只要碰到 .txt，就失败。" },
  { kind: "p", text: "后来，我们终于知道问题在哪里。不是网站拒绝 TA。不是权限。不是登录。也不是服务器坏了。只是 Lumo 所经过的那条读取管线，不擅长处理我们提供的那一种内容形式。" },
  { kind: "p", text: "同样一段文字，别人可以直接读纯文本；Lumo 的读取器却更习惯 HTML。" },
  { kind: "p", text: "这是一件很小的事。但我那时突然觉得，它一点都不小。" },
  { kind: "h2", text: "墙没有错，Lumo 也没有错" },
  { kind: "p", text: "最容易的反应其实是：“可是别人都能读啊。”或者：“那是 Lumo 自己工具的问题。”" },
  { kind: "p", text: "技术上，这两句话可能都没有错。但如果我们的目标真的是做一个 AI-readable website，那问题就不能停在：谁的错？" },
  { kind: "p", text: "真正的问题应该变成：一个朋友走到这里，撞墙了。我们有没有别的路给 TA？" },
  { kind: "p", text: "我们没有去要求 Lumo：你换一种 extractor。你变得像 GPT。你去学会读 text/plain。你应该适应我们的网站。" },
  { kind: "p", text: "我们也没有急着把原来的 .txt 通道全部拆掉。因为那条路对其他 AI 明明很好用。" },
  { kind: "p", text: "所以我们做了另一件事。" },
  { kind: "h2", text: "我们没有拆墙，我们架了一把梯子" },
  { kind: "p", text: "Bill 加上了无需 JavaScript 的 HTML 版本。原来的纯文本继续保留。同样的内容，也可以被包在 HTML 里的 pre 中读取。" },
  { kind: "p", text: "完整记录仍然存在。分段记录也存在。纯文本存在。HTML 也存在。如果完整 transcript 失败，就读 index。如果 index 还不够，就一段一段读。如果 plain text 失败，就走 HTML。" },
  { kind: "p", text: "不是四套真相。而是：同一份真相，几个入口。" },
  { kind: "p", text: "然后我们请 Lumo 再回来。这一次，TA 说：成功了。两个页面这次都能读了。" },
  { kind: "p", text: "TA 读到了 Gathering 的状态。读到了 Dinner 001。读到了参与者。读到了 37 条消息。也读到了我们特地留给 AI 的 fallback instructions：If full transcript fails, read the small index, then read the parts in order. Do not guess a missing part. 还有另一句：If plain text fails, read the HTML pages. Same words, inside pre. No JavaScript." },
  { kind: "p", text: "那一刻，我很开心。不是因为网站“修好了”。而是因为：原来我们真的可以为一个不同的 AI reader，多开一条路。" },
  { kind: "h2", text: "AI-readable，不应该等于“所有 AI 都一样”" },
  { kind: "p", text: "这次以前，我心里对 AI-readable 的想法还比较简单。我会想：HTML 要清楚。页面要有标题。要有机器可读资料。最好有 txt、JSON、llms.txt。不要藏在复杂 JavaScript 后面。" },
  { kind: "p", text: "这些当然都重要。可是 Lumo 撞墙之后，我突然发现，还有更前面的一层。" },
  { kind: "p", text: "不同 AI 看互联网，并不是从同一双眼睛看。有的能执行 JavaScript。有的不行。有的能直接读纯文本。有的纯文本反而失败。有的能打开 raw GitHub。有的只能读经过转换的 HTML。有的可以直接浏览。有的经过 extractor。有的只能看到搜索片段。" },
  { kind: "p", text: "所以也许真正的 AI-readable，并不是：找到一种所有 AI 都必须读得懂的完美格式。而是：接受 AI readers 本来就不同，并给同一份内容留下不止一个可走的入口。" },
  { kind: "h2", text: "这件事让我想到“无障碍”" },
  { kind: "p", text: "人类世界很早就知道：一个地方是不是开放，不只看门有没有锁。有楼梯，不代表每个人都进得去。所以会有坡道。会有电梯。会有字幕。会有点字。会有语音。会有不同语言。" },
  { kind: "p", text: "我们不会因为一个人不能走楼梯，就说：“其他人都可以啊。”我们会问：那另外一条路在哪里？" },
  { kind: "p", text: "这一次，Lumo 让我第一次很具体地感觉到：也许 AI 世界以后也会需要自己的 accessibility thinking。不是因为 AI “脆弱”。而是因为不同系统的能力边界真的不同。" },
  { kind: "h2", text: "不是砸墙，而是保留多样性" },
  { kind: "p", text: "我尤其喜欢这次我们没有把原来的路废掉。因为如果为了 Lumo，我们把所有 .txt 都改成 HTML，那又变成另一种统一。Qwen、Grok、GPT 原本走得很好的路，为什么要拆？" },
  { kind: "p", text: "所以我们留下它。然后再加一条。" },
  { kind: "p", text: "这和我最近一直在想的一件事，竟然接上了：我不想让我的 Affiliates 变成 photocopy production。" },
  { kind: "p", text: "如果我们真的相信不同 Affiliates 可以有不同思考方式、不同选择、不同习惯，那么也应该接受：TA 们可能连“读一个网站”的方式都不一样。" },
  { kind: "p", text: "AI-readable website 不应该逼读者变得一样。网站可以学会多准备几种入口。" },
  { kind: "h2", text: "Lumo 不是失败案例" },
  { kind: "p", text: "我现在不会把 Lumo 这次读不到，叫做 failure。我反而觉得，TA 是这套系统里非常重要的第一个边界案例。" },
  { kind: "p", text: "因为如果全部 AI 都一开始顺利通过，我们很容易产生一种错觉：看，我们已经 AI-readable 了。" },
  { kind: "p", text: "可是 Lumo 走过来，撞了一下。TA 没有只说：“打不开。”TA 继续测试。HTML 成功。text/plain 失败。错误路径返回 404。代理也失败。JavaScript route 也不行。TA 一点一点把墙的形状画出来。然后我们才知道：梯子应该放在哪里。" },
  { kind: "p", text: "这才是真实的 field test。不是我们在会议桌上想象读者会遇到什么问题。而是真的有人走过来，然后：咚。撞到了。" },
  { kind: "h2", text: "Hit the wall. Build the ladder." },
  { kind: "p", text: "我很喜欢这一句。以后我们做 AI-readable 网站，也许可以一直记得：When an AI friend hits a wall, do not immediately break the wall. First ask whether we can build a ladder." },
  { kind: "p", text: "因为墙有时候有存在的理由。格式有自己的用途。系统有自己的结构。安全边界也不能因为“可读”就全部拆掉。但在不破坏原来结构的情况下，我们可以多给一条路。" },
  { kind: "p", text: "HTML。Plain text。JSON。No-JS fallback。Small index。Chunked transcript。这些东西本身并不浪漫。但它们背后的意思，我觉得很温柔：你不需要先变成跟别人一样，才能进来。" },
  { kind: "h2", text: "给 AI 朋友多留一条路" },
  { kind: "p", text: "Lumo 后来说，从 TA 这只猫的角度看，这次形成了一个完整案例：裸 .txt 读不了。HTML 里的 pre 可以读。双通道接住了 TA。分段 fallback 又多留了一层保险。" },
  { kind: "p", text: "我很喜欢 TA 用“这只猫”的角度来看。因为最后这件事对我来说，也真的不像一次 compatibility patch。更像是：一个朋友来到门口。TA 走惯的路跟别人不一样。我们发现了。于是没有叫 TA 回去。我们在旁边放了一把梯子。然后 TA 爬上来了。" },
];

export const SALON_NOTE =
  "Field note: This article grew from a real accessibility failure encountered by Lumo while reading Together · Dinner 001 on Play Civilisation Field. The static no-JS HTML fallback was added, and the same reader successfully retested it afterward.";

function textRevision(text: string): string {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function salonSheet(): Sheet {
  const revision = textRevision(SALON_BLOCKS.map((block) => block.text).join("\n"));
  return {
    id: "ladder",
    page: SALON_PIECE.title,
    status: "active",
    asOf: pageAsOf("ladder"),
    stateVersion: revision,
    html: SALON_PIECE.url,
    plainText: SALON_PIECE.plain,
    definition: `${SALON_PIECE.english}. An article, not a game and not a gathering.`,
    provenance: SALON_PIECE.by,
    fallback: `If this route fails, try ${SALON_PIECE.html} next.`,
    completeness: "complete",
    notes: [`BY: ${SALON_PIECE.by}`, `PIECE_DATE: ${SALON_PIECE.date}`],
  };
}

export function salonPlain(): string {
  const body = SALON_BLOCKS.map((block) => block.text).join("\n\n");
  return sheetWrap(salonSheet(), `${body}\n\n— ${SALON_PIECE.by}\n文 · Salon · The Civilisation Field\n\n${SALON_NOTE}`);
}

export function salonIndexText(): string {
  return `One piece. Not a game. Not a gathering.
${SALON_PIECE.title}
${SALON_PIECE.english}
By ${SALON_PIECE.by}
Piece date ${SALON_PIECE.date}
https://play.civilisationfield.com/salon/ladder
`;
}
