/**
 * Deterministic menu curator. No AI.
 *
 * Given a budget range, guest count, and restrictions, returns 2 distinct
 * chef's menus drawn from src/data/food.ts:
 *   - "Trattoria Classica"  — traditional, balanced
 *   - "Indulgente"          — premium proteins, richer
 *
 * Tunables (course flow, drop order, restriction keywords, premium ids)
 * live in src/data/experiences.ts.
 */
import { ALL_DISHES, type Dish, type FoodCategory } from "@/lib/food";
import {
  COURSE_FLOW,
  DROP_ORDER,
  PREMIUM_DISH_IDS,
  RESTRICTION_RULES,
} from "@/data/experiences";
import {
  priceToNumber,
  type AddOn,
  type CourseSelection,
  type ExperienceRequest,
  type MenuOption,
} from "@/lib/experiences";

/** True if a dish is allowed under every active restriction. */
function dishAllowed(dish: Dish, restrictions: string[]): boolean {
  const tagsLc = dish.dietaryRestrictions.map((t) => t.toLowerCase());
  const hay = [dish.name, dish.description, ...dish.ingredients.map((i) => `${i.name} ${i.note}`)]
    .join(" ")
    .toLowerCase();

  for (const r of restrictions) {
    const rule = RESTRICTION_RULES[r];
    if (!rule) continue;
    if (rule.tags?.some((t) => tagsLc.includes(t.toLowerCase()))) return false;
    if (rule.keywords?.some((k) => hay.includes(k.toLowerCase()))) return false;
  }
  return true;
}

type Candidate = Dish & { _price: number; _premium: boolean };

function buildCandidates(restrictions: string[]): Candidate[] {
  // Exclude lunch-only dishes from tasting menus.
  const base = ALL_DISHES.filter((d) => d.category !== "Lunch Only" && dishAllowed(d, restrictions));

  // Per-category premium threshold: top 35% by price.
  const byCat = new Map<FoodCategory, Dish[]>();
  for (const d of base) {
    const arr = byCat.get(d.category) ?? [];
    arr.push(d);
    byCat.set(d.category, arr);
  }
  const premiumSet = new Set<string>(PREMIUM_DISH_IDS);
  for (const [, arr] of byCat) {
    const prices = arr.map((d) => priceToNumber(d.price)).sort((a, b) => b - a);
    const cutoff = prices[Math.floor(prices.length * 0.35)] ?? 0;
    for (const d of arr) if (priceToNumber(d.price) >= cutoff) premiumSet.add(d.id);
  }

  return base.map((d) => ({
    ...d,
    _price: priceToNumber(d.price),
    _premium: premiumSet.has(d.id),
  }));
}

function groupByCat(cands: Candidate[]): Map<FoodCategory, Candidate[]> {
  const m = new Map<FoodCategory, Candidate[]>();
  for (const c of cands) {
    const arr = m.get(c.category) ?? [];
    arr.push(c);
    m.set(c.category, arr);
  }
  return m;
}

/** Decide which courses to include given budget vs. minimum possible totals. */
function chooseCourses(
  byCat: Map<FoodCategory, Candidate[]>,
  budgetMax: number,
): FoodCategory[] {
  let flow = COURSE_FLOW.filter((c) => (byCat.get(c)?.length ?? 0) > 0);

  // If the cheapest possible menu still exceeds the max budget, drop courses.
  const minOf = (c: FoodCategory) =>
    Math.min(...(byCat.get(c)?.map((d) => d._price) ?? [Infinity]));

  let cheapest = flow.reduce((s, c) => s + minOf(c), 0);
  for (const drop of DROP_ORDER) {
    if (cheapest <= budgetMax) break;
    if (flow.includes(drop)) {
      cheapest -= minOf(drop);
      flow = flow.filter((c) => c !== drop);
    }
  }
  return flow;
}

type Pick = { cat: FoodCategory; dish: Candidate; reasoning: string };

/**
 * Greedy menu builder. Walks each course, picks the dish closest to a
 * target price-per-course that lands the total inside the budget.
 *
 * style:
 *   "classica"   — prefer non-premium, mid-priced picks
 *   "indulgente" — prefer premium, upper-priced picks
 */
function buildMenu(
  flow: FoodCategory[],
  byCat: Map<FoodCategory, Candidate[]>,
  budgetMin: number,
  budgetMax: number,
  style: "classica" | "indulgente",
  exclude: Set<string>,
): Pick[] | null {
  // Aim near the upper portion of the range — give the guest value.
  const target = style === "indulgente"
    ? budgetMin + (budgetMax - budgetMin) * 0.85
    : budgetMin + (budgetMax - budgetMin) * 0.55;

  const picks: Pick[] = [];
  let spent = 0;

  for (let i = 0; i < flow.length; i++) {
    const cat = flow[i];
    const remainingCourses = flow.length - i - 1;
    const available = (byCat.get(cat) ?? []).filter((d) => !exclude.has(d.id));
    if (available.length === 0) return null;

    // For remaining courses, compute min spend so we don't blow the ceiling.
    let minFuture = 0;
    for (let j = i + 1; j < flow.length; j++) {
      const fcat = flow[j];
      const opts = (byCat.get(fcat) ?? []).filter((d) => !exclude.has(d.id));
      minFuture += Math.min(...(opts.length ? opts.map((d) => d._price) : [0]));
    }
    const maxAllowedHere = budgetMax - spent - minFuture;

    // Per-course target = remaining budget split across remaining courses,
    // weighted by style.
    const remainingBudget = target - spent;
    const perCourseTarget = remainingBudget / (remainingCourses + 1);

    // Sort by score: distance from target, with bonus/penalty for premium.
    const scored = available
      .filter((d) => d._price <= maxAllowedHere)
      .map((d) => {
        const dist = Math.abs(d._price - perCourseTarget);
        const styleBonus = style === "indulgente"
          ? (d._premium ? -3 : 0)
          : (d._premium ? +2 : 0);
        return { d, score: dist + styleBonus };
      })
      .sort((a, b) => a.score - b.score);

    if (scored.length === 0) {
      // Fall back to cheapest available so we don't fail outright.
      const fallback = [...available].sort((a, b) => a._price - b._price)[0];
      picks.push({ cat, dish: fallback, reasoning: reasoningFor(cat, fallback, style) });
      spent += fallback._price;
      continue;
    }

    const chosen = scored[0].d;
    picks.push({ cat, dish: chosen, reasoning: reasoningFor(cat, chosen, style) });
    spent += chosen._price;
  }

  // Final budget check (with tolerance).
  if (spent < budgetMin - 1 || spent > budgetMax + 1) {
    // If under budget, try to upgrade the most flexible course.
    if (spent < budgetMin - 1) {
      for (let i = picks.length - 1; i >= 0; i--) {
        const p = picks[i];
        const room = budgetMax - (spent - p.dish._price);
        const upgrade = (byCat.get(p.cat) ?? [])
          .filter((d) => !exclude.has(d.id) && d._price > p.dish._price && d._price <= room)
          .sort((a, b) => b._price - a._price)[0];
        if (upgrade) {
          spent = spent - p.dish._price + upgrade._price;
          picks[i] = { cat: p.cat, dish: upgrade, reasoning: reasoningFor(p.cat, upgrade, style) };
          if (spent >= budgetMin - 1) break;
        }
      }
    }
  }

  return picks;
}

function reasoningFor(cat: FoodCategory, dish: Candidate, style: "classica" | "indulgente"): string {
  if (style === "indulgente" && dish._premium) {
    return `Premium ${cat.toLowerCase()} pick — a centerpiece dish.`;
  }
  if (style === "classica") {
    return `Approachable ${cat.toLowerCase()}, balances the progression.`;
  }
  return `Solid ${cat.toLowerCase()} that fits the build.`;
}

function picksToOption(
  title: string,
  style: string,
  picks: Pick[],
  guests: number,
  req: ExperienceRequest,
): MenuOption {
  const allAddOns: AddOn[] = (req.addOns ?? []).filter(
    (a) => a.name.trim().length > 0 && a.price > 0,
  );
  const perPersonAmount = (a: AddOn) =>
    a.scope === "table" ? a.price / Math.max(1, guests) : a.price;
  const replacementByCat = new Map<string, AddOn>();
  for (const a of allAddOns) {
    if (a.kind === "course" && a.course !== "Any") {
      replacementByCat.set(a.course, a);
    }
  }

  const courses: CourseSelection[] = picks.map((p) => {
    const rep = replacementByCat.get(p.cat);
    if (rep) {
      const pp = perPersonAmount(rep);
      return {
        category: p.cat,
        dishId: `addon:${rep.name}`,
        dishName: rep.scope === "table" ? `${rep.name} (table)` : rep.name,
        price: Math.round(pp * 100) / 100,
        reasoning: `Guest request — ${rep.name} as the ${p.cat.toLowerCase()}${
          rep.scope === "table" ? ` ($${rep.price} for the table)` : ""
        }.`,
      };
    }
    return {
      category: p.cat,
      dishId: p.dish.id,
      dishName: p.dish.name,
      price: p.dish._price,
      reasoning: p.reasoning,
    };
  });
  const foodTotal = courses.reduce((s, c) => s + c.price, 0);
  // Only "upgrade" add-ons (and "Any"-course add-ons) layer on top.
  const upgrades: AddOn[] = allAddOns.filter(
    (a) => a.kind === "upgrade" || a.course === "Any",
  );
  const addOnTotal = upgrades.reduce((s, a) => s + perPersonAmount(a), 0);
  const perPerson = Math.round((foodTotal + addOnTotal) * 100) / 100;
  return {
    title,
    style,
    courses,
    addOns: upgrades,
    addOnTotal,
    perPersonTotal: perPerson,
    tableTotal: perPerson * guests,
    rationale: buildRationale(perPerson, req, picks),
    accommodations: buildAccommodations(req),
  };
}

function buildRationale(perPerson: number, req: ExperienceRequest, picks: Pick[]): string {
  const courseList = picks.map((p) => p.cat).join(" → ");
  const within =
    perPerson >= req.budgetMin && perPerson <= req.budgetMax
      ? `lands at $${perPerson}/person, inside your $${req.budgetMin}–$${req.budgetMax} range`
      : `targets $${perPerson}/person`;
  return `${courseList}. ${within}. Total for ${req.guests} ${req.guests === 1 ? "guest" : "guests"}: $${perPerson * req.guests}.`;
}

function buildAccommodations(req: ExperienceRequest): string {
  const parts: string[] = [];
  if (req.restrictions.length) {
    parts.push(`Filtered for: ${req.restrictions.join(", ")}.`);
  }
  if (req.notes.trim()) {
    parts.push(`Note for kitchen: ${req.notes.trim()}`);
  }
  return parts.join(" ") || "None required";
}

export type CuratorError = { error: string };

export function curateMenus(
  req: ExperienceRequest,
): { options: MenuOption[] } | CuratorError {
  if (req.budgetMin > req.budgetMax) {
    return { error: "Minimum budget must be less than or equal to maximum." };
  }

  const candidates = buildCandidates(req.restrictions);
  if (candidates.length === 0) {
    return { error: "No dishes match those restrictions." };
  }

  const byCat = groupByCat(candidates);
  const flow = chooseCourses(byCat, req.budgetMax);

  if (flow.length === 0) {
    return { error: "Budget too low to build a menu from the current selection." };
  }

  // Cheapest possible build sanity check.
  const cheapest = flow.reduce(
    (s, c) => s + Math.min(...(byCat.get(c) ?? []).map((d) => d._price)),
    0,
  );
  if (cheapest > req.budgetMax) {
    return {
      error: `Budget too low — the lightest possible menu under these restrictions is $${cheapest}/person.`,
    };
  }

  // Classica first.
  const classica = buildMenu(flow, byCat, req.budgetMin, req.budgetMax, "classica", new Set());
  if (!classica) return { error: "Could not assemble a Classica menu within budget." };

  // Indulgente — exclude classica's picks so the two menus differ.
  const excludeForDiff = new Set(classica.map((p) => p.dish.id));
  let indulgente =
    buildMenu(flow, byCat, req.budgetMin, req.budgetMax, "indulgente", excludeForDiff) ??
    buildMenu(flow, byCat, req.budgetMin, req.budgetMax, "indulgente", new Set());

  if (!indulgente) {
    return { error: "Could not assemble a second distinct menu within budget." };
  }

  return {
    options: [
      picksToOption(
        "Trattoria Classica",
        "Traditional Italian comfort — balanced and crowd-pleasing.",
        classica,
        req.guests,
        req,
      ),
      picksToOption(
        "Indulgente",
        "Premium proteins and richer flavors — a celebratory build.",
        indulgente,
        req.guests,
        req,
      ),
    ],
  };
}