# Bottega · Sommelier Quick List

A pocket-friendly, dark-theme search of the Bottega wine list. Filter by **vintage**,
**type / varietal**, **price**, and free text. Built so Cocktails, Food, and Custom
Experiences slot in later without rework.

## Local dev

```bash
bun install
bun run dev
```

URL query string reflects the active filters (e.g. `?types=Red&vmin=2015&pmax=300`)
so you can bookmark or share a view.

## Updating the wine list

Re-run the parser against the updated markdown export of the PDF:

```bash
python3 scripts/parse_list.py path/to/list.md src/data/wines.json
```

Review the JSON, then `bun run build`.

## Deploying to Vercel

1. Push to GitHub.
2. Import in Vercel — no settings needed. `vercel.json` handles SPA fallback.

## Deploying to Netlify

1. Push to GitHub and connect in Netlify.
2. Build command: `bun run build`  ·  Publish directory: `dist`
3. `public/_redirects` handles SPA fallback.

## A note on the stack

You asked for a plain Vite + React app, not TanStack. The Lovable starter
template is built on TanStack Start so its preview keeps working — but you never
need to touch any TanStack code. All app logic lives in plain React inside
`src/routes/index.tsx`, `src/components/`, and `src/lib/`.

## Roadmap

- [ ] Cocktails section (data already in the source PDF)
- [ ] Food menu with allergen tags
- [ ] Custom experience builder (price-per-person, allergy-aware)
- [ ] Pairing notes per wine