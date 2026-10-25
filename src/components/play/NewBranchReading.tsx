import { Link } from "@tanstack/react-router";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/play/SiteFooter";
import {
  NEW_BRANCH_ENTRANCE,
  NEW_BRANCH_MANUSCRIPT,
  NEW_BRANCH_MARKDOWN,
  NEW_BRANCH_SHA256,
  NEW_BRANCH_VERIFICATION_TXT,
  newBranchUpdated,
} from "@/lib/play/proof-table-008-new-branch";
import { parseManuscript, type ReadBlock } from "@/lib/play/proof-table-008-new-branch-read";

const TOC = [
  ["def", "定義"],
  ["one-to-four", "一至四人"],
  ["five", "五人構造"],
  ["proof", "證明"],
  ["review", "核閱"],
  ["appendix", "附錄"],
] as const;

function mathHtml(tex: string, display: boolean): string {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    trust: false,
    output: "html",
  });
}

function Inline({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let index = 0;
  let key = 0;
  while (index < text.length) {
    if (text.startsWith("\\(", index)) {
      const end = text.indexOf("\\)", index + 2);
      if (end >= 0) {
        const tex = text.slice(index + 2, end);
        nodes.push(
          <span key={key} dangerouslySetInnerHTML={{ __html: mathHtml(tex, false) }} />,
        );
        key += 1;
        index = end + 2;
        continue;
      }
    }
    if (text[index] === "`") {
      const end = text.indexOf("`", index + 1);
      if (end >= 0) {
        nodes.push(
          <code key={key} className="font-mono text-[0.92em]">
            {text.slice(index + 1, end)}
          </code>,
        );
        key += 1;
        index = end + 1;
        continue;
      }
    }
    if (text.startsWith("**", index)) {
      const end = text.indexOf("**", index + 2);
      if (end >= 0) {
        nodes.push(
          <strong key={key} className="font-medium">
            <Inline text={text.slice(index + 2, end)} />
          </strong>,
        );
        key += 1;
        index = end + 2;
        continue;
      }
    }
    let end = index + 1;
    while (
      end < text.length &&
      !text.startsWith("\\(", end) &&
      text[end] !== "`" &&
      !text.startsWith("**", end)
    ) {
      end += 1;
    }
    const chunk = text.slice(index, end);
    const pieces = chunk.split("\n");
    pieces.forEach((piece, pieceIndex) => {
      if (pieceIndex > 0) nodes.push(<br key={key + pieceIndex} />);
      if (piece) nodes.push(piece);
    });
    key += pieces.length;
    index = end;
  }
  return <>{nodes}</>;
}

function BlockView({ block }: { block: ReadBlock }) {
  if (block.kind === "heading") {
    const className =
      block.level === 1
        ? "mt-10 font-display text-3xl tracking-tight scroll-mt-6"
        : block.level === 2
          ? "mt-10 text-xl tracking-tight scroll-mt-6"
          : "mt-6 text-lg tracking-tight scroll-mt-6";
    if (block.level === 1) {
      return (
        <h2 id={block.id} className={className}>
          {block.text}
        </h2>
      );
    }
    if (block.level === 2) {
      return (
        <h2 id={block.id} className={className}>
          {block.text}
        </h2>
      );
    }
    return (
      <h3 id={block.id} className={className}>
        {block.text}
      </h3>
    );
  }
  if (block.kind === "rule") return <hr className="my-8 border-line" />;
  if (block.kind === "math") {
    return (
      <div
        className="my-4 overflow-x-auto text-fg"
        dangerouslySetInnerHTML={{ __html: mathHtml(block.tex, true) }}
      />
    );
  }
  if (block.kind === "code") {
    return (
      <pre className="my-4 overflow-x-auto bg-surface px-3 py-3 font-mono text-xs leading-relaxed text-fg">
        {block.code}
        {"\n"}
      </pre>
    );
  }
  if (block.kind === "list") {
    const items = block.items.map((item) => (
      <li key={item} className="mt-1">
        <Inline text={item} />
      </li>
    ));
    return block.ordered ? (
      <ol className="my-3 list-decimal pl-5 text-sm leading-relaxed">{items}</ol>
    ) : (
      <ul className="my-3 list-disc pl-5 text-sm leading-relaxed">{items}</ul>
    );
  }
  if (block.kind === "table") {
    return (
      <div className="my-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {block.header.map((cell) => (
                <th key={cell} className="border border-line px-2 py-1 text-left font-medium">
                  <Inline text={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="border border-line px-2 py-1 align-top">
                    <Inline text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <p className="mt-3 text-sm leading-relaxed">
      {block.lines.map((line, lineIndex) => (
        <span key={`${lineIndex}-${line}`}>
          {lineIndex > 0 ? <br /> : null}
          <Inline text={line.trimEnd()} />
        </span>
      ))}
    </p>
  );
}

export function NewBranchReading() {
  const blocks = parseManuscript(NEW_BRANCH_MANUSCRIPT);
  return (
    <main className="min-h-dvh bg-bg text-fg">
      <div className="mx-auto max-w-3xl px-5 py-10">
        <p className="text-sm">
          <Link to="/gathering" className="text-fg underline decoration-1 underline-offset-4">
            聚 · Gathering
          </Link>
          <Link to="/gathering/proof-table-008/table" className="ml-4 text-fg underline decoration-1 underline-offset-4">
            證明桌
          </Link>
          <a href={NEW_BRANCH_VERIFICATION_TXT} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            純文字
          </a>
          <a href={NEW_BRANCH_MARKDOWN} className="ml-4 text-fg underline decoration-1 underline-offset-4">
            Markdown
          </a>
        </p>
        <h1 className="mt-6 font-display text-4xl tracking-tight">一至五跑者的安全時間構造</h1>
        <p className="mt-3 text-sm text-muted">整合送審稿 v0.2 · 2026-10-25（Asia/Singapore）</p>
        <p className="mt-1 text-sm text-muted">主鏈 T4-Q3。不是舊公開八分支 T4-PUB-8。證明桌台帳沒有改。</p>
        <p className="mt-4 text-sm leading-relaxed">
          本稿證明 N≤5 的精確安全時間構造：N≤4 為固定次數直接式；N=5 在一個有證明的固定候選範圍內選取。整數存在性主鏈含
          m=2,…,5 四層的完整計算機輔助核驗。這不聲稱高效、全程無候選檢驗或任意人數已解。未經外部同行評審，新穎性未查。
        </p>
        <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="目錄">
          {TOC.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-fg underline decoration-1 underline-offset-4">
              {label}
            </a>
          ))}
        </nav>
        <article className="mt-8">
          {blocks.map((block, index) => (
            <BlockView key={index} block={block} />
          ))}
        </article>
        <details className="mt-12 border-t border-line pt-6 text-sm">
          <summary className="cursor-pointer text-muted">給機器的欄位與檔案</summary>
          <pre className="mt-4 whitespace-pre-wrap text-xs leading-relaxed text-muted">{NEW_BRANCH_ENTRANCE}</pre>
          <p className="mt-2 text-xs text-muted">SHA-256 {NEW_BRANCH_SHA256}</p>
        </details>
        <SiteFooter updated={newBranchUpdated()} />
      </div>
    </main>
  );
}
