import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Hàm này giúp gộp các class lại với nhau và xử lý xung đột
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
