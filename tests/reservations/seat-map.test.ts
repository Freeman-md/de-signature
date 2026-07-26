import { describe, expect, it } from "vitest";

import {
  boatDecks,
  lowerDeckSeatGroups,
  seatLabels,
  sortSeatLabels,
  upperDeckSeatGroups,
} from "@/features/reservations/seat-map";

describe("boat seat map", () => {
  it("defines exactly 20 unique passenger seats across both decks", () => {
    expect(boatDecks[0].label).toBe("Upper Deck");
    expect(boatDecks[0].seatGroups.flat()).toEqual([
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    ]);
    expect(boatDecks[1].label).toBe("Lower Deck");
    expect(boatDecks[1].seatGroups.flat()).toEqual([
      "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    ]);
    expect(seatLabels).toHaveLength(20);
    expect(new Set(seatLabels).size).toBe(20);
  });

  it("preserves the four confirmed visual groups", () => {
    expect(upperDeckSeatGroups).toEqual([
      ["A", "B", "C", "D", "E"],
      ["F", "G", "H", "I", "J"],
    ]);
    expect(lowerDeckSeatGroups).toEqual([
      ["K", "L", "M", "N", "O"],
      ["P", "Q", "R", "S", "T"],
    ]);
  });

  it("sorts selected seats in deck order regardless of click order", () => {
    expect(sortSeatLabels(["T", "K", "B", "J", "A"])).toEqual([
      "A", "B", "J", "K", "T",
    ]);
  });
});
