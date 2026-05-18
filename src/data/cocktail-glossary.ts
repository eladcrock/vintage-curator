/**
 * Glossary for cocktail menu descriptions. Terms are matched
 * case-insensitively (longest-first) and rendered with a hover tooltip
 * on the Bar Program cards.
 *
 * Keep blurbs short — one or two sentences. Only add entries where the
 * context genuinely helps a guest or server.
 */

export type GlossaryEntry = {
  term: string;
  aliases?: string[];
  blurb: string;
};

export const COCKTAIL_GLOSSARY: GlossaryEntry[] = [
  // — Spirits / producers —
  {
    term: "Elijah Craig Bourbon",
    aliases: ["Elijah Craig"],
    blurb:
      "Heaven Hill's small-batch Kentucky bourbon, named for the Baptist preacher credited (apocryphally) with charring barrels in 1789. Bold caramel and toasted oak.",
  },
  {
    term: "St. George Basil Eau de Vie",
    blurb:
      "St. George Spirits (Alameda, CA) — pioneers of American craft distilling since 1982. Clear, unaged brandy distilled from fresh basil — pure herbal essence, no sugar.",
  },
  {
    term: "St. George Valley Gin",
    blurb:
      "St. George Spirits (Alameda, CA) — flagship Bay-Area-grown gin, juniper-forward with sage and bay laurel.",
  },
  {
    term: "St. George",
    blurb:
      "St. George Spirits — Alameda, CA. A founding US craft distillery (est. 1982), known for eaux de vie and gins.",
  },
  {
    term: "Eau de Vie",
    blurb:
      "French for 'water of life' — a clear, unaged fruit or botanical brandy. No sugar, no oak; the aroma is the whole point.",
  },
  {
    term: "Brucato Chapparal",
    aliases: ["Brucato Chaparral"],
    blurb:
      "California amaro from Brucato Amaro (SF), built around coastal chaparral botanicals — sage, bay, yerba santa. Dry, herbaceous, distinctly West Coast.",
  },
  {
    term: "Casa Obsidiana Reposado",
    blurb:
      "Small-batch luxury tequila — a Napa/Tequila family partnership. Finished in ex-Chardonnay barrels for a custardy, wine-country lift.",
  },
  {
    term: "Amaro Nonino Riserva",
    aliases: ["Amaro Nonino"],
    blurb:
      "Friulian amaro from the Nonino family. Riserva is aged 24 months in barrique — caramel-orange backbone with deeper cacao and coffee tones.",
  },
  { term: "Grand Marnier", blurb: "Cognac-based French orange liqueur (1880). Richer and more aged than a triple sec." },
  { term: "Branca Menta", blurb: "Fernet-Branca's softer cousin — peppermint-forward and lower in bitterness." },
  { term: "Menta Caffè", blurb: "House blend of Branca Menta with coffee liqueur — mint-and-coffee finish." },
  { term: "Mr. Black", blurb: "Australian cold-brew coffee liqueur. Low sugar, high real-coffee character — built for espresso martinis." },
  {
    term: "Monkey 47 Distiller's Select",
    aliases: ["Monkey 47"],
    blurb:
      "Cult Black Forest gin built on 47 botanicals (including cranberry). Distiller's Select adds extra botanical depth.",
  },
  {
    term: "Yellow Chartreuse",
    blurb:
      "Softer, honeyed sibling of Green Chartreuse — still made by Carthusian monks from 130 herbs. Lower proof, sweeter, more saffron.",
  },
  {
    term: "2023 MOF Yellow Chartreuse",
    blurb:
      "A 2023-release Yellow Chartreuse selected by a Meilleur Ouvrier de France (MOF) — France's top craft distinction. Tighter, more vivid herbs than the standard bottling; a collector's pour.",
  },
  {
    term: "Chartreuse",
    blurb:
      "Centuries-old French herbal liqueur made by Carthusian monks. Green is bold and dry; Yellow is gentler and honeyed.",
  },
  {
    term: "Martini & Rossi Rosso",
    blurb:
      "Classic Italian sweet vermouth (Turin, 1863). Vintage bottles develop oxidative tertiary notes you can't get from modern stock.",
  },
  {
    term: "1960s Martini & Rossi Rosso",
    blurb:
      "A vintage 1960s bottle of Martini & Rossi Rosso vermouth — six decades of slow oxidation in glass yield deep nutty, dried-fig, and rancio notes that modern production simply can't replicate. Irreplaceable.",
  },
  {
    term: "Rosso Vermouth",
    blurb:
      "Italian-style sweet (red) vermouth — aromatized fortified wine, the bittersweet anchor of a Negroni or Manhattan.",
  },
  { term: "Zomoz Mezcal", blurb: "Family-owned Oaxacan mezcal — typically espadín, traditionally pit-roasted for that signature smoke." },
  { term: "Cynar", blurb: "Italian amaro built on artichoke leaf. Earthy, vegetal bitterness; lower ABV than most amari." },
  { term: "WhistlePig 6yr Rye", blurb: "Vermont-finished 100% rye. Bold spice with a charred-oak backbone." },
  {
    term: "Liquore Strega",
    blurb:
      "Saffron-yellow Italian herbal liqueur from Benevento (1860). 70-botanical, faintly minty, with a soft anisette lift.",
  },
  { term: "Cointreau", blurb: "French triple sec from the Cointreau family (1875). Drier and cleaner than most orange liqueurs." },
  { term: "Ketel One", blurb: "Dutch wheat vodka, family-distilled by Nolet since the 1690s. Clean and neutral with a faint citrus lift." },
  {
    term: "Sake Umeshu",
    aliases: ["Umeshu"],
    blurb:
      "Japanese plum liqueur made by steeping ume fruit in spirit and sugar. Sweet, lightly tart, almond-pit aromatic.",
  },
  { term: "Montenegro", blurb: "Bologna amaro (1885), 40-botanical, orange-and-vanilla forward. Approachable and food-friendly." },
  {
    term: "El Tequileno Reposado",
    aliases: ["El Tequileno"],
    blurb:
      "Family-run Tequila distillery (since 1959) known for using mountain spring water. Reposado: aged 2–11 months in oak.",
  },
  {
    term: "Chinola Liqueur",
    aliases: ["Chinola"],
    blurb:
      "Dominican passionfruit liqueur — 'chinola' is the local word for passionfruit. Tangy, very close to fresh fruit.",
  },
  { term: "Seedlip Spice", blurb: "Non-alcoholic distillate — allspice and cardamom forward. Built for N/A cocktails by Seedlip (UK, 2015)." },
  { term: "Seedlip Notas", blurb: "Seedlip's bittersweet aperitif-style N/A spirit — citrus-and-cascarilla bitterness for non-alc Negronis." },
  { term: "Malfy Italian Gin", aliases: ["Malfy"], blurb: "Piedmontese gin built on Italian juniper and Amalfi lemon peel. Bright and citrus-driven." },
  {
    term: "Campari",
    blurb:
      "Milanese red bitter aperitivo (1860). The bittersweet engine of a Negroni — citrus, rhubarb, and a long bitter finish.",
  },
  { term: "Mionetto", blurb: "Veneto producer best known for Prosecco. Their N/A aperitivo brings the bitter-orange Spritz profile without alcohol." },
  {
    term: "Ritual Aperitif",
    aliases: ["Ritual Aperitivo"],
    blurb:
      "Chicago-made N/A aperitif — gentian-and-citrus bitterness built to stand in for Campari/Aperol.",
  },
  { term: "Pathfinder", blurb: "Hemp-and-botanical N/A 'spirit' — herbal, faintly smoky. Reads as amaro-adjacent in a non-alc build." },
  {
    term: "Amaro Averna",
    aliases: ["Averna"],
    blurb:
      "Sicilian amaro from Caltanissetta (1868). Cola-and-mint sweetness with light baking-spice — the gentle end of the amaro spectrum.",
  },
  { term: "Nolet's Gin", blurb: "Dutch family distillery (same Nolets behind Ketel One). Distinctive rose, peach, and raspberry botanicals — soft and floral." },
  { term: "Limoncello", blurb: "Southern Italian lemon liqueur from Amalfi/Sorrento lemon peels macerated in neutral spirit. Served chilled as digestivo." },
  { term: "Kally N/A Sparkling Rosé", aliases: ["Kally"], blurb: "Verjus-based N/A sparkling wine — strawberry, hibiscus, real grape-skin tannin. B-Corp, locally produced." },
  // — Generic technique / context —
  { term: "Amaro", blurb: "Italian bittersweet herbal liqueur, traditionally a digestivo. Gentian, citrus peel, roots, and bark are common backbones." },
  { term: "Vermouth", blurb: "Aromatized, fortified wine — the bridge between wine and spirit in classic cocktails. Sweet (rosso) or dry (bianco/secco)." },
  { term: "Mezcal", blurb: "Agave spirit from Oaxaca and beyond. Pit-roasted piñas give the signature smoke that distinguishes it from tequila." },
  {
    term: "Honey-Molasses",
    blurb:
      "House-blended sweetener — honey's floral lift plus molasses's mineral depth. Reads as 'old-fashioned' sugar without the flat profile of simple syrup.",
  },
  {
    term: "Molasses",
    blurb:
      "Pressed-sugarcane byproduct — bittersweet, mineral, faintly smoky. Adds backbone and color where plain sugar would fall flat.",
  },
];

/** Sorted longest-first so multi-word terms win over substrings. */
export const GLOSSARY_LOOKUP: { match: string; entry: GlossaryEntry }[] = (() => {
  const flat: { match: string; entry: GlossaryEntry }[] = [];
  for (const e of COCKTAIL_GLOSSARY) {
    flat.push({ match: e.term, entry: e });
    for (const a of e.aliases ?? []) flat.push({ match: a, entry: e });
  }
  return flat.sort((a, b) => b.match.length - a.match.length);
})();
