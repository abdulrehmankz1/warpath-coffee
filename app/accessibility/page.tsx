import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Warpath Coffee is committed to making warpath.coffee accessible to everyone. Our compliance standards, ongoing work, and how to report a barrier.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "commitment", label: "Commitment" },
  { id: "standards", label: "Standards" },
  { id: "features", label: "Features" },
  { id: "ongoing", label: "Ongoing Work" },
  { id: "feedback", label: "Report a Barrier" },
  { id: "contact", label: "Contact" },
];

const FEATURES = [
  "Skip-to-content link on every page",
  "Keyboard-navigable menus, drawers, and forms",
  "Visible focus indicators on every interactive element",
  "Descriptive alt text on product imagery",
  "Color contrast meeting WCAG 2.1 AA on body and UI text",
  "Reduced-motion support — animations soften when prefers-reduced-motion is set",
  "Form fields with explicit labels and required-state hints",
];

export default function AccessibilityPage() {
  return (
    <PolicyShell
      eyebrow="§ A11y"
      title="Accessibility Statement"
      intro="Warpath Coffee is committed to making warpath.coffee usable by everyone — including the veterans, first responders, and customers who shop here with assistive technologies."
      lastUpdated="January 2026"
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Accessibility" }]}
      toc={TOC}
    >
      <PolicySection id="commitment" number="01" title="Our Commitment">
        <p>
          Accessibility is a baseline expectation, not a feature. We design and build
          warpath.coffee to be perceivable, operable, understandable, and robust for
          all users &mdash; whether you navigate by mouse, keyboard, screen reader,
          voice control, or any combination thereof.
        </p>
      </PolicySection>

      <PolicySection id="standards" number="02" title="Standards">
        <p>
          We aim to conform to <strong>WCAG 2.1 Level AA</strong> as our working
          standard. Where individual components fall short, we treat the gap as a bug
          and prioritize it accordingly.
        </p>
      </PolicySection>

      <PolicySection id="features" number="03" title="Accessibility Features">
        <p>Across the site you&rsquo;ll find:</p>
        <ul className="grid gap-2 list-none pl-0">
          {FEATURES.map((row) => (
            <li
              key={row}
              className="grid grid-cols-[24px_1fr] gap-2 items-baseline"
            >
              <span className="font-mono font-bold text-[12px] text-brass-700">▸</span>
              <span>{row}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="ongoing" number="04" title="Ongoing Work">
        <p>
          We test the site continuously across keyboard-only flows and major screen
          readers. Third-party tools (payment widgets, embedded reviews) occasionally
          introduce accessibility issues outside our direct control &mdash; when we
          spot them we either work with the vendor to fix or replace the tool.
        </p>
      </PolicySection>

      <PolicySection id="feedback" number="05" title="Report a Barrier">
        <p>
          If you encounter content or functionality that&rsquo;s not accessible to you,
          we want to know. Email{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee?subject=Accessibility+Feedback">
            admin@warpath.coffee
          </a>{" "}
          with the page URL, a description of the issue, and the assistive technology
          you&rsquo;re using if relevant. We aim to respond within{" "}
          <strong>two business days</strong>.
        </p>
      </PolicySection>

      <PolicySection id="contact" number="06" title="Contact">
        <p>
          For accommodations or to request information in an alternate format, contact{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          or call <strong>+1 208-599-6678</strong> (09:00&ndash;17:00 MST).
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
