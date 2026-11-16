import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

// Check the exported HTML itself, including pages intentionally excluded from the sitemap.
const root = path.resolve(process.argv[2] ?? "static-site");
const origin = "https://neuralint.io";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.isFile() && file.endsWith(".html") ? [file] : [];
  }));
  return files.flat();
}

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (match, entity) => {
    const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" };
    if (entity[0] !== "#") return named[entity.toLowerCase()];
    const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([^\s=<>`"']+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(match => [match[1].toLowerCase(), decodeEntities(match[2] ?? match[3] ?? match[4])]));
}

const pages = new Map();
for (const file of await htmlFiles(root)) {
  const raw = await readFile(file, "utf8");
  const html = raw.replace(/<!--[\s\S]*?-->|<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, "");
  const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(match => match[0]);
  const ids = new Set();
  const links = [];
  let baseHref;
  for (const tag of tags) {
    const name = tag.match(/^<([a-z][\w-]*)/i)?.[1].toLowerCase();
    const attrs = attributes(tag);
    if (attrs.id) ids.add(attrs.id);
    if (name === "a" && attrs.name) ids.add(attrs.name);
    if (name === "a" && attrs.href !== undefined) links.push(attrs.href);
    if (name === "base" && baseHref === undefined && attrs.href !== undefined) baseHref = attrs.href;
  }
  pages.set(file, { ids, links, baseHref });
}
assert.ok(pages.size, "No exported HTML pages found in " + root);

const failures = [];
let checked = 0;
for (const [source, page] of pages) {
  const relative = path.relative(root, source).split(path.sep).join("/");
  const pathname = relative === "index.html" ? "/" : relative.endsWith("/index.html") ? "/" + relative.slice(0, -10) : "/" + relative;
  let base;
  try { base = new URL(page.baseHref ?? pathname, origin + pathname); }
  catch { failures.push(`${pathname}: invalid base URL ${page.baseHref}`); continue; }
  for (const href of page.links) {
    let url;
    try { url = new URL(href, base); }
    catch { failures.push(`${pathname}: invalid link ${href}`); continue; }
    if (!["http:", "https:"].includes(url.protocol) || !["neuralint.io", "www.neuralint.io"].includes(url.hostname)) continue;
    checked++;
    let targetPath;
    let fragment;
    try { targetPath = decodeURIComponent(url.pathname); fragment = decodeURIComponent(url.hash.slice(1)).split(":~:")[0]; }
    catch { failures.push(`${pathname}: invalid URL encoding in ${href}`); continue; }
    const target = path.resolve(root, "." + targetPath);
    if (target !== root && !target.startsWith(root + path.sep)) { failures.push(`${pathname}: link escapes export root: ${href}`); continue; }
    let targetFile = target;
    try { if ((await stat(target)).isDirectory()) targetFile = path.join(target, "index.html"); await stat(targetFile); }
    catch { failures.push(`${pathname}: missing destination ${href}`); continue; }
    if (fragment && fragment.toLowerCase() !== "top" && pages.has(targetFile) && !pages.get(targetFile).ids.has(fragment)) {
      failures.push(`${pathname}: missing fragment ${href}`);
    }
  }
}
assert.deepEqual(failures, [], "Broken internal links:\n" + failures.join("\n"));
console.log(`Link checks passed: ${checked} internal links across ${pages.size} exported HTML pages.`);
