// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ReservationFlow } from "@/features/reservations/components/ReservationFlow";
import { seatLabels } from "@/features/reservations/seat-map";

afterEach(cleanup);

describe("integrated package and seat reservation flow", () => {
  it("renders both decks, all 20 seat buttons, and the selection legend", () => {
    render(<ReservationFlow phoneNumber="2348012345678" />);

    expect(screen.getByRole("heading", { name: "Upper Deck" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Lower Deck" })).toBeTruthy();

    for (const label of seatLabels) {
      const deck = label <= "J" ? "Upper Deck" : "Lower Deck";
      const seat = screen.getByRole("button", { name: `${deck} seat ${label}` });
      expect(seat.tagName).toBe("BUTTON");
      expect(seat.getAttribute("aria-pressed")).toBe("false");
    }

    const legend = screen.getByLabelText("Seat selection legend");
    expect(within(legend).getByText("Available")).toBeTruthy();
    expect(within(legend).getByText("Selected")).toBeTruthy();
  });

  it("selects and deselects multiple seats with accessible state", () => {
    render(<ReservationFlow phoneNumber="2348012345678" />);
    const seatA = screen.getByRole("button", { name: "Upper Deck seat A" });
    const seatT = screen.getByRole("button", { name: "Lower Deck seat T" });

    fireEvent.click(seatT);
    fireEvent.click(seatA);

    expect(seatA.getAttribute("aria-pressed")).toBe("true");
    expect(seatT.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("A, T")).toBeTruthy();

    fireEvent.click(seatA);

    expect(seatA.getAttribute("aria-pressed")).toBe("false");
    expect(seatT.getAttribute("aria-pressed")).toBe("true");
  });

  it("preserves selections while switching the inspected deck", () => {
    render(<ReservationFlow phoneNumber="2348012345678" />);

    fireEvent.click(screen.getByRole("button", { name: "Upper Deck seat C" }));
    fireEvent.click(screen.getByRole("button", { name: /Lower Deck 0 selected/ }));
    fireEvent.click(screen.getByRole("button", { name: "Lower Deck seat R" }));
    fireEvent.click(screen.getByRole("button", { name: /Upper Deck 1 selected/ }));

    expect(
      screen.getByRole("button", { name: "Upper Deck seat C" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: "Lower Deck seat R" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(screen.getByText("C, R")).toBeTruthy();
  });

  it("does not expose driver or crew regions as passenger controls", () => {
    render(<ReservationFlow phoneNumber="2348012345678" />);

    expect(screen.queryByRole("button", { name: /driver/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /crew/i })).toBeNull();
    expect(screen.getAllByRole("button", { name: /Deck seat [A-T]$/ })).toHaveLength(20);
  });

  it("keeps the final action unavailable until a package and seat are selected", () => {
    render(<ReservationFlow phoneNumber="2348012345678" />);

    const initialAction = screen.getByRole("button", {
      name: "Reserve package and seats",
    });
    expect(initialAction.hasAttribute("disabled")).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Upper Deck seat A" }));
    expect(
      screen.getByRole("button", { name: "Reserve package and seats" }).hasAttribute("disabled"),
    ).toBe(true);
    expect(screen.getByText("Choose a package to continue.")).toBeTruthy();

    const packageButton = screen.getByRole("button", {
      name: "Select ₦2,000,000 package for the seat reservation",
    });
    fireEvent.click(packageButton);

    expect(packageButton.getAttribute("aria-pressed")).toBe("true");
    const finalAction = screen.getByRole("link", {
      name: "Reserve selected package and seats on WhatsApp",
    });
    const decodedLink = decodeURIComponent(finalAction.getAttribute("href") ?? "");
    expect(decodedLink).toContain("seat A");
    expect(decodedLink).toContain("₦2,000,000");
    expect(decodedLink).toContain("The Signature");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Select ₦500,000 package for the seat reservation",
      }),
    );
    expect(packageButton.getAttribute("aria-pressed")).toBe("false");
    expect(
      screen
        .getByRole("button", {
          name: "Selected ₦500,000 package for the seat reservation",
        })
        .getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      decodeURIComponent(
        screen
          .getByRole("link", {
            name: "Reserve selected package and seats on WhatsApp",
          })
          .getAttribute("href") ?? "",
      ),
    ).toContain("₦500,000");

    fireEvent.click(screen.getByRole("button", { name: "Upper Deck seat A" }));
    expect(
      screen.getByRole("button", { name: "Reserve package and seats" }).hasAttribute("disabled"),
    ).toBe(true);
  });

  it("fails safely when the WhatsApp number is not configured", () => {
    render(<ReservationFlow phoneNumber={null} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Select ₦1,000,000 package for the seat reservation",
      }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Upper Deck seat B" }));

    expect(
      screen.getByRole("button", { name: "Reserve package and seats" }).hasAttribute("disabled"),
    ).toBe(true);
    expect(
      screen.getByText("Reservations are being set up. Please check back shortly."),
    ).toBeTruthy();
  });
});
