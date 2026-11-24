import Link from "next/link";
import type { ReactNode } from "react";
import type { AppSlug } from "../content/apps";
import ThemeToggle from "./ThemeToggle";
import { BrandMark, SiteMobileMenu } from "./SiteNavigation";
import PersianText from "./PersianText";

export type NeuralIntApp = {
  name: string;
  listingName: string;
  slug: AppSlug;
  accentLabel: string;
  hasReviewGuide?: boolean;
};

type SectionLink = {
  id: string;
  label: string;
};

type AppLegalPageProps = {
  app?: NeuralIntApp;
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  sections: SectionLink[];
  hero?: ReactNode;
  children: ReactNode;
};

export const trailheadApp: NeuralIntApp = {
  name: "Trailhead",
  listingName: "Trailhead: Deep Focus",
  slug: "trailhead",
  accentLabel: "Focus with a destination",
};

export const ladyApp: NeuralIntApp = {
  name: "Lady",
  listingName: "Lady: Family Routines",
  slug: "lady",
  accentLabel: "Family, on cue",
};

export function AppLegalPage({
  app,
  eyebrow,
  title,
  lede,
  updated,
  sections,
  hero,
  children,
}: AppLegalPageProps) {
  return (
    <div className={`app-legal-site ${app ? `app-${app.slug}` : "app-neuralint"}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="shell topbar legal-topbar">
        <Link className="wordmark" href="/" aria-label="Neural Intelligence Labs home">
          <BrandMark />
          <span>Neural Intelligence Labs</span>
        </Link>
        <nav className="nav legal-nav" aria-label="App legal navigation">
          <a href="/apps/">Apps</a>
          <a className="nav-language" href="/fa/" lang="fa" dir="rtl">فارسی</a>
          <Link href="/">Research</Link>
          <ThemeToggle />
        </nav>
        <SiteMobileMenu extraLinks={[["فارسی", "/fa/"]]} />
      </header>

      <main id="main-content" className="shell legal-main" tabIndex={-1}>
        <header className="legal-heading">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-lede"><PersianText text={lede} /></p>
          {hero}
          <div className="legal-meta">
            <span>Last updated {updated}</span>
            {app ? <a href={"/apps/" + app.slug + "/"}>{app.listingName}</a> : <span>NeuralInt apps</span>}
          </div>
        </header>

        <div className="legal-layout">
          <aside className="legal-index" aria-label="On this page">
            <p>On this page</p>
            <nav>
              {sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.label}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-document">{children}</article>
        </div>
      </main>

      <footer className="shell footer legal-footer">
        <span>© 2026 Neural Intelligence Labs</span>
        <div className="legal-footer-links">
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Website privacy</a>
          <a href="/apps/terms/">Terms</a>
          <a href="mailto:mehrdadz@neuralint.io">Email support</a>
          <Link href="/">Research</Link>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="legal-section" id={id}>
      <h2>{title}</h2>
      <div className="legal-copy">{children}</div>
    </section>
  );
}

export function LegalCallout({ children }: { children: ReactNode }) {
  return <div className="legal-callout">{children}</div>;
}

export function AppPageLinks({ app }: { app: NeuralIntApp }) {
  const isLinkedFull = app.slug === "linkedfull";
  return (
    <div className="app-page-links" aria-label={`${app.name} information`}>
      <a href={"/apps/" + app.slug + "/"}>About {app.name}</a>
      <a href={`/apps/${app.slug}/privacy/`}>{isLinkedFull ? "Privacy (2.0)" : "Privacy"}</a>
      <a href={`/apps/${app.slug}/support/`}>Support</a>
      {app.hasReviewGuide !== false ? <a href={`/apps/${app.slug}/review/`}>App Review guide</a> : null}
      <a href={isLinkedFull ? "/apps/terms/#linkedfull" : "/apps/terms/"}>{isLinkedFull ? "Terms (2.0)" : "Terms"}</a>
    </div>
  );
}

export const persianSwipeApp: NeuralIntApp = { name: "Persian Swipe", listingName: "Persian Swipe", slug: "persian-swipe", accentLabel: "Persian, in one motion" };

export const persianInkApp: NeuralIntApp = {
  name: "Persian Ink",
  listingName: "Persian Ink",
  slug: "persian-ink",
  accentLabel: "Your handwriting. Persian text.",
};
