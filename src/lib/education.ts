import type { Wine } from "@/lib/wines";
import { ALL_WINES } from "@/lib/wines";
import type { Region } from "@/data/education";

/**
 * Mindmap zone color tokens. Each value is an oklch CSS color used both
 * for the region pin on the map and the accent stripe on the expanded card.
 */
export const ZONE_COLORS: Record<string, string> = {
  // Italy
  "North":            "oklch(0.62 0.18 145)",  // green – Alpine north
  "Central":          "oklch(0.66 0.17 55)",   // amber – Tuscan sun
  "South & Islands":  "oklch(0.62 0.20 30)",   // terracotta – Mezzogiorno
  // France
  "Left Bank":        "oklch(0.55 0.18 260)",  // indigo – Atlantic
  "Right Bank":       "oklch(0.55 0.20 350)",  // claret
  "Bordeaux":         "oklch(0.55 0.18 320)",  // bordeaux pink
  "Burgundy":         "oklch(0.50 0.18 20)",   // burgundy red
};

export function zoneColor(zone?: string): string {
  return (zone && ZONE_COLORS[zone]) || "oklch(0.6 0.05 250)";
}

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