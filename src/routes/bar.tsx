/**
 * Bar Program tab.
 *
 * Single search bar, queries across name, menu description, ingredients,
 * dietary tags, garnish, character, story, etc. (see searchHaystack in
 * src/lib/cocktails.ts). Multi-word queries are AND-matched.
 *
 * Each cocktail is rendered as a tap-to-expand flashcard
 * (src/components/CocktailCard.tsx).
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, X, Check, Ban, GraduationCap, ChevronDown } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { CocktailCard } from "@/components/CocktailCard";
import { ALL_COCKTAILS, filterCocktails, allDietaryTags } from "@/lib/cocktails";
import { RARE_CATEGORIES } from "@/data/rare-spirits";
import { BEERS } from "@/data/beers";
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
  const [openId, setOpenId] = useState<string | null>(null);
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
        <div className="mb-3 flex justify-end">
          <Link
            to="/bar/study"
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <GraduationCap className="h-3.5 w-3.5" /> Study mode
          </Link>
        </div>
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
              <span>Allergens, tap to require, tap again to exclude</span>
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
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">
              Specialty Cocktails
            </h2>
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
              <CocktailCard
                key={c.id}
                cocktail={c}
                highlight={q}
                open={openId === c.id}
                onToggle={() =>
                  setOpenId((cur) => (cur === c.id ? null : c.id))
                }
              />
            ))
          )}
        </div>

        <RareAndLimitedSection />
        <BeerSection />
      </main>
    </div>
  );
}

function RareAndLimitedSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const total = RARE_CATEGORIES.reduce((n, c) => n + c.pours.length, 0);
  return (
    <section className="mt-12">
      <div className="mb-3 border-b border-border pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Rare &amp; Limited
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {total} pours · priced per 1oz / 2oz · tap for the story
        </p>
      </div>
      <div className="space-y-6">
        {RARE_CATEGORIES.map((cat) => (
          <div key={cat.id}>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {cat.label}
            </h3>
            <div className="grid gap-2">
              {cat.pours.map((p) => {
                const open = openId === p.id;
                return (
                  <article
                    key={p.id}
                    className={`rounded-lg border bg-card transition-colors ${
                      open ? "border-primary/50" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenId((cur) => (cur === p.id ? null : p.id))
                      }
                      aria-expanded={open}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold leading-snug text-foreground">
                          {p.name}
                        </h4>
                      </div>
                      <div className="shrink-0 text-right text-sm tabular-nums text-primary">
                        ${p.oneOz} <span className="text-muted-foreground">/</span> ${p.twoOz}
                      </div>
                      <ChevronDown
                        className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                        {p.note}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BeerSection() {
  return (
    <section className="mt-12">
      <div className="mb-3 border-b border-border pb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
          Beer
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {BEERS.length} bottles &amp; cans
        </p>
      </div>
      <div className="grid gap-2">
        {BEERS.map((b) => (
          <article
            key={b.id}
            className="rounded-lg border border-border bg-card px-4 py-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="text-sm font-semibold text-foreground">{b.name}</h4>
              <span className="shrink-0 text-sm tabular-nums text-primary">
                ${b.price}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {b.style} · {b.origin} · {b.format}
            </p>
            {b.note && (
              <p className="mt-1 text-xs text-foreground/80">{b.note}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}