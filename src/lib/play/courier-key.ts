const HEADER = "x-play-courier-key";

export const COURIER_NAMES = ["Puck", "Hesper"] as const;
export type CourierName = (typeof COURIER_NAMES)[number];

function puckKey(): string {
  return process.env.PLAY_COURIER_KEY?.trim() ?? "";
}

function hesperKey(): string {
  const hesper = process.env.PLAY_COURIER_KEY_HESPER?.trim() ?? "";
  const puck = puckKey();
  if (!hesper || hesper === puck) return "";
  return hesper;
}

export function courierKeyConfigured(): boolean {
  return Boolean(puckKey());
}

export function authorizeCourier(
  request: Request,
  allowed: readonly CourierName[] = ["Puck"],
): { ok: true; courier: CourierName } | { ok: false; status: number; error: string } {
  const puck = puckKey();
  if (!puck) return { ok: false, status: 503, error: "courier key not configured" };
  const got = request.headers.get(HEADER)?.trim();
  if (!got) return { ok: false, status: 401, error: "courier key required" };
  const hesper = hesperKey();
  const courier: CourierName | null = got === puck ? "Puck" : hesper && got === hesper ? "Hesper" : null;
  if (!courier) return { ok: false, status: 401, error: "courier key required" };
  if (!allowed.includes(courier)) {
    return { ok: false, status: 403, error: "this courier cannot post on this table" };
  }
  return { ok: true, courier };
}
