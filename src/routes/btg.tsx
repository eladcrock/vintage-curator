import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { BTG_WINES, type BTGWine } from "@/data/btg-wines";

export const Route = createFileRoute("/btg")({
  head: () => ({
    meta: [
      { title: "BTG Wines - Bottega Pro" },
      { name: "description", content: "By-the-glass wine talking points and study drills." },
      { property: "og:title", content: "BTG Wines - Bottega Pro" },
      { property: "og:description", content: "By-the-glass wine talking points and study drills." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BtgPage,
});

const CATEGORIES: BTGWine["category"][] = [
  "Sparkling",
  "White",
  "Rose",
  "Red",
  "Dessert",
  "Fortified",
];

function BtgPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="BTG Wines - talking points" />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-4 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">By-the-glass talking points</h2>
            <p className="text-xs text-muted-foreground">
              Tap a wine to expand its talking points. {BTG_WINES.length} wines on the list.
            </p>
          </div>
          <Button asChild variant="default" size="sm">
            <Link to="/btg/study">
              <GraduationCap className="h-4 w-4" /> Study
            </Link>
          </Button>
        </div>

        {CATEGORIES.map((cat) => {
          const wines = BTG_WINES.filter((w) => w.category === cat);
          if (!wines.length) return null;
          return (
            <section key={cat} className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {cat}
              </h3>
              <div className="space-y-2">
                {wines.map((w) => {
                  const open = openId === w.id;
                  return (
                    <div
                      key={w.id}
                      className="rounded-lg border border-border bg-card"
                    >
                      <button
                        onClick={() => setOpenId(open ? null : w.id)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                      >
                        <div>
                          <div className="text-sm font-semibold leading-snug">{w.name}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {w.producer} · {w.appellation} · {w.region}
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="border-t border-border px-4 py-3">
                          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/90">
                            {w.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                          <p className="mt-3 text-sm">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                              Tasting notes ·{" "}
                            </span>
                            {w.tasting}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}