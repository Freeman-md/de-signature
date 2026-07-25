import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({ default: () => <span data-testid="image" /> }));

import HomePage from "@/app/page";
import { reservationPackages } from "@/features/reservations/content";

describe("the public reservation page", () => {
  it("renders all package prices, included items, and named reservation controls", () => {
    const page = renderToStaticMarkup(<HomePage />);

    for (const reservationPackage of reservationPackages) {
      expect(page).toContain(`₦${reservationPackage.price.toLocaleString("en-NG")}`);
      for (const item of reservationPackage.items) expect(page).toContain(item.name);
    }

    expect(page).toContain("Reserve a package");
    expect(page).toContain("View packages");
    expect(page).toContain("Start a WhatsApp reservation");
  });
});
