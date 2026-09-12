import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Elevation levels map 1:1 to docs/design-system.md ("Elevation" section).
 * `flat` = Level 0 (border only), `resting` = Level 1, `hover` = Level 2
 * pre-applied for cards that should always look interactive (e.g. property
 * cards), `modal` = Level 3.
 */
const cardVariants = cva("rounded-lg border border-border bg-surface-card", {
  variants: {
    elevation: {
      flat: "",
      resting: "shadow-1",
      interactive: "shadow-1 transition-shadow hover:shadow-2",
      modal: "shadow-3 backdrop-blur-sm bg-white/95",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    elevation: "resting",
    padding: "md",
  },
});

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ elevation, padding }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";
