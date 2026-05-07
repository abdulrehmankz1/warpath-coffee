import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Tag, Repeat, Gift } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { Button } from "@/components/warpath/Button";
import { SHIPPING } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Discounts & Promo Programs",
  description:
    "Free shipping on $85+, discount codes, Buy X Get X promos, and the always-on subscription discount. Stack your savings.",
};

const PROGRAMS = [
  {
    icon: Truck,
    code: "OFFER · 01",
    title: "Free USA Shipping",
    eligibility: `Orders of $${SHIPPING.freeShippingThresholdUsd} or more`,
    body: "Spend $85 or more in the cart and standard shipping unlocks automatically — no code needed. Applies to USA addresses only.",
    cta: { label: "Stack the Bag", href: "/shop" },
  },
  {
    icon: Tag,
    code: "OFFER · 02",
    title: "Discount Codes",
    eligibility: "Enter at checkout",
    body: "Promo codes are entered during the checkout process on the shipping or payment page. One discount per order — codes cannot be combined with other discounts.",
    cta: { label: "Browse Coffee", href: "/shop" },
  },
  {
    icon: Gift,
    code: "OFFER · 03",
    title: "Buy X Get X Free",
    eligibility: "Limited-time promotions",
    body: "When a Buy 2 Get 1 Free style promo is running, add all the items to the cart (including the free one) and the discount code applies the savings automatically. Cannot combine with other promotions.",
    cta: { label: "See Active Drops", href: "/shop" },
  },
  {
    icon: Repeat,
    code: "OFFER · 04",
    title: "Subscription Pricing",
    eligibility: "Always-on for subscribers",
    body: "Our subscriptions are already discounted. You can use a code on the first purchase, but recurring shipments are billed at the standard subscription rate — which is the lowest price we offer.",
    cta: { label: "Start Subscription", href: "/subscribe" },
  },
] as const;

export default function DiscountsPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Discounts" }]} />
          </div>
        </div>

        {/* Hero */}
        <section
          aria-labelledby="discounts-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 sm:py-14">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Promo HQ
            </div>
            <h1
              id="discounts-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,5rem)] text-cream-50"
            >
              Save the way you brew.
            </h1>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
              Free shipping over $85, codes at checkout, periodic Buy X Get X drops, and a permanent subscription discount. Here&rsquo;s how each works.
            </p>
          </div>
        </section>

        {/* Programs */}
        <section className="bg-bone-100 py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid sm:grid-cols-2 gap-px bg-canvas-300 border border-combat-900">
            {PROGRAMS.map(({ icon: Icon, code, title, eligibility, body, cta }) => (
              <article key={code} className="bg-bone-50 p-5 sm:p-7 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="shrink-0 w-10 h-10 inline-flex items-center justify-center border border-combat-900 bg-bone-100">
                    <Icon size={16} strokeWidth={1.8} className="text-brass-700" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700">
                      {code}
                    </div>
                    <h2 className="mt-1 font-stencil font-extrabold text-[clamp(1.125rem,2vw,1.375rem)] uppercase tracking-[.02em] leading-tight text-combat-900">
                      {title}
                    </h2>
                  </div>
                </div>
                <div className="font-mono font-semibold text-[10px] tracking-[.18em] uppercase text-ash-600 mb-3">
                  Eligibility · {eligibility}
                </div>
                <p className="text-[14px] sm:text-[15px] leading-[1.65] text-ash-700">
                  {body}
                </p>
                <div className="mt-5">
                  <Link
                    href={cta.href}
                    className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                  >
                    {cta.label} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* House rules */}
        <section className="bg-bone-200 border-y border-combat-900 py-12">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
              House Rules
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.5rem,3vw,2.25rem)] text-combat-900">
              Three things to remember.
            </h2>
            <ul className="mt-5 grid gap-3 list-none pl-0 text-[14px] sm:text-[15px] leading-[1.7] text-ash-800">
              {[
                "Enter codes on the shipping or payment page during checkout.",
                "One discount per order — promo codes cannot be stacked.",
                "Tax included where applicable; final shipping is calculated at checkout.",
              ].map((rule, i) => (
                <li key={rule} className="grid grid-cols-[28px_1fr] gap-3 items-baseline border-b border-canvas-300 pb-3 last:border-b-0 last:pb-0">
                  <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-combat-900 text-cream-50 py-14 sm:py-16">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 text-center">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Best Price
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50">
              Subscription is the lowest price we offer.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-cream-50/72 max-w-[44ch] mx-auto">
              Pause or swap by SMS. No lock-in. Cancel anytime.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="brass" size="lg" href="/subscribe" opCode="OP-SUB">
                Start Subscription
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/shop"
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
              >
                Shop the Roast
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
