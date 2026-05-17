/**
 * Bottega Napa Valley — Food menu data.
 *
 * Edit this file to add/change dishes. The Food page picks up changes
 * automatically. Categories must match the FoodCategory union in
 * `src/lib/food.ts`.
 *
 * Source: Food_Notes_2026.pdf (Rev. 4/26/2026).
 */
import type { Dish } from "@/lib/food";

export const DISHES: Dish[] = [
  // ───────────────────────────── ANTIPASTI ─────────────────────────────
  {
    id: "burrata",
    name: "Burrata (Seasonal)",
    category: "Antipasti",
    description:
      "Gioia’s Burrata, Golden Beets, Tangerines, Pomegranate seeds, Pistachio Pesto, Balsamic “Pearls”",
    preparation:
      "Golden Beets are placed onto the plate, with pistachio pesto and burrata placed in the center. Garnished with tangerine segments, pomegranate seeds, and balsamic caviar.",
    ingredients: [
      {
        name: "Balsamic Caviar",
        note: "Gelatin (Pork) mixed with balsamic vinegar, heated, and dripped into chilled olive oil to form spheres that resemble caviar.",
      },
      { name: "Pistachio Pesto", note: "Pistachio, Olive Oil, Salt, Balsamic Moderna." },
    ],
    info: "Gioia Burrata is made by 3rd-generation cheese makers in Southern California from Gioia del Colle, Puglia. Always paired with a seasonal accompaniment.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Dairy", "Nuts", "Pork"],
    modifications: "You can remove any aspects of the dish aside from the cheese.",
    mark: "F/K",
    price: "$24",
  },
  {
    id: "caesar-nero",
    name: "‘Hail’ Insalata Caesar Nero",
    category: "Antipasti",
    description:
      "Classic Caesar Salad reinvented with Black Garlic, Romaine Lettuce, and Anchovy Crostini.",
    preparation: "All ingredients are tossed and plated. Finished with anchovy crostini and parmesan.",
    ingredients: [
      { name: "Anchovy Crostini", note: "Garlic, Parmigiano, Anchovy, French Baguette." },
      {
        name: "Black Caesar Dressing",
        note: "Egg yolks, Garlic, Black Garlic, Dijon Mustard, Lemon Juice, Champagne Vinegar, Salt, Pepper, Olive Oil, Anchovies, Parmesan, Worcestershire.",
      },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Fish", "Egg"],
    modifications: "No Crouton, No Dressing.",
    mark: "F/K",
    price: "$18",
  },
  {
    id: "brussels-salad",
    name: "Insalatina di Cavoletti di Bruxelles",
    category: "Antipasti",
    description:
      "Shaved Brussels Sprouts with Whole Meyer Lemon Dressing, Marcona Almonds, Sieved Egg, and Pecorino Romano.",
    preparation:
      "Brussels, cheese, almonds, and dressing are tossed and plated. Finished with sieved egg.",
    ingredients: [
      { name: "Meyer Lemon Dressing", note: "Whole meyer lemon juiced, mixed with shallot and olive oil." },
      { name: "Sieved Egg", note: "Whole hardboiled egg is sieved to grate it." },
    ],
    info: "Marcona Almonds are grown in Spain — short, round, sweet, and delicate in texture.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Egg", "Nuts"],
    modifications: "Dairy Free (no cheese), No Dressing, Egg Free, Nut Free, Vegan.",
    mark: "F/K",
    price: "$18",
  },
  {
    id: "polpo",
    name: "Polpo alla Griglia",
    category: "Antipasti",
    description: "Wood-grilled octopus, garbanzo puree, sun dried tomato.",
    preparation:
      "Octopus is cooked on a wood grill. Garbanzo bean pureed, served with a sundried tomato, fennel and parsley salad.",
    ingredients: [
      {
        name: "Garbanzo Bean Puree",
        note: "Garbanzo beans cooked down in chicken stock with shallots, pureed then finished with lemon juice.",
      },
      {
        name: "Fennel Salad",
        note: "Shaved Fennel, sundried tomatoes, parsley, sherry vinegar, EVOO.",
      },
    ],
    fireTime: "8 Minutes",
    dietaryRestrictions: ["Nightshade", "Shellfish", "Allium"],
    modifications: "No Puree (Allium), No Salad (Nightshade).",
    mark: "F/K",
    price: "$23",
  },
  {
    id: "calamari",
    name: "Calamari Fritti",
    category: "Antipasti",
    description: "Monterey Calamari Fritti, side of Squid Ink Aioli, and Grilled Meyer Lemon.",
    preparation:
      "Cleaned, portioned squid is dredged in buttermilk and tossed in fritti flour. Deep fried in peanut oil, tossed with chopped parsley. Plated with aioli nero and a wood-grilled Meyer lemon half.",
    ingredients: [
      { name: "Fritti Flour", note: "Arborio Rice, AP Flour, Semolina." },
      { name: "Aioli Nero", note: "Squid Ink, Calabrian, Egg Yolk, Garlic, Olive Oil." },
    ],
    fireTime: "3 Minutes",
    dietaryRestrictions: ["Dairy", "Allium", "Nuts", "Gluten", "Shellfish", "Egg"],
    modifications: "GF (toss in corn starch or pan fry), No Aioli (Egg).",
    price: "$19",
  },
  {
    id: "pasta-fritta",
    name: "Pasta Fritta con Prosciutto",
    category: "Antipasti",
    description:
      "Puffed Rosemary Scented Pasta Dough Wrapped in Prosciutto with Honey-Rosemary Mascarpone.",
    preparation:
      "Dough is fried in peanut oil, tossed with parmesan, wrapped in prosciutto, and plated over a smear of mascarpone cheese.",
    ingredients: [
      {
        name: "Honey-Rosemary Mascarpone",
        note: "Mascarpone mixed with rosemary and honey.",
      },
      { name: "Pasta Dough", note: "Chopped Rosemary, Flour, Water, Yeast." },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Gluten", "Dairy", "Peanut", "Pork"],
    modifications: "DF (No Cheese), Vegetarian (No Prosciutto).",
    mark: "F/K",
    price: "3pc $18 · 5pc $25",
  },
  {
    id: "granchio",
    name: "Insalata di Granchio",
    category: "Antipasti",
    description:
      "Red Bibb lettuce, Dungeness crab, asparagus and fava beans, blood orange supremes, champagne vinaigrette.",
    preparation:
      "Bibb lettuce lightly dressed with dijon champagne vinaigrette. Sliced blanched asparagus and fava beans added. 2.5 oz Dungeness crab seasoned with Grove45 OO and chives, placed in the center. Garnished with blood orange segments and edible flowers.",
    ingredients: [
      { name: "Dungeness Crab", note: "Crab (body and leg), chives, Grove45 OO." },
      {
        name: "Champagne Vinaigrette",
        note: "Champagne Vinegar, Shallots, Honey, Gray Salt, Black Pepper, Dijon.",
      },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Shellfish", "Citrus", "Allium"],
    modifications: "No Citrus, No Crab, Sub Dressing (Meyer Lemon Dressing).",
    mark: "F/K",
    price: "$30",
  },
  {
    id: "arancini",
    name: "Arancini",
    category: "Antipasti",
    description:
      "Stuffed with House Made Mozzarella, Basil Pesto, served with Nonna’s Sauce. Finished with Parmigiano Reggiano.",
    preparation:
      "Rice is mixed with basil pesto, formed into a ball with mozzarella in the center. Breaded with flour, eggs, and panko. Deep fried to order, served over Nonna’s sauce with grated parm.",
    ingredients: [
      { name: "Basil Pesto", note: "Basil, Pine Nuts, EVOO." },
      {
        name: "Nonna Sauce",
        note: "Mirepoix (Onion, Celery, Carrot), Garlic, Rosemary, Tomato, Roasted and Steeped Hen. Hen is pulled after cooking — an homage to old Italian frugality.",
      },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Nuts", "Nightshade"],
    modifications: "N/A",
    mark: "F/K/S",
    price: "3pc $20 · 5pc $25",
  },
  {
    id: "tagliere",
    name: "Tagliere di Formaggi e Salumi",
    category: "Antipasti",
    description:
      "Selection of Cheese and Salumi from Ovello Salumeria in Sonoma served with Seasonal Fruits A.Q.",
    preparation: "Plated rotation served with almonds and breadsticks.",
    ingredients: [
      { name: "Selection", note: "Rotates constantly. Cheese & salumi preparations vary heavily." },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Gluten", "Nuts", "Allium", "Dairy", "Pork"],
    modifications: "No Nuts, No Breadsticks.",
    price: "$35",
  },
  {
    id: "polpette",
    name: "Wagyu Polpette",
    category: "Antipasti",
    description:
      "Grilled Wagyu Short Rib Meatballs, finished with Agro-Dolce Sauce. Topped with Ricotta and Chopped Parsley.",
    preparation:
      "Polpettes are marked on the grill, tossed in agro-dolce sauce, finished in the wood oven. Topped with agro-dolce, ricotta, and chopped parsley.",
    ingredients: [
      {
        name: "Wagyu Polpette",
        note: "Ground Wagyu short rib with minced garlic, parsley, parmesan, breadcrumbs, roasted onion puree, salt, pepper, olive oil, thyme, egg yolks.",
      },
      {
        name: "Agro-Dolce",
        note: "OO, shallot, chive, red wine, sherry vinegar, balsamic, honey, tomato puree, beef stock, butter, salt and pepper.",
      },
      { name: "Ricotta", note: "Ricotta seasoned with salt and lemon zest. Piped on top." },
    ],
    fireTime: "8 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Egg"],
    modifications: "No Ricotta (still has parm inside polpette).",
    mark: "F/K",
    price: "$25",
  },
  {
    id: "polenta-vetro",
    name: "Polenta sotto Vetro (Polenta Under Glass)",
    category: "Antipasti",
    description:
      "Polenta “Under Glass” with Caramelized Mushrooms, Balsamic Game Sauce, and a Parmesan Frico.",
    preparation:
      "Polenta cooked with cream and chicken stock, placed in a glass jar, topped with parmesan, fontina, and nutmeg. Mushrooms caramelized in pan and placed on top. Served with game sauce and parmesan frico on the side.",
    ingredients: [
      { name: "Polenta", note: "Chicken Stock, Milk, Fontina Cheese, Nutmeg, S&P." },
      {
        name: "Mushrooms",
        note: "Wild and cultivated: Beech, Shiitake, King Trumpet, chopped garlic, thyme, parsley.",
      },
      {
        name: "Balsamic Game Sauce",
        note: "Mirepoix, red wine, balsamic vinegar, veal stock, bay leaves, juniper berries.",
      },
      {
        name: "Parmesan Frico",
        note: "Round crisp created by molding and baking parmesan cheese.",
      },
    ],
    info: "Anson Mills heirloom polenta from North Carolina — special-ordered, unmodified, unpreserved. Chef Chiarello verified the preparation personally.",
    fireTime: "3 Minutes",
    dietaryRestrictions: ["Dairy", "Alcohol", "Allium", "Meat"],
    modifications: "No Mushrooms, No Sauce.",
    mark: "S",
    price: "$18",
  },
  // ───────────────────────────── PASTA ─────────────────────────────
  {
    id: "risotto-giorno",
    name: "Risotto del Giorno",
    category: "Pasta",
    description: "Chef’s seasonal risotto. A.Q.",
    preparation: "Composition changes daily — confirm with the kitchen before describing to the guest.",
    ingredients: [],
    fireTime: "5–10 Minutes",
    dietaryRestrictions: [],
    modifications: "Ask the kitchen.",
    price: "A.Q.",
  },
  {
    id: "tagliarini-bolognese",
    name: "Tagliarini Bolognese al Centro",
    category: "Pasta",
    description:
      "Wheat Pasta with Tomato Braised Veal, Pork and Porcini Mushroom, Calabrian Chili, Gremolata, and Aged Pecorino Romano.",
    preparation:
      "Veal and sweet Italian sausage are sautéed with toasted fennel. Add garlic, onion, rosemary, veal stock, tomato passata. Mix in rehydrated porcini. Finish with Calabrian chili, parsley, parmigiano, and butter. Gremolata sprinkled over.",
    ingredients: [
      { name: "Gremolata", note: "Toasted bread blended with butter and parsley." },
      { name: "Tomato Passata", note: "Crushed tomatoes." },
    ],
    info: "Our bolognese has more veal stock than tomato presence, which is atypical. Tagliarini = ‘hand cut’ egg pasta from Northern Italy.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Nightshade", "Pork"],
    modifications: "Sub GF Pasta & No Gremolata (GF).",
    mark: "F/S",
    price: "$29",
  },
  {
    id: "gnocchi-nonna",
    name: "Ricotta Gnocchi della Nonna",
    category: "Pasta",
    description: "Ricotta “Pillows” with Old Hen Tomato Sauce and Pecorino Romano.",
    preparation:
      "Ricotta gnocchi boiled in salted water until cooked through. Plated and drizzled with olive oil. Nonna sauce heated with chopped basil, poured over each gnocchi, and finished with finely grated pecorino.",
    ingredients: [
      {
        name: "Nonna Sauce",
        note: "Old Hen Sauce. Mirepoix (Onion, Celery, Carrot), Garlic, Rosemary, Tomato, Roasted and Steeped Hen.",
      },
    ],
    info: "Made with ricotta, flour, and egg — unlike traditional potato gnocchi.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Egg", "Gluten", "Nightshade"],
    modifications: "Allium Free (Tomato Passata), Vegetarian (Sub Pomodoro Sauce).",
    mark: "F/S",
    price: "$28",
  },
  {
    id: "carbonara",
    name: "Carbonara",
    category: "Pasta",
    description:
      "Maccheroncini, carbonara crema, crispy guanciale, Parmesan frico with activated charcoal.",
    preparation:
      "Maccheroncini cooked to order in salted water. Tossed in pan with carbonara crema and crispy guanciale. Plated with pecorino and charcoal parm frico on top.",
    ingredients: [
      { name: "Carbonara Crema", note: "Egg yolk, pecorino, heavy cream, guanciale fat." },
      { name: "Parmesan Tuile", note: "Activated charcoal, parmesan." },
      { name: "Maccheroncini Pasta", note: "Egg, flour, water." },
    ],
    fireTime: "12–15 Minutes",
    dietaryRestrictions: ["Gluten", "Egg", "Pork", "Dairy"],
    modifications: "N/A",
    mark: "F/K/S",
    price: "$30",
  },
  {
    id: "rigatoni-coniglio",
    name: "Rigatoni al Coniglio",
    category: "Pasta",
    description: "Balsamic Marinated Rabbit and Caramelized Mushrooms with Guanciale.",
    preparation:
      "Mushroom blend sautéed brown, then add guanciale, butter, garlic, thyme. Balsamic rabbit jus added and reduced by half before adding rabbit. Rigatoni tossed in, finished with butter and parmigiano, garnished with parsley.",
    ingredients: [
      { name: "Mushroom Blend", note: "Maitake, Shiitake, King Oyster, Brown Beech, White Beech." },
      {
        name: "Rabbit",
        note: "Whole rabbit marinated in balsamic and par-cooked to medium rare.",
      },
      {
        name: "Balsamic Rabbit Jus",
        note: "Rabbit + chicken feet roasted, mirepoix sautéed in, water, juniper, red wine, balsamic reduction. Reduced overnight to a thick texture.",
      },
    ],
    info: "Omitting mushrooms/pork can leave the plate looking sparse — ask the kitchen to bump another component.",
    fireTime: "12 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Meat", "Pork"],
    modifications: "Gluten Free, Pork Free.",
    mark: "F/S",
    price: "$32",
  },
  {
    id: "agnolotti-aragosta",
    name: "Agnolotti all’Aragosta",
    category: "Pasta",
    description: "Agnolotti stuffed with lobster and leek puree, finished with lobster sauce.",
    preparation:
      "Agnolotti cooked in our pasta well until filling is thoroughly hot. Lobster stock reduced by half in a hot sauté pan and mounted with butter. Agnolotti tossed in the sauce, plated, garnished with gremolata.",
    ingredients: [
      {
        name: "Lobster Stock",
        note: "Lobster Head, Shrimp Shells, Onion, White Mirepoix (Fennel, Onion, Celery), Saffron, Pernod, Fish Stock.",
      },
      {
        name: "Lobster Filling",
        note: "Lobster, Olive Oil, leek, shallot, garlic, mascarpone, S&P, lemon zest, chives.",
      },
      { name: "Gremolata", note: "Parsley, lemon zest, bread." },
    ],
    fireTime: "8 Minutes",
    dietaryRestrictions: ["Alcohol", "Allium", "Dairy", "Gluten", "Shellfish"],
    modifications: "N/A",
    mark: "F/K/S",
    price: "$35",
  },
  {
    id: "spaghetti-loren",
    name: "Spaghetti alla Sophia Loren",
    category: "Pasta",
    description:
      "Gragnano pasta cooked in tomato water infused with tomato leaves, served over Early Girl tomato sauce, garnished with crispy garlic threads, basil, and black garlic.",
    preparation:
      "Spaghetti is cooked first in water, then in tomato water and an aromatic oil with basil and parsley. Plated beside a smear of pomodoro with a crispy basil leaf and fried cherry tomatoes.",
    ingredients: [
      {
        name: "Tomato Water",
        note: "Roma tomatoes crushed and strained overnight through cheesecloth. Remaining water boiled clear.",
      },
      { name: "Aromatic Oil", note: "Rosemary, Black Garlic, Calabrian Chile, Basil Stems." },
      { name: "Pomodoro", note: "Whole cluster tomatoes, garlic, onion, simmered for 3 hours." },
    ],
    info: "Named for Sophia Loren — created by Chef Chiarello for her 80th birthday. Pasta is imported from her hometown of Gragnano, Italy.",
    fireTime: "12 Minutes",
    dietaryRestrictions: ["Allium", "Gluten", "Nightshade", "Peanut"],
    modifications: "Allium Free, Gluten Free, Peanut Free.",
    mark: "F/S",
    price: "$28",
  },
  // ───────────────────────────── SECONDI ─────────────────────────────
  {
    id: "lasagnetta-zucchine",
    name: "Lasagnetta di Zucchine",
    category: "Secondi",
    description:
      "Oven baked layers of zucchini, potato, tomato passata and Pecorino Romano with fennel and herb insalatina.",
    preparation:
      "Tiella sauce placed in a tray and layered with potato and zucchini slices, panko breadcrumbs, and parmesan. Par-cooked in the oven.",
    ingredients: [
      {
        name: "Tiella Sauce",
        note: "Toasted garlic, EVOO, tomato passata reduced by ¼, basil, Calabrian chile.",
      },
      { name: "Tomato Passata", note: "Crushed tomatoes." },
      {
        name: "Insalata",
        note: "Celery, shaved fennel, arugula, lemon juice vinaigrette, OO.",
      },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Nightshade"],
    modifications: "No insalata.",
    mark: "F/K",
    price: "$27",
  },
  {
    id: "wagyu-tomahawk",
    name: "Wagyu Tomahawk alla Griglia",
    category: "Secondi",
    description:
      "42oz Grilled Senku Australian Wagyu Tomahawk with potatoes “Da Delfina” and Sautéed Spinach.",
    preparation:
      "S&P, wood grilled on both sides over California Oak & Almond wood to desired temperature. Served with Marble Potatoes “Da Delfina” and sautéed seasonal vegetables.",
    ingredients: [
      {
        name: "Potatoes Da Delfina",
        note: "Steamed then roasted in the wood oven for pickup. Sautéed spinach with confit garlic.",
      },
      {
        name: "Bistecca Jus",
        note: "Mirepoix, reduced red wine, veal stock. Reduced thick and rich.",
      },
    ],
    fireTime: "Medium Rare: 40 Minutes (±5 per temp step)",
    dietaryRestrictions: ["Nightshade", "Allium"],
    modifications: "No Jus. Sub mashed potatoes and spinach.",
    mark: "F/S/SK",
    price: "$285",
  },
  {
    id: "bistecca-fiorentina",
    name: "Bistecca alla Fiorentina",
    category: "Secondi",
    description: "40oz Wood grilled Porterhouse with seasonal vegetables and ancient grain polenta.",
    preparation:
      "S&P, wood grilled on both sides over California Oak & Almond wood. Plated with seasonal vegetables, polenta, and bistecca jus.",
    ingredients: [
      { name: "Polenta", note: "See Polenta Antica." },
      { name: "Bistecca Jus", note: "Mirepoix, reduced red wine, veal stock." },
    ],
    fireTime: "Medium Rare: 35 Minutes (±5 per temp step)",
    dietaryRestrictions: ["Allium", "Dairy", "Meat"],
    modifications: "Allium Free, Dairy Free.",
    mark: "F/S/SK",
    price: "$175",
  },
  {
    id: "branzino",
    name: "Branzino alla Griglia",
    category: "Secondi",
    description: "Wood grilled Branzino and lemon preserved sauce, roasted artichokes and olives.",
    preparation:
      "Fish is butterflied, mostly deboned. S&P, OO. Wood grilled on both sides. Served with roasted artichokes and olives.",
    ingredients: [
      {
        name: "Artichokes & Olives",
        note: "Roasted, tossed in preserved lemon sauce.",
      },
      {
        name: "Fish Sauce",
        note: "Meyer lemon conserva, shallots, capers, boquerones.",
      },
    ],
    fireTime: "5–8 Minutes",
    dietaryRestrictions: ["Allium", "Fish"],
    modifications: "Allium Free (No Sauce).",
    mark: "F/K",
    price: "$40",
  },
  {
    id: "anatra",
    name: "Conserva d’Anatra",
    category: "Secondi",
    description: "Confit duck leg, gigante white beans, tomato pomodoro sugo.",
    preparation:
      "Duck leg confit placed atop gigante white beans and tomato pomodoro sugo. ‘Sugo’ sits between soup and stew in consistency.",
    ingredients: [
      {
        name: "Tomato Pomodoro Sugo",
        note: "Hand crushed ruby red tomatoes, oregano, minced garlic, rosemary, OO.",
      },
      {
        name: "Duck Leg",
        note: "Cured (juniper, bay leaf, peppercorn), rinsed, confit in duck fat with thyme and bay leaf. Crisped in OO to order.",
      },
      {
        name: "Gigante White Beans",
        note: "Soaked beans cooked with mirepoix (carrot, onion, celery, garlic), bay leaf, thyme. Seasoned with S&P.",
      },
    ],
    fireTime: "10 Minutes",
    dietaryRestrictions: ["Legumes", "Nightshade", "Allium"],
    modifications: "N/A",
    mark: "F/K/S",
    price: "$35",
  },
  {
    id: "pollo-diavola",
    name: "Pollo alla Diavola",
    category: "Secondi",
    description:
      "Calabrian Marinated Chicken with Roasted Cipollini Onions, Cherry Tomatoes and Shishito Peppers in Chicken Jus.",
    preparation:
      "Chicken brined 4 hours (salt, water, brown sugar), then soaked in Calabrian chili marinade. Roasted under a brick in the wood oven for even cooking and crispy skin. Finished with rubbed Calabrian chili and served with roasted shishitos, cipollini, and blistered cherry tomatoes.",
    ingredients: [
      {
        name: "Calabrian Chili Marinade",
        note: "Calabrian Chili, White Wine, Rosemary, Whole Eggs, S&P.",
      },
    ],
    info: "‘Mattone’ = cooking under tile / brick, a Tuscan technique. ‘Alla Diavola’ refers to the heat — devil-style chicken.",
    fireTime: "8 Minutes",
    dietaryRestrictions: ["Allium", "Nightshade", "Egg"],
    modifications: "No Peppers, No Tomatoes, No Onion.",
    mark: "F/SK",
    price: "$37",
  },
  {
    id: "brodetto",
    name: "Brodetto ai Frutti di Mare",
    category: "Secondi",
    description:
      "Codfish, Gulf Prawns, Savory Clams, Monterey Calamari and Mussels in White Wine Tomato Broth with an Olive Oil Crouton, Saffron Aioli and Tagliarini pasta.",
    preparation:
      "4 pieces Cod, 3 prawns, 6 clams, 1.5 oz calamari, 6 mussels sautéed with Tomato Sofrito, white wine, lobster stock; reduced. Tagliarini pasta added to bowl with brodetto on top.",
    ingredients: [
      {
        name: "Tomato Sofrito",
        note: "Tomato Passata, Sweet Onion, Garlic, Red Wine, White Wine Vinegar, Anchovy, Caper.",
      },
      { name: "Tomato Passata", note: "Crushed tomatoes." },
      {
        name: "Lobster Stock",
        note: "Lobster Head, Shrimp Shells, Onion, White Mirepoix (Fennel, Onion, Celery), Saffron, Pernod, Fish Stock.",
      },
      {
        name: "Saffron Aioli",
        note: "OO, Egg Yolk, White Wine, White Wine Vinegar, Shallot, Saffron.",
      },
    ],
    fireTime: "10 Minutes",
    dietaryRestrictions: ["Allium", "Egg", "Gluten", "Nightshade", "Shellfish", "Fish"],
    modifications: "No Aioli, No Crouton, GF Pasta.",
    mark: "F/S",
    price: "$55",
  },
  {
    id: "costolette-manzo",
    name: "Costolette di Manzo",
    category: "Secondi",
    description:
      "Smoked and Braised Short Ribs in Espresso Agro-Dolce over Creamy Ancient Grain Polenta with Calabrian Pepperonata and Crispy Shallots.",
    preparation:
      "Short ribs brined 5 hours, braised 8 hours with red wine, mirepoix, and veal stock. Brought to temperature in the braising liquid and finished in espresso agro-dolce with a side of ancient grain polenta.",
    ingredients: [
      { name: "Agrodolce", note: "Coffee beans, honey, ketchup, soy sauce, balsamic." },
    ],
    info: "Creekstone Farms open-choice Black Angus short ribs — a Chef Chiarello signature since Tra Vigne days.",
    fireTime: "< 3 Minutes (pickup)",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Soybean", "Nightshade"],
    modifications: "Sub/No Polenta (Dairy). No Agrodolce (Gluten, Soybean).",
    mark: "F/K",
    price: "$45",
  },
  // ───────────────────────────── CONTORNI ─────────────────────────────
  {
    id: "brussels-arrostiti",
    name: "Cavoletti di Bruxelles Arrostiti",
    category: "Contorni",
    description: "Forno roasted brussels sprouts with black truffles sott’olio and “Salsa all’Uovo”.",
    preparation:
      "Brussels seared in a very hot pan with S&P and roasted in the forno. Plated with egg sauce, finished with parsley and truffle conserva.",
    ingredients: [
      { name: "Egg Sauce", note: "Boiled egg, shallots, crispy capers, OO." },
      { name: "Truffle Conserva", note: "Truffles preserved in OO & truffle oil, frozen." },
    ],
    fireTime: "8 Minutes",
    dietaryRestrictions: ["Allium", "Egg", "Peanut"],
    modifications: "No Egg Sauce (Allium, Egg, Peanut).",
    price: "$19",
  },
  {
    id: "patatine-tartufo",
    name: "Patatine Fritte e Tartufo",
    category: "Contorni",
    description: "Truffle Fries topped with Parmigiano Reggiano and crispy sage.",
    preparation: "Fried in peanut oil. Tossed in truffle oil, S&P, parsley. Topped with parmigiano and crispy sage.",
    ingredients: [],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Dairy", "Nightshade", "Peanut"],
    modifications: "Can be done plain (no dairy).",
    price: "$16",
  },
  {
    id: "polenta-antica",
    name: "Polenta Antica",
    category: "Contorni",
    description: "Creamy ancient grain polenta finished with Fontina cheese and Parmigiano Reggiano.",
    preparation: "Polenta mixture kept in the hot box during service and plated to order.",
    ingredients: [
      {
        name: "Polenta",
        note: "Anson Mills Polenta, heavy cream, chicken stock, fontina cheese, parmigiano, nutmeg, salt.",
      },
    ],
    info: "Anson Mills heirloom corn from North Carolina, special-ordered. Chef Chiarello verified preparation personally.",
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Meat"],
    modifications: "None",
    mark: "S",
    price: "$16",
  },
  // ───────────────────────────── DOLCI ─────────────────────────────
  {
    id: "biscotti",
    name: "Biscotti",
    category: "Dolci",
    description: "Assortment of Italian-American classics with a Bottega twist. Rotates seasonally.",
    preparation: "Dough is baked and dried in the pastry oven.",
    ingredients: [
      { name: "Base Dough", note: "Semolina Flour, Sugar, Egg, Butter, Vanilla." },
      { name: "Seasonal Flavors", note: "Added to the base dough depending on the cookie." },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Gluten", "Nuts"],
    modifications: "Type of biscotto.",
    mark: "F",
    price: "$10",
  },
  {
    id: "sorbetti",
    name: "Sorbetti",
    category: "Dolci",
    description: "House made sorbetti. Rotates seasonally.",
    preparation: "Sorbet base mixed with pureed fruit in our Carpigiani machine.",
    ingredients: [{ name: "Sorbet Base", note: "Glucose, Sugar, Water, Pectin." }],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: [],
    modifications: "Type of sorbetto.",
    mark: "S",
    price: "Flight $14 · Single $5",
  },
  {
    id: "gelati",
    name: "Gelati",
    category: "Dolci",
    description: "House made gelati.",
    preparation: "Gelato base mixed with seasonal flavors in our Carpigiani machine.",
    ingredients: [
      { name: "Gelato Base", note: "Milk, Cream, Sugar, Gum Starch Stabilizer, Eggs." },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Dairy", "Egg"],
    modifications: "Type of gelato.",
    mark: "S",
    price: "Flight $14 · Single $5",
  },
  {
    id: "affogato",
    name: "Affogato",
    category: "Dolci",
    description: "Espresso over one scoop of gelato served with biscotti.",
    preparation: "Biscotti and gelato picked up from pastry and walked to the bar where it is finished with espresso.",
    ingredients: [
      { name: "See Gelati", note: "Same base as Gelati." },
      { name: "See Biscotti", note: "Same base as Biscotti." },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Gluten", "Nuts", "Dairy", "Egg"],
    modifications: "Decaf, No Biscotti, Type of Gelato.",
    mark: "S",
    price: "$14",
  },
  {
    id: "tiramisu",
    name: "Tiramisù alla ‘Tra Vigne’",
    category: "Dolci",
    description:
      "Devil's food cake with layers of mascarpone mousse and a cocoa-dusted milk chocolate shell served over coffee soil.",
    preparation:
      "Built in layers: mascarpone mousse, coffee cremeaux, devil's food cake, soaked in coffee syrup. Dipped in chocolate, refrigerated, then sprayed with chocolate mist. Plated over coffee soil with seasonal garnish.",
    ingredients: [
      {
        name: "Mascarpone Mousse",
        note: "Mascarpone, Cream, Gelatin, Sugar, Egg Yolks, Marsala Wine. Aerated light and fluffy.",
      },
      {
        name: "Coffee Cremeaux",
        note: "Milk, Sugar, Gelatin, Cream, Chocolate, Coffee Extract.",
      },
      {
        name: "Devil's Food Cake",
        note: "AP Flour, Sugar, Cocoa Powder, Baking Soda & Powder, Salt, Egg, Butter, Buttermilk, Water, Cocoa Extract.",
      },
      {
        name: "Coffee Soil",
        note: "Sugar, Almond Meal, AP Flour, Cocoa Powder, Coffee Grounds, Butter, Salt.",
      },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Dairy", "Egg", "Gluten", "Nuts", "Pork"],
    modifications: "No Soil (Nuts).",
    mark: "S",
    price: "$14",
  },
  {
    id: "zeppole",
    name: "Zeppole",
    category: "Dolci",
    description: "Cocoa sugar dusted donuts with a house made chocolate drizzle.",
    preparation: "Bombolini dough fried, flipped to cook evenly, tossed in cocoa, cinnamon, and sugar.",
    ingredients: [
      {
        name: "Bombolini Dough",
        note: "Yeast, Water, Sugar, Eggs, Cream, AP Flour, Salt, Vanilla Paste, Butter.",
      },
    ],
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Dairy", "Egg", "Gluten"],
    modifications: "No tossed coating.",
    mark: "F",
    price: "$14",
  },
  {
    id: "panna-cotta",
    name: "Panna Cotta",
    category: "Dolci",
    description: "Coconut Vanilla Panna Cotta.",
    preparation: "Plated with coconut tuile, pineapple chip, and sautéed pineapple.",
    ingredients: [
      {
        name: "Coconut Panna Cotta",
        note: "Heavy cream, coconut milk, sugar, gelatin, dry coconut.",
      },
      { name: "Vanilla Anglaise", note: "Egg yolks, sugar, milk, heavy cream, vanilla paste." },
      { name: "Coconut Tuile", note: "Egg whites, sugar, butter, AP flour, dried coconut." },
      { name: "Pineapple Chip", note: "Fresh pineapple, sugar." },
      { name: "Sautéed Pineapple", note: "Fresh pineapple, brown sugar, butter, salt, rum." },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Dairy", "Gluten", "Egg", "Pork"],
    modifications: "No Coconut Tuile (Gluten).",
    mark: "F",
    price: "$14",
  },
  {
    id: "cannoli",
    name: "Spiced Apple Cannoli",
    category: "Dolci",
    description: "Spiced Apple Mascarpone Cannoli with Candied Pecans.",
    preparation:
      "House made cannoli shells piped with spiced apple mascarpone, ends dipped in candied hazelnuts, topped with powdered sugar.",
    ingredients: [
      {
        name: "Cannoli Shell",
        note: "AP Flour, Sugar, Salt, Cinnamon, Cocoa Powder, Butter, Verjus, Marsala Wine.",
      },
      {
        name: "Cannoli Filling",
        note: "Mascarpone, Vanilla Extract, Brown Sugar, Spiced Apple.",
      },
      {
        name: "Spiced Apples",
        note: "Fresh Apples, Butter, Star Anise, Brown Sugar, Cinnamon, Apple Brandy.",
      },
      { name: "Candied Pecans", note: "Pecans, Sugar, Salt." },
      { name: "Powdered Sugar", note: "Powdered sugar, ground cinnamon." },
    ],
    fireTime: "< 3 Minutes",
    dietaryRestrictions: ["Dairy", "Gluten", "Nuts"],
    modifications: "N/A",
    mark: "F",
    price: "$14",
  },
  // ───────────────────────────── LUNCH ONLY ─────────────────────────────
  {
    id: "shortrib-burger",
    name: "Grilled Short Rib Cheeseburger",
    category: "Lunch Only",
    description: "Semolina bun with Fontina cheese, truffle aioli, and parmesan fries.",
    preparation:
      "Patty cooked to order. Plated on a semolina bun with truffle aioli and Fontina cheese. Served with dressed lettuce & tomato and a side of parmesan fries.",
    ingredients: [
      {
        name: "Short Rib Patty",
        note: "Portioned to 8oz, sous vide using steam from our Rational oven to Medium Rare.",
      },
      {
        name: "Truffle Aioli",
        note: "Garlic, truffle oil, minced truffle, OO, dijon mustard, sherry vinegar, egg yolk.",
      },
      { name: "Lettuce & Tomato", note: "Dressed with balsamic vinegar, chopped shallots, OO." },
      { name: "Parmesan Fries", note: "Fries, S&P, parmigiano, parsley." },
    ],
    info: "Meat from the shorter bones in the rack is ground for our burger mix. Fontina Val d’Aosta is a semi-soft cow’s milk cheese from Piedmont, aged 90 days.",
    fireTime: "8–10 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Meat", "Peanut"],
    modifications: "Allium Free, Dairy Free, Gluten Free, Substitute Fries.",
    price: "$25",
  },
  {
    id: "ny-steak",
    name: "New York Steak",
    category: "Lunch Only",
    description: "10oz New York Steak and Truffle Fries.",
    preparation:
      "Steak seasoned with S&P and cooked to order. Topped with chimichurri and served with a side of truffle fries.",
    ingredients: [
      { name: "Chimichurri", note: "Parsley, sherry vinegar, garlic, OO, Calabrian chile." },
      { name: "Truffle Fries", note: "Topped with Parmigiano Reggiano and truffle conserva." },
      { name: "Truffle Conserva", note: "Truffles preserved in OO & truffle oil, frozen." },
    ],
    info: "Cut from Creekstone Farms.",
    fireTime: "8–10 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Peanut"],
    modifications: "Allium Free, Dairy Free, Substitute Fries.",
    mark: "F/SK",
    price: "$40",
  },
  {
    id: "raviolo",
    name: "Raviolo",
    category: "Lunch Only",
    description:
      "Potato Pasta filled with Farm Hen Egg Yolk, Ricotta and Swiss Chard with Sage Browned Butter, Crispy Sage, and Black Truffles.",
    preparation:
      "Boiled until the dough cooks. Topped with sage brown butter, parmesan, and black truffle conserva.",
    ingredients: [
      {
        name: "Raviolo Dough",
        note: "Kennebec Potatoes, 00 Flour, Egg Yolk, Parmigiano, Nutmeg.",
      },
      {
        name: "Raviolo Filling",
        note: "Spinach, Swiss chard, nutmeg, egg yolk, ricotta cheese.",
      },
      { name: "Truffle Conserva", note: "Truffles preserved in OO & truffle oil, frozen." },
    ],
    info: "Singular form of Ravioli. Cut tableside like a pie so the yolk runs into the butter — describe the show when dropping the plate.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Dairy", "Egg", "Gluten", "Peanut"],
    modifications: "Toppings.",
    mark: "F/K/S",
    price: "$29",
  },
  {
    id: "fusilli-michelangelo",
    name: "Fusilli alla Michelangelo",
    category: "Lunch Only",
    description:
      "Spiral pasta with Shiitake mushrooms, sun dried tomatoes, toasted pine nuts, spicy tomato sauce, finished with arugula and aged Pecorino Romano.",
    preparation:
      "Shiitake browned, add garlic, Calabrian chili, sundried tomatoes, fresh basil. Sautéed with spicy tomato sauce and finished with arugula.",
    ingredients: [
      {
        name: "Spicy Tomato Sauce",
        note: "Jalapeños blistered in OO and removed. Add tomato, garlic, onion, sundried tomatoes, fresh basil.",
      },
    ],
    info: "One of two pastas not made in-house.",
    fireTime: "5 Minutes",
    dietaryRestrictions: ["Allium", "Dairy", "Gluten", "Nightshade", "Nuts"],
    modifications: "Allium Free, Dairy Free, Gluten Free, Nut Free.",
    mark: "F/K",
    price: "$27",
  },
];