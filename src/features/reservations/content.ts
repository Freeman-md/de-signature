export type ReservationItem = {
  name: string;
  value: number;
  quantity?: number;
};

export type ReservationPackage = {
  price: number;
  items: readonly ReservationItem[];
  isRecommended?: boolean;
};

export const reservationPackages = [
  {
    price: 2_000_000,
    items: [
      { name: "Don Julio", value: 850_000 },
      { name: "Bumbu Cream", value: 500_000 },
      { name: "Belaire Rosé", quantity: 2, value: 600_000 },
      { name: "The Signature Platter", value: 50_000 },
    ],
  },
  {
    price: 1_000_000,
    items: [
      { name: "Casamigos", value: 500_000 },
      { name: "Rémy Martin VSOP", value: 300_000 },
      { name: "Crema di Cappuccino", value: 150_000 },
      { name: "The Signature Platter", value: 50_000 },
    ],
  },
  {
    price: 500_000,
    items: [
      { name: "Hennessy VSOP", value: 300_000 },
      { name: "Piccini Moscato", value: 150_000 },
      { name: "The Signature Platter", value: 50_000 },
    ],
  },
] as const satisfies readonly ReservationPackage[];

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
