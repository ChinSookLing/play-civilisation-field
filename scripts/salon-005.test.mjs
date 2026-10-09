import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

const text = readFileSync(new URL("../docs/salon/SALON-005-v0.2.md", import.meta.url), "utf8");
const svg = readFileSync(
  new URL("../docs/salon/SALON-005-fig1-sixteen-points.svg", import.meta.url),
);
const caption =
  "（附图：x = 47/223 时的 16 个点。最近的两点是点 0 和点 14，所以速度 14 在这一刻「太近」。）";

test("SALON-005 text and figure are the reviewed files", () => {
  assert.equal(
    createHash("sha256").update(text).digest("hex"),
    "0fe87d5a8815213d67dcee7c16d8e57dedc32ad9583e6bc2741724885b2369c0",
  );
  assert.equal(
    createHash("sha256").update(svg).digest("hex"),
    "891328c1e271a362d0809423b5e105e9d3cb7645b148240d8d4310cd6393a4fb",
  );
  assert.equal(text.split(caption).length, 2);
  const page = readFileSync(new URL("../src/routes/salon/fifteen-speeds.tsx", import.meta.url), "utf8");
  assert.equal(page.includes(caption), false);
  assert.equal(page.includes("SALON_005_CAPTION"), true);
});
