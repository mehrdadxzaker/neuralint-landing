import type { Metadata } from "next";
import { getApp, siteOrigin } from "./apps";

export type GuideLanguage = "en" | "fa";
export type PersianGuide = "half-space" | "handwriting-ipad";

export const guideCopy = {
  "half-space": {
    en: {
      title: "Persian half-space: copy and use ZWNJ",
      heading: "Copy a Persian half-space",
      description: "Copy the Persian half-space character (ZWNJ, U+200C). See how it works in می‌روم and کتاب‌ها, and how to enter it on iPhone and iPad.",
      intro: "Use a half-space between parts of a Persian word, as in می‌روم and کتاب‌ها. Copy the character here and paste it wherever you need it. No app purchase is needed.",
    },
    fa: {
      title: "نیم‌فاصله چیست؟ کپی و استفاده در متن فارسی",
      heading: "نیم‌فاصله را کپی کنید",
      description: "کاراکتر نیم‌فاصله (ZWNJ، U+200C) را کپی کنید. تفاوت آن را در «می‌روم» و «کتاب‌ها» ببینید و با روش استفاده در آیفون و آیپد آشنا شوید.",
      intro: "در کلمه‌هایی مثل «می‌روم» و «کتاب‌ها»، نیم‌فاصله دو بخش کلمه را از هم جدا می‌کند. کاراکتر را از اینجا کپی کنید و در متن خود بچسبانید. برای این کار نیازی به خرید برنامه ندارید.",
    },
  },
  "handwriting-ipad": {
    en: {
      title: "Write Persian with Apple Pencil on iPad",
      heading: "From Persian handwriting to typed text on iPad",
      description: "Use Persian Ink’s Apple Pencil keyboard on iPad: download the model once, turn Full Access off, write, review the result, and insert text in supported apps.",
      intro: "Persian Ink is a handwriting keyboard for iPad. Write with Apple Pencil in its keyboard panel, review the recognized text, and choose a result to insert into a supported text field.",
    },
    fa: {
      title: "تبدیل دست‌خط فارسی به متن با اپل پنسل در آیپد",
      heading: "با اپل پنسل فارسی بنویسید و به متن تبدیل کنید",
      description: "راهنمای کیبورد Persian Ink در آیپد: مدل فارسی را یک‌بار دانلود کنید، دسترسی کامل را خاموش کنید، بنویسید، نتیجه را بررسی کنید و در برنامهٔ سازگار وارد کنید.",
      intro: "Persian Ink یک کیبورد دست‌نویس فارسی برای آیپد است. با اپل پنسل در کادر کیبورد بنویسید، متن تشخیص‌داده‌شده را بررسی کنید و نتیجهٔ موردنظر را در یک کادر متن سازگار وارد کنید.",
    },
  },
} as const;

export function guidePath(guide: PersianGuide, language: GuideLanguage): string {
  const slug = guide === "half-space" ? "persian-half-space" : "persian-handwriting-ipad";
  return `${language === "fa" ? "/fa" : ""}/guides/${slug}/`;
}

export function guideLanguages(guide: PersianGuide) {
  return {
    en: siteOrigin + guidePath(guide, "en"),
    fa: siteOrigin + guidePath(guide, "fa"),
    "x-default": siteOrigin + guidePath(guide, "en"),
  };
}

export function guideMetadata(guide: PersianGuide, language: GuideLanguage): Metadata {
  const copy = guideCopy[guide][language];
  const languages = guideLanguages(guide);
  const app = getApp(guide === "half-space" ? "persian-swipe" : "persian-ink");
  return {
    title: { absolute: `${copy.title} | NeuralInt` },
    description: copy.description,
    alternates: { canonical: languages[language], languages },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: languages[language],
      type: "article",
      locale: language === "fa" ? "fa_IR" : "en_US",
      alternateLocale: language === "fa" ? "en_US" : "fa_IR",
      images: [{ url: app.image, alt: app.name }],
    },
    twitter: { card: "summary", title: copy.title, description: copy.description, images: [app.image] },
  };
}
