import { ChevronLeft, ChevronRight, ChevronsLeft, Pause, Play, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  playing: boolean;
  atStart: boolean;
  atLive: boolean;
  onReplay: () => void;
  onPause: () => void;
  onCatchUp: () => void;
  onPrev: () => void;
  onNext: () => void;
  onStart: () => void;
};

export function ReplayBar({
  playing,
  atStart,
  atLive,
  onReplay,
  onPause,
  onCatchUp,
  onPrev,
  onNext,
  onStart,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Button type="button" variant="ghost" size="md" onClick={onStart} disabled={atStart} aria-label="First stone">
        <ChevronsLeft className="size-4" strokeWidth={1.75} />
      </Button>
      <Button type="button" variant="ghost" size="md" onClick={onPrev} disabled={atStart} aria-label="Previous">
        <ChevronLeft className="size-4" strokeWidth={1.75} />
      </Button>
      {playing ? (
        <Button type="button" variant="solid" size="md" onClick={onPause} aria-label="Pause replay">
          <Pause className="size-4" strokeWidth={1.75} />
          Pause
        </Button>
      ) : (
        <Button type="button" variant="solid" size="md" onClick={onReplay} aria-label="Replay from the first stone">
          <Play className="ml-0.5 size-4" strokeWidth={1.75} />
          Replay
        </Button>
      )}
      <Button type="button" variant="ghost" size="md" onClick={onNext} disabled={atLive} aria-label="Next">
        <ChevronRight className="size-4" strokeWidth={1.75} />
      </Button>
      <Button type="button" variant="ghost" size="md" onClick={onCatchUp} disabled={atLive} aria-label="Catch up">
        <Undo2 className="size-4" strokeWidth={1.75} />
        Catch up
      </Button>
    </div>
  );
}
