## Sommelier Quick-Reference App

A pocket-friendly, dark-theme browser for your wine list. Filter by vintage (primary), type/varietal/region, price range, and free-text search. Built so you can later add Cocktails, Food, and Custom Experiences as siblings.

### Stack

- Vite + React + TypeScript (no TanStack, no SSR)
- Tailwind + shadcn/ui for components
- Static build → drop on Vercel or Netlify (just `npm run build`, publish `dist/`)
- No backend, no auth, no database — all data ships in the bundle

> Note: Lovable's template is TanStack Start. I'll restructure it into a plain Vite SPA (remove the `src/routes/` file-based routing, swap in a tiny `react-router-dom` setup, keep Tailwind/shadcn). The Lovable preview will keep working; the exported repo will deploy to Vercel/Netlify with zero config.

### Data pipeline (one-time, re-runnable)

1. Parse `BTG_Cocktail_Wine_Spirits_List_03.15.2026.pdf` with a Node script.
2. Extract wines only (skip cocktails per your instruction; keep spirits aside for a future tab).
3. Normalize each entry to:
   ```ts
   {
     id, name, producer, vintage: number | "NV",
     type: "Red" | "White" | "Rosé" | "Sparkling" | "Dessert" | "Fortified",
     varietal, region, country,
     priceGlass?: number, priceBottle?: number,
     notes?: string
   }
   ```
4. Output to `src/data/wines.json` — committed to the repo, loaded synchronously.
5. Script lives at `scripts/parse-list.ts` so you can re-run when the list updates (just re-upload a new PDF later).

I'll review the parsed JSON manually for obvious misreads before shipping.

### Screens

**1. Browse (single page, everything visible)**

```text
┌─────────────────────────────────────────┐
│  BTG List · 03.15.2026          [≡]     │
├─────────────────────────────────────────┤
│  🔍 Search producer, name, region...    │
│                                          │
│  Type:   [All][Red][White][Spk][Rosé]   │
│  Vintage: ◀ 1995 ──●────●── 2024 ▶      │
│  Price:   $0 ──●──────●── $500 (btl)    │
│  ○ By glass  ● By bottle                 │
│                                          │
│  Sort: [Vintage ▾]   142 results        │
├─────────────────────────────────────────┤
│  2018 · Red · Burgundy                   │
│  Domaine X — Gevrey-Chambertin           │
│  $24 glass  ·  $96 bottle                │
├─────────────────────────────────────────┤
│  2015 · Red · Bordeaux                   │
│  ...                                     │
└─────────────────────────────────────────┘
```

- Filters and search are instant (in-memory, ~hundreds of items max).
- Vintage slider has an "NV" toggle for non-vintage sparkling/fortified.
- Tap a card to expand notes/pairing room (later: pairing suggestions).
- URL query string reflects filters (`?type=red&vintageMin=2015`) so you can bookmark a "holiday red 2015+" view.

**2. Nav shell (ready for future sections)**

Top tabs / bottom bar with: **Wines** (built) · Cocktails · Food · Experiences (placeholders that say "Coming soon"). This way the architecture is right from day one.

### Look & feel

- Near-black background (`#0B0B0C`), warm off-white text, single muted gold accent for active filters and prices.
- Large tap targets, 16px+ body, generous line height — readable on a phone held at arm's length in low light.
- No glare: no white surfaces, no harsh shadows, subtle borders only.
- Filter chips and sliders sized for thumbs.

### Export to Vercel / Netlify

After build:
- `vercel.json` with SPA rewrite (`/* → /index.html`)
- `public/_redirects` with the Netlify equivalent
- README section with one-line deploy instructions for both

You connect the repo via Lovable's GitHub export → import into Vercel or Netlify → done. Lovable hosting stays as your preview environment but is not the source of truth.

### What's explicitly out of scope this round

- Cocktails section (data parsed but not surfaced)
- Food menu / allergens
- Custom experience builder (price per person)
- Editing wines in-app

These get their own follow-up rounds. The data model and nav shell are designed to absorb them without rework.

### Open question I'll need to answer while building

If the PDF has wines without explicit vintages or with unusual price formats (e.g., half-bottles, magnums), I'll default to sensible behavior (treat as "NV", show the size as a tag) and flag anything ambiguous in a short report after the first parse.
