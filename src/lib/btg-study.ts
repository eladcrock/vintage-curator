/**
 * Quiz generators for the BTG Wines study page.
 * Modes: flashcards, multiple choice (producer / region / tasting notes),
 * and fill-in-the-blank (year or percentage blanked from a bullet).
 */
import { BTG_WINES, type BTGWine } from "@/data/btg-wines";

export type BTGStudyMode =
  | "flashcards"
  | "producer"
  | "region"
  | "tasting"
  | "fill";

export const BTG_STUDY_MODES: { id: BTGStudyMode; label: string; blurb: string }[] = [
  { id: "flashcards", label: "Flashcards", blurb: "Wine name -> reveal all talking points." },
  { id: "producer", label: "Guess the producer", blurb: "Given a talking point, pick who makes it." },
  { id: "region", label: "Where is it from?", blurb: "Multiple choice on region / appellation." },
  { id: "tasting", label: "Match tasting notes", blurb: "Given the flavor profile, pick the wine." },
  { id: "fill", label: "Fill in the blank", blurb: "A number, year, or grape percentage is blanked out." },
];

export type BTGQuestion =
  | { mode: "flashcards"; wine: BTGWine }
  | { mode: "producer"; wine: BTGWine; prompt: string; choices: string[]; answer: string }
  | { mode: "region"; wine: BTGWine; choices: string[]; answer: string }
  | { mode: "tasting"; wine: BTGWine; choices: string[]; answer: string }
  | {
      mode: "fill";
      wine: BTGWine;
      prompt: string; // bullet with __BLANK__
      choices: string[];
      answer: string;
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

function distractors<T>(pool: T[], answer: T, n: number, key: (v: T) => string): T[] {
  const seen = new Set<string>([key(answer)]);
  const out: T[] = [];
  for (const v of shuffle(pool)) {
    const k = key(v);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(v);
    if (out.length >= n) break;
  }
  return out;
}

function withChoices<T>(answer: T, pool: T[], key: (v: T) => string): string[] {
  const d = distractors(pool, answer, 3, key).map(key);
  return shuffle([key(answer), ...d]);
}

/** Return a bullet suitable for redaction, plus the token to blank and its distractors. */
function pickFillTarget(
  wine: BTGWine,
): { bullet: string; answer: string; distractors: string[] } | null {
  // Try each bullet, prefer one containing a 4-digit year or percentage.
  const candidates: { bullet: string; answer: string; kind: "year" | "pct" }[] = [];
  for (const b of wine.bullets) {
    const pctMatch = b.match(/(\d{1,3})%/);
    if (pctMatch) candidates.push({ bullet: b, answer: pctMatch[0], kind: "pct" });
    const yearMatch = b.match(/\b(1[5-9]\d{2}|20\d{2})\b/);
    if (yearMatch) candidates.push({ bullet: b, answer: yearMatch[0], kind: "year" });
  }
  if (!candidates.length) return null;
  const pickCand = pick(candidates);
  const answer = pickCand.answer;

  const distractSet = new Set<string>();
  if (pickCand.kind === "year") {
    const base = parseInt(answer, 10);
    while (distractSet.size < 3) {
      const delta = Math.floor(Math.random() * 40) - 20;
      const y = base + delta;
      if (y !== base && y > 1400 && y < 2027) distractSet.add(String(y));
    }
  } else {
    const base = parseInt(answer, 10);
    while (distractSet.size < 3) {
      const delta = Math.floor(Math.random() * 30) - 15;
      const p = base + delta;
      if (p !== base && p > 0 && p <= 100) distractSet.add(`${p}%`);
    }
  }
  return { bullet: pickCand.bullet, answer, distractors: Array.from(distractSet) };
}

export function buildBtgQuestions(mode: BTGStudyMode, count: number): BTGQuestion[] {
  const wines = shuffle(BTG_WINES);
  const out: BTGQuestion[] = [];

  for (const wine of wines) {
    if (out.length >= count) break;
    if (mode === "flashcards") {
      out.push({ mode, wine });
    } else if (mode === "producer") {
      const bullet = pick(wine.bullets);
      // avoid a bullet that literally contains the producer name
      const safe = wine.bullets.find((b) => !b.toLowerCase().includes(wine.producer.toLowerCase())) ?? bullet;
      out.push({
        mode,
        wine,
        prompt: safe,
        choices: withChoices(wine, BTG_WINES, (w) => w.producer),
        answer: wine.producer,
      });
    } else if (mode === "region") {
      const label = `${wine.appellation}, ${wine.region}`;
      out.push({
        mode,
        wine,
        choices: withChoices(wine, BTG_WINES, (w) => `${w.appellation}, ${w.region}`),
        answer: label,
      });
    } else if (mode === "tasting") {
      out.push({
        mode,
        wine,
        choices: withChoices(wine, BTG_WINES, (w) => w.name),
        answer: wine.name,
      });
    } else if (mode === "fill") {
      const target = pickFillTarget(wine);
      if (!target) continue;
      const prompt = target.bullet.replace(target.answer, "__BLANK__");
      out.push({
        mode,
        wine,
        prompt,
        choices: shuffle([target.answer, ...target.distractors]),
        answer: target.answer,
      });
    }
  }
  return out;
}