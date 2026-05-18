/**
 * Curator tunables — deterministic algorithm. No AI.
 *
 * Edit these to change how the Experience Curator builds menus.
 * Logic lives in src/lib/curator.ts.
 */
import type { FoodCategory } from "@/lib/food";

/**
 * Course flow when budget allows. Earlier in the list = dropped LAST when
 * the budget is tight. (Dolci + Pasta are most protected.)
 */
export const COURSE_FLOW: FoodCategory[] = [
  "Antipasti",
  "Pasta",
  "Secondi",
  "Contorni",
  "Dolci",
];

/** Drop order when budget is too low to fit the full flow. */
export const DROP_ORDER: FoodCategory[] = ["Contorni", "Secondi", "Antipasti"];

/**
 * Dish ids tagged "premium" — reserved for the upper half of the budget
 * range, and preferred by the Indulgente menu.
 */
export const PREMIUM_DISH_IDS: string[] = [
  // Add ids of higher-end Secondi here (steaks, whole fish, etc.)
  // The algorithm also auto-detects premium by price (top 35% in category).
];

/**
 * Centerpiece dishes that can be shared across the whole table — the
 * "push steaks" toggle prefers these for the Secondo. Per-person cost
 * becomes dish total / guests.
 */
export const SHAREABLE_DISH_IDS: string[] = [
  "bistecca-fiorentina", // 40oz Porterhouse
  "wagyu-tomahawk",      // 42oz Wagyu Tomahawk
];

/**
 * Default override prices for A.Q. ("ask quote") items. The curator UI
 * surfaces these as editable inputs so the pro can set the night's price
 * before building the menu.
 */
export const AQ_PRICE_DEFAULTS: Record<string, number> = {
  "risotto-giorno": 55, // Risotto del Giorno
  "tagliere": 33,       // Tagliere di Formaggi e Salumi (crudi board)
};

/**
 * Keyword rules for ingredient/notes-based restrictions. Each rule maps a
 * restriction label to substrings checked against the dish's
 * description / dietaryRestrictions / name (case-insensitive).
 */
export const RESTRICTION_RULES: Record<string, { tags?: string[]; keywords?: string[] }> = {
  "Gluten-free": { tags: ["gluten"] },
  "Dairy-free": { tags: ["dairy"] },
  "Nut-free": { tags: ["nuts", "nut"] },
  "No pork": { tags: ["pork"], keywords: ["prosciutto", "pancetta", "guanciale", "bacon", "salami"] },
  "No shellfish": { tags: ["shellfish"], keywords: ["shrimp", "lobster", "crab", "scallop", "mussel", "clam", "prawn"] },
  "No red meat": {
    keywords: [
      "beef", "steak", "ribeye", "filet", "tenderloin", "wagyu",
      "lamb", "veal", "venison", "bistecca", "tagliata", "ossobuco", "brasato",
    ],
  },
  "Vegetarian": {
    keywords: [
      "beef", "steak", "lamb", "veal", "pork", "chicken", "duck", "rabbit",
      "fish", "salmon", "branzino", "tuna", "anchovy", "anchovies",
      "shrimp", "lobster", "crab", "scallop", "mussel", "clam", "prawn",
      "prosciutto", "pancetta", "guanciale", "bacon", "salami", "sausage",
    ],
  },
  "Vegan": {
    tags: ["dairy", "egg"],
    keywords: [
      "beef", "steak", "lamb", "veal", "pork", "chicken", "duck", "rabbit",
      "fish", "salmon", "branzino", "tuna", "anchovy", "anchovies",
      "shrimp", "lobster", "crab", "scallop", "mussel", "clam", "prawn",
      "prosciutto", "pancetta", "guanciale", "bacon", "salami", "sausage",
      "honey", "butter", "cheese", "cream", "milk", "parmigiano", "parmesan",
      "ricotta", "mozzarella", "burrata",
    ],
  },
};