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

1. Verify `neuralint.io` in the destination account using GitHub's actual TXT
   challenge. A source file cannot substitute for account-level verification.
2. Inspect the current Pages custom-domain binding and TLS settings. Confirm
   that the destination Pages repository is bound to `neuralint.io` before
   changing DNS; Actions artifacts alone do not configure that binding.
3. Transfer the repository in the approved window. Change only the www CNAME
   from `xpounder-com.github.io` to `mehrdadxzaker.github.io` once Pages is ready.
   Preserve existing apex records and other DNS settings unless a separately
   reviewed configuration requires otherwise. The canonical domain stays the
   same. No DNS record or Pages setting is changed by this branch.
4. Inspect any active Vercel Git integration and GitHub App repository access
   under the new owner. Retain its project, domain, environment, and deployment
   settings. The earlier audit could not establish a live team connection;
   do not infer one from a historical deployment.
5. Publish and verify root, www, TLS, redirects, sitemap, and app legal/support
   routes. No live build/deployment, domain claim, or Git reconnection runs here.

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
