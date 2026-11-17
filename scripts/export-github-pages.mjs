import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { addMissingCanonical, canonicalUrl, excludedFromIndex, exportRoutes, metaTags } from "./site-routes.mjs";
import { stylesheetHref } from "./site-assets.mjs";

const baseUrl = process.env.SITE_EXPORT_URL ?? "http://localhost:3001";
const outputDir = path.resolve("static-site");
const catalogResponse = await fetch(new URL("/apps/catalog.json", baseUrl));
if (!catalogResponse.ok) throw new Error("Unable to export app catalog: " + catalogResponse.status);
const catalog = await catalogResponse.json();
const routes = await exportRoutes();
const indexableRoutes = [];
const compiledAssets = await readdir("dist/client/assets");
const cssFile = compiledAssets.find((file) => file.endsWith(".css"));
if (!cssFile) throw new Error("Unable to find the compiled site stylesheet.");
const cssPath = path.join("dist/client/assets", cssFile);
const cssContents = await readFile(cssPath);
const cssHref = stylesheetHref(cssContents);

const staticThemeRuntime = `<script data-theme-runtime>
(function () {
  var transitionReleaseFrame = null;

  function applyTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    document.querySelectorAll(".theme-toggle").forEach(function (button) {
      button.setAttribute("aria-label", "Dark mode");
      button.setAttribute("aria-pressed", String(isDark));

      var icon = button.querySelector(".theme-toggle-icon");
      if (icon) icon.textContent = isDark ? "☾" : "☀";
    });
  }

  var theme = document.documentElement.dataset.theme;
  if (theme !== "light" && theme !== "dark") {
    theme = "dark";
  }
  applyTheme(theme);

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".theme-toggle");
    if (!button) {
      var menuLink = event.target.closest(".site-mobile-menu-links a");
      var menu = menuLink && menuLink.closest("details.site-mobile-menu");
      if (menu) menu.open = false;
      return;
    }

    var nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    var root = document.documentElement;
    if (transitionReleaseFrame !== null) {
      cancelAnimationFrame(transitionReleaseFrame);
    }
    root.classList.add("theme-switching");
    void root.offsetHeight;
    applyTheme(nextTheme);
    void root.offsetHeight;
    transitionReleaseFrame = requestAnimationFrame(function () {
      transitionReleaseFrame = requestAnimationFrame(function () {
        root.classList.remove("theme-switching");
        transitionReleaseFrame = null;
      });
    });
    localStorage.setItem("nil-theme", nextTheme);
  });
})();
</script>`;

function pageMeta(html, key) {
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
    if (attrs.name === key || attrs.property === key) return attrs.content;
  }
}
function makeStatic(html, route) {
  const documentEnd = html.indexOf("</html>");
  const completeDocument =
    documentEnd === -1 ? html : html.slice(0, documentEnd + "</html>".length);

  const result = completeDocument
    .replace(/<html\b([^>]*)>/i, (tag, attributes) => route.language === "fa" ? '<html' + attributes.replace(/\s(?:lang|dir)="[^"]*"/g, "") + ' lang="fa" dir="rtl">' : tag)
    .replace(
      /<script\b(?![^>]*(?:data-theme-bootstrap|type=["']application\/ld\+json["']))[^>]*>[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*\/?>/gi, "")
    .replace(
      /<link rel="stylesheet" href="\/(?:app\/globals\.css|assets\/[^"]+\.css)"[^>]*\/?>/i,
      '<link rel="stylesheet" href="' + cssHref + '"/>',
    )
    .replace(/\sdata-rsc-[\w-]+="[^"]*"/gi, "")
    .replace("</body>", `${staticThemeRuntime}</body>`);
  // Give every static page its own social title, summary and canonical URL.
  // Policy pages must not inherit the research homepage's share metadata.
  const title = completeDocument.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = pageMeta(completeDocument, "description");
  if (!title || !description) throw new Error("Missing page metadata: " + route.source);
  const canonical = "https://neuralint.io" + (route.source === "/" ? "/" : route.source + "/");
  const app = catalog.apps.find(app => route.source === "/apps/" + app.slug || route.source.startsWith("/apps/" + app.slug + "/"));
  const isKeyboardGuide = route.source === "/fa" || route.source === "/persian-keyboards";
  const image = app?.image ?? (isKeyboardGuide ? "https://neuralint.io/apps/persian-swipe/app-icon-calligraphy.jpg" : "https://neuralint.io/og.webp");
  const escape = value => value.replace(/"/g, "&quot;");
  const social = {
    "og:title": title, "og:description": description, "og:url": canonical,
    "og:type": "website", "og:site_name": "Neural Intelligence Labs", "og:image": image,
    "og:image:alt": app ? app.name + " app icon" : isKeyboardGuide ? "Persian Swipe" : "Neural Intelligence Labs",
    "og:locale": route.language === "fa" ? "fa_IR" : "en_US",
    "twitter:card": app || isKeyboardGuide ? "summary" : "summary_large_image",
    "twitter:title": title, "twitter:description": description, "twitter:image": image,
  };
  const socialTags = Object.entries(social).map(([key, value]) =>
    '<meta ' + (key.startsWith("og:") ? "property" : "name") + '="' + key + '" content="' + escape(value) + '"/>'
  ).join("");
  let finalHtml = result.replaceAll("https://neuralint.io/neuralint-favicon-lamassu.png", "/neuralint-favicon-lamassu.png").replace(/<meta\b[^>]*>/g, tag =>
    /(?:property|name)="(?:og:|twitter:)[^"]*"/.test(tag) ? "" : tag
  ).replace("</head>", socialTags + "</head>");
  // Supply a self-canonical when absent. Preserve explicit choices so the
  // SEO check can flag any mismatch instead of silently rewriting it.
  if (!excludedFromIndex(metaTags(finalHtml))) {
    finalHtml = addMissingCanonical(finalHtml, canonical);
  }
  return finalHtml;

}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const route of routes) {
  const response = await fetch(new URL(route.source, baseUrl));
  if (response.redirected) throw new Error(`Unexpected server redirect while exporting ${route.source}; add an explicit static redirect instead`);
  if (!response.ok) {
    throw new Error(`Unable to export ${route.source}: ${response.status}`);
  }

  const destination = path.join(outputDir, route.output);
  await mkdir(path.dirname(destination), { recursive: true });
  const html = makeStatic(await response.text(), route);
  await writeFile(destination, html);
  if (!excludedFromIndex(metaTags(html))) indexableRoutes.push(route);
}

await mkdir(path.join(outputDir, "assets"), { recursive: true });
await cp(
  "dist/client/assets/_vinext_fonts",
  path.join(outputDir, "assets/_vinext_fonts"),
  { recursive: true },
);
await cp("public/projects", path.join(outputDir, "projects"), {
  recursive: true,
});
await cp("public/apps", path.join(outputDir, "apps"), { recursive: true });

// Cached HTML from earlier deployments can still request the stable path.
await writeFile(path.join(outputDir, "assets/site.css"), cssContents);

for (const asset of [
  "favicon.png",
  "favicon.svg",
  "neuralint-logo-lamassu-transparent.webp",
  "neuralint-favicon-lamassu.png",
  "og.webp",
  "mehrdad-zaker-headshot.jpeg",
  "mehrdad-zaker-three-quarter-transparent.webp",
  "mehrdad-zaker-portrait-840.webp",
]) {
  await cp(path.join("public", asset), path.join(outputDir, asset));
}

const discovery = JSON.parse(await readFile("scripts/discovery-config.json", "utf8"));
await cp("public/" + discovery.indexNowKey + ".txt", path.join(outputDir, discovery.indexNowKey + ".txt"));
await writeFile(path.join(outputDir, ".nojekyll"), "");
await writeFile(path.join(outputDir, "CNAME"), "neuralint.io\n");
// GitHub Pages serves files rather than application redirects. Keep the old
// research URL as an immediate redirect document, preserving inbound fragments.
await mkdir(path.join(outputDir, "research"), { recursive: true });
await writeFile(path.join(outputDir, "research/index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Research has moved | NeuralInt</title>
<link rel="canonical" href="https://neuralint.io/">
<script>location.replace("/" + location.search + location.hash);</script>
<meta http-equiv="refresh" content="0;url=/"></head>
<body><p>Research is now on the <a href="/">Neural Intelligence Labs homepage</a>.</p></body></html>`);

const canonicalUrls = indexableRoutes.map(route => canonicalUrl(route.source));
await writeFile(path.join(outputDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonicalUrls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(path.join(outputDir, "robots.txt"),
  "User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nSitemap: https://neuralint.io/sitemap.xml\n",
);
await writeFile(path.join(outputDir, "apps/catalog.json"), JSON.stringify(catalog, null, 2) + "\n");
const appLines = catalog.apps.map(app =>
  "- [" + app.name + "](" + app.url + "): " + app.description +
  " " + app.pricing + " Status: " + app.availability + "." +
  (app.downloadUrl ? " [App Store](" + app.downloadUrl + ")." : " No public App Store download yet.") +
  (app.supportUrl ? " [Setup and support](" + app.supportUrl + "). [Privacy](" + app.privacyUrl + ")." : "")
).join("\n");
await writeFile(path.join(outputDir, "llms.txt"),
  "# NeuralInt\n\n> Neural Intelligence Labs builds focused apps and researches AI agent environments.\n\n" +
  "Compare Persian handwriting with swipe typing, build focused work sessions, set up parent-initiated family announcements, or explore fashion search. Read requirements, paid-feature limits and release status before choosing an installation link. App Store prices vary by country; a free download does not imply that every feature is free.\n\n" +
  "## Apps\n\n" + appLines + "\n\n" +
  "## Product information\n\n" +
  "- [Persian keyboards for iPhone and iPad](https://neuralint.io/persian-keyboards/): Compare offline swipe typing with Apple Pencil handwriting, compatibility and setup.\n" +
  "- [راهنمای صفحه‌کلید فارسی](https://neuralint.io/fa/): Persian-language comparison, App Store links and keyboard setup for Persian Swipe and Persian Ink.\n" +
  "- [App directory](https://neuralint.io/apps/): Compare the apps and open each product page.\n" +
  "- [App catalog JSON](https://neuralint.io/apps/catalog.json): Structured descriptions, requirements, prices, and release status from the same product facts as the website.\n" +
  "- [App terms](https://neuralint.io/apps/terms/): Terms for the NeuralInt app family.\n\n" +
  "## Research\n\n- [Neural Intelligence Labs](https://neuralint.io/): Research and maker portfolio.\n" +
  "- [Mehrdad Zaker](https://neuralint.io/people/mehrdad/): Founder profile.\n\n" +
  "## About and contact\n\n" +
  "- [About NeuralInt](https://neuralint.io/about/): Information about the lab and its work.\n" +
  "- [Contact](https://neuralint.io/contact/): App support and research or product inquiries.\n" +
  "- [Website privacy](https://neuralint.io/privacy/): Privacy information for this website.\n",
);
// Preserve the former Persian Swipe marketing URL and its inbound deep links.
await mkdir(path.join(outputDir, "apps/persian-swipe/review"), { recursive: true });
await writeFile(path.join(outputDir, "apps/persian-swipe/review/index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Persian Swipe has moved</title>' +
  '<link rel="canonical" href="https://neuralint.io/apps/persian-swipe/">' +
  '<script>location.replace("/apps/persian-swipe/" + location.search + location.hash);</script>' +
  '<meta http-equiv="refresh" content="0;url=/apps/persian-swipe/"></head>' +
  '<body><p><a href="/apps/persian-swipe/">Visit Persian Swipe</a>.</p></body></html>'
);
await writeFile(path.join(outputDir, "404.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>Page not found | NeuralInt</title></head>
<body><main><h1>Page not found</h1><p>Visit <a href="/">Neural Intelligence Labs</a> or the <a href="/apps/">app directory</a>.</p></main></body></html>`);

console.log(`Exported ${routes.length} routes to ${outputDir}`);
