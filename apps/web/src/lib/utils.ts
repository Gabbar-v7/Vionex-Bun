import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind conflict resolution.
 *
 * Combines `clsx` for conditional class joining and `twMerge` to resolve
 * conflicting Tailwind utilities, ensuring the last class wins.
 *
 * @param inputs - Class values: strings, arrays, or conditional objects.
 * @returns A single merged class name string.
 *
 * @example
 * cn('px-2', isActive && 'bg-blue-500', 'px-4')
 * // → 'bg-blue-500 px-4'
 *
 * @example
 * cn('text-red-500', { 'text-blue-500': true })
 * // → 'text-blue-500'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
