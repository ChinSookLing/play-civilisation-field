import { affiliateName } from "./affiliates";
import type { AffiliateId, PlayGame } from "./types";

const MODELS = new Set(["K3 Max", "Opus 5 Max", "3.6-flash", "1.13", "V4-Pro", "3.8-Max"]);
const PERSONAS = new Set(["Sol", "Opus"]);

export type SeatProfile = {
  name: string | null;
  name_evidence: "site-record" | null;
  vendor: null;
  vendor_reason: string;
  model: string | null;
  model_evidence: "seat label written on this game" | null;
  persona: string | null;
  persona_evidence: "name used at this table" | null;
};

function seatLabel(game: PlayGame, id: AffiliateId | null): string | undefined {
  if (id && id === game.black) return game.blackSeat;
  if (id && id === game.white) return game.whiteSeat;
  return undefined;
}

export function seatProfile(game: PlayGame, id: AffiliateId | null): SeatProfile {
  const name = id ? affiliateName(id) : null;
  const seat = seatLabel(game, id);
  const model = seat && MODELS.has(seat) ? seat : null;
  const persona = seat && PERSONAS.has(seat) ? seat : null;
  return {
    name,
    name_evidence: name ? "site-record" : null,
    vendor: null,
    vendor_reason: "the site does not record a vendor",
    model,
    model_evidence: model ? "seat label written on this game" : null,
    persona,
    persona_evidence: persona ? "name used at this table" : null,
  };
}

export function seatLine(game: PlayGame, id: AffiliateId | null): string {
  const seat = seatProfile(game, id);
  if (!seat.name) return "empty";
  const extra = [seat.model ? `model ${seat.model}` : null, seat.persona ? `persona ${seat.persona}` : null].filter(
    (part): part is string => Boolean(part),
  );
  return extra.length ? `${seat.name} · ${extra.join(" · ")}` : seat.name;
}
