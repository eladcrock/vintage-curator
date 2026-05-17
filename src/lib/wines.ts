import winesData from "@/data/wines.json";

export type Wine = {
  id: number;
  code: string | null;
  vintage: number | "NV" | "MV";
  producer: string;
  cuvee: string | null;
  varietal: string | null;
  region: string | null;
  country: string | null;
  type: "Sparkling" | "White" | "Red" | "Rosé" | "Orange" | "Dessert" | "Other";
  priceGlass: number | null;
  priceBottle: number | null;
  size: string | null;
  byTheGlass: boolean;
  largeFormat: boolean;
};

export const ALL_WINES: Wine[] = winesData as Wine[];

export const WINE_TYPES = [
  "Sparkling",
  "White",
  "Rosé",
  "Orange",
  "Red",
  "Dessert",
] as const;

export type WineTypeFilter = (typeof WINE_TYPES)[number];

export function vintageRange(wines: Wine[]): [number, number] {
  const years = wines
    .map((w) => (typeof w.vintage === "number" ? w.vintage : null))
    .filter((y): y is number => y !== null);
  return [Math.min(...years), Math.max(...years)];
}

export function bottlePriceRange(wines: Wine[]): [number, number] {
  const prices = wines
    .map((w) => w.priceBottle ?? w.priceGlass ?? null)
    .filter((p): p is number => p !== null);
  return [Math.min(...prices), Math.max(...prices)];
}

export function displayPrice(w: Wine): string {
  const parts: string[] = [];
  if (w.priceGlass != null) parts.push(`$${w.priceGlass} glass`);
  if (w.priceBottle != null) {
    const sizeLabel = w.size && w.size !== "750mL" ? ` ${w.size}` : "";
    parts.push(`$${w.priceBottle}${sizeLabel}`);
  }
  return parts.join("  ·  ");
}

export function wineSubtitle(w: Wine): string {
  return [w.cuvee, w.varietal, [w.region, w.country].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}