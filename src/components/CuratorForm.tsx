/**
 * Input form for the Experience Curator.
 * Hand-edit COMMON_RESTRICTIONS in src/lib/experiences.ts to add new chips.
 */
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { COMMON_RESTRICTIONS, type AddOn, type ExperienceRequest } from "@/lib/experiences";
import { AQ_PRICE_DEFAULTS, CAVIAR_DEFAULT_PRICE, CRUDO_DEFAULT_PRICE } from "@/data/experiences";
import { ALL_DISHES } from "@/lib/food";
import type { FoodCategory } from "@/lib/food";

const ADDON_COURSES: (FoodCategory | "Any")[] = [
  "Any",
  "Antipasti",
  "Pasta",
  "Secondi",
  "Contorni",
  "Dolci",
];

export function CuratorForm({
  onSubmit,
  loading,
}: {
  onSubmit: (req: ExperienceRequest) => void;
  loading: boolean;
}) {
  const [guests, setGuests] = useState(2);
  const [budgetMin, setBudgetMin] = useState(120);
  const [budgetMax, setBudgetMax] = useState(140);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [addName, setAddName] = useState("");
  const [addPrice, setAddPrice] = useState<string>("");
  const [addCourse, setAddCourse] = useState<FoodCategory | "Any">("Pasta");
  const [addKind, setAddKind] = useState<"upgrade" | "course">("upgrade");
  const [addScope, setAddScope] = useState<"person" | "table">("person");
  const [priceOverrides, setPriceOverrides] =
    useState<Record<string, number>>({ ...AQ_PRICE_DEFAULTS });
  const [pastaDuo, setPastaDuo] = useState(false);
  const [pushSteaks, setPushSteaks] = useState(false);
  const [pushCrudo, setPushCrudo] = useState(false);
  const [crudoPrice, setCrudoPrice] = useState<number>(CRUDO_DEFAULT_PRICE);
  const [pushCaviar, setPushCaviar] = useState(false);
  const [caviarPrice, setCaviarPrice] = useState<number>(CAVIAR_DEFAULT_PRICE);
  const hasCuratedRef = useRef(false);

  const min = Math.max(1, budgetMin || 0);
  // budgetMax = 0/empty means "no cap".
  const max = budgetMax > 0 ? Math.max(min, budgetMax) : Number.POSITIVE_INFINITY;
  const tableMin = min * guests;
  const tableMax = Number.isFinite(max) ? max * guests : null;
  const duoEligible = guests >= 2 && guests % 2 === 0;

  function toggle(r: string) {
    setRestrictions((cur) =>
      cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r],
    );
  }

  function addAddOn() {
    const name = addName.trim();
    const price = parseFloat(addPrice);
    if (!name || !price || price <= 0) return;
    // "course" replacement requires a specific category, not "Any".
    const kind = addCourse === "Any" ? "upgrade" : addKind;
    setAddOns((cur) => [...cur, { name, price, course: addCourse, kind, scope: addScope }]);
    setAddName("");
    setAddPrice("");
  }

  function removeAddOn(idx: number) {
    setAddOns((cur) => cur.filter((_, i) => i !== idx));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    hasCuratedRef.current = true;
    onSubmit({
      guests,
      budgetMin: min,
      budgetMax: max,
      restrictions,
      notes,
      addOns,
      priceOverrides,
      pastaDuo: pastaDuo && duoEligible,
      pushSteaks,
      pushCrudo,
      crudoPrice,
      pushCaviar,
      caviarPrice,
    });
  }

  // After the first curate, re-curate live whenever a quick toggle changes.
  useEffect(() => {
    if (!hasCuratedRef.current) return;
    onSubmit({
      guests,
      budgetMin: min,
      budgetMax: max,
      restrictions,
      notes,
      addOns,
      priceOverrides,
      pastaDuo: pastaDuo && duoEligible,
      pushSteaks,
      pushCrudo,
      crudoPrice,
      pushCaviar,
      caviarPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pastaDuo, pushSteaks, pushCrudo, pushCaviar, crudoPrice, caviarPrice]);

  const aqDishes = Object.keys(AQ_PRICE_DEFAULTS).map((id) => {
    const d = ALL_DISHES.find((x) => x.id === id);
    return { id, name: d?.name ?? id };
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-card p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">Guests</span>
          <Input
            type="number"
            min={1}
            max={40}
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Budget / person - min
          </span>
          <Input
            type="number"
            min={1}
            value={budgetMin || ""}
            onChange={(e) => setBudgetMin(parseInt(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Budget / person - max
          </span>
          <Input
            type="number"
            min={1}
            value={budgetMax || ""}
            onChange={(e) => setBudgetMax(parseInt(e.target.value) || 0)}
            onFocus={(e) => e.target.select()}
          />
        </label>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">
        Table total:{" "}
        <span className="font-medium text-foreground">
          ${tableMin}{tableMax !== null ? `–$${tableMax}` : "+ (no cap)"}
        </span>
        {" "}({guests} {guests === 1 ? "guest" : "guests"}, food only)
      </p>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Dietary restrictions
        </p>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_RESTRICTIONS.map((r) => {
            const on = restrictions.includes(r);
            return (
              <button
                type="button"
                key={r}
                onClick={() => toggle(r)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Tonight's open prices (A.Q.)
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {aqDishes.map((d) => (
            <label key={d.id} className="flex items-center gap-2 text-xs">
              <span className="flex-1 truncate text-muted-foreground">{d.name}</span>
              <span className="text-muted-foreground">$</span>
              <Input
                type="number"
                min={0}
                value={priceOverrides[d.id] ?? ""}
                onChange={(e) =>
                  setPriceOverrides((cur) => ({
                    ...cur,
                    [d.id]: parseFloat(e.target.value) || 0,
                  }))
                }
                className="h-8 w-20"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label
          className={`flex items-start gap-2 rounded-md border p-2 text-xs ${
            duoEligible ? "border-border bg-background" : "border-border bg-muted/30 opacity-60"
          }`}
        >
          <input
            type="checkbox"
            checked={pastaDuo && duoEligible}
            disabled={!duoEligible}
            onChange={(e) => setPastaDuo(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            <span className="block font-medium text-foreground">Pasta duo (half / half)</span>
            <span className="block text-[11px] text-muted-foreground">
              {duoEligible
                ? "One of each pasta per 2 guests, split across the table."
                : "Available only with an even number of guests (2, 4, 6…)."}
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 rounded-md border border-border bg-background p-2 text-xs">
          <input
            type="checkbox"
            checked={pushSteaks}
            onChange={(e) => setPushSteaks(e.target.checked)}
            className="mt-0.5"
          />
          <span>
            <span className="block font-medium text-foreground">
              Time for the steaks
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Prefers Porterhouse / Tomahawk shared across the table. Longer service = more wine.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="flex items-start gap-2 rounded-md border border-border bg-background p-2 text-xs">
          <input
            type="checkbox"
            checked={pushCrudo}
            onChange={(e) => setPushCrudo(e.target.checked)}
            className="mt-0.5"
          />
          <span className="flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="font-medium text-foreground">Sell the crudo</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                $
                <Input
                  type="number"
                  min={0}
                  value={crudoPrice}
                  onChange={(e) => setCrudoPrice(parseFloat(e.target.value) || 0)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-16"
                />
                <span className="text-[10px]">/pp</span>
              </span>
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Adds the chef's crudo plate as an antipasti upsell.
            </span>
          </span>
        </label>
        <label className="flex items-start gap-2 rounded-md border border-border bg-background p-2 text-xs">
          <input
            type="checkbox"
            checked={pushCaviar}
            onChange={(e) => setPushCaviar(e.target.checked)}
            className="mt-0.5"
          />
          <span className="flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="font-medium text-foreground">Caviar service</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                $
                <Input
                  type="number"
                  min={0}
                  value={caviarPrice}
                  onChange={(e) => setCaviarPrice(parseFloat(e.target.value) || 0)}
                  onClick={(e) => e.stopPropagation()}
                  className="h-6 w-20"
                />
                <span className="text-[10px]">/table</span>
              </span>
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Adds a shared caviar service for the table.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-4">
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Note for kitchen (pass-through - not used to build the menu)
          </span>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 1 vegetarian at table of 4, allergic to walnuts, anniversary"
            rows={3}
          />
        </label>
      </div>

      <div className="mt-4">
        <p className="mb-1 text-xs font-medium text-muted-foreground">
          À la carte additions & requests (per person)
        </p>
        <p className="mb-2 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">Upgrade</span> layers on top of a course; <span className="font-medium text-foreground">Replace course</span> uses your request as that course (e.g. they love the chicken).
        </p>
        {addOns.length > 0 && (
          <ul className="mb-2 space-y-1">
            {addOns.map((a, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-2 py-1 text-xs"
              >
                <span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {a.course} · {a.kind === "course" ? "replace" : "upgrade"}
                  </span>{" "}
                  {a.kind === "course" ? "" : "+ "}{a.name}{" "}
                  <span className="tabular-nums text-muted-foreground">
                    (${a.price}{a.scope === "table" ? " / table" : " / person"})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeAddOn(i)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove add-on"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="grid grid-cols-[1fr_70px_100px_auto] gap-2">
          <Input
            value={addName}
            onChange={(e) => setAddName(e.target.value)}
            placeholder="e.g. shaved truffles or roasted chicken"
            maxLength={60}
          />
          <Input
            type="number"
            min={1}
            value={addPrice}
            onChange={(e) => setAddPrice(e.target.value)}
            placeholder="$"
          />
          <select
            value={addCourse}
            onChange={(e) => setAddCourse(e.target.value as FoodCategory | "Any")}
            className="rounded-md border border-input bg-background px-2 text-xs"
          >
            {ADDON_COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <Button type="button" variant="secondary" onClick={addAddOn}>
            Add
          </Button>
        </div>
        <div className="mt-2 flex gap-1.5">
          {(["upgrade", "course"] as const).map((k) => {
            const on = addKind === k;
            const disabled = k === "course" && addCourse === "Any";
            return (
              <button
                type="button"
                key={k}
                disabled={disabled}
                onClick={() => setAddKind(k)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  on && !disabled
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                } ${disabled ? "opacity-40" : ""}`}
              >
                {k === "upgrade" ? "Upgrade (added on top)" : "Replace course"}
              </button>
            );
          })}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          {(["person", "table"] as const).map((s) => {
            const on = addScope === s;
            return (
              <button
                type="button"
                key={s}
                onClick={() => setAddScope(s)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "person" ? "Per person" : "Per table"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Curating…" : "Curate menus"}
        </Button>
      </div>
    </form>
  );
}