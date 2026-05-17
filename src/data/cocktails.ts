/**
 * Bottega cocktail spec data — source of truth for the Bar Program tab.
 *
 * Hand-edit this file freely. Schema is defined in `src/lib/cocktails.ts`
 * (`Cocktail` type). Each entry must have a unique `id` (kebab-case slug).
 *
 * Conventions:
 *  - `aLaMinute` / `batched`: one line per array entry, in build order.
 *    Leave the array empty if that build is not applicable.
 *  - `ingredients`: only include entries that have an explanatory note.
 *    Plain "1.0 Lemon Juice" lines belong in `aLaMinute`, not here.
 *  - `dietaryRestrictions`: short tags (e.g. "Citrus", "Honey"). Use [] for
 *    "N/A". Tags are searchable from the Bar Program search bar.
 *  - `price`: integer USD. Use `null` for unpriced / by-the-glass specs.
 */

import type { Cocktail } from "@/lib/cocktails";

export const COCKTAILS: Cocktail[] = [
  {
    id: "sunstone",
    name: "Sunstone",
    menuDescription:
      "Casa Obsidiana Reposado, Amaro Nonino Riserva, Grand Marnier, Menta Caffè",
    character:
      "Deep, velvety after-dinner cordial focused around cacao and custard to drink alongside an espresso and coffee cake.",
    aLaMinute: [
      "1.00 2022 Casa Obsidiana Reposado",
      "0.75 2023 Amaro Nonino Riserva",
      "0.25 Grand Marnier",
      "0.09 Branca Menta",
      "0.125 Mr. Black",
    ],
    batched: [
      "2.5 Batch",
      "Stir lightly to chill. Garnish with a spritz of edible gold glitter.",
    ],
    ingredients: [
      {
        name: "Casa Obsidiana Reposado",
        note: "Small batch luxury tequila done as a partnership between families in Napa and Tequila. Finished in ex-chardonnay barrels which impart a rich custardy undertone that is the basis for the cocktail blend.",
      },
      {
        name: "Amaro Nonino Riserva",
        note: "Made in honor of Grandfather Antonio, aged in barrique for 24 months. Keeps the caramel orange tones of Nonino but adds cacao and coffee depth.",
      },
      {
        name: "Menta Caffè",
        note: "Blend of Branca Menta with coffee liqueur to create a mint-coffee finish.",
      },
    ],
    story:
      "Casa Obsidiana encapsulates a lot of the culture we have in Northern California and Napa — mixed cultures meeting wine country roots. Amaro Nonino was Chef MC's favorite amaro; built in his honor.",
    garnish: "Gold Glitter",
    dietaryRestrictions: [],
    modifications: "Can be served on a large rock.",
    price: 50,
    tags: ["After-dinner", "Tequila", "Spirit-forward"],
  },
  {
    id: "golden-bijou",
    name: "Golden Bijou",
    menuDescription:
      "2022 Monkey 47 Distiller's Select, 2023 MOF Yellow Chartreuse, 1960s Martini & Rossi Rosso Vermouth, 23K Ice",
    character: "Luxurious, herbaceous riff on the classic Bijou.",
    aLaMinute: [],
    batched: [],
    ingredients: [
      {
        name: "Monkey 47 Distiller's Select",
        note: "Limited release of the cult Black Forest gin with extra botanical depth.",
      },
      {
        name: "1960s Martini & Rossi Rosso",
        note: "Vintage bottle of Rosso vermouth carrying tertiary oxidative notes that you can't get from a modern bottle.",
      },
    ],
    garnish: "23K Ice",
    dietaryRestrictions: [],
    modifications: "Not recommended.",
    price: 75,
    tags: ["Gin", "Spirit-forward", "Luxury"],
  },
  {
    id: "cervo",
    name: "Cervo",
    menuDescription: "Zomoz Mezcal, Cynar, Lime Oil, Ginger Beer",
    character: "Earthy, refreshing, sparkling sipper.",
    aLaMinute: [],
    batched: [],
    ingredients: [],
    garnish: "Dehydrated Lime Wheel & Mint Sprig",
    dietaryRestrictions: ["Citrus", "Ginger"],
    modifications: "Flexible cocktail — Acid/Sugar Balance. Base Spirit.",
    price: 19,
    tags: ["Mezcal", "Highball", "Refreshing"],
  },
  {
    id: "iris-old-fashioned",
    name: "Iris Old Fashioned",
    menuDescription:
      "WhistlePig 6yr Rye, Liquore Strega, Cointreau, Tarragon, Honey-Molasses",
    character: "Bright springtime old fashioned perfect for sipping on the patio.",
    aLaMinute: [],
    batched: [],
    ingredients: [],
    garnish: "Lemon Twist",
    dietaryRestrictions: ["Honey"],
    modifications: "Sugar/Dry Balance.",
    price: 19,
    tags: ["Rye", "Old Fashioned"],
  },
  {
    id: "genovese",
    name: "Genovese",
    menuDescription:
      "Ketel One, Spring Peas, St. George Basil Eau de Vie, Alloro, Brucato Chapparal, Citrus, Soda",
    character: "Bright, herbaceous, savory garden highball.",
    aLaMinute: [],
    batched: [],
    ingredients: [],
    garnish: "Baby pea shoots, seasonal flowers",
    dietaryRestrictions: ["Peas", "Basil", "Citrus"],
    modifications: "Sugar/Acid Balance, Soda.",
    price: 19,
    tags: ["Vodka", "Garden", "Highball"],
  },
  {
    id: "portico",
    name: "Portico",
    menuDescription:
      "Elijah Craig Bourbon, Montenegro Reduction, Sake Umeshu, Toasted White Sesame, Honey, Molasses",
    character: "Toasty, nutty, plum-laced bourbon sipper.",
    aLaMinute: [],
    batched: [],
    ingredients: [],
    garnish: "Sesame coated honey tuile",
    dietaryRestrictions: ["Nuts", "Sesame", "Honey", "Plum"],
    modifications: "N/A",
    price: 17,
    tags: ["Bourbon", "Spirit-forward"],
  },
  {
    id: "prickly-bear-sour",
    name: "Prickly Bear Sour",
    menuDescription:
      "Prickly Pear, Chartreuse Blend, St. George Valley Gin, Citrus, Fennel Frond Ice",
    character: "Unctuously rich and fruity with a strong herbal backbone.",
    aLaMinute: [],
    batched: [],
    ingredients: [],
    garnish: "Fennel Bear Ice with a Fennel Frond",
    dietaryRestrictions: [],
    modifications: "Sugar/Acid Balance.",
    price: 19,
    tags: ["Gin", "Sour"],
  },
  {
    id: "maravilla-margarita",
    name: "Maravilla Margarita",
    menuDescription:
      "El Tequileno Reposado, Chinola Liqueur, Thai Tea, Passion Fruit, Citrus",
    character:
      "Tequila focused with an emphasis on the lower notes of tropical fruit, rich but still tart with a Margarita identity.",
    aLaMinute: [
      "0.5 El Tequileno Blanco",
      "1 El Tequileno Reposado",
      "0.75 Lemon Juice",
      "0.5 Thai Tea Simple Syrup",
      "0.4 Chinola Passionfruit Liqueur",
      "0.275 Passion Fruit Puree",
      "4 Drops Saline",
      "1 Barsoon Emulsifier",
    ],
    batched: [
      "3 Batch",
      "0.75 Lemon Juice",
      "Shaken and dirty dumped into a large rocks glass.",
    ],
    ingredients: [
      {
        name: "Chinola Passionfruit Liqueur",
        note: "Chinola is the word for passionfruit in the Dominican Republic, where the liqueur is distilled. Bright body, tangy acidity, very close to fresh passionfruit.",
      },
      {
        name: "Thai Tea Syrup",
        note: "Dark black Ceylon tea blended with toasted spices and vanilla. Tannin adds complexity, and the vanilla/spice notes pair beautifully with passionfruit and reposado tequila.",
      },
    ],
    story:
      "'Maravilla' means 'Wonder' or 'Marvel' in both Spanish and Italian. Inspired by the melting pot of the Bay Area — spirits and ingredients from many cultures, built to inspire awe whether the guest is from California or Italia.",
    garnish: "Marigold flower & black salt rim",
    dietaryRestrictions: ["Passionfruit", "Citrus"],
    modifications: "Sugar/Acid Balance.",
    price: 18,
    tags: ["Tequila", "Margarita", "Tropical"],
  },
  {
    id: "pseudo-kiwi-na",
    name: "Pseudo Kiwi (N/A)",
    menuDescription: "Kiwi, Seedlip Spice, Basil, Citrus, Soda",
    character:
      "Light and refreshing interplay of kiwi and basil. Fruity, herbaceous, sparkling.",
    aLaMinute: ["A La Minute is not a viable option for this cocktail."],
    batched: [
      "Juice cube, broken up with an ice pick into the tin",
      "1 Lime Juice",
      "1 Simple Syrup",
      "Shaken and dirty dumped into a collins glass. Topped with soda.",
      "Kiwi puree is blended with basil leaf, strained through a chinois, mixed with simple syrup and Seedlip Spice, then poured into ice cube molds to set.",
    ],
    ingredients: [
      {
        name: "Kiwi & Basil",
        note: "Puree (not fresh kiwi) lets us control freshness, acid, and sugar. Kiwi peaks in January despite its tropical reputation — high in vitamin K, potassium, antioxidants. Basil is anti-inflammatory and high in fiber.",
      },
    ],
    garnish: "Basil leaf. Gets a straw.",
    dietaryRestrictions: ["Kiwi", "Citrus"],
    modifications: "Sugar/Acid balance.",
    price: 14,
    tags: ["N/A", "Non-Alcoholic", "Refreshing"],
  },
  {
    id: "btg-negroni",
    name: "BTG Negroni",
    menuDescription:
      "Malfy Italian Gin, Campari-Amari (Campari + Winestillery Sweet Vermouth + Winestillery Tuscan Bitter + Amaro Nonino + Amaro Margerum + Tomato Water), Rosso Vermouth",
    character:
      "Traditional Negroni with more complexity around the Campari. 'BTG' is short for 'Bottega' — our house Negroni.",
    aLaMinute: [
      "1.25 Malfy Italian Gin",
      "1.00 Campari-Amari",
      "0.75 Rosso Vermouth",
      "3.00 oz stirred. Served in a rocks glass over a large cube with a bay leaf.",
    ],
    batched: [],
    ingredients: [
      {
        name: "Campari-Amari",
        note: "Campari, Winestillery Sweet Vermouth, Winestillery Tuscan Bitter, Amaro Nonino, Amaro Margerum, Tomato Water.",
      },
    ],
    garnish: "Bay leaf, large cube",
    dietaryRestrictions: ["Tomato"],
    modifications: "Base gin can be upsold.",
    price: null,
    tags: ["Gin", "Negroni", "Spirit-forward", "BTG"],
  },
  {
    id: "negroni-acronimo-na",
    name: '"Negroni" Acronimo (N/A)',
    menuDescription: "Juniper, Mionetto, Ritual Aperitif, Seedlip Notas, Pathfinder",
    character:
      "Juicy, botanical, spirit-forward non-alcoholic Negroni made with a blend of non-alc options.",
    aLaMinute: ["A La Minute Preparation is not an option for this drink."],
    batched: [
      "Mionetto",
      "Ritual Aperitivo",
      "Seedlip Notas",
      "Almave",
      "Ghia",
      "Pathfinder",
      "Champagne Vinegar",
      "Saline Solution",
      "Juniper Wash",
      "3.00 Batch",
      "Stirred and strained into a small rocks glass over a large cube.",
    ],
    ingredients: [
      {
        name: "Blend",
        note: "A mixture of various non-alcoholic 'spirits' blended to create richness and complexity.",
      },
    ],
    garnish: "Orange twist",
    dietaryRestrictions: [],
    modifications: "Can be made sweeter.",
    price: 18,
    tags: ["N/A", "Non-Alcoholic", "Negroni"],
  },
  {
    id: "espresso-amartini",
    name: "Espresso Amartini",
    menuDescription: "Espresso, Mr. Black, Ketel One, Averna, Citrus Oil",
    character:
      "Dry espresso martini designed for espresso drinkers and highlighted with amaro and baking spices.",
    aLaMinute: [
      "1.00 Ketel One",
      "1.25 Mr. Black Coffee Liqueur",
      "0.25 Amaro Averna",
      "1 Dash Angostura Bitters",
    ],
    batched: [
      "2.50 Batch",
      "1.50 Espresso Concentrate",
      "Shaken and double-strained into a large Nick & Nora glass. Spritzed lightly with citrus oil.",
    ],
    ingredients: [
      { name: "Amaro Averna", note: "Sicilian amaro that lends light mint and baking spices." },
      {
        name: "Espresso Concentrate",
        note: "House cold brew concentrate of Mr. Espresso. Controls dilution while providing a strong coffee kick. Natural cocoa flavor.",
      },
      { name: "Citrus Oil", note: "Edible 'perfume' of Meyer lemon oil made in house." },
    ],
    story:
      "Inspired by a hangover cure of bitters in coffee. Combines the stomach-relieving qualities of coffee with a Sicilian amaro (Averna) and bitters. Pays homage to after-dinner espresso and the San Marco lemon-zested espresso.",
    garnish: "Three espresso beans: health, wealth, prosperity.",
    dietaryRestrictions: ["Coffee"],
    modifications:
      "Traditional espresso martini, tequila espresso martini, classic Bottega raspberry espresso martini. Can be sweeter. Can add Bailey's cream. Changing the base vodka means the bar team can't use the batch — slower service, no significant change to the drink or price.",
    price: 19,
    tags: ["Vodka", "Espresso Martini", "Coffee"],
  },
  {
    id: "italian-gin-and-tonic",
    name: "Italian Gin and Tonic",
    menuDescription:
      "Nolet's Gin, Limoncello, Rosemary, Juniper Berries, Sweet Peppers",
    character: "Dry, herbal, light & refreshing take on a gin and tonic.",
    aLaMinute: [
      "Add rosemary, juniper berries, sweet peppers to a burgundy glass with a splash of LN2",
      "2.00 Nolet's Gin",
      "Bar spoon Limoncello",
      "0.75 Lemon Juice",
      "Add ice, top with tonic, serve after LN2 has fully vaporized.",
    ],
    batched: [
      "Add rosemary, juniper berries, sweet peppers to a burgundy glass with a splash of LN2",
      "2.00 Batch",
      "Bar spoon Limoncello",
      "0.75 Lemon Juice",
      "Add ice, top with tonic, serve after LN2 has fully vaporized.",
    ],
    ingredients: [{ name: "LN2", note: "Liquid Nitrogen." }],
    story:
      "Designed by former beverage director Joe Cleveland for Chef MC at a bar in Washington DC. Chef loved it and told Joe to put it on the menu, before Joe eventually joined the team in Napa.",
    garnish: "Rosemary, juniper berries, sweet peppers",
    dietaryRestrictions: ["Citrus"],
    modifications: "Base Spirit. Sugar/Acid Balance.",
    price: 18,
    tags: ["Gin", "Highball", "Theatrical"],
  },
  {
    id: "na-spritz",
    name: "N/A Spritz",
    menuDescription:
      "Kally N/A Sparkling Rosé, Mionetto N/A Aperitivo, Ritual N/A Aperitif",
    character: "Fruity and slightly bitter non-alcoholic Aperol Spritz.",
    aLaMinute: [
      "~4 oz Kally",
      "1.5 oz Mionetto",
      "Bar spoon Ritual N/A",
      "Add ingredients to AP wine glass, add ice. Add orange slice and mint.",
    ],
    batched: [],
    ingredients: [
      {
        name: "Kally N/A Rosé",
        note: "Sparkling wine alternative with verjus as its base. Notes of strawberry, hibiscus, grape, and a touch of grape-skin tannin. Locally produced, B-Corp certified.",
      },
    ],
    story:
      "Crafted as an N/A alternative to the Aperol Spritz. Name was given by a server: Jonathan.",
    garnish: "Orange slice and sprig of mint.",
    dietaryRestrictions: [],
    modifications: "Bitter/Sweet balance.",
    price: 15,
    tags: ["N/A", "Non-Alcoholic", "Spritz"],
  },
];