import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const publicPaths_Client = ["/", "/about"];

export enum FormElementTypes {
  Email = "email",
  PhoneNumber = "phone_number",
  Address = "address",
  Website = "website",
  Rating = "rating",
}
