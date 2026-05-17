import type { Wine } from "@/lib/wines";
import { ALL_WINES } from "@/lib/wines";
import type { Region } from "@/data/education";

/**
 * Find wines from the imported wine list that match a region's hay-substrings.
 * Matches against region, cuvee, varietal, producer (all lowercased).
 */
export function winesForRegion(region: Region): Wine[] {
  const needles = region.wineMatch.map((s) => s.toLowerCase());
  return ALL_WINES.filter((w) => {
    const hay = [w.region, w.cuvee, w.varietal, w.producer]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return needles.some((n) => hay.includes(n));
  });
}

/** Emoji icon based on wine type — small visual cue beside each listing. */
export function wineEmoji(w: Wine): string {
  switch (w.type) {
    case "Sparkling": return "🥂";
    case "White": return "🥂";
    case "Rosé": return "🌸";
    case "Red": return "🍷";
    case "Dessert": return "🍯";
    case "Orange": return "🟠";
    default: return "🍾";
  }
}