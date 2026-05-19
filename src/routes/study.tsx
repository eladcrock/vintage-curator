/**
 * Wine vocab study - random flashcard from WINE_GLOSSARY.
 * Infinite session; self-rated; running tally of seen / known.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X, Shuffle } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { WINE_GLOSSARY } from "@/data/wine-glossary";

export const Route = createFileRoute("/study")({
  component: WineVocabStudy,
});

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function WineVocabStudy() {
  const initial = useMemo(() => shuffle(WINE_GLOSSARY), []);
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
    setDeck(shuffle(WINE_GLOSSARY));
    setIdx(0);
    setFlipped(false);
    setSeen(0);
    setKnown(0);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Wine vocab study" />
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
            <span className="text-muted-foreground/60">· {WINE_GLOSSARY.length} terms</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Wine term
          </div>
          <div className="mt-1 text-2xl font-semibold">{entry.term}</div>
          {entry.aliases && entry.aliases.length > 0 && (
            <div className="mt-1 text-xs text-muted-foreground">
              aka {entry.aliases.join(", ")}
            </div>
          )}

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
              <p className="text-sm leading-relaxed text-foreground/90">
                {entry.blurb}
              </p>
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