/**
 * Rare & Limited spirits pour list - shown below the cocktail menu on /bar.
 * Each item is priced per 1oz / 2oz pour and carries a note explaining what
 * makes the bottle exclusive, rare, or luxurious. Hand-edit freely.
 */

export type RarePour = {
  id: string;
  name: string;
  oneOz: number;
  twoOz: number;
  /** What makes it rare, special, or luxurious. */
  note: string;
};

export type RareCategory = {
  id: string;
  label: string;
  pours: RarePour[];
};

export const RARE_CATEGORIES: RareCategory[] = [
  {
    id: "amari",
    label: "Amari & Etc.",
    pours: [
      {
        id: "amaro-barbero-70s",
        name: "1970's Amaro Barbero Americano",
        oneOz: 45,
        twoOz: 90,
        note: "Dusty bottle from the legendary Canelli house, pulled from a private cellar. Decades of slow oxidation in glass give a leathered, sun-baked orange-peel character no modern Americano can replicate.",
      },
      {
        id: "amaro-diesus-70s",
        name: "1970's Amaro DieSus",
        oneOz: 45,
        twoOz: 90,
        note: "Discontinued monastic amaro - production ended decades ago. Heavy on bitter root and sweet myrrh; bottles only surface through estate sales.",
      },
      {
        id: "punt-e-mes-70s",
        name: "1970's Punt e Mes",
        oneOz: 45,
        twoOz: 90,
        note: "Carpano's classic in its original Italian formulation, before reformulation softened the bitter side. Drinks like a vermouth and an amaro fused together.",
      },
      {
        id: "ramazzotti-70s",
        name: "1970's Rabarbaro Ramazzotti",
        oneOz: 45,
        twoOz: 90,
        note: "Smoked Chinese rhubarb root liqueur from a time when Ramazzotti's smokehouse ran hotter. Long out of production at this strength and depth.",
      },
      {
        id: "china-martini-60s",
        name: "1960's Martini & Rossi China Martini",
        oneOz: 55,
        twoOz: 110,
        note: "A discontinued cinchona-bark liqueur from Martini's storied Pessione cellars. Sixty-plus years in glass have rounded its quinine bite into something honeyed and almost medicinal-elegant.",
      },
      {
        id: "martini-rosso-60s",
        name: "1960's Martini & Rossi Rosso",
        oneOz: 55,
        twoOz: 110,
        note: "The original Rosso recipe, sourced from old-stock European cellars. Vermouth aged this long is incredibly rare - the botanicals have softened into a single, integrated voice.",
      },
      {
        id: "chartreuse-mof-yellow-2023",
        name: "2023 Chartreuse, MOF Yellow",
        oneOz: 20,
        twoOz: 40,
        note: "Released only to Meilleurs Ouvriers de France - master craftsmen. A few bottles allocated to Bottega; not available at retail anywhere.",
      },
      {
        id: "chartreuse-vep-green-2024",
        name: "2024 Chartreuse, VEP Green",
        oneOz: 30,
        twoOz: 60,
        note: "Vieillissement Exceptionnellement Prolongé - the Carthusian monks' extended-aged Green Chartreuse. Strict global allocation; current US allotment is a fraction of demand.",
      },
      {
        id: "chartreuse-vep-yellow-2024",
        name: "2024 Chartreuse, VEP Yellow",
        oneOz: 25,
        twoOz: 50,
        note: "The mellower VEP cousin - extra cellar age softens the saffron-honey core. Same monk-imposed allocation cap as the Green.",
      },
    ],
  },
  {
    id: "cognac",
    label: "Cognac",
    pours: [
      {
        id: "hennessy-xo",
        name: "Hennessy XO",
        oneOz: 30,
        twoOz: 60,
        note: "The original XO - Maurice Hennessy created the category in 1870 for his personal circle. A blend of up to 100 eaux-de-vie aged in tight-grain Limousin oak.",
      },
      {
        id: "hennessy-paradis",
        name: "Hennessy Paradis",
        oneOz: 90,
        twoOz: 180,
        note: "Drawn from the house's Founder's Cellar, blending one hundred eaux-de-vie aged 25 to 130 years. Bottled in a Baccarat-style decanter.",
      },
    ],
  },
  {
    id: "gin",
    label: "Gin",
    pours: [
      {
        id: "monkey-47-distillers",
        name: "Monkey 47 Distiller's Select",
        oneOz: 20,
        twoOz: 40,
        note: "Black Forest gin built on 47 botanicals; the Distiller's Cut is an annual single-vintage release tweaked by the master distiller. Rarely poured by the ounce.",
      },
    ],
  },
  {
    id: "tequila",
    label: "Tequila",
    pours: [
      {
        id: "obsidiana-blanco",
        name: "Casa Obsidiana Blanco",
        oneOz: 22,
        twoOz: 44,
        note: "Tiny-production additive-free tequila from a Napa-Tequila partnership. Estate-grown highland agave, slow-roasted in brick ovens, tahona-crushed.",
      },
      {
        id: "obsidiana-reposado",
        name: "Casa Obsidiana Reposado",
        oneOz: 25,
        twoOz: 50,
        note: "Same juice as the Blanco, rested in ex-Napa chardonnay barrels. The wine influence is the spine of our Sunstone cocktail - one of the few tequilas finished this way.",
      },
      {
        id: "obsidiana-anejo",
        name: "Casa Obsidiana Añejo",
        oneOz: 38,
        twoOz: 76,
        note: "Extended ex-chardonnay barrel aging produces a custard-and-cacao profile. Allocated in dozens of cases, not hundreds.",
      },
    ],
  },
  {
    id: "scotch",
    label: "Scotch",
    pours: [
      {
        id: "macallan-rare-cask",
        name: "The Macallan Rare Cask",
        oneOz: 36,
        twoOz: 72,
        note: "Hand-picked from fewer than 1% of Macallan's casks - master whisky maker Sarah Burgess selects only first-fill sherry-seasoned Spanish oak. Dried fruit, clove, and chocolate.",
      },
    ],
  },
  {
    id: "whiskey",
    label: "Whiskey",
    pours: [
      {
        id: "bardstown-silver-oak",
        name: "Bardstown Silver Oak Collaborative Blend",
        oneOz: 24,
        twoOz: 48,
        note: "A blend finished in used Silver Oak cabernet barrels straight from the Napa winery. A bottling we have a soft spot for given the Napa-Bottega connection.",
      },
      {
        id: "bardstown-discovery-9",
        name: "Bardstown Discovery Series #9",
        oneOz: 20,
        twoOz: 40,
        note: "One-time blend of Tennessee and Kentucky bourbons up to 16 years old. Each Discovery release is a single batch - when it's gone, it's gone.",
      },
      {
        id: "heaven-hill-90",
        name: "Heaven Hill 90th Anniversary Bourbon",
        oneOz: 18,
        twoOz: 36,
        note: "Limited bottling commemorating Heaven Hill's 90th. Blend of 8 to 10 year bourbons at 96 proof; single allocation, no repeat.",
      },
      {
        id: "high-west-midwinter",
        name: "High West 'A Midwinter Night's Dram'",
        oneOz: 20,
        twoOz: 40,
        note: "Rye whiskey finished in French oak port and sauternes casks - released as a numbered 'Act / Scene' winter allocation each year.",
      },
      {
        id: "old-fitz-11",
        name: "Old Fitzgerald 11yr Bourbon",
        oneOz: 28,
        twoOz: 56,
        note: "Bottled-in-Bond, wheated bourbon from Heaven Hill's biannual decanter series. Released in spring/fall lots that sell out before they hit shelves.",
      },
      {
        id: "whistlepig-15",
        name: "WhistlePig 15yr Rye",
        oneOz: 32,
        twoOz: 64,
        note: "Estate-grown Vermont rye finished in toasted Vermont oak from the farm itself. The estate-rye program is among the longest-aged in the category.",
      },
      {
        id: "whistlepig-boss-hog-12",
        name: "WhistlePig Boss Hog XII 'Feather & Flame'",
        oneOz: 75,
        twoOz: 150,
        note: "The 12th annual Boss Hog: a single-barrel, cask-strength rye finished in armagnac and Spanish brandy casks. Allocations are a few bottles per state.",
      },
      {
        id: "whistlepig-25-badonkadonk",
        name: "WhistlePig 25yr Single Malt 'Badonkadonk'",
        oneOz: 250,
        twoOz: 500,
        note: "A 25-year single malt rye - a category of one. Vanishingly small bottling; getting an allocation at all is essentially a relationship pour.",
      },
    ],
  },
];