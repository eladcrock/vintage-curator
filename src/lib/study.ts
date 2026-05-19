/**
 * Study mode adapters + question generator.
 *
 * Used by /food/study and /bar/study via <StudySession>. Converts Dish or
 * Cocktail records into a common StudyItem shape, then builds quiz questions
 * for each mode. No persistence - session-only scoring.
 */

import { ALL_DISHES, type Dish } from "@/lib/food";
import { ALL_COCKTAILS, type Cocktail } from "@/lib/cocktails";

export type StudyMode = "flashcards" | "missing" | "allergens" | "description";

export const STUDY_MODES: { id: StudyMode; label: string; blurb: string }[] = [
  { id: "flashcards", label: "Flashcards", blurb: "Name → details. Self-rate." },
  { id: "missing", label: "Missing ingredient", blurb: "One ingredient is blanked. Pick what fills the gap." },
  { id: "allergens", label: "Allergen check", blurb: "Does this contain ___? Yes / no." },
  { id: "description", label: "From description", blurb: "Read the description, pick the item it belongs to." },
];

export type StudyItem = {
  id: string;
  name: string;
  /** Short reveal blurb (menu description / character). */
  blurb: string;
  /** Component names this item contains (for component quiz). */
  components: string[];
  /** Allergen tags this item carries. */
  allergens: string[];
  /** Extra detail lines shown on the flashcard flip. */
  extra: string[];
  /** Loose grouping used to pick harder distractors (food category or cocktail family). */
  category?: string;
  /** Descriptive prose snippets used for the "From description" mode. */
  descriptors: string[];
};

function dishToStudyItem(d: Dish): StudyItem {
  // Parse the actual atomic ingredients out of each sub-recipe note so
  // "missing ingredient" can quiz things like "Anchovies" / "Black Garlic"
  // / "Sherry Vinegar" - shared across many dishes - instead of unique
  // sub-recipe titles like "Pistachio Pesto" that give the answer away.
  const subRecipeNames = d.ingredients.map((i) => i.name);
  const parsedIngredients = uniqueByLower(
    d.ingredients.flatMap((i) => parseIngredientList(i.note)),
  );
  // Use parsed ingredients when we have enough variety; otherwise fall back
  // to the sub-recipe names so a dish with a single note still works.
  const components = parsedIngredients.length >= 4 ? parsedIngredients : subRecipeNames;
  return {
    id: d.id,
    name: d.name,
    blurb: d.description,
    components,
    allergens: d.dietaryRestrictions,
    extra: [
      d.preparation && `Prep: ${d.preparation}`,
      d.modifications && `Mods: ${d.modifications}`,
      `Price: ${d.price}`,
    ].filter(Boolean) as string[],
    category: d.category,
    // Preparation prose is the hardest descriptor (no menu wording to lean
    // on); info adds sourcing/story context. Skip the menu description -
    // it literally lists the dish components.
    descriptors: [d.preparation, d.info ?? ""]
      .filter((s) => s && s.trim().length > 20)
      .map((s) => redactTerms(s, subRecipeNames)),
  };
}

function cocktailToStudyItem(c: Cocktail): StudyItem {
  const buildLines = c.aLaMinute.length ? c.aLaMinute : c.batched;
  return {
    id: c.id,
    name: c.name,
    blurb: c.character || c.menuDescription,
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
    category: (c.tags && c.tags[0]) || undefined,
    descriptors: [c.story ?? "", c.character ?? "", c.menuDescription ?? ""].filter(
      (s) => s && s.trim().length > 20,
    ),
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
      mode: "missing";
      item: StudyItem;
      /** Ingredient list with the missing slot replaced by null. */
      shown: (string | null)[];
      /** Index of the blanked ingredient in `shown`. */
      blankIndex: number;
      choices: string[];
      answer: string;
    }
  | {
      mode: "allergens";
      item: StudyItem;
      allergen: string;
      answer: boolean; // true = contains
    }
  | {
      mode: "description";
      item: StudyItem;
      /** Prose prompt drawn from the item's descriptors. */
      prompt: string;
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
  const allAllergens = Array.from(new Set(items.flatMap((i) => i.allergens))).filter(Boolean);

  // Allergen mode: exhaustive coverage. One "yes" question for every
  // (item, allergen-it-contains) pair, plus one balancing "no" question
  // per item so every allergen on the menu shows up in both directions.
  if (mode === "allergens") {
    const out: Question[] = [];
    for (const item of pool) {
      for (const allergen of item.allergens) {
        out.push({ mode: "allergens", item, allergen, answer: true });
      }
      const missing = allAllergens.filter((a) => !item.allergens.includes(a));
      if (missing.length) {
        out.push({
          mode: "allergens",
          item,
          allergen: pick(missing),
          answer: false,
        });
      }
    }
    return shuffle(out);
  }

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
  if (mode === "missing") {
    // Need enough ingredients for the blank to be meaningful and enough other
    // items to draw plausible distractors from.
    if (item.components.length < 3) return null;
    const blankIndex = Math.floor(Math.random() * item.components.length);
    const answer = item.components[blankIndex];
    const shown = item.components.map((c, i) => (i === blankIndex ? null : c));
    const ownSet = new Set(item.components.map((c) => c.toLowerCase()));
    // Prefer distractors from same-category items so wrong answers are
    // plausible (e.g. another pasta's sauce ingredient, another spirit-forward
    // cocktail's modifier).
    const otherItems = items.filter((i) => i.id !== item.id);
    const sameCat = item.category
      ? otherItems.filter((i) => i.category === item.category)
      : [];
    const candidatePool = (sameCat.length >= 4 ? sameCat : otherItems)
      .flatMap((i) => i.components)
      .filter((c) => c && !ownSet.has(c.toLowerCase()));
    const distractors = uniqueBy(shuffle(candidatePool), (s) => s.toLowerCase()).slice(0, 3);
    if (distractors.length < 3) return null;
    return {
      mode,
      item,
      shown,
      blankIndex,
      choices: shuffle([answer, ...distractors]),
      answer,
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
  if (mode === "description") {
    if (!item.descriptors.length) return null;
    const prompt = pick(item.descriptors);
    // Strip the item's own name from the prompt so the answer isn't given away.
    const sanitized = redactName(prompt, item.name);
    const otherItems = items.filter((i) => i.id !== item.id);
    const sameCat = item.category
      ? otherItems.filter((i) => i.category === item.category)
      : [];
    const distractorPool = sameCat.length >= 4 ? sameCat : otherItems;
    const distractors = shuffle(distractorPool).slice(0, 3).map((i) => i.name);
    if (distractors.length < 3) return null;
    return {
      mode,
      item,
      prompt: sanitized,
      choices: shuffle([item.name, ...distractors]),
      answer: item.name,
    };
  }
  return null;
}

function uniqueBy<T>(arr: T[], key: (t: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of arr) {
    const k = key(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

function uniqueByLower(arr: string[]): string[] {
  return uniqueBy(arr, (s) => s.toLowerCase());
}

/**
 * Split a free-text ingredient note like
 *   "Egg yolks, Garlic, Black Garlic, Dijon Mustard, Lemon Juice."
 * into discrete ingredient tokens. Strips trailing punctuation and parenthetical
 * notes, drops very short tokens, and titles each entry.
 */
function parseIngredientList(note: string): string[] {
  return note
    .replace(/\([^)]*\)/g, " ")
    .split(/[,.;]|\sand\s|\swith\s|\splus\s|\&/i)
    .map((s) => s.replace(/^\s*[-•]\s*/, "").trim())
    .filter((s) => s.length >= 3 && s.length <= 40)
    // Drop verb-y fragments (cooked, mixed, etc.) — keep noun-ish entries.
    .filter((s) => !/^(then|finished|served|cooked|mixed|heated|dripped|pureed|tossed|made|grated|sieved|cleaned)\b/i.test(s));
}

/**
 * Redact a list of terms from a text blob with "___" - case-insensitive,
 * whole-phrase match. Used to scrub sub-recipe names out of "from description"
 * prompts so the user can't reverse-engineer the dish from a unique component.
 */
function redactTerms(text: string, terms: string[]): string {
  let out = text;
  for (const t of terms) {
    const trimmed = t.trim();
    if (trimmed.length < 4) continue;
    out = out.replace(new RegExp(escapeRegExp(trimmed), "gi"), "___");
  }
  return out;
}

function redactName(text: string, name: string): string {
  if (!name) return text;
  // Replace full name + each significant word so the prose can't reveal the answer.
  const tokens = [name, ...name.split(/\s+/).filter((t) => t.length > 3)];
  let out = text;
  for (const t of tokens) {
    out = out.replace(new RegExp(escapeRegExp(t), "gi"), "___");
  }
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}