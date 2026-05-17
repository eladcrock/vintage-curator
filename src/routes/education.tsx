/**
 * Education — region-coded mindmap.
 *
 * Layout: country map (left) acts as a visual index. Region nodes (right) are
 * grouped by zone and color-coded. Click any node to expand inline drop-downs
 * for: Overview · Terroir · Grapes · On our list. Wine refs are name +
 * vintage + price only.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { RegionMap } from "@/components/RegionMap";
import { CLASSES, REGIONS, type Country, type Region } from "@/data/education";
import { winesForRegion, zoneColor } from "@/lib/education";
import type { Wine } from "@/lib/wines";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Bottega Pro · Education" },
      { name: "description", content: "Region-coded wine mindmap — Bottega Wine Class #1–#5, cross-referenced with our list." },
      { property: "og:title", content: "Bottega Pro · Education" },
      { property: "og:description", content: "Where knowledge meets service — a region-coded wine mindmap." },
    ],
  }),
  component: EducationPage,
});

const KIND_EMOJI: Record<string, string> = {
  red: "🍷", white: "🥂", sparkling: "🍾", dessert: "🍯", rose: "🌸",
};

// Visual color-coding for wine types — keeps red vs white instantly scannable.
const TYPE_STYLE: Record<string, { bar: string; chip: string; label: string }> = {
  Red:       { bar: "oklch(0.42 0.16 18)",  chip: "bg-[oklch(0.42_0.16_18)] text-white",        label: "Red" },
  White:     { bar: "oklch(0.80 0.12 70)",  chip: "bg-[oklch(0.92_0.09_70)] text-[oklch(0.32_0.08_55)]", label: "White" },
  Sparkling: { bar: "oklch(0.85 0.08 70)",  chip: "bg-[oklch(0.95_0.06_70)] text-[oklch(0.32_0.08_55)]", label: "Sparkling" },
  Rosé:      { bar: "oklch(0.78 0.12 15)",  chip: "bg-[oklch(0.90_0.08_15)] text-[oklch(0.35_0.10_15)]", label: "Rosé" },
  Orange:    { bar: "oklch(0.70 0.16 60)",  chip: "bg-[oklch(0.88_0.10_60)] text-[oklch(0.35_0.10_50)]", label: "Orange" },
  Dessert:   { bar: "oklch(0.70 0.14 85)",  chip: "bg-[oklch(0.90_0.10_85)] text-[oklch(0.35_0.08_70)]", label: "Dessert" },
};
const DEFAULT_TYPE = { bar: "oklch(0.6 0 0)", chip: "bg-muted text-foreground", label: "—" };

// Grape-kind tinting for the Grapes drop-down.
const KIND_TINT: Record<string, string> = {
  red:       "border-l-[3px] border-l-[oklch(0.42_0.16_18)]",
  white:     "border-l-[3px] border-l-[oklch(0.78_0.12_70)]",
  sparkling: "border-l-[3px] border-l-[oklch(0.85_0.08_70)]",
  rose:      "border-l-[3px] border-l-[oklch(0.78_0.12_15)]",
  dessert:   "border-l-[3px] border-l-[oklch(0.70_0.14_85)]",
};

function priceLabel(w: Wine): string {
  const parts: string[] = [];
  if (w.priceGlass != null) parts.push(`gl $${w.priceGlass}`);
  if (w.priceBottle != null) parts.push(`btl $${w.priceBottle}`);
  return parts.join(" · ") || "—";
}

function wineName(w: Wine): string {
  // Name only — producer + cuvee fallbacks.
  if (w.cuvee && w.producer) return `${w.producer} · ${w.cuvee}`;
  return w.cuvee || w.producer || w.varietal || "Untitled";
}

function EducationPage() {
  const [country, setCountry] = useState<Country>("Italy");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [openClassId, setOpenClassId] = useState<number | null>(null);
  const [readClassId, setReadClassId] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [onlyOnList, setOnlyOnList] = useState(false);
  const selectedId = openId;

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const onMapSelect = (id: string) => {
    setOpenId(id);
    // Scroll to node
    requestAnimationFrame(() => {
      const el = document.getElementById(`region-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const visibleRegions = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REGIONS.filter((r) => r.country === country).filter((r) => {
      if (classFilter && r.classRef !== classFilter) return false;
      if (onlyOnList && winesForRegion(r).length === 0) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        (r.zone || "").toLowerCase().includes(q) ||
        r.grapes.some((g) => g.name.toLowerCase().includes(q) || g.notes.toLowerCase().includes(q))
      );
    });
  }, [country, query, classFilter, onlyOnList]);

  // Group by zone for the mindmap.
  const zones = useMemo(() => {
    const map = new Map<string, Region[]>();
    visibleRegions.forEach((r) => {
      const z = r.zone || "Other";
      if (!map.has(z)) map.set(z, []);
      map.get(z)!.push(r);
    });
    return Array.from(map.entries());
  }, [visibleRegions]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Education" />
      <main className="mx-auto max-w-6xl px-4 py-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Wine atlas &amp; study guide</h2>
          <p className="text-xs text-muted-foreground">
            Bottega Wine Class #1–#5, mapped. Tap a region on the map or in the list to read terroir, history, grapes, and the bottles we pour.
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
            placeholder="Search regions, zones, grapes…"
            className="flex-1 min-w-[180px] rounded-md border border-border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1.5 text-[11px] font-medium cursor-pointer select-none hover:bg-muted/40">
            <input
              type="checkbox"
              checked={onlyOnList}
              onChange={(e) => setOnlyOnList(e.target.checked)}
              className="h-3 w-3 accent-primary"
            />
            On list only
          </label>
        </div>

        {/* Quick class filter chips */}
        <div className="mb-4 -mx-4 overflow-x-auto px-4 pb-1">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mr-1">Class</span>
            <button
              onClick={() => setClassFilter(null)}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                classFilter === null ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >All</button>
            {CLASSES.map((c) => {
              const active = classFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setClassFilter(active ? null : c.id)}
                  title={c.blurb}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >#{c.id}</button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          {/* Map + legend (sticky on desktop) */}
          <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-lg border border-border bg-card p-3">
              <RegionMap
                country={country}
                regions={visibleRegions}
                selectedId={selectedId}
                onSelect={onMapSelect}
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Zone legend</h3>
              <ul className="space-y-1">
                {zones.map(([zone]) => (
                  <li key={zone} className="flex items-center gap-2 text-xs">
                    <span
                      aria-hidden
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{ background: zoneColor(zone) }}
                    />
                    <span>{zone}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Wine classes</h3>
              <ul className="space-y-1">
                {CLASSES.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => setOpenClassId((p) => (p === c.id ? null : c.id))}
                      className="flex w-full items-center justify-between gap-2 rounded px-2 py-1.5 text-left text-[11px] hover:bg-muted/40 transition-colors"
                      aria-expanded={openClassId === c.id}
                    >
                      <span className="font-medium">{c.title}</span>
                      <span aria-hidden className="text-muted-foreground">{openClassId === c.id ? "−" : "+"}</span>
                    </button>
                    {openClassId === c.id && (
                      <div className="px-2 pb-2 text-[11px] text-muted-foreground space-y-1.5">
                        <p>{c.blurb}</p>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          <button
                            onClick={() => { setClassFilter(c.id); setOpenClassId(null); }}
                            className="inline-block rounded-full border border-border px-2 py-0.5 text-[10px] font-medium hover:bg-muted/60"
                          >
                            Filter regions →
                          </button>
                          <button
                            onClick={() => setReadClassId(c.id)}
                            className="inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground hover:opacity-90"
                          >
                            Read full class
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mindmap: zones → regions */}
          <section className="space-y-5">
            {zones.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No regions match "{query}".</p>
            )}
            {zones.map(([zone, regions]) => {
              const color = zoneColor(zone);
              return (
                <div key={zone}>
                  <div className="mb-2 flex items-center gap-2">
                    <span aria-hidden className="inline-block h-3 w-3 rounded-full" style={{ background: color }} />
                    <h3 className="text-xs font-semibold uppercase tracking-wider">{zone}</h3>
                    <span className="text-[10px] text-muted-foreground">· {regions.length}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {regions.map((r) => (
                      <RegionNode
                        key={r.id}
                        region={r}
                        open={openId === r.id}
                        active={selectedId === r.id}
                        color={color}
                        onToggle={() => toggle(r.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
      <ClassReadDialog classId={readClassId} onClose={() => setReadClassId(null)} />
    </div>
  );
}

function RegionNode({
  region, open, active, color, onToggle,
}: { region: Region; open: boolean; active: boolean; color: string; onToggle: () => void }) {
  const wines = useMemo(() => winesForRegion(region), [region]);

  return (
    <div
      id={`region-${region.id}`}
      className={`rounded-lg border bg-card transition-colors ${active ? "border-foreground/40" : "border-border"}`}
      style={{ boxShadow: open ? `inset 3px 0 0 0 ${color}` : undefined }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full shrink-0" style={{ background: color }} />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{region.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Class {region.classRef} · {wines.length} on list
            </div>
          </div>
        </div>
        <span aria-hidden className="text-muted-foreground text-xs">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="border-t border-border/60 px-3 py-3 text-xs">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="h-8 w-full justify-start gap-1 overflow-x-auto bg-muted/40 p-1">
              <TabsTrigger value="overview" className="h-6 px-2 text-[10px] uppercase tracking-wider">Overview</TabsTrigger>
              <TabsTrigger value="notes" className="h-6 px-2 text-[10px] uppercase tracking-wider">Wine Notes</TabsTrigger>
              <TabsTrigger value="history" className="h-6 px-2 text-[10px] uppercase tracking-wider">History</TabsTrigger>
              <TabsTrigger value="grapes" className="h-6 px-2 text-[10px] uppercase tracking-wider">Grapes · {region.grapes.length}</TabsTrigger>
              <TabsTrigger value="list" className="h-6 px-2 text-[10px] uppercase tracking-wider">List · {wines.length}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-3 space-y-2">
              <p className="text-foreground/90">{region.summary}</p>
              {region.terroir && (
                <p className="text-muted-foreground"><span className="font-semibold uppercase tracking-wider text-[10px] text-foreground/70">Terroir · </span>{region.terroir}</p>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-3">
              {region.wineNotes ? (
                <p className="text-foreground/90 whitespace-pre-line">{region.wineNotes}</p>
              ) : (
                <div className="space-y-2">
                  <p className="italic text-muted-foreground">
                    Signature profile distilled from this region's grapes — extended service notes coming from Wine Class materials.
                  </p>
                  <ul className="space-y-1">
                    {region.grapes.slice(0, 4).map((g) => (
                      <li key={g.name} className="text-foreground/90">
                        <span className="font-semibold">{g.name}:</span>{" "}
                        <span className="text-muted-foreground">{g.notes}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-3">
              {region.history ? (
                <p className="text-foreground/90 whitespace-pre-line">{region.history}</p>
              ) : (
                <p className="italic text-muted-foreground">
                  Historical context for {region.name} — to be parsed from Wine Class #{region.classRef} materials.
                </p>
              )}
            </TabsContent>

            <TabsContent value="grapes" className="mt-3">
              <ul className="space-y-1.5">
                {region.grapes.map((g) => (
                  <li key={g.name} className={`flex gap-2 rounded-r pl-2 py-1 ${KIND_TINT[g.kind] ?? ""}`}>
                    <span aria-hidden className="text-sm leading-none">{KIND_EMOJI[g.kind] ?? "🍇"}</span>
                    <div>
                      <div className="font-semibold">{g.name}</div>
                      <div className="text-muted-foreground">{g.notes}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="list" className="mt-3">
              {wines.length === 0 ? (
                <p className="italic text-muted-foreground">No bottles from this region on the list.</p>
              ) : (
                <ul className="divide-y divide-border/60">
                  {wines.map((w) => {
                    const ts = TYPE_STYLE[w.type] ?? DEFAULT_TYPE;
                    return (
                      <li key={w.id} className="flex items-start gap-2 py-1.5">
                        <span
                          aria-hidden
                          className="mt-0.5 inline-block w-1 self-stretch rounded-sm shrink-0"
                          style={{ background: ts.bar }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block rounded px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-wider ${ts.chip}`}>
                              {ts.label}
                            </span>
                            <div className="font-medium truncate">{wineName(w)}</div>
                          </div>
                          <div className="text-[10px] text-muted-foreground">{w.vintage}</div>
                        </div>
                        <div className="text-right text-[10px] text-muted-foreground whitespace-nowrap">
                          {priceLabel(w)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

function ClassReadDialog({ classId, onClose }: { classId: 1 | 2 | 3 | 4 | 5 | null; onClose: () => void }) {
  const cls = classId ? CLASSES.find((c) => c.id === classId) : null;
  const regions = useMemo(
    () => (classId ? REGIONS.filter((r) => r.classRef === classId) : []),
    [classId],
  );

  return (
    <Dialog open={classId !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        {cls && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base">{cls.title}</DialogTitle>
              <DialogDescription className="text-xs">{cls.blurb}</DialogDescription>
            </DialogHeader>
            <div className="mt-3 space-y-6 text-sm">
              {regions.map((r) => (
                <article key={r.id} className="border-t border-border/60 pt-4 first:border-t-0 first:pt-0">
                  <header className="mb-2">
                    <h3 className="text-base font-semibold">{r.name}</h3>
                    {r.zone && (
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.zone}</p>
                    )}
                  </header>
                  <p className="text-foreground/90">{r.summary}</p>
                  {r.terroir && (
                    <p className="mt-2 text-muted-foreground">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-foreground/70">Terroir · </span>
                      {r.terroir}
                    </p>
                  )}
                  {r.wineNotes && (
                    <div className="mt-2">
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">Wine Notes</h4>
                      <p className="whitespace-pre-line text-foreground/90">{r.wineNotes}</p>
                    </div>
                  )}
                  {r.history && (
                    <div className="mt-2">
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">History</h4>
                      <p className="whitespace-pre-line text-foreground/90">{r.history}</p>
                    </div>
                  )}
                  {r.grapes.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/70">Grapes</h4>
                      <ul className="space-y-0.5">
                        {r.grapes.map((g) => (
                          <li key={g.name} className="text-foreground/90">
                            <span className="font-semibold">{g.name}</span>
                            <span className="text-muted-foreground"> — {g.notes}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
