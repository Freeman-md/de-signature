import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-ivory text-ink hover:bg-white",
        outline: "border border-ivory/60 bg-transparent text-ivory hover:border-ivory hover:bg-ivory/10",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
