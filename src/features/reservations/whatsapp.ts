import { formatNaira } from "./content";

export function getReservationPhoneNumber(value = process.env.NEXT_PUBLIC_WHATSAPP_RESERVATION_PHONE) {
  const digits = value?.replace(/[^\d]/g, "");
  return digits && /^\d{7,15}$/.test(digits) ? digits : null;
}

export function createReservationMessage(packagePrice: number) {
  return `Hi, I'd like to reserve the ${formatNaira(packagePrice)} package for De Signature.`;
}

export function createWhatsAppReservationLink(packagePrice: number, phoneNumber = getReservationPhoneNumber()) {
  if (!phoneNumber) return null;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(createReservationMessage(packagePrice))}`;
}
