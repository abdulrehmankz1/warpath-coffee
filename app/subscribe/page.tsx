import type { Metadata } from "next";
import { ArrowRight, Repeat, Truck, ShieldCheck, MessageSquare } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { Button } from "@/components/warpath/Button";
import { SubscribeBuilder } from "@/components/warpath/SubscribeBuilder";
import { FaqAccordion } from "@/components/warpath/FaqAccordion";
import { SUBSCRIBE } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Subscribe & Save · Auto-Deliver Fresh Coffee",
  description:
    "12% off every shipment. Pause or swap by SMS. No lock-in. Pick your roast, pick your cadence — we deliver fresh, on schedule.",
};

const SUB_FAQ = [
  {
    q: "How does the subscription discount work?",
    a: "Subscriptions are always discounted vs one-time orders. You get 12% off every shipment, automatically applied at checkout — no code required.",
    id: "faq-discount",
  },
  {
    q: "Can I pause or skip a shipment?",
    a: "Yes. Reply 'Modify Order' to your SMS reminder and choose Skip Upcoming Order from the menu — no need to log in or call support.",
    id: "faq-skip",
  },
  {
    q: "Can I swap roasts between shipments?",
    a: "Absolutely. Use the Swap Flavors menu option in the SMS reminder to switch between any of our blends.",
    id: "faq-swap",
  },
  {
    q: "How do I cancel?",
    a: "Reply with the cancel keyword to your SMS reminder, or email customer care at any time. There's no lock-in or contract.",
    id: "faq-cancel",
  },
  {
    q: "Will my recurring shipment be billed at full price if I used a one-time discount code?",
    a: "No — first orders can use a code on top of the subscription discount, but recurring shipments are billed at the standard subscription rate.",
    id: "faq-codes",
  },
];

export default function SubscribePage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Subscribe" }]} />
          </div>
        </div>

        {/* Hero */}
        <section
          aria-labelledby="subscribe-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 sm:py-16">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Auto-Replenish
            </div>
            <h1
              id="subscribe-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6.5vw,5.5rem)] text-cream-50"
            >
              Never run dry.
              <br />
              <em className="not-italic text-brass-500 tracking-[-0.01em]">
                12% off, always.
              </em>
            </h1>
            <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-[1.6] text-cream-50/80 max-w-[60ch]">
              Pick your roast, pick your cadence. We deliver fresh, on schedule. Pause, swap, or cancel by SMS — no lock-in, no commitment.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              <span>12% off every shipment</span>
              <span aria-hidden="true">·</span>
              <span>Free ship $85+</span>
              <span aria-hidden="true">·</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </section>

        {/* Builder */}
        <section className="bg-bone-100 py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <SubscribeBuilder />
          </div>
        </section>

        {/* How it works */}
        <section className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <div className="mb-8 sm:mb-10 max-w-[64ch]">
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                How It Works
              </div>
              <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900">
                SMS-managed. No app. No friction.
              </h2>
            </div>
            <div className="grid sm:grid-cols-4 gap-px bg-canvas-300 border border-combat-900">
              {[
                {
                  icon: Repeat,
                  step: "01",
                  title: "Build it",
                  body: "Pick a roast, a size, a grind, and a cadence — 2 weeks to quarterly.",
                },
                {
                  icon: MessageSquare,
                  step: "02",
                  title: "We text first",
                  body: "Before every shipment, an SMS reminder lands with the order details.",
                },
                {
                  icon: Repeat,
                  step: "03",
                  title: "Modify by reply",
                  body: "Swap flavors, skip, change qty, or update your address — all via reply.",
                },
                {
                  icon: Truck,
                  step: "04",
                  title: "We ship fresh",
                  body: "Roasted to order, dispatched within 48 hours of confirmation.",
                },
              ].map(({ icon: Icon, step, title, body }) => (
                <div key={step} className="bg-bone-50 p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 inline-flex items-center justify-center border border-combat-900 bg-bone-100">
                      <Icon size={14} strokeWidth={1.8} className="text-brass-700" aria-hidden="true" />
                    </span>
                    <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 tabular-nums">
                      Step {step}
                    </span>
                  </div>
                  <h3 className="font-stencil font-extrabold text-[16px] sm:text-[17px] uppercase tracking-[.02em] leading-tight text-combat-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.6] text-ash-700">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SMS keywords ribbon */}
        <section className="bg-combat-900 text-cream-50 py-10 sm:py-12 border-b border-brass-500/20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              SMS Menu
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.5rem,3vw,2.25rem)] text-cream-50 mb-6">
              Reply to manage everything.
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-brass-500/30 border border-brass-500/30">
              {[
                "Swap Flavors",
                "Skip Upcoming Order",
                "Update Quantity",
                "Update Billing Info",
                "Update Shipping Address",
                "Update Next Charge Date",
                "Add One-Time Item",
                "Cancel Subscription",
              ].map((label, i) => (
                <li key={label} className="bg-combat-900 px-4 py-3 flex items-center gap-3">
                  <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400 tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="font-stencil font-extrabold text-[13px] sm:text-[14px] uppercase tracking-[.01em] leading-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-bone-100 py-10 sm:py-12">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid sm:grid-cols-3 gap-px bg-canvas-300 border border-combat-900">
            {[
              { icon: ShieldCheck, k: "30-day", v: "Guarantee" },
              { icon: Truck, k: "Free", v: "Ship $85+" },
              { icon: Repeat, k: "Cancel", v: "Anytime" },
            ].map(({ icon: Icon, k, v }) => (
              <div key={k} className="bg-bone-50 px-5 py-5 flex items-center gap-3">
                <Icon size={18} strokeWidth={1.8} className="text-brass-700" aria-hidden="true" />
                <div>
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                    {k}
                  </div>
                  <div className="font-stencil font-extrabold text-[15px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                    {v}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
              Subscription FAQ
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900 mb-6 sm:mb-8">
              Five questions, answered.
            </h2>
            <FaqAccordion items={SUB_FAQ} />
          </div>
        </section>

        {/* Closing */}
        <section className="bg-combat-900 text-cream-50 py-14 sm:py-16">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 text-center">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              Lowest Price · Standing Order
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50 max-w-[18ch] mx-auto">
              Lock in 12% off. Forever.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-cream-50/72 max-w-[44ch] mx-auto">
              {SUBSCRIBE.benefits[0]}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="brass" size="lg" href="#top" opCode="OP-SUB">
                Build Your Plan
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/shop"
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
              >
                Browse Single Bags
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
