/**
 * Experiences tab — deterministic chef's tasting menus (no AI).
 *
 * Logic:     src/lib/curator.ts
 * Tunables:  src/data/experiences.ts
 * Types:     src/lib/experiences.ts
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { CuratorForm } from "@/components/CuratorForm";
import { MenuOptionCard } from "@/components/MenuOptionCard";
import { curateMenus } from "@/lib/curator";
import type { ExperienceRequest, MenuOption } from "@/lib/experiences";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Bottega Pro · Experiences" },
      {
        name: "description",
        content: "AI-curated chef's tasting menus by budget and dietary needs.",
      },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<MenuOption[] | null>(null);
  const [lastReq, setLastReq] = useState<ExperienceRequest | null>(null);

  function curate(req: ExperienceRequest) {
    setError(null);
    setLastReq(req);
    const result = curateMenus(req);
    if ("error" in result) {
      setOptions(null);
      setError(result.error);
      return;
    }
    setOptions(result.options);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Experiences" />
      <main className="mx-auto max-w-3xl px-4 py-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Experience curator</h2>
          <p className="text-xs text-muted-foreground">
            Set guests, per-person budget range, and table notes. The curator returns two chef's menus drawn from the current menu.
          </p>
        </div>

        <CuratorForm onSubmit={curate} loading={false} />

        {error && (
          <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {options && options.length > 0 && lastReq && (
          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {options.map((o, i) => (
              <MenuOptionCard key={i} option={o} guests={lastReq.guests} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}