import type { Metadata } from "next";
import { AppLegalPage, AppPageLinks, LegalSection } from "../../../components/AppLegalPage";
import { getApp } from "../../../content/apps";

const app = getApp("ava");
export const metadata: Metadata = {
  alternates: { canonical: "/apps/ava/support/" },
  title: "Avā Support",
  description: "Get help with Persian dictation, file and live captions, recognition setup, and App Store purchases in Avā for Mac.",
};

const sections = [
  { id: "setup", label: "Set up recognition" },
  { id: "dictation", label: "Record dictation" },
  { id: "captions", label: "File and live captions" },
  { id: "access", label: "Trial and purchases" },
  { id: "contact", label: "Get help" },
];

export default function AvaSupportPage() {
  return <AppLegalPage app={app} eyebrow="Avā · Support" title="Avā Support"
    lede="Get help with Persian dictation and captions on your Mac."
    updated="November 24, 2026" sections={sections}>
    <LegalSection id="setup" title="Set up Persian recognition">
      <p>Avā requires a Mac with Apple silicon and macOS 26 or later. Open <strong>Setup &amp; access</strong>,
        connect to the internet, and choose <strong>Download models</strong> to install the Persian Whisper model.
        Wait for installation and verification to finish. You can also find model setup in Settings.</p>
      <p>Avā displays the download size. If setup stops early, check your internet connection and available storage,
        then use the setup controls to try again.</p>
    </LegalSection>
    <LegalSection id="dictation" title="Record and review Persian speech">
      <p>Allow microphone access in System Settings → Privacy &amp; Security → Microphone.
        Check your input and level meter in System Settings → Sound → Input, including any microphone mute control.</p>
      <p>Start a recording in Dictation, speak naturally, then stop and review. A recording can last up to 29 seconds.
        Recording also stops when you leave the workspace, hide or minimize Avā, or switch apps.
        Edit the text and listen to the recording before copying or saving it.</p>
    </LegalSection>
    <LegalSection id="captions" title="File and live captions">
      <p>In Captions, import an audio or video file you have permission to use, transcribe it, and review the text and timing.
        Export a transcript, SRT, WebVTT, or captions on a supported video. Avā shows supported export options.</p>
      <p>For live captions, play Persian speech in Chrome, then choose <strong>Listen to Chrome</strong>.
        Choose <strong>Choose another app…</strong> to select a different Mac app in the macOS picker.
        Allow screen and system audio recording access when macOS asks. Other audible tabs and windows in the selected
        app can contribute audio. Live captions leave the microphone off.</p>
      <p>Choose <strong>Stop</strong> when you finish listening. Review the caption text before copying it or exporting it
        as text, SRT, or WebVTT. Exported times are relative to the start of capture.</p>
    </LegalSection>
    <LegalSection id="access" title="Trial, purchase, and restore">
      <p>In <strong>Setup &amp; access</strong>, choose <strong>Start 3-day trial</strong> or the one-time full access purchase.
        Apple shows the applicable terms before confirmation. After the trial, you can still work with existing projects
        and export completed work.</p>
      <p>If Avā does not recognize a purchase, choose <strong>Restore Purchases</strong> in <strong>Setup &amp; access</strong>
        and use the Apple Account you used to buy it. Follow the access status in Avā if a purchase check is pending.
        If the initial App Store check is unavailable, check your internet connection and Apple Account sign-in,
        then choose <strong>Retry App Store setup</strong>.</p>
      <p><a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple&apos;s standard license agreement</a>
        {" "}applies to the App Store app.</p>
    </LegalSection>
    <LegalSection id="contact" title="Get help">
      <p>Email <a href="mailto:mehrdadz@neuralint.io?subject=Av%C4%81%20support">mehrdadz@neuralint.io</a> with the Avā
        version and build, macOS version, Mac model, feature, and error message. TestFlight testers can also send feedback
        through TestFlight.</p>
      <p>Settings → General → Show local diagnostics opens a troubleshooting file you can review before sharing.</p>
      <AppPageLinks app={app} />
    </LegalSection>
  </AppLegalPage>;
}
