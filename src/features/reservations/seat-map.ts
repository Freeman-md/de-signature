export const upperDeckSeatGroups = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
] as const;

export const lowerDeckSeatGroups = [
  ["K", "L", "M", "N", "O"],
  ["P", "Q", "R", "S", "T"],
] as const;

export const seatLabels = [
  ...upperDeckSeatGroups[0],
  ...upperDeckSeatGroups[1],
  ...lowerDeckSeatGroups[0],
  ...lowerDeckSeatGroups[1],
] as const;

export type SeatLabel = (typeof seatLabels)[number];

export const boatDecks = [
  {
    id: "upper",
    label: "Upper Deck",
    description: "Seats A through J in two rows of five around the central aisle.",
    seatGroups: upperDeckSeatGroups,
  },
  {
    id: "lower",
    label: "Lower Deck",
    description: "Seats K through T in two lounge groups around the cabin tables.",
    seatGroups: lowerDeckSeatGroups,
  },
] as const;

const seatOrder = new Map<SeatLabel, number>(
  seatLabels.map((label, index) => [label, index]),
);

export function sortSeatLabels(labels: readonly SeatLabel[]) {
  return [...labels].sort(
    (left, right) => (seatOrder.get(left) ?? 0) - (seatOrder.get(right) ?? 0),
  );
}
