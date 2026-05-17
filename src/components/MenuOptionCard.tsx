/**
 * Renders one AI-curated chef's menu option.
 */
import { lookupDish, type MenuOption } from "@/lib/experiences";

export function MenuOptionCard({
  option,
  guests,
}: {
  option: MenuOption;
  guests: number;
}) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm">
      <header className="mb-3 border-b border-border pb-3">
        <h3 className="text-base font-semibold">{option.title}</h3>
        <p className="mt-0.5 text-xs italic text-muted-foreground">{option.style}</p>
      </header>

      <ol className="space-y-3">
        {option.courses.map((c, i) => {
          const dish = lookupDish(c.dishId);
          const courseAddOns = option.addOns.filter((a) => a.course === c.category);
          return (
            <li key={`${c.dishId}-${i}`} className="text-sm">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {c.category}
                  </p>
                  <p className="font-medium">{dish?.name ?? c.dishName}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                  ${c.price}
                </span>
              </div>
              {dish?.description && (
                <p className="mt-0.5 text-xs text-muted-foreground">{dish.description}</p>
              )}
              {c.reasoning && (
                <p className="mt-1 text-[11px] italic text-foreground/70">
                  — {c.reasoning}
                </p>
              )}
              {dish && dish.dietaryRestrictions.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {dish.dietaryRestrictions.map((d) => (
                    <span
                      key={d}
                      className="rounded-sm bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}
              {courseAddOns.length > 0 && (
                <ul className="mt-1.5 space-y-0.5">
                  {courseAddOns.map((a, k) => (
                    <li
                      key={k}
                      className="flex items-baseline justify-between gap-2 text-xs text-foreground/80"
                    >
                      <span>
                        + {a.name}{" "}
                        <span className="text-[10px] text-muted-foreground">
                          ({a.scope === "table" ? "table" : "per person"})
                        </span>
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        +${a.price}{a.scope === "table" ? "/table" : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      {option.addOns.filter((a) => a.course === "Any").length > 0 && (
        <ul className="mt-3 space-y-0.5 border-t border-dashed border-border pt-2">
          {option.addOns
            .filter((a) => a.course === "Any")
            .map((a, k) => (
              <li
                key={k}
                className="flex items-baseline justify-between gap-2 text-xs text-foreground/80"
              >
                <span>
                  + {a.name}{" "}
                  <span className="text-[10px] text-muted-foreground">
                    ({a.scope === "table" ? "table" : "per person"})
                  </span>
                </span>
                <span className="tabular-nums text-muted-foreground">
                  +${a.price}{a.scope === "table" ? "/table" : ""}
                </span>
              </li>
            ))}
        </ul>
      )}

      <footer className="mt-4 border-t border-border pt-3 text-sm">
        {option.addOnTotal > 0 && (
          <div className="mb-1 flex items-baseline justify-between text-xs text-muted-foreground">
            <span>Add-ons</span>
            <span className="tabular-nums">+${option.addOnTotal}/pp</span>
          </div>
        )}
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">Per person</span>
          <span className="font-semibold tabular-nums">${option.perPersonTotal}</span>
        </div>
        <div className="mt-0.5 flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">
            Table ({guests} {guests === 1 ? "guest" : "guests"})
          </span>
          <span className="font-semibold tabular-nums">${option.tableTotal}</span>
        </div>

        {option.accommodations && option.accommodations.toLowerCase() !== "none required" && (
          <p className="mt-2 rounded-md bg-muted/50 p-2 text-[11px] text-foreground/80">
            <span className="font-medium">Accommodations: </span>
            {option.accommodations}
          </p>
        )}
      </footer>
    </article>
  );
}