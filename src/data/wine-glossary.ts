/**
 * Glossary for wine cards. Matches varietal/region/style terms in the
 * cuvée + varietal + region subtitle line on each WineCard. Same pattern
 * as the cocktail glossary — longest match wins, case-insensitive.
 *
 * Keep blurbs short. Focus on grape character + place context that a guest
 * or new server actually benefits from.
 */

export type WineGlossaryEntry = {
  term: string;
  aliases?: string[];
  blurb: string;
};

export const WINE_GLOSSARY: WineGlossaryEntry[] = [
  // — Italian Reds —
  { term: "Barolo", blurb: "King of Piedmontese reds — 100% Nebbiolo from the Langhe. Min. 38 mo aging (18 in oak). Tar, rose, leather, intense tannin, ages for decades." },
  { term: "Barbaresco", blurb: "Nebbiolo's more elegant cousin to Barolo, also from the Langhe. Slightly lighter and earlier-drinking but no less serious." },
  { term: "Langhe Nebbiolo", blurb: "Younger or declassified Nebbiolo from the Langhe hills — Barolo character at a friendlier price and earlier-drinking window." },
  { term: "Nebbiolo", blurb: "Piedmont's noble red grape. Pale color but huge structure — tannin, acid, perfume (rose, tar, cherry). Foundation of Barolo and Barbaresco." },
  { term: "Brunello di Montalcino", aliases: ["Brunello"], blurb: "100% Sangiovese from Montalcino, Tuscany. Min. 5 yr aging (2 in oak). Powerful, structured, age-worthy — Tuscany's flagship red." },
  { term: "Rosso di Montalcino", blurb: "Brunello's younger sibling — same Sangiovese, less aging, drinks now. Often called the 'baby Brunello.'" },
  { term: "Vino Nobile di Montepulciano", blurb: "Sangiovese-based red from the town of Montepulciano in Tuscany. Often confused with the Montepulciano grape (a different variety, from Abruzzo)." },
  { term: "Chianti Classico", blurb: "Sangiovese-led red from the historic Chianti zone between Florence and Siena. Bright cherry, tomato leaf, savory; food-friendly backbone of Tuscany." },
  { term: "Chianti", blurb: "Sangiovese-based Tuscan red. Bright acidity, tart cherry, herbal lift — classic Italian table wine." },
  { term: "Sangiovese", blurb: "Italy's most-planted red grape. High acid, firm tannin, sour-cherry and dried-herb character. Backbone of Chianti, Brunello, and Vino Nobile." },
  { term: "Super Tuscan", blurb: "Tuscan red that breaks DOC rules — usually Sangiovese blended with Cab, Merlot, or Syrah. Born in the 1970s; now its own prestige category." },
  { term: "Bolgheri", blurb: "Coastal Tuscan zone famous for Bordeaux-style blends (Cab, Merlot, Cab Franc). Home of Sassicaia and Ornellaia." },
  { term: "Amarone della Valpolicella", aliases: ["Amarone"], blurb: "Dry red from Valpolicella made by drying Corvina, Rondinella, and Molinara grapes for months before fermentation. Rich, raisined, high alcohol." },
  { term: "Ripasso", blurb: "Valpolicella 're-passed' over leftover Amarone skins for a second fermentation. A 'baby Amarone' — fuller body without the full intensity." },
  { term: "Valpolicella", blurb: "Light-to-medium red from the Veneto, traditionally Corvina-based. Bright cherry, almond finish. Foundation of Amarone and Ripasso." },
  { term: "Aglianico", blurb: "Southern Italian red grape (Campania, Basilicata). Often called the 'Barolo of the South' — high tannin, dark fruit, smoky volcanic edge. Foundation of Taurasi." },
  { term: "Taurasi", blurb: "Campania DOCG built on Aglianico. Long aging requirements; deeply structured and age-worthy." },
  { term: "Nero d'Avola", blurb: "Sicily's flagship red — juicy black cherry, soft tannin, warming finish." },
  { term: "Nerello Mascalese", aliases: ["Nerello"], blurb: "Volcanic red grape of Mt. Etna in Sicily. Pinot-Noir-like elegance with smoky mineral lift from the volcanic soils." },
  { term: "Etna Rosso", blurb: "Red from the slopes of Mt. Etna in Sicily, built on Nerello Mascalese. Light color, vibrant acid, volcanic smoke — Italy's answer to Burgundy." },
  { term: "Etna Bianco", blurb: "White from Mt. Etna, built on Carricante. High acid, citrus, saline minerality — bright and mountain-cold." },
  { term: "Frappato", blurb: "Sicilian red grape — fragrant, juicy, low tannin. Often blended with Nero d'Avola in Cerasuolo di Vittoria." },
  { term: "Barbera", blurb: "Piedmontese red — high acid, low tannin, juicy red fruit. The everyday drinker of Piedmont, food-friendly and unpretentious." },
  { term: "Dolcetto", blurb: "Piedmontese red — soft, fruity, low acid. The 'little sweet one' (not actually sweet); built for early drinking." },
  { term: "Lagrein", blurb: "Indigenous red of Alto Adige in the Italian Alps. Dark color, plummy, faintly bitter finish — distinct alpine character." },
  { term: "Teroldego", blurb: "Indigenous red of Trentino. Dark berry, peppery, medium tannin — a regional specialty rarely found elsewhere." },
  { term: "Montepulciano d'Abruzzo", blurb: "Soft, fruity red from Abruzzo. Easy tannin and dark cherry — Italy's everyday red. Note: the grape, not the town in Tuscany." },
  { term: "Primitivo", blurb: "Genetically identical to Zinfandel, grown in Puglia. Bold dark fruit, jammy, high alcohol." },

  // — Italian Whites —
  { term: "Carricante", blurb: "Etna's signature white grape (Sicily). High acid, lemon-pith and saline notes, volcanic mineral edge." },
  { term: "Falanghina", blurb: "Ancient Campanian white grape — likely the basis of Roman Falernian wine. Crisp citrus, white flowers, almond finish." },
  { term: "Fiano", blurb: "Southern Italian white (Campania). Honeyed pear, hazelnut, ages surprisingly well for a southern white." },
  { term: "Greco di Tufo", aliases: ["Greco"], blurb: "Campanian white grown on tufa volcanic soils. Stone fruit, almond, mineral cut." },
  { term: "Vermentino", blurb: "Coastal Italian white (Sardinia, Liguria, Tuscany). Salty, citrusy, herbal — built for seafood." },
  { term: "Verdicchio", blurb: "Le Marche white grape with high acidity, almond finish, and surprising aging potential." },
  { term: "Garganega", blurb: "Veneto's signature white grape, foundation of Soave. Pear, almond, gentle stone fruit." },
  { term: "Soave", blurb: "Veneto white built on Garganega. Light, mineral, with a bitter-almond signature finish." },
  { term: "Gavi", blurb: "Piedmontese white made from Cortese. Crisp, citrus, light-bodied — northern Italy's seafood white." },
  { term: "Pinot Grigio", aliases: ["Pinot Gris"], blurb: "Same grape, two styles. Italian Pinot Grigio is crisp and lean; Alsatian Pinot Gris is richer, fuller, sometimes off-dry." },
  { term: "Pinot Bianco", aliases: ["Weissburgunder"], blurb: "Light, neutral white grape of Northern Italy and Alsace. Clean apple, almond, low aromatics — great with delicate food." },
  { term: "Friulano", blurb: "Friulian white grape (formerly Tocai Friulano). Pear, almond, herbaceous — bright and savory." },
  { term: "Ribolla Gialla", blurb: "Friulian white grape, often used for skin-contact ('orange') wines. Citrus peel, herbs, distinctive texture." },

  // — French —
  { term: "Champagne", blurb: "Sparkling wine from the Champagne region of NE France. Méthode champenoise (second fermentation in bottle). Chardonnay, Pinot Noir, Pinot Meunier." },
  { term: "Burgundy", aliases: ["Bourgogne"], blurb: "Eastern France — Chardonnay (whites) and Pinot Noir (reds). Famously terroir-driven; village/vineyard hierarchy determines price and prestige." },
  { term: "Côte de Nuits", blurb: "Northern half of Burgundy's Côte d'Or — almost entirely Pinot Noir. Gevrey, Chambolle, Vosne, Nuits-St-Georges live here." },
  { term: "Côte de Beaune", blurb: "Southern half of Burgundy's Côte d'Or — home to the great whites (Meursault, Puligny, Chassagne) plus reds like Pommard and Volnay." },
  { term: "Gevrey-Chambertin", blurb: "Powerful Pinot Noir village in Burgundy's Côte de Nuits. Dark fruit, structured, age-worthy." },
  { term: "Chambolle-Musigny", blurb: "Most elegant of the great Burgundy villages — silky, perfumed Pinot Noir. Often called the 'lace of Burgundy.'" },
  { term: "Vosne-Romanée", blurb: "Burgundy's most prestigious village — home to Romanée-Conti and La Tâche. Spice, dark cherry, otherworldly perfume." },
  { term: "Meursault", blurb: "Côte de Beaune village famous for rich, nutty, butterscotch-tinged Chardonnay. Often the entry point to great white Burgundy." },
  { term: "Puligny-Montrachet", blurb: "Côte de Beaune village producing some of the world's most precise, mineral Chardonnay." },
  { term: "Chassagne-Montrachet", blurb: "Côte de Beaune village — slightly riper, broader Chardonnay than Puligny, also some red." },
  { term: "Chablis", blurb: "Northernmost Burgundy — 100% Chardonnay, no/low oak, Kimmeridgian limestone soils. Steely, oyster-shell minerality." },
  { term: "Pouilly-Fuissé", blurb: "Top white from the Mâconnais (southern Burgundy). Rich, ripe Chardonnay with stone-fruit weight." },
  { term: "Sancerre", blurb: "Sauvignon Blanc from the Loire's Upper Loire. Flinty, citrus, gooseberry — the benchmark for unoaked SB." },
  { term: "Pouilly-Fumé", blurb: "Sauvignon Blanc from across the Loire from Sancerre — smokier, leaner. ('Fumé' = smoke.)" },
  { term: "Vouvray", blurb: "Loire Chenin Blanc — comes dry, off-dry, sweet, or sparkling. Honeyed quince and wet-wool texture." },
  { term: "Bordeaux", blurb: "Western France. Left Bank: Cabernet-dominant blends (Médoc, Pauillac, Margaux). Right Bank: Merlot-dominant (St-Emilion, Pomerol). Built to age." },
  { term: "Pauillac", blurb: "Left Bank Bordeaux commune — home to Lafite, Latour, Mouton. Cabernet-dominant, structured, cedar and cassis." },
  { term: "Margaux", blurb: "Left Bank Bordeaux — perfumed, elegant Cabernet blends. The most floral of the great Médoc communes." },
  { term: "Saint-Julien", aliases: ["St-Julien"], blurb: "Left Bank Bordeaux commune between Pauillac and Margaux — balance of structure and finesse." },
  { term: "Saint-Émilion", aliases: ["St-Emilion"], blurb: "Right Bank Bordeaux — Merlot-dominant with Cabernet Franc. Plush, plummy, earlier-drinking than the Left Bank." },
  { term: "Pomerol", blurb: "Tiny Right Bank Bordeaux appellation — Merlot-led, opulent, ironstone-soiled. Home of Pétrus." },
  { term: "Châteauneuf-du-Pape", blurb: "Southern Rhône red — up to 13 grapes allowed, Grenache-led. Warm, garrigue-scented, full-bodied. Famous for galets (large round stones)." },
  { term: "Côte-Rôtie", blurb: "Northern Rhône Syrah from steep granite slopes, often co-fermented with a touch of Viognier. Floral, smoky, structured." },
  { term: "Hermitage", blurb: "Northern Rhône Syrah from a single hill above Tain. Dense, powerful, ages for decades. Also produces rare whites from Marsanne/Roussanne." },
  { term: "Cornas", blurb: "Northern Rhône Syrah from a tiny granite amphitheater. Wild, brooding, often the most savage of the great Syrahs." },
  { term: "Gigondas", blurb: "Southern Rhône red — Grenache-led, often called Châteauneuf's rugged neighbor. Bigger tannin, less polish, great value." },
  { term: "Condrieu", blurb: "Northern Rhône appellation for 100% Viognier. Apricot, honeysuckle, oily texture — the world reference for Viognier." },

  // — Other classics —
  { term: "Rioja", blurb: "Spain's most famous wine region — Tempranillo-led reds. Aged categories (Crianza, Reserva, Gran Reserva) reflect time in oak/bottle." },
  { term: "Ribera del Duero", blurb: "Spanish red region — Tempranillo (locally 'Tinto Fino'). Bigger, riper, more modern in style than Rioja." },
  { term: "Tempranillo", blurb: "Spain's flagship red grape — cherry, leather, tobacco. Foundation of Rioja and Ribera del Duero." },
  { term: "Priorat", blurb: "Catalonian red region — Garnacha and Cariñena from llicorella slate soils. Dense, mineral, age-worthy." },
  { term: "Albariño", blurb: "Galician (NW Spain) white grape. High acid, citrus, salty minerality — built for shellfish." },

  // — German / Austrian —
  { term: "Riesling", blurb: "Aromatic noble white grape. Made in styles from bone-dry to lusciously sweet; high acid lets it age for decades." },
  { term: "Mosel", blurb: "German wine region on the Mosel River — Riesling on steep slate slopes. Featherweight body, electric acidity, low alcohol." },
  { term: "Rheingau", blurb: "German Riesling region along the Rhine — fuller-bodied and more mineral than Mosel, often dry." },
  { term: "Grüner Veltliner", aliases: ["Grüner"], blurb: "Austria's signature white grape. White pepper, citrus, snap-pea — bright and food-versatile." },
  { term: "Gewürztraminer", blurb: "Aromatic white grape (Alsace, Alto Adige). Lychee, rose, ginger — instantly recognizable, often off-dry." },

  // — Grapes / styles —
  { term: "Chardonnay", blurb: "World's most-planted white wine grape. A blank canvas — expresses place and winemaking choice (oak, lees, malolactic) more than its own character." },
  { term: "Sauvignon Blanc", blurb: "Aromatic white grape — citrus, grass, gooseberry. Loire (Sancerre), New Zealand (Marlborough), Napa, Friuli." },
  { term: "Chenin Blanc", blurb: "Versatile white grape from the Loire (also South Africa). Honey, quince, wax — dry to sweet to sparkling." },
  { term: "Viognier", blurb: "Aromatic white grape (Northern Rhône, California). Apricot, honeysuckle, full body, low acid." },
  { term: "Pinot Noir", aliases: ["Pinot Nero"], blurb: "Thin-skinned red — red cherry, earth, forest floor. Burgundy's grape; also great in Oregon, Sonoma Coast, Central Otago." },
  { term: "Cabernet Sauvignon", aliases: ["Cabernet"], blurb: "World's most-planted red grape. Cassis, cedar, firm tannin. Foundation of Bordeaux Left Bank and Napa." },
  { term: "Cabernet Franc", blurb: "Cab's parent grape — lighter, more aromatic. Bell pepper, raspberry, graphite. Loire (Chinon) and Right Bank Bordeaux." },
  { term: "Merlot", blurb: "Plush red grape — plum, cocoa, soft tannin. Major Bordeaux blender; flagship of Pomerol and St-Emilion." },
  { term: "Syrah", aliases: ["Shiraz"], blurb: "Same grape, two cultures. Syrah (Rhône, Old World) = pepper, smoke, restraint. Shiraz (Australia) = bigger, riper, jammier." },
  { term: "Grenache", aliases: ["Garnacha"], blurb: "Warm-climate red — strawberry, white pepper, high alcohol. Foundation of Châteauneuf and Priorat; backbone of GSM blends." },
  { term: "Malbec", blurb: "Originally from Cahors (SW France), now Argentina's flagship. Dark plum, violet, soft tannin." },
  { term: "Zinfandel", blurb: "California's signature red (genetically identical to Italy's Primitivo). Brambly black fruit, pepper, often high alcohol." },

  // — Sparkling styles —
  { term: "Prosecco", blurb: "Italian sparkling wine from the Veneto, made primarily from Glera. Tank method (Charmat) — fresher, fruitier, less yeasty than Champagne." },
  { term: "Franciacorta", blurb: "Lombardy's answer to Champagne — same method (second fermentation in bottle), Chardonnay/Pinot Noir/Pinot Bianco." },
  { term: "Cava", blurb: "Spanish sparkling wine made in the traditional method (like Champagne) from native grapes Macabeo, Xarel·lo, Parellada." },
  { term: "Crémant", blurb: "French sparkling wine made in the traditional method, but outside Champagne (Alsace, Loire, Bourgogne, Limoux, Jura)." },
  { term: "Lambrusco", blurb: "Slightly sparkling red wine from Emilia-Romagna. Ranges from bone-dry to off-dry; classic with charcuterie and parmigiano." },
  { term: "Pét-Nat", aliases: ["Pétillant Naturel"], blurb: "'Méthode ancestrale' sparkling — bottled before fermentation finishes. Funky, cloudy, low pressure; the original way to make bubbles." },

  // — Other style terms —
  { term: "Orange wine", aliases: ["skin-contact"], blurb: "White wine fermented on its skins like a red. Tannic, savory, often funky — an ancient style with a modern revival (notably from Friuli and Georgia)." },
];

export const WINE_LOOKUP: { match: string; entry: WineGlossaryEntry }[] = (() => {
  const flat: { match: string; entry: WineGlossaryEntry }[] = [];
  for (const e of WINE_GLOSSARY) {
    flat.push({ match: e.term, entry: e });
    for (const a of e.aliases ?? []) flat.push({ match: a, entry: e });
  }
  return flat.sort((a, b) => b.match.length - a.match.length);
})();
