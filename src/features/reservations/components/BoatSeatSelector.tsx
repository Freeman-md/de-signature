import { Anchor, ShipWheel } from "lucide-react";

import {
  boatDecks,
  lowerDeckSeatGroups,
  upperDeckSeatGroups,
  type SeatLabel,
} from "../seat-map";
import { SeatButton } from "./SeatButton";

type BoatSeatSelectorProps = {
  selectedSeats: readonly SeatLabel[];
  onToggleSeat: (label: SeatLabel) => void;
};

function SeatGroup({
  deckLabel,
  labels,
  selectedSeats,
  onToggleSeat,
}: BoatSeatSelectorProps & {
  deckLabel: string;
  labels: readonly SeatLabel[];
}) {
  return (
    <div className="grid grid-cols-5 gap-1 sm:gap-3">
      {labels.map((label) => (
        <SeatButton
          key={label}
          deckLabel={deckLabel}
          label={label}
          isSelected={selectedSeats.includes(label)}
          onToggle={onToggleSeat}
        />
      ))}
    </div>
  );
}

export function BoatSeatSelector({
  selectedSeats,
  onToggleSeat,
}: BoatSeatSelectorProps) {
  const upperDeck = boatDecks[0];
  const lowerDeck = boatDecks[1];

  return (
    <div className="mt-9 grid gap-7 xl:grid-cols-2">
      <article
        aria-labelledby="upper-deck-heading"
        className="relative overflow-hidden rounded-[4rem_4rem_2rem_2rem] border border-ink/15 bg-[#eadbc8] px-3 pb-8 pt-12 text-ink shadow-xl sm:px-8"
      >
        <div className="absolute left-1/2 top-3 h-5 w-16 -translate-x-1/2 rounded-t-full border border-ink/20 bg-ivory" aria-hidden="true" />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Open air</p>
            <h3 id="upper-deck-heading" className="mt-1 font-serif text-3xl">{upperDeck.label}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-ink/70">{upperDeck.description} Multiple seats welcome.</p>
          </div>
          <div className="rounded-2xl border border-ink/15 bg-ivory/70 p-3 text-center text-xs font-bold uppercase tracking-wider text-ink/65">
            <ShipWheel className="mx-auto mb-1" size={20} aria-hidden="true" />
            Driver
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-sm">
          <SeatGroup
            deckLabel={upperDeck.label}
            labels={upperDeckSeatGroups[0]}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
          <div className="my-4 flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ink/45" aria-hidden="true">
            <span className="h-px flex-1 bg-ink/20" />
            Central aisle
            <span className="h-px flex-1 bg-ink/20" />
          </div>
          <SeatGroup
            deckLabel={upperDeck.label}
            labels={upperDeckSeatGroups[1]}
            selectedSeats={selectedSeats}
            onToggleSeat={onToggleSeat}
          />
        </div>
      </article>

      <article
        aria-labelledby="lower-deck-heading"
        className="relative overflow-hidden rounded-[2rem_2rem_4rem_4rem] border border-ivory/20 bg-[#2a1915] px-3 pb-12 pt-8 text-ivory shadow-xl sm:px-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e59065]">Enclosed cabin</p>
            <h3 id="lower-deck-heading" className="mt-1 font-serif text-3xl">{lowerDeck.label}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-ivory/70">{lowerDeck.description}</p>
          </div>
          <div className="rounded-2xl border border-ivory/15 bg-ivory/5 p-3 text-center text-xs font-bold uppercase tracking-wider text-ivory/65">
            <Anchor className="mx-auto mb-1" size={20} aria-hidden="true" />
            Crew
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-sm">
          <div className="rounded-[2rem] border border-ivory/15 bg-ivory/5 p-3 sm:p-4">
            <p className="mb-3 text-center text-[0.65rem] font-bold uppercase tracking-[0.24em] text-sand">Lounge side one</p>
            <SeatGroup
              deckLabel={lowerDeck.label}
              labels={lowerDeckSeatGroups[0]}
              selectedSeats={selectedSeats}
              onToggleSeat={onToggleSeat}
            />
          </div>
          <div className="my-3 grid grid-cols-2 gap-3" aria-hidden="true">
            <div className="rounded-full border border-sand/30 bg-sand/10 py-2 text-center text-[0.65rem] font-bold uppercase tracking-widest text-sand">Table</div>
            <div className="rounded-full border border-sand/30 bg-sand/10 py-2 text-center text-[0.65rem] font-bold uppercase tracking-widest text-sand">Table</div>
          </div>
          <div className="rounded-[2rem] border border-ivory/15 bg-ivory/5 p-3 sm:p-4">
            <SeatGroup
              deckLabel={lowerDeck.label}
              labels={lowerDeckSeatGroups[1]}
              selectedSeats={selectedSeats}
              onToggleSeat={onToggleSeat}
            />
            <p className="mt-3 text-center text-[0.65rem] font-bold uppercase tracking-[0.24em] text-sand">Lounge side two</p>
          </div>
        </div>
      </article>
    </div>
  );
}
