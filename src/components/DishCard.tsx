/**
 * Flashcard for a single dish.
 * Collapsed: name, price, menu description, dietary tag chips.
 * Expanded: preparation, ingredient sub-recipes, info, modifications, mark.
 *
 * State is local — each card manages its own open/closed flag.
 */
import { useState } from "react";
import { ChevronDown, Flame } from "lucide-react";
import type { Dish } from "@/lib/food";

export function DishCard({
  dish,
  highlight,
}: {
  dish: Dish;
  /** Optional search query to highlight matched substrings. */
  highlight?: string;
}) {
  const [open, setOpen] = useState(false);
  const d = dish;

  return (
    <article
      className={`rounded-lg border bg-card transition-colors ${
        open ? "border-primary/50" : "border-border hover:border-primary/40"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-semibold leading-snug text-foreground">
              <Highlight text={d.name} query={highlight} />
            </h3>
            <span className="shrink-0 text-sm tabular-nums text-primary">{d.price}</span>
          </div>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            <Highlight text={d.description} query={highlight} />
          </p>
          {d.dietaryRestrictions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {d.dietaryRestrictions.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronDown
          className={`mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-border px-4 py-3 text-sm">
          {(d.fireTime || d.mark) && (
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {d.fireTime && (
                <span className="inline-flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {d.fireTime}
                </span>
              )}
              {d.mark && (
                <span className="rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] uppercase">
                  Mark · {d.mark}
                </span>
              )}
            </div>
          )}

          <Section label="Preparation">
            <p className="text-foreground/90">{d.preparation}</p>
          </Section>

          {d.ingredients.length > 0 && (
            <Section label="Ingredients & Sub-recipes">
              <dl className="space-y-2">
                {d.ingredients.map((i) => (
                  <div key={i.name}>
                    <dt className="font-semibold text-foreground">{i.name}</dt>
                    <dd className="text-muted-foreground">{i.note}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {d.info && (
            <Section label="Info / Story">
              <p className="italic text-muted-foreground">{d.info}</p>
            </Section>
          )}

          <Section label="Modifications">
            <p className="text-foreground/90">{d.modifications}</p>
          </Section>

          <Section label="Allergens / Dietary">
            <p className="text-foreground/90">
              {d.dietaryRestrictions.length
                ? d.dietaryRestrictions.join(", ")
                : "No notable restrictions."}
            </p>
          </Section>
        </div>
      )}
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}

/** Simple case-insensitive substring highlighter. */
function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim();
  if (!q) return <>{text}</>;
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return <>{text}</>;
  const pattern = new RegExp(
    `(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "ig",
  );
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((p, i) =>
        pattern.test(p) ? (
          <mark key={i} className="rounded bg-primary/25 px-0.5 text-foreground">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}