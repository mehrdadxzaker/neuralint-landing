// GitHub Pages serves the exported HTML without the React client bundle.
// Enhance only the free copy tool; the guide and manual field work without JS.
function enhanceHalfSpaceTools() {
  document.querySelectorAll("[data-half-space-tool]").forEach(function (tool) {
    var button = tool.querySelector("[data-copy-half-space]");
    var field = tool.querySelector("[data-half-space-value]");
    var status = tool.querySelector("[data-copy-status]");
    if (!button || !field || !status) return;

    button.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(field.value);
        button.textContent = button.dataset.copiedLabel;
        status.textContent = button.dataset.copiedLabel;
      } catch {
        field.focus();
        field.select();
        status.textContent = tool.dataset.copyFallbackLabel;
      }
    });
    button.hidden = false;
  });
}

export const staticGuideRuntime = `<script data-guide-runtime>(${enhanceHalfSpaceTools.toString()})();</script>`;
