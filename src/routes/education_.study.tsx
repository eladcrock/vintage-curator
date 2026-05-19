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

export const Route = createFileRoute("/education_/study")({
  component: RegionQuizPage,
});

const COUNT = 10;

type Mode =
  | "region-to-grape"
  | "grape-to-region"
  | "class-quiz"
  | "subzone-to-region"
  | "synonym-to-grape"
  | "aging-to-wine"
  | "lore-to-region";

const MODES: { id: Mode; label: string; blurb: string }[] = [
  { id: "region-to-grape", label: "Region → grape", blurb: "Pick a grape grown in the named region." },
  { id: "grape-to-region", label: "Grape → region", blurb: "Pick the region known for the named grape." },
  { id: "class-quiz", label: "Wine Class #", blurb: "Match a region to its Wine Class (#1–#5)." },
  { id: "subzone-to-region", label: "Sub-zones (hard)", blurb: "Name the parent region from its sub-zones, communes, or crus." },
  { id: "synonym-to-grape", label: "Synonyms (hard)", blurb: "Identify the grape behind a local synonym or alias." },
  { id: "aging-to-wine", label: "Aging rules (hard)", blurb: "Match a DOCG/AOC aging requirement to its wine." },
  { id: "lore-to-region", label: "Lore & terroir (hard)", blurb: "Identify the region from a historical, terroir, or producer clue." },
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
  } else {
    return buildHardQuestions(mode, pool);
  }
  return out;
}

/**
 * Curated hard-mode question banks. These pull on details from the Wine Class
 * materials (sub-zones, grape synonyms, aging rules, historical lore) that the
 * easy modes don't surface. Each entry carries its own distractor pool so the
 * wrong answers stay plausible.
 */
type HardEntry = { prompt: string; sub?: string; answer: string; distractors: string[]; context: string };

const SUBZONE_BANK: HardEntry[] = [
  { prompt: "Inferno, Sassella, and Grumello are sub-zones of…", answer: "Valtellina (Lombardy)", distractors: ["Valpolicella (Veneto)","Barolo (Piedmont)","Etna (Sicily)","Chianti Classico (Tuscany)"], context: "Valtellina Superiore is divided into Inferno, Sassella, Grumello, Maroggia, and Valgella." },
  { prompt: "Barbaresco, Neive, Treiso, and San Rocco Seno d'Elvio are the four communes of…", answer: "Barbaresco", distractors: ["Barolo","Brunello di Montalcino","Chianti Classico","Bolgheri"], context: "Barbaresco DOCG covers exactly four communes." },
  { prompt: "La Morra, Serralunga d'Alba, Castiglione Falletto, and Monforte d'Alba are core communes of…", answer: "Barolo", distractors: ["Barbaresco","Valtellina","Vino Nobile di Montepulciano","Gattinara"], context: "Barolo DOCG spans 11 communes; these four are the most cited." },
  { prompt: "Les Clos, Vaudésir, Valmur, Grenouilles, Blanchot, Bougros, and Preuses are the seven Grand Cru climats of…", answer: "Chablis", distractors: ["Côte de Beaune","Côte de Nuits","Côte Chalonnaise","Mâconnais"], context: "Chablis Grand Cru is a single AOC umbrella covering seven climats." },
  { prompt: "Saint-Amour, Juliénas, Chénas, Moulin-à-Vent, Fleurie, Chiroubles, Morgon, Régnié, Brouilly, Côte de Brouilly are the ten Crus of…", answer: "Beaujolais", distractors: ["Côte de Nuits","Côte de Beaune","Mâconnais","Chablis"], context: "The ten Beaujolais Crus, north to south." },
  { prompt: "Pauillac, Saint-Julien, Margaux, and Saint-Estèphe are commune AOCs of…", answer: "Haut-Médoc (Left Bank)", distractors: ["Saint-Émilion (Right Bank)","Graves","Pomerol","Sauternes"], context: "All four are Left Bank Haut-Médoc communes ranked in 1855." },
  { prompt: "Castelli di Jesi and Matelica are the two key zones for which white grape?", answer: "Verdicchio", distractors: ["Vermentino","Grechetto","Trebbiano","Garganega"], context: "Le Marche, on the Adriatic." },
  { prompt: "Conegliano Valdobbiadene, Cartizze, Rive, and Asolo form the quality pyramid of…", answer: "Prosecco", distractors: ["Franciacorta","Lambrusco","Trento DOC","Asti"], context: "Cartizze sits at the top of the Prosecco DOCG hierarchy." },
  { prompt: "Mercurey, Rully, Givry, Montagny, and Bouzeron are villages of…", answer: "Côte Chalonnaise", distractors: ["Côte de Nuits","Côte de Beaune","Mâconnais","Beaujolais"], context: "Bouzeron is the only Burgundy village-level AOC for Aligoté." },
  { prompt: "Cirò is the historic appellation of which southern region?", answer: "Calabria", distractors: ["Basilicata","Puglia","Campania","Sicily"], context: "Gaglioppo from Cirò, the heart of ancient 'Enotria'." },
  { prompt: "Campi Flegrei ('Fire Fields') near Naples is home to which white grape?", answer: "Falanghina (Flegrea)", distractors: ["Greco di Tufo","Fiano di Avellino","Carricante","Vermentino"], context: "Falanghina Flegrea is lighter and more mineral than the Beneventana clone." },
  { prompt: "Colli Piceni, on the Adriatic, is the home zone of which white grape?", answer: "Pecorino", distractors: ["Verdicchio","Trebbiano d'Abruzzo","Grechetto","Vermentino"], context: "Named for the sheep ('pecora') that loved the grapes." },
];

const SYNONYM_BANK: HardEntry[] = [
  { prompt: "In Valtellina, Nebbiolo is called…", answer: "Chiavennasca", distractors: ["Spanna","Picotendro","Prugnolo Gentile","Sangiovese Grosso"], context: "Spanna (Gattinara) and Picotendro (Valle d'Aosta) are other Nebbiolo synonyms." },
  { prompt: "In Valle d'Aosta, Pinot Grigio goes by…", answer: "Malvoisie", distractors: ["Pinot Beurot","Ruländer","Tokay d'Alsace","Grauburgunder"], context: "All are Pinot Gris synonyms elsewhere — Malvoisie is the local Aostan name." },
  { prompt: "Friulano is genetically identical to…", answer: "Sauvignonasse", distractors: ["Sauvignon Blanc","Sémillon","Trebbiano","Garganega"], context: "Also called Sauvignon Vert; banned from the name 'Tocai Friulano' in 2007, sometimes labeled 'Jakot'." },
  { prompt: "Primitivo is genetically identical to…", answer: "Zinfandel", distractors: ["Cinsault","Grenache","Carignan","Mourvèdre"], context: "Same grape as California Zinfandel and Croatia's Crljenak Kaštelanski." },
  { prompt: "Cannonau (Sardinia) is the same grape as…", answer: "Grenache / Garnacha", distractors: ["Tempranillo","Monastrell","Carignan","Sangiovese"], context: "A legacy of long Spanish rule on Sardinia." },
  { prompt: "Brunello di Montalcino is 100% which grape?", answer: "Sangiovese Grosso", distractors: ["Sangiovese di Romagna","Nebbiolo","Aglianico","Montepulciano"], context: "'Little brown one' — first modern vintage Biondi-Santi 1888." },
  { prompt: "Sciava (Trentino-Alto Adige) is also called…", answer: "Vernatsch", distractors: ["Lagrein","Teroldego","Blauburgunder","Kerner"], context: "South Tyrol's German name for Schiava." },
  { prompt: "Blauburgunder, as used in Alto Adige, is…", answer: "Pinot Nero / Pinot Noir", distractors: ["Lagrein","Schiava","Trollinger","Zweigelt"], context: "Literally 'blue Burgundian.'" },
  { prompt: "Bovale Sardo (Sardinia) is genetically…", answer: "Graciano", distractors: ["Mazuelo","Tempranillo","Garnacha","Monastrell"], context: "Bovale Grande is Mazuelo (Carignan); both arrived under Spanish rule." },
];

const AGING_BANK: HardEntry[] = [
  { prompt: "Aged minimum 38 months total with 18 in oak (Riserva: 62 months total, 18 in oak)…", answer: "Barolo", distractors: ["Barbaresco","Brunello di Montalcino","Chianti Classico Gran Selezione","Amarone della Valpolicella"], context: "Barolo DOCG." },
  { prompt: "Aged minimum 26 months with 9 in oak (Riserva: 50 months, 9 in oak)…", answer: "Barbaresco", distractors: ["Barolo","Valtellina Superiore","Brunello di Montalcino","Taurasi"], context: "Barbaresco DOCG." },
  { prompt: "Aged 4 years total with 2 in oak; Riserva 5 years total with 2 in oak…", answer: "Brunello di Montalcino", distractors: ["Barolo","Chianti Classico Riserva","Vino Nobile di Montepulciano","Taurasi"], context: "100% Sangiovese Grosso; DOCG since 1980." },
  { prompt: "Annata 12 months min; Riserva 24 months (3 in bottle); Gran Selezione 30 months from estate fruit…", answer: "Chianti Classico", distractors: ["Chianti DOCG","Brunello di Montalcino","Vino Nobile","Bolgheri Sassicaia"], context: "Gallo Nero — the Black Rooster." },
  { prompt: "Metodo classico sparkling aged 67 months min on the lees (Riserva tier)…", answer: "Franciacorta Riserva", distractors: ["Trento DOC","Champagne Vintage","Cava de Paraje","Prosecco Cartizze"], context: "Millesimato 37 months; Satèn and Rosé MV or vintage." },
  { prompt: "DOCG Secco aged 37 months total (12 in oak, 4 in bottle); 'thunderingly' tannic…", answer: "Sagrantino di Montefalco", distractors: ["Taurasi","Aglianico del Vulture Superiore","Amarone","Brunello Riserva"], context: "Umbria's flagship; Arnaldo Caprai is the modern reference." },
  { prompt: "Valtellina Superiore aged minimum 2 years (1 in oak); passito version is called…", answer: "Sforzato di Valtellina", distractors: ["Amarone della Valpolicella","Recioto della Valpolicella","Vin Santo","Passito di Pantelleria"], context: "Rare passito Nebbiolo from Lombardy." },
];

const LORE_BANK: HardEntry[] = [
  { prompt: "Region whose 'Black Rooster' (Gallo Nero) trademark dates to a 13th-c. border-settling rooster race between Florence and Siena…", answer: "Chianti Classico (Tuscany)", distractors: ["Brunello di Montalcino","Bolgheri","Vino Nobile di Montepulciano","Carmignano"], context: "Florence starved a black rooster so it would crow early; their knight rode out first and won the whole Chianti zone." },
  { prompt: "Cistercian monks at the Abbey of Cîteaux (founded 1098) catalogued soils and built Clos de Vougeot in…", answer: "Côte de Nuits", distractors: ["Côte de Beaune","Chablis","Mâconnais","Côte Chalonnaise"], context: "Birthplace of monastic terroir thinking; in 1395 Philip the Bold banned Gamay here." },
  { prompt: "Region drained by Dutch merchants in the 17th c. to make viticulture possible; codified by Napoleon III's 1855 Classification…", answer: "Médoc / Haut-Médoc", distractors: ["Saint-Émilion","Sauternes","Pomerol","Pessac-Léognan"], context: "Maritime gravel ideal for Cabernet Sauvignon." },
  { prompt: "Château Haut-Brion was included by exception in the 1855 Classification despite sitting in…", answer: "Pessac-Léognan (Graves)", distractors: ["Saint-Émilion","Pomerol","Médoc","Sauternes"], context: "The only non-Médoc red ranked in 1855." },
  { prompt: "Iron-pan soil ('crasse de fer') under sand and clay, no classification system, home to Pétrus, Le Pin, and Lafleur…", answer: "Pomerol", distractors: ["Saint-Émilion","Margaux","Saint-Julien","Pessac-Léognan"], context: "Merlot-dominant Right Bank with cult châteaux." },
  { prompt: "Built on Kimmeridgian limestone — Jurassic seabed with fossilized oyster shells visible in the vineyards…", answer: "Chablis", distractors: ["Sancerre","Côte de Beaune","Champagne","Mosel"], context: "~46–47° latitude, cool-continental — Chardonnay only." },
  { prompt: "Mario Schiopetto pioneered single-vineyard whites here; Gravner and Radikon led the orange-wine movement…", answer: "Friuli-Venezia Giulia", distractors: ["Alto Adige","Veneto","Slovenia (Brda)","Piedmont"], context: "Northeast Italy; over 60% DOC." },
  { prompt: "Andrea Franchetti opened the international Etna era and introduced the single-vineyard 'Contrada' system in…", answer: "Sicily", distractors: ["Campania","Sardinia","Calabria","Basilicata"], context: "Nerello Mascalese on Etna's volcanic ash." },
  { prompt: "Romans called this region 'Campania Felix' ('Happy Land') for its fertile volcanic soils around Vesuvius…", answer: "Campania", distractors: ["Lazio","Sicily","Basilicata","Puglia"], context: "Home of Aglianico (Taurasi = 'Barolo of the South'), Greco di Tufo, Fiano di Avellino." },
  { prompt: "Ancient Greeks called this land 'Enotria' (Land of Wine); its wines were served at the Olympics…", answer: "Calabria", distractors: ["Campania","Basilicata","Sicily","Sardinia"], context: "Native Gaglioppo and Greco around Cirò." },
  { prompt: "Sassicaia's 1985 vintage earned Robert Parker's first 100-point score and forced creation of which DOC?", answer: "Bolgheri (Tuscany)", distractors: ["Chianti Classico Gran Selezione","Brunello Riserva","Maremma Toscana","Carmignano"], context: "Coined the 'Super Tuscan' category (Burton Anderson); IGT recognition followed in 1992, Bolgheri DOC updated 1994." },
  { prompt: "Phylloxera-free sandy soils of Sulcis are home to which grape?", answer: "Carignano", distractors: ["Cannonau","Vermentino","Nerello Mascalese","Aglianico"], context: "Sardinia; pre-phylloxera vines survive on sand." },
];

function bankFor(mode: Mode): HardEntry[] {
  switch (mode) {
    case "subzone-to-region": return SUBZONE_BANK;
    case "synonym-to-grape":  return SYNONYM_BANK;
    case "aging-to-wine":     return AGING_BANK;
    case "lore-to-region":    return LORE_BANK;
    default:                  return [];
  }
}

function buildHardQuestions(mode: Mode, _pool: Region[]): Question[] {
  const bank = bankFor(mode);
  const picks = shuffle(bank).slice(0, COUNT);
  return picks.map((e) => {
    const distractors = shuffle(e.distractors).slice(0, 3);
    return {
      prompt: e.prompt,
      sub: e.sub,
      choices: shuffle([e.answer, ...distractors]),
      answer: e.answer,
      context: e.context,
    };
  });
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