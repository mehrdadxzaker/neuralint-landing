import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";
import { BrandMark, SiteMobileMenu } from "../components/SiteNavigation";
import { apps } from "../content/apps";
import PersianAppsBanner from "../components/PersianAppsBanner";

const programs = [
  {
    number: "01",
    title: "Executable environments",
    body: "Resettable, observable worlds for training and evaluating agents across repositories, terminals, and browser-based workflows.",
  },
  {
    number: "02",
    title: "Reward & verification",
    body: "Testable outcome contracts, partial-credit signals, and adversarial checks that distinguish task completion from reward hacking.",
  },
  {
    number: "03",
    title: "Curriculum & transfer",
    body: "Task generation and curricula that transfer skills from shell operations to software engineering and stateful web work.",
  },
  {
    number: "04",
    title: "Planning under constraints",
    body: "Reasoning, search, and recovery for long-horizon agents operating with limited context, time, permissions, and evidence.",
  },
  {
    number: "05",
    title: "Operational state",
    body: "Memory and state architectures that make long-running work resumable, auditable, and robust to interruption.",
  },
  {
    number: "06",
    title: "Industrial agent systems",
    body: "Applying reliable agent techniques to document operations, robotics, manufacturing, procurement, and finance.",
  },
];

// The public app catalog is the source of truth for descriptions and availability.
const currentProjects = [
  ...apps.map((app) => ({
    title: app.listingName,
    type: app.slug === "persian-ink" || app.slug === "persian-swipe" ? "Persian keyboard" : "iOS app",
    status: app.available ? "Available on the App Store" : "In development",
    description: app.description,
    image: app.image,
    alt: app.name + " app icon",
    href: "/apps/" + app.slug + "/",
    linkLabel: "Explore app",
  })),
  {
    title: "Koto", type: "Developer tools", status: "Open source · alpha",
    description: "An alpha workspace for coordinating coding agents with isolated Git worktrees, reviewed integration, and saved sessions.",
    image: "/projects/koto-logo.webp", alt: "Koto wooden K logo",
    href: "https://github.com/mehrdadxzaker/Koto", linkLabel: "View source",
  },
  {
    title: "Open Radio", type: "Amateur radio", status: "Open source",
    description: "RadioDesk is an open-source workspace for amateur-radio station control, signal analysis, RF tools, and local logging.",
    image: "/projects/open-radio-logo.svg", alt: "Open Radio waveform logo",
    href: "https://github.com/mehrdadxzaker/radiodesk", linkLabel: "View source",
  },
];

function Header() {
  return (
    <header className="topbar">
      <Link className="wordmark" href="/" aria-label="Neural Intelligence Labs research home">
        <BrandMark />
        <span>Neural Intelligence Labs</span>
      </Link>
      <nav className="nav" aria-label="Primary navigation">
        <a href="#programs">Research</a>
        <a href="#portfolio">Portfolio</a>
        <a href="/apps/">Apps</a>
        <a href="/persian-keyboards/">Persian keyboards</a>
        <a href="/people/mehrdad/">People</a>
        <ThemeToggle />
        <a className="nav-cta" href="#collaborate">
          Collaborate
        </a>
      </nav>
      <SiteMobileMenu />
    </header>
  );
}

export default function ResearchPage() {
  return (
    <main className="site">
      <div className="shell">
        <Header />
        <PersianAppsBanner />
        <section className="hero">
          <div>
            <p className="eyebrow">
              Independent AI research · San Francisco + Chicago
            </p>
            <h1>
              Reinforcement learning environments for <em>AI agents.</em>
            </h1>
          </div>
          <div className="hero-copy">
            <p>
              We build and study reinforcement learning environments for software,
              terminal, and web agents. Our research focuses on resettable tasks,
              observable state, trustworthy verification, and recovery from failure.
            </p>
            <div className="button-row">
              <a className="button primary" href="#focus">
                Current focus
              </a>
              <a className="button secondary" href="#portfolio">
                View portfolio
              </a>
            </div>
          </div>
          <div className="hero-orbit" aria-hidden="true" />
        </section>

        <section className="section portfolio-section" id="portfolio">
          <div className="section-head">
            <span className="section-index">01 / Maker&apos;s portfolio</span>
            <div>
              <h2 className="section-title">Apps and tools for everyday life.</h2>
              <p className="lead">
                Explore NeuralInt apps for Persian writing, focused work, family routines,
                and fashion discovery, alongside open-source tools.
              </p>
            </div>
          </div>
          <div className="current-project-grid" aria-label="Current projects">
            {currentProjects.map((project) => (
              <article className="current-project-card" key={project.title}>
                {project.image ? (
                  <div className="current-project-mark">
                    <Image src={project.image} alt={project.alt} width={192} height={192} unoptimized loading="lazy" />
                  </div>
                ) : (
                  <div className="current-project-textmark" aria-hidden="true">{project.title}</div>
                )}
                <div className="current-project-body">
                  <div className="current-project-meta"><span>{project.type}</span><span>{project.status}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.href && <a className="current-project-link" href={project.href}>{project.linkLabel}</a>}
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="section" id="programs">
          <div className="section-head">
            <span className="section-index">02 / Research program</span>
            <div>
              <h2 className="section-title">
                The environment is part of the intelligence.
              </h2>
              <p className="lead">
                Better agents require more than better policies. They need worlds
                with legible state, meaningful consequences, trustworthy feedback,
                and enough variation to learn skills that transfer.
              </p>
            </div>
          </div>
          <div className="program-grid">
            {programs.map((program) => (
              <article className="program" key={program.number}>
                <span className="program-num">{program.number}</span>
                <h3>{program.title}</h3>
                <p>{program.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="focus-band" id="focus">
        <div className="shell">
          <section className="section">
            <div className="focus-grid">
              <div>
                <span className="report-status">First report in development</span>
                <h2 className="report-title">
                  Executable Worlds for Learning Software Agents
                </h2>
                <p className="report-summary">
                  A practical research framework for building RL environments
                  across software engineering, terminal, and web tasks—where every
                  episode can be reset, every outcome can be verified, and every
                  failure produces useful evidence.
                </p>
              </div>
              <aside className="report-spec" aria-label="Report scope">
                <div className="spec-row">
                  <span>Format</span>
                  <span>Technical report + reference environment</span>
                </div>
                <div className="spec-row">
                  <span>Scope</span>
                  <span>SWE · Terminal · Web</span>
                </div>
                <div className="spec-row">
                  <span>Thesis</span>
                  <span>Environment quality bounds agent learning</span>
                </div>
                <div className="spec-row">
                  <span>Target</span>
                  <span>In development</span>
                </div>
              </aside>
            </div>
            <div className="method-flow" aria-label="Environment lifecycle">
              <div className="method-step">
                <code>STATE_01</code>
                <strong>Initialize</strong>
                <span>Materialize a controlled, inspectable task state.</span>
              </div>
              <div className="method-step">
                <code>ACT_02</code>
                <strong>Interact</strong>
                <span>Expose consequential actions through real tools.</span>
              </div>
              <div className="method-step">
                <code>VERIFY_03</code>
                <strong>Evaluate</strong>
                <span>Check outcomes against independent reward contracts.</span>
              </div>
              <div className="method-step">
                <code>RESET_04</code>
                <strong>Recover</strong>
                <span>Capture evidence, reset cheaply, and vary the next episode.</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="shell">
        <section className="section" id="people">
          <div className="profile-card">
            <img
              className="profile-portrait"
              src="/mehrdad-zaker-three-quarter-transparent.webp"
              alt="Mehrdad Zaker"
              loading="lazy"
              decoding="async"
            />
            <div className="profile-copy">
              <p className="eyebrow">Founder & researcher</p>
              <h2>Mehrdad Zaker, Ph.D.</h2>
              <p className="profile-role">
                Reinforcement learning · Planning · Agent systems
              </p>
              <p className="profile-bio">
                Mehrdad is a computer scientist and founder of Neural Intelligence
                Labs. His work connects reinforcement learning, planning, and
                human-centered agent systems with the systems problems that make
                long-running AI work reliable in practice.
              </p>
              <div className="profile-links">
                <a href="/people/mehrdad/">Lab profile</a>
                <a href="https://www.mehrdadzaker.com">Personal site & writing</a>
                <a href="https://www.linkedin.com/in/mehrdadzaker">LinkedIn</a>
                <a href="https://huggingface.co/mzakersh">Hugging Face</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="collaborate">
          <div className="collab">
            <h2>Build a better world for agents to learn in.</h2>
            <div>
              <p>
                Open to research collaborations, benchmark partnerships, visiting
                talks, and working sessions in San Francisco + Chicago around agent
                environments and reliable AI systems.
              </p>
              <a
                className="button primary"
                href="https://www.linkedin.com/in/mehrdadzaker"
              >
                Start a conversation
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 Neural Intelligence Labs</span>
          <span>San Francisco + Chicago</span>
          <a href="/apps/">Apps</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Privacy</a>
        </footer>
      </div>
    </main>
  );
}
