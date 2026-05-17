/**
 * Education tab — region-driven study tool.
 *
 * Sources:  /src/data/education.ts  (regions, class metadata, wine matchers)
 * Map:      /src/components/RegionMap.tsx
 * Wines:    /src/lib/education.ts   (winesForRegion bridges to ALL_WINES)
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { RegionMap } from "@/components/RegionMap";
import { CLASSES, REGIONS, type Country, type Region } from "@/data/education";
import { winesForRegion, wineEmoji } from "@/lib/education";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Bottega Pro · Education" },
      { name: "description", content: "Study the wine list by region — Bottega Wine Class #1 through #5, mapped to the bottles on our list." },
      { property: "og:title", content: "Bottega Pro · Education" },
      { property: "og:description", content: "Where knowledge meets service — geographic study of the wine list." },
    ],
  }),
  component: EducationPage,
});

const KIND_EMOJI: Record<string, string> = {
  red: "🍷", white: "🥂", sparkling: "🍾", dessert: "🍯", rose: "🌸",
};

function EducationPage() {
  const [country, setCountry] = useState<Country>("Italy");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("piedmont");

  const filteredRegions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return REGIONS;
    return REGIONS.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q) ||
      r.grapes.some((g) => g.name.toLowerCase().includes(q) || g.notes.toLowerCase().includes(q)),
    );
  }, [query]);

  const selected: Region | undefined = REGIONS.find((r) => r.id === selectedId);
  const wines = selected ? winesForRegion(selected) : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Education" />
      <main className="mx-auto max-w-5xl px-4 py-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Where knowledge meets service</h2>
          <p className="text-xs text-muted-foreground">
            Browse Italy and France by region. Each region pulls notes from Wine Class #1–#5 and surfaces every matching bottle from our list.
          </p>
        </div>

        {/* Country tabs + search */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-md border border-border p-1">
            {(["Italy", "France"] as Country[]).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  country === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search regions, grapes, terms…"
            className="flex-1 min-w-[180px] rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1.4fr]">
          {/* Map + region list */}
          <aside className="space-y-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <RegionMap
                country={country}
                regions={REGIONS}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {country} · regions {query && `(${filteredRegions.filter((r) => r.country === country).length})`}
              </h3>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {filteredRegions.filter((r) => r.country === country).map((r) => {
                  const active = r.id === selectedId;
                  return (
                    <li key={r.id}>
                      <button
                        onClick={() => setSelectedId(r.id)}
                        className={`w-full rounded px-2 py-1 text-left text-xs transition-colors ${
                          active
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        <span className="font-medium">{r.name}</span>
                        {r.zone && <span className="ml-1 text-[10px] opacity-60">· {r.zone}</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Wine classes</h3>
              <ul className="space-y-1.5">
                {CLASSES.map((c) => (
                  <li key={c.id} className="text-xs">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-[11px] text-muted-foreground">{c.blurb}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Master content */}
          <section className="rounded-lg border border-border bg-card p-4">
            {selected ? (
              <>
                <div className="mb-3">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Class {selected.classRef}{selected.zone ? ` · ${selected.zone}` : ""} · {selected.country}
                  </div>
                  <h2 className="mt-0.5 text-xl font-semibold">{selected.name}</h2>
                </div>

                <p className="text-sm text-foreground/90">{selected.summary}</p>
                {selected.terroir && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider">Terroir · </span>
                    {selected.terroir}
                  </p>
                )}

                <h3 className="mt-5 mb-2 text-sm font-semibold">Key grapes & wines</h3>
                <ul className="space-y-2">
                  {selected.grapes.map((g) => (
                    <li key={g.name} className="flex gap-2 rounded-md border border-border/60 p-2 text-xs">
                      <span aria-hidden className="text-base leading-none">{KIND_EMOJI[g.kind] ?? "🍇"}</span>
                      <div>
                        <div className="font-semibold">{g.name}</div>
                        <div className="text-muted-foreground">{g.notes}</div>
                      </div>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-5 mb-2 text-sm font-semibold">
                  On our list <span className="text-muted-foreground font-normal">({wines.length})</span>
                </h3>
                {wines.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No bottles from this region are currently on the list.</p>
                ) : (
                  <ul className="divide-y divide-border/60">
                    {wines.map((w) => (
                      <li key={w.id} className="flex items-start gap-2 py-1.5 text-xs">
                        <span aria-hidden className="text-sm leading-none">{wineEmoji(w)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {w.producer} {w.cuvee && <span className="text-muted-foreground">· {w.cuvee}</span>}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">
                            {w.vintage} · {[w.varietal, w.region].filter(Boolean).join(" · ")}
                          </div>
                        </div>
                        <div className="text-right text-[11px] text-muted-foreground whitespace-nowrap">
                          {w.priceGlass != null && <div>gl ${w.priceGlass}</div>}
                          {w.priceBottle != null && <div>btl ${w.priceBottle}</div>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 text-[11px] text-muted-foreground">
                  Want to pour these? <Link to="/" className="underline underline-offset-2 hover:text-foreground">Browse the full wine list →</Link>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Select a region on the map to begin.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}