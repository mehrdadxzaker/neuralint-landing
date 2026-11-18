import assert from "node:assert/strict";
import vm from "node:vm";
import test from "node:test";
import { staticGuideRuntime } from "../scripts/guide-runtime.mjs";

function copyTool(clipboard) {
  let click;
  let focused = false;
  let selected = false;
  const button = { hidden: true, dataset: { copiedLabel: "Half-space copied" }, addEventListener(name, handler) { assert.equal(name, "click"); click = handler; } };
  const field = { value: "\u200c", focus() { focused = true; }, select() { selected = true; } };
  const status = { textContent: "" };
  const elements = { "[data-copy-half-space]": button, "[data-half-space-value]": field, "[data-copy-status]": status };
  const tool = { dataset: { copyFallbackLabel: "Select the character and copy it." }, querySelector(selector) { return elements[selector]; } };
  vm.runInNewContext(staticGuideRuntime.replace(/^<script[^>]*>|<\/script>$/g, ""), {
    document: { querySelectorAll() { return [tool]; } }, navigator: { clipboard },
  });
  return { button, status, click: () => click(), selected: () => focused && selected };
}

test("copy tool writes only one ZWNJ and announces completion after success", async () => {
  let copied;
  const tool = copyTool({ async writeText(value) { copied = value; } });
  assert.equal(tool.button.hidden, false);
  await tool.click();
  assert.equal(copied, "\u200c");
  assert.equal([...copied].length, 1);
  assert.equal(tool.status.textContent, "Half-space copied");
});

test("denied or unavailable clipboard falls back to a selected manual copy field", async () => {
  for (const clipboard of [undefined, { async writeText() { throw new Error("Permission denied"); } }]) {
    const tool = copyTool(clipboard);
    await tool.click();
    assert.equal(tool.selected(), true);
    assert.equal(tool.status.textContent, "Select the character and copy it.");
    assert.notEqual(tool.status.textContent, "Half-space copied");
  }
});
