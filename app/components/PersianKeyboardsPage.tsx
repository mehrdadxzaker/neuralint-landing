import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import StructuredData from "./StructuredData";
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
    description: "Write Farsi your way: Persian Swipe for offline swipe typing on iPhone and iPad, or Persian Ink for Apple Pencil handwriting on iPad. Compare and download.",
    eyebrow: "Persian keyboards for iPhone & iPad",
    headline: "Persian, your way.",
    intro: "A message to family. A line of poetry. A note you want to keep. Choose swipe typing on iPhone and iPad, or write Persian by hand with Apple Pencil on iPad.",
    heroSwipe: "Get Persian Swipe · iPhone & iPad",
    heroInk: "Get Persian Ink · iPad & Pencil",
    quickFacts: "Two separate apps. US$1.99 each, paid once. No subscription. Local App Store prices and availability may vary.",
    swipeTitle: "Move a finger. Write a word.",
    swipeBody: "An offline Persian (Farsi) keyboard for iPhone and iPad. Trace through letters and lift to insert a word, or type with taps. Choose another suggestion whenever you need it.",
    swipeFacts: ["Swipe and tap typing", "Half-space (نیم‌فاصله) key", "Suggestions and local learning", "No Full Access required"],
    inkTitle: "Write with your own hand.",
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
    setupTitle: "From download to your first Persian words.",
    setupSteps: [
      ["Install your chosen app", "Open its App Store listing, check device compatibility and the local price, then install and open the app."],
      ["Add the keyboard", "Open Settings → General → Keyboard → Keyboards → Add New Keyboard and choose Persian Swipe or Persian Ink."],
      ["Switch and write", "In a supported text field, use the globe key to choose your keyboard. Swipe is ready for typing. For Ink, complete the model download first, then turn Full Access off and write with Apple Pencil."],
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
    footer: "Made by NeuralInt. For the Persian you use every day.",
  },
  fa: {
    title: "کیبورد فارسی آیفون و آیپد | Persian Swipe و Persian Ink",
    description: "کیبورد فارسی برای آیفون و آیپد: تایپ با حرکت انگشت و نیم‌فاصله در Persian Swipe، یا تبدیل دست‌خط فارسی به متن با اپل پنسل در Persian Ink. مقایسه و دانلود از اپ استور.",
    eyebrow: "برای فارسیِ شما",
    headline: "کیبورد فارسی، به شیوهٔ شما.",
    intro: "پیامی به خانواده، بیتی از شعر یا یادداشتی برای خودتان. روی آیفون و آیپد با حرکت انگشت تایپ کنید، یا روی آیپد با اپل پنسل به خط خودتان بنویسید.",
    heroSwipe: "دانلود Swipe · آیفون و آیپد",
    heroInk: "دانلود Ink · آیپد و اپل پنسل",
    quickFacts: "دو برنامهٔ جداگانه. قیمت هر برنامه در اپ استور آمریکا ۱٫۹۹ دلار، با یک‌بار پرداخت و بدون اشتراک است. قیمت و دسترسی در کشورهای دیگر ممکن است متفاوت باشد.",
    swipeTitle: "انگشت را حرکت دهید؛ کلمه را بنویسید.",
    swipeBody: "کیبورد فارسی آفلاین برای آیفون و آیپد. انگشت را روی حروف یک کلمه بکشید و بردارید تا کلمه درج شود؛ یا با ضربه روی کلیدها تایپ کنید. در صورت نیاز، پیشنهاد دیگری را انتخاب کنید.",
    swipeFacts: ["تایپ با کشیدن انگشت یا ضربه", "کلید نیم‌فاصله", "پیشنهاد کلمه و یادگیری روی دستگاه", "بدون نیاز به دسترسی کامل"],
    inkTitle: "با دست‌خط خودتان بنویسید.",
    inkBody: "کیبورد دست‌نویس فارسی برای آیپد. با اپل پنسل در پنل کیبورد بنویسید، گزینه‌های تشخیص را بررسی کنید و متن را در Notes و برنامه‌های سازگار درج کنید.",
    inkFacts: ["نوشتن با اپل پنسل", "بررسی متن پیش از درج", "آفلاین پس از دانلود مدل", "کلیدهای فارسی و انگلیسی"],
    buySwipe: "دانلود Persian Swipe از اپ استور",
    buyInk: "دانلود Persian Ink از اپ استور",
    details: "صفحهٔ برنامه و راهنمای نصب (انگلیسی)",
    price: "۱٫۹۹ دلار آمریکا · یک‌بار پرداخت · بدون اشتراک",
    compareTitle: "کدام کیبورد فارسی برای شما مناسب است؟",
    compareHeaders: ["ویژگی", "Persian Swipe", "Persian Ink"],
    rows: [
      ["دستگاه", "آیفون و آیپد · iOS 16 یا جدیدتر", "فقط آیپد · iPadOS 16 یا جدیدتر"],
      ["روش نوشتن", "کشیدن انگشت روی حروف یا ضربه زدن", "نوشتن با اپل پنسل در پنل کیبورد"],
      ["استفادهٔ آفلاین", "آفلاین کار می‌کند", "پس از یک‌بار دانلود آنلاین مدل"],
      ["دسترسی کامل", "لازم نیست", "موقتاً برای دانلود مدل؛ سپس خاموش کنید"],
      ["خرید", "۱٫۹۹ دلار آمریکا، یک‌بار پرداخت", "۱٫۹۹ دلار آمریکا، خرید جداگانه"],
    ],
    setupTitle: "از دانلود تا اولین کلمهٔ فارسی.",
    setupSteps: [
      ["برنامه را نصب کنید", "صفحهٔ برنامه را در اپ استور باز کنید، سازگاری دستگاه و قیمت محلی را بررسی کنید، سپس برنامه را نصب و اجرا کنید."],
      ["کیبورد را اضافه کنید", "در تنظیمات به Settings → General → Keyboard → Keyboards → Add New Keyboard بروید و Persian Swipe یا Persian Ink را انتخاب کنید."],
      ["کیبورد را عوض کنید و بنویسید", "در یک کادر متن سازگار، با کلید کرهٔ زمین کیبورد را انتخاب کنید. Swipe برای تایپ آماده است. در Ink ابتدا مدل فارسی را دانلود کنید، سپس دسترسی کامل را خاموش کنید و با اپل پنسل بنویسید."],
    ],
    faqTitle: "پیش از دانلود",
    questions: [
      ["آیا در Notes، پیام‌ها و برنامه‌های دیگر کار می‌کند؟", "در کادرهای متنی که iOS اجازهٔ استفاده از کیبورد جانبی می‌دهد، کار می‌کند. کادر رمز عبور و برنامه‌هایی که کیبورد جانبی را غیرفعال کرده‌اند از کیبورد اپل استفاده می‌کنند. Persian Ink نقاشی‌های قبلی Notes، عکس یا PDF را به متن تبدیل نمی‌کند."],
      ["آیا برای Persian Swipe به اپل پنسل نیاز دارم؟", "خیر. Persian Swipe با انگشت روی آیفون یا آیپد کار می‌کند. برای نوشتن دست‌خط در Persian Ink به آیپد و اپل پنسل سازگار نیاز دارید."],
      ["تشخیص دست‌خط آفلاین چگونه کار می‌کند؟", "در Persian Ink مدل تشخیص فارسی یک‌بار با اینترنت و دسترسی کامل موقت دانلود می‌شود. پس از راه‌اندازی، دسترسی کامل را خاموش کنید. تشخیص دست‌خط روی آیپد انجام می‌شود و دقت آن به دست‌خط شما بستگی دارد. Google ML Kit ممکن است هنگام اتصال به شبکه، داده‌های عملیاتی ارسال کند."],
      ["آیا باید اشتراک بخرم یا هر دو برنامه را تهیه کنم؟", "خیر. هر برنامه در اپ استور آمریکا به‌صورت جداگانه با قیمت ۱٫۹۹ دلار و یک‌بار پرداخت عرضه می‌شود. بر اساس دستگاه و شیوهٔ نوشتن خود انتخاب کنید. اشتراکی وجود ندارد؛ قیمت محلی و دسترسی را اپل نمایش می‌دهد."],
    ],
    support: "راهنمای نصب و پشتیبانی (انگلیسی)",
    privacy: "حریم خصوصی (انگلیسی)",
    footer: "ساختهٔ NeuralInt، برای فارسیِ هر روز شما.",
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
    <a className="keyboard-skip" href="#keyboards">{fa ? "رفتن به محتوای اصلی" : "Skip to content"}</a>
    <header className="shell keyboard-header">
      <a className="wordmark" href="/apps/" aria-label="NeuralInt apps"><span className="mark" aria-hidden="true" /><span lang="en" dir="ltr">NeuralInt</span></a>
      <nav aria-label={fa ? "راهبری" : "Navigation"}>
        <a href="#compare">{fa ? "مقایسه" : "Compare"}</a>
        <a href="#setup">{fa ? "روش نصب" : "Setup"}</a>
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
      <section className="keyboard-products" aria-label={fa ? "برنامه‌های کیبورد فارسی" : "Persian keyboard apps"}>
        {[
          { app: swipe, title: copy.swipeTitle, body: copy.swipeBody, facts: copy.swipeFacts, cta: copy.buySwipe, device: fa ? "آیفون و آیپد" : "iPhone & iPad" },
          { app: ink, title: copy.inkTitle, body: copy.inkBody, facts: copy.inkFacts, cta: copy.buyInk, device: fa ? "آیپد و اپل پنسل" : "iPad & Apple Pencil" },
        ].map(({ app, title, body, facts, cta, device }) => <article key={app.slug} className="keyboard-product">
          <div className="keyboard-product-identity"><Image src={app.image} alt={app.name + " app icon"} width={72} height={72} unoptimized /><div><p>{device}</p><h2 lang="en" dir="ltr">{app.name}</h2></div></div>
          <h3>{title}</h3><p>{body}</p>
          <ul>{facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <div className="keyboard-product-actions"><a className="button primary" href={app.storeUrl}>{cta} <span aria-hidden="true">↗</span></a><p>{copy.price}</p><a className="keyboard-text-link" href={"/apps/" + app.slug + "/"}>{copy.details}</a></div>
        </article>)}
      </section>
      <section className="keyboard-section" id="compare">
        <h2>{copy.compareTitle}</h2>
        <div className="keyboard-comparison"><table><thead><tr>{copy.compareHeaders.map((heading, index) => <th key={index} scope="col">{heading}</th>)}</tr></thead><tbody>{copy.rows.map(([label, a, b]) => <tr key={label}><th scope="row">{label}</th><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>
      </section>
      <section className="keyboard-section" id="setup"><h2>{copy.setupTitle}</h2><ol className="keyboard-steps">{copy.setupSteps.map(([title, body], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
      <section className="keyboard-section keyboard-questions"><h2>{copy.faqTitle}</h2>{copy.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="keyboard-support"><h2>{fa ? "برای شروع آماده‌اید؟" : "Ready to write?"}</h2><div>{[swipe, ink].map(app => <p key={app.slug}><strong lang="en" dir="ltr">{app.name}</strong><a href={"/apps/" + app.slug + "/support/"}>{copy.support}</a><a href={"/apps/" + app.slug + "/privacy/"}>{copy.privacy}</a></p>)}</div></section>
    </main>
    <footer className="shell keyboard-footer"><p>{copy.footer}</p><nav aria-label={fa ? "اطلاعات" : "Information"}><a href="/apps/">{fa ? "همهٔ برنامه‌ها" : "All apps"}</a><a href="mailto:mehrdadz@neuralint.io">{fa ? "تماس با پشتیبانی" : "Contact support"}</a><a href="/apps/terms/">{fa ? "شرایط استفاده (انگلیسی)" : "Terms"}</a></nav></footer>
  </div>;
}
