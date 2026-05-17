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
