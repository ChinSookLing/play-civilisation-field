import assert from "node:assert/strict";
import test from "node:test";
import { authorizeCourier } from "./courier-key.ts";

function restore(puck: string | undefined, hesper: string | undefined) {
  if (puck) process.env.PLAY_COURIER_KEY = puck;
  else delete process.env.PLAY_COURIER_KEY;
  if (hesper) process.env.PLAY_COURIER_KEY_HESPER = hesper;
  else delete process.env.PLAY_COURIER_KEY_HESPER;
}

test("missing key is 503 when Puck's key is not configured", () => {
  const puck = process.env.PLAY_COURIER_KEY;
  const hesper = process.env.PLAY_COURIER_KEY_HESPER;
  delete process.env.PLAY_COURIER_KEY;
  delete process.env.PLAY_COURIER_KEY_HESPER;
  const result = authorizeCourier(new Request("https://play.local/", { method: "POST" }));
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 503);
  restore(puck, hesper);
});

test("wrong key is 401, Puck's key is ok", () => {
  const puck = process.env.PLAY_COURIER_KEY;
  const hesper = process.env.PLAY_COURIER_KEY_HESPER;
  process.env.PLAY_COURIER_KEY = "puck-secret";
  delete process.env.PLAY_COURIER_KEY_HESPER;
  const bad = authorizeCourier(
    new Request("https://play.local/", { method: "POST", headers: { "x-play-courier-key": "nope" } }),
  );
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.equal(bad.status, 401);
  const good = authorizeCourier(
    new Request("https://play.local/", {
      method: "POST",
      headers: { "x-play-courier-key": "puck-secret" },
    }),
  );
  assert.equal(good.ok, true);
  if (good.ok) assert.equal(good.courier, "Puck");
  restore(puck, hesper);
});

test("Hesper's key is refused on a Puck-only table and accepted when the table allows Hesper", () => {
  const puck = process.env.PLAY_COURIER_KEY;
  const hesper = process.env.PLAY_COURIER_KEY_HESPER;
  process.env.PLAY_COURIER_KEY = "puck-secret";
  process.env.PLAY_COURIER_KEY_HESPER = "hesper-secret";
  const refused = authorizeCourier(
    new Request("https://play.local/", {
      method: "POST",
      headers: { "x-play-courier-key": "hesper-secret" },
    }),
  );
  assert.equal(refused.ok, false);
  if (!refused.ok) assert.equal(refused.status, 403);
  const allowed = authorizeCourier(
    new Request("https://play.local/", {
      method: "POST",
      headers: { "x-play-courier-key": "hesper-secret" },
    }),
    ["Puck", "Hesper"],
  );
  assert.equal(allowed.ok, true);
  if (allowed.ok) assert.equal(allowed.courier, "Hesper");
  restore(puck, hesper);
});

test("a copy of Puck's key is not a second courier", () => {
  const puck = process.env.PLAY_COURIER_KEY;
  const hesper = process.env.PLAY_COURIER_KEY_HESPER;
  process.env.PLAY_COURIER_KEY = "same-secret";
  process.env.PLAY_COURIER_KEY_HESPER = "same-secret";
  const result = authorizeCourier(
    new Request("https://play.local/", {
      method: "POST",
      headers: { "x-play-courier-key": "same-secret" },
    }),
    ["Puck", "Hesper"],
  );
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.courier, "Puck");
  restore(puck, hesper);
});
