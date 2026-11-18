import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { BrandMark } from "./SiteNavigation";
import StructuredData from "./StructuredData";
import PersianText from "./PersianText";
import { getApp, siteOrigin } from "../content/apps";

const swipe = getApp("persian-swipe");
const ink = getApp("persian-ink");

export const keyboardLanguages = {
  en: siteOrigin + "/persian-keyboards/",
  fa: siteOrigin + "/fa/",
  "x-default": siteOrigin + "/persian-keyboards/",
};

export const keyboardCopy = {
  en: {
    title: "Persian Keyboards for iPhone & iPad | Swipe & Handwriting",
    description: "Compare Persian Swipe for typing on iPhone and iPad with Persian Ink for Apple Pencil handwriting on iPad. Check compatibility and setup before downloading.",
    eyebrow: "Persian keyboards for iPhone & iPad",
    headline: "Two ways to write Persian.",
    intro: "Swipe to type on iPhone and iPad, or write with Apple Pencil on iPad.",
    heroSwipe: "Get Persian Swipe · iPhone & iPad",
    heroInk: "Get Persian Ink · iPad & Pencil",
    quickFacts: "Two separate apps. US$1.99 each, paid once. No subscription. Local App Store prices and availability may vary.",
    swipeTitle: "Swipe or tap to type Persian.",
    swipeBody: "An offline Persian (Farsi) keyboard for iPhone and iPad. Trace through letters and lift to insert a word, or type with taps. Choose another suggestion whenever you need it.",
    swipeFacts: ["Swipe and tap typing", "Half-space (نیم‌فاصله) key", "Suggestions and local learning", "No Full Access required"],
    inkTitle: "Write Persian with Apple Pencil.",
    inkBody: "A Persian handwriting keyboard for iPad. Write with Apple Pencil in the keyboard panel, review recognition candidates, and insert text into Notes and other supported apps.",
    inkFacts: ["Apple Pencil handwriting", "Review before inserting", "Offline after model setup", "Persian and English character keys"],
    buySwipe: "Get Persian Swipe",
    buyInk: "Get Persian Ink",
    details: "See app & setup",
    price: "US$1.99 once · No subscription",
    compareTitle: "Which Persian keyboard fits you?",
    compareHeaders: ["Feature", "Persian Swipe", "Persian Ink"],
    rows: [
      ["Device", "iPhone & iPad · iOS 16+", "iPad only · iPadOS 16+"],
      ["How you write", "Swipe through letters, or tap", "Apple Pencil in the keyboard panel"],
      ["Offline use", "Works offline", "After one-time online model download"],
      ["Full Access", "Not required", "Temporarily needed for model setup; turn it off afterward"],
      ["Purchase", "US$1.99 once", "US$1.99 once, purchased separately"],
    ],
    setupTitle: "Add your Persian keyboard.",
    setupSteps: [
      ["Install your chosen app", "Open its App Store listing, check device compatibility and the local price, then install and open the app."],
      ["Add the keyboard", "Open Settings → General → Keyboard → Keyboards → Add New Keyboard and choose Persian Swipe or Persian Ink."],
      ["Switch and write", "In a supported text field, use the globe key to choose your keyboard. Swipe is ready for typing. For Ink, temporarily turn on Full Access and download the Persian model. Then turn Full Access off and write with Apple Pencil."],
    ],
    faqTitle: "Before you download",
    questions: [
      ["Can I use these in Notes, messages, and other apps?", "They work in supported text fields where iOS allows third-party keyboards. Password fields and apps that disable custom keyboards use Apple’s keyboard. Persian Ink does not convert existing Notes drawings, photos, or PDFs."],
      ["Do I need Apple Pencil for Persian Swipe?", "No. Persian Swipe uses your finger on iPhone or iPad. Persian Ink’s handwriting workflow requires an iPad and a compatible Apple Pencil."],
      ["How does offline handwriting work?", "Persian Ink downloads its Persian recognition model once, while online with Full Access temporarily enabled. After setup, turn Full Access off. Handwriting recognition runs on your iPad; accuracy varies with handwriting. Google ML Kit may send operational metrics when network access is available."],
      ["Do I have to subscribe or buy both apps?", "No. Each app is a separate US$1.99 one-time purchase in the US storefront. Choose the one that fits your device and writing style. There is no subscription; local prices and availability are shown by Apple."],
    ],
    support: "Setup & support",
    privacy: "Privacy",
    footer: ["Made by ", ". For the Persian you use every day."],
  },
  fa: {
    title: "صفحه‌کلید فارسی آیفون و آیپد | Persian Swipe و Persian Ink",
    description: "با Persian Swipe روی آیفون و آیپد تایپ کنید، یا با Persian Ink و اپل پنسل روی آیپد فارسی بنویسید. راه‌اندازی، سازگاری و خرید از اپ استور.",
    eyebrow: "کیبورد فارسی برای آیفون و آیپد",
    headline: "تایپ با انگشت، نوشتن با قلم.",
    intro: "با Persian Swipe روی آیفون و آیپد تایپ کنید، یا با Persian Ink و اپل پنسل روی آیپد فارسی بنویسید.",
    heroSwipe: "دریافت Swipe · آیفون و آیپد",
    heroInk: "دریافت Ink · آیپد و اپل پنسل",
    quickFacts: "دو برنامهٔ جداگانه. بهای هر برنامه در اپ استور آمریکا ۱٫۹۹ دلار است، با یک‌بار پرداخت و بدون پرداخت دوره‌ای. بها و دسترسی در کشورهای دیگر می‌تواند متفاوت باشد.",
    swipeTitle: "انگشت را بکشید؛ واژه را بنویسید.",
    swipeBody: "کیبورد فارسی آفلاین برای آیفون و آیپد. انگشت را روی حروف یک کلمه بکشید و بردارید تا کلمه وارد شود، یا با زدن روی کلیدها تایپ کنید. اگر لازم بود، پیشنهاد دیگری را انتخاب کنید.",
    swipeFacts: ["نوشتن با کشیدن انگشت یا زدن روی کلیدها", "کلید نیم‌فاصله", "پیشنهاد واژه و یادگیری روی دستگاه", "بی‌نیاز از دسترسی کامل"],
    inkTitle: "با دست خودتان بنویسید.",
    inkBody: "کیبورد دست‌نویس فارسی برای آیپد. با اپل پنسل در کادر کیبورد بنویسید، متن پیشنهادی را بررسی کنید و آن را در Notes یا برنامهٔ سازگار وارد کنید.",
    inkFacts: ["نوشتن با اپل پنسل", "بازبینی نوشتار پیش از افزودن", "کارکرد بی‌اینترنت پس از دریافت مدل", "کلیدهای فارسی و انگلیسی"],
    buySwipe: "دریافت Persian Swipe از اپ استور",
    buyInk: "دریافت Persian Ink از اپ استور",
    details: "صفحهٔ برنامه و راهنمای راه‌اندازی (انگلیسی)",
    price: "۱٫۹۹ دلار آمریکا · یک‌بار پرداخت · بدون پرداخت دوره‌ای",
    compareTitle: "کدام صفحه‌کلید فارسی برای شما بهتر است؟",
    compareHeaders: ["ویژگی", "Persian Swipe", "Persian Ink"],
    rows: [
      ["دستگاه", "آیفون و آیپد · iOS 16 یا جدیدتر", "تنها آیپد · iPadOS 16 یا جدیدتر"],
      ["روش نوشتن", "کشیدن انگشت روی نویسه‌ها یا زدن روی کلیدها", "نوشتن با اپل پنسل در بخش صفحه‌کلید"],
      ["کارکرد بی‌اینترنت", "بی‌نیاز از اینترنت", "پس از یک‌بار دریافت مدل با اینترنت"],
      ["دسترسی کامل", "نیازی نیست", "برای دریافت مدل برای زمانی کوتاه نیاز است؛ سپس آن را خاموش کنید"],
      ["خرید", "۱٫۹۹ دلار آمریکا، یک‌بار پرداخت", "۱٫۹۹ دلار آمریکا، خرید جداگانه"],
    ],
    setupTitle: "از دریافت برنامه تا نخستین واژهٔ فارسی.",
    setupSteps: [
      ["برنامه را دریافت کنید", "صفحهٔ برنامه را در اپ استور باز کنید، سازگاری دستگاه و بهای برنامه در کشور خود را ببینید، سپس برنامه را دریافت و باز کنید."],
      ["صفحه‌کلید را بیفزایید", "به Settings → General → Keyboard → Keyboards → Add New Keyboard بروید و Persian Swipe یا Persian Ink را برگزینید."],
      ["صفحه‌کلید را عوض کنید و بنویسید", "در یک جای نوشتن سازگار، با کلید کرهٔ زمین صفحه‌کلید را برگزینید. Swipe برای نوشتن آماده است. در Ink برای دریافت مدل فارسی، دسترسی کامل را برای زمانی کوتاه روشن کنید. پس از دریافت، آن را خاموش کنید و با اپل پنسل بنویسید."],
    ],
    faqTitle: "پیش از دریافت",
    questions: [
      ["آیا در Notes، پیام‌ها و برنامه‌های دیگر کار می‌کند؟", "در جاهایی برای نوشتن که iOS کاربرد صفحه‌کلیدهای دیگر را می‌پذیرد، کار می‌کند. جای گذرواژه و برنامه‌هایی که صفحه‌کلیدهای دیگر را نمی‌پذیرند از صفحه‌کلید اپل بهره می‌برند. Persian Ink نقاشی‌های پیشین Notes، عکس یا PDF را به نوشتار برنمی‌گرداند."],
      ["آیا برای Persian Swipe به اپل پنسل نیاز دارم؟", "نه. Persian Swipe با انگشت روی آیفون یا آیپد کار می‌کند. برای نوشتن با دست در Persian Ink به آیپد و اپل پنسل سازگار نیاز دارید."],
      ["بازشناسی دست‌نوشته بی‌اینترنت چگونه کار می‌کند؟", "در Persian Ink مدل بازشناسی فارسی یک‌بار با اینترنت و با دسترسی کامل برای زمانی کوتاه دریافت می‌شود. پس از راه‌اندازی، دسترسی کامل را خاموش کنید. بازشناسی دست‌نوشته روی آیپد انجام می‌شود و درستی آن به شیوهٔ نوشتن شما بستگی دارد. Google ML Kit ممکن است هنگام اتصال به شبکه، داده‌های سنجش کارکرد بفرستد."],
      ["آیا باید پرداخت دوره‌ای داشته باشم یا هر دو برنامه را بخرم؟", "نه. هر برنامه در اپ استور آمریکا جداگانه با بهای ۱٫۹۹ دلار و یک‌بار پرداخت در دسترس است. بر پایهٔ دستگاه و شیوهٔ نوشتن خود برگزینید. پرداخت دوره‌ای در کار نیست؛ اپل بهای برنامه و دسترسی به آن را در کشور شما نشان می‌دهد."],
    ],
    support: "راهنمای راه‌اندازی و پشتیبانی (انگلیسی)",
    privacy: "نگهداری از داده‌های شخصی (انگلیسی)",
    footer: ["ساختهٔ ", "، برای فارسیِ هر روز شما."],
  },
};

export default function PersianKeyboardsPage({ language }: { language: "en" | "fa" }) {
  const copy = keyboardCopy[language];
  const fa = language === "fa";
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": keyboardLanguages[language] + "#keyboards",
    url: keyboardLanguages[language], name: copy.title, description: copy.description,
    inLanguage: language, publisher: { "@id": siteOrigin + "/#organization" },
    mainEntity: { "@type": "ItemList", itemListElement: [swipe, ink].map((app, index) => ({
      "@type": "ListItem", position: index + 1, name: app.name,
      url: siteOrigin + "/apps/" + app.slug + "/",
    })) },
  };
  return <div className="keyboard-site" lang={language} dir={fa ? "rtl" : "ltr"}>
    <StructuredData data={data} />
    <a className="keyboard-skip" href="#keyboards">{fa ? "رفتن به بخش اصلی" : "Skip to content"}</a>
    <header className="shell keyboard-header">
      <Link className="wordmark" href="/" aria-label="Neural Intelligence Labs home"><BrandMark /><span lang="en" dir="ltr">Neural Intelligence Labs</span></Link>
      <nav aria-label={fa ? "راهبری" : "Navigation"}>
        <a href="#compare">{fa ? "سنجش" : "Compare"}</a>
        <a href="#setup">{fa ? "راه‌اندازی" : "Setup"}</a>
        <a href="#guides">{fa ? "راهنماها" : "Guides"}</a>
        <a href={fa ? "/persian-keyboards/" : "/fa/"} lang={fa ? "en" : "fa"} dir={fa ? "ltr" : "rtl"}>{fa ? "English" : "فارسی"}</a>
        <ThemeToggle />
      </nav>
    </header>
    <main id="keyboards" className="shell keyboard-main">
      <section className="keyboard-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.headline}</h1>
        <p className="keyboard-lede">{copy.intro}</p>
        <div className="keyboard-hero-actions"><a className="button primary" href={swipe.storeUrl}>{copy.heroSwipe} <span aria-hidden="true">↗</span></a><a className="button secondary" href={ink.storeUrl}>{copy.heroInk} <span aria-hidden="true">↗</span></a></div>
        <p className="keyboard-purchase">{copy.quickFacts}</p>
      </section>
      <section className="keyboard-products" aria-label={fa ? "برنامه‌های صفحه‌کلید فارسی" : "Persian keyboard apps"}>
        {[
          { app: swipe, title: copy.swipeTitle, body: copy.swipeBody, facts: copy.swipeFacts, cta: copy.buySwipe, device: fa ? "آیفون و آیپد" : "iPhone & iPad" },
          { app: ink, title: copy.inkTitle, body: copy.inkBody, facts: copy.inkFacts, cta: copy.buyInk, device: fa ? "آیپد و اپل پنسل" : "iPad & Apple Pencil" },
        ].map(({ app, title, body, facts, cta, device }) => <article key={app.slug} className="keyboard-product">
          <div className="keyboard-product-identity"><Image src={app.image} alt={app.name + " app icon"} width={72} height={72} unoptimized /><div><p>{device}</p><h2 lang="en" dir="ltr">{app.name}</h2></div></div>
          <h3>{title}</h3><p>{body}</p>
          <ul>{facts.map(fact => <li key={fact}>{fa ? fact : <PersianText text={fact} />}</li>)}</ul>
          <div className="keyboard-product-actions"><a className="button primary" href={app.storeUrl}>{cta} <span aria-hidden="true">↗</span></a><p>{copy.price}</p><a className="keyboard-text-link" href={"/apps/" + app.slug + "/"} aria-label={`${copy.details} — ${app.name}`}>{copy.details}</a></div>
        </article>)}
      </section>
      <section className="keyboard-section" id="compare">
        <h2>{copy.compareTitle}</h2>
        <div className="keyboard-comparison"><table><thead><tr>{copy.compareHeaders.map((heading, index) => <th key={index} scope="col">{heading}</th>)}</tr></thead><tbody>{copy.rows.map(([label, a, b]) => <tr key={label}><th scope="row">{label}</th><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>
      </section>
      <section className="keyboard-section" id="setup"><h2>{copy.setupTitle}</h2><ol className="keyboard-steps">{copy.setupSteps.map(([title, body], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
      <section className="keyboard-section" id="guides">
        <h2>{fa ? "راهنمای تایپ و نوشتن فارسی" : "Persian typing and handwriting guides"}</h2>
        <p>{fa ? "نیم‌فاصله را کپی کنید، یا مراحل راه‌اندازی دست‌نویس فارسی روی آیپد را بخوانید." : "Copy a Persian half-space, or follow the Apple Pencil setup steps."}</p>
        <ul>
          <li><a href={(fa ? "/fa" : "") + "/guides/persian-half-space/"}>{fa ? "نیم‌فاصله در آیفون و آیپد؛ راهنما و ابزار کپی" : "Persian half-space on iPhone and iPad, with a copy tool"}</a></li>
          <li><a href={(fa ? "/fa" : "") + "/guides/persian-handwriting-ipad/"}>{fa ? "نوشتن فارسی با اپل پنسل روی آیپد" : "Write Persian with Apple Pencil on iPad"}</a></li>
        </ul>
      </section>
      <section className="keyboard-section keyboard-questions"><h2>{copy.faqTitle}</h2>{copy.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="keyboard-support"><h2>{fa ? "برای آغاز آماده‌اید؟" : "Ready to write?"}</h2><div>{[swipe, ink].map(app => <p key={app.slug}><strong lang="en" dir="ltr">{app.name}</strong><a href={"/apps/" + app.slug + "/support/"} aria-label={`${copy.support} — ${app.name}`}>{copy.support}</a><a href={"/apps/" + app.slug + "/privacy/"} aria-label={`${copy.privacy} — ${app.name}`}>{copy.privacy}</a></p>)}</div></section>
    </main>
    <footer className="shell keyboard-footer"><p>{copy.footer[0]}<bdi lang="en" dir="ltr">Neural Intelligence Labs</bdi>{copy.footer[1]}</p><nav aria-label={fa ? "درباره" : "Information"}><a href="/apps/">{fa ? "همهٔ برنامه‌ها" : "All apps"}</a><a href="mailto:mehrdadz@neuralint.io">{fa ? "پیام به پشتیبانی" : "Contact support"}</a><a href="/apps/terms/">{fa ? "آیین کاربری (انگلیسی)" : "Terms"}</a></nav></footer>
  </div>;
}
