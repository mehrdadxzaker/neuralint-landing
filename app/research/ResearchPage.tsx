import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";
import { BrandMark, SiteMobileMenu } from "../components/SiteNavigation";
import { apps } from "../content/apps";
import PersianAppsBanner from "../components/PersianAppsBanner";
import PersianText from "../components/PersianText";
import DestinationIcon from "../components/DestinationIcon";

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
];

// The public app catalog is the source of truth for descriptions and availability.
const currentProjects = [
  ...apps.map((app) => ({
    title: app.listingName,
    status: app.available ? null : "In development",
    description: app.description,
    image: app.image,
    alt: app.name + " app icon",
    productUrl: "/apps/" + app.slug + "/",
    actionUrl: app.available ? app.storeUrl : null,
    actionLabel: `View ${app.name} on the App Store`,
    actionKind: "store",
  })),
  {
    title: "Koto", status: "Alpha",
    description: "An alpha workspace for coordinating coding agents with isolated Git worktrees, reviewed integration, and saved sessions.",
    image: "/projects/koto-logo.webp", alt: "Koto wooden K logo",
    productUrl: null, actionUrl: "https://github.com/mehrdadxzaker/Koto", actionLabel: "View Koto on GitHub", actionKind: "github",
  },
  {
    title: "Open Radio", status: null,
    description: "RadioDesk is an open-source workspace for amateur-radio station control, signal analysis, RF tools, and local logging.",
    image: "/projects/open-radio-logo.svg", alt: "Open Radio waveform logo",
    productUrl: null, actionUrl: "https://github.com/mehrdadxzaker/radiodesk", actionLabel: "View Open Radio on GitHub", actionKind: "github",
  },
];

function Header() {
  return (
    <header className="topbar">
      <Link className="wordmark" href="/" aria-label="Neural Intelligence Labs home">
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
    <div className="site">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="shell">
        <Header />
      </div>
      <main id="main-content" tabIndex={-1}>
      <div className="shell">
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
              <a className="button primary" href="#programs">
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
              <h2 className="section-title">Apps, tools, and books.</h2>
              <p className="lead">
                Explore our apps for Persian writing, focused work, family routines,
                and fashion discovery, alongside our open-source tools and upcoming book.
              </p>
            </div>
          </div>
          <div className="current-project-grid" aria-label="Current projects">
            {currentProjects.map((project) => (
              <article className="current-project-card" key={project.title}>
                <div className="current-project-header">
                  <div className="current-project-mark">
                    <Image src={project.image} alt={project.alt} width={192} height={192} unoptimized loading="lazy" />
                  </div>
                  {project.actionUrl && <a className="current-project-action" data-destination={project.actionKind} href={project.actionUrl} aria-label={project.actionLabel} title={project.actionLabel}>
                    <DestinationIcon kind={project.actionKind === "store" ? "store" : "github"} />
                  </a>}
                </div>
                <div className="current-project-body">
                  <h3>{project.productUrl ? <a href={project.productUrl}>{project.title}</a> : project.title}</h3>
                  {project.status && <span className="current-project-status">{project.status}</span>}
                  <p><PersianText text={project.description} /></p>
                </div>
              </article>
            ))}
          </div>
          <article className="current-project-card portfolio-book">
            <Image
              className="portfolio-book-cover"
              src="/projects/architecting-multi-agent-systems.webp"
              alt=""
              width={244}
              height={300}
              unoptimized
              loading="lazy"
            />
            <div className="current-project-body">
              <h3>Architecting Multi-Agent Systems</h3>
              <p>Design Patterns, Evaluation, and Production Practices for Enterprise Agentic Workflows</p>
              <p>By Samira Ghodratnama and Mehrdad Zakershahrak</p>
              <ul className="portfolio-book-editions">
                <li>
                  <a href="https://www.packtpub.com/en-us/product/architecting-multi-agent-systems-9781808089329">Packt ebook</a>
                  {" · "}<time dateTime="2027-02-18">February 18, 2027</time>
                </li>
                <li>
                  <a href="https://www.amazon.com/dp/1808089332/">Amazon paperback</a>
                  {" · "}<time dateTime="2027-03-09">March 9, 2027</time>
                </li>
              </ul>
            </div>
          </article>
        </section>


        <section className="section" id="programs">
          <div className="section-head" id="focus">
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

      <div className="shell">
        <section className="section" id="people">
          <div className="profile-card">
            <Image
              className="profile-portrait"
              src="/mehrdad-zaker-portrait-840.webp"
              alt="Mehrdad Zaker"
              width={840}
              height={1050}
              unoptimized
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

      </div>
      </main>
      <div className="shell">
        <footer className="footer">
          <span>© 2026 Neural Intelligence Labs</span>
          <span>San Francisco + Chicago</span>
          <a href="/apps/">Apps</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
          <a href="/privacy/">Privacy</a>
        </footer>
      </div>
    </div>
  );
}
