/**
 * Bar Program tab.
 *
 * Single search bar - queries across name, menu description, ingredients,
 * dietary tags, garnish, character, story, etc. (see searchHaystack in
 * src/lib/cocktails.ts). Multi-word queries are AND-matched.
 *
 * Each cocktail is rendered as a tap-to-expand flashcard
 * (src/components/CocktailCard.tsx).
 */
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X, Check, Ban } from "lucide-react";
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
  // Per-allergen tri-state: undefined = neutral, "in" = must have,
  // "out" = must not have. Layered ON TOP of the free-text search.
  const [tagStates, setTagStates] = useState<Record<string, "in" | "out">>({});
  const cycle = (t: string) =>
    setTagStates((s) => {
      const next = { ...s };
      const cur = next[t];
      if (!cur) next[t] = "in";
      else if (cur === "in") next[t] = "out";
      else delete next[t];
      return next;
    });
  const filtered = useMemo(() => {
    const list = filterCocktails(q);
    const ins = Object.entries(tagStates)
      .filter(([, s]) => s === "in")
      .map(([t]) => t.toLowerCase());
    const outs = Object.entries(tagStates)
      .filter(([, s]) => s === "out")
      .map(([t]) => t.toLowerCase());
    if (!ins.length && !outs.length) return list;
    return list.filter((c) => {
      const tags = c.dietaryRestrictions.map((t) => t.toLowerCase());
      if (ins.some((t) => !tags.includes(t))) return false;
      if (outs.some((t) => tags.includes(t))) return false;
      return true;
    });
  }, [q, tagStates]);
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
            <div className="mb-1 flex items-center justify-between gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Allergens - tap to require, tap again to exclude</span>
              {Object.keys(tagStates).length > 0 && (
                <button
                  type="button"
                  onClick={() => setTagStates({})}
                  className="rounded px-1.5 py-0.5 normal-case tracking-normal text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tagSuggestions.map((tag) => {
                const st = tagStates[tag];
                const cls =
                  st === "in"
                    ? "border-primary bg-primary text-primary-foreground"
                    : st === "out"
                    ? "border-destructive bg-destructive/15 text-destructive line-through"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground";
                return (
                  <button
                    key={tag}
                    onClick={() => cycle(tag)}
                    title={
                      st === "in"
                        ? "Only cocktails with this tag"
                        : st === "out"
                        ? "Hide cocktails with this tag"
                        : "Click to require, click again to exclude"
                    }
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors ${cls}`}
                  >
                    {st === "in" && <Check className="h-3 w-3" />}
                    {st === "out" && <Ban className="h-3 w-3" />}
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