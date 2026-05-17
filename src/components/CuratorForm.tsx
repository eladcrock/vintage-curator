/**
 * Input form for the Experience Curator.
 * Hand-edit COMMON_RESTRICTIONS in src/lib/experiences.ts to add new chips.
 */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { COMMON_RESTRICTIONS, type ExperienceRequest } from "@/lib/experiences";

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

  const min = Math.max(1, budgetMin || 0);
  const max = Math.max(min, budgetMax || min);
  const tableMin = min * guests;
  const tableMax = max * guests;

  function toggle(r: string) {
    setRestrictions((cur) =>
      cur.includes(r) ? cur.filter((x) => x !== r) : [...cur, r],
    );
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
            Table notes (allergies, preferences, occasion)
          </span>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 1 vegetarian at table of 4, allergic to walnuts, anniversary"
            rows={3}
          />
        </label>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Curating…" : "Curate menus"}
        </Button>
      </div>
    </form>
  );
}