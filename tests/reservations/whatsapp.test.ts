import { describe, expect, it } from "vitest";

import {
  createReservationMessage,
  createSeatReservationMessage,
  createSeatReservationWhatsAppLink,
  createWhatsAppReservationLink,
  getReservationPhoneNumber,
} from "@/features/reservations/whatsapp";

describe("WhatsApp reservations", () => {
  it("creates a package-only deep link with The Signature branding", () => {
    const link = createWhatsAppReservationLink(1_000_000, "2348012345678");

    expect(link).toContain("https://wa.me/2348012345678");
    expect(decodeURIComponent(link ?? "")).toContain("The Signature");
    expect(decodeURIComponent(link ?? "")).toContain("₦1,000,000");
    expect(createReservationMessage(1_000_000)).toBe(
      "Hi, I'd like to reserve the ₦1,000,000 package for The Signature.",
    );
  });

  it("creates a singular seat message", () => {
    expect(createSeatReservationMessage(2_000_000, ["A"])).toBe(
      "Hi, I'd like to reserve seat A with the ₦2,000,000 package for The Signature.",
    );
  });

  it("creates a readable plural message with seats in deck order", () => {
    expect(createSeatReservationMessage(500_000, ["T", "B", "A"])).toBe(
      "Hi, I'd like to reserve seats A, B and T with the ₦500,000 package for The Signature.",
    );
  });

  it("does not return a link for missing or invalid configuration", () => {
    expect(createWhatsAppReservationLink(500_000, null)).toBeNull();
    expect(createWhatsAppReservationLink(500_000, "invalid")).toBeNull();
    expect(createSeatReservationWhatsAppLink(500_000, ["A"], null)).toBeNull();
    expect(createSeatReservationWhatsAppLink(500_000, ["A"], "invalid")).toBeNull();
    expect(createSeatReservationWhatsAppLink(null, ["A"], "2348012345678")).toBeNull();
    expect(createSeatReservationWhatsAppLink(500_000, [], "2348012345678")).toBeNull();
    expect(getReservationPhoneNumber("not-a-phone")).toBeNull();
  });
});
