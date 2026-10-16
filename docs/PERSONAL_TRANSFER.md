# Personal-account transfer preparation

Staged destination: `mehrdadxzaker/neuralint-landing`. Repository ID: `1230268025`.
Keep this draft unmerged until its separately approved cutover. This preparation
does not transfer anything or change live service settings, App ownership,
Apple identities, DNS, deployments, or billing.

## Prepared changes

The site already uses `https://neuralint.io` throughout and has no fixed
Xpounder source URLs. Its app/privacy/support paths, exported `CNAME`, SEO
metadata, and Pages workflow are retained. The unapplied
[DNS plan](migrations/personal-pages-dns-plan.json) records the exact www change
for the later maintenance window.

## Later cutover

1. Inspect the current Pages custom-domain binding, TLS, DNS, and verified-domain
   settings in both accounts without changing them. Record any Xpounder domain
   verification that would need to be released during cutover. Confirm access
   to the DNS provider and prepare the account-specific TXT challenge procedure.
   Do not complete destination verification during preparation: GitHub says
   verification can immediately release another account's Pages binding, and an
   already verified domain cannot simply be claimed by another account.
2. Inspect any active Vercel Git integration and GitHub App repository access
   under the new owner. Retain its project, domain, environment, and deployment
   settings. A successful existing PR preview does not establish destination
   Git access. Resolve any provider access limitation before scheduling cutover.
3. During the separately approved maintenance window, pause owner-dependent
   publication and transfer the repository. Coordinate release of any existing
   organization domain verification and completion of the personal account's
   actual TXT challenge in that same window. Do not assume that the custom
   domain remains publishable across the owner change or promise zero downtime.
4. Confirm the moved repository is bound to `neuralint.io`, with Pages source,
   publishing permissions, and TLS ready. Actions artifacts and the exported
   `CNAME` alone do not configure that binding. Only then change the www CNAME
   from `xpounder-com.github.io` to `mehrdadxzaker.github.io` as approved. Preserve
   existing apex records and other DNS settings unless separately reviewed.
   The canonical domain stays the same.
5. Publish and verify root, www, TLS, redirects, sitemap, and app legal/support
   routes. No live build/deployment, domain claim, or Git reconnection runs here.

`neuralint-platform` remains in Xpounder and is outside this move. Its Azure
trust, runtime, database, and release settings are independent of this website
and are not prerequisites for the landing repository's ownership change.

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site),
[account-level verification and domain release](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).
