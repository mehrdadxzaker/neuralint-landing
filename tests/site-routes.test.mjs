import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { assertIndexableMeta, indexableUrls, validatePageRoutes } from "../scripts/site-routes.mjs";

test("new App Router pages must be registered for export", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "neuralint-routes-"));
  try {
    for (const route of ["", "research", "apps/persian-swipe/review", "new-page"]) {
      await mkdir(path.join(root, route), { recursive: true });
      await writeFile(path.join(root, route, "page.tsx"), "");
    }
    await assert.rejects(validatePageRoutes([{ source: "/" }], root), /Missing from export: \/new-page/);
    await validatePageRoutes([{ source: "/" }, { source: "/new-page" }], root);
    await assert.rejects(validatePageRoutes([{ source: "/" }, { source: "/new-page" }, { source: "/stale" }], root), /no source page: \/stale/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("sitemap URLs include registered pages except explicitly excluded pages", () => {
  assert.deepEqual(indexableUrls([{ source: "/" }, { source: "/new-page" }, { source: "/review", indexable: false }]), [
    "https://neuralint.io/", "https://neuralint.io/new-page/",
  ]);
});

test("indexable pages reject crawler exclusions and refresh redirects", () => {
  for (const tag of [
    { name: "robots", content: "noindex, follow" },
    { name: "googlebot", content: "NONE" },
    { "http-equiv": "refresh", content: "0;url=/" },
  ]) assert.throws(() => assertIndexableMeta([tag], "/example/"));
  assert.doesNotThrow(() => assertIndexableMeta([{ name: "robots", content: "index, follow" }], "/example/"));
});
