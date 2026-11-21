import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_001_STATUS, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";
import { PSYCHE_002_STATUS, PSYCHE_002_TITLE } from "@/lib/play/psyche-002";

export const Route = createFileRoute("/psyche/")({
  head: () =>
    pageMeta(
      "Psyche · Play · Civilisation Field",
      "Card 001 is up. Card 002 is airlock-v0.2 · 開放. No score.",
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
              note: "First round (GPT, Gemini, DeepSeek), seed S95. No score.",
              light: "/psyche/001.txt",
            },
            {
              href: "/psyche/002",
              id: "PSYCHE-002",
              title: PSYCHE_002_TITLE,
              status: PSYCHE_002_STATUS,
              note: "Airlock. airlock-v0.2 · 開放. No score.",
              light: "/psyche/002.txt",
            },
          ],
        },
      ]}
      sheet={psycheSheet()}
    />
  );
}
