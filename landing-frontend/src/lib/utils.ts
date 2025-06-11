import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 500
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
