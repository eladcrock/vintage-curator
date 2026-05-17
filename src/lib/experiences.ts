/**
 * Experience curator — types + helpers for AI tasting menu generation.
 *
 * Data:
 *   - System prompt + tunables: src/data/experiences.ts
 *   - Dish catalog: src/data/food.ts (via src/lib/food.ts)
 *
 * Backend:
 *   - src/routes/api/curate.ts (POST) calls Lovable AI Gateway.
 *
 * Frontend:
 *   - src/routes/experiences.tsx — page
 *   - src/components/CuratorForm.tsx — inputs
 *   - src/components/MenuOptionCard.tsx — one menu option
 */
import { ALL_DISHES, type Dish, type FoodCategory } from "@/lib/food";

export type Restriction =
  | "Gluten-free"
  | "Vegetarian"
  | "Vegan"
  | "No pork"
  | "No shellfish"
  | "No red meat"
  | "Dairy-free"
  | "Nut-free";

export const COMMON_RESTRICTIONS: Restriction[] = [
  "Gluten-free",
  "Vegetarian",
  "Vegan",
  "No pork",
  "No shellfish",
  "No red meat",
  "Dairy-free",
  "Nut-free",
];

export type ExperienceRequest = {
  guests: number;
  budgetMin: number;
  budgetMax: number;
  restrictions: string[];
  notes: string;
  addOns: AddOn[];
};

export type AddOn = {
  name: string;
  price: number;
  /** Course the add-on rides on. "Any" displays it at the bottom of the menu. */
  course: FoodCategory | "Any";
  /**
   * "upgrade"  — layered on top of an existing course (no course is dropped).
   * "course"   — replaces (or fulfills) the course at that category with this
   *              item at the user-entered price. Not valid with course="Any".
   */
  kind: "upgrade" | "course";
  /**
   * "person" — price is per guest.
   * "table"  — flat price for the table; per-person impact = price / guests.
   */
  scope: "person" | "table";
};

export type CourseSelection = {
  category: FoodCategory;
  dishId: string;
  dishName: string;
  price: number;
  reasoning: string;
};

export type MenuOption = {
  title: string;
  style: string;
  courses: CourseSelection[];
  addOns: AddOn[];
  addOnTotal: number;
  perPersonTotal: number;
  tableTotal: number;
  rationale: string;
  accommodations: string;
};

export type CurateResponse = {
  options: MenuOption[];
};

/**
 * Parse a price string like "$24" or "3pc $18 / 5pc $25" into a number.
 * For multi-price strings we take the largest (most generous portion).
 */
export function priceToNumber(price: string): number {
  const matches = price.match(/\$\s?(\d+(?:\.\d+)?)/g);
  if (!matches || matches.length === 0) return 0;
  const nums = matches.map((m) => parseFloat(m.replace(/[^\d.]/g, "")));
  return Math.max(...nums);
}

/**
 * Slim dish projection sent to the model. We deliberately omit
 * preparation/ingredients to keep prompt small — restrictions + description
 * are enough for menu curation.
 */
export type DishCatalogEntry = {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  description: string;
  dietaryRestrictions: string[];
};

export function dishesAsCatalog(dishes: Dish[] = ALL_DISHES): DishCatalogEntry[] {
  return dishes
    .filter((d) => d.category !== "Lunch Only")
    .map((d) => ({
      id: d.id,
      name: d.name,
      category: d.category,
      price: priceToNumber(d.price),
      description: d.description,
      dietaryRestrictions: d.dietaryRestrictions,
    }));
}

export function lookupDish(id: string): Dish | undefined {
  return ALL_DISHES.find((d) => d.id === id);
}

export type ValidationIssue = { code: string; message: string };

/**
 * Validate a model-produced menu option against the real catalog +
 * the original request. Returns a list of issues (empty = valid).
 */
export function validateMenuOption(
  opt: MenuOption,
  req: ExperienceRequest,
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!opt.courses || opt.courses.length === 0) {
    issues.push({ code: "no_courses", message: `"${opt.title}" has no courses.` });
    return issues;
  }

  let computedPerPerson = 0;
  for (const c of opt.courses) {
    const dish = lookupDish(c.dishId);
    if (!dish) {
      issues.push({
        code: "unknown_dish",
        message: `Unknown dish id "${c.dishId}" in "${opt.title}".`,
      });
      continue;
    }
    if (dish.category !== c.category) {
      issues.push({
        code: "category_mismatch",
        message: `Dish "${dish.name}" is ${dish.category}, not ${c.category}.`,
      });
    }
    computedPerPerson += priceToNumber(dish.price);
  }

  // Budget: allow small rounding tolerance.
  if (computedPerPerson < req.budgetMin - 1) {
    issues.push({
      code: "under_budget",
      message: `"${opt.title}" per-person total $${computedPerPerson} is below min $${req.budgetMin}.`,
    });
  }
  if (computedPerPerson > req.budgetMax + 1) {
    issues.push({
      code: "over_budget",
      message: `"${opt.title}" per-person total $${computedPerPerson} exceeds max $${req.budgetMax}.`,
    });
  }

  return issues;
}

/**
 * Recompute totals from the real catalog so the UI is never misled by the
 * model's arithmetic.
 */
export function finalizeOption(opt: MenuOption, guests: number): MenuOption {
  const courses = opt.courses.map((c) => {
    const dish = lookupDish(c.dishId);
    return {
      ...c,
      dishName: dish?.name ?? c.dishName,
      price: dish ? priceToNumber(dish.price) : c.price,
      category: dish?.category ?? c.category,
    };
  });
  const perPerson = courses.reduce((s, c) => s + c.price, 0);
  return {
    ...opt,
    courses,
    perPersonTotal: perPerson,
    tableTotal: perPerson * guests,
  };
}