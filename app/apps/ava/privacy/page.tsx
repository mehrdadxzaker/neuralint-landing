import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection } from "../../../components/AppLegalPage";
import { getApp } from "../../../content/apps";

const app = getApp("ava");
export const metadata: Metadata = {
  alternates: { canonical: "/apps/ava/privacy/" },
  title: "Avā Privacy Policy",
  description: "How Avā for Mac handles speech and caption content, Apple model downloads and purchases, optional diagnostics, and support correspondence.",
};

const sections = [
  { id: "content", label: "Speech and projects" },
  { id: "apple", label: "Models and Apple services" },
  { id: "diagnostics", label: "Local diagnostics" },
  { id: "retention", label: "Retention and sharing" },
  { id: "contact", label: "Contact and changes" },
];

export default function AvaPrivacyPage() {
  return <AppLegalPage app={app} eyebrow="Avā · Privacy" title="Avā Privacy Policy"
    lede="This policy covers dictation and captions in Avā for Mac."
    updated="November 24, 2026" sections={sections}>
    <LegalSection id="content" title="Speech and project content">
      <p>Avā processes dictation and captions on your Mac. Recordings, imported media, transcripts,
        and captions stay on your Mac until you choose to share or sync them. Avā requires no separate account.</p>
      <p>Avā uses the microphone when you start dictation and grant macOS permission. You can revoke that
        permission in System Settings. You choose which media files and project folders Avā can access.</p>
      <p>For live captions, Avā uses macOS screen and system audio recording access to listen to the app you choose,
        including audio from its other audible tabs and windows. The microphone stays off. You can stop listening
        in Avā or revoke recording access in System Settings.</p>
      <p>Avā processes live app audio in memory. Live captions remain in the current session, and you can copy or export them.
        Saved projects may contain copies of imported media, text revisions, caption timing, or audio in the folder you choose.
        Exporting, copying, emailing, or saving to a synced folder can make content available to the chosen service
        under that service&apos;s terms.</p>
    </LegalSection>
    <LegalSection id="apple" title="Models and Apple services">
      <p>Avā downloads the Persian recognition model through Apple&apos;s hosted asset service. Downloads and updates
        require an internet connection. Apple operates the service under its own privacy terms. Avā uses the installed model locally.</p>
      <p>Apple processes trials and purchases through StoreKit. Avā receives verified purchase and access information
        to unlock features, restore purchases, and handle expiry and refunds. Avā may keep local access and pending-purchase
        records in macOS Keychain. NeuralInt does not receive payment-card details or your Apple Account password.</p>
    </LegalSection>
    <LegalSection id="diagnostics" title="Local diagnostics and TestFlight">
      <p>Avā keeps a limited troubleshooting record on your Mac with operation stages, fixed error codes, timing,
        app version, model fingerprints, random operation identifiers, and numeric measurements such as audio level or
        available storage. The record excludes audio, transcripts, file names, and arbitrary error messages.
        It is limited to 128 recent events and 256 KiB. Choose Settings → General → Show local diagnostics to review
        the file and share it if you choose.</p>
      <p>Avā writes status markers to macOS system logs. Apple may supply platform diagnostics under its own settings and terms.
        During TestFlight, Apple collects and shares crash logs and usage information with the developer,
        along with feedback you submit. See <a href="https://www.apple.com/legal/privacy/data/en/test-flight/">TestFlight &amp; Privacy</a>.</p>
    </LegalSection>
    <LegalSection id="retention" title="Retention, sharing, and support">
      <p>Temporary dictation audio remains available for review until you discard it or add the reviewed result.
        An unexpected quit can leave temporary files on your Mac. Saved projects and exports remain until you delete them.
        Preferences, models, diagnostics, and Keychain records may remain after you remove Avā.
        Apple retains purchase records under its own terms.</p>
      <p>Avā has no developer-operated advertising or behavioral analytics service and does not sell project content.
        If you email support, NeuralInt receives your email and anything you attach. NeuralInt uses this information
        to respond and troubleshoot and retains it as needed for support or legal obligations.</p>
    </LegalSection>
    <LegalSection id="contact" title="Contact and policy changes">
      <p>For a privacy question or a request to delete support correspondence, email
        {" "}<a href="mailto:mehrdadz@neuralint.io">mehrdadz@neuralint.io</a>. Material changes will be reflected in this policy
        and the app&apos;s disclosures.</p>
      <AppPageLinks app={app} />
    </LegalSection>
  </AppLegalPage>;
}
