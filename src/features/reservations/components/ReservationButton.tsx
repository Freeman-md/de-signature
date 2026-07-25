import { MessageCircle } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { createWhatsAppReservationLink } from "../whatsapp";

type ReservationButtonProps = Pick<ButtonProps, "className" | "variant"> & {
  price: number;
  children: React.ReactNode;
};

export function ReservationButton({ price, children, ...buttonProps }: ReservationButtonProps) {
  const href = createWhatsAppReservationLink(price);

  if (!href) {
    return (
      <Button disabled aria-describedby="reservation-setup-note" {...buttonProps}>
        <MessageCircle aria-hidden="true" size={18} />
        {children}
      </Button>
    );
  }

  return (
    <Button asChild {...buttonProps}>
      <a href={href} target="_blank" rel="noreferrer" aria-label={`Reserve the ${price.toLocaleString("en-NG")} naira package on WhatsApp`}>
        <MessageCircle aria-hidden="true" size={18} />
        {children}
      </a>
    </Button>
  );
}
