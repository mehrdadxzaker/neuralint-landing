import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import path from "node:path";

// These legacy paths are published separately as static redirect documents.
export const redirectRoutes = ["/research", "/apps/persian-swipe/review"];

async function discoverPages(directory, segments = []) {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
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

// Derive ordinary routes from source files. Dynamic routes need an explicit
// enumeration strategy and fail above instead of silently disappearing.
export async function exportRoutes(appDirectory = "app") {
  const pages = await discoverPages(appDirectory);
  if (new Set(pages).size !== pages.length) throw new Error("Duplicate App Router page route");
  return pages.filter(source => !redirectRoutes.includes(source)).sort().map(source => ({
    source,
    output: source === "/" ? "index.html" : source.slice(1) + "/index.html",
    ...(source === "/fa" || source.startsWith("/fa/") ? { language: "fa" } : {}),
  }));
}

export function canonicalUrl(source, origin = "https://neuralint.io") {
  return `${origin}${source === "/" ? "/" : `${source}/`}`;
}

export function metaTags(html) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map(match =>
    Object.fromEntries([...match[0].matchAll(/([\w-]+)=["']([^"']*)["']/g)].map(m => [m[1].toLowerCase(), m[2]]))
  );
}

export function excludedFromIndex(metas) {
  return metas.some(tag => /^(robots|googlebot)$/i.test(tag.name ?? "") && /(?:^|[\s,])(?:noindex|none)(?:$|[\s,])/i.test(tag.content ?? "")) ||
    metas.some(tag => /^refresh$/i.test(tag["http-equiv"] ?? ""));
}

export function assertIndexableMeta(metas, url) {
  assert.ok(!excludedFromIndex(metas), "Indexable sitemap URL must not have noindex or refresh: " + url);
}

// Never replace an explicit canonical; the SEO check will report a mismatch.
export function addMissingCanonical(html, url) {
  const hasCanonical = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i.test(html);
  return hasCanonical ? html : html.replace("</head>", `<link rel="canonical" href="${url}"/></head>`);
}
