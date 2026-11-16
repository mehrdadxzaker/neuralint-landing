import assert from "node:assert/strict";
import test from "node:test";
import { stylesheetHref } from "../scripts/site-assets.mjs";

test("stylesheet URLs are stable for identical bytes and change with the content", () => {
  const css = Buffer.from("body { color: black; }");
  assert.match(stylesheetHref(css), /^\/assets\/site\.css\?v=[0-9a-f]{16}$/);
  assert.equal(stylesheetHref(css), stylesheetHref(Buffer.from(css)));
  assert.notEqual(stylesheetHref(css), stylesheetHref(Buffer.from("body { color: white; }")));
});
