import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Billing Terms & Conditions",
  description:
    "Accepted payment methods, subscription authorization, and how recurring charges work at Warpath Coffee.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "payment-options", label: "Payment Options" },
  { id: "secure", label: "Secure Checkout" },
  { id: "subscriptions", label: "Subscription Authorization" },
  { id: "billing-cycle", label: "Billing Cycle" },
  { id: "failed", label: "Failed Payments" },
  { id: "cancel", label: "Cancellation" },
  { id: "contact", label: "Contact" },
];

const PAYMENT_METHODS = [
  "American Express",
  "Apple Pay",
  "Diners Club",
  "Discover",
  "Elo",
  "Google Pay",
  "JCB",
  "Mastercard",
  "PayPal",
  "Shop Pay",
  "Venmo",
  "Visa",
];

export default function BillingTermsPage() {
  return (
    <PolicyShell
      eyebrow="§ Billing"
      title="Billing Terms & Conditions"
      intro="The accepted payment methods, secure-checkout details, and the rules that govern any recurring (subscription) charges from Warpath Coffee."
      lastUpdated="January 2026"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Billing Terms" }]}
      toc={TOC}
    >
      <PolicySection id="payment-options" number="01" title="Payment Options">
        <p>We accept the following credit and debit cards and digital wallets:</p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 list-none pl-0">
          {PAYMENT_METHODS.map((m) => (
            <li
              key={m}
              className="border border-canvas-300 bg-bone-100 px-3 py-2 font-mono font-bold text-[11px] tracking-[.16em] uppercase text-combat-900 text-center"
            >
              {m}
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="secure" number="02" title="Secure Checkout">
        <p>
          All payment processing happens through a <strong>secure 256-bit SSL</strong>{" "}
          payment gateway at checkout. Your card details are encrypted in transit and
          never stored on our servers. The gateway is PCI-DSS compliant.
        </p>
      </PolicySection>

      <PolicySection id="subscriptions" number="03" title="Subscription Authorization">
        <p>
          By proceeding with checkout for a subscription, you{" "}
          <strong>consent to recurring charges</strong> at the frequency and pricing
          displayed on the product page. You authorize Warpath Coffee&rsquo;s payment
          processor to charge the payment method on file according to your selected
          cadence until you cancel.
        </p>
      </PolicySection>

      <PolicySection id="billing-cycle" number="04" title="Billing Cycle">
        <p>
          Subscriptions are charged on the schedule you select &mdash; every 2 weeks,
          monthly, every 45 days, or every 2&ndash;3 months. The first charge is at
          checkout; subsequent charges occur on the same day of your billing cycle.
          You&rsquo;ll receive an SMS reminder before each shipment.
        </p>
      </PolicySection>

      <PolicySection id="failed" number="05" title="Failed Payments">
        <p>
          If a recurring charge fails (expired card, insufficient funds, etc.), we will
          attempt to retry the payment and notify you by email and SMS. Update your
          payment method via the SMS menu or by contacting{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection id="cancel" number="06" title="Cancellation">
        <p>
          You may cancel your subscription at any time. Cancellations made before the
          next billing date take effect immediately. Cancellations made after the next
          charge has already processed will apply to the following billing cycle. See
          the{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="/subscription-management-via-text">
            SMS subscription management
          </a>{" "}
          page for details.
        </p>
      </PolicySection>

      <PolicySection id="contact" number="07" title="Contact">
        <p>
          For billing questions, contact{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          or call <strong>+1 208-599-6678</strong> (09:00&ndash;17:00 MST).
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
