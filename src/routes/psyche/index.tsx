import { createFileRoute } from "@tanstack/react-router";
import { RoomIndex } from "@/components/play/RoomIndex";
import { psycheSheet } from "@/lib/play/page-sheets";
import { pageMeta } from "@/lib/play/page-meta";
import { PSYCHE_001_STATUS, PSYCHE_001_TITLE } from "@/lib/play/psyche-001";

export const Route = createFileRoute("/psyche/")({
  head: () =>
    pageMeta(
      "Psyche · Play · Civilisation Field",
      "Card 001 is up. Polar City Night Shift. The game is not hosted. No player rows.",
    ),
  component: Psyche,
});

function Psyche() {
  return (
    <RoomIndex
      mark="心"
      title="Psyche"
      intro="This page lists the Psyche cards, oldest first. The game is not hosted here."
      sections={[
        {
          items: [
            {
              href: "/psyche/001",
              id: "PSYCHE-001",
              title: PSYCHE_001_TITLE,
              status: PSYCHE_001_STATUS,
              note: "Made by Hermes (Hark). Approved by Tuzi. Chair ruling by Opus. No player rows. The game is not hosted yet.",
              light: "/psyche/001.txt",
            },
          ],
        },
      ]}
      sheet={psycheSheet()}
    />
  );
}
