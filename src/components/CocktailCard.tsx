/**
 * Flashcard for a single cocktail.
 * Collapsed view: name, price, menu description, dietary tag chips.
 * Expanded view: character, builds (a la minute / batched), ingredient notes,
 * garnish, modifications, story.
 *
 * State is local — each card manages its own open/closed flag.
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Cocktail } from "@/lib/cocktails";
import { formatCocktailPrice } from "@/lib/cocktails";

export function CocktailCard({
  cocktail,
  highlight,
}: {
  cocktail: Cocktail;
  /** Optional search query to highlight matched substrings. */
  highlight?: string;
}) {
  const [open, setOpen] = useState(false);
  const c = cocktail;

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
              <Highlight text={c.name} query={highlight} />
            </h3>
            <span className="shrink-0 text-sm tabular-nums text-primary">
              {formatCocktailPrice(c)}
            </span>
          </div>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">
            <Highlight text={c.menuDescription} query={highlight} />
          </p>
          {(c.dietaryRestrictions.length > 0 || (c.tags && c.tags.length > 0)) && (
            <div className="mt-2 flex flex-wrap gap-1">
              {c.dietaryRestrictions.map((d) => (
                <span
                  key={`d-${d}`}
                  className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-primary"
                >
                  {d}
                </span>
              ))}
              {c.tags?.map((t) => (
                <span
                  key={`t-${t}`}
                  className="rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground"
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
          <Section label="Character">
            <p className="text-foreground/90">{c.character}</p>
          </Section>

          {c.aLaMinute.length > 0 && (
            <Section label="A La Minute">
              <RecipeList lines={c.aLaMinute} />
            </Section>
          )}

          {c.batched.length > 0 && (
            <Section label="Batched">
              <RecipeList lines={c.batched} />
            </Section>
          )}

          {c.ingredients.length > 0 && (
            <Section label="Ingredients">
              <dl className="space-y-2">
                {c.ingredients.map((i) => (
                  <div key={i.name}>
                    <dt className="font-semibold text-foreground">{i.name}</dt>
                    <dd className="text-muted-foreground">{i.note}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          <Section label="Garnish">
            <p className="text-foreground/90">{c.garnish}</p>
          </Section>

          {c.story && (
            <Section label="Story">
              <p className="text-muted-foreground italic">{c.story}</p>
            </Section>
          )}

          <Section label="Modifications">
            <p className="text-foreground/90">{c.modifications}</p>
          </Section>

          <Section label="Dietary">
            <p className="text-foreground/90">
              {c.dietaryRestrictions.length
                ? c.dietaryRestrictions.join(", ")
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

function RecipeList({ lines }: { lines: string[] }) {
  return (
    <ol className="space-y-1 tabular-nums text-foreground/90">
      {lines.map((line, i) => (
        <li key={i} className="leading-snug">
          {line}
        </li>
      ))}
    </ol>
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
          <mark key={i} className="bg-primary/25 text-foreground rounded px-0.5">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}