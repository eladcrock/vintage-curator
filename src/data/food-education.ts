/**
 * Food sourcing & purveyor knowledge - powers /education/food and its quiz.
 *
 * Each entry is one "card" in the food atlas: a purveyor, an ingredient
 * provenance story, or a chef signature/technique with cultural significance.
 * Cross-reference with src/data/food.ts - menu items that feature each source
 * are listed in `dishes`.
 */

export type FoodEduCategory =
  | "Purveyor"
  | "Provenance"
  | "Heritage Grain"
  | "Chef Signature";

export type FoodEduEntry = {
  id: string;
  title: string;
  category: FoodEduCategory;
  /** One-line tagline shown under the title before expand. */
  tagline: string;
  /** Body paragraphs. Render with paragraph breaks. */
  body: string[];
  /** Menu items that feature this source. */
  dishes: string[];
  /** Search/keyword tags. */
  tags: string[];
};

export const FOOD_EDUCATION: FoodEduEntry[] = [
  {
    id: "senku-wagyu",
    title: "Senku Australian Wagyu",
    category: "Purveyor",
    tagline: "Our wagyu purveyor — Chef Chiarello is a Senku program ambassador.",
    body: [
      "Senku is a full-blood Australian Wagyu program raised on family-owned pasture stations. Cattle are slow-finished on a long-grain ration that builds the dense, evenly distributed marbling you see when we cut the tomahawk tableside.",
      "Chef Chiarello is a recognized ambassador for the Senku program — meaning Bottega is one of a small number of restaurants chosen to represent the brand. The 42 oz Senku Tomahawk on our menu is sourced directly through that relationship; ground trim from the program goes into our Wagyu Polpette (short-rib meatballs).",
      "When guests ask 'why wagyu here and not Japanese A5?' — the answer is the steak format. A5 is best as a small seared portion; Senku full-blood wagyu has the structure to be grilled at tomahawk size and shared, which is the experience we're after.",
    ],
    dishes: ["Wagyu Tomahawk alla Griglia (42oz)", "Wagyu Polpette"],
    tags: ["wagyu", "beef", "australia", "tomahawk", "ambassador", "senku"],
  },
  {
    id: "creekstone-farms",
    title: "Creekstone Farms",
    category: "Purveyor",
    tagline: "Open-choice Black Angus — Chef Chiarello signature since Tra Vigne.",
    body: [
      "Creekstone Farms is a Kansas-based program known for tightly graded, hormone-free Black Angus. They run their own processing facility, which lets them maintain the consistency Chef relies on for the short rib braise and bone-in ribeye.",
      "The short-rib braise has been on Chef Chiarello's menus since his Tra Vigne days — Bottega's version is a direct continuation of that signature. The bone-in ribeye on the menu is also a Creekstone cut.",
      "When we butcher the rack, the meat from the shorter rib bones is ground for our burger mix — nothing from the Creekstone program is wasted.",
    ],
    dishes: ["Short Rib Braise", "Bone-in Ribeye", "Bottega Burger"],
    tags: ["beef", "black angus", "creekstone", "kansas", "short rib", "tra vigne"],
  },
  {
    id: "anson-mills",
    title: "Anson Mills Heirloom Grains",
    category: "Heritage Grain",
    tagline: "Pre-industrial corn & grain from North Carolina, special-ordered.",
    body: [
      "Anson Mills, in Columbia, South Carolina, was founded by Glenn Roberts to recover pre-industrial Southern grain varieties — heirloom corn, rice, and wheat that were nearly extinct. They cold-mill in small batches to preserve aromatics that commercial milling destroys.",
      "Our polenta and the corn for our creamed corn / corn-based sides are special-ordered from Anson Mills — unmodified, unpreserved. Chef Chiarello verified the preparation method personally with the mill, because heirloom corn behaves nothing like commodity polenta and needs longer hydration and a gentler cook.",
      "If a guest asks why our polenta tastes 'sweeter and more like corn' than anywhere else — this is why.",
    ],
    dishes: ["Polenta dishes", "Creamed Corn"],
    tags: ["polenta", "corn", "heirloom", "anson mills", "grain", "north carolina"],
  },
  {
    id: "gragnano-pasta",
    title: "Gragnano Pasta (Sophia Loren)",
    category: "Provenance",
    tagline: "Imported from Sophia Loren's hometown — Pasta IGP status.",
    body: [
      "Gragnano, just outside Naples, is the historic capital of Italian dry pasta. Its pasta carries IGP (Indicazione Geografica Protetta) status — it must be made there, from durum semolina, extruded through bronze dies, and air-dried slowly in the town's distinctive microclimate. The bronze extrusion is what gives the rough surface that grips sauce.",
      "Our Sophia Loren–named pasta dish was created by Chef Chiarello for Sophia Loren's 80th birthday. The pasta itself is imported from Gragnano, her hometown — the personal connection is the entire reason for the dish.",
      "When you drop the plate, the story is the dish. Lead with the birthday gift, then the Gragnano provenance.",
    ],
    dishes: ["Pasta dedicated to Sophia Loren"],
    tags: ["pasta", "gragnano", "naples", "sophia loren", "igp", "import"],
  },
  {
    id: "gioia-burrata",
    title: "Gioia Burrata",
    category: "Purveyor",
    tagline: "Third-generation cheesemakers — Puglian tradition, made in California.",
    body: [
      "Burrata was invented in Andria, Puglia, in the early 1900s — fresh mozzarella stretched into a pouch and filled with stracciatella (mozzarella shreds and cream). Because it's at its peak for only a couple of days, importing true Puglian burrata is essentially impossible.",
      "Gioia is a Southern California cheese maker, now third generation, whose family came from Gioia del Colle in Puglia — the same zone as Andria. They make our burrata fresh on a schedule that lines up with our service, so what we plate is days old at most.",
      "Always pair with a seasonal accompaniment; the cheese is the constant, the fruit/vegetable around it changes with the season.",
    ],
    dishes: ["Burrata with seasonal accompaniment"],
    tags: ["cheese", "burrata", "puglia", "gioia", "california", "fresh"],
  },
  {
    id: "ovello-salumeria",
    title: "Ovello Salumeria",
    category: "Purveyor",
    tagline: "Sonoma salumeria — our cheese & salumi board.",
    body: [
      "Our cheese-and-salumi selection comes from Ovello Salumeria in Sonoma. Working with a local salumeria (instead of national distribution) lets us rotate the selection with what's curing well at any given time, and lets us serve charcuterie that hasn't been pre-sliced and vacuum-packed.",
      "Plated with seasonal fruits, A.Q. — the fruit changes constantly, so confirm the day's accompaniment with the kitchen before describing the plate.",
    ],
    dishes: ["Cheese & Salumi Board"],
    tags: ["salumi", "charcuterie", "cheese", "ovello", "sonoma", "local"],
  },
  {
    id: "marcona-almonds",
    title: "Marcona Almonds",
    category: "Provenance",
    tagline: "The 'Queen of Almonds' — grown only in Spain.",
    body: [
      "Marcona is a Spanish almond varietal — short, round, sweeter, and softer than the California almond most Americans know. The trees are mostly grown in the Catalonia / Valencia regions; they're harvested by hand because the kernel is delicate.",
      "After harvest, Marconas are blanched, fried in oil, and dressed with sea salt — that's the form you'll see on our plates. They have a noticeably higher oil content than a California almond, which is why they taste richer.",
    ],
    dishes: ["Marcona Almonds (snack / antipasti)"],
    tags: ["almonds", "spain", "marcona", "catalonia"],
  },
  {
    id: "fontina-val-daosta",
    title: "Fontina Val d'Aosta DOP",
    category: "Provenance",
    tagline: "Semi-soft Alpine cow's milk cheese from Piedmont, aged 90 days.",
    body: [
      "Fontina Val d'Aosta carries DOP status — it can only be made in the Aosta Valley in northwest Italy, from raw milk of the local Valdostana cow breed, and aged a minimum of 80 days in mountain cellars. Ours is aged about 90 days.",
      "It's a semi-soft, washed-rind cheese with a nutty, slightly mushroomy character — built to melt. That's why it sits inside our burger: it brings the Alpine character without dominating the beef.",
    ],
    dishes: ["Bottega Burger"],
    tags: ["cheese", "fontina", "aosta", "alpine", "dop", "burger"],
  },
  {
    id: "anolini-uovo",
    title: "Uovo in Raviolo (Anolini)",
    category: "Chef Signature",
    tagline: "A single ravioli with a runny egg yolk — finished tableside.",
    body: [
      "Anolini is the singular form of ravioli — literally 'one ravioli'. Ours is a large potato-pasta pouch filled with ricotta, swiss chard, and a whole farm hen egg yolk, finished with sage browned butter, crispy sage, and black truffles.",
      "The presentation is the dish: cut it tableside like a pie so the yolk runs out into the brown butter. Describe the show when you drop the plate — guests need to know to cut into it immediately, before the yolk sets.",
      "Treat this as a single-bite course in pacing terms — it's rich, and the moment after the cut is the entire experience.",
    ],
    dishes: ["Uovo in Raviolo / Anolini"],
    tags: ["pasta", "ravioli", "egg yolk", "truffle", "tableside", "signature"],
  },
  {
    id: "polletto-mattone",
    title: "Pollo al Mattone alla Diavola",
    category: "Chef Signature",
    tagline: "Tuscan brick-cooked chicken — 'devil-style' heat.",
    body: [
      "'Mattone' literally means 'brick' — the technique presses the chicken under a hot tile or brick while it cooks, which gives even contact with the pan, crackling-crisp skin, and a much faster, more even cook than a standard roast.",
      "'Alla Diavola' refers to the heat — chili and pepper, the 'devil-style' finish. The two together are a classic Tuscan preparation; ours follows that lineage directly.",
    ],
    dishes: ["Pollo al Mattone alla Diavola"],
    tags: ["chicken", "tuscan", "mattone", "diavola", "technique"],
  },
  {
    id: "bolognese-veal-stock",
    title: "Bolognese — Veal Stock Forward",
    category: "Chef Signature",
    tagline: "More veal stock than tomato — atypical and intentional.",
    body: [
      "A traditional ragù alla bolognese is often described as 'tomato sauce with meat'. Ours runs the other way: more reduced veal stock than tomato. That's atypical and intentional — it gives the sauce a denser, glossier body and a meatier finish.",
      "Served on tagliarini ('hand-cut') — a Northern Italian egg pasta. If a guest is expecting a bright, tomato-forward Bolognese, set the expectation when you take the order.",
    ],
    dishes: ["Tagliarini Bolognese"],
    tags: ["bolognese", "veal stock", "tagliarini", "pasta", "northern italy"],
  },
  {
    id: "tra-vigne-lineage",
    title: "Tra Vigne Lineage",
    category: "Chef Signature",
    tagline: "Dishes carried forward from Chef Chiarello's Tra Vigne years.",
    body: [
      "Tra Vigne, the Napa Valley restaurant Chef Chiarello opened in 1987, is where many of Bottega's signature plates were originally developed. The Creekstone short rib braise, the polenta program with Anson Mills, and a number of the antipasti techniques all trace back to that kitchen.",
      "When guests ask 'is this a new dish or a Chiarello classic?' — the answer for the short rib, the polenta, and the burrata-with-fruit format is: classic. The sourcing has been refined; the idea is the same one Chef has been cooking for nearly forty years.",
    ],
    dishes: ["Short Rib Braise", "Polenta dishes", "Burrata"],
    tags: ["chiarello", "tra vigne", "napa", "history", "signature"],
  },
];

export const FOOD_EDU_CATEGORIES: FoodEduCategory[] = [
  "Purveyor",
  "Provenance",
  "Heritage Grain",
  "Chef Signature",
];