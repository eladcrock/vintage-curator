// Post-build static prerender for Netlify.
// Copies dist/client/index.html into per-route folders and injects
// route-specific <title> + <meta description> so each URL serves real
// static HTML with correct metadata. Hydration takes over on load.
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.resolve("dist/client");
const SHELL_PATH = path.join(ROOT, "index.html");

const ROUTES = [
  {
    path: "/",
    title: "Bottega Pro · Wine & Bar",
    description: "Search the Bottega wine list by vintage, type, region, and price.",
  },
  {
    path: "/bar",
    title: "Bottega Pro · Bar",
    description: "Cocktails, spirits, and bar program reference for Bottega.",
  },
  {
    path: "/bar/study",
    title: "Bottega Pro · Bar Study",
    description: "Cocktail flashcards, missing ingredient drills, and bar study challenges.",
  },
  {
    path: "/btg",
    title: "Bottega Pro · BTG Wines",
    description: "By-the-glass wine talking points and service notes.",
  },
  {
    path: "/btg/study",
    title: "Bottega Pro · BTG Study",
    description: "Flashcards, fill-in-the-blank, and multiple choice drills for BTG wines.",
  },
  {
    path: "/food",
    title: "Bottega Pro · Food",
    description: "The Bottega menu, pairings, ingredients, and service notes.",
  },
  {
    path: "/food/study",
    title: "Bottega Pro · Food Study",
    description: "Food menu flashcards, allergen checks, and ingredient study challenges.",
  },
  {
    path: "/experiences",
    title: "Bottega Pro · Show Time",
    description: "Chef's tasting menus curated by budget and dietary needs.",
  },
  {
    path: "/education",
    title: "Bottega Pro · Education",
    description: "Staff training reference for wine, food, and service.",
  },
  {
    path: "/education/study",
    title: "Bottega Pro · Wine Education Study",
    description: "Wine region flashcards and quizzes for staff training.",
  },
  {
    path: "/education/food",
    title: "Bottega Pro · Food Education",
    description: "Sourcing, purveyors, ingredient quality, and food education notes.",
  },
  {
    path: "/education/food/study",
    title: "Bottega Pro · Food Education Study",
    description: "Flashcards and quizzes on sourcing, purveyors, and ingredient stories.",
  },
  {
    path: "/study",
    title: "Bottega Pro · Wine Study",
    description: "Wine producer stories, glossary knowledge, and staff study cards.",
  },
];

function inject(html, { title, description }) {
  return html
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${description}" />`,
    );
}

const shell = await fs.readFile(SHELL_PATH, "utf8");
let count = 0;
for (const r of ROUTES) {
  const html = inject(shell, r);
  if (r.path === "/") {
    await fs.writeFile(SHELL_PATH, html);
  } else {
    const dir = path.join(ROOT, r.path);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, "index.html"), html);
  }
  count++;
}
console.log(`Prerendered ${count} routes into ${ROOT}`);
