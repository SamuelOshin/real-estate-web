import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Variants are the extension point (SOLID: Open/Closed) — add a new look by
 * adding a variant here, never by editing call sites or forking the
 * component. Matches docs/design-system.md "Primary & Secondary Action
 * Buttons".
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded font-body text-label-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary:
          "bg-surface-tint text-primary border border-badge-gazette-border hover:bg-surface-tint-strong",
        verified: "bg-verified text-white hover:brightness-95",
        ghost: "bg-transparent text-primary hover:bg-surface-tint",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-6",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
