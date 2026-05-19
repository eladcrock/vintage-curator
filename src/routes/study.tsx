/**
 * Wine knowledge study - story-driven flashcards.
 *
 * Pool draws from:
 *  - WINE_PRODUCERS: producer histories, ownership, signature bottlings
 *  - REGIONS.history: regional history & cultural context
 *  - REGIONS.wineNotes: detailed tasting / service notes per region
 *
 * Deliberately excludes WINE_GLOSSARY one-liners (grape/region definitions).
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X, Shuffle } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { WINE_PRODUCERS } from "@/data/wine-producers";
import { REGIONS } from "@/data/education";

export const Route = createFileRoute("/study")({
  component: WineVocabStudy,
});

type Card = {
  /** Short kicker shown above the title (e.g. "Producer · Piedmont"). */
  kind: string;
  /** Card title shown before reveal. */
  title: string;
  /** Body text shown on reveal. */
  body: string;
};

function buildKnowledgePool(): Card[] {
  const out: Card[] = [];
  for (const p of WINE_PRODUCERS) {
    out.push({ kind: "Producer", title: p.match, body: p.blurb });
  }
  for (const r of REGIONS) {
    if (r.history && r.history.trim().length > 0) {
      out.push({
        kind: `History · ${r.country}${r.zone ? " · " + r.zone : ""}`,
        title: r.name,
        body: r.history,
      });
    }
    if (r.wineNotes && r.wineNotes.trim().length > 0) {
      out.push({
        kind: `Service notes · ${r.country}`,
        title: r.name,
        body: r.wineNotes,
      });
    }
  }
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function WineVocabStudy() {
  const pool = useMemo(buildKnowledgePool, []);
  const initial = useMemo(() => shuffle(pool), [pool]);
  const [deck, setDeck] = useState(initial);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(0);
  const [known, setKnown] = useState(0);

  const entry = deck[idx % deck.length];

  function advance(gotIt: boolean) {
    setSeen((s) => s + 1);
    if (gotIt) setKnown((k) => k + 1);
    setFlipped(false);
    setIdx((i) => i + 1);
  }

  function reshuffle() {
    setDeck(shuffle(pool));
    setIdx(0);
    setFlipped(false);
    setSeen(0);
    setKnown(0);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Wine knowledge study" />
      <main className="mx-auto max-w-xl px-4 pb-24 pt-4">
        <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to wine list
          </Link>
          <div className="tabular-nums">
            Known {known} / {seen}{" "}
            <span className="text-muted-foreground/60">· {pool.length} cards</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {entry.kind}
          </div>
          <div className="mt-1 text-2xl font-semibold">{entry.title}</div>

          {!flipped ? (
            <Button
              className="mt-5"
              variant="outline"
              onClick={() => setFlipped(true)}
            >
              Reveal
            </Button>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
                {entry.body.split(/\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="flex gap-2">
                <Button onClick={() => advance(true)}>
                  <Check className="h-4 w-4" /> Knew it
                </Button>
                <Button variant="outline" onClick={() => advance(false)}>
                  <X className="h-4 w-4" /> Missed
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={reshuffle}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Shuffle className="h-3.5 w-3.5" /> Reshuffle deck
          </button>
        </div>
      </main>
    </div>
  );
}