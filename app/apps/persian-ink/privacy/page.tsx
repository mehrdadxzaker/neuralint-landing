import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection, persianInkApp } from "../../../components/AppLegalPage";

export const metadata: Metadata = {
  title: "Persian Ink Privacy Policy",
  description: "How Persian Ink handles handwriting setup, saved preferences, model downloads and Google ML Kit operational metrics.",
  alternates: { canonical: "/apps/persian-ink/privacy/" },
};

const sections = [
  { id: "handwriting", label: "Handwriting and text" },
  { id: "storage", label: "Ink, setup and preferences" },
  { id: "google", label: "Google ML Kit" },
  { id: "access", label: "Keyboard access" },
  { id: "purchases", label: "Purchases and support" },
  { id: "contact", label: "Contact and changes" },
];

export default function PersianInkPrivacyPage() {
  return (
    <AppLegalPage app={persianInkApp} eyebrow="Persian Ink · Privacy" title="Your handwriting and privacy."
      lede="Recognition runs locally. This policy also explains the operational data collected by the Google SDK that supplies the recognizer."
      updated="November 18, 2026" sections={sections}>
      <LegalSection id="handwriting" title="Handwriting and text">
        <p>Persian Ink does not send your handwriting, recognition results or inserted text to NeuralInt. We do not keep a typing history or sell typing data. No account is required for local use.</p>
        <p>After text is inserted into Notes or another app, that app controls its storage, backup and sharing. Persian Ink does not acquire access to that app’s note library or handwritten pages.</p>
      </LegalSection>
      <LegalSection id="storage" title="Ink, setup and preferences">
        <p>Ink in the keyboard is temporary. It clears after insertion or deliberate discard and may be lost when the keyboard closes. Practice text stays on its practice screen; copy anything you want to retain before leaving.</p>
        <p>If you use handwriting setup, Persian Ink saves the Pencil samples you submit, check scores and calibration on your iPad. Device backups may include them. You can delete these in Handwriting setup. Calibration can adjust punctuation or spacing preferences using the samples you save; it does not retrain the underlying handwriting model.</p>
        <p>Personal spellings you add are saved in a container shared by the app and its keyboard. The keyboard uses them when recognized letters match. Manage or delete them in Personal spellings.</p>
        <p>If you explicitly choose Remember spacing and insert, the keyboard saves salted fingerprints of the two alternatives in its own storage on this iPad. It uses them to prioritize your choice when the same alternatives appear during manual recognition. This feature saves no strokes or readable text; fingerprints are not encryption and predictable phrases may be guessed. Its preference file is excluded from device backups. To remove it, choose Keyboard options → Forget remembered spacing.</p>
        <p>The recognizer stores downloaded model files on your iPad. Model downloads and related SDK session files may use a container shared only between Persian Ink and its own keyboard. This shared container also stores personal spellings you choose to add; it does not store your handwriting samples.</p>
        <p>When configured, the app can check for signed recognition updates. These checks do not include your handwriting, recognized text or keystrokes. After an update, the app may recalculate calibration on your iPad using your saved setup samples.</p>
      </LegalSection>
      <LegalSection id="google" title="Google ML Kit operational data">
        <p>Google ML Kit supplies the recognizer. Google states that input data and recognition output are processed on device and are not sent to Google. When network access is available, the SDK may contact Google for models, updates and operational metrics.</p>
        <p>These metrics can include device/app information, a per-installation identifier, configured language, feature events, error codes and processing timing. The SDK’s privacy manifests declare the relevant data categories. This is not a claim that the app collects no data.</p>
        <p><a href="https://developers.google.com/ml-kit/terms">Google ML Kit terms and privacy</a> · <a href="https://developers.google.com/ml-kit/ios-data-disclosure">Google’s iOS data disclosures</a></p>
      </LegalSection>
      <LegalSection id="access" title="Keyboard access and network permission">
        <p>Keep Allow Full Access off for normal offline use after model setup. Temporary setup access permits the keyboard to use the network for model downloads and allows the SDK’s operational network activity. Persian Ink does not use that permission to upload handwriting or typed text.</p>
        <p>The containing app has ordinary app network access independently of the keyboard permission. Turning off keyboard Full Access is not a claim that the entire app or every embedded SDK is incapable of network activity.</p>
        <p>Password fields, some other protected fields and apps that disable third-party keyboards use Apple’s keyboard.</p>
      </LegalSection>
      <LegalSection id="purchases" title="Purchases and support">
        <p>Apple handles App Store purchases under its own policies; we do not receive payment-card details. Persian Ink has no subscription or in-app purchases.</p>
        <p>If you choose to email support, the email and information you provide are used to address your request. The app does not automatically send us support content or diagnostic bundles. Do not include passwords or private notes.</p>
      </LegalSection>
      <LegalSection id="contact" title="Contact and changes">
        <p>Contact NeuralInt at <a href="mailto:mehrdadz@neuralint.io">mehrdadz@neuralint.io</a> for privacy questions or to request deletion of support correspondence. Material changes will be reflected here and in the App Store disclosures.</p>
      </LegalSection>
      <AppPageLinks app={persianInkApp} />
    </AppLegalPage>
  );
}
