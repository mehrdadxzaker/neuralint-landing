import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";

export function exportRoutes(catalog) {
  return [
  { source: "/persian-keyboards", output: "persian-keyboards/index.html", language: "en" },
  { source: "/fa", output: "fa/index.html", language: "fa" },
  { source: "/about", output: "about/index.html" },
  { source: "/contact", output: "contact/index.html" },
  { source: "/privacy", output: "privacy/index.html" },
  ...catalog.apps.filter(app => app.slug !== "persian-ink").map(app => ({
    source: "/apps/" + app.slug, output: "apps/" + app.slug + "/index.html",
  })),
  { source: "/apps/persian-ink", output: "apps/persian-ink/index.html" },
  { source: "/apps/persian-ink/privacy", output: "apps/persian-ink/privacy/index.html" },
  { source: "/apps/persian-ink/support", output: "apps/persian-ink/support/index.html" },
  { source: "/apps/persian-ink/review", output: "apps/persian-ink/review/index.html", indexable: false },
  { source: "/apps/persian-swipe/privacy", output: "apps/persian-swipe/privacy/index.html" },
  { source: "/apps/persian-swipe/support", output: "apps/persian-swipe/support/index.html" },

  { source: "/", output: "index.html" },
  { source: "/people/mehrdad", output: "people/mehrdad/index.html" },
  { source: "/apps", output: "apps/index.html" },
  { source: "/apps/terms", output: "apps/terms/index.html" },
  {
    source: "/apps/trailhead/privacy",
    output: "apps/trailhead/privacy/index.html",
  },
  {
    source: "/apps/trailhead/support",
    output: "apps/trailhead/support/index.html",
  },
  {
    source: "/apps/trailhead/review",
    output: "apps/trailhead/review/index.html", indexable: false,
  },
  { source: "/apps/lady/privacy", output: "apps/lady/privacy/index.html" },
  { source: "/apps/lady/support", output: "apps/lady/support/index.html" },
  { source: "/apps/lady/review", output: "apps/lady/review/index.html", indexable: false },
  ];
}

// These App Router pages are published separately as static redirect documents.
const redirectRoutes = ["/research", "/apps/persian-swipe/review"];

async function discoverPages(directory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  const pages = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      // Route groups, parallel routes and dynamic segments need explicit handling
      // before this static exporter can publish them safely.
      if (/^(?:\(|@|\[)/.test(entry.name)) {
        throw new Error(`Unsupported App Router directory for static export: ${path.join(directory, entry.name)}`);
      }
      pages.push(...await discoverPages(path.join(directory, entry.name), [...segments, entry.name]));
    } else if (/^page\.(?:js|jsx|ts|tsx)$/.test(entry.name)) {
      pages.push(segments.length ? "/" + segments.join("/") : "/");
    }
  }
  return pages;
}

export async function validatePageRoutes(routes, appDirectory = "app") {
  const published = routes.map(route => route.source);
  const declared = [...published, ...redirectRoutes];
  if (new Set(declared).size !== declared.length) throw new Error("Duplicate export or redirect route");
  const discovered = await discoverPages(appDirectory);
  const missing = discovered.filter(route => !declared.includes(route));
  const stale = declared.filter(route => !discovered.includes(route));
  if (missing.length || stale.length) {
    throw new Error(`App pages and export routes differ. Missing from export: ${missing.join(", ") || "none"}; no source page: ${stale.join(", ") || "none"}. Register new pages in scripts/site-routes.mjs and choose their indexing policy.`);
  }
}

export function indexableUrls(routes, origin = "https://neuralint.io") {
  return routes.filter(route => route.indexable !== false).map(({ source }) =>
    `${origin}${source === "/" ? "/" : `${source}/`}`
  );
}

export function assertIndexableMeta(metas, url) {
  assert.ok(!metas.some(tag => /^(robots|googlebot)$/i.test(tag.name ?? "") && /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(tag.content ?? "")), "Indexable sitemap URL: " + url);
  assert.ok(!metas.some(tag => /^refresh$/i.test(tag["http-equiv"] ?? "")), "Sitemap page must not be a refresh redirect: " + url);
}
