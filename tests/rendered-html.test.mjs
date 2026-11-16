import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the research and maker portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AI Agent RL Environments \| Neural Intelligence Labs/);
  assert.match(html, /Reinforcement learning environments for/);
  assert.match(html, /Maker(?:&apos;|&#x27;|')s portfolio/i);
  assert.match(html, /San Francisco \+ Chicago/);
  assert.match(html, /Switch to light theme/);
  assert.match(html, /\/mehrdad-zaker-three-quarter-transparent\.webp/);
  assert.match(html, /Personal site &amp; writing/);

  for (const project of [
    "Persian Ink", "Persian Swipe", "Trailhead: Deep Focus",
    "Lady: Family Routines", "LinkedFull", "Koto", "Open Radio",
  ]) {
    assert.match(html, new RegExp(`>${project}<`));
  }
  assert.doesNotMatch(html, /(?:>Selva<|>RepoFix<|href="\/?#index-case")/);
  assert.ok(html.indexOf('id="portfolio"') < html.indexOf('id="programs"'), "Current projects appear before research");
});

test("homepage projects use real app icons, local product links and the Open Radio mark", async () => {
  const html = await (await render()).text();
  for (const [slug, image] of [
    ["persian-ink", "app-icon-calligraphy.jpg"],
    ["persian-swipe", "app-icon-calligraphy.jpg"],
    ["trailhead", "app-icon.jpg"], ["lady", "app-icon.jpg"],
    ["linkedfull", "app-icon.jpg"],
  ]) {
    assert.ok(html.includes(`/apps/${slug}/${image}`), `App icon for ${slug}`);
    assert.ok(html.includes(`href="/apps/${slug}/"`), `Local product link for ${slug}`);
  }
  assert.match(html, /\/projects\/open-radio-logo\.svg/);
  assert.match(html, /\/projects\/koto-logo\.webp/);
  assert.match(html, /https:\/\/github\.com\/mehrdadxzaker\/Koto/);
  assert.match(html, /https:\/\/github\.com\/mehrdadxzaker\/radiodesk/);
});

test("supports a dark default, persistent theme choices, and narrow mobile layouts", async () => {
  const [toggle, styles, exporter, layout] = await Promise.all([
    readFile(
      new URL("../app/components/ThemeToggle.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(
      new URL("../scripts/export-github-pages.mjs", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(toggle, /localStorage\.setItem\("nil-theme"/);
  assert.match(toggle, /localStorage\.getItem\("nil-theme"\)/);
  assert.match(toggle, /stored === "light" \|\| stored === "dark"/);
  assert.match(toggle, /return "dark"/);
  assert.match(styles, /:root\[data-theme="dark"\]/);
  assert.match(styles, /@media \(max-width: 620px\)/);
  assert.match(styles, /@media \(max-width: 480px\)/);
  assert.match(layout, /data-theme-bootstrap/);
  assert.match(layout, /localStorage\.getItem\("nil-theme"\)/);
  assert.match(exporter, /data-theme-runtime/);
  assert.match(exporter, /localStorage\.setItem\("nil-theme"/);
  assert.match(exporter, /data-theme-bootstrap/);
  assert.match(exporter, /mehrdad-zaker-headshot\.jpeg/);
  assert.match(exporter, /mehrdad-zaker-three-quarter-transparent\.webp/);
});

test("server-renders the researcher profile", async () => {
  const response = await render("/people/mehrdad");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Mehrdad Zaker, Ph\.D\./);
  assert.match(html, /reinforcement-learning/i);
  assert.match(html, /Neural Intelligence Labs/);
  assert.match(html, /San Francisco \+ Chicago/);
  assert.match(html, /\/mehrdad-zaker-three-quarter-transparent\.webp/);
  assert.match(html, /Personal site &amp; writing/);
});

test("server-renders the NeuralInt app directory and legal routes", async () => {
  const expectations = [
    ["/apps", /Useful software,[\s\S]*made with care/],
    ["/apps/trailhead/privacy", /Your focus stays yours/],
    ["/apps/trailhead/support", /Keep moving forward/],
    ["/apps/trailhead/review", /A clear path through the app/],
    ["/apps/lady/privacy", /A parent stays in control/],
    ["/apps/lady/support", /Less repeating/],
    ["/apps/lady/review", /Review the real family workflow/],
    ["/apps/persian-ink/privacy", /Google ML Kit operational data/],
    ["/apps/persian-ink", /Download on the App Store/],
    ["/apps/persian-ink/support", /Write, review, insert/],
    ["/apps/persian-ink/review", /Your handwriting\. Persian text/],
    ["/apps/terms", /Clear terms for useful software/],
  ];

  for (const [pathname, pattern] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, pattern, pathname);
    assert.match(html, /mehrdadz@neuralint\.io/, pathname);
  }
});

test("site navigation and app links remain identifiable and keyboard friendly", async () => {
  for (const pathname of ["/", "/apps", "/about", "/fa", "/people/mehrdad"]) {
    const html = await (await render(pathname)).text();
    assert.match(html, /<a\b(?=[^>]*class="wordmark")(?=[^>]*href="\/")/, `${pathname}: NeuralInt logo links home`);
    assert.match(html, /<a\b[^>]*href="#(?:apps-content|main-content|keyboards)"[^>]*>[^<]*(?:Skip to content|رفتن به بخش اصلی)/, `${pathname}: skip link`);
  }
  const directory = await (await render("/apps")).text();
  for (const name of ["Persian Ink", "Persian Swipe", "Trailhead", "Lady"]) {
    assert.ok(directory.includes(`aria-label="Privacy for ${name}"`));
    assert.ok(directory.includes(`aria-label="Support for ${name}"`));
  }
  assert.match(directory, /<bdi\s+lang="fa"\s+dir="rtl">نیم‌فاصله<\/bdi>/);
});

test("static export includes every app policy and review route", async () => {
  const { exportRoutes } = await import("../scripts/site-routes.mjs");
  const routes = (await exportRoutes()).map(route => route.source);

  for (const pathname of [
    "/apps/trailhead/privacy",
    "/apps/trailhead/support",
    "/apps/trailhead/review",
    "/apps/lady/privacy",
    "/apps/lady/support",
    "/apps/lady/review",
    "/apps/persian-ink/privacy",
    "/apps/persian-ink",
    "/apps/persian-ink/support",
    "/apps/persian-ink/review",
    "/apps/terms",
  ]) {
    assert.ok(routes.includes(pathname), pathname);
  }
});

test("the legacy research route redirects to the canonical homepage", async () => {
  const response = await render("/research");
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), "http://localhost").href, "http://localhost/");
});

test("Persian Ink links to its released App Store app and keeps beta access separate", async () => {
  const html = await (await render("/apps/persian-ink")).text();
  assert.match(html, /<a[^>]*href="https:\/\/apps\.apple\.com\/app\/id6832685437"[^>]*>Download on the App Store<\/a>/);
  assert.doesNotMatch(html, /<button[^>]*disabled[^>]*>Download on the App Store<\/button>/);
  assert.doesNotMatch(html, /Submitted to Apple|Public download opens after approval/);
  assert.match(html, /href="https:\/\/apps\.apple\.com\/app\/testflight\/id899247664"/);
  assert.match(html, /id="beta"/);
  assert.match(html, /redemption code/);
  assert.match(html, /US\$1\.99/);
  const support = await (await render("/apps/persian-ink/support")).text();
  assert.match(support, /href="https:\/\/apps\.apple\.com\/app\/id6832685437"/);
  assert.doesNotMatch(support, /waiting for review|Public download will open after approval/);
  assert.ok(support.indexOf('id="enable"') < support.indexOf('id="model"'));
  assert.match(support, /href="\/apps\/persian-ink\/#beta"/);
  const directory = await (await render("/apps")).text();
  assert.match(directory, /href="https:\/\/neuralint\.io\/apps\/persian-ink\/">Download &amp; setup/);
  const catalog = await (await render("/apps/catalog.json")).json();
  assert.equal(catalog.apps.find(app => app.slug === "persian-ink").availability, "available");
});


test("catalog apps have discoverable product destinations and truthful release data", async () => {
  const response = await render("/apps/catalog.json");
  assert.equal(response.status, 200);
  const catalog = await response.json();
  assert.ok(catalog.apps.length > 0, "The app catalog must not be empty");
  const slugs = catalog.apps.map(app => app.slug);
  assert.equal(new Set(slugs).size, slugs.length, "App slugs must be unique");
  assert.ok(slugs.every(slug => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)), "App slugs must be URL-safe");
  const home = await (await render("/")).text();
  const directory = await (await render("/apps")).text();
  assert.match(home, /href="(?:https:\/\/neuralint\.io)?\/apps\/?"/, "The homepage links to the app directory");
  for (const app of catalog.apps) {
    assert.ok(directory.includes('href="' + app.url + '"'));
    const page = await render(new URL(app.url).pathname.replace(/\/$/, ""));
    assert.equal(page.status, 200);
    const html = await page.text();
    const entities = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => {
      const data = JSON.parse(match[1]); return data["@graph"] ?? [data];
    });
    const entity = entities.find(data => data["@type"] === "MobileApplication");
    assert.equal(entity.url, app.url);
    if (app.availability === "available") {
      assert.equal(entity.installUrl, app.downloadUrl);
      assert.equal(entity.offers.price, app.priceUSD);
    } else {
      assert.equal(app.downloadUrl, null);
      assert.equal(entity.installUrl, undefined);
      assert.equal(entity.offers, undefined);
    }
  }
  const lady = await (await render("/apps/lady")).text();
  assert.match(lady, /do not start unattended/);
  const trailhead = await (await render("/apps/trailhead")).text();
  assert.match(trailhead, /Further hikes require Trailhead Plus/);
  const linkedfull = await (await render("/apps/linkedfull")).text();
  assert.match(linkedfull, /does not establish a garment/);
});

test("the former Persian Swipe marketing URL redirects to its product page", async () => {
  const response = await render("/apps/persian-swipe/review");
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, "/apps/persian-swipe/");
});
