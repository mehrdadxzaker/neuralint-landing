import Image from "next/image";
import ThemeToggle from "../../components/ThemeToggle";
import InstallActions from "./InstallActions";
import { persianInkRelease } from "./release";

const assets = "/apps/persian-ink/";

function AppIdentity() {
  return (
    <a className="pi-identity" href="/apps/persian-ink/" aria-label="Persian Ink home">
      <Image src={`${assets}app-icon-calligraphy.jpg`} alt="" width={52} height={52} unoptimized />
      <span>Persian Ink</span>
    </a>
  );
}

export default function PersianInkLanding() {
  return (
    <div className="pi-landing">
      <a className="pi-skip" href="#main">Skip to content</a>
      <header className="pi-shell pi-topbar">
        <AppIdentity />
        <nav className="pi-nav" aria-label="Persian Ink navigation">
          <a className="pi-nav-language" href="/fa/" lang="fa" dir="rtl">فارسی</a>
          <a className="pi-nav-secondary" href="#how-it-works">How it works</a>
          <a href="#setup">Setup</a>
          <a className="pi-nav-secondary" href="/apps/persian-ink/support/">Support</a>
          <ThemeToggle />
        </nav>
      </header>
      <main id="main">
        <section className="pi-shell pi-hero" aria-labelledby="pi-title">
          <div className="pi-hero-copy" id="download">
            <h1 id="pi-title">Your<br />handwriting.<br /><em>Persian text.</em></h1>
            <p className="pi-lettering" lang="fa" dir="rtl">دست‌خط شما، متن فارسی.</p>
            <p className="pi-lede">Write Persian with Apple Pencil in the keyboard panel, then review and insert the text.</p>
            <div className="pi-actions"><InstallActions statusId="pi-hero-release-status" /></div>
          </div>
          <figure className="pi-hero-figure">
            <div className="pi-product-stage">
              <div className="pi-tablet pi-tablet-detail"><div className="pi-tablet-window">
                <Image src={`${assets}01-pencil-panel.png`} alt="Actual Persian Ink keyboard showing its Apple Pencil handwriting panel" width={2064} height={2752} unoptimized loading="eager" fetchPriority="high" />
              </div></div>
            </div>
            <figcaption>Actual app screen · handwriting panel detail</figcaption>
          </figure>
        </section>
        <div className="pi-shell pi-facts" aria-label="At a glance"><span>Apple Pencil writing</span><span>Offline after setup</span><span>One-time purchase</span></div>
        <section className="pi-workflow" id="how-it-works" aria-labelledby="pi-workflow-title">
          <div className="pi-shell">
            <h2 id="pi-workflow-title">Write. Review. Insert.</h2>
            <ol className="pi-workflow-steps">
              <li><div className="pi-step-art"><span className="pi-step-number">01</span><span className="pi-ink-example" lang="fa" dir="rtl">درود</span></div><h3>Write a line</h3><p>Use Apple Pencil in the keyboard panel.</p></li>
              <li><div className="pi-step-art"><span className="pi-step-number">02</span><span className="pi-candidate-example" lang="fa" dir="rtl">درود</span></div><h3>Review the words</h3><p>Tap Recognize. Choose a candidate.</p></li>
              <li><div className="pi-step-art"><span className="pi-step-number">03</span><span className="pi-text-example" lang="fa" dir="rtl">درود</span></div><h3>Insert the text</h3><p>Insert the text into your supported app.</p></li>
            </ol>
            <p className="pi-example-note">Illustrated workflow. Recognition quality varies with handwriting.</p>
            <div className="pi-offline">
              <div><h3>Recognition stays on your iPad.</h3><p>Your handwriting is processed on device. After the Persian model is installed, recognition works offline with Full Access off.</p></div>
              <a href="/apps/persian-ink/support/#offline">How offline setup works <span aria-hidden="true">↗</span></a>
            </div>
            <p className="pi-sdk-note">Google ML Kit may send operational metrics when network access is available. <a href="/apps/persian-ink/privacy/">Read the privacy policy.</a></p>
          </div>
        </section>
        <section className="pi-shell pi-everyday" aria-labelledby="pi-everyday-title">
          <figure><div className="pi-tablet pi-tablet-portrait"><Image src={`${assets}02-character-typing.png`} alt="Actual app screen showing the Persian character keyboard" width={2064} height={2752} unoptimized loading="lazy" /></div><figcaption>Actual app screen · Persian character keyboard detail</figcaption></figure>
          <div className="pi-everyday-copy">
            <h2 id="pi-everyday-title">Use it in supported<br />text fields.</h2>
            <p className="pi-section-lede">Choose Persian Ink from the keyboard menu in Notes or another supported app.</p>
            <div className="pi-feature-row"><h3>Type characters too</h3><p>Persian and English keys, numbers, punctuation and <bdi lang="fa" dir="rtl">نیم‌فاصله</bdi>.</p></div>
            <div className="pi-feature-row"><h3>Made for supported text fields</h3><p>Tested in Apple Notes and a native text editor. Protected fields and apps that block third-party keyboards use Apple’s keyboard.</p></div>
            <a className="pi-text-link" href="/apps/persian-ink/support/#limits">See what is supported <span aria-hidden="true">↗</span></a>
          </div>
        </section>
        <section className="pi-shell pi-install" id="setup" aria-labelledby="pi-install-title">
          <div className="pi-install-offer">
            <h2 id="pi-install-title">Set up<br />Persian Ink.</h2><p className="pi-price">{persianInkRelease.price}</p><p className="pi-price-caption">One time. No subscription.</p>
            <div className="pi-actions pi-actions-footer"><InstallActions statusId="pi-footer-release-status" showFacts={false} showSetup={false} /></div>
          </div>
          <ol className="pi-setup-steps">
            <li><span>01</span><div><h3>Add the keyboard</h3><p>Settings → General → Keyboard → Keyboards → Add New Keyboard → Persian Ink.</p></div></li>
            <li><span>02</span><div><h3>Download the Persian model</h3><p>While online, temporarily enable Allow Full Access. Download the model in the keyboard and wait for confirmation.</p></div></li>
            <li><span>03</span><div><h3>Turn Full Access off</h3><p>The keyboard is ready for offline recognition.</p></div></li>
            <li><span>04</span><div><h3>Write your first line</h3><p>Write with Apple Pencil, recognize, review and insert.</p></div></li>
          </ol>
        </section>
        <section className="pi-shell pi-beta" id="beta" aria-labelledby="pi-beta-title">
          <div><h2 id="pi-beta-title">Invited to TestFlight?</h2><p>Install Apple’s free TestFlight app. Open your Persian Ink invitation and tap <strong>View in TestFlight</strong>, or open TestFlight, tap <strong>Redeem</strong> and enter your redemption code. Choose Persian Ink, then <strong>Accept</strong>, <strong>Install</strong> and <strong>Open</strong>.</p><p className="pi-beta-help">An invitation is required; installing TestFlight alone does not unlock the beta. Missing an invitation? Check your email and spam, or <a href="mailto:mehrdadz@neuralint.io?subject=Persian%20Ink%20installation%20help">contact support</a>. Keep your code private.</p></div>
          <div className="pi-beta-actions"><a className="pi-button" href={persianInkRelease.testFlightDownloadUrl}>Download TestFlight <span aria-hidden="true">↗</span></a><a className="pi-text-link" href="/apps/persian-ink/support/">Full setup &amp; troubleshooting</a></div>
        </section>
        <p className="pi-shell pi-requirements">iPadOS 16 or later. Compatible Apple Pencil required for handwriting. Existing Notes drawings, photos and PDFs are not converted. Local App Store prices may vary.</p>
        <div className="pi-shell persian-crosslink"><p><a href="/guides/persian-handwriting-ipad/">Persian handwriting on iPad: setup and first words</a></p><p lang="fa" dir="rtl"><a href="/fa/guides/persian-handwriting-ipad/">راهنمای نوشتن فارسی با اپل پنسل</a> یا <a href="/fa/">مقایسهٔ کیبوردهای فارسی</a> را بخوانید.</p><p>Prefer swipe typing on iPhone or iPad? <a href="/apps/persian-swipe/">Explore Persian Swipe ↗</a></p></div>
      </main>
      <footer className="pi-shell pi-footer">
        <div><AppIdentity /><p>Persian handwriting for iPad.</p></div>
        <nav aria-label="Persian Ink information"><a href="/apps/persian-ink/privacy/">Privacy</a><a href="/apps/persian-ink/support/">Support</a><a href="/apps/terms/">Terms</a><a href="/apps/">NeuralInt apps <span aria-hidden="true">↗</span></a></nav>
        <p className="pi-copyright">© 2026 Neural Intelligence Labs</p>
      </footer>
    </div>
  );
}
