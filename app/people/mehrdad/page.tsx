import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ThemeToggle from "../../components/ThemeToggle";
import { BrandMark, SiteMobileMenu } from "../../components/SiteNavigation";

export const metadata: Metadata = {
  alternates: { canonical: "/people/mehrdad/" },
  title: "Mehrdad Zaker, Ph.D.",
  description:
    "Mehrdad Zaker researches reinforcement learning environments, planning, and reliable software agents as founder of Neural Intelligence Labs.",
};

export default function MehrdadProfile() {
  return (
    <div className="profile-page">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="shell">
        <header className="topbar">
          <Link
            className="wordmark"
            href="/"
            aria-label="Neural Intelligence Labs home"
          >
            <BrandMark />
            <span>Neural Intelligence Labs</span>
          </Link>
          <nav className="nav" aria-label="Profile navigation">
            <Link href="/">Research</Link>
            <a href="/apps/">Apps</a>
            <ThemeToggle />
            <a className="nav-cta" href="https://www.linkedin.com/in/mehrdadzaker">
              Connect
            </a>
          </nav>
          <SiteMobileMenu extraLinks={[["Connect", "https://www.linkedin.com/in/mehrdadzaker"]]} />
        </header>

        <main id="main-content" className="profile-page-main" tabIndex={-1}>
          <div className="profile-page-grid">
            <aside className="profile-page-aside">
              <Image
                className="profile-portrait"
                src="/mehrdad-zaker-portrait-840.webp"
                alt="Mehrdad Zaker"
                width={840}
                height={1050}
                unoptimized
                loading="eager"
                decoding="async"
              />
            </aside>
            <article>
              <p className="eyebrow">Researcher profile</p>
              <h1>Mehrdad Zaker, Ph.D.</h1>
              <p className="profile-role">
                Founder, Neural Intelligence Labs · San Francisco + Chicago
              </p>
              <p className="profile-intro">
                I study how agents learn to act in consequential software
                environments—and how planning, state, rewards, and verification
                shape what they can reliably do.
              </p>

              <section className="profile-section">
                <h2>Focus</h2>
                <p>
                  Current work centers on reinforcement-learning environments for
                  software engineering, terminal, and web tasks; reliable
                  long-running agent systems; and planning under operational
                  constraints.
                </p>
              </section>
              <section className="profile-section">
                <h2>Research path</h2>
                <p>
                  Mehrdad’s work connects planning, reinforcement learning,
                  human–robot collaboration, and explainable intelligent systems
                  with deployable agent infrastructure. For his full biography,
                  career history, and writing, visit his personal site.
                </p>
              </section>
              <section className="profile-section">
                <h2>Now</h2>
                <ul>
                  <li>Executable RL environments for SWE, terminal, and web agents</li>
                  <li>Reward contracts and verifier robustness</li>
                  <li>Operational memory, state, evidence, and recovery</li>
                  <li>Open research collaboration in San Francisco + Chicago</li>
                </ul>
              </section>
              <section className="profile-section">
                <h2>Connect</h2>
                <div className="profile-links">
                  <a href="https://www.mehrdadzaker.com">Personal site & writing</a>
                  <a href="https://www.linkedin.com/in/mehrdadzaker">LinkedIn</a>
                  <a href="https://huggingface.co/mzakersh">Hugging Face</a>
                </div>
              </section>
            </article>
          </div>
        </main>

        <footer className="footer">
          <span>© 2026 Neural Intelligence Labs</span>
          <span>San Francisco + Chicago</span>
          <a href="/apps/">Apps & policies</a>
          <Link href="/">Back to research</Link>
        </footer>
      </div>
    </div>
  );
}
