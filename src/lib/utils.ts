import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes conditionally and safely.
 * Use this instead of string concatenation for className props.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
