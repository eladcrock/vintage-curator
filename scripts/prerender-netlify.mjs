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
    path: "/food",
    title: "Bottega Pro · Food",
    description: "The Bottega menu — pairings, ingredients, and service notes.",
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
