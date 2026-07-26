import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatNaira, type ReservationPackage } from "../content";
import { ReservationButton } from "./ReservationButton";

type PackageCardProps = {
  reservationPackage: ReservationPackage;
  isSelected: boolean;
  onSelect: () => void;
  phoneNumber: string | null;
};

export function PackageCard({
  reservationPackage,
  isSelected,
  onSelect,
  phoneNumber,
}: PackageCardProps) {
  const price = formatNaira(reservationPackage.price);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[1.75rem] border bg-[#201512] p-6 shadow-2xl shadow-black/20 transition sm:p-8",
        isSelected
          ? "border-[#e59065] ring-2 ring-[#e59065]/45"
          : "border-ivory/15",
      )}
    >
      {isSelected && (
        <span className="absolute right-5 top-5 rounded-full bg-[#e59065] px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
          Selected
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand">Reservation package</p>
      <h3 className="mt-3 font-serif text-4xl text-ivory">{price}</h3>
      <ul className="my-7 flex-1 space-y-4 border-y border-ivory/15 py-6 text-sm text-ivory/85">
        {reservationPackage.items.map((item) => (
          <li className="flex items-start gap-3" key={item.name}>
            <Check className="mt-0.5 shrink-0 text-[#e59065]" size={16} aria-hidden="true" />
            <span className="flex-1">{item.name}{item.quantity ? ` × ${item.quantity}` : ""}</span>
            <span className="whitespace-nowrap text-sand">{formatNaira(item.value)}</span>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        variant="outline"
        aria-pressed={isSelected}
        aria-label={`${isSelected ? "Selected" : "Select"} ${price} package for the seat reservation`}
        className="w-full"
        onClick={onSelect}
      >
        {isSelected ? "Package selected" : "Select for seat reservation"}
      </Button>
      <ReservationButton
        price={reservationPackage.price}
        phoneNumber={phoneNumber}
        className="mt-3 w-full"
      >
        Reserve this package
      </ReservationButton>
    </article>
  );
}
