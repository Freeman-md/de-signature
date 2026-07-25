import { describe, expect, it } from "vitest";

import { createReservationMessage, createWhatsAppReservationLink, getReservationPhoneNumber } from "@/features/reservations/whatsapp";

describe("WhatsApp reservations", () => {
  it("creates a deep link containing De Signature and the selected package", () => {
    const link = createWhatsAppReservationLink(1_000_000, "2348012345678");

    expect(link).toContain("https://wa.me/2348012345678");
    expect(decodeURIComponent(link ?? "")).toContain("De Signature");
    expect(decodeURIComponent(link ?? "")).toContain("₦1,000,000");
    expect(createReservationMessage(1_000_000)).toContain("₦1,000,000");
  });

  it("does not return a link for missing or invalid configuration", () => {
    expect(createWhatsAppReservationLink(500_000, undefined)).toBeNull();
    expect(getReservationPhoneNumber("not-a-phone")).toBeNull();
  });
});
