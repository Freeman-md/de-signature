import { describe, expect, it } from "vitest";

import { formatNaira, reservationPackages } from "@/features/reservations/content";

describe("reservation packages", () => {
  it("has exactly three packages whose item values match their totals", () => {
    expect(reservationPackages).toHaveLength(3);

    for (const reservationPackage of reservationPackages) {
      expect(reservationPackage.items.reduce((total, item) => total + item.value, 0)).toBe(reservationPackage.price);
    }
  });

  it("formats package values as Nigerian naira", () => {
    expect(formatNaira(1_000_000)).toBe("₦1,000,000");
  });

  it("uses The Signature branding in every platter name", () => {
    const platterNames = reservationPackages.flatMap((reservationPackage) =>
      reservationPackage.items
        .map((item) => item.name)
        .filter((name) => name.includes("Signature")),
    );

    expect(platterNames).toEqual([
      "The Signature Platter",
      "The Signature Platter",
      "The Signature Platter",
    ]);
  });
});
