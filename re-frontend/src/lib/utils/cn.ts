import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — later classes win over earlier conflicting
 * ones (e.g. cn("p-4", condition && "p-2") resolves to "p-2" when true).
 * Every component in ui/ that accepts a `className` prop should pass it
 * through this rather than string-concatenating.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
