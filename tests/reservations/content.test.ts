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
});
