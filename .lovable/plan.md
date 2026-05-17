## Experience Curator — AI Tasting Menu Generator

A new `/experiences` tab where the professional enters guests, per-person budget (single number or range), and table notes (allergies, vegetarians, "no red meat", etc.). Lovable AI returns **2 chef's menus** following the classic 5-course Italian flow, drawn from the dishes already in `src/data/food.ts`, scored against the menu prices as-is.

### File structure (matches existing conventions)

```
src/lib/experiences.ts          Types: ExperienceRequest, MenuOption, Course
                                Helpers: parseBudgetRange, dishesAsCatalog,
                                priceToNumber, validateMenu
src/data/experiences.ts         System prompt + curator instructions
                                (hand-editable tuning knobs)
src/routes/api/curate.ts        TanStack server route — POST. Calls Lovable
                                AI Gateway with structured Output schema.
src/components/CuratorForm.tsx  Inputs: guests, budget min/max, notes textarea,
                                quick-toggle chips (Gluten-free, Vegetarian,
                                No pork, No shellfish, No red meat)
src/components/MenuOptionCard.tsx  Renders one of two menu options:
                                course-by-course, per-person total, total
                                for table, chef's rationale, allergen flags
src/routes/experiences.tsx      Page: form on top, two MenuOptionCards below,
                                loading + error states
```

Also: enable the Experiences link in `src/components/SiteNav.tsx` and register the new routes (`/experiences`, `/api/curate`).

### Data flow

1. User fills form → POSTs `{ guests, budgetMin, budgetMax, notes, restrictions[] }` to `/api/curate`.
2. Server builds a compact catalog from `ALL_DISHES` (id, name, category, price→number, dietaryRestrictions, short description) — no need to send `preparation`/`ingredients` to the model.
3. Server calls Lovable AI (`google/gemini-3-flash-preview`) via the gateway helper with `Output.object` returning:

```ts
{
  options: [
    {
      title: string,                   // e.g. "Trattoria Classica"
      style: string,                   // 1-line vibe
      courses: [{ category, dishId, reasoning }],
      perPersonTotal: number,
      tableTotal: number,
      rationale: string,               // why this menu fits budget + table
      accommodations: string           // how restrictions were handled
    },
    { /* second option */ }
  ]
}
```

4. Server validates: every `dishId` exists, no dish violates a restriction, totals match real prices, per-person total is inside the budget range. If validation fails, retry once with the error fed back; otherwise return both options.
5. Client renders both MenuOptionCards side-by-side (stacked on mobile).

### Prompting rules (lives in `src/data/experiences.ts` so you can tune)

- Always follow Antipasto → Pasta → Secondo → Contorno → Dolce when budget allows. Drop Contorno first, then Secondo, if budget is tight; never drop Pasta or Dolce.
- Reserve higher-end Secondi (steaks, Branzino, etc.) for the upper end of the budget range.
- The two options should be meaningfully different — e.g. one "Classica" (traditional, lighter), one "Indulgente" (richer, premium proteins).
- Honor restrictions literally. If "1 vegetarian at table of 4", flag that the Secondo needs a vegetarian sub and suggest one from the menu.
- Stay inside the per-person budget range; prefer landing near the top of the range, not under it.

### Budget input UX

- Two number fields: "Budget per person" min / max. Leaving max empty = single target. Validation: min ≤ max, both > 0.
- Display computed table total live (`min×guests`–`max×guests`).

### Technical notes

- Lovable AI gateway: use the `createLovableAiGatewayProvider` helper pattern with `LOVABLE_API_KEY` server-side. If the secret isn't set yet, the curate route returns a clear 500 and the UI shows "AI Gateway not enabled" — I'll trigger the enable flow on first run.
- `priceToNumber("$24")` → 24, `"3pc $18 / 5pc $25"` → 25 (take the larger as default; configurable later).
- No DB writes. Stateless. Each curate call is independent.
- Surface 429 (rate limit) and 402 (credits exhausted) errors with toasts.
- All visual styling uses existing semantic tokens from `src/styles.css` — matches the wine/bar/food tabs.

### Out of scope (flag for later)

- Saving / sharing generated menus
- Wine pairing suggestions from the wine list (natural next step — easy add)
- Beverage cost in the budget
- Multiple table compositions in one request