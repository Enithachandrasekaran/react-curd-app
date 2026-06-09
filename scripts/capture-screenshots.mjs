import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "screenshots");
const base = "https://enithachandrasekaran.github.io/react-curd-app";

const pages = [
  { name: "home", path: "/" },
  { name: "counter", path: "/counter" },
  { name: "todo", path: "/todo" },
  { name: "crud", path: "/crud" },
  { name: "movies", path: "/movies" },
  { name: "weather", path: "/weather" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const { name, path: route } of pages) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
  console.log(`Saved ${name}.png`);
}

await browser.close();
