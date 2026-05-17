/**
 * Experiences tab — AI-curated chef's tasting menus.
 *
 * Server: src/routes/api/curate.ts
 * Domain: src/lib/experiences.ts
 * Prompt: src/data/experiences.ts
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { CuratorForm } from "@/components/CuratorForm";
import { MenuOptionCard } from "@/components/MenuOptionCard";
import type { CurateResponse, ExperienceRequest, MenuOption } from "@/lib/experiences";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<MenuOption[] | null>(null);
  const [lastReq, setLastReq] = useState<ExperienceRequest | null>(null);

  async function curate(req: ExperienceRequest) {
    setLoading(true);
    setError(null);
    setLastReq(req);
    try {
      const res = await fetch("/api/curate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      const json = (await res.json().catch(() => ({}))) as
        | CurateResponse
        | { error?: string };
      if (!res.ok) {
        setOptions(null);
        setError(
          ("error" in json && json.error) ||
            `Request failed (${res.status}).`,
        );
        return;
      }
      setOptions(("options" in json && json.options) || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setOptions(null);
    } finally {
      setLoading(false);
    }
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

        <CuratorForm onSubmit={curate} loading={loading} />

        {error && (
          <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {loading && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Crafting menus…
          </p>
        )}

        {!loading && options && options.length > 0 && lastReq && (
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