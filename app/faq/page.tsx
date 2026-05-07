import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { FaqAccordion } from "@/components/warpath/FaqAccordion";
import { Button } from "@/components/warpath/Button";
import { ABOUT } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Sourcing, roasting, freshness, grinds, storage, subscriptions, returns, support — every common question, answered.",
};

const FAQ_GROUPS = [
  {
    label: "Coffee & Roast",
    items: ABOUT.faqs.slice(0, 5).map((f, i) => ({
      ...f,
      id: `faq-roast-${i + 1}`,
    })),
  },
  {
    label: "Orders & Support",
    items: ABOUT.faqs.slice(5).map((f, i) => ({
      ...f,
      id: `faq-orders-${i + 1}`,
    })),
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ABOUT.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
          </div>
        </div>

        <section
          aria-labelledby="faq-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 sm:py-14">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Bold Flavors, Smooth Delivery
            </div>
            <h1
              id="faq-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,5rem)] text-cream-50"
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
              Most questions about Warpath Coffee — sourcing, roasting, freshness, storage, subscriptions, returns — have a quick answer below.
            </p>
          </div>
        </section>

        <section className="bg-bone-100 py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[3fr_9fr] gap-8 lg:gap-12 items-start">
            {/* TOC */}
            <aside aria-label="FAQ groups" className="lg:sticky lg:top-[88px] border border-combat-900 bg-bone-50">
              <div className="bg-combat-900 text-cream-50 px-5 py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase">
                Quick Jump
              </div>
              <nav className="p-4 sm:p-5">
                <ol className="grid gap-2.5">
                  {FAQ_GROUPS.map((g, i) => (
                    <li key={g.label}>
                      <Link
                        href={`#group-${i + 1}`}
                        className="font-mono font-bold text-[11px] tracking-[.16em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-baseline gap-2"
                      >
                        <span className="font-mono text-[10px] tracking-[.20em] text-brass-700">
                          0{i + 1}
                        </span>
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-5 border-t border-canvas-300">
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-2">
                    Still stuck?
                  </div>
                  <Button variant="ghost" size="sm" href="/contact">
                    Contact Support →
                  </Button>
                </div>
              </nav>
            </aside>

            {/* Groups */}
            <div className="grid gap-10 sm:gap-12">
              {FAQ_GROUPS.map((g, i) => (
                <section key={g.label} id={`group-${i + 1}`} className="scroll-mt-24">
                  <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                    Group · 0{i + 1}
                  </div>
                  <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.5rem,3vw,2.25rem)] text-combat-900 mb-5 sm:mb-6">
                    {g.label}
                  </h2>
                  <FaqAccordion items={g.items} defaultOpenIndex={i === 0 ? 0 : -1} />
                </section>
              ))}
            </div>
          </div>
        </section>

        {/* Closing — direct support */}
        <section className="bg-combat-900 text-cream-50 py-12 sm:py-16 border-t border-brass-500/20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-6 lg:gap-12 items-end">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                Direct Channels
              </div>
              <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50">
                Couldn&rsquo;t find your answer?
              </h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-cream-50/72 max-w-[52ch]">
                We&rsquo;re standing by. Reach customer care by email, phone, or the contact form.
              </p>
            </div>
            <div className="grid gap-3">
              <Link
                href={`mailto:${ABOUT.contact.email}`}
                className="border border-brass-500/40 px-5 py-4 hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-150 grid grid-cols-[24px_1fr] gap-3 items-center focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
              >
                <Mail size={16} strokeWidth={1.8} aria-hidden="true" className="text-brass-400 group-hover:text-combat-900" />
                <div>
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
                    Email
                  </div>
                  <div className="font-stencil font-extrabold text-[14px] uppercase tracking-[.01em] leading-tight">
                    {ABOUT.contact.email}
                  </div>
                </div>
              </Link>
              <Link
                href={`tel:${ABOUT.contact.phone.replace(/[^+\d]/g, "")}`}
                className="border border-brass-500/40 px-5 py-4 hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-150 grid grid-cols-[24px_1fr] gap-3 items-center focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
              >
                <Phone size={16} strokeWidth={1.8} aria-hidden="true" className="text-brass-400" />
                <div>
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
                    Phone
                  </div>
                  <div className="font-stencil font-extrabold text-[14px] uppercase tracking-[.01em] leading-tight">
                    {ABOUT.contact.phone}
                  </div>
                </div>
              </Link>
              <Link
                href="/contact"
                className="border border-brass-500/40 px-5 py-4 hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-150 grid grid-cols-[24px_1fr] gap-3 items-center focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
              >
                <MessageSquare size={16} strokeWidth={1.8} aria-hidden="true" className="text-brass-400" />
                <div>
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
                    Form
                  </div>
                  <div className="font-stencil font-extrabold text-[14px] uppercase tracking-[.01em] leading-tight">
                    Contact Form →
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
