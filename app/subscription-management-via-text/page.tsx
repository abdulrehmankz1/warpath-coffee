import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "SMS Text Messaging Terms",
  description:
    "How Warpath Coffee's SMS subscription management works — automated reminders, modify-by-reply menu, opt-out keywords, and message frequency.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "consent", label: "Consent" },
  { id: "frequency", label: "Frequency & Cost" },
  { id: "menu", label: "SMS Menu Options" },
  { id: "keywords", label: "Opt-Out Keywords" },
  { id: "support", label: "Support" },
  { id: "rights", label: "California Rights" },
];

const MENU = [
  "Swap Flavors",
  "Skip Upcoming Order",
  "Update Quantity",
  "Update Billing Info",
  "Update Shipping Address",
  "Update Next Charge Date",
  "Add One-Time Item",
];

export default function SmsManagementPage() {
  return (
    <PolicyShell
      eyebrow="§ SMS"
      title="Subscription Management Via Text"
      intro="Manage your subscription with automated SMS reminders and order management — no app, no login, no waiting on hold. Reply to a text and you're done."
      lastUpdated="January 2026"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "SMS Subscription Terms" }]}
      toc={TOC}
    >
      <PolicySection id="overview" number="01" title="Overview">
        <p>
          Simplify your subscription with automated SMS reminders and order management.
          Before every shipment, we send a text with the price and date. Reply{" "}
          <strong>&ldquo;Modify Order&rdquo;</strong> to access the management menu &mdash;
          no need to log into an account or contact support.
        </p>
      </PolicySection>

      <PolicySection id="consent" number="02" title="Consent">
        <p>
          By checking the SMS opt-in box at checkout or by replying{" "}
          <strong>YES</strong> to a confirmation text, you consent to receive recurring
          promotional and transactional messages from Warpath Coffee. Consent is not a
          condition of purchase.
        </p>
      </PolicySection>

      <PolicySection id="frequency" number="03" title="Message Frequency &amp; Cost">
        <p>
          Message frequency varies based on your selected cadence and any one-time
          actions. <strong>Message and data rates may apply</strong> &mdash; check with
          your wireless carrier for details.
        </p>
      </PolicySection>

      <PolicySection id="menu" number="04" title="SMS Menu Options">
        <p>When you reply &ldquo;Modify Order&rdquo;, you can choose from:</p>
        <ol className="grid gap-2 list-none pl-0">
          {MENU.map((label, i) => (
            <li
              key={label}
              className="grid grid-cols-[28px_1fr] gap-3 items-baseline border-b border-canvas-300 pb-2 last:border-b-0 last:pb-0"
            >
              <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.01em] text-combat-900">
                {label}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3">
          The system will request a verification reply (<strong>&ldquo;yes&rdquo;</strong> or{" "}
          <strong>&ldquo;no&rdquo;</strong>) before processing changes.
        </p>
      </PolicySection>

      <PolicySection id="keywords" number="05" title="Opt-Out Keywords">
        <p>
          You can opt out of SMS messages at any time by texting any of the following
          keywords:
        </p>
        <div className="flex flex-wrap gap-2">
          {["STOP", "END", "CANCEL", "UNSUBSCRIBE", "QUIT"].map((k) => (
            <span
              key={k}
              className="inline-flex items-center bg-combat-900 text-brass-400 px-3 py-1.5 font-mono font-bold text-[11px] tracking-[.18em] uppercase"
            >
              {k}
            </span>
          ))}
        </div>
        <p className="mt-3">
          Opting out cancels SMS-only communications. Email and account notifications
          will continue until you unsubscribe separately.
        </p>
      </PolicySection>

      <PolicySection id="support" number="06" title="SMS Support">
        <p>
          For help with the SMS service, text <strong>HELP</strong> or contact{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>
          . We&rsquo;ll respond within one business day.
        </p>
      </PolicySection>

      <PolicySection id="rights" number="07" title="California &amp; Privacy Rights">
        <p>
          Residents of California (CCPA) and other applicable jurisdictions may request
          access to or deletion of personal information collected through the SMS
          service. See our{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="/privacy-policy">
            Privacy Policy
          </a>{" "}
          for full details on your rights.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
