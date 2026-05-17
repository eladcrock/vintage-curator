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
    grapes: [
      { name: "Aglianico del Vulture", kind: "red", notes: "Powerful, structured, distinct mineral character, savory ethereal tones." },
    ],
    wineMatch: ["basilicata","vulture"],
  },
  {
    id: "calabria", name: "Calabria", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 55, y: 76,
    summary: "Ancient Greeks called it 'Enotria' (Land of Wine). Reviving with Gaglioppo and Greco Bianco, especially around Ciro.",
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
    grapes: [
      { name: "Vermentino (Gallura)", kind: "white", notes: "Dry, crisp, intense minerality, saline, citrus, white peach, herbs, bitter almond finish." },
      { name: "Cannonau (Grenache)", kind: "red", notes: "Full body, fruity/spicy, velvety tannin, high abv. Red berries, plum, herbs. 'Blue zone' wine." },
      { name: "Carignano", kind: "red", notes: "Sulcis sandy soils." },
    ],
    wineMatch: ["sardinia","vermentino","cannonau","carignano"],
  },
  {
    id: "sicily", name: "Sicily", country: "Italy", classRef: 3, zone: "South & Islands",
    x: 42, y: 88,
    summary: "Oldest, most important Italian winemaking region (4000 BC). Mount Etna's volcanic soils, high-altitude expressions, single-vineyard Contrada system. Marsala fortified tradition.",
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
    grapes: [
      { name: "Cabernet Sauvignon blend", kind: "red", notes: "70% Cab Sauv / 30% Merlot + Cab Franc + Petit Verdot. Aged in new French oak. Cassis, blackberry, cedar, pencil shavings, tobacco." },
    ],
    wineMatch: ["medoc","médoc","haut medoc","haut-medoc","left bank"],
  },
  {
    id: "pauillac", name: "Pauillac", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 56,
    summary: "Three of the five First Growths (Lafite, Latour, Mouton). Powerful, structured, age-worthy.",
    grapes: [
      { name: "Cabernet Sauvignon (Pauillac)", kind: "red", notes: "Powerful, structured, age-worthy. Cassis, cedar." },
    ],
    wineMatch: ["pauillac","lafite","latour","mouton","pichon","lynch","grand puy","pontet canet","batailley"],
  },
  {
    id: "saint-julien", name: "Saint-Julien", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 58,
    summary: "Balanced, silky, refined. No First Growths but a stable of acclaimed Second Growths (Leoville Las-Cases, Ducru-Beaucaillou).",
    grapes: [{ name: "Cabernet Sauvignon (Saint-Julien)", kind: "red", notes: "Balanced, silky, refined." }],
    wineMatch: ["saint julien","saint-julien","st julien","st-julien","leoville","ducru","beychevelle","gruaud","talbot"],
  },
  {
    id: "margaux", name: "Margaux", country: "France", classRef: 4, zone: "Left Bank",
    x: 27, y: 62,
    summary: "Elegant, perfumed, floral. Chateau Margaux (First Growth), Palmer, Rauzan-Segla.",
    grapes: [{ name: "Cabernet Sauvignon (Margaux)", kind: "red", notes: "Elegant, perfume, floral." }],
    wineMatch: ["margaux","palmer","rauzan","brane cantenac","d'issan","giscours","kirwan"],
  },
  {
    id: "saint-estephe", name: "Saint-Estephe", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 54,
    summary: "Northernmost commune. Robust, tannic. Cos d'Estournel, Montrose, Calon Segur.",
    grapes: [{ name: "Cabernet Sauvignon (Saint-Estephe)", kind: "red", notes: "Robust, tannic." }],
    wineMatch: ["saint estephe","saint-estephe","st estephe","st-estephe","cos d'estournel","montrose","calon segur"],
  },
  {
    id: "pessac-leognan", name: "Pessac-Leognan (Graves)", country: "France", classRef: 4, zone: "Left Bank",
    x: 28, y: 66,
    summary: "South of Medoc. Gravel + limestone + sand. Both reds and whites. Haut-Brion was included in 1855 by exception.",
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
    grapes: [
      { name: "Sauternes blend", kind: "dessert", notes: "80% Semillon / 20% Sauvignon Blanc + a touch of Muscadelle. Honey, ap
