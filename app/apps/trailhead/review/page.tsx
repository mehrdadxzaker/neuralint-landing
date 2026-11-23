import type { Metadata } from "next";
import {
  AppLegalPage,
  AppPageLinks,
  LegalCallout,
  LegalSection,
  trailheadApp,
} from "../../../components/AppLegalPage";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: "/apps/trailhead/review/" },
  title: "Trailhead App Review Guide",
  description: "A reproducible App Review path for Trailhead permissions, focus sessions, and Live Activities.",
};

const sections = [
  { id: "identity", label: "App identity" },
  { id: "review-path", label: "Review path" },
  { id: "permissions", label: "Permission use" },
  { id: "subscription", label: "Purchases" },
  { id: "network", label: "Network behavior" },
  { id: "contact", label: "Review contact" },
];

export default function TrailheadReviewPage() {
  return (
    <AppLegalPage
      app={trailheadApp}
      eyebrow="Trailhead · App Review"
      title="A clear path through the app."
      lede="This public guide explains Trailhead's review path and platform permissions. Confidential reviewer contact details remain in App Store Connect."
      updated="November 23, 2026"
      sections={sections}
    >
      <LegalSection id="identity" title="App identity">
        <dl className="legal-facts">
          <div><dt>Listing</dt><dd>Trailhead: Deep Focus</dd></div>
          <div><dt>Apple ID</dt><dd>6798798615</dd></div>
          <div><dt>Bundle ID</dt><dd>com.mehrdad.trailhead</dd></div>
          <div><dt>Sign-in</dt><dd>Not required</dd></div>
          <div><dt>Demo account</dt><dd>Not applicable; Trailhead has no app account system</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="review-path" title="Representative review path">
        <p><strong>Fresh installation:</strong></p>
        <ol>
          <li>Launch Trailhead. No sign-in or account creation is required.</li>
          <li>Set Focus length to 5 minutes. App selection through Apple&apos;s Family Activity Picker is optional.</li>
          <li>Choose the free starter trail, tap Begin focus hike, and let the session complete naturally.</li>
          <li>Return to Focus and start a second session on the same starter trail. Check that progress from the first session is saved and no purchase is required.</li>
          <li>Select a Plus-locked trail or soundscape to check the Plus offer. In the U.S. storefront, verify that it is presented as a one-time purchase. No purchase is needed to review the offer.</li>
        </ol>
        <p><strong>Returning installation:</strong> A free user can start another session on the starter trail. To check an existing paid entitlement, open Purchases and restore from Focus.</p>
        <LegalCallout>
          The national-park picker and focus simulation do not require an account.
          Screen Time selection is optional; the core timer can be reviewed without
          granting Family Controls access.
        </LegalCallout>
      </LegalSection>

      <LegalSection id="permissions" title="Why each permission exists">
        <dl className="legal-facts wide">
          <div><dt>Family Controls</dt><dd>Voluntarily shield user-selected distractions during an active session.</dd></div>
          <div><dt>Device Activity</dt><dd>End shielding reliably when the scheduled focus interval completes.</dd></div>
          <div><dt>Live Activities</dt><dd>Show focus timing and simulated trail progress on the Lock Screen.</dd></div>
          <div><dt>Notifications</dt><dd>Tell the user when the destination is reached.</dd></div>
          <div><dt>Background audio</dt><dd>Continue the chosen soundscape while the iPhone is locked.</dd></div>
        </dl>
      </LegalSection>

      <LegalSection id="subscription" title="StoreKit purchase and restore">
        <p>
          Trailhead Plus is a non-consumable, one-time purchase in the U.S. App
          Store. It costs US$14.99, does not renew, and unlocks all current trails
          and soundscapes. Apple displays the purchase terms before confirmation.
          Trailhead does not operate its own purchase account or backend.
        </p>
        <p>
          Existing verified paid Plus purchases keep permanent access. To restore
          access, use Restore Purchases in Purchases and restore on the Focus
          screen. Older subscriptions may still renew until canceled or
          discontinued. Use Manage existing subscription in the app to review them.
        </p>
      </LegalSection>

      <LegalSection id="network" title="Network behavior">
        <p>
          First-time trail loads request public data from the National Park Service
          ArcGIS endpoint and are cached. No task, Screen Time selection, precise
          location, or advertising identifier is added to that request.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="Review contact">
        <p>
          App Review can use the contact information saved with the version in App
          Store Connect. General support is available at
          <a href="mailto:mehrdadz@neuralint.io"> mehrdadz@neuralint.io</a>.
        </p>
        <AppPageLinks app={trailheadApp} />
      </LegalSection>
    </AppLegalPage>
  );
}
