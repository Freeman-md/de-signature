"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatNaira, reservationPackages } from "../content";
import { sortSeatLabels, type SeatLabel } from "../seat-map";
import { createSeatReservationWhatsAppLink } from "../whatsapp";
import { BoatSeatSelector } from "./BoatSeatSelector";
import { PackageCard } from "./PackageCard";

type ReservationFlowProps = {
  phoneNumber: string | null;
};

export function ReservationFlow({ phoneNumber }: ReservationFlowProps) {
  const [selectedPackagePrice, setSelectedPackagePrice] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SeatLabel[]>([]);

  function toggleSeat(label: SeatLabel) {
    setSelectedSeats((currentSeats) =>
      currentSeats.includes(label)
        ? currentSeats.filter((seat) => seat !== label)
        : sortSeatLabels([...currentSeats, label]),
    );
  }

  const sortedSeats = sortSeatLabels(selectedSeats);
  const reservationHref = createSeatReservationWhatsAppLink(
    selectedPackagePrice,
    sortedSeats,
    phoneNumber,
  );
  const packageSummary = selectedPackagePrice
    ? formatNaira(selectedPackagePrice)
    : "No package selected";
  const seatSummary =
    sortedSeats.length > 0 ? sortedSeats.join(", ") : "No seats selected";

  let guidance = "Choose a package and at least one seat to continue.";
  if (selectedPackagePrice && sortedSeats.length === 0) {
    guidance = "Choose at least one seat to continue.";
  } else if (!selectedPackagePrice && sortedSeats.length > 0) {
    guidance = "Choose a package to continue.";
  } else if (reservationHref) {
    guidance = "Your package and seats are ready to send on WhatsApp.";
  } else if (selectedPackagePrice && sortedSeats.length > 0) {
    guidance = "Reservations are being set up. Please check back shortly.";
  }

  return (
    <>
      <section
        id="packages"
        aria-labelledby="packages-heading"
        className="bg-[#17100e] px-5 py-16 sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#e59065]">Tables, considered</p>
          <h2 id="packages-heading" className="mt-3 font-serif text-4xl text-ivory sm:text-5xl">Choose your package</h2>
          <p className="mt-4 max-w-2xl leading-7 text-ivory/70">
            Select one package for the seat-aware reservation flow, or use a package&apos;s direct WhatsApp button if you are not choosing seats yet.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {reservationPackages.map((reservationPackage) => (
              <PackageCard
                key={reservationPackage.price}
                reservationPackage={reservationPackage}
                isSelected={selectedPackagePrice === reservationPackage.price}
                onSelect={() => setSelectedPackagePrice(reservationPackage.price)}
                phoneNumber={phoneNumber}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="seats"
        aria-labelledby="seats-heading"
        className="bg-[#f0e4d4] px-5 py-16 text-ink sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember">Your place on board</p>
              <h2 id="seats-heading" className="mt-3 font-serif text-4xl sm:text-5xl">Choose your seats</h2>
              <p className="mt-4 max-w-2xl leading-7 text-ink/70">
                Select one or more passenger seats across either deck. Tap a selected seat again to remove it. Your choices are not held or booked until you speak with the team.
              </p>
            </div>
            <div aria-label="Seat selection legend" className="flex flex-wrap gap-4 text-sm font-semibold">
              <span className="inline-flex items-center gap-2">
                <span className="h-5 w-5 rounded-md border-2 border-ink/35 bg-ivory" aria-hidden="true" />
                Available
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-ivory bg-ember text-xs text-white" aria-hidden="true">✓</span>
                Selected
              </span>
            </div>
          </div>

          <BoatSeatSelector
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
          />

          <div className="mt-8 rounded-[2rem] border border-ink/15 bg-white/65 p-5 shadow-lg sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">Review selection</p>
            <div
              role="status"
              aria-live="polite"
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-ink/50">Package</span>
                <span className="mt-1 block font-serif text-2xl">{packageSummary}</span>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-ink/50">Seats</span>
                <span className="mt-1 block font-serif text-2xl">{seatSummary}</span>
              </div>
            </div>
            <p id="reservation-guidance" className="mt-5 text-sm leading-6 text-ink/70">{guidance}</p>
            <div className="mt-5">
              {reservationHref ? (
                <Button asChild className="w-full sm:w-auto">
                  <a
                    href={reservationHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Reserve selected package and seats on WhatsApp"
                  >
                    <MessageCircle aria-hidden="true" size={18} />
                    Reserve package and seats
                  </a>
                </Button>
              ) : (
                <Button
                  disabled
                  aria-describedby="reservation-guidance"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle aria-hidden="true" size={18} />
                  Reserve package and seats
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
