/**
 * Vintage-specific notes for the most prestigious bottles on the list.
 * Keyed by `${producer}|${vintage}`. Used by WineCard to show a hover tooltip
 * on the vintage year. Keep entries factual and concise (2-4 sentences).
 *
 * Sourced from published vintage reports (Wine Advocate, Vinous, JancisRobinson,
 * decanter) and producer notes.
 */

export type VintageNote = { producer: string; vintage: string; blurb: string };

export const WINE_VINTAGE_NOTES: VintageNote[] = [
  // ---------- Burgundy / DRC & top whites ----------
  {
    producer: "Domaine de la Romanee-Conti",
    vintage: "2016",
    blurb:
      "2016 Grands Echezeaux: tiny crop after the April frost devastated Flagey-Echezeaux, then a hot, dry late summer rescued the survivors. Concentrated, perfumed, structured for 20-40 years. One of the most sought-after recent DRC vintages.",
  },
  {
    producer: "Domaine de la Romanee-Conti",
    vintage: "2022",
    blurb:
      "2022 Corton: DRC's third vintage from the Prince Florent de Merode parcels (Bressandes, Renardes, Clos du Roi). Hot, dry growing season produced ripe, generous wines with surprising freshness - early-drinking by DRC standards but built to last.",
  },
  {
    producer: "Comte de Vogue",
    vintage: "2017",
    blurb:
      "2017 Musigny Vieilles Vignes: classic Vogue elegance after the frost-shortened '16. Cool, even season, mid-weight Musigny with lifted aromatics, silky tannins, 25+ year life.",
  },
  {
    producer: "Domaine du Clos de Tart",
    vintage: "2022",
    blurb:
      "2022 Clos de Tart: warm, dry vintage under Alessandro Noli (Pinault era). Ripe red fruit, polished tannins, more accessible than the structured '20 or '19 but still built for two decades.",
  },
  {
    producer: "Domaine des Comtes Lafon",
    vintage: "2013",
    blurb:
      "2013 Meursault Porusots 1er Cru: cool, late, low-yielding vintage. Tense, mineral, citrus-driven Meursault - classic Lafon precision, drinking beautifully now through 2030.",
  },
  {
    producer: "Domaine Coche-Dury",
    vintage: "2019",
    blurb:
      "2019 Meursault: warm but balanced vintage, low yields from spring frost. Concentrated, hazelnut-and-citrus Coche-Dury signature with the structure to age 15+ years.",
  },
  {
    producer: "Pierre-Yves Colin-Morey",
    vintage: "2017",
    blurb:
      "2017 Corton-Charlemagne: generous, ripe vintage saved from frost by an early flowering. Rich, mineral, classic PYCM tension and reduction; long-aging Grand Cru white.",
  },
  {
    producer: "Domaine Vincent Dauvissat",
    vintage: "2010",
    blurb:
      "2010 Les Clos: benchmark Chablis vintage - cool, slow ripening, electric acidity. Dauvissat's Les Clos from '10 is widely considered one of the great modern Chablis bottlings, decades of life ahead.",
  },

  // ---------- Bordeaux 1ers ----------
  {
    producer: "Château Petrus",
    vintage: "1987",
    blurb:
      "1987 Petrus: a difficult, rainy vintage on the Right Bank; Petrus made one of the few successful '87s thanks to early Merlot harvest and rigorous selection. Mature, soft, savory - past its peak but a survivor of a weak vintage.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1989",
    blurb:
      "1989 Haut-Brion: legendary vintage, scored 100 points by Parker. Hot, early season produced exotic, smoky, opulent Haut-Brion with decades of life remaining - one of the all-time great Bordeaux.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1982",
    blurb:
      "1982 Haut-Brion: the vintage that launched the modern Bordeaux market. Ripe, powerful, still youthful after 40+ years; tobacco, graphite, dark fruit.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1966",
    blurb:
      "1966 Haut-Brion: classically structured, cool-vintage Bordeaux. Earthy, cedar, tobacco - fully mature, drink soon.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1967",
    blurb:
      "1967 Haut-Brion: lighter, more delicate vintage. Mature, tertiary, drink on release window long passed but Haut-Brion held up better than peers.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1970",
    blurb:
      "1970 Haut-Brion: ripe, generous vintage, classically built. Earthy, smoky Pessac character, fully mature with grip remaining.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1976",
    blurb:
      "1976 Haut-Brion: hot, dry, drought-stressed vintage. Riper than typical Bordeaux of the era; tertiary, savory, drink now.",
  },
  {
    producer: "Château Haut-Brion",
    vintage: "1983",
    blurb:
      "1983 Haut-Brion: excellent Graves vintage, often overshadowed by '82. Elegant, smoky, fully resolved tannins.",
  },
  {
    producer: "Château Latour",
    vintage: "1952",
    blurb:
      "1952 Latour: classic post-war vintage, firm and structured in youth. Now in tertiary phase - cedar, leather, dried fruit. A piece of Pauillac history.",
  },
  {
    producer: "Château Latour",
    vintage: "1957",
    blurb:
      "1957 Latour: small, late, cool vintage. Lean and austere in youth; the Pauillac power kept it alive, now savory and resolved.",
  },
  {
    producer: "Château Lafite-Rothschild",
    vintage: "1967",
    blurb:
      "1967 Lafite: light, classical vintage, never a blockbuster. Drinking gently - pencil shavings, dried red fruit.",
  },
  {
    producer: "Château Lafite-Rothschild",
    vintage: "1989",
    blurb:
      "1989 Lafite: ripe, generous, hot-vintage Lafite with unusual richness for the estate. Fully mature, fragrant, still vibrant.",
  },
  {
    producer: "Château Lafite-Rothschild",
    vintage: "1995",
    blurb:
      "1995 Lafite: classical Pauillac vintage, firm structure, slow-developing. Now entering its drinking window - cedar, cassis, graphite.",
  },
  {
    producer: "Château Lafite-Rothschild",
    vintage: "2002",
    blurb:
      "2002 Lafite: underrated cool-vintage Lafite, classical and restrained. Drinking well now, with 10-15 years more life.",
  },
  {
    producer: "Château Mouton-Rothschild",
    vintage: "1967",
    blurb:
      "1967 Mouton: light vintage, mid-weight Mouton. Tertiary, fragrant, drink now. Label artwork by César Baldaccini.",
  },
  {
    producer: "Château Mouton-Rothschild",
    vintage: "1970",
    blurb:
      "1970 Mouton: very good Pauillac vintage, full-bodied and ripe. Fully mature; cassis, cigar box, leather. Label by Marc Chagall.",
  },
  {
    producer: "Château Mouton-Rothschild",
    vintage: "1976",
    blurb:
      "1976 Mouton: hot, drought vintage. Ripe, supple Mouton drinking on the late side. Label by Pierre Soulages.",
  },
  {
    producer: "Château Mouton-Rothschild",
    vintage: "1978",
    blurb:
      "1978 Mouton: very good Left Bank vintage saved by a hot September. Classic Mouton power, fully resolved tannins. Label by Jean-Paul Riopelle.",
  },
  {
    producer: "Château Mouton-Rothschild",
    vintage: "1979",
    blurb:
      "1979 Mouton: large, even vintage, mid-weight Mouton. Drinking gently - cedar, tobacco, fading dark fruit. Label by Hisao Domoto.",
  },
  {
    producer: "Château Margaux",
    vintage: "1978",
    blurb:
      "1978 Margaux: turnaround vintage at the estate, hot September saved the year. Elegant, fragrant, drinking beautifully - one of the better '78 Bordeaux.",
  },
  {
    producer: "Château Margaux",
    vintage: "1983",
    blurb:
      "1983 Margaux: legendary Margaux vintage, considered the wine of the year. Perfumed, silky, classically proportioned - fully mature and singing.",
  },
  {
    producer: "Château Margaux",
    vintage: "1995",
    blurb:
      "1995 Margaux: classic, structured vintage with firm tannins. Now in its sweet spot - violets, cassis, cedar.",
  },
  {
    producer: "Château Margaux",
    vintage: "1967",
    blurb:
      "1967 Margaux: pre-Mentzelopoulos era, light cool vintage. Tertiary and delicate, a historical curiosity more than a powerful drink.",
  },
  {
    producer: "Château La Mission Haut-Brion",
    vintage: "1969",
    blurb:
      "1969 La Mission: cool, difficult vintage where La Mission outperformed most of the Left Bank. Smoky, earthy Pessac signature; mature but holding.",
  },
  {
    producer: "Château La Mission Haut-Brion",
    vintage: "1982",
    blurb:
      "1982 La Mission: legendary vintage from the Woltner era's final stretch. Massive, ripe, smoky - still youthful, easily 20+ more years.",
  },
  {
    producer: "Château La Mission Haut-Brion",
    vintage: "1989",
    blurb:
      "1989 La Mission: 100-point vintage from Robert Parker. Hot, powerful, opulent - modern La Mission peak, drinking magnificently with decades ahead.",
  },
  {
    producer: "Château La Mission Haut-Brion",
    vintage: "1995",
    blurb:
      "1995 La Mission: classic vintage, structured and savory. In its drinking window now - cigar box, dark earth, graphite.",
  },
  {
    producer: "Château La Mission Haut-Brion",
    vintage: "2000",
    blurb:
      "2000 La Mission: millennium vintage, ripe and powerful. Just entering its mature phase, 20+ years ahead.",
  },
  {
    producer: "Château Pichon-Longueville Baron",
    vintage: "1962",
    blurb:
      "1962 Pichon Baron: classic, often-overlooked vintage that aged remarkably well. Tertiary Pauillac - cedar, leather, dried cassis. Drink now.",
  },
  {
    producer: "Château Palmer",
    vintage: "1983",
    blurb:
      "1983 Palmer: a legendary Palmer year, often rated above the 1st Growths in Margaux. Perfumed, silky, fully mature and gorgeous.",
  },
  {
    producer: "Château Leoville-Las Cases",
    vintage: "1982",
    blurb:
      "1982 Las Cases: super-second at its '82 peak. Massive, structured, still youthful - one of the great non-1st-Growth Bordeaux of the vintage.",
  },
  {
    producer: "Château Lynch-Bages",
    vintage: "1966",
    blurb:
      "1966 Lynch-Bages: classic mid-weight Pauillac vintage. Tertiary, savory, drink soon - a historical bottle from before the estate's modern rise.",
  },

  // ---------- California cult ----------
  {
    producer: "Screaming Eagle",
    vintage: "2021",
    blurb:
      "2021 Screaming Eagle: near-perfect Napa vintage - cool, even growing season, ideal harvest. Pure, structured, built for 25+ years; one of the great recent Screaming Eagles.",
  },
  {
    producer: "Harlan Estate",
    vintage: "2011",
    blurb:
      "2011 Harlan: cool, wet, late vintage. Harlan made a restrained, elegant Harlan against the vintage's grain - lower alcohol, more red-fruited, atypical for the estate.",
  },
  {
    producer: "Harlan Estate",
    vintage: "2021",
    blurb:
      "2021 Harlan: benchmark Napa vintage, perfectly balanced. Classic Harlan power with seamless structure - built for 30+ years.",
  },
  {
    producer: "Tusk",
    vintage: "2016",
    blurb:
      "2016 Tusk: ripe, polished Napa Cabernet from Philippe Melka's tiny project (~200 cases). Dense, opulent, drinking beautifully with 15+ years ahead.",
  },
  {
    producer: "Tusk",
    vintage: "2015",
    blurb:
      "2015 Tusk: small, drought-shortened vintage producing concentrated, powerful wines. Tusk '15 is dense, structured, long-lived.",
  },
  {
    producer: "Schrader",
    vintage: "2014",
    blurb:
      "2014 Schrader Old Sparky: third drought vintage, low yields, intensely concentrated. From the heart of Beckstoffer To Kalon - opulent, structured, peak Schrader.",
  },
  {
    producer: "Schrader",
    vintage: "2017",
    blurb:
      "2017 Schrader Old Sparky: warm vintage cut short by October fires (harvested before). Ripe, powerful, classic Schrader density.",
  },
  {
    producer: "Sine Qua Non",
    vintage: "2005",
    blurb:
      "2005 SQN Eleven Confessions: Manfred Krankl's estate-fruit project in Sta. Rita Hills, dry-farmed. The '05 bottlings ('17th Nail' Syrah, 'Naked Truth' Grenache) are cult-collected, near-perfect Krankl in his prime.",
  },
  {
    producer: "Silver Oak",
    vintage: "2003",
    blurb:
      "2003 Silver Oak Napa: warm, ripe vintage. Classic American-oak Silver Oak signature - dill, vanilla, ripe cassis. Fully mature, drink now.",
  },
  {
    producer: "Shafer",
    vintage: "2016",
    blurb:
      "2016 Hillside Select: one of the great recent vintages, cool finish to a warm year. Hillside Select '16 is dense, structured, classically Stag's Leap - 20+ years ahead.",
  },
  {
    producer: "Ridge",
    vintage: "1991",
    blurb:
      "1991 Monte Bello: legendary vintage at Ridge under Paul Draper. Cool, late season produced structured, age-worthy Monte Bello - still vibrant at 30+.",
  },
  {
    producer: "Bond",
    vintage: "2014",
    blurb:
      "2014 Bond Vecina: small, drought-concentrated vintage. Vecina (Oakville hillside) shows classic Bond density and Bordeaux-style structure.",
  },
  {
    producer: "Stag’s Leap Wine Cellars",
    vintage: "1983",
    blurb:
      "1983 Cask 23: cool, classic Napa vintage. Cask 23 from '83 is fully mature, perfumed, savory - a piece of post-Judgment-of-Paris history.",
  },
  {
    producer: "Opus One",
    vintage: "2012",
    blurb:
      "2012 Opus One: benchmark warm-but-balanced Napa vintage. Polished, generous, drinking beautifully with another 15+ years.",
  },
  {
    producer: "Promontory",
    vintage: "2018",
    blurb:
      "2018 Promontory: long, cool growing season, considered one of the great recent Napa vintages. Promontory (Bill Harlan's mountain estate) shows wild, brooding, mineral structure built for decades.",
  },
  {
    producer: "Sloan",
    vintage: "2016",
    blurb:
      "2016 Sloan Proprietary Red: top recent vintage at the Rutherford hillside estate. Dense, structured, polished - Martha McClellan's signature.",
  },

  // ---------- Italy ----------
  {
    producer: "Giacomo Conterno",
    vintage: "2013",
    blurb:
      "2013 Monfortino Riserva: classic, cool, traditional Barolo vintage - long, slow ripening, firm tannins. Cascina Francia fruit aged 7+ years in large Slavonian botti. Built for 40+ years.",
  },
  {
    producer: "Tenuta San Guido",
    vintage: "1998",
    blurb:
      "1998 Sassicaia: classic Bolgheri vintage. Fully mature now - cedar, tobacco, Mediterranean herb, the Sassicaia signature in its sweet spot.",
  },
  {
    producer: "Tenuta San Guido",
    vintage: "1999",
    blurb:
      "1999 Sassicaia: ripe, balanced vintage. Drinking in its peak window - savory, perfumed, classically structured.",
  },
  {
    producer: "Tenuta San Guido",
    vintage: "1994",
    blurb:
      "1994 Sassicaia: difficult, rainy vintage; Sassicaia outperformed most of Tuscany. Lighter-framed but elegant, drink now.",
  },
  {
    producer: "Tenuta dell’Ornellaia",
    vintage: "1994",
    blurb:
      "1994 Ornellaia: difficult Bolgheri vintage rescued by site selection. Now mature - savory, Mediterranean, drink soon.",
  },
  {
    producer: "Masseto",
    vintage: "2019",
    blurb:
      "2019 Masseto: outstanding Bolgheri vintage - warm, dry, ideal Merlot ripening on the iconic blue-clay hill. Built for 25+ years.",
  },
  {
    producer: "Biondi-Santi",
    vintage: "2012",
    blurb:
      "2012 Brunello Riserva: classic, structured vintage in Montalcino. Biondi-Santi Riserva only made in top years, aged 6 years in large Slavonian botti. Built for decades.",
  },
  {
    producer: "Antinori",
    vintage: "1997",
    blurb:
      "1997 Solaia: legendary Tuscan vintage, named Wine Spectator's Wine of the Year (2000). Ripe, powerful Cabernet-led Super Tuscan; fully mature and singing.",
  },
  {
    producer: "Gaja",
    vintage: "2008",
    blurb:
      "2008 Sori San Lorenzo: classic, structured Barbaresco vintage. Single-vineyard Nebbiolo from Gaja's flagship cru - perfumed, tarry, decades-long life.",
  },

  // ---------- Champagne / Other ----------
  {
    producer: "Dom Pérignon",
    vintage: "2002",
    blurb:
      "2002 Dom Pérignon: legendary Champagne vintage - perfect growing season, ripe acidity. One of the great Doms, drinking in its first plateau with decades ahead.",
  },
  {
    producer: "Salon",
    vintage: "2013",
    blurb:
      "2013 Salon Cuvée S: only released in declared years from the single Mesnil-sur-Oger plot. 2013 was cool, late, mineral - classic Salon precision and 30+ year life.",
  },
  {
    producer: "Fonseca",
    vintage: "1955",
    blurb:
      "1955 Fonseca Vintage Port: declared, classic vintage. Fully mature - fig, dried orange, walnut, sweet spice. A treasured Douro classic.",
  },
  {
    producer: "Penfolds",
    vintage: "2017",
    blurb:
      "2017 Grange: cooler, classic Barossa/multi-region vintage producing perfumed, structured Grange. Built for 30+ years; the flagship Australian Shiraz.",
  },
  {
    producer: "Marcassin",
    vintage: "2010",
    blurb:
      "2010 Marcassin Vineyard Chardonnay: cool, late Sonoma Coast vintage. Helen Turley's tiny estate above the Pacific - concentrated, mineral, decades of life.",
  },
];

export const WINE_VINTAGE_LOOKUP = new Map<string, string>(
  WINE_VINTAGE_NOTES.map((n) => [`${n.producer}|${n.vintage}`, n.blurb]),
);
