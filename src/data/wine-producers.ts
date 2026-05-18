/**
 * Producer-level glossary for the wine list. Renders as a hover blurb on the
 * producer name in WineCard. Producer-focused only - no grape/style/varietal
 * commentary (that lives elsewhere or on the bottle). Detail scales with
 * price tier. Top-tier entries are web-sourced from each producer's own
 * site, Wikipedia, Wine Spectator, Decanter, and Wine-Searcher.
 *
 * Match is the exact producer string from wines.json.
 */

export type ProducerEntry = { match: string; blurb: string };

export const WINE_PRODUCERS: ProducerEntry[] = [
  // ───── Tier S: $2000+ (web-sourced) ─────
  {
    match: "Domaine de la Romanee-Conti",
    blurb:
      "DRC. Monopole owner of the Romanée-Conti and La Tâche Grand Cru vineyards in Vosne-Romanée, plus holdings in Richebourg, Romanée-Saint-Vivant, Échezeaux, Grands-Échezeaux, Corton, and a sliver of Le Montrachet. Co-managed for decades by Aubert de Villaine (stepped down in 2022) and the Leroy/Roch family. Allocation-only - no commercial sales channel.",
  },
  {
    match: "Château Petrus",
    blurb:
      "Pomerol's reference estate, just over 11 hectares on the appellation's blue-clay plateau, owned by the Moueix family. Famously no second wine and no formal classification - Pomerol has none. Tiny annual production, hand-harvested in a single pass.",
  },
  {
    match: "Château Haut-Brion",
    blurb:
      "First-Growth estate in Pessac-Léognan, the only First Growth outside the Médoc. Documented to 1525; owned by the Dillon family (Domaine Clarence Dillon) since 1935. Sits on gravel-mound terroir surrounded by the Bordeaux suburbs.",
  },
  {
    match: "Screaming Eagle",
    blurb:
      "Founded by realtor Jean Phillips on a 57-acre Oakville hillside; first commercial vintage 1992. Sold in 2006 to Stan Kroenke and Charles Banks. A 6-litre 1992 sold for $500,000 at the 2000 Napa Valley Auction. Tiny production, mailing list with a years-long waitlist.",
  },
  {
    match: "Sine Qua Non",
    blurb:
      "Founded 1994 by Austrian-born Manfred Krankl and his wife Elaine, based in Oak View, Ventura County. Latin for 'without which, nothing.' Four estate vineyards (Eleven Confessions, Cumulus, Bien Nacido, etc.), each release with its own name, label, and bottle shape. Mailing list only.",
  },
  {
    match: "Harlan Estate",
    blurb:
      "Founded 1984 by Bill Harlan on a 240-acre property in the western hills of Oakville; about 40 acres planted. Bill Harlan stated a 200-year plan for the estate. Same family also owns Bond and Promontory. First commercial vintage 1990, released 1996.",
  },
  {
    match: "Silver Oak",
    blurb:
      "Founded 1972 by Justin Meyer and Ray Duncan, with cellars in Oakville (Napa) and Geyserville (Sonoma/Alexander Valley). Owned by the Duncan family. House signature is exclusive use of American oak and a five-year minimum age before release.",
  },
  {
    match: "Tusk",
    blurb:
      "Tiny mailing-list project from Michael and Lindy Weiss in collaboration with winemaker Philippe Melka. Pritchard Hill–sourced; first vintage 2008. Numbered bottles; allocation only.",
  },
  {
    match: "Château Latour",
    blurb:
      "Pauillac First-Growth on a gravel mound at the southern edge of the commune, overlooking the Gironde. Owned by François Pinault's Artémis group since 1993. Withdrew from the en primeur system in 2012 - now released only when the estate decides the vintage is ready to drink.",
  },
  {
    match: "Schrader",
    blurb:
      "Founded 1998 by Fred Schrader; sources almost entirely from Andy Beckstoffer's To Kalon vineyard in Oakville under block-specific contracts (Old Sparky, Colesworthy, Las Piedras, etc.). Acquired by Constellation Brands in 2017 for a reported $60 million; Fred Schrader stayed on with the brand.",
  },
  {
    match: "Shafer",
    blurb:
      "Founded 1972 by John Shafer in the Stag's Leap District. Long led by son Doug and winemaker Elias Fernandez. Sold to South Korea's Shinsegae Property in 2022; the Shafer family ended its involvement. Hillside Select is the flagship single-block bottling.",
  },
  {
    match: "Giacomo Conterno",
    blurb:
      "Piedmontese estate founded by Giacomo Conterno in the 1920s in Monforte d'Alba; first Monfortino vintage 1924. Bought the Cascina Francia vineyard in Serralunga d'Alba in 1974. Now run by Roberto Conterno, a reference for traditionalist long-aged Barolo.",
  },
  {
    match: "Comte de Vogue",
    blurb:
      "Domaine Comte Georges de Vogüé in Chambolle-Musigny. Owned by the same family since 1450. Largest landholder in the Le Musigny Grand Cru (about 7 of 11 hectares); also significant holdings in Bonnes-Mares and Les Amoureuses.",
  },
  {
    match: "Ridge",
    blurb:
      "Founded 1959 by Stanford Research Institute engineers; the historic Monte Bello vineyard above Cupertino dates to 1885. Paul Draper led winemaking from 1969 to 2016. Famously transparent: every back label lists ingredients and process.",
  },
  {
    match: "Château Lafite-Rothschild",
    blurb:
      "Pauillac First-Growth, owned by the Rothschild family (Domaines Barons de Rothschild) since 1868. Estate runs to over 100 hectares of vineyard; production includes Lafite, second wine Carruades, and the separately run Château Duhart-Milon and L'Évangile.",
  },
  {
    match: "Bond",
    blurb:
      "Founded 1996 by Bill Harlan and Bob Levy of Harlan Estate; first commercial release 1999. Five Napa hillside 'crus' (Melbury, St. Eden, Vecina, Pluribus, Quella), each bottled separately. BOND doesn't own the vineyards - long-term evergreen contracts with five sites selected from 100+ candidates. Run by Will Harlan since 2020.",
  },
  {
    match: "Château La Mission Haut-Brion",
    blurb:
      "Pessac-Léognan estate directly across the road from Haut-Brion. Owned by Domaine Clarence Dillon (the Dillon family) since 1983, run as a sister estate to Haut-Brion.",
  },
  {
    match: "Promontory",
    blurb:
      "Harlan family project on a 100-acre mountain estate west of Oakville; Will Harlan launched it commercially in the 2010s. Three distinct soil types in a single canyon; intentionally rustic style, released years after vintage.",
  },
  {
    match: "Domaine des Comtes Lafon",
    blurb:
      "Meursault estate, run by Dominique Lafon since the 1980s. Holdings across the village's Premier Crus (Genevrières, Charmes, Perrières, Goutte d'Or) and a small parcel of Le Montrachet. Biodynamic since the late 1990s.",
  },
  {
    match: "Opus One",
    blurb:
      "Joint venture announced in 1979 between Robert Mondavi and Baron Philippe de Rothschild (Mouton); first vintage 1979, first release 1984. After Mondavi's 2004 sale to Constellation, ownership is shared between Constellation and Baron Philippe de Rothschild SA. One wine made each year.",
  },
  {
    match: "Sloan",
    blurb:
      "Founded 2000 by Seattle retailer Stuart Sloan, a 13-acre Rutherford hillside estate. Sold in 2011 to Chinese investor Sequoia, retaining the original team. Microscopic production.",
  },
  {
    match: "La Mission Haut-Brion",
    blurb:
      "Older library vintages of Château La Mission Haut-Brion in Pessac-Léognan - Dillon-owned since 1983, run as Haut-Brion's sister estate across the road.",
  },
  {
    match: "DANA Estates",
    blurb:
      "Rutherford estate founded 2005 by Hi Sang Lee; multiple single-vineyard Napa bottlings (Helms, Hershey, Lotus) made by Cameron Vawter with Philippe Melka consulting.",
  },
  {
    match: "Stag’s Leap Wine Cellars",
    blurb:
      "Founded 1972 by Warren Winiarski. Best known for being the Napa Cabernet that beat Bordeaux First Growths in the 1976 Judgment of Paris. Sold in 2007 to a partnership between Ste. Michelle Wine Estates (US) and Marchesi Antinori (Italy).",
  },
  {
    match: "Salon",
    blurb:
      "Champagne house founded by Eugène-Aimé Salon in Le Mesnil-sur-Oger; first commercial vintage 1921. Single grape (Chardonnay), single village (Le Mesnil), and only declared in vintages Salon deems exceptional - roughly four per decade. Part of the Laurent-Perrier group since 1989.",
  },
  {
    match: "Domaine du Clos de Tart",
    blurb:
      "A 7.5-hectare Morey-Saint-Denis Grand Cru monopole. Owned by Cistercian nuns from 1141 until the Marey-Monge family in 1791, then the Mommessin family from 1932 to 2017, when it was sold to François Pinault (Artémis).",
  },
  {
    match: "Château Mouton-Rothschild",
    blurb:
      "Pauillac estate owned by the Rothschild family since 1853, promoted to First Growth in 1973 - the only revision to the 1855 Médoc classification. Famous for commissioning a different artist for each vintage label since 1945 (Picasso, Bacon, Warhol, Koons, et al.).",
  },
  {
    match: "Château Margaux",
    blurb:
      "First-Growth in the Margaux commune, owned by the Mentzelopoulos family since 1977; led for decades by Corinne Mentzelopoulos. Norman Foster–designed cellar opened in 2015.",
  },
  {
    match: "Château Leoville-Las Cases",
    blurb:
      "Saint-Julien Second-Growth, owned by the Delon family (also Potensac and Nénin in Pomerol). The estate's Grand Vin vineyard sits just over the wall from Château Latour. Long considered a 'super second.'",
  },
  {
    match: "Marcassin",
    blurb:
      "Founded 1990 by Helen Turley and her husband John Wetlaufer; Helen also long-consulted at Bryant Family, Colgin, Martinelli, and others. Estate vineyard on a high Sonoma Coast ridge; a dedicated winery building opened in Windsor in the 2010s. Mailing list only, tiny production.",
  },
  {
    match: "Domaine Coche-Dury",
    blurb:
      "Meursault domaine - Jean-François Coche took over from his father Léon in 1972 and built the modern reputation; the estate has been run by his son Raphaël Coche since the 2010s. Tiny production, allocation-only.",
  },
  {
    match: "Fonseca",
    blurb:
      "Vintage Port house in the Douro, founded 1815. Part of The Fladgate Partnership (alongside Taylor's and Croft) since 1948. Vintage Port declared only in top years, roughly three per decade.",
  },
  {
    match: "Masseto",
    blurb:
      "Single Merlot wine first made in 1986, from a 7-hectare clay hillside originally part of Tenuta dell'Ornellaia. Owned by the Frescobaldi family since the early 2000s; now bottled at a dedicated Masseto cellar opened in 2018.",
  },
  {
    match: "Abreu",
    blurb:
      "Personal label of vineyard manager David Abreu, who farms many of Napa's most famous cult sites. Bottles tiny lots from selected hillside vineyards (Madrona Ranch, Thorevilos, Cappella, Las Posadas). Mailing list only.",
  },
  {
    match: "Dom Pérignon",
    blurb:
      "Prestige cuvée of Moët & Chandon (Champagne, LVMH). Vintage-only - Moët declares Dom Pérignon only in years deemed worthy, roughly four per decade. P2 designates an extended second-plenitude release, aged longer on lees before disgorgement.",
  },
  {
    match: "Freemark Abbey",
    blurb:
      "St. Helena estate, founded by Josephine Tychson in 1886 (one of the first women to own a California winery). Reorganized in 1967; sold to Jess Jackson in 2006 and remains part of the Jackson Family portfolio. Bosche is the long-running single-vineyard Cabernet.",
  },
  {
    match: "Staglin",
    blurb:
      "Rutherford estate founded 1985 by Garen and Shari Staglin; certified organic and biodynamic. Best known outside wine for the Music Festival for Mental Health hosted on the property.",
  },
  {
    match: "Pierre-Yves Colin-Morey",
    blurb:
      "Côte de Beaune domaine and small négoce founded by Pierre-Yves Colin (son of Marc Colin) and Caroline Morey (daughter of Jean-Marc Morey) in 2005, based in Chassagne-Montrachet. House signature is long élevage in 350L barrels and low sulfur.",
  },
  {
    match: "Biondi-Santi",
    blurb:
      "Montalcino estate credited with inventing the modern Brunello category - Ferruccio Biondi-Santi bottled the first single-variety Sangiovese Grosso here in 1888. Acquired by France's EPI group (Charles Heidsieck, Piper-Heidsieck) in 2017.",
  },
  {
    match: "Tenuta San Guido",
    blurb:
      "Bolgheri estate of the Incisa della Rocchetta family. Mario Incisa della Rocchetta planted Cabernet here in the 1940s when it was unheard of in coastal Tuscany; Sassicaia was first released commercially in 1968, eventually gaining its own DOC (Bolgheri Sassicaia) in 1994.",
  },
  {
    match: "Château Pichon-Longueville Baron",
    blurb:
      "Pauillac Second-Growth, immediately south of Château Latour. Owned by AXA Millésimes since 1987.",
  },

  // ───── Tier A: $1000–2000 ─────
  {
    match: "Gaja",
    blurb:
      "Piedmontese estate, fifth-generation, run since the 1960s by Angelo Gaja - credited with modernizing Barbaresco, introducing French oak and single-vineyard bottlings to the region, and adding holdings in Brunello (Pieve Santa Restituta) and Bolgheri (Ca' Marcanda). Now led by daughters Gaia and Rossana.",
  },
  {
    match: "Château Palmer",
    blurb:
      "Margaux Third-Growth, owned today by the descendants of the Sichel and Mähler-Besse families. Certified biodynamic since 2014. Long considered a 'super second' performer.",
  },
  {
    match: "Penfolds",
    blurb:
      "South Australian house founded 1844 by Dr. Christopher Penfold. Owned by Treasury Wine Estates. Max Schubert created the first Grange (then 'Grange Hermitage') in 1951 - now Australia's most collected wine.",
  },
  {
    match: "Dalla Valle",
    blurb:
      "Oakville hillside estate founded 1986 by Gustav and Naoko Dalla Valle. After Gustav's death in 1995, Naoko ran the estate; daughter Maya took over winemaking in the 2010s with Andy Erickson consulting.",
  },
  {
    match: "Antinori",
    blurb:
      "Florentine wine house traceable to 1385; 26 generations under family ownership. Created Tignanello (1971) and Solaia, founded Guado al Tasso in Bolgheri, and is a co-owner of Antica Napa Valley and (with Ste. Michelle) Stag's Leap Wine Cellars. Led by Albiera, Allegra, and Alessia Antinori.",
  },
  {
    match: "Colgin",
    blurb:
      "Founded 1992 by Ann Colgin in St. Helena. Vineyards on Tychson Hill and IX Estate (Pritchard Hill). LVMH acquired a majority stake in 2017; Ann Colgin remains involved.",
  },
  {
    match: "Tenuta dell’Ornellaia",
    blurb:
      "Bolgheri estate founded 1981 by Lodovico Antinori (brother of Marchese Piero Antinori). Owned by Frescobaldi since 2005. Produces Ornellaia, the white Ornellaia Bianco, and the separately bottled Masseto.",
  },
  {
    match: "PerUs",
    blurb:
      "Pritchard Hill mailing-list Cabernet project, winemaking by Philippe Melka. Microscopic production.",
  },
  {
    match: "Bella Oaks",
    blurb:
      "Historic Rutherford vineyard (long farmed for Heitz, where it had its own bottling from 1976 to 2009) relaunched as its own label by the Maples family with winemaker Maayan Koschitzky of Atelier Melka.",
  },
  {
    match: "Spottswoode",
    blurb:
      "St. Helena estate founded in its modern form in 1972 when Mary and Jack Novak bought the historic 1882 property. Run by Mary and her daughters Beth and Lindy after Jack's death in 1977; certified organic since 1992 and biodynamic since 2017.",
  },
  {
    match: "Domaine Vincent Dauvissat",
    blurb:
      "Chablis domaine led by Vincent Dauvissat (since 1989, succeeding his father René). Biodynamic farming, neutral old oak; about 12 hectares including Grand Cru Les Clos and Les Preuses.",
  },
  {
    match: "Diamond Creek",
    blurb:
      "Founded 1968 by Al and Boots Brounstein on Diamond Mountain - the first Napa winery to bottle hillside parcels separately (Volcanic Hill, Red Rock Terrace, Gravelly Meadow, Lake). Family-run; now led by daughter-in-law Phil Steinschriber's successor team.",
  },
  {
    match: "Château Lynch-Bages",
    blurb:
      "Pauillac Fifth-Growth owned by the Cazes family since 1939; today led by Jean-Charles Cazes. Famously outperforms its 1855 classification.",
  },
  {
    match: "Accendo",
    blurb:
      "Project launched 2013 by Bart and Daphne Araujo after selling Eisele Vineyard to François Pinault. Sourced from selected Oakville and St. Helena fruit; Tony Biagi winemaking, Michel Rolland consulting.",
  },
  {
    match: "Ovid",
    blurb:
      "Pritchard Hill estate founded 1998 by Mark Nelson and Dana Johnson, first commercial vintage 2005. Acquired in 2017 by Duncan Family Vineyards (Silver Oak).",
  },
  {
    match: "Domaine de Montille",
    blurb:
      "Volnay-based domaine traceable to the 18th century. Hubert de Montille led from the 1950s; his children Etienne and Alix de Montille run the estate today. Holdings across Volnay, Pommard, Beaune, Nuits-Saint-Georges, Corton, and Vosne-Romanée.",
  },
  {
    match: "Château Leoville-Poyferre",
    blurb:
      "Saint-Julien Second-Growth, owned by the Cuvelier family since 1920 and led for decades by Didier Cuvelier.",
  },
  {
    match: "Pulido-Walker",
    blurb:
      "Mailing-list project from Mark Pulido and Cori Walker. Yountville (Panek Vineyard) and Mt. Veeder (Melanson Vineyard) Cabernet, Thomas Brown winemaking.",
  },
  {
    match: "Domaine François Raveneau",
    blurb:
      "Chablis domaine founded by François Raveneau in 1948 by combining the Dauvissat and Raveneau family vineyards. Now run by his sons Bernard and Jean-Marie and grandson Isabelle. Tiny production, hand-allocated.",
  },
  {
    match: "The Maiden",
    blurb:
      "Second wine of Harlan Estate - declassified barrels from the Oakville hillside estate, made by the Harlan team and released under a separate label.",
  },
  {
    match: "Château Pichon-Longueville Comtesse de Lalande",
    blurb:
      "Pauillac Second-Growth ('Pichon Lalande'), owned by the Rouzaud family of Champagne Louis Roederer since 2007.",
  },
  {
    match: "Joseph Phelps",
    blurb:
      "Napa pioneer founded 1973 by Joe Phelps. Created Insignia in 1974 - California's first proprietary Bordeaux-style blend. Acquired by LVMH's Moët Hennessy in 2022.",
  },
  {
    match: "Guiseppe Quintarelli",
    blurb:
      "(Variant spelling of Giuseppe Quintarelli.) Cult Valpolicella estate in Negrar - Giuseppe Quintarelli ran the estate until his death in 2012; now led by his children and grandchildren. Releases delayed by a decade or more.",
  },
  {
    match: "Domaine Anne Gros",
    blurb:
      "Vosne-Romanée domaine, fourth-generation. Anne Gros took over from her father François in 1988; holdings in Clos Vougeot, Richebourg, and Échezeaux Grand Cru.",
  },
  {
    match: "Crissante Alessandria",
    blurb:
      "La Morra family estate, fourth-generation, bottling single-vineyard Barolo from Capalot and Galina cru sites.",
  },
  {
    match: "Cardinale",
    blurb:
      "Jackson Family Wines project (since 1982) - a single annual Napa Cabernet blended from estate fruit across multiple mountain sites in Howell, Veeder, Diamond, and Spring Mountain.",
  },
  {
    match: "Edmond Vatan",
    blurb:
      "Tiny family Sancerre estate in Chavignol. Edmond Vatan continued under his daughter Anne Vatan after his retirement in 2004. Cult library releases trade at Grand Cru Burgundy prices.",
  },
  {
    match: "Heitz Cellar",
    blurb:
      "St. Helena estate founded 1961 by Joe and Alice Heitz. Sold by the Heitz family in 2018 to Gaylon Lawrence Jr., who also acquired neighboring Burgess and Stony Hill. Long-running single-vineyard bottlings include Martha's, Bella Oaks, and Trailside.",
  },
  {
    match: "Taittinger",
    blurb:
      "Reims Champagne house founded 1932 by Pierre Taittinger. Briefly part of Starwood Capital (2005); bought back by the Taittinger family in 2006. Vitalie Taittinger is President. Comtes de Champagne is the prestige cuvée.",
  },
  {
    match: "Domaine Jean-Claude Ramonet",
    blurb:
      "Chassagne-Montrachet domaine; the modern reference set by Jean-Claude Ramonet's father André Ramonet from the 1930s. Holdings across Premier Crus Morgeot, Ruchottes, Vergers, plus Le Montrachet, Bâtard-Montrachet, and Bienvenues-Bâtard-Montrachet.",
  },
  {
    match: "Realm",
    blurb:
      "Founded 2002 by Juan Mercado, now a mailing-list cult. Single-vineyard Napa Cabernets and proprietary blends, including bottlings from Beckstoffer Dr. Crane and To Kalon.",
  },
  {
    match: "Lokoya",
    blurb:
      "Jackson Family Wines mountain-only project - separate single-mountain Cabernet bottlings from Mt. Howell, Mt. Veeder, Diamond Mountain, and Spring Mountain.",
  },
  {
    match: "MacDonald",
    blurb:
      "Family-farmed Cabernet from the MacDonald brothers' single estate parcel inside the historic To Kalon vineyard in Oakville - vines planted by their grandfather in 1954. Microscopic production.",
  },
  {
    match: "Tenuta di Trinoro",
    blurb:
      "Southern Tuscan estate founded by Andrea Franchetti in the 1990s near Sarteano; high-elevation Bordeaux-variety plantings outside any major DOC. Franchetti also founded Passopisciaro on Mt. Etna. After his death in 2021, the estate continues under his family.",
  },
  {
    match: "Château Beychevelle",
    blurb:
      "Saint-Julien Fourth-Growth co-owned since 2011 by France's Castel group and Japan's Suntory. Famous for the 'striking sails' label tied to an estate legend about ships lowering their sails passing the property.",
  },
  {
    match: "Château Gruaud Larose",
    blurb:
      "Saint-Julien Second-Growth, one of the largest classed-growth estates in the Médoc. Owned by the Merlaut family (Taillan Group) since 1997.",
  },

  // ───── Tier B: $500–1000 ─────
  {
    match: "Vine Hill Ranch",
    blurb:
      "Phillips-family Oakville vineyard (planted 1959); long a sought-after fruit source for top Napa labels. Estate label launched in 2008 by Bruce Phillips.",
  },
  {
    match: "Château Cos d’Estournel",
    blurb:
      "Saint-Estèphe Second-Growth, owned by Michel Reybier since 2000. The Indian-pagoda-style château is one of the most recognizable buildings in Bordeaux.",
  },
  {
    match: "Dominus",
    blurb:
      "Founded 1982 by Christian Moueix (of Petrus) at the historic Napanook vineyard in Yountville. Wholly owned by the Moueix family since 1995. Herzog & de Meuron–designed winery opened in 1997.",
  },
  {
    match: "Philip Togni",
    blurb:
      "Spring Mountain estate run by Philip Togni since 1983 - a veteran winemaker who also worked at Mayacamas, Chappellet, Cuvaison, and Chalone. Daughter Lisa Togni now runs day-to-day operations.",
  },
  {
    match: "Giuseppe Mascarello",
    blurb:
      "Castiglione Falletto family estate; Monprivato is its monopole cru in the village. Run since the 1980s by Mauro Mascarello, with his son Giuseppe today.",
  },
  {
    match: "Valdicava",
    blurb:
      "Montalcino estate run by Vincenzo Abbruzzese (grandson of founder Bramante Martini). Single annual Brunello and a Madonna del Piano Riserva.",
  },
  {
    match: "Domaine Latour-Giraud",
    blurb:
      "Meursault domaine led by siblings Jean-Pierre and Florence Latour. Largest holding (around 2.5 ha) in Meursault Genevrières.",
  },
  {
    match: "Hourglass",
    blurb:
      "Calistoga estate founded 1992 by Jeff Smith on his family's historic St. Helena property. HG III is a separate Blueline Estate site farther north.",
  },
  {
    match: "Marcassin. Marcassin Vineyard",
    blurb:
      "(Same as Marcassin - Helen Turley and John Wetlaufer's Sonoma Coast estate. Allocation only.)",
  },
  {
    match: "Continuum",
    blurb:
      "Founded 2005 by Tim Mondavi and his family after Robert Mondavi Winery was sold to Constellation. Estate property on Pritchard Hill; one wine made each year. Fourth- and fifth-generation Mondavis from the Cesare Mondavi lineage.",
  },
  {
    match: "Roberto Voerzio",
    blurb:
      "La Morra estate founded 1986 by Roberto Voerzio after splitting from his brother Gianni. Holdings include cru sites Brunate, La Serra, Cerequio, and Rocche dell'Annunziata.",
  },
  {
    match: "Louis Roederer",
    blurb:
      "Family-owned Champagne house since 1776 (the Rouzaud family today). Cristal was created in 1876 at the request of Tsar Alexander II of Russia, who wanted a clear, leaded-crystal bottle with a flat bottom.",
  },
  {
    match: "Alpha Omega",
    blurb:
      "Rutherford estate founded 2006 by Robin and Michelle Baggett; winemaking by Jean Hoefliger (with Michel Rolland consulting on early vintages). ERA is the flagship.",
  },
  {
    match: "Caymus",
    blurb:
      "Rutherford estate founded 1972 by Charlie Wagner and his son Chuck. Still owned by the Wagner family, which also runs Mer Soleil, Conundrum, and Belle Glos. Special Selection debuted in 1975.",
  },
  {
    match: "Plumpjack",
    blurb:
      "Oakville estate founded in the 1990s by Gavin Newsom and Gordon Getty. Famously the first to release a premium Napa Cabernet under screwcap closure (2000 vintage).",
  },
  {
    match: "Roagna",
    blurb:
      "Family estate dating to 1880 with vineyards in Barbaresco (Pajè, Asili, Pira, Crichet Pajè) and Barolo (La Pira in Castiglione Falletto). Now led by Luca Roagna.",
  },
  {
    match: "Oasi degli Angeli",
    blurb:
      "Marche estate of Marco Casolanetti and Eleonora Rossi; first vintage of cult bottling Kurni was 1997. Tiny production, late-harvest and aged in new oak.",
  },
  {
    match: "Château Lascombes",
    blurb:
      "Margaux Second-Growth, one of the largest classed-growth estates. Owned since 2022 by the Lawrence family (also Heitz Cellar and Burgess).",
  },
  {
    match: "Château L’Eglise-Clinet",
    blurb:
      "Tiny Pomerol estate (about 6 ha). The late Denis Durantou established its modern reputation; his daughters Constance and Noémie now run the estate.",
  },
  {
    match: "Vieux Château Certan",
    blurb:
      "Pomerol estate owned by the Thienpont family since 1924; today led by Alexandre Thienpont and his son Guillaume. One of the oldest estates on the Pomerol plateau, neighbor to Petrus.",
  },
  {
    match: "Michel Fallon",
    blurb:
      "Grower-producer Champagne house based in Avize on the Côte des Blancs.",
  },
  {
    match: "Bruno Rocca",
    blurb:
      "Barbaresco family estate founded by Bruno Rocca in 1958; now led by his children Francesco and Luisa. Single-vineyard Rabajà is the flagship.",
  },
  {
    match: "The Mascot",
    blurb:
      "Personal project of Will Harlan (Bill Harlan's son) - declassified barrels from the Harlan, Bond, and Promontory vineyards, blended into a single Napa Cabernet released under its own label.",
  },
  {
    match: "Antica Terra",
    blurb:
      "Yamhill County (Oregon) estate established 1989 by a group of investors; led by winemaker Maggie Harrison (ex–Sine Qua Non) since 2005. Fossil-rich limestone-and-basalt site near Amity.",
  },
  {
    match: "Château L’Evangile",
    blurb:
      "Pomerol estate adjacent to Petrus and Cheval Blanc. Owned by Domaines Barons de Rothschild (Lafite) since 1990.",
  },
  {
    match: "Armand de Brignac",
    blurb:
      "The 'Ace of Spades' Champagne - produced by the Cattier family in Chigny-les-Roses. A 50/50 stake was acquired by Jay-Z in 2014; in 2021 LVMH bought a 50% stake from him, and the brand is now jointly held.",
  },
  {
    match: "Paul Hobbs",
    blurb:
      "California winemaker (founded 1991) and Argentine pioneer (Viña Cobos). Consults for many estates; his eponymous Sonoma label bottles single-vineyard Napa and Sonoma Cabernet, Chardonnay, and Pinot Noir.",
  },
  {
    match: "Lithology",
    blurb:
      "Howell Mountain Cabernet project with Thomas Brown winemaking. Mailing list only.",
  },
  {
    match: "Château Ducru-Beaucaillou",
    blurb:
      "Saint-Julien Second-Growth, owned by the Borie family since 1941. 'Beaucaillou' refers to the large pebbles in the estate's gravelly soils.",
  },
  {
    match: "Château Giscours",
    blurb:
      "Margaux Third-Growth, owned by the Tari family in the 20th century and by Dutch businessman Eric Albada Jelgersma's family today.",
  },
  {
    match: "Littorai",
    blurb:
      "Sebastopol-based estate founded 1993 by Ted Lemon (one of the first American winemakers to work in Burgundy, at Domaine Roulot) and his wife Heidi. Biodynamic; single-vineyard Sonoma Coast and Anderson Valley Pinot Noir and Chardonnay.",
  },
  {
    match: "Sire",
    blurb:
      "Boutique Napa Cabernet project with a microscopic mailing-list release.",
  },
  {
    match: "Jerome Prevost",
    blurb:
      "Grower-Champagne micro-cult based in Gueux. Jérôme Prévost makes a single wine, La Closerie, from his 2.2-hectare parcel of mostly Pinot Meunier, vinified in old barrels with minimal intervention.",
  },
  {
    match: "Krug",
    blurb:
      "Reims Champagne house founded 1843 by Joseph Krug. Owned by LVMH since 1999; sixth-generation Krug family member Olivier Krug remains as director of the house. Grande Cuvée is blended from 120+ reserve wines spanning a decade or more.",
  },
  {
    match: "Ulysse Collin",
    blurb:
      "Olivier Collin's grower-Champagne house in Congy (Coteaux du Petit Morin), reclaimed from a sharecropping arrangement in 2003. Single-parcel cuvées, very low dosage.",
  },
  {
    match: "Haynes Vineyard",
    blurb:
      "Historic Coombsville vineyard planted in 1966 by Duncan Haynes - long a fruit source for top California Chardonnay programs. The Haynes family bottles a small estate label.",
  },
  {
    match: "Bergman",
    blurb:
      "Tiny Napa Cabernet project bottling a proprietary red. Allocation only.",
  },
  {
    match: "Pahlmeyer",
    blurb:
      "Napa estate founded 1986 by attorney Jayson Pahlmeyer. Helen Turley made the early Chardonnays. Sold to Gallo in 2019.",
  },
  {
    match: "AXR",
    blurb:
      "Howell Mountain–rooted Napa estate named after the AXR-1 grapevine rootstock that famously fell to phylloxera in the 1980s.",
  },
  {
    match: "Ciacci Piccolomini",
    blurb:
      "Montalcino estate in Castelnuovo dell'Abate, owned for centuries by the Piccolomini d'Aragona family, then by the Bianchini family since 1985. Pianrosso Riserva is the flagship.",
  },
  {
    match: "Poggio di Sotto",
    blurb:
      "Cult south-Montalcino estate founded 1989 by Piero Palmucci; sold in 2011 to ColleMassari (Claudio Tipa). Traditional, long-aged Brunello.",
  },
  {
    match: "Château Figeac",
    blurb:
      "Saint-Émilion estate, owned by the Manoncourt family since 1892. Promoted in 2022 to Saint-Émilion Premier Grand Cru Classé 'A,' the highest tier of the Saint-Émilion classification.",
  },

  // ───── Tier B / lower-B: $550–700 ─────
  { match: "ADAMVS", blurb: "Howell Mountain estate founded by Stephen and Denise Adams; certified organic and biodynamic." },
  { match: "Quintessa", blurb: "Rutherford estate founded 1990 by Chilean vintner Agustin Huneeus and his wife Valeria. Biodynamic-farmed amphitheater of vineyards. One annual red." },
  { match: "Peter Michael", blurb: "Knights Valley estate founded in the 1980s by British engineer-entrepreneur Sir Peter Michael. Family-owned; single-block Chardonnay and Bordeaux-blend reds." },
  { match: "Brand", blurb: "Pritchard Hill Cabernet project, tiny production." },
  { match: "La Jota Vineyard", blurb: "Howell Mountain estate dating to 1898 (founded by Frederick Hess). Now part of Jackson Family Wines." },
  { match: "Fait-Main", blurb: "Tiny boutique Napa Cabernet project." },
  { match: "Passopisciaro", blurb: "Etna estate founded 2000 by Andrea Franchetti on the volcano's north slope; first US-style contrada bottlings (Chiappemacine, Porcaria, Rampante, Sciaranuova, Guardiola). Continues under his family after his death in 2021." },
  { match: "Clos des Papes", blurb: "Châteauneuf-du-Pape estate run by the Avril family since the 19th century; Vincent Avril today. One red and one white blend each year, both estate-grown across multiple parcels." },
  { match: "Rostaing", blurb: "Côte-Rôtie domaine founded 1971 by René Rostaing, now led by his son Pierre Rostaing." },
  { match: "Taylor Fladgate", blurb: "Vintage Port house in the Douro, founded 1692. Part of The Fladgate Partnership (alongside Fonseca and Croft)." },
  { match: "Poderi Colla", blurb: "Family-run Langhe estate founded 1993 by Beppe Colla and his brother Tino, after Beppe sold the historic Prunotto name. Now run by Beppe's daughter Federica and Tino's son Pietro." },
  { match: "CIRQ", blurb: "Russian River Pinot Noir project founded by Michael Browne after he sold Kosta Browne in 2009." },
  { match: "Amuse Bouche", blurb: "Pritchard Hill Merlot-led project from Heidi Barrett and John Schwartz, first vintage 2002. Tiny production." },
  { match: "Bedrock Wine Co.", blurb: "Sonoma project founded 2007 by Morgan Twain-Peterson (son of Joel Peterson of Ravenswood). Specialty is bottling historic California field-blend vineyards including the namesake Bedrock and Evangelho." },
  { match: "Château Montelena", blurb: "Calistoga estate, founded 1882 by Alfred Tubbs; reorganized in 1968 by Jim Barrett. The 1973 Chardonnay won the white tasting at the 1976 Judgment of Paris. Still family-owned." },
  { match: "Brilliant Mistake", blurb: "Boutique Napa Cabernet project with a small mailing-list release." },
  { match: "Frank Family", blurb: "Calistoga estate founded 1992 by former Disney studio chief Rich Frank. Sold to Treasury Wine Estates in 2022." },
  { match: "Scarecrow", blurb: "Rutherford estate built around vines planted in 1945 by Hollywood producer J.J. Cohn (whose credits include 'The Wizard of Oz'). First commercial vintage 2003; tiny production, mailing list only." },
  { match: "La Spinetta", blurb: "Piedmontese estate built by Giorgio Rivetti from a family Moscato producer into a Barbera/Barbaresco/Barolo powerhouse. The rhinoceros label is from an Albrecht Dürer engraving." },
  { match: "Château Phelan Segur", blurb: "Saint-Estèphe estate classified Cru Bourgeois Exceptionnel. Sold in 2018 by the Gardinier family to Belgian group Compagnie du Vin." },

  // ───── Tier C: $325–525 ─────
  { match: "Paul Bara", blurb: "Grower-Champagne family in the Grand Cru village of Bouzy, six generations on the same estate." },
  { match: "Elvio Cogno", blurb: "Novello (Barolo) estate founded 1990 by Elvio Cogno after leaving Marcarini. Now run by his son-in-law Valter Fissore." },
  { match: "Luciano Sandrone", blurb: "La Morra estate founded 1978 by Luciano Sandrone. Still family-run; his daughter Barbara and brother Luca involved." },
  { match: "Aubert", blurb: "Napa/Sonoma estate founded by Mark Aubert (formerly of Peter Michael) in 1999. Mailing list only." },
  { match: "Anne Boisson-Vadot", blurb: "Tiny Meursault-based domaine; Anne Boisson is the daughter of Bernard Boisson-Vadot. Family monopole in Meursault Les Chevalières." },
  { match: "Eisele Vineyard", blurb: "Historic Calistoga vineyard farmed in turn for Joseph Phelps (the Eisele bottling) and the Araujo family (1990–2013). Owned by François Pinault (Artémis) since 2013, who restored the original Eisele Vineyard name." },
  { match: "Kapcsandy", blurb: "Yountville estate founded 2000 by Hungarian-born Lou Kapcsandy and his family. First commercial vintage 2005." },
  { match: "Ad Vivum", blurb: "Tiny boutique Napa Cabernet project. Allocation only." },
  { match: "Siro Pacenti", blurb: "Montalcino estate run by Giancarlo Pacenti since the late 1980s." },
  { match: "Paolo Bea", blurb: "Umbrian estate in Montefalco run by the Bea family since the 1500s; modern bottlings led by Giampiero Bea. Natural-wine reference for Sagrantino." },
  { match: "Oasi delgi Angeli", blurb: "(Spelling variant of Oasi degli Angeli - Marche estate of Marco Casolanetti and Eleonora Rossi, makers of Kurni.)" },
  { match: "Tenuta delle Terre Nere", blurb: "Etna estate founded 2002 by Marc de Grazia (a major Italian wine importer); single-contrada bottlings across the volcano's north slope." },
  { match: "Domaine Roulot", blurb: "Meursault domaine led since the 1990s by Jean-Marc Roulot (a working actor who also runs the family estate). Reference for precise lieu-dit-specific Meursault." },
  { match: "Château Smith Haut Lafitte", blurb: "Pessac-Léognan estate owned by the Cathiard family (former Olympic skiers) since 1990; also runs the Les Sources de Caudalie hotel and Caudalíe skincare. Certified organic." },
  { match: "Laurent-Perrier", blurb: "Tours-sur-Marne Champagne house founded 1812; controlled by the Nonancourt family since 1939. Also owns Champagne Salon and Champagne Delamotte." },
  { match: "Morlet", blurb: "Sonoma-based estate founded 2006 by Burgundy-born Luc Morlet (a former winemaker at Newton and Peter Michael) and his wife Jodie." },
  { match: "Domaine Albert Grivault", blurb: "Meursault family estate founded by Albert Grivault in 1879 - celebrated its 140th anniversary in 2019, four generations of continuous family ownership. Monopole owner of Clos des Perrières, a walled parcel inside Premier Cru Perrières that Alexis Lichine famously ranked alongside Montrachet." },
  { match: "David Arthur", blurb: "Pritchard Hill estate founded 1985 by David Arthur Long; his son David Jr. now runs it. Elevation Eleven Eleven is the flagship Cabernet (named for the vineyard's 1,111-ft elevation)." },
  { match: "Fontodi", blurb: "Panzano (Chianti Classico) estate owned by the Manetti family since 1968. Certified organic; Flaccianello is the flagship Sangiovese." },
  { match: "Bouchard Père & Fils", blurb: "Beaune négociant-and-domaine founded 1731 - one of the largest landowners on the Côte d'Or with 130 hectares including 12 ha of Grand Cru. Owned by Champagne Henriot from 1995 until Artémis (François Pinault) acquired Henriot's wine division in 2022." },
  { match: "Fantesca", blurb: "Spring Mountain estate owned by Susan and Duane Hoff (former Best Buy executive). Also bottles a Russian River Chardonnay program." },
  { match: "Au Bon Climat", blurb: "Santa Maria Valley pioneer founded 1982 by Jim Clendenen (d. 2021). Family continues the estate." },
  { match: "Paradigm", blurb: "Oakville estate founded 1976 by Ren and Marilyn Harris; Heidi Barrett has been the winemaker since 1991." },
  { match: "Didier Dagueneau", blurb: "Pouilly-Fumé estate founded by Didier Dagueneau in 1982 - he transformed how Sauvignon Blanc was taken seriously. After his death in a plane crash in 2008, his son Louis-Benjamin took over the domaine." },
  { match: "Kistler", blurb: "Sonoma estate founded 1978 by Steve Kistler and Mark Bixler. Acquired by Bill Price (also of Three Sticks and Durell Vineyard) in 2008; Steve Kistler departed in 2017." },
  { match: "Secret Door", blurb: "Boutique Napa Cabernet project. Allocation only." },
  { match: "Cavallotto", blurb: "Castiglione Falletto traditionalist family estate. The Bricco Boschis monopole has been farmed by the family since 1928." },
  { match: "Caparzo", blurb: "Montalcino estate founded 1965; owned by Elisabetta Gnudi Angelini since 1998. La Casa is the flagship single-vineyard Brunello." },
  { match: "Bibi Graetz", blurb: "Florence-born artist-turned-winemaker. Started bottling under his own name in 2000; works with old-vine Sangiovese from around Fiesole and on the island of Giglio." },
  { match: "Château Leoville-Barton", blurb: "Saint-Julien Second-Growth, owned by the Anglo-Irish Barton family since 1826 - one of the longest continuous family ownerships in Bordeaux." },
  { match: "Château d’Yquem", blurb: "The only estate classified Premier Cru Supérieur in Sauternes (1855). Owned by the Lur-Saluces family for centuries; majority-acquired by LVMH in 1999." },
  { match: "Graham’s", blurb: "Douro Vintage Port house founded 1820 by William and John Graham. Owned by the Symington family (Dow's, Warre's, Cockburn's) since 1970." },
  { match: "Peay", blurb: "Extreme-west Sonoma Coast estate founded 1998 by brothers Andy and Nick Peay with winemaker Vanessa Wong (Nick's wife, formerly of Peter Michael)." },
  { match: "Leonetti Cellar", blurb: "Walla Walla's first commercial winery (1977), founded by Gary Figgins. Still run by the Figgins family." },
  { match: "San Polo", blurb: "Montalcino estate, part of the Allegrini portfolio (Valpolicella) since 2007." },
  { match: "Domaine Genot-Boulanger", blurb: "Meursault-based Côte de Beaune domaine with holdings across Pommard, Volnay, Beaune, and Mercurey." },
  { match: "Benanti", blurb: "Etna estate founded 1988 by Giuseppe Benanti - credited as one of the producers who revived high-altitude Etna viticulture. Now run by sons Antonio and Salvino." },
  { match: "A. Rafanelli", blurb: "Dry Creek Valley estate dating to 1911; the Rafanelli family farms about 50 acres of estate vineyard. Wines sold mostly direct from the winery." },
  { match: "Kenzo", blurb: "Mountainous Napa estate owned by Capcom video-game co-founder Kenzo Tsujimoto; David Abreu farming, Heidi Barrett winemaking from launch." },
  { match: "Mowe", blurb: "Boutique Napa Cabernet project, mailing list only." },
  { match: "Simon Family Estate", blurb: "Small Napa estate with a tiny annual Cabernet release." },
  { match: "Bertani", blurb: "Veneto house founded 1857 by the Bertani brothers in Valpolicella. Acquired by Tenimenti Angelini (now Bertani Domains) in 2012. Library Amarone releases held for decades before sale." },
  { match: "Giuseppe Quintarelli", blurb: "Cult Valpolicella estate founded by Giuseppe Quintarelli (1927–2012) in Negrar. Now run by his daughter Fiorenza and her family. Releases delayed a decade or more." },
  { match: "Domaine de L’Arlot", blurb: "Premeaux-Prissey (Nuits-Saint-Georges) estate owned by AXA Millésimes since 1987. Clos de l'Arlot is the family monopole." },
  { match: "Château Monbousquet", blurb: "Saint-Émilion Grand Cru Classé, owned by Gérard Perse (also Château Pavie) since 1993." },
  { match: "Stonestreet", blurb: "Alexander Valley estate within Jackson Family Wines. High-elevation mountain blocks farmed for Chardonnay and Cabernet." },
  { match: "Kongsgaard", blurb: "Napa estate of John and Maggy Kongsgaard, founded 1996. John was previously winemaker at Newton. Family-farmed hillside fruit; tiny production." },
  { match: "TOR", blurb: "Napa label founded by Tor Kenward in 2001 after decades at Beringer. Single-vineyard Chardonnay and Cabernet from Beckstoffer To Kalon, Beresini, Hyde, and other top sites." },
  { match: "La Jota", blurb: "(Same as La Jota Vineyard - Howell Mountain estate dating to 1898, now Jackson Family Wines.)" },
];

export const WINE_PRODUCER_LOOKUP = WINE_PRODUCERS.map((p) => ({
  match: p.match,
  entry: { blurb: p.blurb },
})).sort((a, b) => b.match.length - a.match.length);
