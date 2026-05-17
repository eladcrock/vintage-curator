import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X, Eye, EyeOff } from "lucide-react";
import {
  ALL_WINES,
  WINE_TYPES,
  type WineTypeFilter,
  vintageRange,
  bottlePriceRange,
  SUBCATEGORIES,
  subcategoryOf,
  formatOf,
  type FormatFilter,
} from "@/lib/wines";
import { WineCard } from "@/components/WineCard";
import { SiteNav } from "@/components/SiteNav";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const [GLOBAL_MIN_YEAR, GLOBAL_MAX_YEAR] = vintageRange(ALL_WINES);
const [GLOBAL_MIN_PRICE, GLOBAL_MAX_PRICE] = bottlePriceRange(ALL_WINES);

type SortKey = "vintage-desc" | "vintage-asc" | "price-asc" | "price-desc" | "producer";

const DEFAULTS = {
  q: "",
  types: [] as WineTypeFilter[],
  subs: [] as string[],
  format: "all" as FormatFilter,
  vintageMin: GLOBAL_MIN_YEAR,
  vintageMax: GLOBAL_MAX_YEAR,
  includeNV: true,
  priceMin: GLOBAL_MIN_PRICE,
  priceMax: GLOBAL_MAX_PRICE,
  /** When false (default), by-the-glass pours are hidden from results. */
  showBTG: false,
  sort: "vintage-desc" as SortKey,
};

function useUrlFilters() {
  // Start from DEFAULTS so SSR and first client render match; sync from URL after mount.
  const [state, setState] = useState<typeof DEFAULTS>(() => ({ ...DEFAULTS }));
  useEffect(() => {
    setState(readFromURL());
    const onPop = () => setState(readFromURL());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function update(patch: Partial<typeof DEFAULTS>) {
    const next = { ...state, ...patch };
    setState(next);
    writeToURL(next);
  }
  function reset() {
    setState({ ...DEFAULTS });
    writeToURL({ ...DEFAULTS });
  }
  return { state, update, reset };
}

function readFromURL(): typeof DEFAULTS {
  if (typeof window === "undefined") return { ...DEFAULTS };
  const p = new URLSearchParams(window.location.search);
  const num = (k: string, d: number) => {
    const v = p.get(k);
    if (v === null) return d;
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  };
  const types = (p.get("types") ?? "")
    .split(",")
    .filter(Boolean)
    .filter((t): t is WineTypeFilter => (WINE_TYPES as readonly string[]).includes(t));
  const subs = (p.get("subs") ?? "").split(",").filter(Boolean);
  const fmtRaw = p.get("fmt");
  const format: FormatFilter =
    fmtRaw === "standard" || fmtRaw === "large" || fmtRaw === "half" ? fmtRaw : "all";
  return {
    q: p.get("q") ?? "",
    types,
    subs,
    format,
    vintageMin: num("vmin", DEFAULTS.vintageMin),
    vintageMax: num("vmax", DEFAULTS.vintageMax),
    includeNV: p.get("nv") !== "0",
    priceMin: num("pmin", DEFAULTS.priceMin),
    priceMax: num("pmax", DEFAULTS.priceMax),
    showBTG: p.get("btg") === "1",
    sort: ((p.get("sort") as SortKey) ?? DEFAULTS.sort),
  };
}

function writeToURL(s: typeof DEFAULTS) {
  if (typeof window === "undefined") return;
  const p = new URLSearchParams();
  if (s.q) p.set("q", s.q);
  if (s.types.length) p.set("types", s.types.join(","));
  if (s.subs.length) p.set("subs", s.subs.join(","));
  if (s.format !== "all") p.set("fmt", s.format);
  if (s.vintageMin !== DEFAULTS.vintageMin) p.set("vmin", String(s.vintageMin));
  if (s.vintageMax !== DEFAULTS.vintageMax) p.set("vmax", String(s.vintageMax));
  if (!s.includeNV) p.set("nv", "0");
  if (s.priceMin !== DEFAULTS.priceMin) p.set("pmin", String(s.priceMin));
  if (s.priceMax !== DEFAULTS.priceMax) p.set("pmax", String(s.priceMax));
  if (s.showBTG) p.set("btg", "1");
  if (s.sort !== DEFAULTS.sort) p.set("sort", s.sort);
  const qs = p.toString();
  const url = qs ? `?${qs}` : window.location.pathname;
  window.history.replaceState({}, "", url);
}

function priceOf(w: (typeof ALL_WINES)[number]): number {
  return w.priceBottle ?? w.priceGlass ?? 0;
}

function Index() {
  const { state, update, reset } = useUrlFilters();

  const filtered = useMemo(() => {
    const q = state.q.trim().toLowerCase();
    const qYear = /^\d{4}$/.test(q) ? parseInt(q, 10) : null;
    const typeSet = new Set(state.types);
    const subSet = new Set(state.subs);
    const results = ALL_WINES.filter((w) => {
      if (typeSet.size && !typeSet.has(w.type as WineTypeFilter)) return false;
      if (subSet.size) {
        const sub = subcategoryOf(w);
        if (!sub || !subSet.has(sub)) return false;
      }
      if (state.format !== "all" && formatOf(w) !== state.format) return false;
      // Hide by-the-glass pours unless explicitly toggled on.
      if (!state.showBTG && w.byTheGlass) return false;
      if (typeof w.vintage === "number") {
        if (w.vintage < state.vintageMin || w.vintage > state.vintageMax) return false;
      } else {
        if (!state.includeNV) return false;
      }
      const price = priceOf(w);
      if (price < state.priceMin || price > state.priceMax) return false;
      if (q) {
        // Year-only query: match vintage exactly (number or "NV"/"MV" text).
        if (qYear !== null) {
          if (typeof w.vintage === "number") {
            if (w.vintage !== qYear) return false;
          } else {
            return false;
          }
        } else {
        const hay = [
          w.producer,
          w.cuvee,
          w.varietal,
          w.region,
          w.country,
          w.code,
          String(w.vintage),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
        }
      }
      return true;
    });
    const sorted = [...results].sort((a, b) => {
      switch (state.sort) {
        case "vintage-asc":
          return vintageNum(a) - vintageNum(b);
        case "vintage-desc":
          return vintageNum(b) - vintageNum(a);
        case "price-asc":
          return priceOf(a) - priceOf(b);
        case "price-desc":
          return priceOf(b) - priceOf(a);
        case "producer":
          return a.producer.localeCompare(b.producer);
      }
    });
    return sorted;
  }, [state]);

  const [visibleCount, setVisibleCount] = useState(60);
  useEffect(() => setVisibleCount(60), [state]);

  const activeFilterCount =
    (state.q ? 1 : 0) +
    (state.types.length ? 1 : 0) +
    (state.subs.length ? 1 : 0) +
    (state.format !== "all" ? 1 : 0) +
    (state.vintageMin !== DEFAULTS.vintageMin || state.vintageMax !== DEFAULTS.vintageMax ? 1 : 0) +
    (state.priceMin !== DEFAULTS.priceMin || state.priceMax !== DEFAULTS.priceMax ? 1 : 0) +
    (state.showBTG ? 1 : 0) +
    (!state.includeNV ? 1 : 0);

  // Available subcategories: union of SUBCATEGORIES for selected types,
  // or for all of Sparkling/White/Red when no type is selected.
  const visibleSubs = useMemo(() => {
    const activeTypes = state.types.length
      ? state.types
      : (["Sparkling", "White", "Red"] as WineTypeFilter[]);
    const groups: { type: string; subs: string[] }[] = [];
    for (const t of activeTypes) {
      const list = SUBCATEGORIES[t];
      if (list) groups.push({ type: t, subs: list });
    }
    return groups;
  }, [state.types]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav
        title="Bottega Pro"
        subtitle={`Wine list 03.15.2026 · ${ALL_WINES.length} wines`}
      />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={state.q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search vintage (e.g. 2018), producer, region, varietal, bin…"
            className="h-11 pl-10 text-base"
          />
          {state.q && (
            <button
              onClick={() => update({ q: "" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Type chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {WINE_TYPES.map((t) => {
            const active = state.types.includes(t);
            return (
              <button
                key={t}
                onClick={() => {
                  const next = active
                    ? state.types.filter((x) => x !== t)
                    : [...state.types, t];
                  // when toggling types, drop subs that no longer belong
                  const allowed = new Set(
                    (next.length ? next : (["Sparkling", "White", "Red"] as WineTypeFilter[]))
                      .flatMap((tt) => SUBCATEGORIES[tt] ?? []),
                  );
                  update({
                    types: next,
                    subs: state.subs.filter((s) => allowed.has(s)),
                  });
                }}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Subcategory chips — only shown once user taps a wine type.
            Drops down inline (no extra click on a "Styles" header). */}
        {state.types.length > 0 && visibleSubs.length > 0 && (
          <div className="mt-3 space-y-2 rounded-lg border border-border bg-card/40 px-3 py-2">
            {visibleSubs.map(({ type, subs }) => (
              <div key={type}>
                <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {type} styles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {subs.map((s) => {
                    const active = state.subs.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => {
                          const next = active
                            ? state.subs.filter((x) => x !== s)
                            : [...state.subs, s];
                          update({ subs: next });
                        }}
                        className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                          active
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Format chips */}
        <div className="mt-4">
          <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            Bottle format
          </div>
          <div className="flex flex-wrap gap-1.5">
            {([
              ["all", "All sizes"],
              ["standard", "Standard 750mL"],
              ["large", "Large format 1.5L+"],
              ["half", "Half 375mL"],
            ] as [FormatFilter, string][]).map(([key, label]) => {
              const active = state.format === key;
              return (
                <button
                  key={key}
                  onClick={() => update({ format: key })}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Vintage slider */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
            <span>Vintage</span>
            <span className="tabular-nums text-primary">
              {state.vintageMin} – {state.vintageMax}
            </span>
          </div>
          <Slider
            min={GLOBAL_MIN_YEAR}
            max={GLOBAL_MAX_YEAR}
            step={1}
            value={[state.vintageMin, state.vintageMax]}
            onValueChange={([min, max]) =>
              update({ vintageMin: min, vintageMax: max })
            }
          />
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={state.includeNV}
              onChange={(e) => update({ includeNV: e.target.checked })}
              className="h-3.5 w-3.5 accent-[color:var(--color-primary)]"
            />
            Include non-vintage (NV/MV)
          </label>
        </div>

        {/* Price slider */}
        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
            <span>Price</span>
            <span className="tabular-nums text-primary">
              ${state.priceMin} – ${state.priceMax}
            </span>
          </div>
          <Slider
            min={GLOBAL_MIN_PRICE}
            max={GLOBAL_MAX_PRICE}
            step={25}
            value={[state.priceMin, state.priceMax]}
            onValueChange={([min, max]) =>
              update({ priceMin: min, priceMax: max })
            }
          />
        </div>

        {/* Results bar */}
        <div className="mt-5 flex items-center justify-between border-b border-border pb-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground tabular-nums">
              {filtered.length}
            </span>{" "}
            result{filtered.length === 1 ? "" : "s"}
            <Button
              variant={activeFilterCount > 0 ? "secondary" : "ghost"}
              size="sm"
              onClick={reset}
              className="ml-2 h-7 px-2 text-xs"
            >
              {activeFilterCount > 0 ? `Show all (${ALL_WINES.length})` : "Show all"}
            </Button>
            <button
              type="button"
              onClick={() => update({ showBTG: !state.showBTG })}
              aria-pressed={state.showBTG}
              title={state.showBTG ? "Hide by-the-glass" : "Show by-the-glass"}
              className={`ml-1 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ${
                state.showBTG
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {state.showBTG ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {state.showBTG ? "Hide by-the-glass" : "Show by-the-glass"}
            </button>
          </div>
          <select
            value={state.sort}
            onChange={(e) => update({ sort: e.target.value as SortKey })}
            className="rounded-md border border-border bg-card px-2 py-1 text-sm text-foreground"
          >
            <option value="vintage-desc">Vintage ↓ newest</option>
            <option value="vintage-asc">Vintage ↑ oldest</option>
            <option value="price-asc">Price ↑ low</option>
            <option value="price-desc">Price ↓ high</option>
            <option value="producer">Producer A–Z</option>
          </select>
        </div>

        {/* Results */}
        <div className="mt-3 grid gap-2">
          {filtered.length === 0 && (
            <div className="rounded-lg border border-dashed border-border bg-card/50 px-4 py-10 text-center text-sm text-muted-foreground">
              No wines match these filters.
              <br />
              Try widening the vintage or price range.
            </div>
          )}
          {filtered.slice(0, visibleCount).map((w) => (
            <WineCard key={w.id} wine={w} />
          ))}
          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((c) => c + 60)}
              className="mt-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              Show {Math.min(60, filtered.length - visibleCount)} more
              <span className="ml-1 text-xs">
                ({filtered.length - visibleCount} remaining)
              </span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function vintageNum(w: (typeof ALL_WINES)[number]): number {
  return typeof w.vintage === "number" ? w.vintage : 0;
}
