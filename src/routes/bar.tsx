/**
 * Bar Program tab.
 *
 * Single search bar — queries across name, menu description, ingredients,
 * dietary tags, garnish, character, story, etc. (see searchHaystack in
 * src/lib/cocktails.ts). Multi-word queries are AND-matched.
 *
 * Each cocktail is rendered as a tap-to-expand flashcard
 * (src/components/CocktailCard.tsx).
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { CocktailCard } from "@/components/CocktailCard";
import { ALL_COCKTAILS, filterCocktails, allDietaryTags } from "@/lib/cocktails";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/bar")({
  component: BarProgramPage,
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

function BarProgramPage() {
  const [q, setQ] = useUrlQuery();
  const filtered = useMemo(() => filterCocktails(q), [q]);
  const tagSuggestions = useMemo(() => allDietaryTags(), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav
        title="Bottega Pro · Bar"
        subtitle={`${ALL_COCKTAILS.length} cocktails · tap a card for full spec`}
      />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search ingredient, allergen, spirit, garnish… (e.g. citrus, gin, honey)"
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
            cocktail{filtered.length === 1 ? "" : "s"}
            {q && (
              <button
                onClick={() => setQ("")}
                className="ml-2 rounded px-2 py-0.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Show all
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 grid gap-2">
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-card/50 px-4 py-10 text-center text-sm text-muted-foreground">
              No cocktails match “{q}”.
              <br />
              Try a single ingredient like <em>gin</em>, <em>citrus</em>, or <em>honey</em>.
            </div>
          ) : (
            filtered.map((c) => (
              <CocktailCard key={c.id} cocktail={c} highlight={q} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}