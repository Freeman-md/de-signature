"use client";

import { Anchor, Compass } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { boatDecks, type DeckId, type SeatLabel } from "../seat-map";
import { BoatDeckArtwork } from "./BoatDeckArtwork";
import { SeatButton } from "./SeatButton";

type BoatSeatSelectorProps = {
  selectedSeats: readonly SeatLabel[];
  onToggleSeat: (label: SeatLabel) => void;
};

function selectedCountForDeck(deck: DeckId, selectedSeats: readonly SeatLabel[]) {
  const deckLabels = new Set(
    boatDecks.find((candidate) => candidate.id === deck)?.seats.map((seat) => seat.label),
  );
  return selectedSeats.filter((label) => deckLabels.has(label)).length;
}

export function BoatSeatSelector({
  selectedSeats,
  onToggleSeat,
}: BoatSeatSelectorProps) {
  const [activeDeck, setActiveDeck] = useState<DeckId>("upper");

  return (
    <div className="mt-9" data-testid="boat-seat-selector">
      <div
        aria-label="Choose a deck to inspect"
        className="mx-auto grid max-w-md grid-cols-2 rounded-full border border-ink/15 bg-white/60 p-1.5 shadow-sm lg:hidden"
        role="group"
      >
        {boatDecks.map((deck) => {
          const selectedCount = selectedCountForDeck(deck.id, selectedSeats);
          const countText = selectedCount === 1 ? "1 selected" : `${selectedCount} selected`;

          return (
            <button
              key={deck.id}
              type="button"
              aria-controls={`${deck.id}-deck-plan`}
              aria-pressed={activeDeck === deck.id}
              onClick={() => setActiveDeck(deck.id)}
              className={cn(
                "min-h-11 rounded-full px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ember/45",
                activeDeck === deck.id
                  ? "bg-ink text-ivory shadow-md"
                  : "text-ink/70 hover:bg-ivory",
              )}
            >
              <span className="block">{deck.label}</span>
              <span className={cn("block text-[0.65rem] font-semibold", activeDeck === deck.id ? "text-sand" : "text-ink/50")}>
                {countText}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-7 lg:grid-cols-2">
        {boatDecks.map((deck) => {
          const isActive = activeDeck === deck.id;
          const selectedCount = selectedCountForDeck(deck.id, selectedSeats);

          return (
            <article
              key={deck.id}
              id={`${deck.id}-deck-plan`}
              aria-labelledby={`${deck.id}-deck-heading`}
              data-deck={deck.id}
              className={cn(
                "boat-plan overflow-hidden rounded-[2.25rem] border border-ink/15 bg-[#211511] text-ivory shadow-2xl",
                !isActive && "hidden lg:block",
              )}
            >
              <header className="grid min-h-[9.75rem] grid-cols-[1fr_auto] items-start gap-3 border-b border-ivory/10 bg-[linear-gradient(120deg,rgba(189,79,50,.34),transparent_62%)] px-5 py-5 sm:px-7">
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#e9a077]">{deck.eyebrow}</p>
                  <h3 id={`${deck.id}-deck-heading`} className="mt-1 font-serif text-3xl sm:text-4xl">{deck.label}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-ivory/68">{deck.description}</p>
                </div>
                <div className="flex min-w-16 flex-col items-center rounded-2xl border border-ivory/15 bg-black/20 px-2 py-3 text-center">
                  {deck.id === "upper" ? <Compass size={20} aria-hidden="true" /> : <Anchor size={20} aria-hidden="true" />}
                  <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-wider text-sand">
                    {selectedCount} chosen
                  </span>
                </div>
              </header>

              <div className="boat-plan__stage relative mx-auto aspect-[2/3] w-full max-w-[34rem]" data-testid={`${deck.id}-deck-stage`}>
                <BoatDeckArtwork deck={deck.id} />
                <div className="absolute inset-0" aria-label={`${deck.label} passenger seats`}>
                  {deck.seats.map((seat) => (
                    <SeatButton
                      key={seat.label}
                      deckLabel={deck.label}
                      seat={seat}
                      isSelected={selectedSeats.includes(seat.label)}
                      onToggle={onToggleSeat}
                    />
                  ))}
                </div>
              </div>

              <footer className="border-t border-ivory/10 bg-black/20 px-5 py-4 text-xs leading-5 text-ivory/65 sm:px-7">
                <span className="font-bold uppercase tracking-[0.18em] text-sand">
                  {deck.id === "upper" ? "Bow at top · Crew at stern" : "Cabin entry at stern"}
                </span>
                <span className="mt-1 block">Each letter is an independent passenger preference. Driver and crew areas are not selectable.</span>
              </footer>
            </article>
          );
        })}
      </div>

      <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-6 text-ink/65">
        Upper Deck contains seats A–J. Lower Deck contains seats K–T. Switching decks keeps every choice you make.
      </p>
    </div>
  );
}
