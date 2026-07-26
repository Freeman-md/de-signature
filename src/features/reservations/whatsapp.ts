import { formatNaira } from "./content";
import { sortSeatLabels, type SeatLabel } from "./seat-map";

export function getReservationPhoneNumber(value = process.env.NEXT_PUBLIC_WHATSAPP_RESERVATION_PHONE) {
  const digits = value?.replace(/[^\d]/g, "");
  return digits && /^\d{7,15}$/.test(digits) ? digits : null;
}

export function createReservationMessage(packagePrice: number) {
  return `Hi, I'd like to reserve the ${formatNaira(packagePrice)} package for The Signature.`;
}

export function createWhatsAppReservationLink(packagePrice: number, phoneNumber = getReservationPhoneNumber()) {
  const validPhoneNumber = getReservationPhoneNumber(phoneNumber ?? "");
  if (!validPhoneNumber) return null;
  return `https://wa.me/${validPhoneNumber}?text=${encodeURIComponent(createReservationMessage(packagePrice))}`;
}

function formatSeatList(labels: readonly SeatLabel[]) {
  const sortedLabels = sortSeatLabels(labels);

  if (sortedLabels.length < 2) return sortedLabels[0] ?? "";
  if (sortedLabels.length === 2) return sortedLabels.join(" and ");

  return `${sortedLabels.slice(0, -1).join(", ")} and ${sortedLabels.at(-1)}`;
}

export function createSeatReservationMessage(
  packagePrice: number,
  seatLabels: readonly SeatLabel[],
) {
  const orderedSeats = formatSeatList(seatLabels);
  const seatWord = seatLabels.length === 1 ? "seat" : "seats";

  return `Hi, I'd like to reserve ${seatWord} ${orderedSeats} with the ${formatNaira(packagePrice)} package for The Signature.`;
}

export function createSeatReservationWhatsAppLink(
  packagePrice: number | null,
  selectedSeats: readonly SeatLabel[],
  phoneNumber = getReservationPhoneNumber(),
) {
  const validPhoneNumber = getReservationPhoneNumber(phoneNumber ?? "");
  if (!validPhoneNumber || packagePrice === null || selectedSeats.length === 0) {
    return null;
  }

  return `https://wa.me/${validPhoneNumber}?text=${encodeURIComponent(
    createSeatReservationMessage(packagePrice, selectedSeats),
  )}`;
}
