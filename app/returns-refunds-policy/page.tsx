import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "30-day return window. Items must be in original condition. Refunds are issued to the original payment method.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "window", label: "Return Window" },
  { id: "eligibility", label: "Eligibility" },
  { id: "non-returnable", label: "Non-Returnable Items" },
  { id: "process", label: "Return Process" },
  { id: "damage", label: "Damage Claims" },
  { id: "refunds", label: "Refunds" },
  { id: "exchanges", label: "Exchanges" },
  { id: "contact", label: "Contact" },
];

export default function ReturnsRefundsPage() {
  return (
    <PolicyShell
      eyebrow="§ 30-Day Guarantee"
      title="Returns & Refunds"
      intro="If it isn't the smoothest cup you've had, return the unopened bag within 30 days for a full refund — no questions asked."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Returns & Refunds" }]}
      toc={TOC}
    >
      <PolicySection id="window" number="01" title="Return Window">
        <p>
          You have <strong>30 days from receiving your item</strong> to request a
          return. Requests submitted after the 30-day window will not be accepted.
        </p>
      </PolicySection>

      <PolicySection id="eligibility" number="02" title="Eligibility Requirements">
        <p>To be eligible for a return, the item must meet all the following conditions:</p>
        <ul className="grid gap-2 list-none pl-0">
          {[
            "In the same condition as you received it",
            "Unworn or unused, with tags",
            "In its original packaging",
            "Accompanied by the receipt or proof of purchase",
          ].map((row) => (
            <li key={row} className="grid grid-cols-[24px_1fr] gap-2 items-baseline">
              <span className="font-mono font-bold text-[12px] text-brass-700">▸</span>
              <span>{row}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="non-returnable" number="03" title="Non-Returnable Items">
        <p>The following items cannot be returned under any circumstance:</p>
        <ul className="grid gap-2 list-none pl-0">
          {[
            "Perishable goods (food, flowers, plants)",
            "Custom products (special orders, personalized items)",
            "Personal-care goods (e.g. beauty products)",
            "Hazardous materials, flammable liquids, or gases",
            "Sale items and gift cards",
          ].map((row) => (
            <li key={row} className="grid grid-cols-[24px_1fr] gap-2 items-baseline">
              <span className="font-mono font-bold text-[12px] text-brass-700">▸</span>
              <span>{row}</span>
            </li>
          ))}
        </ul>
      </PolicySection>

      <PolicySection id="process" number="04" title="Return Process">
        <ol className="grid gap-3 list-none pl-0">
          <li className="grid grid-cols-[28px_1fr] gap-3 items-baseline">
            <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
              01
            </span>
            <span>
              Email{" "}
              <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
                admin@warpath.coffee
              </a>{" "}
              with your order number and the reason for the return.
            </span>
          </li>
          <li className="grid grid-cols-[28px_1fr] gap-3 items-baseline">
            <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
              02
            </span>
            <span>
              We&rsquo;ll send a return shipping label and step-by-step instructions.
            </span>
          </li>
          <li className="grid grid-cols-[28px_1fr] gap-3 items-baseline">
            <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
              03
            </span>
            <span>
              Ship the item back. <strong>Items sent without prior approval will not be accepted.</strong>
            </span>
          </li>
        </ol>
      </PolicySection>

      <PolicySection id="damage" number="05" title="Damage Claims">
        <p>
          Inspect your order immediately upon receipt. If anything is{" "}
          <strong>defective, damaged, or incorrect</strong>, contact{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          right away with photos and your order number — we&rsquo;ll evaluate and make
          it right.
        </p>
      </PolicySection>

      <PolicySection id="refunds" number="06" title="Refund Method">
        <p>
          Approved refunds are <strong>automatically refunded to your original payment method</strong>.
          Processing time depends on your bank or credit card provider — typically 5–10
          business days after we issue the refund.
        </p>
      </PolicySection>

      <PolicySection id="exchanges" number="07" title="Exchanges">
        <p>
          To exchange an item, return the original. Once the return is accepted, place a{" "}
          <strong>separate purchase</strong> for the replacement item. This is the
          fastest way to ensure you receive what you want.
        </p>
      </PolicySection>

      <PolicySection id="contact" number="08" title="Contact">
        <p>
          For all returns, refunds, or related questions:{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>
          .
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
