/**
 * Cocktail glossary — quick-reference blurbs (one short line each).
 * Longest match wins, case-insensitive.
 */

export type GlossaryEntry = {
  term: string;
  aliases?: string[];
  blurb: string;
};

export const COCKTAIL_GLOSSARY: GlossaryEntry[] = [
  // Spirits / producers
  { term: "Elijah Craig Bourbon", aliases: ["Elijah Craig"], blurb: "Kentucky small-batch bourbon. Bold caramel and toasted oak." },
  { term: "St. George Valley Gin", blurb: "St. George (Alameda) flagship gin — juniper, sage, bay laurel." },
  { term: "St. George", blurb: "Pioneering Alameda craft distillery (est. 1982)." },
  { term: "Eau de Vie", blurb: "Clear, unaged fruit or botanical brandy. No sugar, no oak." },
  { term: "Brucato Chapparal", aliases: ["Brucato Chaparral"], blurb: "California amaro — sage, bay, yerba santa. Dry and herbaceous." },
  { term: "Casa Obsidiana Reposado", blurb: "Boutique tequila finished in ex-Chardonnay barrels. Custardy lift." },
  { term: "Amaro Nonino Riserva", aliases: ["Amaro Nonino"], blurb: "Friulian amaro, barrique-aged. Caramel-orange with cacao depth." },
  { term: "Grand Marnier", blurb: "Cognac-based French orange liqueur. Richer than triple sec." },
  { term: "Branca Menta", blurb: "Softer, mintier cousin of Fernet-Branca." },
  { term: "Menta Caffè", blurb: "House blend of Branca Menta and coffee liqueur." },
  { term: "Mr. Black", blurb: "Australian cold-brew coffee liqueur. Low sugar, real coffee." },
  { term: "2022 Monkey 47 Distiller's Select", blurb: "Single-vintage 2022 release — one harvest, deeper concentration." },
  { term: "Monkey 47 Distiller's Select", aliases: ["Monkey 47"], blurb: "Black Forest gin, 47 botanicals. Distiller's Select adds depth." },
  { term: "2023 MOF Yellow Chartreuse", blurb: "2023 release picked by a Meilleur Ouvrier de France — tighter, more vivid herbs." },
  { term: "Yellow Chartreuse", blurb: "Honeyed, lower-proof Chartreuse. Softer than Green." },
  { term: "Chartreuse", blurb: "French herbal liqueur from Carthusian monks. Green = bold; Yellow = honeyed." },
  { term: "1960s Martini & Rossi Rosso", blurb: "Vintage 1960s vermouth — six decades of oxidation, deep rancio notes." },
  { term: "Martini & Rossi Rosso", blurb: "Classic Italian sweet vermouth (Turin, 1863)." },
  { term: "Rosso Vermouth", blurb: "Italian sweet vermouth — the bittersweet anchor of a Negroni." },
  { term: "Zomoz Mezcal", blurb: "Family-owned Oaxacan espadín mezcal. Traditional pit-roast smoke." },
  { term: "Cynar", blurb: "Artichoke-based Italian amaro. Earthy, vegetal, low ABV." },
  { term: "WhistlePig 6yr Rye", blurb: "Vermont-finished 100% rye. Bold spice, charred oak." },
  { term: "Liquore Strega", blurb: "Saffron-yellow Italian herbal liqueur with a soft anise lift." },
  { term: "Cointreau", blurb: "French triple sec. Dry, clean orange." },
  { term: "Ketel One", blurb: "Dutch wheat vodka. Clean with faint citrus." },
  { term: "Sake Umeshu", aliases: ["Umeshu"], blurb: "Japanese plum liqueur. Sweet, tart, almond-pit aromatic." },
  { term: "Montenegro", blurb: "Bologna amaro — orange and vanilla. Easy, food-friendly." },
  { term: "El Tequileno Reposado", aliases: ["El Tequileno"], blurb: "Family-run tequila from mountain spring water. Lightly oaked." },
  { term: "Chinola Liqueur", aliases: ["Chinola"], blurb: "Dominican passionfruit liqueur. Tangy and true to the fruit." },
  { term: "Seedlip Spice", blurb: "N/A distillate — allspice and cardamom forward." },
  { term: "Seedlip Notas", blurb: "N/A bittersweet aperitif — citrus and cascarilla." },
  { term: "Malfy Italian Gin", aliases: ["Malfy"], blurb: "Piedmontese gin built on Amalfi lemon peel. Bright citrus." },
  { term: "Campari", blurb: "Milanese red bitter aperitivo. The engine of a Negroni." },
  { term: "Mionetto", blurb: "Veneto producer; N/A aperitivo with bitter-orange Spritz profile." },
  { term: "Ritual Aperitif", aliases: ["Ritual Aperitivo"], blurb: "Chicago-made N/A Campari/Aperol stand-in." },
  { term: "Pathfinder", blurb: "Hemp-and-botanical N/A spirit. Herbal, amaro-adjacent." },
  { term: "Amaro Averna", aliases: ["Averna"], blurb: "Sicilian amaro — cola, mint, baking spice. Gentle end of the spectrum." },
  { term: "Nolet's Gin", blurb: "Dutch family gin — rose, peach, raspberry. Soft and floral." },
  { term: "Limoncello", blurb: "Amalfi lemon-peel liqueur. Served chilled as digestivo." },
  { term: "Kally N/A Sparkling Rosé", aliases: ["Kally"], blurb: "Verjus-based N/A sparkling — strawberry, hibiscus, real tannin." },

  // Generic / technique
  { term: "Amaro", blurb: "Italian bittersweet herbal liqueur. Usually a digestivo." },
  { term: "Vermouth", blurb: "Aromatized, fortified wine. Sweet (rosso) or dry (bianco)." },
  { term: "Mezcal", blurb: "Agave spirit from Oaxaca. Pit-roast smoke sets it apart from tequila." },
  { term: "Honey-Molasses", blurb: "House sweetener — honey's lift plus molasses's mineral depth." },
  { term: "Molasses", blurb: "Sugarcane byproduct. Bittersweet, mineral, faintly smoky." },

  // Per-ingredient flavor descriptors
  { term: "Alloro", blurb: "Italian for bay laurel. Savory, resinous, faintly pine-menthol." },
  { term: "Toasted White Sesame", blurb: "Toasted sesame infusion — nutty, tahini-like, oily texture." },
  { term: "Fennel Frond Ice", blurb: "Ice frozen with fennel fronds — slow-releases cool anise-dill aroma." },
  { term: "Thai Tea", blurb: "Black tea with star anise, cardamom, vanilla. Adds tannin and spice." },
  { term: "Prickly Pear", blurb: "Cactus fruit — melon-watermelon sweetness, faint floral bitterness." },
  { term: "Spring Peas", blurb: "Fresh-shucked peas. Bright, grassy, garden-vegetal." },
  { term: "Passion Fruit", blurb: "Tropical fruit with sharp natural acidity and floral musk." },
  { term: "Tarragon", blurb: "Soft anise-licorice herb. Sweet green perfume." },
  { term: "Ginger Beer", blurb: "Spicy fermented ginger soda. Heat, fizz, length." },
  { term: "Lime Oil", blurb: "Expressed lime peel oil — aroma only, no added acid." },
  { term: "Montenegro Reduction", blurb: "Amaro Montenegro cooked to a syrup. Concentrated orange-vanilla bitter." },
  { term: "23K Ice", blurb: "Clear ice cube with 23K edible gold leaf. Pure theater." },
  { term: "Chartreuse Blend", blurb: "House blend of Green and Yellow Chartreuse — bold herbs, honeyed finish." },
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
