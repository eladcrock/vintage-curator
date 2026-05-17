import type { Wine } from "@/lib/wines";
import { displayPrice, wineSubtitle } from "@/lib/wines";

const TYPE_COLORS: Record<Wine["type"], string> = {
  Red: "bg-[oklch(0.32_0.08_25)] text-[oklch(0.95_0.02_30)]",
  White: "bg-[oklch(0.32_0.04_95)] text-[oklch(0.96_0.02_95)]",
  Sparkling: "bg-[oklch(0.32_0.05_80)] text-[oklch(0.96_0.02_85)]",
  Rosé: "bg-[oklch(0.32_0.06_15)] text-[oklch(0.96_0.02_20)]",
  Orange: "bg-[oklch(0.32_0.08_60)] text-[oklch(0.96_0.02_60)]",
  Dessert: "bg-[oklch(0.32_0.06_50)] text-[oklch(0.96_0.02_55)]",
  Other: "bg-muted text-muted-foreground",
};

export function WineCard({ wine }: { wine: Wine }) {
  return (
    <article className="rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${TYPE_COLORS[wine.type] ?? TYPE_COLORS.Other}`}>
            {wine.type}
          </span>
          <span className="tabular-nums text-primary">{wine.vintage}</span>
          {wine.largeFormat && wine.size && wine.size !== "750mL" && (
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] tabular-nums">
              {wine.size}
            </span>
          )}
          {wine.byTheGlass && (
            <span className="rounded border border-primary/40 px-1.5 py-0.5 text-[10px] text-primary">
              BTG
            </span>
          )}
        </div>
        <div className="shrink-0 text-right text-sm tabular-nums text-primary">
          {displayPrice(wine)}
        </div>
      </div>
      <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
        {wine.producer}
      </h3>
      <p className="mt-0.5 text-sm text-muted-foreground leading-snug">
        {wineSubtitle(wine)}
      </p>
      {wine.code && (
        <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground/70">
          Bin {wine.code}
        </p>
      )}
    </article>
  );
}