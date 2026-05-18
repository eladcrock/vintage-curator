/**
 * Wine glossary — quick-reference blurbs (one short line each).
 * Longest match wins, case-insensitive.
 */

export type WineGlossaryEntry = {
  term: string;
  aliases?: string[];
  blurb: string;
};

export const WINE_GLOSSARY: WineGlossaryEntry[] = [
  // Italian Reds
  { term: "Barolo", blurb: "Piedmont's flagship Nebbiolo. Tar, rose, leather, big tannin, ages decades." },
  { term: "Barbaresco", blurb: "Nebbiolo from the Langhe — slightly more elegant, earlier-drinking than Barolo." },
  { term: "Langhe Nebbiolo", blurb: "Younger Nebbiolo — Barolo character, friendlier price." },
  { term: "Nebbiolo", blurb: "Piedmont's noble red. Pale color, huge tannin, rose-and-tar perfume." },
  { term: "Brunello di Montalcino", aliases: ["Brunello"], blurb: "100% Sangiovese from Montalcino. Powerful, structured, age-worthy." },
  { term: "Rosso di Montalcino", blurb: "Brunello's younger sibling — same grape, drinks now." },
  { term: "Vino Nobile di Montepulciano", blurb: "Tuscan Sangiovese from the town of Montepulciano. (Different from the grape.)" },
  { term: "Chianti Classico", blurb: "Sangiovese from the historic Chianti zone. Cherry, tomato leaf, savory." },
  { term: "Chianti", blurb: "Tuscan Sangiovese. High acid, tart cherry, classic table red." },
  { term: "Sangiovese", blurb: "Italy's most-planted red. Sour cherry, dried herb, firm tannin." },
  { term: "Super Tuscan", blurb: "Tuscan reds blending Sangiovese with Cab/Merlot/Syrah outside DOC rules." },
  { term: "Bolgheri", blurb: "Coastal Tuscan zone for Bordeaux-style blends. Home of Sassicaia." },
  { term: "Amarone della Valpolicella", aliases: ["Amarone"], blurb: "Veneto red from dried grapes. Rich, raisined, high alcohol." },
  { term: "Ripasso", blurb: "Valpolicella re-fermented on Amarone skins. A 'baby Amarone.'" },
  { term: "Valpolicella", blurb: "Light Veneto red, Corvina-based. Cherry with almond finish." },
  { term: "Aglianico", blurb: "Southern Italian red — 'Barolo of the South.' Big tannin, volcanic edge." },
  { term: "Taurasi", blurb: "Campania DOCG Aglianico. Long-aged, structured, age-worthy." },
  { term: "Nero d'Avola", blurb: "Sicily's flagship red. Juicy black cherry, soft tannin." },
  { term: "Nerello Mascalese", aliases: ["Nerello"], blurb: "Volcanic Sicilian red — Pinot-like elegance with smoky minerality." },
  { term: "Etna Rosso", blurb: "Mt. Etna red from Nerello Mascalese. Light, vibrant, volcanic." },
  { term: "Etna Bianco", blurb: "Mt. Etna white from Carricante. High acid, saline minerality." },
  { term: "Frappato", blurb: "Sicilian red — fragrant, juicy, low tannin." },
  { term: "Barbera", blurb: "Piedmont's everyday red. High acid, low tannin, juicy." },
  { term: "Dolcetto", blurb: "Soft Piedmontese red. Fruity, low acid, drink young." },
  { term: "Lagrein", blurb: "Alto Adige red. Dark, plummy, faintly bitter finish." },
  { term: "Teroldego", blurb: "Trentino red. Dark berry, peppery, medium tannin." },
  { term: "Montepulciano d'Abruzzo", blurb: "Soft Abruzzo red. Easy tannin, dark cherry. (The grape, not the town.)" },
  { term: "Primitivo", blurb: "Puglia red, identical to Zinfandel. Bold, jammy, high ABV." },

  // Italian Whites
  { term: "Carricante", blurb: "Etna white. Lemon-pith, saline, volcanic mineral." },
  { term: "Falanghina", blurb: "Ancient Campanian white. Crisp citrus, white flowers, almond." },
  { term: "Fiano", blurb: "Campanian white. Honeyed pear, hazelnut, ages well." },
  { term: "Greco di Tufo", aliases: ["Greco"], blurb: "Campanian white on tufa soils. Stone fruit, almond, mineral." },
  { term: "Vermentino", blurb: "Coastal Italian white. Salty, citrus, herbal — built for seafood." },
  { term: "Verdicchio", blurb: "Le Marche white. High acid, almond finish, ages surprisingly well." },
  { term: "Garganega", blurb: "Veneto white, foundation of Soave. Pear, almond." },
  { term: "Soave", blurb: "Veneto white from Garganega. Light, mineral, bitter-almond finish." },
  { term: "Gavi", blurb: "Piedmontese Cortese. Crisp, citrus, light-bodied." },
  { term: "Pinot Grigio", aliases: ["Pinot Gris"], blurb: "Italy: crisp and lean. Alsace: richer, sometimes off-dry. Same grape." },
  { term: "Pinot Bianco", aliases: ["Weissburgunder"], blurb: "Light, neutral white. Apple, almond, low aromatics." },
  { term: "Friulano", blurb: "Friulian white. Pear, almond, herbaceous." },
  { term: "Ribolla Gialla", blurb: "Friulian white — often skin-contact. Citrus peel, herbs, texture." },

  // French
  { term: "Champagne", blurb: "NE France sparkling. Méthode champenoise; Chardonnay, Pinot Noir, Meunier." },
  { term: "Burgundy", aliases: ["Bourgogne"], blurb: "Eastern France — Chardonnay and Pinot Noir. Terroir is everything." },
  { term: "Côte de Nuits", blurb: "Northern Côte d'Or — almost entirely Pinot Noir." },
  { term: "Côte de Beaune", blurb: "Southern Côte d'Or — home of the great white Burgundies." },
  { term: "Gevrey-Chambertin", blurb: "Powerful Côte de Nuits Pinot Noir. Dark fruit, structured." },
  { term: "Chambolle-Musigny", blurb: "Most elegant Côte de Nuits Pinot. Silky, perfumed." },
  { term: "Vosne-Romanée", blurb: "Burgundy's most prestigious village — home to Romanée-Conti." },
  { term: "Meursault", blurb: "Côte de Beaune Chardonnay — rich, nutty, butterscotch." },
  { term: "Puligny-Montrachet", blurb: "Côte de Beaune — precise, mineral Chardonnay." },
  { term: "Chassagne-Montrachet", blurb: "Côte de Beaune — broader Chardonnay, plus some red." },
  { term: "Chablis", blurb: "Northernmost Burgundy Chardonnay. Steely, oyster-shell minerality." },
  { term: "Pouilly-Fuissé", blurb: "Mâconnais Chardonnay. Rich, ripe, stone-fruit weight." },
  { term: "Sancerre", blurb: "Loire Sauvignon Blanc. Flinty, citrus, gooseberry." },
  { term: "Pouilly-Fumé", blurb: "Loire Sauvignon across from Sancerre — smokier, leaner." },
  { term: "Vouvray", blurb: "Loire Chenin Blanc — dry to sweet to sparkling. Honeyed quince." },
  { term: "Bordeaux", blurb: "Left Bank: Cabernet-led. Right Bank: Merlot-led. Built to age." },
  { term: "Pauillac", blurb: "Left Bank Bordeaux — Cabernet, cedar, cassis. Lafite/Latour/Mouton." },
  { term: "Margaux", blurb: "Left Bank Bordeaux — perfumed, floral Cabernet blends." },
  { term: "Saint-Julien", aliases: ["St-Julien"], blurb: "Left Bank Bordeaux — balance of structure and finesse." },
  { term: "Saint-Émilion", aliases: ["St-Emilion"], blurb: "Right Bank Bordeaux — Merlot-led, plush, plummy." },
  { term: "Pomerol", blurb: "Tiny Right Bank — Merlot-led, opulent. Home of Pétrus." },
  { term: "Châteauneuf-du-Pape", blurb: "Southern Rhône, Grenache-led. Warm, garrigue, full body." },
  { term: "Côte-Rôtie", blurb: "Northern Rhône Syrah on granite. Floral, smoky, structured." },
  { term: "Hermitage", blurb: "Northern Rhône Syrah from a single hill. Dense, powerful, age-worthy." },
  { term: "Cornas", blurb: "Northern Rhône Syrah — wild, brooding, savage." },
  { term: "Gigondas", blurb: "Southern Rhône Grenache — bigger tannin, less polish than CdP." },
  { term: "Condrieu", blurb: "Northern Rhône 100% Viognier. Apricot, honeysuckle, oily." },

  // Other classics
  { term: "Rioja", blurb: "Spanish Tempranillo. Crianza/Reserva/Gran Reserva = oak/bottle aging." },
  { term: "Ribera del Duero", blurb: "Spanish Tempranillo — bigger and riper than Rioja." },
  { term: "Tempranillo", blurb: "Spain's flagship red. Cherry, leather, tobacco." },
  { term: "Priorat", blurb: "Catalonian Garnacha/Cariñena on slate. Dense, mineral, age-worthy." },
  { term: "Albariño", blurb: "Galician white. High acid, citrus, saline — built for shellfish." },

  // German / Austrian
  { term: "Riesling", blurb: "Aromatic noble white — bone-dry to lusciously sweet. Ages decades." },
  { term: "Mosel", blurb: "German Riesling on slate. Featherweight, electric acid, low ABV." },
  { term: "Rheingau", blurb: "Rhine Riesling — fuller and more mineral than Mosel, often dry." },
  { term: "Grüner Veltliner", aliases: ["Grüner"], blurb: "Austrian white — white pepper, citrus, snap-pea." },
  { term: "Gewürztraminer", blurb: "Aromatic white — lychee, rose, ginger. Often off-dry." },

  // Grapes / styles
  { term: "Chardonnay", blurb: "World's most-planted white. A blank canvas for place and winemaking." },
  { term: "Sauvignon Blanc", blurb: "Aromatic white — citrus, grass, gooseberry." },
  { term: "Chenin Blanc", blurb: "Loire white — honey, quince, wax. Dry to sweet to sparkling." },
  { term: "Viognier", blurb: "Aromatic white — apricot, honeysuckle, full body, low acid." },
  { term: "Pinot Noir", aliases: ["Pinot Nero"], blurb: "Thin-skinned red — cherry, earth, forest floor. Burgundy's grape." },
  { term: "Cabernet Sauvignon", aliases: ["Cabernet"], blurb: "World's most-planted red. Cassis, cedar, firm tannin." },
  { term: "Cabernet Franc", blurb: "Lighter, more aromatic Cab parent. Bell pepper, raspberry, graphite." },
  { term: "Merlot", blurb: "Plush red — plum, cocoa, soft tannin." },
  { term: "Syrah", aliases: ["Shiraz"], blurb: "Syrah (Rhône): pepper, smoke. Shiraz (Australia): bigger, jammier." },
  { term: "Grenache", aliases: ["Garnacha"], blurb: "Warm-climate red — strawberry, white pepper, high ABV." },
  { term: "Malbec", blurb: "Originally Cahors, now Argentina's flagship. Plum, violet, soft tannin." },
  { term: "Zinfandel", blurb: "California red, identical to Primitivo. Brambly, peppery, high ABV." },

  // Sparkling
  { term: "Prosecco", blurb: "Veneto sparkling from Glera. Tank method — fresh and fruity." },
  { term: "Franciacorta", blurb: "Lombardy traditional-method sparkling. Italy's answer to Champagne." },
  { term: "Cava", blurb: "Spanish traditional-method sparkling. Macabeo, Xarel·lo, Parellada." },
  { term: "Crémant", blurb: "French traditional-method sparkling from outside Champagne." },
  { term: "Lambrusco", blurb: "Lightly sparkling Emilia-Romagna red. Dry to off-dry." },
  { term: "Pét-Nat", aliases: ["Pétillant Naturel"], blurb: "Bottled mid-fermentation. Cloudy, low-pressure, ancestral method." },

  // Other style terms
  { term: "Orange wine", aliases: ["skin-contact"], blurb: "White fermented on its skins. Tannic, savory, often funky." },
];

export const WINE_LOOKUP: { match: string; entry: WineGlossaryEntry }[] = (() => {
  const flat: { match: string; entry: WineGlossaryEntry }[] = [];
  for (const e of WINE_GLOSSARY) {
    flat.push({ match: e.term, entry: e });
    for (const a of e.aliases ?? []) flat.push({ match: a, entry: e });
  }
  return flat.sort((a, b) => b.match.length - a.match.length);
})();
