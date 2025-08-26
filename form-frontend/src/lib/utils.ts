import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait<T>(fn: () => T, delay = 500 as number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delay);
  });
}
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * A debounce function that delays the execution of a function until a specified time has passed without any new calls.
 * This is useful for performance optimization in scenarios like user input validation, window resizing, or search bars.
 *
 * @template T The type of the function to debounce.
 * @param func The function to be debounced.
 * @param wait The time in milliseconds to wait before executing the function.
 * @returns A new, debounced function with the same signature as the original function.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // Use a variable to hold the timeout ID, allowing us to clear it.
  let timeout: ReturnType<typeof setTimeout>;

  // Return a new function that will be the debounced version.
  return (...args: Parameters<T>): void => {
    // Clear the previous timeout to reset the delay.
    clearTimeout(timeout);

    // Set a new timeout. When it completes, call the original function with the correct 'this' context and arguments.
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
