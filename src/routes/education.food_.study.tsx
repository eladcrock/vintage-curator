/**
 * Food sourcing quiz - two modes:
 *  - Flashcards: purveyor/source name → reveal full story.
 *  - Match the source: 4-choice "which purveyor / origin supplies X?" using
 *    each entry's tagline as the prompt and title as the answer.
 *
 * Session-only scoring. Data: src/data/food-education.ts.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { FOOD_EDUCATION } from "@/data/food-education";

export const Route = createFileRoute("/education/food_/study")({
  component: FoodEduStudyPage,
});

type Mode = "flashcards" | "match";

const FLASH_GOAL = 12;
const MATCH_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function FoodEduStudyPage() {
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Food sourcing quiz" />
      <main className="mx-auto max-w-xl px-4 pb-24 pt-4">
        <Link
          to="/education/food"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sourcing atlas
        </Link>

        {!mode ? (
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Sourcing study</h2>
              <p className="text-sm text-muted-foreground">
                Pick a drill. Drawn from {FOOD_EDUCATION.length} purveyors, provenances, and Chiarello signatures.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => setMode("flashcards")}
                className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
              >
                <div className="font-semibold">Flashcards</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Purveyor or signature → reveal the story. Self-rated.
                </div>
              </button>
              <button
                onClick={() => setMode("match")}
                className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
              >
                <div className="font-semibold">Match the source</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Read a tagline → pick the right purveyor / origin from 4.
                </div>
              </button>
            </div>
          </div>
        ) : mode === "flashcards" ? (
          <FlashcardMode onExit={() => setMode(null)} />
        ) : (
          <MatchMode onExit={() => setMode(null)} />
        )}
      </main>
    </div>
  );
}

// ---------- Flashcards ----------

function FlashcardMode({ onExit }: { onExit: () => void }) {
  const initial = useMemo(() => shuffle(FOOD_EDUCATION), []);
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
  function restart() {
    setDeck(shuffle(FOOD_EDUCATION));
    setIdx(0);
    setFlipped(false);
    setSeen(0);
    setKnown(0);
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Modes
        </button>
        <div className="tabular-nums">
          Known {known} / {seen}{" "}
          <span className="text-muted-foreground/60">· {FOOD_EDUCATION.length} cards</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {entry.category}
        </div>
        <div className="mt-1 text-2xl font-semibold">{entry.title}</div>
        <p className="mt-1 text-sm text-muted-foreground">{entry.tagline}</p>

        {!flipped ? (
          <Button
            className="mt-5"
            variant="outline"
            onClick={() => setFlipped(true)}
          >
            Reveal
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            {entry.body.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-foreground/90">
                {p}
              </p>
            ))}
            {entry.dishes.length > 0 && (
              <p className="text-xs">
                <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                  On the menu:{" "}
                </span>
                <span className="text-foreground/80">
                  {entry.dishes.join(" · ")}
                </span>
              </p>
            )}
            <div className="flex gap-2 pt-1">
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

      {seen >= FLASH_GOAL && (
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center text-xs text-muted-foreground">
          You've seen {seen} cards · {known} known.{" "}
          <button
            onClick={restart}
            className="ml-1 underline hover:text-foreground"
          >
            Reshuffle deck
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- Match the source ----------

type MatchQuestion = {
  prompt: string;
  sub: string;
  choices: string[];
  answer: string;
  context: string;
};

function buildMatchQuestions(): MatchQuestion[] {
  const pool = shuffle(FOOD_EDUCATION);
  const allTitles = FOOD_EDUCATION.map((e) => e.title);
  const out: MatchQuestion[] = [];
  for (const e of pool) {
    if (out.length >= MATCH_COUNT) break;
    const distractors = shuffle(allTitles.filter((t) => t !== e.title)).slice(0, 3);
    if (distractors.length < 3) continue;
    out.push({
      prompt: e.tagline,
      sub: e.category,
      choices: shuffle([e.title, ...distractors]),
      answer: e.title,
      context:
        e.dishes.length > 0
          ? `On the menu: ${e.dishes.join(" · ")}`
          : e.body[0].slice(0, 160),
    });
  }
  return out;
}

function MatchMode({ onExit }: { onExit: () => void }) {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    buildMatchQuestions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed],
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  function answer(c: string) {
    if (picked) return;
    setPicked(c);
    if (c === questions[idx].answer) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }
  function replay() {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setSeed((s) => s + 1);
  }

  if (idx >= questions.length) {
    return (
      <div className="mt-4 space-y-4 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Session complete
        </div>
        <div className="text-5xl font-bold tabular-nums">
          {score}
          <span className="text-muted-foreground">/{questions.length}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.round((score / questions.length) * 100)}% correct
        </div>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button onClick={replay}>
            <RefreshCw className="h-4 w-4" /> Play again
          </Button>
          <Button variant="outline" onClick={onExit}>
            Change mode
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          onClick={onExit}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Modes
        </button>
        <div className="tabular-nums">
          Q {idx + 1} / {questions.length} · Score {score}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {q.sub}
        </div>
        <div className="mt-1 text-base font-semibold leading-snug">
          {q.prompt}
        </div>
        <div className="mt-4 grid gap-2">
          {q.choices.map((c) => {
            const isAnswer = c === q.answer;
            const isPicked = c === picked;
            let cls = "border-border bg-card hover:border-primary/50";
            if (picked) {
              if (isAnswer) cls = "border-primary bg-primary/15 text-primary";
              else if (isPicked)
                cls = "border-destructive bg-destructive/15 text-destructive";
              else cls = "border-border bg-card text-muted-foreground";
            }
            return (
              <button
                key={c}
                disabled={!!picked}
                onClick={() => answer(c)}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${cls}`}
              >
                {c}
              </button>
            );
          })}
        </div>
        {picked && (
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                picked === q.answer
                  ? "bg-primary/15 text-primary"
                  : "bg-destructive/15 text-destructive"
              }`}
            >
              {picked === q.answer ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
              {picked === q.answer ? "Correct" : "Wrong"}
            </span>
            <p className="mt-2 text-xs text-muted-foreground">{q.context}</p>
            <div className="mt-3 flex justify-end">
              <Button onClick={next}>
                {idx + 1 === questions.length ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}