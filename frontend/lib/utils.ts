/**
 * Frontend utility helpers for class names and HTML sanitization.
 */
import DOMPurify from "isomorphic-dompurify";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "Not listed";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatRelativeDate(isoDate: string | null | undefined) {
  if (!isoDate) {
    return "Recently posted";
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "Recently posted";
  }

  const diffInDays = Math.max(1, Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)));
  return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
}

export function sanitizeHtml(input: string) {
  return DOMPurify.sanitize(input);
}
