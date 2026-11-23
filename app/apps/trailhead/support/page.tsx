import type { Metadata } from "next";
import {
  AppLegalPage,
  AppPageLinks,
  LegalCallout,
  LegalSection,
  trailheadApp,
} from "../../../components/AppLegalPage";

export const metadata: Metadata = {
  alternates: { canonical: "/apps/trailhead/support/" },
  title: "Trailhead Support",
  description: "Help with Trailhead focus sessions, Screen Time, audio, and Lock Screen progress.",
};

const sections = [
  { id: "contact", label: "Contact support" },
  { id: "lock-screen", label: "Lock Screen progress" },
  { id: "screen-time", label: "Screen Time shields" },
  { id: "audio", label: "Soundscapes" },
  { id: "trails", label: "Trail catalog" },
  { id: "billing", label: "Billing" },
  { id: "safety", label: "Trail safety" },
];

export default function TrailheadSupportPage() {
  return (
    <AppLegalPage
      app={trailheadApp}
      eyebrow="Trailhead · Support"
      title="Keep moving forward."
      lede="Fast checks for the few things Trailhead depends on: iOS permissions, a focus session, audio, and a network connection for first-time trail loads."
      updated="November 23, 2026"
      sections={sections}
    >
      <LegalSection id="contact" title="Contact support">
        <p>
          Email <a href="mailto:mehrdadz@neuralint.io?subject=Trailhead%20support">mehrdadz@neuralint.io</a>.
          Include the Trailhead version, iOS version, iPhone model, and a brief
          description of what happened. Do not send passwords, Screen Time tokens,
          or sensitive task text.
        </p>
        <LegalCallout>
          For a billing problem, include only Apple&apos;s order identifier if needed —
          never send card details or an Apple Account password.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="lock-screen" title="Lock Screen progress">
        <ol>
          <li>Open iPhone Settings, find Trailhead, and allow Live Activities.</li>
          <li>Start a focus hike before locking the iPhone.</li>
          <li>Wait briefly for iOS to place the activity on the Lock Screen.</li>
        </ol>
        <p>
          iOS controls exact refresh timing. Opening Trailhead reconciles progress
          immediately if the Lock Screen update cadence was delayed.
        </p>
      </LegalSection>

      <LegalSection id="screen-time" title="Screen Time shields">
        <p>
          Reopen Trailhead&apos;s Screen Time selection, approve Family Controls, and
          select at least one app or category. If shields remain after a session,
          open Trailhead and end the active hike. Revoking Trailhead&apos;s Screen Time
          permission in Settings also removes its ability to apply shields.
        </p>
      </LegalSection>

      <LegalSection id="audio" title="Soundscapes while locked">
        <p>
          Start the chosen soundscape before locking the phone and confirm media
          volume is audible. Another audio app, a phone call, or an output-route
          change can interrupt playback; return to Trailhead and press play again.
        </p>
      </LegalSection>

      <LegalSection id="trails" title="Trail catalog">
        <p>
          First-time trail loading requires Internet access to the National Park
          Service. Check the connection and retry. Previously loaded park catalogs
          remain cached for quicker return visits.
        </p>
      </LegalSection>

      <LegalSection id="billing" title="Plus purchases and restore">
        <p>
          You can keep using the starter trail for free. In the U.S. App Store,
          Trailhead Plus is a US$14.99 one-time purchase for all current trails
          and soundscapes. It does not renew.
        </p>
        <p>
          Existing verified paid Plus purchases keep permanent access. If access
          is missing, use Restore Purchases under Purchases and restore on the
          Focus screen with the Apple Account used to purchase Plus.
        </p>
        <p>
          Older subscriptions may still renew until canceled or discontinued.
          To check or cancel one, use Manage existing subscription in Trailhead
          or open iPhone Settings → your name → Subscriptions.
        </p>
      </LegalSection>

      <LegalSection id="safety" title="Real-world trail safety">
        <p>
          Trailhead&apos;s hikes are simulations. Trail data is informational and not a
          navigation or safety service. For closures, hazards, permits, weather, and
          current conditions, consult the National Park Service and the specific
          park before visiting.
        </p>
        <AppPageLinks app={trailheadApp} />
      </LegalSection>
    </AppLegalPage>
  );
}
