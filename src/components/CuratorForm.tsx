/**
 * Input form for the Experience Curator.
 * Hand-edit COMMON_RESTRICTIONS in src/lib/experiences.ts to add new chips.
 */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { COMMON_RESTRICTIONS, type AddOn, type ExperienceRequest } from "@/lib/experiences";
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

  const min = Math.max(1, budgetMin || 0);
  const max = Math.max(min, budgetMax || min);
  const tableMin = min * guests;
  const tableMax = max * guests;

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
    onSubmit({
      guests,
      budgetMin: min,
      budgetMax: max,
      restrictions,
      notes,
      addOns,
    });
  }

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
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Budget / person — min
          </span>
          <Input
            type="number"
            min={1}
            value={budgetMin}
            onChange={(e) => setBudgetMin(parseInt(e.target.value) || 0)}
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Budget / person — max
          </span>
          <Input
            type="number"
            min={1}
            value={budgetMax}
            onChange={(e) => setBudgetMax(parseInt(e.target.value) || 0)}
          />
        </label>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">
        Table total: <span className="font-medium text-foreground">${tableMin}–${tableMax}</span>
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
        <label className="text-xs">
          <span className="mb-1 block font-medium text-muted-foreground">
            Note for kitchen (pass-through — not used to build the menu)
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