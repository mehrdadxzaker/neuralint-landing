import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  ["Research", "/#programs"],
  ["Portfolio", "/#portfolio"],
  ["Apps", "/apps/"],
  ["Persian keyboards", "/persian-keyboards/"],
  ["People", "/people/mehrdad/"],
  ["Collaborate", "/#collaborate"],
] as const;

export function BrandMark() {
  return <Image className="brand-mark" src="/neuralint-logo-lamassu-transparent.webp" alt="" width={63} height={42} unoptimized />;
}

/** Native disclosure keeps the navigation usable in the static export. */
export function SiteMobileMenu({ extraLinks = [] }: { extraLinks?: ReadonlyArray<readonly [string, string]> }) {
  return (
    <details className="site-mobile-menu">
      <summary>Menu</summary>
      <div className="site-mobile-menu-panel">
        <nav className="site-mobile-menu-links" aria-label="Mobile navigation">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          {extraLinks.map(([label, href]) => <a className="site-mobile-menu-extra" key={href} href={href}>{label}</a>)}
        </nav>
        <div className="site-mobile-menu-theme"><ThemeToggle /></div>
      </div>
    </details>
  );
}
