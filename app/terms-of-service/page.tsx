import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of warpath.coffee, our products, and our services. By using the Site you agree to these Terms.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "online-store", label: "Online Store" },
  { id: "general", label: "General Conditions" },
  { id: "accuracy", label: "Accuracy" },
  { id: "modifications", label: "Modifications" },
  { id: "products", label: "Products & Services" },
  { id: "billing", label: "Billing & Account" },
  { id: "tools", label: "Optional Tools" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "submissions", label: "User Submissions" },
  { id: "errors", label: "Errors" },
  { id: "prohibited", label: "Prohibited Uses" },
  { id: "warranty", label: "Disclaimer" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Termination" },
  { id: "law", label: "Governing Law" },
  { id: "contact", label: "Contact" },
];

export default function TermsOfServicePage() {
  return (
    <PolicyShell
      eyebrow="§ Terms"
      title="Terms of Service"
      intro="Use of this site constitutes acceptance of these Terms. We may update them; continued use means continued acceptance. Reach us at admin@warpath.coffee for questions."
      lastUpdated="January 2026"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      toc={TOC}
    >
      <PolicySection id="online-store" number="01" title="Online Store Terms">
        <p>
          By agreeing to these Terms, you represent that you are at least the age of
          majority in your state or province of residence. You may not use our products
          for any illegal or unauthorized purpose, nor may you transmit any worms,
          viruses, or destructive code. <strong>A breach or violation of any of the Terms will result in immediate termination of services.</strong>
        </p>
      </PolicySection>

      <PolicySection id="general" number="02" title="General Conditions">
        <p>
          We reserve the right to refuse service to anyone for any reason at any time.
          Your content (excluding credit card information) may be transferred
          unencrypted; however credit card information is always encrypted. You agree
          not to reproduce, duplicate, copy, sell, resell, or exploit any portion of
          the Service.
        </p>
      </PolicySection>

      <PolicySection id="accuracy" number="03" title="Accuracy, Completeness &amp; Timeliness">
        <p>
          We are not responsible if information made available on this site is not
          accurate, complete, or current. The material on this site is provided for
          general information and should not be relied upon as the sole basis for
          decisions. We are under no obligation to update content.
        </p>
      </PolicySection>

      <PolicySection id="modifications" number="04" title="Modifications to Service &amp; Prices">
        <p>
          Prices for our products are subject to change without notice. We reserve the
          right at any time to modify or discontinue the Service without notice. We
          shall not be liable to you or any third party for any modification, price
          change, suspension, or discontinuance of the Service.
        </p>
      </PolicySection>

      <PolicySection id="products" number="05" title="Products or Services">
        <p>
          Certain products may be available exclusively online and have limited
          quantities, subject to return per our{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="/returns-refunds-policy">
            Returns &amp; Refunds Policy
          </a>
          . We have made efforts to display product colors and images as accurately as
          possible, but we cannot guarantee that your monitor&rsquo;s display will be
          accurate. We do not warrant that the quality of any products will meet your
          expectations.
        </p>
      </PolicySection>

      <PolicySection id="billing" number="06" title="Accuracy of Billing &amp; Account Information">
        <p>
          We reserve the right to refuse any order. We may, in our sole discretion,
          limit or cancel quantities purchased per person, per household, or per order.
          You agree to provide current, complete, and accurate purchase and account
          information for all purchases.
        </p>
      </PolicySection>

      <PolicySection id="tools" number="07" title="Optional Tools">
        <p>
          We may provide you access to third-party tools over which we neither monitor
          nor have control. You acknowledge that we provide such tools on an{" "}
          <strong>&ldquo;as is&rdquo; basis</strong> without any warranties.
        </p>
      </PolicySection>

      <PolicySection id="third-party" number="08" title="Third-Party Links">
        <p>
          Certain content available via our Service may include materials from third
          parties. We are not liable for any harm or damages related to the purchase or
          use of goods, services, resources, content, or any other transactions made in
          connection with any third-party websites.
        </p>
      </PolicySection>

      <PolicySection id="submissions" number="09" title="User Comments, Feedback &amp; Submissions">
        <p>
          You agree that we may, at any time, edit, copy, publish, distribute, and use
          in any medium any comments you submit to us, without restriction. We are
          under no obligation to maintain confidentiality, pay compensation, or respond
          to any comments.
        </p>
      </PolicySection>

      <PolicySection id="errors" number="10" title="Errors, Inaccuracies &amp; Omissions">
        <p>
          We reserve the right to correct any errors, inaccuracies, or omissions, and
          to change or update information or cancel orders if any information in the
          Service is inaccurate at any time without prior notice (including after you
          have submitted your order).
        </p>
      </PolicySection>

      <PolicySection id="prohibited" number="11" title="Prohibited Uses">
        <p>
          You are prohibited from using the site for any unlawful purpose, to harass
          others, to upload malicious code, or to violate any intellectual property
          rights. Violations may result in immediate termination of services.
        </p>
      </PolicySection>

      <PolicySection id="warranty" number="12" title="Disclaimer of Warranties; Limitation of Liability">
        <p>
          We do not guarantee that your use of our Service will be uninterrupted,
          timely, secure, or error-free. The Service is provided{" "}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>. In no
          case shall Warpath Coffee, our directors, officers, employees, affiliates, or
          agents be liable for any injury, loss, claim, or any direct, indirect,
          incidental, punitive, special, or consequential damages of any kind.
        </p>
      </PolicySection>

      <PolicySection id="indemnification" number="13" title="Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless Warpath Coffee from any
          claim or demand made by any third party due to or arising out of your breach
          of these Terms or your violation of any law.
        </p>
      </PolicySection>

      <PolicySection id="termination" number="14" title="Termination">
        <p>
          These Terms are effective unless and until terminated by either you or us. If
          in our judgment you fail to comply with any term of these Terms, we may
          terminate this agreement at any time without notice and you will remain
          liable for all amounts due.
        </p>
      </PolicySection>

      <PolicySection id="law" number="15" title="Governing Law">
        <p>
          These Terms are governed by the laws of the United States. Disputes will be
          resolved in accordance with US law and applicable state jurisdiction.
        </p>
      </PolicySection>

      <PolicySection id="contact" number="16" title="Contact">
        <p>
          Questions about the Terms of Service should be sent to us at{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>
          .
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
