/**
 * Wine region quiz - draws from REGIONS (src/data/education.ts).
 *
 * Modes:
 *  - Region → grape: "Which grape is from {region}?"
 *  - Grape → region: "Which region is known for {grape}?"
 *  - Class quiz:    "Which Wine Class covers {region}?"
 *
 * Session-only scoring, 10 questions per round.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { CLASSES, REGIONS, type Region, type Country } from "@/data/education";

export const Route = createFileRoute("/education/study")({
  component: RegionQuizPage,
});

const COUNT = 10;

type Mode = "region-to-grape" | "grape-to-region" | "class-quiz";

const MODES: { id: Mode; label: string; blurb: string }[] = [
  { id: "region-to-grape", label: "Region → grape", blurb: "Pick a grape grown in the named region." },
  { id: "grape-to-region", label: "Grape → region", blurb: "Pick the region known for the named grape." },
  { id: "class-quiz", label: "Wine Class #", blurb: "Match a region to its Wine Class (#1–#5)." },
];

type Question = {
  prompt: string;
  sub?: string;
  choices: string[];
  answer: string;
  context?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildQuestions(mode: Mode, country: Country | "all"): Question[] {
  const pool = REGIONS.filter((r) => country === "all" || r.country === country);

  // Grape index: grape name → set of region ids known for it.
  const grapeToRegions = new Map<string, Set<string>>();
  for (const r of pool) {
    for (const g of r.grapes) {
      const key = g.name.split(/[(/]/)[0].trim();
      if (!grapeToRegions.has(key)) grapeToRegions.set(key, new Set());
      grapeToRegions.get(key)!.add(r.id);
    }
  }

  const out: Question[] = [];
  const regionOrder = shuffle(pool);

  if (mode === "region-to-grape") {
    const allGrapes = Array.from(grapeToRegions.keys());
    for (const r of regionOrder) {
      if (out.length >= COUNT) break;
      if (!r.grapes.length) continue;
      const correct = pick(r.grapes).name.split(/[(/]/)[0].trim();
      const myGrapes = new Set(r.grapes.map((g) => g.name.split(/[(/]/)[0].trim()));
      const distractors = shuffle(allGrapes.filter((g) => !myGrapes.has(g))).slice(0, 3);
      if (distractors.length < 3) continue;
      out.push({
        prompt: `Which grape is grown in ${r.name}?`,
        sub: r.zone ? `${r.country} · ${r.zone}` : r.country,
        choices: shuffle([correct, ...distractors]),
        answer: correct,
        context: `${r.name} grapes: ${r.grapes.map((g) => g.name).join(", ")}.`,
      });
    }
  } else if (mode === "grape-to-region") {
    // Prefer "signature" grapes - those that map to a single region in the pool.
    const candidates = Array.from(grapeToRegions.entries()).filter(
      ([, ids]) => ids.size === 1,
    );
    for (const [grape, ids] of shuffle(candidates)) {
      if (out.length >= COUNT) break;
      const correctId = Array.from(ids)[0];
      const correctRegion = pool.find((r) => r.id === correctId)!;
      const distractors = shuffle(pool.filter((r) => r.id !== correctId))
        .slice(0, 3)
        .map((r) => r.name);
      if (distractors.length < 3) continue;
      out.push({
        prompt: `Which region is known for ${grape}?`,
        choices: shuffle([correctRegion.name, ...distractors]),
        answer: correctRegion.name,
        context: `${grape} → ${correctRegion.name} (${correctRegion.country}${
          correctRegion.zone ? " · " + correctRegion.zone : ""
        }).`,
      });
    }
  } else if (mode === "class-quiz") {
    for (const r of regionOrder) {
      if (out.length >= COUNT) break;
      const correct = `#${r.classRef}`;
      const choices = ["#1", "#2", "#3", "#4", "#5"];
      const cls = CLASSES.find((c) => c.id === r.classRef)!;
      out.push({
        prompt: `Which Wine Class covers ${r.name}?`,
        sub: `${r.country}${r.zone ? " · " + r.zone : ""}`,
        choices,
        answer: correct,
        context: `${correct} - ${cls.title.replace(/^Class \d+ - /, "")}.`,
      });
    }
  }
  return out;
}

function RegionQuizPage() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [country, setCountry] = useState<Country | "all">("all");
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    () => (mode ? buildQuestions(mode, country) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, country, seed],
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);

  function start(m: Mode) {
    setMode(m);
    setIdx(0);
    setScore(0);
    setPicked(null);
    setSeed((s) => s + 1);
  }
  function replay() {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setSeed((s) => s + 1);
  }
  function answer(c: string) {
    if (picked) return;
    setPicked(c);
    if (c === questions[idx].answer) setScore((s) => s + 1);
  }
  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="Region quiz" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-4">
        {!mode ? (
          <div className="space-y-4">
            <Link
              to="/education"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to atlas
            </Link>
            <div>
              <h2 className="text-lg font-semibold">Wine region quiz</h2>
              <p className="text-sm text-muted-foreground">
                {COUNT} questions per round, drawn from Bottega Wine Class #1–#5.
              </p>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                Scope
              </div>
              <div className="flex gap-1 rounded-md border border-border p-1 w-fit">
                {(["all", "Italy", "France"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCountry(c)}
                    className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                      country === c
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => start(m.id)}
                  className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50"
                >
                  <div className="font-semibold">{m.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{m.blurb}</div>
                </button>
              ))}
            </div>
          </div>
        ) : idx >= questions.length ? (
          <div className="space-y-4 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Session complete
            </div>
            <div className="text-5xl font-bold tabular-nums">
              {score}
              <span className="text-muted-foreground">/{questions.length}</span>
            </div>
            {questions.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {Math.round((score / questions.length) * 100)}% correct
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button onClick={replay}>
                <RefreshCw className="h-4 w-4" /> Play again
              </Button>
              <Button variant="outline" onClick={() => setMode(null)}>
                Change mode
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button
                onClick={() => setMode(null)}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Modes
              </button>
              <div className="tabular-nums">
                Q {idx + 1} / {questions.length} · Score {score}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              {questions[idx].sub && (
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {questions[idx].sub}
                </div>
              )}
              <div className="mt-1 text-lg font-semibold">{questions[idx].prompt}</div>
              <div className="mt-4 grid gap-2">
                {questions[idx].choices.map((c) => {
                  const isAnswer = c === questions[idx].answer;
                  const isPicked = c === picked;
                  let cls = "border-border bg-card hover:border-primary/50";
                  if (picked) {
                    if (isAnswer) cls = "border-primary bg-primary/15 text-primary";
                    else if (isPicked) cls = "border-destructive bg-destructive/15 text-destructive";
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
              {picked && questions[idx].context && (
                <p className="mt-3 text-xs text-muted-foreground">
                  {questions[idx].context}
                </p>
              )}
              {picked && (
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                      picked === questions[idx].answer
                        ? "bg-primary/15 text-primary"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {picked === questions[idx].answer ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                    {picked === questions[idx].answer ? "Correct" : "Wrong"}
                  </span>
                  <Button onClick={next}>
                    {idx + 1 === questions.length ? "Finish" : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}