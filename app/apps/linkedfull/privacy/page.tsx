import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection } from "../../../components/AppLegalPage";
import { getApp } from "../../../content/apps";

const app = getApp("linkedfull");

export const metadata: Metadata = {
  alternates: { canonical: "/apps/linkedfull/privacy/" },
  title: "LinkedFull 2.0 Privacy Policy",
  description: "How LinkedFull 2.0 TestFlight handles photos, wardrobe scanning, retail browsing, and AI try-on.",
};

const sections = [
  { id: "photos", label: "Photos and outfit previews" },
  { id: "camera", label: "Wardrobe camera" },
  { id: "stores", label: "Retail sites" },
  { id: "ai-try-on", label: "AI try-on" },
  { id: "choices", label: "Storage and deletion" },
  { id: "testflight", label: "TestFlight and support" },
];

export default function LinkedFullPrivacyPage() {
  return (
    <AppLegalPage app={app} eyebrow="LinkedFull 2.0 · Privacy" title="LinkedFull 2.0 Privacy Policy"
      lede="This policy describes LinkedFull 2.0 TestFlight for iPhone."
      updated="November 24, 2026" sections={sections}>
      <LegalSection id="photos" title="Photos and outfit previews">
        <p>LinkedFull accesses your iPhone Photos library through the system photo picker and receives the photos you choose there. The app saves a local copy of each garment you add. A personal portrait stays in memory for the session. You can also choose one of the sample models bundled with the app.</p>
        <p>Local-only builds such as build 3122 use Apple Vision and Core Image on your iPhone. Their outfit photos and previews stay on the device. In all builds, a preview stays in memory unless you save it to Looks. The app does not require a LinkedFull account.</p>
      </LegalSection>
      <LegalSection id="camera" title="Wardrobe camera">
        <p>With camera permission, LinkedFull processes the live view on your iPhone while you scan. It keeps candidate garment images for review during the scan. The live video stays on your iPhone and the app creates no video file. Only the images you confirm in the review are saved to your wardrobe.</p>
      </LegalSection>
      <LegalSection id="stores" title="Retail sites">
        <p>You can open retailer sites in a temporary in-app browser session. Visiting a site or importing a product photo from a page can make requests to that site or the providers it uses. Those sites and providers handle your activity under their own privacy policies. LinkedFull saves a product photo to your wardrobe when you confirm the addition.</p>
      </LegalSection>
      <LegalSection id="ai-try-on" title="AI try-on">
        <p>Starting with internal build 3123, you can choose <strong>Enable AI try-on</strong>. When you generate a look, LinkedFull uploads the portrait and garment photos you selected directly to the OpenAI Images API to create the preview. Choose photos you have permission to use.</p>
        <p>You supply your own OpenAI project API key. LinkedFull keeps it in the app&apos;s iPhone Keychain and uses it to authenticate requests to OpenAI. You can turn AI try-on off or remove your key under <strong>Privacy → AI try-on</strong>. Turning it off stops future requests. Your saved wardrobe and looks stay on your iPhone.</p>
        <p>OpenAI&apos;s API does not use request data for model training by default. OpenAI may retain data in abuse monitoring logs for up to 30 days by default, with exceptions described in its <a href="https://developers.openai.com/api/docs/guides/your-data">API data controls</a>. These controls also govern requests already processed by OpenAI.</p>
      </LegalSection>
      <LegalSection id="choices" title="Storage and deletion">
        <p>The app excludes its local wardrobe and saved looks from device backups. Use the remove action on a garment or saved look to delete the app&apos;s copy. Clear your personal photo in Fitting room to remove it from the session. These actions leave original photos in your Photos library. Deleting LinkedFull removes its local library. Before deleting the app, use <strong>Remove saved key</strong> under <strong>Privacy → AI try-on</strong> to clear your key from the iPhone Keychain.</p>
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
