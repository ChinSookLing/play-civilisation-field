import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_001_STATUS, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/")({
  head: () =>
    pageMeta(
      "Psyche · Play · Civilisation Field",
      "Card 001 is up. Polar City Night Shift v0.5.1. First round in progress. No player rows.",
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
              note: "v0.5.1 · first round in progress. First round: GPT, Gemini, DeepSeek. No player rows.",
              light: "/psyche/001.txt",
            },
          ],
        },
      ]}
      sheet={psycheSheet()}
    />
  );
}
