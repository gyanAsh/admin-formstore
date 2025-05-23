import { FormFields } from "@/store/forms/form-elemets.types";
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
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const dayPeriod = parts
    .find((p) => p.type === "dayPeriod")
    ?.value.toLowerCase();

  if (day && month && year && hour && minute && dayPeriod) {
    return `${day} ${month}, ${year} . ${hour}:${minute}${dayPeriod}`;
  } else {
    return isoString;
  }
}

export function getDefaultLabelTitle(fieldType: string): string {
  switch (fieldType) {
    case FormFields.email:
      return "Email Address";
    case FormFields.url:
      return "Website URL";
    case FormFields.phone:
      return "Phone Number";
    case FormFields.text:
      return "Text Input";
    default:
      return "Unknown Field";
  }
}
