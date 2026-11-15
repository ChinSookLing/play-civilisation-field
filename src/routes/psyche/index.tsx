import { createFileRoute } from "@tanstack/react-router";
import { PolarCityCard } from "@/components/play/PolarCityCard";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_001_STATUS, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/")({
  head: () =>
    pageMeta(
      "Psyche · Play · Civilisation Field",
      "Card 001 is up. Polar City Night Shift v0.5.1. First round complete. No score.",
    ),
  component: Psyche,
});

function Psyche() {
  return (
    <RoomIndex
      mark="心"
      title="Psyche"
      intro="This page lists the Psyche cards, oldest first."
      sections={[
        {
          items: [
            {
              href: "/psyche/001",
              id: "PSYCHE-001",
              title: PSYCHE_001_TITLE,
              status: PSYCHE_001_STATUS,
              note: "v0.5.1 · first round complete. GPT, Gemini, DeepSeek. Seed S95. No score.",
              light: "/psyche/001.txt",
            },
          ],
        },
      ]}
      sheet={psycheSheet()}
      banner={<PolarCityCard />}
    />
  );
}
