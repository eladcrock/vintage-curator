import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Check, X, RefreshCw } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import {
  BTG_STUDY_MODES,
  buildBtgQuestions,
  type BTGQuestion,
  type BTGStudyMode,
} from "@/lib/btg-study";

export const Route = createFileRoute("/btg_/study")({
  head: () => ({
    meta: [
      { title: "BTG Wines Study - Bottega Pro" },
      { name: "description", content: "Flashcards, multiple choice, and fill-in-the-blank drills on the BTG wine list." },
      { property: "og:title", content: "BTG Wines Study - Bottega Pro" },
      { property: "og:description", content: "Flashcards, multiple choice, and fill-in-the-blank drills on the BTG wine list." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BtgStudyPage,
});

const COUNT = 10;

function BtgStudyPage() {
  const [mode, setMode] = useState<BTGStudyMode | null>(null);
  const [seed, setSeed] = useState(0);
  const questions = useMemo<BTGQuestion[]>(
    () => (mode ? buildBtgQuestions(mode, COUNT) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, seed],
  );
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | { correct: boolean }>(null);

  function reset(next: BTGStudyMode | null) {
    setMode(next);
    setIdx(0);
    setScore(0);
    setAnswered(null);
    setSeed((s) => s + 1);
  }

  function record(correct: boolean) {
    setScore((s) => s + (correct ? 1 : 0));
    setAnswered({ correct });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav title="Bottega Pro" subtitle="BTG Wines - study mode" />
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-4">
        {!mode ? (
          <div className="space-y-4">
            <Link
              to="/btg"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to BTG list
            </Link>
            <div>
              <h2 className="text-lg font-semibold">Study mode</h2>
              <p className="text-sm text-muted-foreground">
                Pick a drill. Rounds are {COUNT} questions from the BTG list.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {BTG_STUDY_MODES.map((m) => (
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
        ) : idx >= questions.length ? (
          <div className="space-y-4 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Session complete
            </div>
            <div className="text-5xl font-bold tabular-nums">
              {score}
              <span className="text-muted-foreground">/{questions.length}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {questions.length ? Math.round((score / questions.length) * 100) : 0}% correct
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Button onClick={() => reset(mode)}>
                <RefreshCw className="h-4 w-4" /> Play again
              </Button>
              <Button variant="outline" onClick={() => reset(null)}>
                Change mode
              </Button>
            </div>
          </div>
        ) : (
          <QuestionView
            q={questions[idx]}
            idx={idx}
            total={questions.length}
            score={score}
            answered={answered}
            onExitMode={() => reset(null)}
            onAnswer={record}
            onNext={() => {
              setAnswered(null);
              setIdx((i) => i + 1);
            }}
          />
        )}
      </main>
    </div>
  );
}

function QuestionView({
  q,
  idx,
  total,
  score,
  answered,
  onExitMode,
  onAnswer,
  onNext,
}: {
  q: BTGQuestion;
  idx: number;
  total: number;
  score: number;
  answered: null | { correct: boolean };
  onExitMode: () => void;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button onClick={onExitMode} className="inline-flex items-center gap-1 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Modes
        </button>
        <div className="tabular-nums">
          Q {idx + 1} / {total} · Score {score}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        {q.mode === "flashcards" && <Flashcard q={q} answered={!!answered} onRate={onAnswer} onNext={onNext} />}
        {q.mode === "producer" && <ChoiceQ label="Guess the producer" prompt={<><span className="text-sm text-muted-foreground">Talking point: </span><span className="italic">&ldquo;{q.prompt}&rdquo;</span></>} q={q} answered={answered} onAnswer={onAnswer} />}
        {q.mode === "region" && <ChoiceQ label="Where is it from?" prompt={<span className="text-base font-semibold">{q.wine.producer}, {q.wine.vintage !== "NV" && q.wine.vintage !== "MV" ? q.wine.vintage : ""} {q.wine.appellation}</span>} q={q} answered={answered} onAnswer={onAnswer} />}
        {q.mode === "tasting" && <ChoiceQ label="Match the tasting notes" prompt={<span className="italic text-sm">&ldquo;{q.wine.tasting}&rdquo;</span>} q={q} answered={answered} onAnswer={onAnswer} />}
        {q.mode === "fill" && <FillQ q={q} answered={answered} onAnswer={onAnswer} />}
      </div>

      {answered && (
        <div className="flex justify-end">
          <Button onClick={onNext}>{idx + 1 === total ? "Finish" : "Next"}</Button>
        </div>
      )}
    </div>
  );
}

function Verdict({ correct }: { correct: boolean }) {
  return (
    <div
      className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        correct ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"
      }`}
    >
      {correct ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      {correct ? "Correct" : "Wrong"}
    </div>
  );
}

function Flashcard({
  q,
  answered,
  onRate,
}: {
  q: Extract<BTGQuestion, { mode: "flashcards" }>;
  answered: boolean;
  onRate: (correct: boolean) => void;
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [showTasting, setShowTasting] = useState(false);
  const revealed = showInfo || showTasting;

  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Flashcard</div>
      <div className="mt-1 text-xl font-semibold leading-snug">{q.wine.name}</div>

      <div className="mt-4 flex flex-wrap gap-2">
        {!showInfo && (
          <Button variant="outline" onClick={() => setShowInfo(true)}>
            Reveal info
          </Button>
        )}
        {!showTasting && (
          <Button variant="outline" onClick={() => setShowTasting(true)}>
            Reveal tasting
          </Button>
        )}
      </div>

      {showInfo && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/90">
          {q.wine.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      {showTasting && (
        <p className="mt-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Tasting · </span>
          {q.wine.tasting}
        </p>
      )}

      {revealed && !answered && (
        <div className="flex gap-2 pt-3">
          <Button onClick={() => onRate(true)}>
            <Check className="h-4 w-4" /> Knew it
          </Button>
          <Button onClick={() => onRate(false)} variant="outline">
            <X className="h-4 w-4" /> Missed
          </Button>
        </div>
      )}
    </div>
  );
}

function ChoiceButtons({
  choices,
  answer,
  answered,
  onPick,
}: {
  choices: string[];
  answer: string;
  answered: null | { correct: boolean };
  onPick: (c: string) => void;
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

function ChoiceQ({
  label,
  prompt,
  q,
  answered,
  onAnswer,
}: {
  label: string;
  prompt: React.ReactNode;
  q: Extract<BTGQuestion, { mode: "producer" | "region" | "tasting" }>;
  answered: null | { correct: boolean };
  onAnswer: (correct: boolean) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2">{prompt}</div>
      <ChoiceButtons
        choices={q.choices}
        answer={q.answer}
        answered={answered}
        onPick={(c) => onAnswer(c === q.answer)}
      />
      {answered && (
        <div>
          <Verdict correct={answered.correct} />
          <p className="mt-2 text-xs text-muted-foreground">
            Answer: <span className="font-semibold text-foreground">{q.answer}</span>
            {q.mode !== "tasting" && (
              <> · <span className="text-foreground/80">{q.wine.name}</span></>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

function FillQ({
  q,
  answered,
  onAnswer,
}: {
  q: Extract<BTGQuestion, { mode: "fill" }>;
  answered: null | { correct: boolean };
  onAnswer: (correct: boolean) => void;
}) {
  const parts = q.prompt.split("__BLANK__");
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Fill in the blank</div>
      <div className="mt-1 text-sm font-semibold text-foreground/80">{q.wine.name}</div>
      <p className="mt-3 text-sm leading-relaxed">
        {parts[0]}
        <span className="mx-1 inline-block min-w-[3.5rem] rounded border border-dashed border-primary/60 px-2 text-center text-primary">
          ?
        </span>
        {parts[1]}
      </p>
      <ChoiceButtons
        choices={q.choices}
        answer={q.answer}
        answered={answered}
        onPick={(c) => onAnswer(c === q.answer)}
      />
      {answered && (
        <div>
          <Verdict correct={answered.correct} />
          <p className="mt-2 text-xs text-muted-foreground">
            Answer: <span className="font-semibold text-foreground">{q.answer}</span>
          </p>
        </div>
      )}
    </div>
  );
}