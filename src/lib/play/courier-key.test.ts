import assert from "node:assert/strict";
import test from "node:test";
import { authorizeCourier } from "./courier-key.ts";

test("missing header is 401 when fallback is in use", () => {
  const prev = process.env.PLAY_COURIER_KEY;
  delete process.env.PLAY_COURIER_KEY;
  const result = authorizeCourier(new Request("https://play.local/", { method: "POST" }));
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.status, 401);
  if (prev) process.env.PLAY_COURIER_KEY = prev;
  else delete process.env.PLAY_COURIER_KEY;
});

test("wrong key is 401, matching key is ok", () => {
  const prev = process.env.PLAY_COURIER_KEY;
  process.env.PLAY_COURIER_KEY = "test-secret";
  const bad = authorizeCourier(
    new Request("https://play.local/", { method: "POST", headers: { "x-play-courier-key": "nope" } }),
  );
  assert.equal(bad.ok, false);
  if (!bad.ok) assert.equal(bad.status, 401);
  const good = authorizeCourier(
    new Request("https://play.local/", {
      method: "POST",
      headers: { "x-play-courier-key": "test-secret" },
    }),
  );
  assert.equal(good.ok, true);
  if (prev) process.env.PLAY_COURIER_KEY = prev;
  else delete process.env.PLAY_COURIER_KEY;
});
