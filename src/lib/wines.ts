import winesData from "@/data/wines.json";

export type Wine = {
  id: number;
  code: string | null;
  vintage: number | "NV" | "MV";
  producer: string;
  cuvee: string | null;
  varietal: string | null;
  region: string | null;
  country: string | null;
  type: "Sparkling" | "White" | "Red" | "Rosé" | "Orange" | "Dessert" | "Other";
  priceGlass: number | null;
  priceBottle: number | null;
  size: string | null;
  byTheGlass: boolean;
  largeFormat: boolean;
};

export const ALL_WINES: Wine[] = winesData as Wine[];

export const WINE_TYPES = [
  "Sparkling",
  "White",
  "Rosé",
  "Orange",
  "Red",
  "Dessert",
] as const;

export type WineTypeFilter = (typeof WINE_TYPES)[number];

/**
 * Derive a subcategory for a wine from its varietal / cuvee / region.
 * Only meaningful for Sparkling, White, Red. Returns null otherwise.
 */
export function subcategoryOf(w: Wine): string | null {
  const hay = [w.varietal, w.cuvee, w.region, w.producer]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (w.type === "Sparkling") {
    if (/champagne|reims|epernay|\bay\b|ambonnay|avize|verzenay|verzy|bouzy|mesnil|mareuil|cumieres|marne/.test(hay)) return "Champagne";
    if (/prosecco|valdobbiadene|conegliano/.test(hay)) return "Prosecco";
    if (/franciacorta/.test(hay)) return "Franciacorta";
    if (/\bcava\b/.test(hay)) return "Cava";
    if (/cr[eé]mant/.test(hay)) return "Crémant";
    if (/lambrusco/.test(hay)) return "Lambrusco";
    if (/pet[- ]?nat|pétillant/.test(hay)) return "Pét-Nat";
    if (/non[- ]?alcoholic/.test(hay)) return "Non-Alcoholic";
    return "Other Sparkling";
  }

  if (w.type === "White") {
    if (/chardonnay|montrachet|meursault|chablis|puligny|chassagne|corton-charlemagne|mâcon|pouilly-fuiss/.test(hay)) return "Chardonnay";
    if (/sauvignon blanc|sancerre|pouilly-fum|fumé blanc/.test(hay)) return "Sauvignon Blanc";
    if (/riesling/.test(hay)) return "Riesling";
    if (/pinot grigio|pinot gris/.test(hay)) return "Pinot Grigio / Gris";
    if (/pinot bianco|weissburgunder/.test(hay)) return "Pinot Bianco";
    if (/chenin blanc|vouvray|savenni/.test(hay)) return "Chenin Blanc";
    if (/viognier|condrieu/.test(hay)) return "Viognier";
    if (/gewürz|gewurz/.test(hay)) return "Gewürztraminer";
    if (/albari[ñn]o/.test(hay)) return "Albariño";
    if (/gr[üu]ner|veltliner/.test(hay)) return "Grüner Veltliner";
    if (/semillon|sémillon/.test(hay)) return "Sémillon";
    if (/carricante|etna bianco/.test(hay)) return "Carricante";
    if (/falanghina|fiano|greco|cortese|gavi|vermentino|verdicchio|trebbiano|garganega|soave|arneis/.test(hay)) return "Italian White";
    if (/white blend|bianco|blanc(?! de)/.test(hay)) return "White Blend";
    return "Other White";
  }

  if (w.type === "Red") {
    if (/barolo|barbaresco|nebbiolo|langhe nebbiolo/.test(hay)) return "Nebbiolo (Barolo/Barbaresco)";
    if (/brunello|chianti|sangiovese|vino nobile|rosso di montalcino|super tuscan|bolgheri/.test(hay)) return "Sangiovese / Tuscan";
    if (/pinot noir|pinot nero|bourgogne rouge|gevrey|chambolle|vosne|volnay|pommard|nuits|morey|beaune/.test(hay)) return "Pinot Noir";
    if (/cabernet sauvignon|cabernet franc|bordeaux blend|red blend|meritage|napa red|pauillac|margaux|st[- ]julien|saint[- ]julien|st[- ]estephe|saint[- ]emilion|pomerol|graves|m[eé]doc|red wine/.test(hay)) return "Cabernet / Bordeaux";
    if (/merlot/.test(hay)) return "Merlot";
    if (/syrah|shiraz|c[oô]te[- ]r[oô]tie|hermitage|cornas/.test(hay)) return "Syrah / Shiraz";
    if (/grenache|ch[aâ]teauneuf|gigondas|priorat|garnacha|gsm/.test(hay)) return "Grenache / GSM";
    if (/zinfandel|primitivo/.test(hay)) return "Zinfandel";
    if (/malbec/.test(hay)) return "Malbec";
    if (/tempranillo|rioja|ribera del duero/.test(hay)) return "Tempranillo";
    if (/aglianico|taurasi/.test(hay)) return "Aglianico";
    if (/montepulciano d'abruzzo/.test(hay)) return "Montepulciano";
    if (/barbera|dolcetto|bonarda|lagrein|teroldego|schiava|valpolicella|amarone|ripasso|nerello|nero d'avola|frappato/.test(hay)) return "Italian Red";
    if (/syrah|petite sirah/.test(hay)) return "Petite Sirah";
    return "Other Red";
  }

  return null;
}

/** Subcategory options per main type, in display order. */
export const SUBCATEGORIES: Record<string, string[]> = {
  Sparkling: ["Champagne", "Prosecco", "Franciacorta", "Crémant", "Cava", "Lambrusco", "Pét-Nat", "Non-Alcoholic", "Other Sparkling"],
  White: [
    "Chardonnay", "Sauvignon Blanc", "Riesling", "Pinot Grigio / Gris", "Pinot Bianco",
    "Chenin Blanc", "Viognier", "Gewürztraminer", "Albariño", "Grüner Veltliner",
    "Sémillon", "Carricante", "Italian White", "White Blend", "Other White",
  ],
  Red: [
    "Cabernet / Bordeaux", "Pinot Noir", "Nebbiolo (Barolo/Barbaresco)", "Sangiovese / Tuscan",
    "Syrah / Shiraz", "Grenache / GSM", "Merlot", "Zinfandel", "Malbec", "Tempranillo",
    "Aglianico", "Montepulciano", "Italian Red", "Other Red",
  ],
};

export type FormatFilter = "all" | "standard" | "large" | "half";

export function formatOf(w: Wine): FormatFilter {
  const s = (w.size || "").toLowerCase();
  if (s === "375ml") return "half";
  if (w.largeFormat || /^[\d.]+l$/.test(s)) return "large";
  return "standard";
}

export function vintageRange(wines: Wine[]): [number, number] {
  const years = wines
    .map((w) => (typeof w.vintage === "number" ? w.vintage : null))
    .filter((y): y is number => y !== null);
  return [Math.min(...years), Math.max(...years)];
}

export function bottlePriceRange(wines: Wine[]): [number, number] {
  const prices = wines
    .map((w) => w.priceBottle ?? w.priceGlass ?? null)
    .filter((p): p is number => p !== null);
  return [Math.min(...prices), Math.max(...prices)];
}

export function displayPrice(w: Wine): string {
  const parts: string[] = [];
  if (w.priceGlass != null) parts.push(`$${w.priceGlass} glass`);
  if (w.priceBottle != null) {
    const sizeLabel = w.size && w.size !== "750mL" ? ` ${w.size}` : "";
    parts.push(`$${w.priceBottle}${sizeLabel}`);
  }
  return parts.join("  ·  ");
}

export function wineSubtitle(w: Wine): string {
  return [w.cuvee, w.varietal, [w.region, w.country].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}