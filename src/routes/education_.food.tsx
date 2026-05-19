/**
 * Food education - purveyor & sourcing atlas.
 * Data lives in src/data/food-education.ts.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GraduationCap, Search, X } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { EducationToggle } from "@/components/EducationToggle";
import {
  FOOD_EDUCATION,
  FOOD_EDU_CATEGORIES,
  type FoodEduCategory,
} from "@/data/food-education";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/education_/food")({
  head: () => ({
    meta: [
      { title: "Bottega Pro · Food Education" },
      {
        name: "description",
        content:
          "Sourcing & purveyor knowledge for Bottega's menu — Senku Wagyu, Creekstone Farms, Anson Mills, Gioia Burrata, Gragnano pasta, and the Chiarello signatures.",
      },
    ],
  }),
  component: FoodEducationPage,
});

function FoodEducationPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FoodEduCategory | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOOD_EDUCATION.filter((e) => !cat || e.category === cat).filter((e) => {
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q) ||
        e.body.some((p) => p.toLowerCase().includes(q)) ||
        e.dishes.some((d) => d.toLowerCase().includes(q)) ||
        e.tags.some((t) => t.includes(q))
      );
    });
  }, [query, cat]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Education" />
      <main className="mx-auto max-w-3xl px-4 py-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-2">
              <EducationToggle active="food" />
            </div>
            <h2 className="text-lg font-semibold">Sourcing &amp; signatures</h2>
            <p className="text-xs text-muted-foreground">
              Who supplies our ingredients, why it matters, and the Chiarello signatures behind the menu.
            </p>
          </div>
          <Link
            to="/education/food/study"
            className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
          >
            <GraduationCap className="h-3.5 w-3.5" /> Sourcing quiz
          </Link>
        </div>

        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search purveyor, dish, region… (e.g. wagyu, polenta, gragnano)"
            className="h-10 pl-10 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <button
            onClick={() => setCat(null)}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
              cat === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {FOOD_EDU_CATEGORIES.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(active ? null : c)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/50 px-4 py-10 text-center text-sm text-muted-foreground">
            No sourcing notes match that filter.
          </div>
        ) : (
          <div className="grid gap-2">
            {filtered.map((e) => {
              const open = openId === e.id;
              return (
                <article
                  key={e.id}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <button
                    onClick={() => setOpenId(open ? null : e.id)}
                    className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-card/80"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {e.category}
                      </div>
                      <h3 className="mt-0.5 text-sm font-semibold">{e.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {e.tagline}
                      </p>
                    </div>
                    <span className="mt-1 text-xs text-muted-foreground">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div className="space-y-3 border-t border-border px-4 py-4 text-sm leading-relaxed">
                      {e.body.map((para, i) => (
                        <p key={i} className="text-foreground/90">
                          {para}
                        </p>
                      ))}
                      {e.dishes.length > 0 && (
                        <div className="pt-1 text-xs">
                          <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                            On the menu:{" "}
                          </span>
                          <span className="text-foreground/80">
                            {e.dishes.join(" · ")}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}