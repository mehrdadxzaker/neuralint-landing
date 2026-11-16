import { createHash } from "node:crypto";

// Version the URL without removing the stable file path that cached HTML uses.
export function stylesheetHref(contents) {
  const hash = createHash("sha256").update(contents).digest("hex").slice(0, 16);
  return `/assets/site.css?v=${hash}`;
}
