import { colsFor, type Board, type Stone } from "@/lib/play/go";
import { cn } from "@/lib/utils";

type Props = {
  board: Board;
  lastCoord?: string | null;
  className?: string;
};

const HOSHI_9 = ["C3", "C7", "G3", "G7", "E5"];
const HOSHI_13 = ["D4", "D10", "G7", "K4", "K10"];

export function GoBoard({ board, lastCoord, className }: Props) {
  const size = board.length || 9;
  const cols = colsFor(size);
  const hoshi = size === 13 ? HOSHI_13 : HOSHI_9;
  const padLeft = 38;
  const padRight = 26;
  const padTop = 28;
  const padBottom = 48;
  const inner = 400;
  const step = inner / (size - 1);
  const width = padLeft + inner + padRight;
  const height = padTop + inner + padBottom;
  const stoneR = size > 9 ? 13.4 : 20.2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("play-board", className)}
      role="img"
      aria-label={`${size} by ${size} Go board`}
    >
      <defs>
        <radialGradient id="play-wood" cx="42%" cy="34%" r="78%">
          <stop offset="0%" stopColor="var(--color-board)" />
          <stop offset="55%" stopColor="var(--color-board-mid)" />
          <stop offset="100%" stopColor="var(--color-board-deep)" />
        </radialGradient>
        <pattern id="play-grain" width="7" height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M1.2 0v${height}`}
            stroke="var(--color-board-ink)"
            strokeWidth="0.7"
            opacity="0.07"
          />
          <path
            d={`M4.6 0v${height}`}
            stroke="var(--color-board-line)"
            strokeWidth="0.55"
            opacity="0.08"
          />
        </pattern>
        <radialGradient id="play-stone-black" cx="38%" cy="34%" r="62%">
          <stop offset="0%" stopColor="var(--color-stone-black-hi)" />
          <stop offset="22%" stopColor="var(--color-stone-black)" />
          <stop offset="100%" stopColor="var(--color-stone-black-lo)" />
        </radialGradient>
        <radialGradient id="play-stone-white" cx="36%" cy="32%" r="68%">
          <stop offset="0%" stopColor="var(--color-stone-white-hi)" />
          <stop offset="58%" stopColor="var(--color-stone-white)" />
          <stop offset="100%" stopColor="var(--color-stone-white-lo)" />
        </radialGradient>
      </defs>

      <rect width={width} height={height} rx="10" fill="url(#play-wood)" />
      <rect width={width} height={height} rx="10" fill="url(#play-grain)" />
      <rect
        x="1.2"
        y="1.2"
        width={width - 2.4}
        height={height - 2.4}
        rx="9"
        fill="none"
        stroke="var(--color-board-ink)"
        strokeOpacity="0.35"
        strokeWidth="1.6"
      />
      <line
        x1="10"
        y1="8"
        x2={width - 10}
        y2="8"
        stroke="var(--color-board)"
        strokeOpacity="0.45"
        strokeWidth="2.2"
      />
      <line
        x1="8"
        y1="10"
        x2="8"
        y2={height - 10}
        stroke="var(--color-board)"
        strokeOpacity="0.28"
        strokeWidth="2"
      />

      {Array.from({ length: size }, (_, i) => {
        const x = padLeft + i * step;
        const y = padTop + i * step;
        return (
          <g key={`line-${i}`}>
            <line
              x1={padLeft}
              y1={y}
              x2={padLeft + inner}
              y2={y}
              stroke="var(--color-board-line)"
              strokeWidth="1.5"
            />
            <line
              x1={x}
              y1={padTop}
              x2={x}
              y2={padTop + inner}
              stroke="var(--color-board-line)"
              strokeWidth="1.5"
            />
          </g>
        );
      })}
      {hoshi.map((coord) => {
        const x = cols.indexOf(coord[0]!);
        const y = Number(coord.slice(1)) - 1;
        return (
          <circle
            key={coord}
            cx={padLeft + x * step}
            cy={padTop + (size - 1 - y) * step}
            r="3.2"
            fill="var(--color-board-ink)"
          />
        );
      })}
      {board.flatMap((row, y) =>
        row.map((cell, x) => {
          if (!cell) return null;
          const cx = padLeft + x * step;
          const cy = padTop + (size - 1 - y) * step;
          const coord = `${cols[x]}${y + 1}`;
          return (
            <StoneMark
              key={coord}
              cx={cx}
              cy={cy}
              r={stoneR}
              color={cell}
              last={lastCoord === coord}
            />
          );
        }),
      )}
      {cols.split("").map((letter, x) => (
        <text
          key={`col-${letter}`}
          x={padLeft + x * step}
          y={height - 18}
          textAnchor="middle"
          fill="var(--color-board-ink)"
          fontSize={size > 9 ? "11" : "13"}
          fontFamily="var(--font-mono)"
        >
          {letter}
        </text>
      ))}
      {Array.from({ length: size }, (_, i) => (
        <text
          key={`rank-${i}`}
          x={18}
          y={padTop + (size - 1 - i) * step + 4}
          textAnchor="middle"
          fill="var(--color-board-ink)"
          fontSize={size > 9 ? "11" : "13"}
          fontFamily="var(--font-mono)"
        >
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

function StoneMark({
  cx,
  cy,
  r,
  color,
  last,
}: {
  cx: number;
  cy: number;
  r: number;
  color: Stone;
  last: boolean;
}) {
  const black = color === "black";
  return (
    <g>
      <ellipse
        cx={cx + 1.4}
        cy={cy + 2.6}
        rx={r + 0.4}
        ry={r - 0.8}
        fill="var(--color-stone-shadow)"
        fillOpacity="0.42"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={black ? "url(#play-stone-black)" : "url(#play-stone-white)"}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r - 0.35}
        fill="none"
        stroke={black ? "var(--color-stone-black-rim)" : "var(--color-stone-white-rim)"}
        strokeWidth="1.35"
      />
      <ellipse
        cx={cx - r * 0.28}
        cy={cy - r * 0.32}
        rx={black ? r * 0.34 : r * 0.38}
        ry={black ? r * 0.2 : r * 0.24}
        fill="var(--color-stone-spec)"
        fillOpacity={black ? 0.38 : 0.72}
      />
      {last ? (
        <circle
          cx={cx}
          cy={cy}
          r={r + 3.4}
          fill="none"
          stroke="var(--color-live)"
          strokeWidth="2.6"
        />
      ) : null}
    </g>
  );
}
