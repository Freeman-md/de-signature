export const deckIds = ["upper", "lower"] as const;

export type DeckId = (typeof deckIds)[number];
export type SeatVisualVariant = "chair" | "lounge-segment";

type SeatPlacement = {
  label: string;
  deck: DeckId;
  visualGroup: "upper-port" | "upper-starboard" | "cabin-forward" | "cabin-aft";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  variant: SeatVisualVariant;
};

export const seatMap = [
  { label: "A", deck: "upper", visualGroup: "upper-port", x: 27, y: 31, width: 16, height: 9, rotation: 2, variant: "chair" },
  { label: "B", deck: "upper", visualGroup: "upper-port", x: 27, y: 41.5, width: 16, height: 9, rotation: 1, variant: "chair" },
  { label: "C", deck: "upper", visualGroup: "upper-port", x: 27, y: 52, width: 16, height: 9, rotation: 0, variant: "chair" },
  { label: "D", deck: "upper", visualGroup: "upper-port", x: 27, y: 62.5, width: 16, height: 9, rotation: -1, variant: "chair" },
  { label: "E", deck: "upper", visualGroup: "upper-port", x: 27, y: 73, width: 16, height: 9, rotation: -2, variant: "chair" },
  { label: "F", deck: "upper", visualGroup: "upper-starboard", x: 73, y: 31, width: 16, height: 9, rotation: -2, variant: "chair" },
  { label: "G", deck: "upper", visualGroup: "upper-starboard", x: 73, y: 41.5, width: 16, height: 9, rotation: -1, variant: "chair" },
  { label: "H", deck: "upper", visualGroup: "upper-starboard", x: 73, y: 52, width: 16, height: 9, rotation: 0, variant: "chair" },
  { label: "I", deck: "upper", visualGroup: "upper-starboard", x: 73, y: 62.5, width: 16, height: 9, rotation: 1, variant: "chair" },
  { label: "J", deck: "upper", visualGroup: "upper-starboard", x: 73, y: 73, width: 16, height: 9, rotation: 2, variant: "chair" },
  { label: "K", deck: "lower", visualGroup: "cabin-forward", x: 27, y: 31, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "L", deck: "lower", visualGroup: "cabin-forward", x: 27, y: 40.5, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "M", deck: "lower", visualGroup: "cabin-forward", x: 73, y: 31, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "N", deck: "lower", visualGroup: "cabin-forward", x: 73, y: 40.5, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "O", deck: "lower", visualGroup: "cabin-forward", x: 50, y: 25.5, width: 18, height: 8, rotation: 0, variant: "lounge-segment" },
  { label: "P", deck: "lower", visualGroup: "cabin-aft", x: 27, y: 64, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "Q", deck: "lower", visualGroup: "cabin-aft", x: 27, y: 73.5, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "R", deck: "lower", visualGroup: "cabin-aft", x: 73, y: 64, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "S", deck: "lower", visualGroup: "cabin-aft", x: 73, y: 73.5, width: 18, height: 9, rotation: 0, variant: "lounge-segment" },
  { label: "T", deck: "lower", visualGroup: "cabin-aft", x: 50, y: 79, width: 18, height: 8, rotation: 0, variant: "lounge-segment" },
] as const satisfies readonly SeatPlacement[];

export type SeatLabel = (typeof seatMap)[number]["label"];
export type BoatSeat = (typeof seatMap)[number];

export const seatLabels = Object.freeze(
  seatMap.map((seat) => seat.label),
) as readonly SeatLabel[];

export const upperDeckSeatGroups = [
  seatMap.filter((seat) => seat.visualGroup === "upper-port").map((seat) => seat.label),
  seatMap.filter((seat) => seat.visualGroup === "upper-starboard").map((seat) => seat.label),
] as const;

export const lowerDeckSeatGroups = [
  seatMap.filter((seat) => seat.visualGroup === "cabin-forward").map((seat) => seat.label),
  seatMap.filter((seat) => seat.visualGroup === "cabin-aft").map((seat) => seat.label),
] as const;

export const boatDecks = [
  {
    id: "upper",
    label: "Upper Deck",
    eyebrow: "Open-air deck",
    description: "Seats A through J face the central aisle, with the helm at the bow and crew zone at the stern.",
    seatGroups: upperDeckSeatGroups,
    seats: seatMap.filter((seat) => seat.deck === "upper"),
  },
  {
    id: "lower",
    label: "Lower Deck",
    eyebrow: "Enclosed cabin",
    description: "Seats K through T form two lounge groups around the cabin tables and central passage.",
    seatGroups: lowerDeckSeatGroups,
    seats: seatMap.filter((seat) => seat.deck === "lower"),
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

export function isSeatPlacementInsideDeck(seat: BoatSeat) {
  const left = seat.x - seat.width / 2;
  const right = seat.x + seat.width / 2;
  const top = seat.y - seat.height / 2;
  const bottom = seat.y + seat.height / 2;

  return left >= 0 && right <= 100 && top >= 0 && bottom <= 100;
}
