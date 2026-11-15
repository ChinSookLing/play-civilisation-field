import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_001_STATUS, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/")({
  head: () =>
    pageMeta(
      "Psyche · Play · Civilisation Field",
      "Card 001 is up. v0.6 · 開放. No score.",
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
          ],
        },
      ]}
      sheet={psycheSheet()}
    />
  );
}
