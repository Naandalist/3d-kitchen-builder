import type { KitchenDesign } from "@/types/kitchen";

export const STORAGE_KEY = "3d-kitchen-builder:design";

export function saveDesign(design: KitchenDesign) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(design));
}

export function loadDesign(): KitchenDesign | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as KitchenDesign;
    return parsed.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}
