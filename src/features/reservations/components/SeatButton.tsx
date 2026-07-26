import { cn } from "@/lib/utils";
import type { SeatLabel } from "../seat-map";

type SeatButtonProps = {
  deckLabel: string;
  label: SeatLabel;
  isSelected: boolean;
  onToggle: (label: SeatLabel) => void;
};

export function SeatButton({
  deckLabel,
  label,
  isSelected,
  onToggle,
}: SeatButtonProps) {
  return (
    <button
      type="button"
      aria-label={`${deckLabel} seat ${label}`}
      aria-pressed={isSelected}
      onClick={() => onToggle(label)}
      className={cn(
        "flex min-h-11 min-w-0 items-center justify-center rounded-xl border-2 px-1 text-sm font-bold shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ember sm:min-h-14 sm:rounded-2xl sm:text-base",
        isSelected
          ? "border-ivory bg-ember text-white"
          : "border-ink/25 bg-ivory text-ink hover:border-ember hover:bg-white",
      )}
    >
      <span aria-hidden="true">{isSelected ? `✓ ${label}` : label}</span>
    </button>
  );
}
