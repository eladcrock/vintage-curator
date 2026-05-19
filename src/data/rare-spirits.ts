/**
 * Rare & Limited spirits pour list, shown below the cocktail menu on /bar.
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
        note: "Dusty bottle from the legendary Canelli house, pulled from a private European cellar. Half a century of slow in-glass oxidation has rounded the gentian and bitter orange into a leathered, sun-baked Americano profile that no modern bottling can replicate. Pairs especially well over a single rock or as the bitter spine of a vintage Negroni.",
      },
      {
        id: "amaro-diesus-70s",
        name: "1970's Amaro DieSus",
        oneOz: 45,
        twoOz: 90,
        note: "A long discontinued monastic amaro from the Veneto. Production ended decades ago and the recipe has never been revived. Heavy on bitter root, gentian, and a resinous myrrh note that today's amari simply do not carry. Bottles only surface through Italian estate sales.",
      },
      {
        id: "punt-e-mes-70s",
        name: "1970's Punt e Mes",
        oneOz: 45,
        twoOz: 90,
        note: "Carpano's classic in its original 1970's Italian formulation, before the 1990's reformulation softened the bitter side. The name (one point of sweet, one half of bitter) drinks here like a vermouth and an amaro fused together. Decades of bottle age have layered figgy, almost Madeira-like depth on top.",
      },
      {
        id: "ramazzotti-70s",
        name: "1970's Rabarbaro Ramazzotti",
        oneOz: 45,
        twoOz: 90,
        note: "Built on Chinese rhubarb root smoked over local woods, from a time when Ramazzotti's smokehouse ran hotter and the recipe leaned far more bitter and tarry than today's Rabarbaro Zucca lineage. Long out of production at this strength and depth. Tastes like cherry skin, lapsang tea, and old leather.",
      },
      {
        id: "china-martini-60s",
        name: "1960's Martini & Rossi China Martini",
        oneOz: 55,
        twoOz: 110,
        note: "A discontinued cinchona bark (china) liqueur from Martini & Rossi's storied Pessione cellars outside Turin, produced before the house quietly retired its bitter line. Sixty plus years in glass have rounded the quinine bite into something honeyed, almost medicinal in the most elegant sense. Effectively unobtainable today outside private collections; a true once in a career pour.",
      },
      {
        id: "martini-rosso-60s",
        name: "1960's Martini & Rossi Rosso",
        oneOz: 55,
        twoOz: 110,
        note: "The original Rosso recipe, sourced from old stock European cellars and never refrigerated through its lifetime. Vermouth surviving in drinkable shape after sixty years is vanishingly rare; the wormwood, rhubarb, and bitter orange have softened into a single integrated voice that drinks closer to an aged tawny than to a modern vermouth. Best neat in a chilled coupe to honor the bottle.",
      },
      {
        id: "chartreuse-mof-yellow-2023",
        name: "2023 Chartreuse, MOF Yellow",
        oneOz: 20,
        twoOz: 40,
        note: "A special Yellow cuvée first created in 2008 by the Chartreux Fathers in close collaboration with the Meilleurs Ouvriers de France Sommeliers. Sold only through MOF channels; bottles outside France are essentially a relationship pour.",
      },
      {
        id: "chartreuse-vep-green-2024",
        name: "2024 Chartreuse, VEP Green",
        oneOz: 30,
        twoOz: 60,
        note: "Vieillissement Exceptionnellement Prolongé, first produced in 1963, is the Carthusian monks' extended cellar aged Green Chartreuse at 54% ABV, built from the same 130 plant recipe but rested for years in oak before bottling. Strict monk imposed allocation; current US allotment is a fraction of demand.",
      },
      {
        id: "chartreuse-vep-yellow-2024",
        name: "2024 Chartreuse, VEP Yellow",
        oneOz: 25,
        twoOz: 50,
        note: "The mellower VEP cousin at 42% ABV in a reproduction of the original 1840 bottle, same 130 plant maceration, extended oak aging softens the saffron and honey core. Same monk imposed allocation cap as the VEP Green.",
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
        note: "The original XO. Maurice Hennessy literally created the category in 1870 as a private blend for his inner circle, before it was ever released commercially. A blend of up to 100 eaux de vie from the four premier Cognac crus, aged in tight grain Limousin oak.",
      },
      {
        id: "hennessy-paradis",
        name: "Hennessy Paradis",
        oneOz: 90,
        twoOz: 180,
        note: "Created by Master Blender Maurice Fillioux in 1979 as a tribute to his love of music, Paradis is a harmony of around 100 of the rarest eaux de vie selected from the Hennessy Founder's Cellar, with components aged from roughly 25 up to 130 years. Tasting flight territory: copper colored, silky, voluptuous, with a finish that runs for minutes. Bottled in a sculpted crystal decanter and treated, inside the house, as one of Maurice Fillioux's defining works.",
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
        note: "Each year, Black Forest Distillers under Christoph Keller seeks out a different rare botanical (a species rara) and adds it to the signature 47 botanical recipe to create a single vintage Distiller's Cut. Each release is its own gin, never repeated.",
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
        note: "A joint venture launched late 2023 between the Beckmann Gonzalez family (of the Jose Cuervo lineage) and French winemaker Jean Charles Boisset of Napa. Additive free, estate highland agave, slow roasted in brick ovens. The ceramic decanter is built as a collector's piece in its own right.",
      },
      {
        id: "obsidiana-reposado",
        name: "Casa Obsidiana Reposado",
        oneOz: 25,
        twoOz: 50,
        note: "Same Beckmann Gonzalez and Boisset family juice as the Blanco, rested in ex Napa chardonnay barrels from the Boisset wine portfolio. Almost no other tequila is finished this way, and the soft custardy wine influence is the spine of our Sunstone cocktail.",
      },
      {
        id: "obsidiana-anejo",
        name: "Casa Obsidiana Añejo",
        oneOz: 38,
        twoOz: 76,
        note: "Extended ex chardonnay barrel aging on top of the Reposado formula pushes the profile into custard, baked apple, and cacao territory. Allocated in dozens of cases, not hundreds, since the entire brand launched in late 2023.",
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
        note: "Part of Macallan's 1824 Masters Series. Lead Whisky Maker Sarah Burgess hand selects from a tiny fraction of the distillery's inventory, drawing only on first fill sherry seasoned Spanish oak casks (the rarest cask type Macallan uses, since each one is hand built and seasoned for years in Jerez before ever seeing whisky). The result is the house's signature dried fruit, clove, chocolate, and Christmas cake profile turned all the way up. No age statement, because the blend is built to a flavor target, not a number.",
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
        note: "The 2024 release in Bardstown Bourbon Company's Collaborative Series, finished in cabernet barrels straight from Napa's Silver Oak Cellars (who have aged their wine exclusively in American oak for over fifty years). A blend of six different straight bourbons aged 17 months in those wine barrels. A bottling we have a soft spot for given Bottega's own Napa roots.",
      },
      {
        id: "bardstown-discovery-9",
        name: "Bardstown Discovery Series #9",
        oneOz: 20,
        twoOz: 40,
        note: "Single batch blend of Tennessee and Kentucky bourbons up to roughly 16 years old. Each Discovery release is a one time blend; when the batch is gone, that exact whiskey is gone for good.",
      },
      {
        id: "heaven-hill-90",
        name: "Heaven Hill 90th Anniversary Bourbon",
        oneOz: 18,
        twoOz: 36,
        note: "One time bottling commemorating Heaven Hill's 90th anniversary as one of the largest family owned American distilleries. Blend of 8 to 10 year old bourbons at 96 proof. Single allocation, never repeated.",
      },
      {
        id: "high-west-midwinter",
        name: "High West 'A Midwinter Night's Dram'",
        oneOz: 20,
        twoOz: 40,
        note: "High West's annual winter rye release, a blend of straight ryes finished in French oak port and sauternes casks at 98.6 proof. Each year is numbered as a new 'Act' and 'Scene' (we are now into the double digits), and each release sells through almost immediately on allocation. Brandied cherry, fig jam, baking spice.",
      },
      {
        id: "old-fitz-11",
        name: "Old Fitzgerald 11yr Bourbon",
        oneOz: 28,
        twoOz: 56,
        note: "Heaven Hill's Old Fitzgerald Bottled in Bond Decanter Series, a twice yearly (Spring and Fall) wheated bourbon release that started in 2018, presented in a heavy reproduction of the classic 1950's Old Fitz diamond decanter. Bottled in Bond means the whiskey is the product of one distillery, one distillation season, aged at least four years, and bottled at exactly 100 proof. The 11 year old at 50% ABV is one of the longer aged releases in the series and consistently disappears at retail within days.",
      },
      {
        id: "whistlepig-15",
        name: "WhistlePig 15yr Rye",
        oneOz: 32,
        twoOz: 64,
        note: "Estate Oak Rye is one of WhistlePig's oldest expressions: 100% rye mash aged 15 years, then finished in custom barrels coopered from oak sustainably harvested on WhistlePig's own 500 acre Vermont farm. Wine Enthusiast 97 points. The farm grown oak finish is the signature of the bottling, and the trees themselves have more rings than the whiskey has years.",
      },
      {
        id: "whistlepig-boss-hog-12",
        name: "WhistlePig Boss Hog XII 'Feather & Flame'",
        oneOz: 75,
        twoOz: 150,
        note: "The twelfth annual chapter in WhistlePig's Boss Hog series, widely regarded as the most collectible North American whiskey release of the year. Feather & Flame is a single barrel, barrel strength rye inspired by the sacred ceremonial drinks of Mesoamerica, and is finished in casks that previously held pulque (the ancient wild fermented agave drink) and sotol, a world first cask treatment for any whiskey. Allocations run to a handful of bottles per state; SRP is around $600, secondary market is well north of that. Treat the pour with respect.",
      },
      {
        id: "whistlepig-25-badonkadonk",
        name: "WhistlePig 25yr Single Malt 'Badonkadonk'",
        oneOz: 250,
        twoOz: 500,
        note: "The Badönkådonk is WhistlePig's oldest whiskey ever released, a single barrel North American single malt aged a full 25 years and then finished in Silver Oak Cabernet Sauvignon barrels from Napa, the same Silver Oak relationship that powers our Bardstown Collaborative bourbon. WhistlePig themselves describe it as 'matured more than twice as long as any other on the continent,' the crowning glory of their super aged single malt collection. Single barrel means yields are tiny; combined with the 25 year age statement, secondary market pricing runs into the low five figures per bottle. This is a pour to plate carefully, walk to the guest yourself, and talk through every sip. Genuinely a once in a career bottle for most servers.",
      },
    ],
  },
];