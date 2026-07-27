/**
 * Bottega cocktail spec data - source of truth for the Bar Program tab.
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
      "Casa Obsidiana encapsulates a lot of the culture we have in Northern California and Napa - mixed cultures meeting wine country roots. Amaro Nonino was Chef MC's favorite amaro; built in his honor.",
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
    id: "bella-rosso",
    name: "Bella Rosso",
    menuDescription:
      "Strawberry, St. George Botanivore Gin, Aperol, Strawberry Cordial, Lemon, Egg White",
    character:
      "A botanical, fruity and full-bodied crusher, with a tart and slightly bitter finish.",
    aLaMinute: [
      "1.25 Botanivore",
      "1.25 Strawberry Aperol",
      "0.8 Strawberry-Tomato Cordial",
      "1.00 Lemon",
      "1 Dash Balsamic Vinegar",
      "0.5 Egg White",
    ],
    batched: [
      "3.00 Batch",
      "0.50 Egg White",
      "1.00 Lemon Juice",
      "Add to tin, dry shake 6 sec, add ice and wet shake 8 to 12 sec, double strain into a sour optic glass. Lemon perfume over the top.",
    ],
    ingredients: [
      {
        name: "St. George Botanivore",
        note: "London Dry style gin made in Alameda by Master Distiller Lance Winters with local Northern California botanicals. Layered with laurel bay, coriander, orris root, and citrus.",
      },
      {
        name: "Strawberry-Tomato Cordial",
        note: "Strawberries from the Aperol infusion are upcycled with tomato water, sugar, and fresh strawberries. Tomato and strawberry share most of their aromatic compounds; the tomato water adds umami and complexity.",
      },
    ],
    story:
      "A riff on the modern classic 'Intro to Aperol.' Combines strawberry and tomato for a complex, botanical summer cocktail. 'Bella Rosso' means Beautiful Red in Italian.",
    garnish: "Dried strawberry slice",
    dietaryRestrictions: ["Strawberry", "Nightshade", "Citrus", "Egg"],
    modifications: "Sugar/Acid balance. Omit egg white (not recommended).",
    price: 17,
    tags: ["Gin", "Sour", "Summer"],
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
    id: "porch-punch",
    name: "Porch Punch",
    menuDescription:
      "Redwood Empire Pipe Dream 101 Bourbon, Yellow Peach, Oolong Tea, Lemon, Vanilla",
    character:
      "A summer whiskey sipper, refreshing and fruity while still spirit forward. Tea supports the whiskey's structure, rounded out by the milk clarification.",
    aLaMinute: [
      "A la minute is not possible for this cocktail.",
      "2 RE Pipe Dream 101",
      "0.85 Peach Oleo Saccharum",
      "0.6 Lemon",
      "1 Dash Vanilla",
      "0.5 Oolong Tea",
      "6 Drops Umami Tincture",
      "0.5 Whole Milk",
    ],
    batched: [
      "3.5 Batch",
      "Stirred for 10 seconds and poured into a double rocks glass over a large cube.",
    ],
    ingredients: [
      {
        name: "Redwood Empire Pipe Dream 101",
        note: "Higher proof version of Redwood Empire's flagship bourbon with more of their own distillate and a higher average age. Chosen for the flavor profile and the proof needed to stand up to milk clarification.",
      },
      {
        name: "Peach Oleo",
        note: "Local organic yellow peaches cold macerated with white sugar for 8 hours. Extracts a rich, fresh peach syrup without any heat.",
      },
      {
        name: "Oolong Tea",
        note: "Tieguanyin, 'Iron Goddess of Mercy,' one of the most famous teas in Chinese history. Adds back tannin after clarification. Notes of soft wood, baked stonefruit, and lilac.",
      },
      {
        name: "Milk Punch",
        note: "Milk proteins bind polyphenols; filtering the curds strips them out and leaves a percentage of whey behind, which gives the cocktail a creamy, luscious texture. Only about 70 percent of the whiskey and peach oleo are clarified, preserving a spiritous, fruity edge.",
      },
    ],
    story:
      "An iteration on the classic Porch Swing, a Southern drink of whiskey and ice cold peach tea, a favorite of the bartender's grandmother from rural Kentucky. Built as a milk punch to combine favorite flavors in a favorite cocktail format.",
    garnish: "Dehydrated peach slice",
    dietaryRestrictions: ["Stonefruit", "Dairy", "Citrus"],
    modifications: "N/A",
    price: 19,
    tags: ["Bourbon", "Milk Punch", "Summer"],
  },
  {
    id: "apollo",
    name: "Apollo",
    menuDescription:
      "St. George Valley Gin, Cantaloupe, Cocchi Americano, Brucato Oro y Fierro, Peychaud's Bitters, Basil Oil",
    character:
      "Fruity and refreshing with layers of cantaloupe and citrus. Botanical, peppery edge supported by high toned herbs, with prosciutto complementing the pepper of the gin and the cantaloupe.",
    aLaMinute: [
      "1.75 St. George Valley Gin",
      "1.5 Cantaloupe Cordial",
      "0.3 Cocchi Americano",
      "0.2 Oro y Fierro",
      "1 Dash Peychaud's",
      "3 Drops Champagne Vinegar",
      "6 Drops Basil Oil",
    ],
    batched: [
      "3.50 Batch",
      "Shaken for 8 seconds then double strained into a large Nick & Nora glass. Basil oil dropped into the drink, prosciutto crisp rested on the glass.",
    ],
    ingredients: [
      {
        name: "Cantaloupe Cordial",
        note: "Fresh cantaloupe blended and strained with pectinex for consistent texture, then built with citric acid and sugar. Replaces simple syrup and citrus in the sour, putting cantaloupe up front.",
      },
      {
        name: "Cocchi Americano",
        note: "Bitter sweet white wine aperitif. Like Lillet Blanc's Italian cousin, but with a more pronounced quinine bite and much more layered spice.",
      },
      {
        name: "Oro y Fierro",
        note: "Kumquat liqueur from Brucato in San Francisco, using local Nagami kumquats and orange peel for a full, complex profile.",
      },
    ],
    story:
      "Apollo, Roman god of poetry and prophecy, rode the sun across the sky in his golden chariot. This cocktail's golden hue and delicate, complex profile is a nod to that myth.",
    garnish: "Basil oil, prosciutto crisp",
    dietaryRestrictions: ["Cantaloupe", "Basil", "Citrus", "Pork"],
    modifications: "Sugar/Acid balance. Omit basil. Omit pork.",
    price: 20,
    tags: ["Gin", "Sour", "Summer"],
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
      "'Maravilla' means 'Wonder' or 'Marvel' in both Spanish and Italian. Inspired by the melting pot of the Bay Area - spirits and ingredients from many cultures, built to inspire awe whether the guest is from California or Italia.",
    garnish: "Marigold flower & black salt rim",
    dietaryRestrictions: ["Passionfruit", "Citrus"],
    modifications: "Sugar/Acid Balance.",
    price: 18,
    tags: ["Tequila", "Margarita", "Tropical"],
  },
  {
    id: "torta",
    name: "Torta",
    menuDescription: "Cream, Vanilla-Almond Spirit Blend, Larceny, Copalli, Orgeat",
    character: "Reminiscent of an almond milkshake.",
    aLaMinute: [
      "1.00 Almond Spirit",
      "0.75 Cream",
      "0.25 Orgeat",
      "0.325 Almond Milk",
      "2 Drops Umami Tincture",
      "8 Drops Saline Tincture",
      "3 Drops Vanilla Extract",
      "1 Drop Almond Extract",
      "Bar spoon Foaming Agent",
    ],
    batched: [
      "2.50 Batch",
      "1.50 Cream",
      "Reverse dry shake into a small Nick & Nora glass.",
    ],
    ingredients: [
      {
        name: "Almond Spirit",
        note: "Whole almonds roasted to varying toast levels, folded with brown butter while hot, then washed with a Larceny Bourbon and Copalli Rum blend. The mixture is passed multiple times over biscotti and frozen overnight to separate excess fat. A fat washed spirit.",
      },
      {
        name: "Fat Washing",
        note: "Technique used to incorporate soluble fats into the structure of alcohol for texture and flavor.",
      },
      { name: "Orgeat", note: "Almond cordial." },
      { name: "Umami Tincture", note: "House savory tincture extracted from instant yeast." },
      { name: "Foaming Agent", note: "Methylcellulose based vegan foaming agent." },
    ],
    story:
      "Wanted a dessert cocktail other than the classic espresso martini, so we looked to emulate an Italian almond cake. 'Torta' means 'cake' in Italian. Not the sandwich in Spanish.",
    garnish: "Single dash line of Angostura intersected by an almond slice.",
    dietaryRestrictions: ["Dairy", "Nuts", "Gluten"],
    modifications: "Dairy free (alternative milk). Additional sugar. Less sweet (more cream, less batch).",
    price: 18,
    tags: ["Bourbon", "Dessert", "Cream"],
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
        note: "Puree (not fresh kiwi) lets us control freshness, acid, and sugar. Kiwi peaks in January despite its tropical reputation - high in vitamin K, potassium, antioxidants. Basil is anti-inflammatory and high in fiber.",
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
      "Traditional Negroni with more complexity around the Campari. 'BTG' is short for 'Bottega' - our house Negroni.",
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
      "Traditional espresso martini, tequila espresso martini, classic Bottega raspberry espresso martini. Can be sweeter. Can add Bailey's cream. Changing the base vodka means the bar team can't use the batch - slower service, no significant change to the drink or price.",
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