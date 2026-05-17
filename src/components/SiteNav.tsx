/**
 * Top navigation shared across all top-level tabs.
 * Add a new tab: register the route file under src/routes/, then add an entry
 * to TABS below.
 */
import { Link, useLocation } from "@tanstack/react-router";
import { Wine as WineIcon } from "lucide-react";

type Tab = {
  to: string;
  label: string;
  enabled: boolean;
};

const TABS: Tab[] = [
  { to: "/", label: "Wines", enabled: true },
  { to: "/bar", label: "Bar program", enabled: true },
  { to: "/food", label: "Food", enabled: true },
  { to: "/experiences", label: "Experiences", enabled: false },
];

export function SiteNav({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <WineIcon className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-sm font-semibold leading-tight">{title}</h1>
            {subtitle && (
              <p className="text-[11px] leading-tight text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        <nav className="flex gap-1 text-xs">
          {TABS.map((t) => {
            const active =
              t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
            if (!t.enabled) {
              return (
                <span
                  key={t.to}
                  className="rounded-md px-2 py-1 text-muted-foreground/60"
                  title="Coming soon"
                >
                  {t.label}
                </span>
              );
            }
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`rounded-md px-2 py-1 font-medium transition-colors ${
                  active
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}