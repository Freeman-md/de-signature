import { Check } from "lucide-react";

import { formatNaira, type ReservationPackage } from "../content";
import { ReservationButton } from "./ReservationButton";

export function PackageCard({ reservationPackage }: { reservationPackage: ReservationPackage }) {
  const price = formatNaira(reservationPackage.price);

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-ivory/15 bg-[#201512] p-6 shadow-2xl shadow-black/20 sm:p-8">
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
      <ReservationButton price={reservationPackage.price} className="w-full">
        Reserve this package
      </ReservationButton>
    </article>
  );
}
