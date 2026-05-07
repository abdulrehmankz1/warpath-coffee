import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Warpath Coffee collects, uses, and shares personal information. GDPR & CCPA rights, cookie usage, and opt-out instructions.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "collection", label: "Collection" },
  { id: "sharing", label: "Sharing" },
  { id: "advertising", label: "Advertising" },
  { id: "use", label: "Use" },
  { id: "cookies", label: "Cookies" },
  { id: "rights", label: "Your Rights" },
  { id: "messaging", label: "Messaging" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyShell
      eyebrow="§ Privacy"
      title="Privacy Policy"
      intro="This policy explains what personal information Warpath Coffee collects, how we use it, who we share it with, and what choices you have."
      lastUpdated="January 2026"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      toc={TOC}
    >
      <PolicySection id="collection" number="01" title="Collecting Personal Information">
        <p>
          We collect certain information about your device, your interaction with the
          Site, and the information needed to process your purchases. This may include
          device data, IP address, browser details, order details, and any information
          you provide when contacting customer support.
        </p>
      </PolicySection>

      <PolicySection id="sharing" number="02" title="Sharing Personal Information">
        <p>
          We share your personal information with service providers who help us operate
          the Site &mdash; for example, our e-commerce platform Shopify and our payment
          processors. We may also disclose information when required by law or to
          protect our rights and the rights of our customers.
        </p>
      </PolicySection>

      <PolicySection id="advertising" number="03" title="Behavioral Advertising">
        <p>
          We use targeted ads and analytics tools to understand how visitors use the
          Site. You can manage advertising preferences directly with the relevant ad
          networks &mdash; Google, Facebook, Bing, and other platforms each provide
          their own opt-out controls.
        </p>
      </PolicySection>

      <PolicySection id="use" number="04" title="Using Personal Information">
        <p>
          We use your personal information to provide our services to you &mdash;
          processing payments, fulfilling orders, communicating about your purchase,
          and following up if there&rsquo;s an issue. We may also send marketing
          communications if you&rsquo;ve opted in.
        </p>
      </PolicySection>

      <PolicySection id="cookies" number="05" title="Cookies">
        <p>
          We use functional, analytics, and checkout-related cookies to make your
          browsing experience better &mdash; for example, by remembering items in your
          cart between sessions. You can control cookies through your browser
          settings, although some site features may not work without them.
        </p>
      </PolicySection>

      <PolicySection id="rights" number="06" title="Your Rights (GDPR &amp; CCPA)">
        <p>
          If you are a resident of the European Economic Area or California, you have
          the right to access, correct, or delete the personal information we hold
          about you. Contact us at{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          to exercise these rights.
        </p>
      </PolicySection>

      <PolicySection id="messaging" number="07" title="Messaging Service Privacy">
        <p>
          For SMS subscription management, we collect your phone number, name, email,
          message metadata, and cookie data. This information is used to deliver text
          messages and improve our service. You can opt out at any time by replying{" "}
          <strong>STOP</strong>, <strong>END</strong>, <strong>CANCEL</strong>,{" "}
          <strong>UNSUBSCRIBE</strong>, or <strong>QUIT</strong>.
        </p>
        <p>
          <strong>Text Messaging Opt-In Data:</strong> We will not share or sell your
          text messaging opt-in data, consent, or related personal information with any
          third parties, unless required by law.
        </p>
      </PolicySection>

      <PolicySection id="changes" number="08" title="Changes to This Policy">
        <p>
          We may update this policy periodically. Material changes will be communicated
          to you via the Site or by email. Continued use of the Site after changes
          constitutes acceptance of the updated policy.
        </p>
      </PolicySection>

      <PolicySection id="contact" number="09" title="Contact">
        <p>
          For privacy-related questions or to exercise your rights, contact us at{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>
          .
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
