/**
 * Producer-level glossary for the wine list. Renders as a hover blurb on the
 * producer name in WineCard. Detail scales with price tier:
 *   S ($2000+): 3-4 sentences — history, style, vineyard, cultural weight
 *   A ($1000-2000): 2-3 sentences
 *   B ($500-1000): 1-2 sentences
 *   C ($325/$400-500): one tight sentence
 *
 * Match is the exact producer string from wines.json.
 */

export type ProducerEntry = { match: string; blurb: string };

export const WINE_PRODUCERS: ProducerEntry[] = [
  // ───── Tier S: $2000+ ─────
  {
    match: "Domaine de la Romanee-Conti",
    blurb:
      "DRC. The single most coveted estate in the world, monopole owner of Romanée-Conti and La Tâche in Vosne-Romanée. Biodynamic, hand-tended Pinot Noir (and a sliver of Le Montrachet) from vines that sit on a few hectares of literally irreplaceable Burgundian limestone. Bottles are allocated, not sold — every release becomes a collectors' item.",
  },
  {
    match: "Château Petrus",
    blurb:
      "Pomerol's mythic estate — roughly 11.5 hectares of pure blue-clay terroir on the Right Bank, planted almost entirely to Merlot. No second wine, tiny production, hand-harvested in a single pass. Petrus is the benchmark for opulent, ironstone-laced Merlot and one of the few wines that consistently outprices First-Growth Bordeaux.",
  },
  {
    match: "Château Haut-Brion",
    blurb:
      "The only First-Growth from outside the Médoc — a Pessac-Léognan estate in the suburbs of Bordeaux, dating to 1525. Gravel-over-clay soils give a famously smoky, tobacco-and-graphite Cabernet/Merlot blend. Owned by the Dillon family (Domaine Clarence Dillon) since 1935.",
  },
  {
    match: "Screaming Eagle",
    blurb:
      "Oakville cult Cabernet — the original modern Napa unicorn. Tiny estate (originally just 57 acres, now under Stan Kroenke), produces around 500 cases of the flagship per vintage. Famous for a perfect 100 from Robert Parker in the 1990s; allocation is by mailing list with a years-long waitlist.",
  },
  {
    match: "Sine Qua Non",
    blurb:
      "Manfred Krankl's Ventura-based cult project — wildly inventive Rhône-variety blends (Syrah, Grenache, Roussanne) with a different name, label, and bottling each release. Allocation-only, biodynamic farming, hand-drawn artist labels. The American answer to small-grower Rhône bottlings.",
  },
  {
    match: "Harlan Estate",
    blurb:
      "Bill Harlan's flagship Oakville hillside Cabernet, debut 1990. Estate-grown, hand-sorted, ultra-low yields — every vine farmed for a single ideal cluster. The benchmark Napa first-growth analogue and the spine of the Harlan portfolio (Bond, Promontory).",
  },
  {
    match: "Silver Oak",
    blurb:
      "The Napa/Alexander Valley Cabernet house famous for 100% American oak aging and a five-year minimum release window. Lush, vanilla-toasted, immediately drinkable — the steakhouse Cabernet that built American collector culture.",
  },
  {
    match: "Tusk",
    blurb:
      "Tim Mondavi's Continuum-sibling project — a tiny-production Napa Cabernet built from a single Pritchard Hill block. Mountain fruit, very long aging, hyper-concentrated. Released in numbered bottles only.",
  },
  {
    match: "Château Latour",
    blurb:
      "Pauillac First-Growth on the southernmost gravel mound of the commune, overlooking the Gironde. Famous for muscle and longevity — the most tannic and slowest-maturing of the First Growths. Withdrew from en primeur in 2012 and only releases when the estate decides it's ready to drink.",
  },
  {
    match: "Schrader",
    blurb:
      "Fred Schrader's Napa project, sourcing almost entirely from Andy Beckstoffer's To Kalon vineyard in Oakville. Block-specific bottlings (Old Sparky, Colesworthy, Las Piedras) showcase different parcels of the same legendary vineyard. Now owned by Constellation; consistently 99-100pt scores.",
  },
  {
    match: "Shafer",
    blurb:
      "Stag's Leap District estate, founded by John Shafer in 1972. Hillside Select is the flagship — estate-grown Cabernet from a single hillside block, aged 32 months in French oak. Famously dense, dark-fruited, and ageable; sold to the Shanken family in 2022.",
  },
  {
    match: "Giacomo Conterno",
    blurb:
      "Piedmont's most revered traditionalist. Roberto Conterno farms the legendary Cascina Francia vineyard in Serralunga d'Alba and produces Monfortino — a Barolo Riserva aged seven-plus years in massive Slavonian oak. The reference for old-school, age-immortal Nebbiolo.",
  },
  {
    match: "Comte de Vogue",
    blurb:
      "Comte Georges de Vogüé in Chambolle-Musigny — the dominant landholder of Le Musigny Grand Cru. Roughly seven centuries of family ownership; produces a sliver of white from Musigny Blanc (declassified for decades) and several reds. The reference for silky, perfumed Chambolle Pinot Noir.",
  },
  {
    match: "Ridge",
    blurb:
      "Founded 1959 high above Cupertino; Paul Draper led winemaking for forty-plus years and made Monte Bello (Santa Cruz Mountains Cabernet blend) one of the great age-worthy California reds. Also revered for old-vine field-blend Zinfandels (Geyserville, Lytton Springs) farmed without herbicides.",
  },
  {
    match: "Château Lafite-Rothschild",
    blurb:
      "Pauillac First-Growth, owned by the Rothschild family since 1868. Gravel-over-clay soils, Cabernet-dominant blend. Famous for cedar, pencil-shavings perfume and decades of aging potential — and for becoming the status wine of the 1980s–2000s Asian collector market.",
  },
  {
    match: "Bond",
    blurb:
      "Harlan family's single-vineyard project — five distinct Napa hillside parcels (Melbury, St. Eden, Vecina, Pluribus, Quella), each bottled separately to show site. Same winemaking team and obsessive farming as Harlan Estate, but priced as a 'second' tier despite scores that rival the flagship.",
  },
  {
    match: "Château La Mission Haut-Brion",
    blurb:
      "Haut-Brion's neighbor and sibling, just across the road in Pessac-Léognan. Owned by Domaine Clarence Dillon since 1983. Slightly denser and more rustic than Haut-Brion itself, with the same smoky, mineral graves signature.",
  },
  {
    match: "Promontory",
    blurb:
      "Harlan family's wildest site — a 100-acre mountain estate west of Oakville with three distinct soil types in a single canyon. Bill Harlan's son Will runs it; the wine is meant to be unrefined and primal, almost Burgundian in its sense of place. Released years after vintage.",
  },
  {
    match: "Domaine des Comtes Lafon",
    blurb:
      "Meursault's reference family domaine, run by Dominique Lafon. Biodynamic farming across some of the village's top Premier Crus (Genevrières, Charmes, Perrières) and a sliver of Le Montrachet. Long-lived, mineral, deeply complex white Burgundy.",
  },
  {
    match: "Opus One",
    blurb:
      "The 1979 joint venture between Robert Mondavi and Baron Philippe de Rothschild — Napa's most famous Franco-American collaboration. Estate Cabernet-led Bordeaux blend from Oakville fruit. Now wholly owned by Constellation; remains the diplomatic gift of California wine.",
  },
  {
    match: "Sloan",
    blurb:
      "Stuart Sloan's tiny Rutherford hillside estate, debut 2000. Dense, structured, oak-driven Cabernet blend that scores consistently at the 98-100 level. Sold in 2011 to a Chinese investor; production remains microscopic.",
  },
  {
    match: "La Mission Haut-Brion",
    blurb:
      "Older vintages of Haut-Brion's Pessac-Léognan sibling, before the 1983 Dillon acquisition. Same gravel-over-clay graves terroir with classic smoky, tobacco-edged Cabernet/Merlot character.",
  },
  {
    match: "DANA Estates",
    blurb:
      "Rutherford estate launched 2007; multiple single-vineyard Napa Cabernets (Helms, Hershey, Lotus) produced under Philippe Melka and Cameron Vawter. Polished, oak-framed, modern-cult style.",
  },
  {
    match: "Stag’s Leap Wine Cellars",
    blurb:
      "Founded 1972 by Warren Winiarski. Famous as the Napa Cabernet that beat the First Growths in the 1976 Judgment of Paris. Cask 23 is the flagship — a block-specific Cabernet from the namesake Stag's Leap District. Sold to Ste. Michelle/Antinori in 2007.",
  },
  {
    match: "Salon",
    blurb:
      "Le Mesnil-sur-Oger Champagne house founded by Eugène-Aimé Salon in 1905. Single grape (Chardonnay), single village, single vineyard — and only declared in exceptional vintages (roughly 40 in the last century). The ultimate Blanc de Blancs.",
  },
  {
    match: "Domaine du Clos de Tart",
    blurb:
      "A 7.5-hectare Grand Cru monopole in Morey-Saint-Denis — one of the rare unbroken Burgundian holdings, owned by the same Cistercian-rooted lineage since 1141 until the 2017 sale to François Pinault. Powerful, structured Pinot Noir built to age decades.",
  },
  {
    match: "Château Mouton-Rothschild",
    blurb:
      "Pauillac First-Growth (promoted 1973 — the only such promotion in Médoc history), owned by the Rothschild family since 1853. Famous for a different artist label each vintage (Picasso, Bacon, Warhol, Koons, et al.) and a rich, exuberant, blackcurrant-driven Cabernet style.",
  },
  {
    match: "Château Margaux",
    blurb:
      "Pauillac's southern neighbor — the most perfumed and elegant of the Médoc First Growths. Owned by the Mentzelopoulos family since 1977. Famous for floral aromatics layered over very fine-grained Cabernet tannin.",
  },
  {
    match: "Château Leoville-Las Cases",
    blurb:
      "Saint-Julien's 'super second' — a Second-Growth that consistently performs at First-Growth level. Just over the wall from Latour, owned by the Delon family. Tight, structured, very long-aged Cabernet-led blends.",
  },
  {
    match: "Marcassin",
    blurb:
      "Helen Turley and John Wetlaufer's tiny Sonoma Coast project. Marcassin Vineyard — windswept ridge above the Pacific — produces some of the most concentrated, age-worthy California Chardonnay and Pinot Noir ever bottled. Allocation-only, almost mythical scarcity.",
  },
  {
    match: "Domaine Coche-Dury",
    blurb:
      "Jean-François Coche's Meursault estate, now run by son Raphaël. Tiny production, long lees aging, signature reductive flint-and-matchstick character. Pours of Coche white Burgundy are collectors' events, especially the village Meursault.",
  },
  {
    match: "Fonseca",
    blurb:
      "One of the great Vintage Port houses, Douro Valley, founded 1815. The flagship Vintage Port is declared only in top years (roughly three per decade) and is built to age for fifty-plus.",
  },
  {
    match: "Masseto",
    blurb:
      "Frescobaldi/Ornellaia's stand-alone Bolgheri Merlot — a single seven-hectare clay hillside that became Italy's most famous Merlot. Tiny production, opulent, often compared to right-bank Pomerol.",
  },
  {
    match: "Abreu",
    blurb:
      "David Abreu — a Napa vineyard manager who also farms and bottles his own Cabernet from a few hand-picked sites (Madrona Ranch, Thorevilos, Cappella). Mailing-list only, very small production, hyper-concentrated.",
  },
  {
    match: "Dom Pérignon",
    blurb:
      "Moët & Chandon's tête de cuvée, vintage-only — released only when the year is deemed worthy (roughly 4 of every 10). Chardonnay/Pinot Noir blend, long lees aging, hallmark toasty-citrus precision. P2 = extended second-plenitude release.",
  },
  {
    match: "Freemark Abbey",
    blurb:
      "Historic St. Helena estate, founded 1886. The Bosche Cabernet from Rutherford bench is the long-running flagship — old-school, structured, savory; one of the original 'cru' Napa bottlings.",
  },
  {
    match: "Staglin",
    blurb:
      "Rutherford estate Cabernet from the Staglin family, organic and Demeter-certified biodynamic. Andy Erickson winemaking. Velvety, polished, very age-worthy Rutherford-bench style.",
  },
  {
    match: "Pierre-Yves Colin-Morey",
    blurb:
      "PYCM — Pierre-Yves Colin (son of Marc Colin) with his wife Caroline Morey. Côte de Beaune négoce-and-domaine, known for very long élevage in larger 350L barrels, low sulfur, and a tight, reductive, mineral white Burgundy style.",
  },
  {
    match: "Biondi-Santi",
    blurb:
      "The inventor of Brunello di Montalcino — Ferruccio Biondi-Santi bottled the first single-variety Sangiovese Grosso in 1888. Library releases regularly drink beautifully at 50+ years.",
  },
  {
    match: "Tenuta San Guido",
    blurb:
      "Bolgheri estate of the Incisa della Rocchetta family — birthplace of Sassicaia, the wine that single-handedly invented the Super Tuscan category in the 1970s. Cabernet-led blend on sea-facing gravel.",
  },
  {
    match: "Château Pichon-Longueville Baron",
    blurb:
      "Pauillac Second-Growth (the 'Pichon Baron'), neighbor to Latour. Cabernet-dominant, structured and savory, with a distinctive cedar-and-graphite signature.",
  },
  // ───── Tier A: $1000–2000 ─────
  {
    match: "Gaja",
    blurb:
      "Angelo Gaja — the Piedmontese revolutionary who, in the 1960s–70s, made Barbaresco a global luxury and brought French barrique aging and single-vineyard bottlings to Italy. Now run by his daughters.",
  },
  {
    match: "Château Palmer",
    blurb:
      "Margaux Third-Growth that drinks at First-Growth level, biodynamic since 2014. Higher Merlot percentage than its neighbors gives a uniquely silky, perfumed style.",
  },
  {
    match: "Penfolds",
    blurb:
      "South Australia's flagship house, founded 1844. Grange — a Barossa Shiraz first made in 1951 by Max Schubert — is Australia's most collectible wine and the foundation of multi-region bin-number bottlings.",
  },
  {
    match: "Dalla Valle",
    blurb:
      "Oakville hillside estate run by Naoko Dalla Valle and her daughter Maya. Maya (the Cabernet/Cab Franc flagship) is one of Napa's modern reference reds; Collina is the second wine. Andy Erickson winemaking.",
  },
  {
    match: "Antinori",
    blurb:
      "26-generation Florentine wine family. Pioneered Super Tuscans with Tignanello (Sangiovese + Cabernet, 1971) and Solaia, and built Guado al Tasso in Bolgheri. The most influential Italian wine house of the modern era.",
  },
  {
    match: "Colgin",
    blurb:
      "Ann Colgin's Pritchard Hill / Tychson Hill Cabernet project, debut 1992. Tiny production, mailing-list allocation, ultra-polished modern Napa style. Majority-acquired by LVMH in 2017.",
  },
  {
    match: "Tenuta dell’Ornellaia",
    blurb:
      "Bolgheri estate founded by Lodovico Antinori in 1981; now Frescobaldi-owned. Ornellaia (flagship Cab-led blend) and Masseto (pure Merlot) are the twin pillars of modern Italian collector wine.",
  },
  {
    match: "PerUs",
    blurb:
      "Pritchard Hill Cabernet project led by Philippe Melka. Tiny production, hillside fruit, intensely structured modern Napa style; mailing list only.",
  },
  {
    match: "Bella Oaks",
    blurb:
      "Historic Rutherford vineyard once farmed for Heitz — relaunched as its own label by the Maples family with Maayan Koschitzky (Atelier Melka). Polished, hillside-driven Cabernet blend.",
  },
  {
    match: "Spottswoode",
    blurb:
      "St. Helena estate (1882), women-led for generations, certified organic and biodynamic. One of the most consistent and elegant Napa Cabernets — graceful, savory, built for decades.",
  },
  {
    match: "Domaine Vincent Dauvissat",
    blurb:
      "Vincent Dauvissat — together with Raveneau, the reference for traditional, terroir-driven Chablis. Biodynamic, neutral old oak, very long aging. Les Clos is the flagship Grand Cru.",
  },
  {
    match: "Diamond Creek",
    blurb:
      "Diamond Mountain estate (1968) — the first Napa winery to bottle individual hillside blocks (Volcanic Hill, Red Rock Terrace, Gravelly Meadow). Old-school structured Cabernet from cool mountain fruit.",
  },
  {
    match: "Château Lynch-Bages",
    blurb:
      "Pauillac Fifth-Growth that overdelivers — the Cazes family's flagship, often called the 'poor man's Mouton.' Rich, generous, cassis-and-cedar Cabernet blend.",
  },
  {
    match: "Accendo",
    blurb:
      "Bart and Daphne Araujo's Napa project after selling Eisele to Pinault. Cabernet-led blend sourced from a small Oakville/St. Helena selection; Michel Rolland and Tony Biagi consulting.",
  },
  {
    match: "Ovid",
    blurb:
      "Pritchard Hill hilltop estate (debut 2005), tiny production, austere mountain-Cabernet style. Now owned by Duncan family (Silver Oak).",
  },
  {
    match: "Domaine de Montille",
    blurb:
      "Volnay-based domaine with holdings across the Côte d'Or, including Premier Crus in Pommard and Corton. Biodynamic, whole-cluster fermentation, classic Burgundian elegance.",
  },
  {
    match: "Château Leoville-Poyferre",
    blurb:
      "Saint-Julien Second-Growth, the Cuvelier family's flagship — modernized in the 1980s, now consistently one of the appellation's most polished and complete Cabernet-led blends.",
  },
  {
    match: "Pulido-Walker",
    blurb:
      "Tiny Yountville/Mt. Veeder Cabernet project from Mark Pulido and Cori Walker, Thomas Brown winemaking. Mountain fruit, very small allocation, hyper-concentrated.",
  },
  {
    match: "Domaine François Raveneau",
    blurb:
      "Chablis's other untouchable name (alongside Dauvissat) — François Raveneau established the modern reference for slow-aging, mineral, neutral-oak Chablis. Still tiny production, hand-allocated.",
  },
  {
    match: "The Maiden",
    blurb:
      "Harlan Estate's second wine — declassified barrels from the flagship vineyard, made the same way. A way into the Harlan Oakville hillside style at a fraction of Harlan's allocation.",
  },
  {
    match: "Château Pichon-Longueville Comtesse de Lalande",
    blurb:
      "Pauillac Second-Growth (the 'Pichon Lalande'), sister estate to Pichon Baron across the road. Higher Merlot percentage gives a softer, more aromatic style — long considered the most feminine of the Médoc super-seconds.",
  },
  {
    match: "Joseph Phelps",
    blurb:
      "Napa pioneer (1973), creator of Insignia — the first proprietary Cabernet-led Bordeaux blend in California, debut 1974. The template for the modern Napa luxury red.",
  },
  {
    match: "Guiseppe Quintarelli",
    blurb:
      "Valpolicella's late master (d. 2012). Made Amarone and a 'Riserva' bottling that age for over a decade before release. Reference point for traditional, oxidative, age-worthy Veneto reds.",
  },
  {
    match: "Domaine Anne Gros",
    blurb:
      "Vosne-Romanée domaine with prized holdings in Richebourg, Clos Vougeot, and Échezeaux. Anne Gros is one of the great women of modern Burgundy; precise, perfumed Pinot Noir.",
  },
  {
    match: "Crissante Alessandria",
    blurb:
      "La Morra family estate making single-vineyard Barolo from Capalot and Galina cru sites. Traditional Nebbiolo with classic rose-tar perfume.",
  },
  {
    match: "Cardinale",
    blurb:
      "Jackson Family blend project — a Napa Cabernet built each year from the best barrels across multiple mountain sites (Howell, Veeder, Spring Mountain, Diamond Mountain). Polished and luxe.",
  },
  {
    match: "Edmond Vatan",
    blurb:
      "Tiny, hyper-cult Sancerre estate — the Vatan family's Clos la Néore Sauvignon Blanc is treated more like white Burgundy than typical Loire SB. Library releases command Burgundian prices.",
  },
  {
    match: "Heitz Cellar",
    blurb:
      "Founded 1961 in St. Helena. Joe Heitz pioneered single-vineyard Napa Cabernet with Martha's Vineyard (1966) and Bella Oaks. Classic, savory, eucalyptus-edged Oakville Cabernet.",
  },
  {
    match: "Taittinger",
    blurb:
      "Reims Champagne house, Chardonnay-dominant style. Comtes de Champagne (the Blanc de Blancs tête de cuvée) is one of the great age-worthy vintage Champagnes.",
  },
  {
    match: "Domaine Jean-Claude Ramonet",
    blurb:
      "Chassagne-Montrachet domaine with stunning holdings across the village's top Premier Crus (Morgeot, Ruchottes, Vergers) plus Le Montrachet. The reference for racy, mineral Chassagne whites.",
  },
  {
    match: "Realm",
    blurb:
      "Juan Mercado's modern Napa cult — single-vineyard Cabernets and proprietary blends (The Bard, Beckstoffer-sourced bottlings, The Tempest). Mailing-list only; consistently top scores.",
  },
  {
    match: "Lokoya",
    blurb:
      "Jackson Family mountain-Cabernet project — separate single-mountain bottlings from Howell, Veeder, Diamond, Spring. Dense, structured, age-worthy mountain fruit.",
  },
  {
    match: "MacDonald",
    blurb:
      "Graeme and Alex MacDonald's family-farmed To Kalon parcel in Oakville — the original 1954-planted block. Tiny production, hand-sold, instantly mythic Cabernet.",
  },
  {
    match: "Tenuta di Trinoro",
    blurb:
      "Andrea Franchetti's southern Tuscan estate near Sarteano — Bordeaux varieties (Cab Franc–led blend) on high-elevation, low-yield sites. Cult bottling outside the DOC.",
  },
  {
    match: "Château Beychevelle",
    blurb:
      "Saint-Julien Fourth-Growth with the famous 'striking sails' label. Cabernet-led blend that drinks elegantly young — the most approachable of the Saint-Julien classed growths.",
  },
  {
    match: "Château Gruaud Larose",
    blurb:
      "Saint-Julien Second-Growth, one of the largest classed-growth estates. Old-school, broad-shouldered Cabernet-led style with a savory, leather-edged finish.",
  },
  // ───── Tier B: $500–1000 ─────
  {
    match: "Vine Hill Ranch",
    blurb:
      "Bruce Phillips' historic Oakville vineyard (planted 1959) — long a top fruit source for cult labels; small production under the estate name since 2008.",
  },
  {
    match: "Château Cos d’Estournel",
    blurb:
      "Saint-Estèphe Second-Growth with the unmistakable Indian-pagoda château. Modernist Cabernet-led blend, polished and powerful, owned by the Reybier family.",
  },
  {
    match: "Dominus",
    blurb:
      "Christian Moueix's (of Petrus) Napanook estate in Yountville. Bordeaux-style Cabernet blend, restrained and structured — the most European-feeling of the great Napa reds.",
  },
  {
    match: "Philip Togni",
    blurb:
      "Veteran winemaker (Mayacamas, Cuvaison) with his own tiny Spring Mountain estate since 1983. Long-aging, old-school Napa hillside Cabernet.",
  },
  {
    match: "Giuseppe Mascarello",
    blurb:
      "Castiglione Falletto traditionalist — Monprivato is the family monopole and one of the great single-vineyard Barolos, big oak, long aging.",
  },
  {
    match: "Valdicava",
    blurb:
      "Montalcino estate, family-run, traditional Brunello with very long aging — Madonna del Piano Riserva is the flagship.",
  },
  {
    match: "Domaine Latour-Giraud",
    blurb:
      "Meursault domaine with the largest holding in Genevrières and significant Charmes and Poruzots. Concentrated, slightly richer style of white Burgundy.",
  },
  {
    match: "Hourglass",
    blurb:
      "Calistoga estate, named for the hourglass-shaped valley narrowing. Bob Foley winemaking history; lush, ripe Cabernet from Blueline and HG III vineyards.",
  },
  {
    match: "Marcassin. Marcassin Vineyard",
    blurb:
      "(Same as Marcassin — Helen Turley's Sonoma Coast cult project.) Hand-allocated Chardonnay from the windswept namesake vineyard.",
  },
  {
    match: "Continuum",
    blurb:
      "Tim Mondavi and family's Pritchard Hill estate, founded after the Mondavi sale. Mountain-grown Cabernet-led blend that nods to the European model — single estate, single wine.",
  },
  {
    match: "Roberto Voerzio",
    blurb:
      "La Morra modernist — extreme green-harvest, low yields, French barrique aging. Pioneered the lush, concentrated style of modern Barolo from cru sites like Brunate and Cerequio.",
  },
  {
    match: "Louis Roederer",
    blurb:
      "Family-owned Champagne house since 1776. Cristal — created in 1876 for Tsar Alexander II — is the tête de cuvée, made only in declared vintages.",
  },
  {
    match: "Alpha Omega",
    blurb:
      "Rutherford-based, Henri Coquard-Newton style — modern, polished California Cab blends including the ERA flagship.",
  },
  {
    match: "Caymus",
    blurb:
      "Wagner family Rutherford estate, founded 1972. Special Selection (debut 1975) is the flagship — opulent, ripe, oak-framed Napa Cabernet that helped define the modern California style.",
  },
  {
    match: "Plumpjack",
    blurb:
      "Oakville estate founded by Gavin Newsom and Gordon Getty in the 1990s. Famously the first to release a premium Napa Cabernet under screwcap. Rich, accessible style.",
  },
  {
    match: "Roagna",
    blurb:
      "Castiglione Falletto/Barbaresco family domaine, fifth-generation. Old-school: long maceration, big Slavonian oak, native yeasts. Pira, Asili, Crichet Pajé are the cru bottlings.",
  },
  {
    match: "Oasi degli Angeli",
    blurb:
      "Marche estate famous for Kurni — a small-production, late-harvest Montepulciano (the grape) aged in new oak. Dense, modern, almost Amarone-like.",
  },
  {
    match: "Château Lascombes",
    blurb:
      "Margaux Second-Growth, large estate, modernized in the 2000s under Dourthe and most recently the Lawrence family. Rich, fleshy Margaux style.",
  },
  {
    match: "Château L’Eglise-Clinet",
    blurb:
      "Tiny Pomerol estate, Denis Durantou era set the modern reference — perfumed, silky, old-vine Merlot/Cab Franc.",
  },
  {
    match: "Vieux Château Certan",
    blurb:
      "Historic Pomerol property owned by the Thienpont family — higher Cabernet Franc percentage than most Pomerols gives a more aromatic, structured profile.",
  },
  {
    match: "Michel Fallon",
    blurb:
      "Avize grower-producer Champagne — Chardonnay-driven Grand Cru cuvées from the Côte des Blancs.",
  },
  {
    match: "Bruno Rocca",
    blurb:
      "Modern Barbaresco from the Rocca family, known for the single-vineyard Rabajà — French oak, deeply concentrated.",
  },
  {
    match: "The Mascot",
    blurb:
      "Will Harlan's project: declassified barrels from Harlan Estate, Bond, and Promontory vineyards, blended into a single accessible Napa Cabernet.",
  },
  {
    match: "Antica Terra",
    blurb:
      "Yamhill County (Oregon) estate run by Maggie Harrison (ex-Sine Qua Non). Pinot Noir and Chardonnay from a fossil-rich limestone-and-basalt site; whole-cluster, low intervention.",
  },
  {
    match: "Château L’Evangile",
    blurb:
      "Pomerol estate adjacent to Petrus and Cheval Blanc, owned by Domaines Barons de Rothschild (Lafite) since 1990. Merlot/Cab Franc blend, silky and aromatic.",
  },
  {
    match: "Armand de Brignac",
    blurb:
      "The 'Ace of Spades' Champagne — Cattier-produced, glossy metallic bottle. Originally a marketing-led prestige bottling; now part of the LVMH portfolio.",
  },
  {
    match: "Paul Hobbs",
    blurb:
      "Sonoma/Argentina-based winemaker and consultant. His own label produces single-vineyard Napa and Sonoma Cabernet and Chardonnay in a polished, modern style.",
  },
  {
    match: "Lithology",
    blurb:
      "Howell Mountain hillside Cabernet project, Thomas Brown winemaking. Volcanic mountain fruit, mailing-list only.",
  },
  {
    match: "Château Ducru-Beaucaillou",
    blurb:
      "Saint-Julien Second-Growth, Borie family. 'Beaucaillou' = beautiful pebbles — the gravelly soils that give the wine its precise, classic Cabernet structure.",
  },
  {
    match: "Château Giscours",
    blurb:
      "Margaux Third-Growth, large estate just south of the village. Cabernet-led blend with classic Margaux perfume and a richer mid-palate.",
  },
  {
    match: "Littorai",
    blurb:
      "Ted Lemon's biodynamic Sonoma Coast / Anderson Valley estate — site-specific Pinot Noir and Chardonnay, restrained and Burgundian in style.",
  },
  {
    match: "Sire",
    blurb:
      "Small Napa Cabernet project; modern, polished California style with a tiny allocation.",
  },
  {
    match: "Jerome Prevost",
    blurb:
      "Single-vineyard Champagne from a Pinot Meunier–dominant plot in Gueux. Tiny grower-producer cult; aged on lees in old barrels — vinous and complex.",
  },
  {
    match: "Krug",
    blurb:
      "Reims Champagne house founded 1843. Multi-vintage Grande Cuvée is blended from 120+ reserve wines; built around long lees aging, oxidative reserve handling, and a deeply toasty signature.",
  },
  {
    match: "Ulysse Collin",
    blurb:
      "Grower-Champagne star from the Coteaux du Petit Morin — single-vineyard, low-dosage Chardonnay (Les Pierrières) and Pinot Noir cuvées.",
  },
  {
    match: "Haynes Vineyard",
    blurb:
      "Historic Coombsville Chardonnay site (planted 1966) — long a fruit source for top names, now bottled under its own label by the Haynes family.",
  },
  {
    match: "Bergman",
    blurb:
      "Tiny Napa project bottling a Cabernet-led proprietary red; allocation-only.",
  },
  {
    match: "Pahlmeyer",
    blurb:
      "Napa estate (1986), known for ripe, oak-framed Chardonnay and Bordeaux-blend reds — set the template for a certain richer California style.",
  },
  {
    match: "AXR",
    blurb:
      "Howell Mountain–rooted Napa producer named for the AXR-1 rootstock. Cabernet-focused, hand-farmed mountain fruit.",
  },
  {
    match: "Ciacci Piccolomini",
    blurb:
      "Castelnuovo dell'Abate (south Montalcino) estate. Pianrosso Riserva is the flagship Brunello — bright fruit balanced by structured Sangiovese tannin.",
  },
  {
    match: "Poggio di Sotto",
    blurb:
      "South-Montalcino Brunello cult — traditional, long-aged, perfumed Sangiovese on the slopes of Montecucco.",
  },
  {
    match: "Château Figeac",
    blurb:
      "Saint-Émilion Premier Grand Cru Classé 'A' (promoted 2022). Atypical Right-Bank blend with significant Cabernet Sauvignon and Cab Franc alongside the Merlot — structured and graceful.",
  },
  // ───── Tier B / lower-B: $550–700 ─────
  { match: "ADAMVS", blurb: "Howell Mountain biodynamic estate, organic since 2008. Volcanic mountain Cabernet, restrained modern style." },
  { match: "Quintessa", blurb: "Augustin Huneeus's Rutherford estate, biodynamic-farmed amphitheater of vineyards. A single annual proprietary red." },
  { match: "Peter Michael", blurb: "Knights Valley estate of Sir Peter Michael — single-block Chardonnay (Belle Côte, La Carrière) and Bordeaux-blend reds. Polished, French-leaning style." },
  { match: "Brand", blurb: "Pritchard Hill Cabernet-blend project; tiny production, modern Napa style." },
  { match: "La Jota Vineyard", blurb: "Howell Mountain estate dating to 1898, now Jackson Family-owned. Block-specific mountain Cabernet (W.S. Keyes is the flagship vineyard)." },
  { match: "Fait-Main", blurb: "Tiny Napa Cabernet bottling — boutique, hand-built modern style." },
  { match: "Passopisciaro", blurb: "Andrea Franchetti's Etna estate. Single-contrada Nerello Mascalese (Chiappemacine, Porcaria, Rampante, Sciaranuova) — Burgundy-of-the-volcano." },
  { match: "Clos des Papes", blurb: "Châteauneuf-du-Pape benchmark, Avril family. Single annual red and white blend from all 13 permitted varieties; long-lived, classical." },
  { match: "Rostaing", blurb: "Northern Rhône estate — single-vineyard Côte-Rôtie (La Landonne, La Côte Blonde) and Condrieu. Modern but balanced." },
  { match: "Taylor Fladgate", blurb: "Historic Vintage Port house (1692) — purist style, very age-worthy declared-vintage Ports." },
  { match: "Poderi Colla", blurb: "Family-run Langhe estate (Tino, Federica, Pietro Colla). Traditional Barolo from the Dardi La Rose cru in Bussia." },
  { match: "CIRQ", blurb: "Michael Browne (ex-Kosta Browne) project — small-production Russian River Pinot Noir." },
  { match: "Amuse Bouche", blurb: "Pritchard Hill Merlot-led project from Heidi Barrett and John Schwartz. Tiny production, polished modern style." },
  { match: "Bedrock Wine Co.", blurb: "Morgan Twain-Peterson's Sonoma project, championing old-vine California field blends and historic vineyards (Bedrock, Pagani, Evangelho)." },
  { match: "Château Montelena", blurb: "Calistoga estate (1882), the Chardonnay that won the Judgment of Paris in 1976. Long-lived, traditional Napa Cabernet as the modern flagship." },
  { match: "Brilliant Mistake", blurb: "Boutique Napa Cabernet project with a tiny allocation; modern hillside style." },
  { match: "Frank Family", blurb: "Calistoga estate — accessible, oak-framed Napa Cabernet and Chardonnay. Founded by Disney exec Rich Frank, sold to Treasury in 2022." },
  { match: "Scarecrow", blurb: "Rutherford estate built around vines planted in the 1940s by Hollywood producer J.J. Cohn. Tiny production, mailing-list cult; lush, aromatic Cabernet." },
  { match: "La Spinetta", blurb: "Piedmontese producer (Giorgio Rivetti) — modern Barbera, Barbaresco, and Barolo. New oak, ripe fruit, the rhinoceros label." },
  { match: "Château Phelan Segur", blurb: "Saint-Estèphe estate (cru bourgeois exceptionnel) — classic, structured Cabernet blend at value pricing." },
  // ───── Tier C: $325–525 ─────
  { match: "Paul Bara", blurb: "Grower-Champagne family in Bouzy — Pinot Noir–dominant Grand Cru cuvées." },
  { match: "Elvio Cogno", blurb: "Novello (Barolo) estate, Vigna Elena and Bricco Pernice are the flagship cru bottlings." },
  { match: "Luciano Sandrone", blurb: "La Morra modernist — Cannubi Boschis and Le Vigne Barolo, French-oak-aged, polished but balanced." },
  { match: "Aubert", blurb: "Mark Aubert's Sonoma Coast and Napa Chardonnay/Pinot Noir project. Rich, oak-framed, mailing-list only." },
  { match: "Anne Boisson-Vadot", blurb: "Tiny Meursault-Blagny domaine — pure, mineral white Burgundy from a young woman vigneron to watch." },
  { match: "Eisele Vineyard", blurb: "Historic Calistoga site farmed for Joseph Phelps and Araujo, now owned by François Pinault (Latour). Single-vineyard Cabernet and Syrah." },
  { match: "Kapcsandy", blurb: "Yountville estate (debut 2005), Hungarian-born Lou Kapcsandy. Roberta's Reserve is the flagship — opulent modern Cabernet." },
  { match: "Ad Vivum", blurb: "Tiny Napa Cabernet project — boutique, allocation-only." },
  { match: "Siro Pacenti", blurb: "Montalcino estate, Giancarlo Pacenti — modernist Brunello with French barrique aging." },
  { match: "Paolo Bea", blurb: "Umbrian natural-wine icon — Sagrantino di Montefalco from old vines, native yeasts, no fining or filtration." },
  { match: "Oasi delgi Angeli", blurb: "(Spelling variant of Oasi degli Angeli — Marche estate famous for Kurni.)" },
  { match: "Tenuta delle Terre Nere", blurb: "Etna estate (Marc de Grazia) — single-contrada Nerello Mascalese from old vines on volcanic slopes." },
  { match: "Domaine Roulot", blurb: "Meursault domaine led by Jean-Marc Roulot. Reference for precise, mineral, lieu-dit-specific white Burgundy." },
  { match: "Château Smith Haut Lafitte", blurb: "Pessac-Léognan estate, organic and biodynamic. Cathiard family. Top-tier red and white from gravelly Graves soils." },
  { match: "Laurent-Perrier", blurb: "Tours-sur-Marne Champagne house. Grand Siècle is the multi-vintage tête de cuvée, Chardonnay-led and elegant." },
  { match: "Morlet", blurb: "Sonoma estate from Burgundy-born Luc Morlet. Single-vineyard Pinot Noir, Chardonnay, and Cabernet — refined, French-leaning." },
  { match: "Domaine Albert Grivault", blurb: "Tiny Meursault domaine, monopole owner of Clos des Perrières (a walled lieu-dit inside the Premier Cru Perrières). Precise, mineral, very long-aged whites." },
  { match: "David Arthur", blurb: "Pritchard Hill estate, founded 1985. Elevation Eleven Eleven is the flagship hillside Cabernet." },
  { match: "Fontodi", blurb: "Panzano (Chianti Classico) estate, Manetti family. Flaccianello is the flagship 100% Sangiovese Super Tuscan." },
  { match: "Bouchard Père & Fils", blurb: "Major Beaune négociant-and-domaine (1731), now owned by Champagne Henriot. Significant Grand and Premier Cru holdings across Côte de Beaune." },
  { match: "Fantesca", blurb: "Spring Mountain estate plus a Russian River Chardonnay program (Paris Block, Bacigalupi). Polished modern California style." },
  { match: "Au Bon Climat", blurb: "Jim Clendenen's Santa Barbara estate (1982) — Burgundian-leaning Pinot Noir and Chardonnay, a California pioneer." },
  { match: "Paradigm", blurb: "Oakville estate, Heidi Barrett winemaking. Classic Napa Cabernet from estate fruit." },
  { match: "Didier Dagueneau", blurb: "The late genius of Pouilly-Fumé. Silex and Pur Sang redefined what Sauvignon Blanc could be — site-driven, age-worthy, almost Burgundian." },
  { match: "Kistler", blurb: "Sonoma reference for single-vineyard, barrel-fermented Chardonnay (Vine Hill, Hudson, McCrea). Also serious Pinot Noir." },
  { match: "Secret Door", blurb: "Boutique Napa Cabernet project, allocation-only." },
  { match: "Cavallotto", blurb: "Castiglione Falletto traditionalist — Bricco Boschis Riserva is the flagship Barolo, very long aging in Slavonian oak." },
  { match: "Caparzo", blurb: "Montalcino estate, modern style — La Casa is the single-vineyard Brunello." },
  { match: "Bibi Graetz", blurb: "Florence-born artist-turned-winemaker. Testamatta is the flagship Sangiovese Super Tuscan from old vines around Fiesole." },
  { match: "Château Leoville-Barton", blurb: "Saint-Julien Second-Growth, owned by the Anglo-Irish Barton family since 1826. Traditional, structured Cabernet-led blend." },
  { match: "Château d’Yquem", blurb: "Sauternes Premier Cru Supérieur — the only estate at this classification level. Botrytis-affected Sémillon/Sauvignon sweet wine that ages a century." },
  { match: "Graham’s", blurb: "Symington-family Vintage Port house, founded 1820. Declared-vintage Ports built to age for decades." },
  { match: "Peay", blurb: "Extreme-Sonoma Coast estate (Cleary brothers + Vanessa Wong). Cool-climate Syrah, Pinot Noir, Chardonnay — Burgundian-leaning." },
  { match: "Leonetti Cellar", blurb: "Walla Walla's first commercial winery (1977), Figgins family. Reserve Cabernet is the flagship, structured Washington style." },
  { match: "San Polo", blurb: "Montalcino estate (Allegrini-owned), Sant'Antimo hillside Brunello in a balanced modern style." },
  { match: "Domaine Genot-Boulanger", blurb: "Côte de Beaune domaine (Meursault-based) with holdings across Pommard, Volnay, and Beaune. Classic Burgundian whites and reds." },
  { match: "Benanti", blurb: "Etna pioneer (1988). Pietramarina is the flagship Carricante — high-elevation, age-worthy white." },
  { match: "A. Rafanelli", blurb: "Dry Creek Valley family estate (1911). Old-vine Zinfandel and Cabernet, no-frills traditional Sonoma." },
  { match: "Kenzo", blurb: "Mountainous Napa estate owned by video-game pioneer Kenzo Tsujimoto. Asuka, Rindo, and Ai are the cuvée names; polished modern style." },
  { match: "Mowe", blurb: "Boutique Napa Cabernet project, small allocation." },
  { match: "Simon Family Estate", blurb: "Napa boutique estate with a tiny annual Cabernet release." },
  { match: "Bertani", blurb: "Veneto historic house (1857). Reference traditional Amarone with decades of aging before release." },
  { match: "Giuseppe Quintarelli", blurb: "(Same producer as Guiseppe Quintarelli — late Valpolicella master. Traditional, oxidative, hyper-long-aged Amarone and Recioto.)" },
  { match: "Domaine de L’Arlot", blurb: "Premeaux-Prissey (Nuits-Saint-Georges) estate, biodynamic. Clos de l'Arlot is the monopole — Pinot Noir and tiny-production white." },
  { match: "Château Monbousquet", blurb: "Saint-Émilion Grand Cru Classé, Perse family. Ripe, modern Right-Bank style — Merlot-led with Cabernet Franc and Cabernet Sauvignon." },
  { match: "Stonestreet", blurb: "Alexander Valley estate, Jackson Family. Mountain-grown Chardonnay and Cabernet from very high-elevation blocks." },
  { match: "Kongsgaard", blurb: "John Kongsgaard's tiny Napa project — wild-yeast, fully oxidatively-handled Chardonnay and Syrah from estate hillside fruit." },
  { match: "TOR", blurb: "Tor Kenward's Napa label — single-vineyard Chardonnay (Beresini, Hyde) and Cabernet (Beckstoffer To Kalon, Tierra Roja)." },
  { match: "La Jota", blurb: "Howell Mountain estate (1898), Jackson Family. W.S. Keyes Vineyard bottlings are the flagship — old-vine mountain fruit." },
];

export const WINE_PRODUCER_LOOKUP = WINE_PRODUCERS.map((p) => ({
  match: p.match,
  entry: { blurb: p.blurb },
})).sort((a, b) => b.match.length - a.match.length);
