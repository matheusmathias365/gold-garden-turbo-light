import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Public files under Vite `base` (GitHub Pages: `/gold-garden-turbo-light/`). */
export function assetUrl(path: string) {
  const base = import.meta.env.BASE_URL || "/";
  const clean = String(path).replace(/^\/+/, "");
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}${clean}`;
}
