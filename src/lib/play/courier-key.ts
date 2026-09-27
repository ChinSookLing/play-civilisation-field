const HEADER = "x-play-courier-key";

function expectedKey(): string {
  return process.env.PLAY_COURIER_KEY?.trim() ?? "";
}

export function courierKeyConfigured(): boolean {
  return Boolean(expectedKey());
}

export function authorizeCourier(request: Request): { ok: true } | { ok: false; status: number; error: string } {
  const expected = expectedKey();
  if (!expected) return { ok: false, status: 503, error: "courier key not configured" };
  const got = request.headers.get(HEADER)?.trim();
  if (!got || got !== expected) {
    return { ok: false, status: 401, error: "courier key required" };
  }
  return { ok: true };
}
