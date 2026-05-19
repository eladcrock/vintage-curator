/**
 * Study mode adapters + question generator.
 *
 * Used by /food/study and /bar/study via <StudySession>. Converts Dish or
 * Cocktail records into a common StudyItem shape, then builds quiz questions
 * for each mode. No persistence - session-only scoring.
 */

import { ALL_DISHES, type Dish } from "@/lib/food";
import { ALL_COCKTAILS, type Cocktail } from "@/lib/cocktails";

export type StudyMode = "flashcards" | "name" | "allergens" | "components";

export const STUDY_MODES: { id: StudyMode; label: string; blurb: string }[] = [
  { id: "flashcards", label: "Flashcards", blurb: "Name → details. Self-rate." },
  { id: "name", label: "Name that item", blurb: "From ingredients, pick the dish/cocktail." },
  { id: "allergens", label: "Allergen check", blurb: "Does this contain ___? Yes / no." },
  { id: "components", label: "Component quiz", blurb: "Which ingredient belongs to this item?" },
];

export type StudyItem = {
  id: string;
  name: string;
  /** Short reveal blurb (menu description / character). */
  blurb: string;
  /** Ingredient/build lines used as the prompt for "name that item". */
  promptLines: string[];
  /** Component names this item contains (for component quiz). */
  components: string[];
  /** Allergen tags this item carries. */
  allergens: string[];
  /** Extra detail lines shown on the flashcard flip. */
  extra: string[];
};

function dishToStudyItem(d: Dish): StudyItem {
  return {
    id: d.id,
    name: d.name,
    blurb: d.description,
    promptLines: d.ingredients.length
      ? d.ingredients.map((i) => i.name)
      : [d.preparation],
    components: d.ingredients.map((i) => i.name),
    allergens: d.dietaryRestrictions,
    extra: [
      d.preparation && `Prep: ${d.preparation}`,
      d.modifications && `Mods: ${d.modifications}`,
      `Price: ${d.price}`,
    ].filter(Boolean) as string[],
  };
}

function cocktailToStudyItem(c: Cocktail): StudyItem {
  const buildLines = c.aLaMinute.length ? c.aLaMinute : c.batched;
  return {
    id: c.id,
    name: c.name,
    blurb: c.character || c.menuDescription,
    promptLines: buildLines.length ? buildLines : [c.menuDescription],
    components: c.ingredients.length
      ? c.ingredients.map((i) => i.name)
      : buildLines,
    allergens: c.dietaryRestrictions,
    extra: [
      c.menuDescription && `Menu: ${c.menuDescription}`,
      c.garnish && `Garnish: ${c.garnish}`,
      c.modifications && `Mods: ${c.modifications}`,
      c.price != null && `Price: $${c.price}`,
    ].filter(Boolean) as string[],
  };
}

export function getFoodStudyItems(): StudyItem[] {
  return ALL_DISHES.filter((d) => d.category !== "Lunch Only").map(dishToStudyItem);
}

export function getBarStudyItems(): StudyItem[] {
  return ALL_COCKTAILS.map(cocktailToStudyItem);
}

// ----- Question generation -----

export type Question =
  | {
      mode: "flashcards";
      item: StudyItem;
    }
  | {
      mode: "name";
      item: StudyItem;
      choices: string[]; // item names
      answer: string;
    }
  | {
      mode: "allergens";
      item: StudyItem;
      allergen: string;
      answer: boolean; // true = contains
    }
  | {
      mode: "components";
      item: StudyItem;
      choices: string[];
      answer: string;
    };

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildQuestions(
  mode: StudyMode,
  items: StudyItem[],
  count = 10,
): Question[] {
  const pool = shuffle(items);
  const allAllergens = Array.from(
    new Set(items.flatMap((i) => i.allergens)),
  ).filter(Boolean);

  const out: Question[] = [];
  for (const item of pool) {
    if (out.length >= count) break;
    const q = buildOne(mode, item, items, allAllergens);
    if (q) out.push(q);
  }
  return out;
}

function buildOne(
  mode: StudyMode,
  item: StudyItem,
  items: StudyItem[],
  allAllergens: string[],
): Question | null {
  if (mode === "flashcards") {
    return { mode, item };
  }
  if (mode === "name") {
    if (!item.promptLines.length) return null;
    const distractors = shuffle(items.filter((i) => i.id !== item.id))
      .slice(0, 3)
      .map((i) => i.name);
    if (distractors.length < 3) return null;
    return {
      mode,
      item,
      choices: shuffle([item.name, ...distractors]),
      answer: item.name,
    };
  }
  if (mode === "allergens") {
    if (!allAllergens.length) return null;
    const askPresent = Math.random() < 0.5 && item.allergens.length > 0;
    let allergen: string;
    if (askPresent) {
      allergen = pick(item.allergens);
    } else {
      const missing = allAllergens.filter((a) => !item.allergens.includes(a));
      if (!missing.length) {
        if (!item.allergens.length) return null;
        allergen = pick(item.allergens);
      } else {
        allergen = pick(missing);
      }
    }
    return {
      mode,
      item,
      allergen,
      answer: item.allergens.includes(allergen),
    };
  }
  if (mode === "components") {
    if (!item.components.length) return null;
    const correct = pick(item.components);
    const otherComponents = Array.from(
      new Set(
        items
          .filter((i) => i.id !== item.id)
          .flatMap((i) => i.components)
          .filter((c) => !item.components.includes(c)),
      ),
    );
    const distractors = shuffle(otherComponents).slice(0, 3);
    if (distractors.length < 3) return null;
    return {
      mode,
      item,
      choices: shuffle([correct, ...distractors]),
      answer: correct,
    };
  }
  return null;
}