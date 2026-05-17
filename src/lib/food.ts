/**
 * Food domain types + search helpers for the Food tab.
 *
 * Data lives in `src/data/food.ts` (hand-edited).
 * Display lives in `src/components/DishCard.tsx`.
 * Page route lives in `src/routes/food.tsx`.
 *
 * Add a new dish: append an object to DISHES in src/data/food.ts.
 * Add a new field: extend the `Dish` type here, then update DishCard
 * to render it. Search picks up new string fields automatically as long as
 * they're listed in `searchHaystack` below.
 */

import { DISHES } from "@/data/food";

export type FoodCategory =
  | "Antipasti"
  | "Pasta"
  | "Secondi"
  | "Contorni"
  | "Dolci"
  | "Lunch Only";

export const FOOD_CATEGORIES: FoodCategory[] = [
  "Antipasti",
  "Pasta",
  "Secondi",
  "Contorni",
  "Dolci",
  "Lunch Only",
];

export type IngredientNote = {
  name: string;
  note: string;
};

export type Dish = {
  /** Stable slug, used as React key. */
  id: string;
  /** Menu name (Italian title). */
  name: string;
  /** Section on the menu. */
  category: FoodCategory;
  /** Guest-facing menu description (one or two lines). */
  description: string;
  /** Kitchen preparation summary. */
  preparation: string;
  /** Sub-recipe breakdowns (sauces, doughs, etc.). */
  ingredients: IngredientNote[];
  /** Optional backstory / sourcing / cultural context. */
  info?: string;
  /** Approximate fire time from the ticket. */
  fireTime?: string;
  /**
   * Searchable allergen / dietary tags
   * (e.g. "Dairy", "Gluten", "Allium", "Nightshade", "Shellfish").
   * Empty array means "no notable restrictions".
   */
  dietaryRestrictions: string[];
  /** What can be flexed/modified at guest request. */
  modifications: string;
  /**
   * Internal mark codes from the printed notes (F = Food runner, K = Kitchen,
   * S = Server, SK = Steak knife, etc.). Empty / N/A → undefined.
   */
  mark?: string;
  /** Menu price line. String so we can carry "3pc $18 / 5pc $25" exactly. */
  price: string;
};

export const ALL_DISHES: Dish[] = DISHES;

/**
 * Flatten every searchable string on a dish into one lowercase blob.
 * Update this when you add a new searchable field to the Dish type.
 */
export function searchHaystack(d: Dish): string {
  return [
    d.name,
    d.category,
    d.description,
    d.preparation,
    d.info ?? "",
    d.modifications,
    ...d.ingredients.flatMap((i) => [i.name, i.note]),
    ...d.dietaryRestrictions,
  ]
    .join(" \u0001 ")
    .toLowerCase();
}

/** AND-match across whitespace-separated tokens. */
export function filterDishes(query: string, list: Dish[] = ALL_DISHES): Dish[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const tokens = q.split(/\s+/).filter(Boolean);
  return list.filter((d) => {
    const hay = searchHaystack(d);
    return tokens.every((t) => hay.includes(t));
  });
}

/** Group a dish list by category, preserving FOOD_CATEGORIES order. */
export function groupByCategory(list: Dish[]): Array<{ category: FoodCategory; dishes: Dish[] }> {
  const map = new Map<FoodCategory, Dish[]>();
  for (const c of FOOD_CATEGORIES) map.set(c, []);
  for (const d of list) map.get(d.category)?.push(d);
  return FOOD_CATEGORIES.filter((c) => (map.get(c) ?? []).length > 0).map((c) => ({
    category: c,
    dishes: map.get(c) ?? [],
  }));
}

/** All unique dietary tags across the menu (for chip filters). */
export function allDietaryTags(list: Dish[] = ALL_DISHES): string[] {
  const set = new Set<string>();
  for (const d of list) for (const t of d.dietaryRestrictions) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}