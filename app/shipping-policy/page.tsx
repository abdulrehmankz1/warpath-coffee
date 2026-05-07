import type { Metadata } from "next";
import { PolicyShell, PolicySection } from "@/components/warpath/PolicyShell";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Domestic USA shipping rates, processing times, transit windows, and how to handle damaged parcels.",
  robots: { index: true, follow: true },
};

const TOC = [
  { id: "scope", label: "Scope" },
  { id: "processing", label: "Processing" },
  { id: "rates", label: "Shipping Rates" },
  { id: "transit", label: "Transit & Handling" },
  { id: "delivery", label: "Delivery" },
  { id: "address", label: "Address Changes" },
  { id: "cancellations", label: "Cancellations" },
  { id: "damaged", label: "Damaged Parcels" },
];

export default function ShippingPolicyPage() {
  return (
    <PolicyShell
      eyebrow="§ Logistics"
      title="Shipping Policy"
      intro="This policy applies to domestic (USA) orders. Our warehouse is located in Las Vegas, Nevada — we ship to all 50 states via USPS and UPS."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Shipping Policy" }]}
      toc={TOC}
    >
      <PolicySection id="scope" number="01" title="Policy Scope">
        <p>
          This shipping policy applies to <strong>domestic (USA) orders only</strong>.
          Our fulfillment warehouse is in Las Vegas, Nevada. International orders are
          not currently shipped from this site — please reach customer care if you
          have a specific international request.
        </p>
      </PolicySection>

      <PolicySection id="processing" number="02" title="Processing &amp; Fulfillment">
        <p>
          Standard fulfillment is <strong>1–2 business days</strong>. During high
          order volume periods, fulfillment may extend to <strong>2–4 business days</strong>.
        </p>
        <p>
          The order cut-off time is <strong>12:00 PM Pacific Standard Time</strong> (Los
          Angeles). Orders placed before the cut-off begin processing the same business
          day; orders placed after the cut-off begin the following business day.
        </p>
      </PolicySection>

      <PolicySection id="rates" number="03" title="Shipping Rates">
        <ul className="grid gap-3">
          <li className="border border-canvas-300 bg-bone-100 px-4 py-3">
            <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
              USPS First Class · 3–4 days
            </div>
            <div className="mt-1 font-stencil font-extrabold text-[16px] uppercase tracking-[.01em] text-combat-900">
              From $4.50 · 1 bag or ≤ 15.99 oz
            </div>
          </li>
          <li className="border border-canvas-300 bg-bone-100 px-4 py-3">
            <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
              USPS Priority Mail · 1–2 days
            </div>
            <div className="mt-1 font-stencil font-extrabold text-[16px] uppercase tracking-[.01em] text-combat-900">
              From $8.70 · 2+ bags or ≥ 15.99 oz
            </div>
          </li>
        </ul>
        <p className="font-mono text-[12px] tracking-[.04em] text-ash-700">
          Final shipping cost varies by USPS metering — depending on weight and distance
          from our Las Vegas warehouse. <strong>Free shipping on orders $85+</strong>.
        </p>
      </PolicySection>

      <PolicySection id="transit" number="04" title="Transit &amp; Handling">
        <p>
          Domestic transit time: <strong>3–4 business days</strong> (Monday to Friday).
          Handling time: <strong>1–2 business days</strong> (Monday to Friday). Total
          end-to-end is typically 4–6 business days from order placement to delivery.
        </p>
      </PolicySection>

      <PolicySection id="delivery" number="05" title="Delivery">
        <p>
          We ship via <strong>USPS</strong> and <strong>UPS</strong>. You will receive a
          tracking email as soon as your order is dispatched. Tracking links are
          provided by the carrier and update on their schedule.
        </p>
      </PolicySection>

      <PolicySection id="address" number="06" title="Address Changes">
        <p>
          We <strong>cannot modify the delivery address</strong> once your order is in
          transit. If you spot an address error, contact us within{" "}
          <strong>1 day</strong> of placing the order at{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          or call <strong>+1 (208) 599-6679</strong>.
        </p>
      </PolicySection>

      <PolicySection id="cancellations" number="07" title="Cancellations">
        <p>
          <strong>There are no cancellations allowed</strong> once an order has been
          placed. Refer to our{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="/returns-refunds-policy">
            Returns &amp; Refunds Policy
          </a>{" "}
          for details on returns after delivery.
        </p>
      </PolicySection>

      <PolicySection id="damaged" number="08" title="Damaged Parcels">
        <p>
          If a parcel arrives damaged, <strong>reject it from the courier if possible</strong>{" "}
          and contact customer service immediately. Take photos before opening and email{" "}
          <a className="text-brass-700 underline underline-offset-2 hover:text-combat-900" href="mailto:admin@warpath.coffee">
            admin@warpath.coffee
          </a>{" "}
          with your order number — we&rsquo;ll make it right.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
