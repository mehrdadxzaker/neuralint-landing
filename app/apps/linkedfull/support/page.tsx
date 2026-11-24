import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection } from "../../../components/AppLegalPage";
import { getApp } from "../../../content/apps";

const app = getApp("linkedfull");

export const metadata: Metadata = {
  alternates: { canonical: "/apps/linkedfull/support/" },
  title: "LinkedFull Support",
  description: "Contact LinkedFull support and get help with the LinkedFull 2.0 TestFlight wardrobe, photos, and outfit previews.",
};

const sections = [
  { id: "help", label: "Contact support" },
  { id: "preview", label: "Preview an outfit" },
  { id: "photos", label: "Remove photos and looks" },
];

export default function LinkedFullSupportPage() {
  return (
    <AppLegalPage app={app} eyebrow="LinkedFull · Support" title="LinkedFull Support"
      lede="Get help with an earlier version of LinkedFull or the LinkedFull 2.0 TestFlight app."
      updated="November 24, 2026" sections={sections}>
      <LegalSection id="help" title="Contact support">
        <p>Email <a href="mailto:mehrdadz@neuralint.io">mehrdadz@neuralint.io</a> for help, including questions about an earlier account or purchase. Include your app version, iPhone model, iOS version, and the steps you tried. Leave personal photos and passwords out of the message.</p>
      </LegalSection>
      <LegalSection id="preview" title="Preview an outfit in the 2.0 beta">
        <p>Add a garment in Wardrobe or try the bundled sample overshirt. Select up to three pieces, then choose a personal photo or sample model in Fitting room. Tap Preview outfit and save the result to Looks.</p>
        <p>If a preview fails, try a front-facing photo with one person and the area the clothing covers in frame. Use a full-body photo for bottoms or one-piece garments. Use a clear garment photo with a simple background.</p>
      </LegalSection>
      <LegalSection id="photos" title="Remove photos and looks in the 2.0 beta">
        <p>Clear your personal portrait in Fitting room or use the remove action on a garment or saved look. Your original photo stays in Photos.</p>
        <AppPageLinks app={app} />
      </LegalSection>
    </AppLegalPage>
  );
}
