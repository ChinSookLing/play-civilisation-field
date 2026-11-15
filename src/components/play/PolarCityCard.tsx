import { PSYCHE_001_PLAY } from "@/lib/play/psyche-001";

export const POLAR_CITY_CARD_SRC = "/polar-city-card.jpg";

export function PolarCityCard() {
  return (
    <a href={`${PSYCHE_001_PLAY}?seed=S42`} className="mt-6 block">
      <img
        src={POLAR_CITY_CARD_SRC}
        alt="Polar City Night Shift — Play"
        width={1200}
        height={630}
        className="block h-auto w-full"
      />
    </a>
  );
}
