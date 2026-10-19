// Usage: node scripts/screenshot.mjs <outDir> <path...>
// Captures full-page desktop and mobile screenshots from a running server (BASE_URL).
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const [outDir, ...paths] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport, reducedMotion: "reduce" });
  for (const path of paths) {
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Scroll through the page so in-view reveals run before capture.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    const file = join(outDir, `${name}${path.replace(/\//g, "_") || "_home"}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    if (process.env.SEGMENTS) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      const step = viewport.width > 800 ? 1600 : 1700;
      for (let y = 0, i = 0; y < height; y += step, i++) {
        await page.screenshot({
          path: file.replace(".png", `.${i}.png`),
          fullPage: true,
          clip: { x: 0, y, width: viewport.width, height: Math.min(step, height - y) },
        });
      }
    }
  }
  await page.close();
}
await browser.close();
