/**
 * Beer list for the Bar Program tab. Lives below cocktails on /bar.
 */

export type Beer = {
  id: string;
  name: string;
  price: number;
  style: string;
  origin: string;
  format: string;
  note?: string;
};

export const BEERS: Beer[] = [
  {
    id: "hanabi",
    name: "Hanabi",
    price: 25,
    style: "Specialty Lager",
    origin: "Napa Valley",
    format: "500ml Bottle",
    note: "Napa-brewed specialty lager - the splurge bottle of the list, meant for sharing.",
  },
  {
    id: "almanac-love",
    name: "Almanac 'Love'",
    price: 16,
    style: "Hazy IPA",
    origin: "California",
    format: "480ml Can",
    note: "Bay Area cult brewery; juicy, soft, and balanced - the IPA pick.",
  },
  {
    id: "baladin-super",
    name: "Baladin 'Super'",
    price: 15,
    style: "Strong Amber Ale",
    origin: "Italy",
    format: "330ml Bottle",
    note: "Teo Musso's flagship from Piozzo - the beer that helped launch Italian craft brewing.",
  },
  {
    id: "birra-friuli",
    name: "Birra Friuli",
    price: 14,
    style: "Blonde Lager",
    origin: "Italy",
    format: "330ml Bottle",
    note: "Crisp Friulian lager - the easy-drinking Italian option.",
  },
  {
    id: "bavik-super-pils",
    name: "Bavik Super Pils",
    price: 12,
    style: "Belgian Pilsner",
    origin: "Belgium",
    format: "330ml Bottle",
    note: "West-Flemish pilsner brewed by De Brabandere since 1894; clean, hop-forward.",
  },
  {
    id: "weihenstephaner-na",
    name: "Weihenstephaner",
    price: 10,
    style: "Non-Alcoholic Malt Beer",
    origin: "Germany",
    format: "330ml Bottle",
    note: "From the world's oldest continuously operating brewery (founded 1040). The NA option.",
  },
];