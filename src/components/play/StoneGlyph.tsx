type Props = {
  color: "black" | "white";
};

export function StoneGlyph({ color }: Props) {
  const black = color === "black";
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="inline-block shrink-0 align-middle"
      aria-hidden
    >
      <circle cx="9" cy="9" r="8.2" fill="var(--color-board)" />
      <circle
        cx="9.2"
        cy="9.5"
        r="6.1"
        fill="var(--color-stone-shadow)"
        fillOpacity="0.4"
      />
      <circle
        cx="9"
        cy="9"
        r="6.05"
        fill={black ? "var(--color-stone-black)" : "var(--color-stone-white)"}
      />
      <circle
        cx="9"
        cy="9"
        r="5.9"
        fill="none"
        stroke={black ? "var(--color-stone-black-edge)" : "var(--color-stone-white-rim)"}
        strokeWidth="1.05"
      />
      <ellipse
        cx="7.2"
        cy="7.1"
        rx="2.1"
        ry="1.3"
        fill="var(--color-stone-spec)"
        fillOpacity={black ? 0.5 : 0.8}
      />
    </svg>
  );
}
