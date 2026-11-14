import type { Metadata } from "next";
import PersianKeyboardsPage, { keyboardCopy, keyboardLanguages } from "../components/PersianKeyboardsPage";

const { title, description } = keyboardCopy.en;
export const metadata: Metadata = {
  title: { absolute: title + " | NeuralInt" }, description,
  alternates: { canonical: keyboardLanguages.en, languages: keyboardLanguages },
  openGraph: { title, description, url: keyboardLanguages.en, locale: "en_US", alternateLocale: "fa_IR", type: "website", images: [{ url: "/apps/persian-swipe/app-icon-calligraphy.jpg", alt: "Persian Swipe" }] },
  twitter: { card: "summary", title, description, images: ["/apps/persian-swipe/app-icon-calligraphy.jpg"] },
};
export default function Page() { return <PersianKeyboardsPage language="en" />; }
