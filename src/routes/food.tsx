/**
 * Food tab.
 *
 * Single search bar — AND-matches across name, description, preparation,
 * ingredients, allergens, info (see searchHaystack in src/lib/food.ts).
 * Dishes are grouped by category (Antipasti → Pasta → Secondi → Contorni →
 * Dolci → Lunch Only).
 *
 * Each dish renders as a tap-to-expand flashcard (src/components/DishCard.tsx).
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X, Eye, EyeOff } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { DishCard } from "@/components/DishCard";
import {
  ALL_DISHES,
  allDietaryTags,
  filterDishes,
  groupByCategory,
} from "@/lib/food";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/food")({
  component: FoodPage,
});

function useUrlQuery() {
  const [q, setQ] = useState("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const initial = new URLSearchParams(window.location.search).get("q") ?? "";
    setQ(initial);
    const onPop = () =>
      setQ(new URLSearchParams(window.location.search).get("q") ?? "");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function update(next: string) {
    setQ(next);
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (next) p.set("q", next);
    else p.delete("q");
    const qs = p.toString();
    window.history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
  }

  return [q, update] as const;
}

function FoodPage() {
  const [q, setQ] = useUrlQuery();
  const [showLunch, setShowLunch] = useState(false);
  const filtered = useMemo(() => {
    const list = filterDishes(q);
    return showLunch ? list : list.filter((d) => d.category !== "Lunch Only");
  }, [q, showLunch]);
  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);
  const tagSuggestions = useMemo(() => allDietaryTags(), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav
        title="Bottega Pro · Food"
        subtitle={`${ALL_DISHES.length} dishes`}
      />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ingredient or allergen… (e.g. gluten, truffle, shellfish)"
            className="h-11 pl-10 text-base"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {tagSuggestions.length > 0 && (
          <div className="mt-3">
            <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              Quick allergen filters
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tagSuggestions.map((tag) => {
                const active = q.toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    onClick={() => setQ(active ? "" : tag)}
                    className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-b border-border pb-2">
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold tabular-nums text-foreground">
              {filtered.length}
            </span>{" "}
            dish{filtered.length === 1 ? "" : "es"}
            {q && (
              <button
                onClick={() => setQ("")}
                className="ml-2 rounded px-2 py-0.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Show all
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowLunch((v) => !v)}
              aria-pressed={showLunch}
              title={showLunch ? "Hide lunch-only dishes" : "Show lunch-only dishes"}
              className={`ml-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ${
                showLunch
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {showLunch ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {showLunch ? "Hide lunch only" : "Show lunch only"}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-3 rounded-lg border border-dashed border-border bg-card/50 px-4 py-10 text-center text-sm text-muted-foreground">
            No dishes match “{q}”.
            <br />
            Try an allergen like <em>gluten</em>, <em>shellfish</em>, or an ingredient like <em>truffle</em>.
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {grouped.map(({ category, dishes }) => (
              <section key={category}>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                  <span className="ml-2 font-normal tabular-nums text-muted-foreground/70">
                    {dishes.length}
                  </span>
                </h2>
                <div className="grid gap-2">
                  {dishes.map((d) => (
                    <DishCard key={d.id} dish={d} highlight={q} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}