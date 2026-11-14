import type { Metadata } from "next";
import PersianKeyboardsPage, { keyboardCopy, keyboardLanguages } from "../components/PersianKeyboardsPage";

const { title, description } = keyboardCopy.fa;
export const metadata: Metadata = {
  title: { absolute: title + " | NeuralInt" }, description,
  alternates: { canonical: keyboardLanguages.fa, languages: keyboardLanguages },
  openGraph: { title, description, url: keyboardLanguages.fa, locale: "fa_IR", alternateLocale: "en_US", type: "website", images: [{ url: "/apps/persian-swipe/app-icon-calligraphy.jpg", alt: "Persian Swipe" }] },
  twitter: { card: "summary", title, description, images: ["/apps/persian-swipe/app-icon-calligraphy.jpg"] },
};
export default function Page() { return <PersianKeyboardsPage language="fa" />; }
