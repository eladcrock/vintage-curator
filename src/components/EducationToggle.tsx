/**
 * Top-of-page toggle between the Wine atlas (/education) and the
 * Food sourcing page (/education/food). Used by both routes.
 */
import { Link } from "@tanstack/react-router";
import { Wine, Utensils } from "lucide-react";

export function EducationToggle({ active }: { active: "wine" | "food" }) {
  return (
    <div className="inline-flex rounded-md border border-border p-1">
      <Link
        to="/education"
        className={`inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-colors ${
          active === "wine"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Wine className="h-3.5 w-3.5" /> Wine
      </Link>
      <Link
        to="/education/food"
        className={`inline-flex items-center gap-1.5 rounded px-3 py-1 text-xs font-medium transition-colors ${
          active === "food"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Utensils className="h-3.5 w-3.5" /> Food
      </Link>
    </div>
  );
}