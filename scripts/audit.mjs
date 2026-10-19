// End-to-end audit against a running server (BASE_URL, default http://localhost:3000):
// crawls every internal link, runs axe WCAG 2.x A/AA checks on each page, and exercises
// the mobile menu, project filter and contact form. Exits non-zero on any failure.
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const failures = [];
const fail = (msg) => {
  failures.push(msg);
  console.log(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);
const check = (ok, passMsg, failMsg) => (ok ? pass(passMsg) : fail(failMsg));

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
const page = await context.newPage();
const pageErrors = [];
page.on("pageerror", (e) => pageErrors.push(`${page.url()}: ${e.message}`));

// 1. Crawl internal links, with accessibility and content checks on every page.
console.log("Links and accessibility");
const queue = ["/"];
const seen = new Set(queue);
while (queue.length) {
  const path = queue.shift();
  const res = await page.goto(base + path, { waitUntil: "networkidle" });
  const status = res?.status() ?? 0;
  if (status !== 200) {
    fail(`${path} returned ${status}`);
    continue;
  }
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const href of hrefs) {
    if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
    const clean = href.split("#")[0] || "/";
    if (!seen.has(clean)) {
      seen.add(clean);
      queue.push(clean);
    }
  }
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  for (const v of results.violations) fail(`${path} axe ${v.id}: ${v.help} (${v.nodes.length} nodes) ${v.nodes[0]?.target}`);
  if (!results.violations.length) pass(`${path} 200, no axe violations`);
  const h1s = await page.$$eval("h1", (els) => els.length);
  if (h1s !== 1) fail(`${path} has ${h1s} h1 elements`);
  const text = await page.innerText("main");
  if (/\b(TODO|TBD|lorem ipsum|placeholder)\b/i.test(text)) fail(`${path} shows editorial or placeholder text`);
}

const missing = await page.goto(`${base}/this-page-does-not-exist`);
check(missing?.status() === 404, "unknown route returns 404", `unknown route returned ${missing?.status()}`);
const missingProject = await page.goto(`${base}/work/not-a-project`, { waitUntil: "networkidle" });
check(
  (await page.getByRole("heading", { name: /does not exist/i }).count()) > 0,
  "unknown project shows not-found page",
  `unknown project did not render not-found (status ${missingProject?.status()})`,
);

for (const asset of ["/sitemap.xml", "/robots.txt", "/opengraph-image", "/work/lumdi/opengraph-image"]) {
  const res = await page.request.get(base + asset);
  check(res.ok(), `${asset} ${res.status()}`, `${asset} returned ${res.status()}`);
}

// 2. Project filter.
console.log("Project filter");
await page.goto(`${base}/work`, { waitUntil: "networkidle" });
const archive = page.locator('[role="group"][aria-label="Filter projects by type"] + p + ul > li');
const total = await archive.count();
await page.getByRole("button", { name: /^Websites/ }).click();
const filtered = await archive.count();
check(filtered > 0 && filtered < total, `filter narrows ${total} → ${filtered}`, `filter did not narrow (${total} → ${filtered})`);
check(
  (await page.getByRole("button", { name: /^Websites/ }).getAttribute("aria-pressed")) === "true",
  "active filter exposes aria-pressed",
  "active filter missing aria-pressed",
);

// 3. Mobile navigation.
console.log("Mobile navigation");
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await mobile.goto(`${base}/`, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Open menu" }).click();
check(await mobile.getByRole("dialog").isVisible(), "menu opens as a dialog", "menu did not open");
await mobile.keyboard.press("Escape");
check((await mobile.getByRole("dialog").count()) === 0, "Escape closes the menu", "Escape did not close the menu");
await mobile.getByRole("button", { name: "Open menu" }).click();
await mobile.getByRole("dialog").getByRole("link", { name: /Expertise/ }).click();
await mobile.waitForURL("**/expertise");
check((await mobile.getByRole("dialog").count()) === 0, "menu link navigates and closes", "menu stayed open after navigation");
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
check(!overflow, "no horizontal overflow at 390px", "horizontal overflow on mobile");

// 4. Contact form.
console.log("Contact form");
await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.getByRole("button", { name: "Send message" }).click();
await page.locator("form [role=alert]").waitFor();
const invalid = await page.locator('[aria-invalid="true"]').count();
check(invalid >= 4, `server validation flags ${invalid} fields`, `expected ≥4 invalid fields, got ${invalid}`);
const focused = await page.evaluate(() => document.activeElement?.getAttribute("role"));
check(focused === "alert", "focus moves to the error summary", `focus on ${focused}`);
await page.getByLabel("Name").fill("Audit Visitor");
await page.getByLabel("Email").fill("visitor@example.org");
await page.getByLabel("What is it about?").selectOption("Technology project");
await page.getByLabel("Message").fill("This is an automated audit message checking the contact form.");
await page.getByRole("button", { name: "Send message" }).click();
// Without RESEND_API_KEY a production server reports a delivery error with an email fallback;
// with it, the success state appears. Either is a handled outcome; a validation error is not.
const outcome = page.locator('main [role="status"] h2, form [role="alert"]').filter({ hasNotText: "highlighted" }).first();
await outcome.waitFor({ timeout: 15000 });
const outcomeText = (await outcome.innerText()).split("\n")[0];
check(!/highlighted/.test(outcomeText), `valid submission handled: "${outcomeText}"`, `valid input rejected: ${outcomeText}`);

for (const e of pageErrors) fail(`page error ${e}`);

await browser.close();
console.log(`\n${seen.size} pages crawled, ${failures.length} failure(s).`);
process.exit(failures.length ? 1 : 0);
