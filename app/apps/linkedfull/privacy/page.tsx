import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection } from "../../../components/AppLegalPage";
import { getApp } from "../../../content/apps";

const app = getApp("linkedfull");

export const metadata: Metadata = {
  alternates: { canonical: "/apps/linkedfull/privacy/" },
  title: "LinkedFull 2.0 Privacy Policy",
  description: "How the LinkedFull 2.0 TestFlight app handles garment photos, portraits, outfit previews, and support requests.",
};

const sections = [
  { id: "photos", label: "Photos and outfit previews" },
  { id: "choices", label: "Storage and deletion" },
  { id: "testflight", label: "TestFlight and support" },
];

export default function LinkedFullPrivacyPage() {
  return (
    <AppLegalPage app={app} eyebrow="LinkedFull 2.0 · Privacy" title="LinkedFull 2.0 Privacy Policy"
      lede="This policy describes the LinkedFull 2.0 TestFlight app for iPhone. Earlier versions used different features and services."
      updated="November 24, 2026" sections={sections}>
      <LegalSection id="photos" title="Photos and outfit previews">
        <p>LinkedFull can access only the photos you choose for it in the system photo picker. The app saves a local copy of each garment you add. A personal portrait stays in memory for the session. You can also choose one of the sample models bundled with the app.</p>
        <p>The TestFlight app uses Apple Vision and Core Image on your iPhone to create a placement preview. LinkedFull does not upload the selected photos or previews. A preview stays in memory unless you save it to Looks. The app does not require a LinkedFull account.</p>
      </LegalSection>
      <LegalSection id="choices" title="Storage and deletion">
        <p>The app excludes its local wardrobe and saved looks from device backups. Use the remove action on a garment or saved look to delete the app&apos;s copy. Clear your personal photo in Fitting room to remove it from the session. These actions leave original photos in your Photos library. Deleting LinkedFull removes its local library.</p>
      </LegalSection>
      <LegalSection id="testflight" title="TestFlight and support">
        <p>The app has no developer-operated analytics, advertising, or tracking. Apple collects and shares crash logs and usage information through TestFlight, along with any feedback you submit. We use it to test and improve the app. See <a href="https://www.apple.com/legal/privacy/data/en/test-flight/">Apple&apos;s TestFlight privacy notice</a>.</p>
        <p>If you contact support, we receive your email address and anything you send. We use that information to answer your request and keep it as needed to follow up or meet legal obligations.</p>
        <p>For privacy questions about any version, or to request access to or deletion of your TestFlight data or support correspondence, email <a href="mailto:mehrdadz@neuralint.io">mehrdadz@neuralint.io</a>. Please leave personal photos out of your first message.</p>
        <AppPageLinks app={app} />
      </LegalSection>
    </AppLegalPage>
  );
}
