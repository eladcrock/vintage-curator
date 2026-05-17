/**
 * Wine education data - sourced from Bottega Wine Class #1-#5 documentation.
 * Each region has approximate (x, y) coordinates within a normalized 100x140
 * viewBox for its country's stylized SVG map.
 */

export type Country = "Italy" | "France";

export type GrapeNote = {
  name: string;
  kind: "red" | "white" | "sparkling" | "dessert" | "rose";
  notes: string;
};

export type Region = {
  id: string;
  name: string;
  country: Country;
  classRef: 1 | 2 | 3 | 4 | 5;
  zone?: string;
  x: number;
  y: number;
  summary: string;
  terroir?: string;
  /** Extended tasting / service notes pulled from Wine Class materials. */
  wineNotes?: string;
  /** Historical / cultural context for the region. */
  history?: string;
  grapes: GrapeNote[];
  // Substrings (lowercased) matched against wine.region / cuvee / varietal / producer.
  wineMatch: string[];
};

export const CLASSES: { id: 1 | 2 | 3 | 4 | 5; title: string; blurb: string }[] = [
  { id: 1, title: "Class 1 - Northern Italy", blurb: "Piedmont, Valle d'Aosta, Lombardy, Trentino-Alto Adige, Friuli-Venezia Giulia, Veneto." },
  { id: 2, title: "Class 2 - Central Italy", blurb: "Liguria, Emilia-Romagna, Molise, Lazio, Le Marche, Umbria, Abruzzo, Tuscany." },
  { id: 3, title: "Class 3 - Southern Italy & Islands", blurb: "Campania, Puglia, Basilicata, Calabria, Sardinia, Sicily." },
  { id: 4, title: "Class 4 - France & Bordeaux", blurb: "AOC system, Bordeaux Left & Right Bank, 1855 Classification." },
  { id: 5, title: "Class 5 - Burgundy", blurb: "Cote d'Or, Chablis, Beaujolais - Pinot Noir & Chardonnay benchmark." },
];

export const REGIONS: Region[] = [
  // ---------- Class 1 - Northern Italy ----------
  {
    id: "piedmont", name: "Piedmont", country: "Italy", classRef: 1, zone: "North",
    x: 22, y: 28,
    summary: "Northwest corner bordering France and Switzerland. 'At the foot of the mountain' - cool continental climate with strong diurnal shift. Home of Barolo (King) and Barbaresco (Queen), both 100% Nebbiolo.",
    terroir: "Rolling hills, 500-2000 ft altitude. Calcareous marl, clay, limestone.",
    wineNotes: "BAROLO ('King'): 100% Nebbiolo, 11 communes (Barolo, Castiglione Falletto, Serralunga d'Alba, La Morra, Monforte d'Alba, Verduno, Novello, Grinzane Cavour, Diano d'Alba, Cherasco, Roddi). Aging: 38 mo min (18 in oak); Riserva 62 mo (18 in oak). Rose petal, tar, truffle.\nBARBARESCO ('Queen'): 100% Nebbiolo, 4 communes (Barbaresco, Neive, Treiso, San Rocco Seno d'Elvio). Softer tannin from limestone. Aging: 26 mo (9 in oak); Riserva 50 mo (9 in oak). Violets, raspberry, licorice.\nBARBERA: Asti = lighter, fruit-forward, stainless. Alba = robust, oak-aged.\nDOLCETTO: 'Little sweet one' — neither little nor sweet. Drink within 5 years.\nMOSCATO d'Asti: off-dry, low-alcohol frizzante.\nARNEIS ('little rascal') from Roero — susceptible to powdery mildew.\nCORTESE = the grape of Gavi.",
    history: "Vine cultivation dates to the Middle Ages under Roman influence, centered on Nebbiolo. Originally Nebbiolo wines were sweet; the 19th-century French renaissance — coinciding with the Risorgimento (Italian unification) — defined dry, age-worthy Barolo and Barbaresco. In the 1960s both were granted DOC, and producers shifted from large blended bottlings to single-vineyard releases that emphasize terroir.",
    grapes: [
      { name: "Nebbiolo", kind: "red", notes: "Rose petal, tar, truffle. Full body, high tannin and acidity. Barolo aged 38 mo (Riserva 62); Barbaresco 26 mo (Riserva 50)." },
      { name: "Barbera", kind: "red", notes: "Tart cherry, blackberry, dried herbs. Medium body, low tannin, high acid." },
      { name: "Dolcetto", kind: "red", notes: "'Little sweet one' - plum, blackberry, cocoa." },
      { name: "Cortese (Gavi)", kind: "white", notes: "Apple, honeydew, seashell. Light and dry." },
      { name: "Arneis (Roero)", kind: "white", notes: "Stone fruit, white flowers, hazelnut." },
      { name: "Moscato d'Asti", kind: "sparkling", notes: "Meyer lemon, orange blossom, honeysuckle. Off-dry frizzante." },
    ],
    wineMatch: ["piedmont","barolo","barbaresco","barbera","nebbiolo","dolcetto","gavi","roero","langhe","alba","asti","moscato","la morra","castiglione falletto","monforte","serralunga","novello","neive","nieve","treiso","san rocco seno","grignolino","derthona"],
  },
  {
    id: "valle-daosta", name: "Valle d'Aosta", country: "Italy", classRef: 1, zone: "North",
    x: 19, y: 22,
    summary: "Tiny Alpine region with indigenous varieties and high-altitude character. Pinot Grigio is called Malvoisie here.",
    wineNotes: "Pinot Grigio is called Malvoisie here. Petit Rouge: medium body, floral. Fumin: dark, savory. Local Nebbiolo and Moscato expressions also appear.",
    history: "Tiny Alpine region with deep indigenous tradition. Wines have always reflected high-altitude, mountainous terroir.",
    grapes: [
      { name: "Petit Rouge", kind: "red", notes: "Medium-bodied, floral." },
      { name: "Fumin", kind: "red", notes: "Dark, savory." },
    ],
    wineMatch: ["valle d'aosta","aosta"],
  },
  {
    id: "lombardy", name: "Lombardy", country: "Italy", classRef: 1, zone: "North",
    x: 33, y: 26,
    summary: "Includes Valtellina (Nebbiolo as 'Chiavennasca'), Franciacorta ('Italy's Champagne' - Metodo Classico), and Oltrepo Pavese.",
    wineNotes: "VALTELLINA: Nebbiolo is called Chiavennasca — lighter, more elegant than Barolo. Sub-zones: Inferno, Sassella, Grumello (plus Maroggia, Valgella). Valtellina Superiore aged min 2 yrs (1 in oak). Sforzato di Valtellina = passito Nebbiolo, rare and powerful.\nFRANCIACORTA ('Italy's Champagne', metodo classico): Chardonnay, Pinot Blanc, Pinot Nero, Erbamat. Tiers: Reserve (vintage, 67 mo min) · Millesimato (vintage, 37 mo) · Satèn (Chard + Pinot Blanc, MV or vintage) · Rosé/Franciacorta MV.\nOLTREPÒ PAVESE: Pinot Nero, Barbera, Croatina, Bonarda, Chardonnay, Pinot Grigio/Bianco, Riesling. Still and traditional-method sparkling.",
    history: "Italy's most populous and richest region, producing significant volume across many DOC/DOCG/IGT designations. Three key zones drive quality: Valtellina (Alpine Nebbiolo), Franciacorta (metodo classico sparkling), Oltrepò Pavese (still and traditional-method).",
    grapes: [
      { name: "Nebbiolo (Valtellina)", kind: "red", notes: "Lighter, elegant tannin. Sub-zones: Inferno, Sassella, Grumello." },
      { name: "Franciacorta", kind: "sparkling", notes: "Chardonnay, Pinot Blanc, Pinot Nero, Erbamat. Saten, Millesimato, Riserva." },
      { name: "Pinot Nero / Croatina", kind: "red", notes: "Oltrepo Pavese reds - still and traditional-method sparkling." },
    ],
    wineMatch: ["lombardy","franciacorta","valtellina","oltrepo","oltrepò","croatina"],
  },
  {
    id: "trentino-alto-adige", name: "Trentino-Alto Adige", country: "Italy", classRef: 1, zone: "North",
    x: 42, y: 22,
    summary: "Italian-Germanic influences along the Adige river. Mostly white grapes; Chardonnay and Pinot Grigio dominate.",
    wineNotes: "CHARDONNAY: lively acidity; pineapple, banana, vanilla when fermented in oak/aged on lees.\nPINOT GRIGIO — Trentino: light-bodied, lemon/apple. Alto Adige: medium body, ripe peach, nectarine, ginger.\nRiesling, Sauvignon Blanc, Gewürztraminer all perform very well.\nIndigenous reds: Lagrein, Schiava, Blauburgunder (Pinot Nero).",
    history: "Italo-Germanic crossroads along the Adige river and the Alps. In 2022 the region produced over 14.7 million cases, dominated by white varieties — Chardonnay (22%) and Pinot Grigio (19%).",
    grapes: [
      { name: "Pinot Grigio", kind: "white", notes: "Trentino: light, lemon/apple. Alto Adige: medium, peach, nectarine, ginger." },
      { name: "Chardonnay", kind: "white", notes: "Lively acid, pineapple, banana, vanilla when oaked on lees." },
      { name: "Lagrein / Blauburgunder", kind: "red", notes: "Indigenous Alpine reds." },
    ],
    wineMatch: ["alto adige","trentino","trento","sudtiroler","blauburgunder","lagrein"],
  },
  {
    id: "friuli", name: "Friuli-Venezia Giulia", country: "Italy", classRef: 1, zone: "North",
    x: 52, y: 24,
    summary: "Northeast corner. Birthplace of modern single-vineyard whites (Schiopetto) and the orange wine movement (Gravner, Radikon). Over 60% DOC.",
    terroir: "Gravel, clay, sand.",
    wineNotes: "PINOT GRIGIO: fuller-bodied than neighbors — white peach, ripe pear, white flowers.\nFRIULANO (Sauvignonasse / Sauvignon Vert / Jakot): stone fruit, yellow apple, almond.\nRIBOLLA GIALLA: ancient grape — melon, citrus zest, chamomile. Foundation of the orange-wine movement.\nMERLOT: herbaceous, raspberry, black cherry, forest floor.\nREFOSCO: tangy, savory, wild berries, smoke, dried herbs.\nPIGNOLO: rare, high acid + high tannin, full-bodied — black fruit, leather, tobacco.\nSCHIOPPETTINO: 'crackling' berry — blackberry, black pepper, violets.",
    history: "Important stop on the Mediterranean spice route. Medieval travelers brought vines from Macedonia and Anatolia; pre-phylloxera the region had 350+ varietals. Pinot Grigio's modern fame grew in the 80s–90s. Mario Schiopetto pioneered single-vineyard whites; Gravner and Radikon led the orange-wine movement with extended skin contact. Over 60% of wines are DOC.",
    grapes: [
      { name: "Pinot Grigio", kind: "white", notes: "Fuller-bodied than neighbors, white peach, ripe pear." },
      { name: "Friulano", kind: "white", notes: "AKA Sauvignonasse - stone fruit, yellow apple, almond." },
      { name: "Ribolla Gialla", kind: "white", notes: "Melon, citrus zest, chamomile." },
      { name: "Refosco", kind: "red", notes: "Tangy, savory, wild berries, dried herbs." },
      { name: "Schioppettino", kind: "red", notes: "Medium body, blackberry, black pepper, violets." },
    ],
    wineMatch: ["friuli","venezia giulia","ribolla","friulano","refosco","schioppettino","pignolo","carso","terrano"],
  },
  {
    id: "veneto", name: "Veneto", country: "Italy", classRef: 1, zone: "North",
    x: 46, y: 28,
    summary: "Most productive region. Birthplace of the appassimento method. Home of Prosecco (Glera) and Amarone (Corvina/Rondinella/Molinara).",
    wineNotes: "PROSECCO: min 85% Glera + up to 15% PG/Chard/local. Charmat method; light, green apple, melon, honeysuckle. Quality pyramid:\n  1. Valdobbiadene Superiore di Cartizze DOCG\n  2. Prosecco Conegliano Valdobbiadene Superiore Rive DOCG\n  3. Colli Asolani DOCG\n  4. Prosecco Conegliano Valdobbiadene Superiore DOCG\n  5. Prosecco DOC\nAMARONE: Corvina (structure/body) + Rondinella (softness, herbs) + Molinara (brightness). Grapes air-dried for months → concentrated, high-abv wine. RIPASSO = 'baby Amarone' (secondary fermentation on Amarone skins). SOAVE = Garganega-based white from volcanic soils.",
    history: "Wine here traces to the 7th century with Etruscans and Romans, then thrived for over a millennium under the Republic of Venice (697 AD–19th c.) which exported across Europe. After the Republic fell and phylloxera arrived, education institutes like Conegliano (late 1800s) rebuilt the industry. Birthplace of the appassimento method (Roman origin).",
    grapes: [
      { name: "Prosecco", kind: "sparkling", notes: "Min 85% Glera, Charmat method. Light, green apple, melon, honeysuckle." },
      { name: "Amarone", kind: "red", notes: "Corvina + Rondinella + Molinara, dried before fermentation. Rich, high abv. Ripasso = 'baby Amarone'." },
    ],
    wineMatch: ["veneto","valdobbiadene","prosecco","amarone","valpolicella","ripasso","soave","garganega","corvina"],
  },

  // ---------- Class 2 - Central Italy ----------
  {
    id: "liguria", name: "Liguria", country: "Italy", classRef: 2, zone: "Central",
    x: 28, y: 38,
    summary: "Coastal terraces ('heroic viticulture' in Cinque Terre). Saline, mineral-driven wines from steep, rocky slopes.",
    wineNotes: "VERMENTINO: medium body, distinct salty/briny finish, lime, green apple, Mediterranean herbs, almond.\nROSSESE di Dolceacqua: light–medium, often compared to Pinot Noir/Gamay — strawberry, cherry, violets, smoky spice.\nSCIACCHETRÀ: rare passito dessert wine (Bosco, Albarola, Vermentino) — dried stone fruit, honey, herbs.",
    history: "Ancient — Greeks and Etruscans. Famous for 'heroic viticulture' on steep terraces, especially in Cinque Terre. Trade flourished under the Genoese Republic (11–15th c.), which boosted Vermentino from Colli di Luni (east) and Riviera Ligure di Ponente (west). Today co-ops like Cantina Cinque Terre keep the legacy alive on shrinking vineyard area.",
    grapes: [
      { name: "Vermentino", kind: "white", notes: "Medium body, salty/briny finish, lime, Mediterranean herbs, almond." },
      { name: "Rossese (Dolceacqua)", kind: "red", notes: "Light-medium, strawberry, violets, smoky spice. Compared to Pinot Noir/Gamay." },
      { name: "Sciacchetra", kind: "dessert", notes: "Rare passito - Bosco, Albarola, Vermentino. Dried stone fruit, honey." },
    ],
    wineMatch: ["liguria","cinque terre","rossese","dolceacqua","sciacchetra"],
  },
  {
    id: "emilia-romagna", name: "Emilia-Romagna", country: "Italy", classRef: 2, zone: "Central",
    x: 40, y: 34,
    summary: "Po Valley. Famous for sparkling Lambrusco (Sorbara = finest; Grasparossa = fullest). Albana was Italy's first white DOCG.",
    wineNotes: "Lambrusco methods (in order of prevalence): Charmat (steel tank) → Metodo Ancestrale (Pet-Nat) → Metodo Classico (Champagne method).\nLAMBRUSCO SORBARA: lightest and most aromatic, pale ruby to deep pink — bright acid, red fruits, florals. Considered the finest.\nLAMBRUSCO GRASPAROSSA: deep ruby, fuller-bodied frizzante with dark fruit and more tannin.\nSangiovese excels in Brisighella and Modigliana. Ortrugo comes from Colli Piacentini.",
    history: "Roots in the Po Valley with Villanovian-era cultivation (2nd millennium BCE). Romans cultivated *vitis labrusca*, the Lambrusco ancestor. Monasteries preserved varieties through the Middle Ages; phylloxera devastated the region in the 1800s. Modern producers have shifted from bulk to terroir-driven, native-grape wines. Albana di Romagna was Italy's first white DOCG.",
    grapes: [
      { name: "Lambrusco Sorbara", kind: "sparkling", notes: "Light frizzante, red fruits and florals. Pale ruby to pink." },
      { name: "Lambrusco Grasparossa", kind: "sparkling", notes: "Deep ruby, dark fruit, more tannin." },
    ],
    wineMatch: ["emilia-romagna","emilia romagna","lambrusco","albana"],
  },
  {
    id: "tuscany", name: "Tuscany", country: "Italy", classRef: 2, zone: "Central",
    x: 38, y: 44,
    summary: "Sangiovese heartland. Chianti Classico (Gallo Nero), Brunello di Montalcino (1888, Biondi-Santi), and the 1970s Super Tuscan rebellion (Sassicaia).",
    wineNotes: "CHIANTI (all ≥80% Sangiovese):\n  · Chianti DOCG: released after 6–9 mo\n  · Chianti Classico DOCG (Gallo Nero): Annata 12 mo min · Riserva 24 mo (3 in bottle) · Gran Selezione 30 mo (estate's best fruit)\nBRUNELLO DI MONTALCINO (100% Sangiovese Grosso — 'little brown one'). First modern vintage: Biondi-Santi 1888. DOCG 1980.\n  · Normale: 4 yrs total (2 in oak, 4 mo in bottle)\n  · Riserva: 5 yrs total (2 in oak, 6 mo in bottle)\nSUPER TUSCANS: Cab Sauv / Merlot ± Sangiovese, French barrique. Sassicaia (Bolgheri) set the template; Burton Anderson coined the term.",
    history: "3,000+ years of winemaking — Etruscans → Romans → medieval monasteries → the Medici. Grand Duke Cosimo III demarcated the Chianti zone in 1716. Baron Bettino Ricasoli defined the Sangiovese-based 'Ricasoli Formula' in the 1870s. Post-WWII bulk production damaged quality; the 1924 Consortium and 1932 decree created Chianti Classico (Gallo Nero, the Black Rooster). The 1970s Super Tuscan rebellion broke DOC rules — Sassicaia's 1985 vintage earned Robert Parker's first 100-point score, leading to IGT recognition and the 1994 Bolgheri DOC update permitting international varieties.\n\nLegend of the Black Rooster: 13th-c. Florence and Siena settled a border dispute by sending two knights at the rooster's crow. Florence chose a black rooster, starved it in the dark — it crowed early, the knight rode out first, and Florence won the entire Chianti zone.",
    grapes: [
      { name: "Chianti / Chianti Classico", kind: "red", notes: "Min 80% Sangiovese. Annata 12mo / Riserva 24mo / Gran Selezione 30mo." },
      { name: "Brunello di Montalcino", kind: "red", notes: "100% Sangiovese Grosso. Normale 4 yrs (2 oak); Riserva 5 yrs (2 oak)." },
      { name: "Super Tuscan / Bolgheri", kind: "red", notes: "International varieties (Cab Sauv, Merlot) +/- Sangiovese. IGT-born, now Bolgheri DOC." },
    ],
    wineMatch: ["tuscany","chianti","brunello","rosso di montalcino","vino nobile","sangiovese","bolgheri","super tuscan","rufina","cortona","montosoli","podernovi","santa caterina"],
  },
  {
    id: "lazio", name: "Lazio", country: "Italy", classRef: 2, zone: "Central",
    x: 42, y: 56,
    summary: "'Home of Rome.' Volcanic tufa soils. Frascati (Trebbiano/Malvasia) and Cesanese del Piglio DOCG.",
    wineNotes: "Volcanic tufa/lava soils inland; clay/calcareous near the coast — all moderated by Tyrrhenian breezes.\nFRASCATI: Trebbiano + Malvasia, crisp and fragrant. Superiore and Riserva tiers offer richer profiles. Zesty lemon, jasmine, almond.\nCESANESE DEL PIGLIO DOCG is the top tier; Cesanese di Affile DOC is another high-quality area. Medium body, soft tannin, plush acid — red cherry, plum, cinnamon, rose petal.",
    history: "'Home of Rome.' Etruscan origins around Orvieto; central to the Roman Empire. Declined post-Rome, revived by monasteries and Renaissance Roman villas, suffered phylloxera, then drifted into bulk production before a modern quality push around native grapes (Malvasia, Trebbiano, Cesanese) earned new DOC/DOCG recognition.",
    grapes: [
      { name: "Frascati", kind: "white", notes: "Trebbiano + Malvasia. Crisp, lemon, jasmine, almond." },
      { name: "Cesanese", kind: "red", notes: "Medium body, plush acid, red cherry, plum, cinnamon, rose petal." },
    ],
    wineMatch: ["lazio","frascati","cesanese"],
  },
  {
    id: "molise", name: "Molise", country: "Italy", classRef: 2, zone: "Central",
    x: 48, y: 56,
    summary: "Small region split from Abruzzo in 1963. Tintilia is the indigenous flagship red.",
    wineNotes: "TINTILIA (flagship indigenous red): full body, ruby to dark purple — intense black cherry, plum, blackberry with Mediterranean herbs, spice, soft tannin.\nBOMBINO BIANCO: light–medium, green apple, citrus, white peach, white flowers, subtle minerality, tangy finish.\nOther grapes: Montepulciano, Aglianico, Sangiovese (reds); Trebbiano, Falanghina, Malvasia, Chardonnay (whites).",
    history: "Wine traces to ~500 BC (Samnite, Etruscan, Roman). Documented by Pliny the Elder. Part of Abruzzo until 1963. Phylloxera and WWII devastated production; revival began in the 1950s with a shift from inner hills to coastal vineyards. Own DOCs (Biferno, Molise, Pentro di Isernia) arrived from the 1980s.",
    grapes: [
      { name: "Tintilia", kind: "red", notes: "Full-bodied, ruby-purple, black cherry, plum, Med herbs, spice." },
      { name: "Bombino Bianco", kind: "white", notes: "Light-medium, green apple, citrus, white peach, minerality." },
    ],
    wineMatch: ["molise","tintilia","bombino"],
  },
  {
    id: "abruzzo", name: "Abruzzo", country: "Italy", classRef: 2, zone: "Central",
    x: 48, y: 50,
    summary: "Mountain-meets-sea terroir. Marl, clay, limestone. Major grapes: Trebbiano, Pecorino, Montepulciano.",
    wineNotes: "TREBBIANO d'Abruzzo: medium body, saline/mineral core — apple, white peach, lemon, white flowers, herbs, sometimes smoky-honeyed.\nPECORINO (from 'pecora' = sheep, who loved the grapes): light to full body depending on oak/steel — tropical fruit (banana, guava, pineapple), white pepper, sage, thyme.\nMONTEPULCIANO d'Abruzzo: full body, soft velvety tannin, tangy acid — ripe black fruit, violets, herbs, spice.",
    history: "Ancient — ~6th c. BC Italic tribes and Etruscans, then Romans, then monastic preservation. Feudal lords expanded estates in the Middle Ages; wines reached Papal courts during the Renaissance. Phylloxera nearly wiped out vineyards in the 1800s; the region bounced back, adopted DOC, and in recent decades has shifted decisively from quantity to quality (especially Montepulciano).",
    grapes: [
      { name: "Trebbiano d'Abruzzo", kind: "white", notes: "Medium body, saline, mineral, apple, white peach, honey." },
      { name: "Pecorino", kind: "white", notes: "Crisp, tropical fruit, white pepper, sage, thyme." },
      { name: "Montepulciano", kind: "red", notes: "Full body, soft velvety tannin, ripe black fruit, violets, spice." },
    ],
    wineMatch: ["abruzzo","pecorino","trebbiano","montepulciano"],
  },
  {
    id: "le-marche", name: "Le Marche", country: "Italy", classRef: 2, zone: "Central",
    x: 47, y: 42,
    summary: "Adriatic coast. 15 DOCs and 5 DOCGs. Diverse terroir from Apennines to Adriatic. Key zones: Castelli di Jesi & Matelica (Verdicchio), Conero (Montepulciano), Colli Piceni (Pecorino).",
    wineNotes: "Key zones: Castelli di Jesi & Matelica (Verdicchio) · Conero (Montepulciano) · Colli Piceni (Pecorino) · Colli Pesaresi (indigenous mix).\nVERDICCHIO di Castelli di Jesi: crisp, aromatic — vibrant acidity, green apple, citrus, bitter almond finish.\nVERDICCHIO di Matelica: sharper, more linear profile.",
    history: "Adriatic coast between Abruzzo and Emilia-Romagna. Influenced by Etruscans, Romans, Lombards; preserved by medieval monks; devastated by phylloxera; modernized through the 20th c. Now 15 DOCs and 5 DOCGs covering diverse Apennine-to-Adriatic terroir.",
    grapes: [
      { name: "Verdicchio (Jesi)", kind: "white", notes: "Crisp, vibrant acidity, green apple, citrus, bitter almond finish." },
      { name: "Verdicchio (Matelica)", kind: "white", notes: "Sharper, more linear profile." },
    ],
    wineMatch: ["le marche","marche","verdicchio","castelli di jesi","matelica"],
  },
  {
    id: "umbria", name: "Umbria", country: "Italy", classRef: 2, zone: "Central",
    x: 42, y: 47,
    summary: "'Green Heart of Italy.' Etruscan origins around Orvieto. Sagrantino di Montefalco is the flagship - 'thunderingly' high tannin. Aging: DOCG 37 mo total (12 in oak, 4 in bottle).",
    wineNotes: "GRECHETTO: full body, medium acid, rich palate; soft/creamy when oaked, fresher in steel — orchard, citrus and tropical fruits with hazelnut/almond, honey, caramel.\nSAGRANTINO di Montefalco: full body, powerful, 'thunderingly' high tannin, moderate acid — blackberry, plum, cinnamon, licorice, savory earthy tobacco.\nAging — DOCG Secco: 37 mo total (12 in oak, 4 in bottle). Passito: 37 mo total (4 in bottle, no mandatory oak).",
    history: "'Green Heart of Italy.' 2,000+ years of viticulture starting with Etruscans around Orvieto, known for innovative techniques and exports to Rome. Franciscan and Benedictine monks advanced winemaking through the Middle Ages. Post-WWII pioneers Giorgio Lungarotti (Torgiano Riserva) and Arnaldo Caprai (Sagrantino di Montefalco) elevated Umbrian wines to international acclaim.",
    grapes: [
      { name: "Grechetto", kind: "white", notes: "Full body, medium acid, orchard/citrus/tropical fruit, hazelnut, honey." },
      { name: "Sagrantino", kind: "red", notes: "Full body, powerful, very high tannin, blackberry, plum, cinnamon, licorice, tobacco." },
    ],
    wineMatch: ["umbria","sagrantino","montefalco","grechetto","orvieto"],
  },

  // ---------- Class 3 - Southern Italy & Islands ----------
  {
    id: "campania", name: "Campania", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 50, y: 64,
    summary: "Gulf of Naples, Vesuvius, Pompeii. Romans called it 'Campania Felix' (Happy Land). Aglianico (Taurasi DOCG) is the 'Barolo of the South.' Volcanic soils.",
    wineNotes: "AGLIANICO (Taurasi DOCG = 'Barolo of the South'): full body, firm structure, high acid + tannin, late ripening — dark fruit, leather, smoke, tobacco.\nGRECO DI TUFO: full body, rich texture, high acid, almond/mineral finish — green apple, citrus. Grown on volcanic tuff.\nFIANO DI AVELLINO: light–medium with lively acid, waxy texture — Asian pear, pine, white flowers; ages to toasty, nutty, spicy.\nFALANGHINA — two varieties: Beneventana (Campania, more structured/floral) and Flegrea (lighter, more mineral, from Campi Flegrei 'Fire Fields' near Naples). Flinty mineral, saline, zesty — tropical fruit, honey, white flowers.\nAlso: Piedirosso.",
    history: "Influenced by the Gulf of Naples, Mount Vesuvius, Pompeii, Herculaneum, the Phlegraean Fields. Greek colonization brought vines in the 7–8th c. BC; the Romans called the region 'Campania Felix' ('Happy Land') for its fertile soils, climate, and landscapes. Greco di Tufo was first referenced by Pliny the Elder under the name 'Aminea Gemina.'",
    grapes: [
      { name: "Aglianico (Taurasi)", kind: "red", notes: "Full body, firm structure, high tannin and acid. Dark fruit, leather, smoke, tobacco." },
      { name: "Greco di Tufo", kind: "white", notes: "Full body, rich, mineral, almond finish. Green apple, citrus. Volcanic tuff soil." },
      { name: "Fiano di Avellino", kind: "white", notes: "Medium body, waxy, Asian pear, pine, white flowers. Ages well." },
      { name: "Falanghina", kind: "white", notes: "Light-medium, flinty mineral, saline, tropical fruit, honey, white flowers." },
    ],
    wineMatch: ["campania","aglianico","taurasi","greco","fiano","falanghina","piedirosso"],
  },
  {
    id: "puglia", name: "Puglia", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 58, y: 64,
    summary: "'The heel.' Once 'Europe's cellar' (bulk wine); now quality-focused on indigenous Primitivo and Negroamaro. Iron-rich Terra Rossa over limestone.",
    wineNotes: "Iron-rich Terra Rossa over limestone-rich calcareous clay; Adriatic/Ionian breezes; flat to gently rolling.\nPRIMITIVO (= Zinfandel): bold, full body, intense dark fruit (black cherry, blackberry), high abv, spicy oak (cinnamon, black pepper), velvety tannin. Primitivo from Salento shows more freshness and savory spice.\nNEGROAMARO: full body, dark fruit, tobacco, licorice, earthy-herbal, slightly bitter savory finish.",
    history: "'The heel.' Greek settlers arrived ~7th c. BC. Through medieval monasteries and the late 20th c. it was 'Europe's cellar' — high-yield bulk wine shipped north to bolster other regions. Since the late 20th c. a quality revolution has refocused on indigenous Primitivo and Negroamaro, managed yields, and estate-grown wines.",
    grapes: [
      { name: "Primitivo (Zinfandel)", kind: "red", notes: "Bold, full body, intense dark fruit, high abv, spicy oak, velvety tannin." },
      { name: "Negroamaro", kind: "red", notes: "Full body, dark fruit, tobacco, licorice, earthy-herbal, slightly bitter savory finish." },
    ],
    wineMatch: ["puglia","primitivo","negroamaro"],
  },
  {
    id: "basilicata", name: "Basilicata", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 56, y: 68,
    summary: "Mountainous (92%). Volcanic Mount Vulture is home of Aglianico del Vulture DOC (1971) - more powerful and structured than Campania's Aglianico.",
    wineNotes: "92% mountainous terrain, mineral-rich volcanic tuff soil, Mediterranean climate with Adriatic/Ionian sea breezes.\nAGLIANICO DEL VULTURE: more powerful and structured than Campania's Aglianico — distinct mineral character, savory and ethereal tones.\nAlso produces Greco and Falanghina whites.",
    history: "Greeks and Phoenicians introduced viticulture and Aglianico around the 8th c. BC, cultivated on Mount Vulture's volcanic soil. Monastic orders and nobility preserved winemaking through the Middle Ages; Aragonese and Spanish rule followed. Phylloxera hit in the 1900s; post-1960s investment revived the region. Aglianico del Vulture DOC was granted in 1971.",
    grapes: [
      { name: "Aglianico del Vulture", kind: "red", notes: "Powerful, structured, distinct mineral character, savory ethereal tones." },
    ],
    wineMatch: ["basilicata","vulture"],
  },
  {
    id: "calabria", name: "Calabria", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 55, y: 76,
    summary: "Ancient Greeks called it 'Enotria' (Land of Wine). Reviving with Gaglioppo and Greco Bianco, especially around Ciro.",
    wineNotes: "GAGLIOPPO: structured medium body, ruby — lively acid, firm velvety tannin — cherry, violet, spice. Often compared to Rioja.\nGRECO BIANCO: aromatic, mineral. Dry style: citrus, floral. Sweet (passito) style: orange blossom, honey.",
    history: "Ancient Greeks called this land 'Enotria' (Land of Wine), ~8th c. BC. Wines were famously served at the Olympics. Flourished through Roman, Byzantine, and medieval periods; suffered from phylloxera, the World Wars, and emigration; spent decades on bulk wine. Currently in revival, focused on native Gaglioppo, Magliocco, and Greco around Cirò.",
    grapes: [
      { name: "Gaglioppo", kind: "red", notes: "Structured medium body, ruby, lively acid, firm velvety tannin. Cherry, violet, spice. Compared to Rioja." },
      { name: "Greco Bianco", kind: "white", notes: "Aromatic, mineral. Dry: citrus, floral. Sweet (passito): orange blossom, honey." },
    ],
    wineMatch: ["calabria","gaglioppo","ciro"],
  },
  {
    id: "sardinia", name: "Sardinia", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 25, y: 64,
    summary: "Long Spanish rule explains Spanish-origin grapes: Cannonau (Garnacha), Bovale Sardo (Graciano), Bovale Grande (Mazuelo). Gallura granite; phylloxera-free Sulcis sand.",
    wineNotes: "Highly varied soils: granite (Gallura), clay, limestone, and phylloxera-free sand (Sulcis). Mistral and Sirocco winds.\nVERMENTINO (Gallura): dry, crisp — intense mineral, saline, citrus, white peach, herbs, bitter almond finish.\nCANNONAU (Grenache/Garnacha): full body, fruity/spicy, velvety tannin, high abv — red berries, plum, herbs. Rich in polyphenols/anthocyanins, part of the 'blue zone' diet.\nCARIGNANO: thrives on Sulcis sandy soils.",
    history: "Winemaking from the Nuragic Era (1500 BC); Phoenicians, Romans, Carthaginians, Byzantines and Spanish all ruled. Long Spanish rule explains the indigenous grapes of Spanish origin: Bovale Sardo (Graciano), Bovale Grande (Mazuelo), Cannonau (Garnacha). Phylloxera devastated the region in the late 1800s; co-ops dominated through the 20th c.",
    grapes: [
      { name: "Vermentino (Gallura)", kind: "white", notes: "Dry, crisp, intense minerality, saline, citrus, white peach, herbs, bitter almond finish." },
      { name: "Cannonau (Grenache)", kind: "red", notes: "Full body, fruity/spicy, velvety tannin, high abv. Red berries, plum, herbs. 'Blue zone' wine." },
      { name: "Carignano", kind: "red", notes: "Sulcis sandy soils." },
    ],
    wineMatch: ["sardinia","vermentino","cannonau","carignano"],
  },
  {
    id: "sicily", name: "Sicily", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 44, y: 94,
    summary: "Oldest, most important Italian winemaking region (4000 BC). Mount Etna's volcanic soils, high-altitude expressions, single-vineyard Contrada system. Marsala fortified tradition.",
    wineNotes: "Volcanic ash (Mount Etna), varied altitudes, Mediterranean climate with sea breezes and big diurnals.\nNERELLO MASCALESE: pale, high acid — cherry, wild strawberry, spice, florals. Etna's dominant grape.\nNERELLO CAPPUCCIO: dark-skinned blending partner — color, berries, herbs.\nNERO d'AVOLA: Sicily's signature — full body, inky, bold black fruit, licorice, spice, tobacco. High tannin, medium+ acid. 'Cabernet meets Syrah.'\nFRAPPATO: light, almost rosé-like; low tannin, medium acid — raspberry, strawberry, fresh flowers, spice. Serve slightly chilled.\nCARRICANTE (Etna Bianco, sometimes blended with Catarratto): flinty mineral, high acid, saline — green apple, citrus, citrus blossom. Ages to honey, peach, petrol.\nKey appellations: Etna DOC, Cerasuolo di Vittoria DOCG, Marsala DOC, Pantelleria, Malvasia delle Lipari, Faro, Noto, Eloro.",
    history: "Oldest and most important Italian winemaking region — back to 4000 BC. Phoenicians and Greeks brought advanced techniques; Romans turned Sicily into Europe's bulk-wine supplier (especially after phylloxera). In the late 1700s British merchant John Woodhouse popularized Marsala, the fortified wine. A modern renaissance since the 1980s, led by COS and Planeta, has refocused on quality, indigenous grapes and terroir. Andrea Franchetti launched the international discovery of Etna and introduced the single-vineyard Contrada / Contrade system.",
    grapes: [
      { name: "Nerello Mascalese", kind: "red", notes: "Pale color, high acid, cherry, wild strawberry, spice, florals. Etna's dominant grape." },
      { name: "Nerello Cappuccio", kind: "red", notes: "Dark-skinned, adds color, berries, herbs. Blending partner." },
      { name: "Nero d'Avola", kind: "red", notes: "Full body, inky, black fruit, licorice, spice, tobacco. 'Cabernet meets Syrah.'" },
      { name: "Frappato", kind: "rose", notes: "Light, almost rose-like, low tannin, raspberry, strawberry, fresh flowers." },
      { name: "Carricante (Etna Bianco)", kind: "white", notes: "Flinty mineral, high acid, saline, green apple, citrus, citrus blossom. Ages to honey, peach, petrol." },
    ],
    wineMatch: ["sicily","etna","nerello","nero d'avola","frappato","carricante","grillo","cerasuolo di vittoria","zibbibo","albanella"],
  },

  // ---------- Class 4 - France: Bordeaux ----------
  {
    id: "medoc", name: "Medoc / Haut-Medoc", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 60,
    summary: "Left Bank. Gravel soils ideal for Cabernet Sauvignon. Drained by Dutch merchants in the 17th c. Home of the 1855 Classification (Napoleon III).",
    terroir: "Gravel. Maritime climate moderated by the Gulf Stream and Gironde Estuary.",
    wineNotes: "Maritime climate, Gulf Stream, Atlantic, Garonne + Dordogne forming the Gironde Estuary (dividing Left and Right Banks). Gravel soils ideal for Cabernet.\nLeft Bank red blend: ~70% Cab Sauv / 30% Merlot + Cab Franc + Petit Verdot, aged in new French oak.\nWhite Bordeaux Blanc: ~80% Sauvignon Blanc / 20% Sémillon. Unoaked = crisp green apple/citrus; oaked = lemon butter, ginger, toasted nuts.\nSauternes blend: ~80% Sémillon / 20% Sauv Blanc + Muscadelle (botrytis-affected).\nAOC/AOP tiers: Vin de France (20%) → IGP/Vin de Pays (30%) → AOC/AOP (50%, strictest).",
    history: "Bordeaux's history stretches to 300 BC (Celtic Biturigi Vivisci). Romans planted vineyards ~43 AD; Pliny the Elder documented them by 71 AD. Eleanor of Aquitaine's 1152 marriage to Henry Plantagenet II brought Bordeaux under English rule and opened the wine trade to England. The marshy Médoc was drained by 17th-c. Dutch merchants, making it suitable for viticulture. Napoleon III's 1855 Classification ranked top châteaux into five tiers (Mouton is the only mover, promoted to First Growth in 1973). Port of the Moon UNESCO-listed in 2007.",
    grapes: [
      { name: "Cabernet Sauvignon blend", kind: "red", notes: "70% Cab Sauv / 30% Merlot + Cab Franc + Petit Verdot. Aged in new French oak. Cassis, blackberry, cedar, pencil shavings, tobacco." },
    ],
    wineMatch: ["medoc","médoc","haut medoc","haut-medoc","left bank"],
  },
  {
    id: "pauillac", name: "Pauillac", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 56,
    summary: "Three of the five First Growths (Lafite, Latour, Mouton). Powerful, structured, age-worthy.",
    wineNotes: "Profile: powerful, structured, age-worthy Cabernet Sauvignon — cassis, cedar, pencil shavings, tobacco.\nKey châteaux: Lafite-Rothschild, Latour, Mouton-Rothschild (1st); Pichon Baron, Pichon Lalande (2nd); Grand Puy Lacoste, Lynch Bages, Pontet Canet, Batailley, d'Armailhac, Clerc Milon (5th).",
    history: "Heart of the 1855 Classification. Three of the five First Growths: Lafite-Rothschild, Latour, Mouton-Rothschild (promoted 1973).",
    grapes: [
      { name: "Cabernet Sauvignon (Pauillac)", kind: "red", notes: "Powerful, structured, age-worthy. Cassis, cedar." },
    ],
    wineMatch: ["pauillac","lafite","latour","mouton","pichon","lynch","grand puy","pontet canet","batailley"],
  },
  {
    id: "saint-julien", name: "Saint-Julien", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 58,
    summary: "Balanced, silky, refined. No First Growths but a stable of acclaimed Second Growths (Leoville Las-Cases, Ducru-Beaucaillou).",
    wineNotes: "Profile: balanced, silky, refined Cabernet Sauvignon.\nKey châteaux: Léoville Las-Cases, Léoville Poyferré, Léoville Barton, Ducru-Beaucaillou, Gruaud Larose (2nd); Lagrange, Langoa Barton (3rd); Saint-Pierre, Talbot, Branaire-Ducru, Beychevelle (4th).",
    history: "No First Growths, but the most consistently classified commune — a deep bench of acclaimed Second Growths.",
    grapes: [{ name: "Cabernet Sauvignon (Saint-Julien)", kind: "red", notes: "Balanced, silky, refined." }],
    wineMatch: ["saint julien","saint-julien","st julien","st-julien","leoville","ducru","beychevelle","gruaud","talbot"],
  },
  {
    id: "margaux", name: "Margaux", country: "France", classRef: 4, zone: "Left Bank",
    x: 27, y: 62,
    summary: "Elegant, perfumed, floral. Chateau Margaux (First Growth), Palmer, Rauzan-Segla.",
    wineNotes: "Profile: elegant, perfumed, floral Cabernet Sauvignon.\nKey châteaux: Margaux (1st); Rauzan-Ségla, Rauzan-Gassies, Durfort-Vivens, Lascombes, Brane-Cantenac (2nd); Kirwan, d'Issan, Giscours, Malescot St. Exupéry, Boyd-Cantenac, Cantenac-Brown, Palmer, Desmirail, Ferrière, Marquis d'Alesme Becker (3rd).",
    history: "Largest Left Bank commune in area. Château Margaux is one of the five First Growths.",
    grapes: [{ name: "Cabernet Sauvignon (Margaux)", kind: "red", notes: "Elegant, perfume, floral." }],
    wineMatch: ["margaux","palmer","rauzan","brane cantenac","d'issan","giscours","kirwan"],
  },
  {
    id: "saint-estephe", name: "Saint-Estephe", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 54,
    summary: "Northernmost commune. Robust, tannic. Cos d'Estournel, Montrose, Calon Segur.",
    wineNotes: "Profile: robust, tannic, structured Cabernet Sauvignon.\nKey châteaux: Cos d'Estournel, Montrose (2nd); Calon Ségur (3rd); Lafon-Rochet (4th); Cos Labory (5th); plus highly regarded Meyney (no growth status).",
    history: "Northernmost commune of the Médoc — cooler, more clay-influenced than its neighbors.",
    grapes: [{ name: "Cabernet Sauvignon (Saint-Estephe)", kind: "red", notes: "Robust, tannic." }],
    wineMatch: ["saint estephe","saint-estephe","st estephe","st-estephe","cos d'estournel","montrose","calon segur"],
  },
  {
    id: "pessac-leognan", name: "Pessac-Leognan (Graves)", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 66,
    summary: "South of Medoc. Gravel + limestone + sand. Both reds and whites. Haut-Brion was included in 1855 by exception.",
    wineNotes: "Profile (red): earthy, smoky, complex.\nProfile (white): Sauv Blanc + Sémillon, often oak-aged for prestige cuvées.\nKey châteaux: Haut-Brion (1st 1855); La Mission Haut-Brion, Smith Haut Lafitte, Domaine de Chevalier, Les Carmes Haut-Brion (no growth status).",
    history: "South of the Médoc in Graves. Château Haut-Brion's reputation was so established that it was included by exception in the 1855 Classification despite sitting outside the Médoc.",
    grapes: [
      { name: "Cabernet / Merlot (Graves)", kind: "red", notes: "Earthy, smoky, complex." },
      { name: "Sauvignon Blanc / Semillon (Bordeaux Blanc)", kind: "white", notes: "80% SB / 20% Semillon. Unoaked: crisp, green apple, citrus. Oaked: lemon butter, ginger, toasted nuts." },
    ],
    wineMatch: ["pessac","leognan","léognan","graves","haut-brion","haut brion","smith haut lafitte","domaine de chevalier"],
  },
  {
    id: "sauternes", name: "Sauternes", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 70,
    summary: "World-renowned dessert wine made from botrytized (noble rot) grapes.",
    wineNotes: "Blend: ~80% Sémillon / 20% Sauvignon Blanc + a small percentage of Muscadelle.\nProfile: intense, luscious sweetness balanced by high acidity — honey, apricot, peach, marmalade.\nKey châteaux: d'Yquem, Climens, Suduiraut, Rieussec, Guiraud, Doisy-Daëne.",
    history: "World-renowned dessert wine appellation, made from botrytis-affected ('noble rot') grapes. Aged in new French oak.",
    grapes: [
      { name: "Sauternes blend", kind: "dessert", notes: "80% Semillon / 20% Sauvignon Blanc + Muscadelle. Honey, apricot, peach, marmalade. Aged in new French oak." },
    ],
    wineMatch: ["sauternes","yquem","climens","suduiraut","rieussec","guiraud","doisy"],
  },
  {
    id: "saint-emilion", name: "Saint-Emilion", country: "France", classRef: 4, zone: "Right Bank",
    x: 33, y: 60,
    summary: "Right Bank. Gravel, limestone, sand. Merlot-led. 2022 Grand Cru Classe A: Figeac, Pavie.",
    wineNotes: "Soils: gravel, limestone, sand. Red blend ~70% Merlot / 30% Cabernet Franc, new French oak.\nProfile: elegant, complex, balanced — ripe red berries, black cherry, chocolate, earth, herbs.\nNotable producers: Figeac, Pavie, Cheval Blanc, Ausone, Angélus, Canon, Troplong Mondot.",
    history: "Right Bank. Saint-Émilion's own classification began in 1955 and is revised every ~10 years. 2012 Grand Cru Classé A: Cheval Blanc, Angélus, Pavie, Ausone. 2022 Grand Cru Classé A: only Figeac and Pavie (after Cheval Blanc, Angélus and Ausone withdrew).",
    grapes: [
      { name: "Merlot blend (Saint-Emilion)", kind: "red", notes: "70% Merlot / 30% Cab Franc. Elegant, complex, balanced. Ripe red berries, black cherry, chocolate, earth, herbs." },
    ],
    wineMatch: ["saint emilion","saint-emilion","st emilion","st-emilion","figeac","pavie","cheval blanc","ausone","angelus","canon","troplong"],
  },
  {
    id: "pomerol", name: "Pomerol", country: "France", classRef: 4, zone: "Right Bank",
    x: 33, y: 58,
    summary: "Right Bank. Iron-pan soil under sand and clay. No classification system. Petrus, Le Pin, Lafleur.",
    wineNotes: "Soil: iron pan ('crasse de fer') under sand and clay. Red blend ~70% Merlot / 30% Cab Franc.\nProfile: rich, opulent, structured — plush velvety tannin.\nNotable producers: Pétrus, Le Pin, Lafleur, La Conseillante, L'Église-Clinet, Vieux Château Certan, Clinet, Trotanoy.",
    history: "Right Bank. No classification system. Tiny appellation with cult-status châteaux.",
    grapes: [
      { name: "Merlot blend (Pomerol)", kind: "red", notes: "Rich, opulent, structured. Plush velvety tannin." },
    ],
    wineMatch: ["pomerol","petrus","le pin","lafleur","la conseillante","l'eglise","vieux chateau certan","clinet","trotanoy"],
  },
  {
    id: "entre-deux-mers", name: "Entre-Deux-Mers", country: "France", classRef: 4, zone: "Bordeaux",
    x: 31, y: 64,
    summary: "Between the two rivers. Sub-regional appellation for dry whites - primarily Sauvignon Blanc.",
    wineNotes: "Blend: ~80% Sauvignon Blanc / 20% Sémillon, generally unoaked.\nProfile: crisp, green apple, lemon-lime, melon, fresh grass.",
    history: "'Between two seas' — the land between the Garonne and Dordogne. Sub-regional appellation primarily for dry whites.",
    grapes: [
      { name: "Sauvignon Blanc / Semillon", kind: "white", notes: "Crisp, green apple, lemon-lime, melon, grass." },
    ],
    wineMatch: ["entre-deux-mers","entre deux mers"],
  },

  // ---------- Class 5 - Burgundy ----------
  {
    id: "chablis", name: "Chablis", country: "France", classRef: 5, zone: "Burgundy",
    x: 56, y: 32,
    summary: "Northernmost Burgundy. Kimmeridgian limestone (Jurassic marine fossils). Mostly stainless steel - high acid, saline minerality, citrus fruit. Seven Grand Cru climats under one umbrella.",
    wineNotes: "100% Chardonnay, mostly stainless steel (most other Burgundy Chardonnay sees oak).\nProfile: very high acidity, saline minerality, citrus, wet stone, green apple, lemon zest.\nHierarchy: Petit Chablis · Chablis · Chablis Premier Cru · Chablis Grand Cru (umbrella for 7 climats — Les Clos, Vaudésir, Valmur, Grenouilles, Blanchot, Bougros, Preuses).",
    history: "Northernmost Burgundy, ~46–47° latitude (similar to Willamette Valley). Built on Kimmeridgian limestone laid down in Jurassic seas — fossilized oyster shells are still visible in the vineyards. Cool-continental climate makes vintage variation dramatic.",
    grapes: [
      { name: "Chardonnay (Chablis)", kind: "white", notes: "Very high acidity, saline minerality, citrus fruit. Wet stone, green apple, lemon zest." },
    ],
    wineMatch: ["chablis"],
  },
  {
    id: "cote-de-nuits", name: "Cote de Nuits", country: "France", classRef: 5, zone: "Burgundy",
    x: 60, y: 40,
    summary: "Northern Cote d'Or. Red Burgundy heartland. Gevrey-Chambertin, Chambolle-Musigny, Vosne-Romanee, Nuits-Saint-Georges, Flagey-Echezeaux. Home of Romanee-Conti.",
    wineNotes: "Soils: limestone, marl, moderate clay — ideal for Pinot Noir. Many Grand Crus on mid-slope scree.\nVillage signatures:\n  · Gevrey-Chambertin — darker fruit, firmer tannin, structure\n  · Chambolle-Musigny — floral, elegant, silky\n  · Vosne-Romanée — exotic spice, richness, layered texture\n  · Nuits-Saint-Georges — earthy, structured, savory\nGrand Crus include: Chambertin, Chambertin-Clos de Bèze, Charmes-/Mazis-/Latricières-/Griotte-/Ruchottes-/Chapelle-/Mazoyères-Chambertin, Bonnes Mares, Clos de la Roche, Clos de Tart, Clos des Lambrays, Clos Saint-Denis, Musigny, Clos de Vougeot, Échezeaux, Grands Échezeaux, La Grande Rue, La Romanée, La Tâche, Richebourg, Romanée-Conti, Romanée-Saint-Vivant.\nMonopoles: Romanée-Conti, La Tâche, Clos de Tart, Clos des Lambrays.\nBenchmark producers (red): DRC, Leroy, Armand Rousseau, Georges Roumier, Jacques-Frédéric Mugnier, Dujac, Méo-Camuzet, Fourrier, Jean Grivot, Arnoux-Lachaux, Henri Jayer, Comte Georges de Vogüé.\n\nDRC (Domaine de la Romanée-Conti): origins at the Abbey of Saint-Vivant (13th c.); bought by Louis-François de Bourbon in 1760. Romanée-Conti vineyard = 4.5 acres, mid-slope, thin limestone-rich marl over fractured bedrock, east/southeast facing, vines 40–80+ yrs, biodynamic since the early 2000s, ~25 hl/ha, 100% new French oak, 5,000–6,000 bottles/yr. Aromatics: rose petals, Asian spice, red cherry, blood orange, sandalwood, black tea.",
    history: "Northern Côte d'Or — birthplace of monastic terroir thinking. Cistercians at the Abbey of Cîteaux (founded 1098) catalogued soils and microclimates and built the first walled clos (Clos de Vougeot, 12th c.). In 1395 Philip the Bold banned Gamay in the Côte d'Or, cementing Pinot Noir as the noble red. After the 1789 French Revolution and Napoleonic inheritance law, vineyards splintered — Clos de Vougeot's ~50 ha now has 80+ owners.",
    grapes: [
      { name: "Pinot Noir (Gevrey-Chambertin)", kind: "red", notes: "Darker fruit, firmer tannins, more structure." },
      { name: "Pinot Noir (Chambolle-Musigny)", kind: "red", notes: "Floral, elegant, silky." },
      { name: "Pinot Noir (Vosne-Romanee)", kind: "red", notes: "Exotic spice, richness, layered texture." },
      { name: "Pinot Noir (Nuits-Saint-Georges)", kind: "red", notes: "Earthy, structured, savory." },
    ],
    wineMatch: ["cote de nuits","côte de nuits","gevrey","chambolle","vosne","nuits","morey","flagey","echezeaux","romanee","romanée"],
  },
  {
    id: "cote-de-beaune", name: "Cote de Beaune", country: "France", classRef: 5, zone: "Burgundy",
    x: 60, y: 44,
    summary: "Southern Cote d'Or. White Burgundy heartland (Meursault, Puligny-Montrachet, Chassagne-Montrachet, Corton-Charlemagne) plus great reds (Volnay, Pommard).",
    wineNotes: "Soils: limestone-rich, ideal for Chardonnay; mid-slope marl for Grand Crus.\nVillage signatures:\n  · Meursault — richer texture, nutty aromas, broad palate\n  · Puligny-Montrachet — laser acidity, intense minerality, floral\n  · Chassagne-Montrachet — saline, wet stone, flint\n  · Volnay — elegant, perfumed, silky red\n  · Pommard — structured, muscular red on clay-rich soil\nGrand Cru whites: Montrachet, Chevalier-Montrachet, Bâtard-Montrachet, Bienvenues-Bâtard-Montrachet, Criots-Bâtard-Montrachet, Corton-Charlemagne, Charlemagne. Grand Cru red: Corton.\nBenchmark producers (white): Domaine Leflaive, Coche-Dury, Ramonet, Roulot, Comtes Lafon, Sauzet, Pierre-Yves Colin-Morey, Arnaud Ente, Bonneau du Martray.\nVinification (white): hand harvest, whole-cluster press, barrel ferment + malo, sur lie, bâtonnage, native yeasts.",
    history: "Southern Côte d'Or — white Burgundy heartland with great reds (Volnay, Pommard). Like the rest of Burgundy, fragmented after the 1789 Revolution and Napoleonic inheritance law.",
    grapes: [
      { name: "Chardonnay (Meursault)", kind: "white", notes: "Richer texture, nutty aromas, broad palate." },
      { name: "Pinot Noir (Volnay)", kind: "red", notes: "Elegant, perfumed, silky Premier Crus." },
      { name: "Grand Cru whites", kind: "white", notes: "Montrachet, Corton-Charlemagne. Aged in oak; long-lived." },
    ],
    wineMatch: ["cote de beaune","côte de beaune","beaune","meursault","puligny","chassagne","montrachet","corton","volnay","pommard"],
  },
  {
    id: "cote-chalonnaise", name: "Cote Chalonnaise", country: "France", classRef: 5, zone: "Burgundy",
    x: 60, y: 50,
    summary: "South of the Cote d'Or. Approachable Pinot Noir and Chardonnay; Bouzeron is the only village AOC for Aligote.",
    wineNotes: "Approachable Pinot Noir and Chardonnay at gentler prices.\nKey villages: Mercurey, Rully, Givry, Montagny, Bouzeron.\nALIGOTÉ (Bouzeron): Burgundy's second white grape — high acidity, light–medium body, low–moderate alcohol; lime zest, white peach, green apple, white flowers. Historically used in the Kir cocktail; Domaine de Villaine helped revitalize its reputation.",
    history: "Just south of the Côte d'Or — historically a value alternative to its more famous neighbor. Bouzeron is the only Burgundy village-level appellation dedicated to Aligoté.",
    grapes: [
      { name: "Aligote (Bouzeron)", kind: "white", notes: "Crisp, citrus-driven." },
    ],
    wineMatch: ["chalonnaise","bouzeron","mercurey","rully","givry","montagny"],
  },
  {
    id: "maconnais", name: "Maconnais", country: "France", classRef: 5, zone: "Burgundy",
    x: 60, y: 56,
    summary: "Southern Burgundy. Approachable Chardonnay - Pouilly-Fuisse is the standard-bearer.",
    wineNotes: "Chardonnay-dominated, riper and rounder than the Côte d'Or.\nKey appellations: Pouilly-Fuissé, Saint-Véran, Mâcon-Villages, Viré-Clessé.",
    history: "Southern Burgundy — warmer and more approachable. Pouilly-Fuissé is the standard-bearer.",
    grapes: [
      { name: "Chardonnay (Maconnais)", kind: "white", notes: "Riper, rounder Chardonnay. Pouilly-Fuisse, Saint-Veran, Macon-Villages." },
    ],
    wineMatch: ["macon","mâcon","pouilly-fuisse","pouilly-fuissé","saint-veran","saint-véran","maconnais"],
  },
  {
    id: "beaujolais", name: "Beaujolais", country: "France", classRef: 5, zone: "Burgundy",
    x: 60, y: 62,
    summary: "Granite soils. Gamay (banished from the Cote d'Or by Philip the Bold in 1395). Ten Crus from Saint-Amour to Cote de Brouilly.",
    wineNotes: "Granite soils. Carbonic maceration is the defining technique — whole-cluster fermentation in a CO₂-rich environment producing very low tannin, juicy fruit (banana, bubblegum), soft texture.\nThe 10 Crus (north → south):\n  1. Saint-Amour — floral, red berry, delicate\n  2. Juliénas — richer fruit, spice, more structure\n  3. Chénas — structured, earthy, firm tannin\n  4. Moulin-à-Vent — firmer tannin, darker fruit, long aging potential\n  5. Fleurie — floral, silky, red fruit\n  6. Chiroubles — lighter body, vibrant acidity, bright red fruit\n  7. Morgon — dark cherry, plum, earthy minerality\n  8. Régnié — fruit-driven, approachable, lively\n  9. Brouilly — fruit-forward, soft, approachable\n  10. Côte de Brouilly — mineral-driven, deeper fruit, complex",
    history: "Gamay was banished from the Côte d'Or by Philip the Bold's 1395 decree calling it 'a very bad and disloyal plant.' It thrived to the south on granite soils. The 20th c. brought global fame through Beaujolais Nouveau — released annually on the 3rd Thursday of November. A 1980s–90s renaissance refocused producers on terroir-driven Cru bottlings.",
    grapes: [
      { name: "Gamay (Beaujolais Cru)", kind: "red", notes: "Floral to structured depending on cru. Morgon = dark cherry/plum; Moulin-a-Vent = firm tannin, age-worthy." },
    ],
    wineMatch: ["beaujolais","gamay","morgon","fleurie","moulin-a-vent","brouilly","julienas","saint-amour","chenas","chiroubles","regnie"],
  },
];
