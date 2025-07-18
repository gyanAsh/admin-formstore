import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthToken() {
  return localStorage.getItem("auth-token") ?? "";
}

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  wait = 500
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

export function generateMicroId(length = 12): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  const randomValues = new Uint8Array(length);

  // Fill array with secure random numbers
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    // Use modulo to pick a character from the allowed set
    result += characters[randomValues[i] % charactersLength];
  }

  return result;
}

export type tw_colors =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone";

/**
 * Converts an ISO 8601 date string to a formatted date string in the format 'dd MMM, yyyy . h:mma'
 * adjusted to the Asia/Kolkata timezone.
 *
 * @param {string} isoString - The ISO 8601 date string to format (e.g., '2025-05-15T17:41:40.81856Z').
 * @returns {string} The formatted date string (e.g., '15 May, 2025 . 11:11pm').
 */
export function formatDateISO(isoString: string) {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const parts = formatter.formatToParts(date);

  const day = parts.find((p) => p.type === "day")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const year = parts.find((p) => p.type === "year")?.value;

  if (day && month && year) {
    return `${day} ${month} ${year}`;
  } else {
    return isoString;
  }
}

export function getTimeAgo(updatedAt: string): string {
  const updatedDate = new Date(updatedAt);
  const now = new Date();

  const diffInMs = now.getTime() - updatedDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
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
