import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { addMissingCanonical, assertIndexableMeta, canonicalUrl, excludedFromIndex, exportRoutes, metaTags } from "../scripts/site-routes.mjs";

test("new static App Router pages are discovered for export without registration", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "neuralint-routes-"));
  try {
    for (const route of ["", "research", "apps/persian-swipe/review", "apps/new-app", "apps/new-app/privacy"]) {
      await mkdir(path.join(root, route), { recursive: true });
      await writeFile(path.join(root, route, "page.tsx"), "");
    }
    const routes = await exportRoutes(root);
    assert.deepEqual(routes.map(({ source, output }) => [source, output]), [
      ["/", "index.html"], ["/apps/new-app", "apps/new-app/index.html"], ["/apps/new-app/privacy", "apps/new-app/privacy/index.html"],
    ]);
    assert.equal(canonicalUrl("/apps/new-app"), "https://neuralint.io/apps/new-app/");
    await mkdir(path.join(root, "[dynamic]"));
    await assert.rejects(exportRoutes(root), /Unsupported App Router directory/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("rendered crawler directives determine sitemap eligibility", () => {
  for (const html of [
    `<meta name="robots" content="noindex, follow">`,
    `<meta name='googlebot' content='NONE'>`,
    `<meta http-equiv="refresh" content="0;url=/">`,
  ]) {
    const tags = metaTags(html);
    assert.equal(excludedFromIndex(tags), true);
    assert.throws(() => assertIndexableMeta(tags, "/example/"));
  }
  assert.equal(excludedFromIndex(metaTags(`<meta name="robots" content="index, follow">`)), false);
});

test("missing canonical is supplied without replacing an explicit one", () => {
  const url = "https://neuralint.io/new-page/";
  assert.match(addMissingCanonical("<head></head>", url), /href="https:\/\/neuralint.io\/new-page\/"/);
  const explicit = '<head><link rel="canonical" href="https://neuralint.io/other/"/></head>';
  assert.equal(addMissingCanonical(explicit, url), explicit);
});
