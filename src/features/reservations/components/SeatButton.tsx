import { cn } from "@/lib/utils";
import type { BoatSeat } from "../seat-map";

type SeatButtonProps = {
  deckLabel: string;
  seat: BoatSeat;
  isSelected: boolean;
  onToggle: (label: BoatSeat["label"]) => void;
};

export function SeatButton({
  deckLabel,
  seat,
  isSelected,
  onToggle,
}: SeatButtonProps) {
  return (
    <button
      type="button"
      aria-label={`${deckLabel} seat ${seat.label}`}
      aria-pressed={isSelected}
      data-seat={seat.label}
      data-visual-variant={seat.variant}
      onClick={() => onToggle(seat.label)}
      className={cn(
        "boat-seat absolute z-10 flex items-center justify-center font-bold",
        `boat-seat--${seat.variant}`,
        isSelected && "boat-seat--selected",
      )}
      style={{
        left: `${seat.x}%`,
        top: `${seat.y}%`,
        width: `${seat.width}%`,
        height: `${seat.height}%`,
        transform: `translate(-50%, -50%) rotate(${seat.rotation}deg)`,
      }}
    >
      <span className="boat-seat__label" aria-hidden="true">
        {seat.label}
      </span>
      {isSelected && (
        <span className="boat-seat__check" aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
}
