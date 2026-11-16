import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

test("exported theme control suppresses transitions through rapid switches", async () => {
  const source = await readFile(new URL("../scripts/export-github-pages.mjs", import.meta.url), "utf8");
  const script = source.match(/<script data-theme-runtime>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, "static theme runtime is present");

  const classes = new Set();
  const frames = new Map();
  const values = new Map();
  let nextFrame = 0;
  let onClick;
  const root = {
    dataset: { theme: "dark" },
    style: {},
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    get offsetHeight() {
      assert.ok(classes.has("theme-switching"), "styles flush while transitions are suppressed");
      return 1;
    },
  };
  const button = () => {
    const attributes = {};
    const icon = { textContent: "" };
    const label = { textContent: "" };
    return { attributes, icon, label, setAttribute: (key, value) => { attributes[key] = value; },
      querySelector: selector => selector === ".theme-toggle-icon" ? icon : label };
  };
  const buttons = [button(), button()];
  const document = {
    documentElement: root,
    querySelectorAll: () => buttons,
    addEventListener: (type, handler) => { if (type === "click") onClick = handler; },
  };
  const requestAnimationFrame = callback => { frames.set(++nextFrame, callback); return nextFrame; };
  const cancelAnimationFrame = id => frames.delete(id);
  const flushFrame = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach(callback => callback());
  };
  runInNewContext(script, {
    document, requestAnimationFrame, cancelAnimationFrame,
    localStorage: { setItem: (key, value) => values.set(key, value) },
  });
  const clickToggle = () => onClick({ target: { closest: () => buttons[0] } });

  clickToggle();
  assert.equal(root.dataset.theme, "light");
  assert.equal(values.get("nil-theme"), "light");
  assert.ok(classes.has("theme-switching"));
  assert.ok(buttons.every(item => item.attributes["aria-label"] === "Switch to dark theme"));
  flushFrame();
  assert.ok(classes.has("theme-switching"), "suppression remains through the first frame");

  clickToggle();
  assert.equal(root.dataset.theme, "dark");
  assert.equal(values.get("nil-theme"), "dark");
  assert.ok(buttons.every(item => item.attributes["aria-pressed"] === "true"));
  assert.equal(frames.size, 1, "a repeated switch cancels the earlier release");
  flushFrame();
  assert.ok(classes.has("theme-switching"));
  flushFrame();
  assert.equal(classes.has("theme-switching"), false, "normal transitions are restored");
});
