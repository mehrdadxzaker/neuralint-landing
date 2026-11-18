import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { BrandMark } from "./SiteNavigation";
import StructuredData from "./StructuredData";
import PersianText from "./PersianText";
import { getApp, siteOrigin } from "../content/apps";
import { guideCopy, guideLanguages, guidePath, type GuideLanguage, type PersianGuide } from "../content/persian-guides";
import "./persian-writing-guides.css";

const halfSpace = "\u200c";

function GuideText({ text, language }: { text: string; language: GuideLanguage }) {
  if (language === "en") return <PersianText text={text} />;
  // Keep English product names, settings labels and Unicode names readable in RTL copy.
  return text.split(/([A-Za-z][A-Za-z0-9]*(?:[ .+:/→-]+[A-Za-z0-9]+)*)/g).map((part, index) =>
    index % 2 === 1 ? <bdi key={index} lang="en" dir="ltr">{part}</bdi> : part,
  );
}

function HalfSpaceTool({ language }: { language: GuideLanguage }) {
  const fa = language === "fa";
  const copyLabel = fa ? "کپی نیم‌فاصله" : "Copy half-space";
  return <section className="persian-guide-tool" aria-labelledby="copy-half-space" data-half-space-tool
    data-copy-fallback-label={fa ? "کپی خودکار انجام نشد. کاراکتر داخل کادر را انتخاب و کپی کنید." : "Automatic copy was unavailable. Select and copy the character in the field."}>
    <h2 id="copy-half-space">{copyLabel}</h2>
    <p id="half-space-help">{fa ? "کادر زیر فقط یک کاراکتر نامرئی دارد. برای کپی دستی، داخل کادر بزنید، «انتخاب همه» و سپس «کپی» را انتخاب کنید." : "The field contains one invisible character. To copy manually, select the field, choose Select All, then Copy."}</p>
    <div className="persian-guide-copy-controls">
      <label htmlFor="half-space-character">{fa ? "کاراکتر نیم‌فاصله" : "Half-space character"} <bdi dir="ltr" lang="en">(U+200C)</bdi></label>
      <input id="half-space-character" className="persian-guide-copy-input" type="text" readOnly defaultValue={halfSpace}
        dir="ltr" spellCheck={false} autoComplete="off" aria-describedby="half-space-help" data-half-space-value />
      <button className="button primary" type="button" hidden data-copy-half-space data-copy-label={copyLabel}
        data-copied-label={fa ? "نیم‌فاصله کپی شد." : "Half-space copied."}>{copyLabel}</button>
    </div>
    <output className="persian-guide-copy-status" data-copy-status aria-live="polite" />
    <p className="persian-guide-small">{fa ? "این ابزار فقط همان کاراکتر را کپی می‌کند و متنی به سرور نمی‌فرستد." : "This tool copies only that character. It sends no text to a server."}</p>
  </section>;
}

function HalfSpaceGuide({ language }: { language: GuideLanguage }) {
  const fa = language === "fa";
  return <>
    <HalfSpaceTool language={language} />
    <section className="persian-guide-section" aria-labelledby="what-is-half-space">
      <h2 id="what-is-half-space">{fa ? "نیم‌فاصله چه کاری می‌کند؟" : "What a half-space does"}</h2>
      <p>{fa ? <>نیم‌فاصله نام رایج کاراکتر <bdi lang="en" dir="ltr">Zero Width Non-Joiner (ZWNJ)</bdi> با کد <bdi lang="en" dir="ltr">U+200C</bdi> است. بین دو حرف قرار می‌گیرد و جلوی اتصال آن‌ها را می‌گیرد، بدون اینکه مثل فاصلهٔ معمولی جای خالی ایجاد کند. اسم «نیم‌فاصله» به معنی نصف یک فاصلهٔ قابل‌دیدن نیست.</> : <>A half-space is the <bdi lang="en" dir="ltr">Zero Width Non-Joiner (ZWNJ)</bdi>, Unicode <bdi dir="ltr">U+200C</bdi>. It prevents adjacent letters from joining without adding the visible gap of a normal space. Despite the name, it is not half the width of a space.</>}</p>
      <div className="persian-guide-examples">
        <table><caption>{fa ? "یک کلمه با سه نوع جداسازی" : "The same words with three kinds of separation"}</caption>
          <thead><tr><th scope="col">{fa ? "روش" : "Separator"}</th><th scope="col">{fa ? "مثال اول" : "Example 1"}</th><th scope="col">{fa ? "مثال دوم" : "Example 2"}</th></tr></thead>
          <tbody>
            <tr><th scope="row">{fa ? "فاصلهٔ معمولی" : "Normal space"}</th><td lang="fa" dir="rtl">می روم</td><td lang="fa" dir="rtl">کتاب ها</td></tr>
            <tr><th scope="row">{fa ? "نیم‌فاصله" : "Half-space (ZWNJ)"}</th><td lang="fa" dir="rtl">می‌روم</td><td lang="fa" dir="rtl">کتاب‌ها</td></tr>
            <tr><th scope="row">{fa ? "بدون جداکننده" : "No separator"}</th><td lang="fa" dir="rtl">میروم</td><td lang="fa" dir="rtl">کتابها</td></tr>
          </tbody>
        </table>
      </div>
      <p>{fa ? "در این دو مثال، نیم‌فاصله بعد از «می» و پیش از «ها» می‌آید. لازم نیست بین همهٔ بخش‌های هر کلمه نیم‌فاصله بگذارید؛ استفاده از آن به املای کلمه بستگی دارد." : <>In these examples, the half-space goes after <bdi lang="fa" dir="rtl">می</bdi> and before <bdi lang="fa" dir="rtl">ها</bdi>. It does not belong between every pair of word parts; use it where the word’s spelling calls for it.</>}</p>
    </section>
    <section className="persian-guide-section" aria-labelledby="paste-half-space">
      <h2 id="paste-half-space">{fa ? "در متن خود استفاده کنید" : "Use it in your text"}</h2>
      <ol>
        <li>{fa ? "کاراکتر نیم‌فاصله را با ابزار بالا یا از صفحه‌کلیدی که آن را دارد کپی کنید." : "Copy the character above, or enter it with any keyboard that provides ZWNJ."}</li>
        <li>{fa ? "اگر بین دو بخش کلمه فاصلهٔ معمولی هست، آن را پاک کنید و مکان‌نما را همان‌جا بگذارید." : "Remove any normal space between the two parts and put the cursor there."}</li>
        <li>{fa ? "نیم‌فاصله را بچسبانید. مثلاً بین «کتاب» و «ها» قرار دهید تا «کتاب‌ها» نوشته شود." : <>Paste the half-space. Between <bdi lang="fa" dir="rtl">کتاب</bdi> and <bdi lang="fa" dir="rtl">ها</bdi>, the result is <bdi lang="fa" dir="rtl">کتاب‌ها</bdi>.</>}</li>
      </ol>
      <p>{fa ? "نیم‌فاصله مخصوص یک برنامه نیست. در متن‌های معمولی می‌توانید آن را کپی و جای‌گذاری کنید، هرچند بعضی برنامه‌ها ممکن است هنگام ذخیره یا ارسال متن آن را تغییر دهند." : "ZWNJ is not tied to one app. You can copy and paste it in ordinary text, although some apps may change it when saving or sending the text."}</p>
    </section>
    <section className="persian-guide-section" aria-labelledby="swipe-half-space">
      <h2 id="swipe-half-space">{fa ? "کلید نیم‌فاصله در Persian Swipe" : "The half-space key in Persian Swipe"}</h2>
      <p><GuideText language={language} text={fa ? "اگر از Persian Swipe استفاده می‌کنید، در کیبورد فارسی روی کلید «⁞» کنار کلید فاصله بزنید تا نیم‌فاصله وارد شود. این کلید در دسترس‌پذیری با نام «Half-space, نیم‌فاصله» مشخص شده است." : "If you use Persian Swipe, tap the ⁞ key beside Space on the Persian keyboard to insert a half-space. Its accessibility label is “Half-space, نیم‌فاصله”."} /></p>
      <p><GuideText language={language} text={fa ? "Persian Swipe برای آیفون و آیپد با iOS 16 یا جدیدتر است. تایپ و کلید نیم‌فاصله آفلاین کار می‌کنند و به Full Access نیاز ندارند. در کادر رمز و برنامه‌هایی که کیبوردهای دیگر را غیرفعال می‌کنند، کیبورد اپل نمایش داده می‌شود." : "Persian Swipe supports iPhone and iPad with iOS 16 or later. Typing and the half-space key work offline without Full Access. Password fields and apps that block third-party keyboards use Apple’s keyboard."} /></p>
    </section>
  </>;
}

const handwritingSteps = {
  en: [
    ["Add the keyboard", "Install and open Persian Ink. In Settings → General → Keyboard → Keyboards → Add New Keyboard, choose Persian Ink."],
    ["Download the Persian model once", "Connect to the internet. In Settings → General → Keyboard → Keyboards → Persian Ink, temporarily enable Allow Full Access. Open a supported text field, select Persian Ink with the globe key, and tap Download Persian model. Keep the keyboard open until the download finishes."],
    ["Turn Full Access off", "Return to Settings → General → Keyboard → Keyboards → Persian Ink and turn Allow Full Access off. The installed model can now recognize handwriting offline."],
    ["Write, review, and insert", "In a supported text field, choose Persian Ink with the globe key. Write a line with Apple Pencil in the keyboard’s white panel, tap Recognize, and review the suggested text. Choose the result you want to insert."],
  ],
  fa: [
    ["کیبورد را اضافه کنید", "Persian Ink را نصب و باز کنید. در Settings → General → Keyboard → Keyboards → Add New Keyboard، گزینهٔ Persian Ink را انتخاب کنید."],
    ["مدل فارسی را یک‌بار دانلود کنید", "به اینترنت وصل شوید. در Settings → General → Keyboard → Keyboards → Persian Ink، گزینهٔ Allow Full Access را موقتاً روشن کنید. در یک کادر متن سازگار، با کلید کرهٔ زمین به Persian Ink بروید و روی Download Persian model بزنید. کیبورد را باز نگه دارید تا دانلود تمام شود."],
    ["دسترسی کامل را خاموش کنید", "به Settings → General → Keyboard → Keyboards → Persian Ink برگردید و Allow Full Access را خاموش کنید. پس از نصب مدل، تشخیص دست‌خط آفلاین انجام می‌شود."],
    ["بنویسید، بررسی کنید و وارد کنید", "در یک کادر متن سازگار، با کلید کرهٔ زمین Persian Ink را انتخاب کنید. با اپل پنسل یک خط در کادر سفید کیبورد بنویسید و روی Recognize بزنید. متن پیشنهادی را بررسی و نتیجهٔ موردنظر را انتخاب کنید تا وارد متن شود."],
  ],
} as const;

function HandwritingGuide({ language }: { language: GuideLanguage }) {
  const fa = language === "fa";
  return <>
    <section className="persian-guide-section" aria-labelledby="handwriting-requirements">
      <h2 id="handwriting-requirements">{fa ? "چه چیزهایی لازم دارید؟" : "What you need"}</h2>
      <p><GuideText language={language} text={fa ? "یک آیپد با iPadOS 16 یا جدیدتر، اپل پنسل سازگار با همان آیپد، و اینترنت برای دانلود اولیهٔ مدل فارسی. Persian Ink روی آیفون ارائه نمی‌شود." : "An iPad with iPadOS 16 or later, an Apple Pencil compatible with that iPad, and internet access for the initial Persian model download. Persian Ink is not an iPhone app."} /></p>
    </section>
    <section className="persian-guide-section" aria-labelledby="handwriting-setup">
      <h2 id="handwriting-setup">{fa ? "راه‌اندازی و اولین استفاده" : "Setup and first use"}</h2>
      <ol className="persian-guide-steps">{handwritingSteps[language].map(([title, body]) => <li key={title}><h3>{title}</h3><p><GuideText text={body} language={language} /></p></li>)}</ol>
      <p>{fa ? "دقت تشخیص به دست‌خط شما بستگی دارد. پیش از وارد کردن نتیجه، کلمه‌ها، فاصله‌ها و نشانه‌گذاری را بررسی کنید. اگر نتیجه درست نیست، خط را دوباره بنویسید یا از کلیدهای تایپ استفاده کنید." : "Recognition varies with your handwriting. Check the words, spacing, and punctuation before inserting a result. If it is wrong, write the line again or use the character keys."}</p>
    </section>
    <section className="persian-guide-section" aria-labelledby="handwriting-text-fields">
      <h2 id="handwriting-text-fields">{fa ? "کجا کار می‌کند؟" : "Where it works"}</h2>
      <p><GuideText language={language} text={fa ? "در کادرهای متن سازگار، از جمله در Apple Notes، می‌توانید کیبورد Persian Ink را انتخاب کنید. کادر رمز، بعضی کادرهای محافظت‌شده و برنامه‌هایی که کیبوردهای دیگر را غیرفعال می‌کنند، از کیبورد اپل استفاده می‌کنند." : "You can choose the Persian Ink keyboard in supported text fields, including in Apple Notes. Password fields, some protected fields, and apps that disable third-party keyboards use Apple’s keyboard."} /></p>
      <p><GuideText language={language} text={fa ? "دست‌خط باید در کادر خود کیبورد نوشته شود. Persian Ink عکس، PDF یا نقاشی‌ها و دست‌نوشته‌های قبلی در Notes را به متن تبدیل نمی‌کند و جای تشخیص دست‌خط خود Notes را نمی‌گیرد." : "Write inside the keyboard’s own panel. Persian Ink does not convert photos, PDFs, or existing Notes drawings and handwriting. It does not replace Notes’ own handwriting recognition."} /></p>
    </section>
    <section className="persian-guide-section" aria-labelledby="handwriting-offline">
      <h2 id="handwriting-offline">{fa ? "آفلاین و حریم خصوصی" : "Offline use and privacy"}</h2>
      <p><GuideText language={language} text={fa ? "پس از دانلود مدل، تشخیص دست‌خط روی آیپد انجام می‌شود و برای استفادهٔ معمول می‌توانید Full Access را خاموش نگه دارید. Google ML Kit که تشخیص دست‌خط را انجام می‌دهد، ممکن است هنگام دسترسی به شبکه، داده‌های عملیاتی برای سنجش عملکرد ارسال کند." : "After the model download, handwriting recognition runs on your iPad. You can keep Full Access off for normal use. Google ML Kit supplies the recognizer and may send operational metrics when network access is available."} /> <a href="/apps/persian-ink/privacy/">{fa ? "جزئیات حریم خصوصی (انگلیسی)" : "Read the privacy details"}</a>.</p>
    </section>
  </>;
}

export default function PersianWritingGuide({ guide, language }: { guide: PersianGuide; language: GuideLanguage }) {
  const fa = language === "fa";
  const copy = guideCopy[guide][language];
  const app = getApp(guide === "half-space" ? "persian-swipe" : "persian-ink");
  const otherGuide = guide === "half-space" ? "handwriting-ipad" : "half-space";
  const hubPath = fa ? "/fa/" : "/persian-keyboards/";
  const hubLabel = fa ? "کیبوردهای فارسی" : "Persian keyboards";
  const data = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "NeuralInt", item: siteOrigin + "/" },
      { "@type": "ListItem", position: 2, name: hubLabel, item: siteOrigin + hubPath },
      { "@type": "ListItem", position: 3, name: copy.title, item: guideLanguages(guide)[language] },
    ],
  };
  return <div className="keyboard-site persian-guide" lang={language} dir={fa ? "rtl" : "ltr"}>
    <StructuredData data={data} />
    <a className="keyboard-skip" href="#writing-guide">{fa ? "رفتن به متن راهنما" : "Skip to guide"}</a>
    <header className="shell keyboard-header">
      <Link className="wordmark" href="/" aria-label="Neural Intelligence Labs home"><BrandMark /><span lang="en" dir="ltr">Neural Intelligence Labs</span></Link>
      <nav aria-label={fa ? "ناوبری" : "Navigation"}>
        <a href={hubPath}>{hubLabel}</a>
        <a href={guidePath(guide, fa ? "en" : "fa")} hrefLang={fa ? "en" : "fa"} lang={fa ? "en" : "fa"} dir={fa ? "ltr" : "rtl"}>{fa ? "English" : "فارسی"}</a>
        <ThemeToggle />
      </nav>
    </header>
    <main id="writing-guide" className="shell persian-guide-main">
      <nav className="persian-guide-breadcrumb" aria-label={fa ? "مسیر صفحه" : "Breadcrumb"}><a href={hubPath}>{hubLabel}</a><span aria-hidden="true">/</span><span>{fa ? "راهنما" : "Guide"}</span></nav>
      <article>
        <header className="persian-guide-heading"><h1>{copy.heading}</h1><p><GuideText text={copy.intro} language={language} /></p></header>
        {guide === "half-space" ? <HalfSpaceGuide language={language} /> : <HandwritingGuide language={language} />}
        <section className="persian-guide-section persian-guide-app" aria-labelledby="guide-app">
          <h2 id="guide-app"><bdi lang="en" dir="ltr">{app.name}</bdi></h2>
          <p>{fa ? "اگر این کیبورد برای شما مناسب است، سازگاری دستگاه، قیمت و شرایط خرید را در اپ استور ببینید. هر برنامه جداگانه و با یک‌بار پرداخت ارائه می‌شود؛ اشتراک ندارد." : "If this keyboard fits your needs, check device compatibility, price, and purchase details on the App Store. Each app is a separate one-time purchase with no subscription."}</p>
          <div className="persian-guide-actions"><a className="button primary" href={app.storeUrl}>{fa ? "مشاهده در اپ استور" : `View ${app.name} on the App Store`} <span aria-hidden="true">↗</span></a><a href={`/apps/${app.slug}/`}>{fa ? "صفحه و راهنمای برنامه (انگلیسی)" : "App details and setup"}</a></div>
        </section>
      </article>
      <nav className="persian-guide-related" aria-label={fa ? "راهنمای مرتبط" : "Related guide"}>
        <a href={guidePath(otherGuide, language)}>{guideCopy[otherGuide][language].title}</a>
        <a href={hubPath}>{fa ? "مقایسهٔ Persian Swipe و Persian Ink" : "Compare Persian Swipe and Persian Ink"}</a>
      </nav>
    </main>
    <footer className="shell keyboard-footer"><p lang="en" dir="ltr">Neural Intelligence Labs</p><nav aria-label={fa ? "اطلاعات" : "Information"}><a href="/apps/">{fa ? "همهٔ برنامه‌ها" : "All apps"}</a><a href="mailto:mehrdadz@neuralint.io">{fa ? "تماس با پشتیبانی" : "Contact support"}</a><a href="/apps/terms/">{fa ? "شرایط استفاده (انگلیسی)" : "Terms"}</a></nav></footer>
  </div>;
}
