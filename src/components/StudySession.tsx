/**
 * Reusable study session UI. Used by /food/study and /bar/study.
 * Renders mode picker → quiz cards → end-of-session score.
 * Session-only scoring; no persistence.
 */
import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildQuestions,
  STUDY_MODES,
  type Question,
  type StudyItem,
  type StudyMode,
} from "@/lib/study";

const COUNT = 10;

export function StudySession({
  items,
  backTo,
  backLabel,
  noun,
}: {
  items: StudyItem[];
  backTo: string;
  backLabel: string;
  /** "dish" or "cocktail" - used in copy. */
  noun: string;
}) {
  const [mode, setMode] = useState<StudyMode | null>(null);
  const [seed, setSeed] = useState(0);
  const questions = useMemo<Question[]>(
    () => (mode ? buildQuestions(mode, items, COUNT) : []),
    // seed forces regeneration on restart
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, items, seed],
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | { correct: boolean }>(null);

  function reset(nextMode: StudyMode | null) {
    setMode(nextMode);
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setSeed((s) => s + 1);
  }

  function recordAndAdvance(correct: boolean) {
    setScore((s) => s + (correct ? 1 : 0));
    setAnswered({ correct });
  }

  function next() {
    setAnswered(null);
    setIdx((i) => i + 1);
  }

  // --- Mode picker ---
  if (!mode) {
    return (
      <div className="space-y-4">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {backLabel}
        </Link>
        <div>
          <h2 className="text-lg font-semibold">Study mode</h2>
          <p className="text-sm text-muted-foreground">
            Pick a drill. {COUNT} questions per round, drawn at random from the full menu.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {STUDY_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => reset(m.id)}
              className="rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-card/80"
            >
              <div className="font-semibold">{m.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{m.blurb}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- End of session ---
  if (idx >= questions.length) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="space-y-4 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Session complete
        </div>
        <div className="text-5xl font-bold tabular-nums">
          {score}
          <span className="text-muted-foreground">/{questions.length}</span>
        </div>
        <div className="text-sm text-muted-foreground">{pct}% correct</div>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Button onClick={() => reset(mode)} variant="default">
            <RefreshCw className="h-4 w-4" /> Play again
          </Button>
          <Button onClick={() => reset(null)} variant="outline">
            Change mode
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[idx];
  if (!q) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">
        Not enough {noun}s to build this quiz. Try another mode.
        <div className="mt-3">
          <Button variant="outline" onClick={() => reset(null)}>
            Change mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          onClick={() => reset(null)}
          className="inline-flex items-center gap-1 hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Modes
        </button>
        <div className="tabular-nums">
          Q {idx + 1} / {questions.length} · Score {score}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        {q.mode === "flashcards" && (
          <FlashcardCard q={q} answered={!!answered} onRate={recordAndAdvance} />
        )}
        {q.mode === "missing" && (
          <MissingCard q={q} answered={answered} onAnswer={recordAndAdvance} />
        )}
        {q.mode === "allergens" && (
          <AllergenCard q={q} answered={answered} onAnswer={recordAndAdvance} />
        )}
        {q.mode === "description" && (
          <DescriptionCard q={q} answered={answered} onAnswer={recordAndAdvance} />
        )}
      </div>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={next}>
            {idx + 1 === questions.length ? "Finish" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}

function Verdict({ correct }: { correct: boolean }) {
  return (
    <div
      className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        correct
          ? "bg-primary/15 text-primary"
          : "bg-destructive/15 text-destructive"
      }`}
    >
      {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {correct ? "Correct" : "Wrong"}
    </div>
  );
}

function FlashcardCard({
  q,
  answered,
  onRate,
}: {
  q: Extract<Question, { mode: "flashcards" }>;
  answered: boolean;
  onRate: (correct: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        Flashcard
      </div>
      <div className="mt-1 text-2xl font-semibold">{q.item.name}</div>
      {!flipped ? (
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => setFlipped(true)}
        >
          Reveal
        </Button>
      ) : (
        <div className="mt-3 space-y-2">
          {q.item.blurb && (
            <p className="text-sm text-foreground/90">{q.item.blurb}</p>
          )}
          {q.item.components.length > 0 && (
            <p className="text-sm">
              <span className="text-muted-foreground">Components: </span>
              {q.item.components.join(", ")}
            </p>
          )}
          {q.item.allergens.length > 0 && (
            <p className="text-sm">
              <span className="text-muted-foreground">Allergens: </span>
              {q.item.allergens.join(", ")}
            </p>
          )}
          {q.item.extra.map((line, i) => (
            <p key={i} className="text-xs text-muted-foreground">
              {line}
            </p>
          ))}
          {!answered && (
            <div className="flex gap-2 pt-2">
              <Button onClick={() => onRate(true)} variant="default">
                <Check className="h-4 w-4" /> Knew it
              </Button>
              <Button onClick={() => onRate(false)} variant="outline">
                <X className="h-4 w-4" /> Missed
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChoiceList({
  choices,
  answer,
  answered,
  onPick,
}: {
  choices: string[];
  answer: string;
  answered: null | { correct: boolean };
  onPick: (choice: string) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  function handle(c: string) {
    if (answered) return;
    setPicked(c);
    onPick(c);
  }
  return (
    <div className="mt-4 grid gap-2">
      {choices.map((c) => {
        const isAnswer = c === answer;
        const isPicked = c === picked;
        let cls = "border-border bg-card hover:border-primary/50";
        if (answered) {
          if (isAnswer) cls = "border-primary bg-primary/15 text-primary";
          else if (isPicked) cls = "border-destructive bg-destructive/15 text-destructive";
          else cls = "border-border bg-card text-muted-foreground";
        }
        return (
          <button
            key={c}
            disabled={!!answered}
            onClick={() => handle(c)}
            className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${cls}`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function MissingCard({
  q,
  answered,
  onAnswer,
}: {
  q: Extract<Question, { mode: "missing" }>;
  answered: null | { correct: boolean };
  onAnswer: (correct: boolean) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        Missing ingredient
      </div>
      <div className="mt-1 text-xl font-semibold">{q.item.name}</div>
      <div className="mt-3 text-sm text-muted-foreground">
        One ingredient is blanked out. Pick the missing one.
      </div>
      <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm">
        {q.shown.map((line, i) => (
          <li key={i} className={line === null ? "text-primary font-semibold" : ""}>
            {line ?? "_____________"}
          </li>
        ))}
      </ul>
      <ChoiceList
        choices={q.choices}
        answer={q.answer}
        answered={answered}
        onPick={(c) => onAnswer(c === q.answer)}
      />
      {answered && <Verdict correct={answered.correct} />}
    </div>
  );
}

function AllergenCard({
  q,
  answered,
  onAnswer,
}: {
  q: Extract<Question, { mode: "allergens" }>;
  answered: null | { correct: boolean };
  onAnswer: (correct: boolean) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        Allergen check
      </div>
      <div className="mt-1 text-xl font-semibold">{q.item.name}</div>
      <p className="mt-3 text-sm">
        Does this contain{" "}
        <span className="font-semibold text-primary">{q.allergen}</span>?
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          disabled={!!answered}
          variant="outline"
          onClick={() => onAnswer(q.answer === true)}
        >
          Yes
        </Button>
        <Button
          disabled={!!answered}
          variant="outline"
          onClick={() => onAnswer(q.answer === false)}
        >
          No
        </Button>
      </div>
      {answered && (
        <div className="mt-3">
          <Verdict correct={answered.correct} />
          <p className="mt-2 text-xs text-muted-foreground">
            Allergens on this {q.item.allergens.length ? "item" : "item"}:{" "}
            {q.item.allergens.length ? q.item.allergens.join(", ") : "none listed"}
          </p>
        </div>
      )}
    </div>
  );
}

function DescriptionCard({
  q,
  answered,
  onAnswer,
}: {
  q: Extract<Question, { mode: "description" }>;
  answered: null | { correct: boolean };
  onAnswer: (correct: boolean) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        From description
      </div>
      <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">
        &ldquo;{q.prompt}&rdquo;
      </p>
      <p className="mt-3 text-sm text-muted-foreground">Which item is this?</p>
      <ChoiceList
        choices={q.choices}
        answer={q.answer}
        answered={answered}
        onPick={(c) => onAnswer(c === q.answer)}
      />
      {answered && (
        <div>
          <Verdict correct={answered.correct} />
          <p className="mt-2 text-xs text-muted-foreground">
            Answer: <span className="font-semibold text-foreground">{q.item.name}</span>
          </p>
        </div>
      )}
    </div>
  );
}