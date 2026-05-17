/**
 * Cocktail domain types + search helpers for the Bar Program tab.
 *
 * Data lives in `src/data/cocktails.ts` (hand-edited).
 * Display lives in `src/components/CocktailCard.tsx`.
 * Page route lives in `src/routes/bar.tsx`.
 *
 * Add a new cocktail: append an object to COCKTAILS in src/data/cocktails.ts.
 * Add a new field: extend the `Cocktail` type here, then update CocktailCard
 * to render it. Search picks up new string fields automatically as long as
 * they're listed in `searchHaystack` below.
 */

import { COCKTAILS } from "@/data/cocktails";

export type RecipeLine = string;

export type IngredientNote = {
  name: string;
  note: string;
};

export type Cocktail = {
  /** Stable slug, used as React key and (later) URL hash. */
  id: string;
  /** Display name on the menu. */
  name: string;
  /** Single-line guest-facing description (what appears on the menu). */
  menuDescription: string;
  /** Short flavor / vibe summary. */
  character: string;
  /** "A La Minute" build, line by line. Empty array if not applicable. */
  aLaMinute: RecipeLine[];
  /** Batched / service build, line by line. Empty array if not applicable. */
  batched: RecipeLine[];
  /** Ingredient call-outs with explanatory notes. */
  ingredients: IngredientNote[];
  /** Optional backstory / inspiration. */
  story?: string;
  /** Garnish description. */
  garnish: string;
  /**
   * Searchable allergen / dietary tags (e.g. "Citrus", "Honey", "Nuts").
   * Empty array means "no notable restrictions" (was "N/A" on the source doc).
   */
  dietaryRestrictions: string[];
  /** What can be flexed/modified at guest request. */
  modifications: string;
  /** Menu price in USD. `null` for BTG / unpriced specs. */
  price: number | null;
  /** Optional tags for future filtering (e.g. "N/A", "Spirit-forward"). */
  tags?: string[];
};

export const ALL_COCKTAILS: Cocktail[] = COCKTAILS;

/**
 * Flatten every searchable string on a cocktail into one lowercase blob.
 * Update this when you add a new searchable field to the Cocktail type.
 */
export function searchHaystack(c: Cocktail): string {
  return [
    c.name,
    c.menuDescription,
    c.character,
    c.story ?? "",
    c.garnish,
    c.modifications,
    ...c.aLaMinute,
    ...c.batched,
    ...c.ingredients.flatMap((i) => [i.name, i.note]),
    ...c.dietaryRestrictions,
    ...(c.tags ?? []),
  ]
    .join(" \u0001 ")
    .toLowerCase();
}

/**
 * Filter cocktails by a free-text query. Splits on whitespace so a multi-word
 * query like "citrus gin" must match BOTH tokens somewhere on the card.
 */
export function filterCocktails(query: string, list: Cocktail[] = ALL_COCKTAILS): Cocktail[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const tokens = q.split(/\s+/).filter(Boolean);
  return list.filter((c) => {
    const hay = searchHaystack(c);
    return tokens.every((t) => hay.includes(t));
  });
}

/** Format a price as "$19" or em-dash if null. */
export function formatCocktailPrice(c: Cocktail): string {
  return c.price == null ? "—" : `$${c.price}`;
}

/** All unique dietary tags across the menu (for future chip filters). */
export function allDietaryTags(list: Cocktail[] = ALL_COCKTAILS): string[] {
  const set = new Set<string>();
  for (const c of list) for (const d of c.dietaryRestrictions) set.add(d);
  return [...set].sort((a, b) => a.localeCompare(b));
}