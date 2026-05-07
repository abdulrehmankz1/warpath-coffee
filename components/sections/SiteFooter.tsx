import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Coords } from "@/components/warpath/Coords";
import { Button } from "@/components/warpath/Button";
import { FooterSubscribe } from "@/components/warpath/FooterSubscribe";
import { AmmoStripe } from "@/components/warpath/AmmoStripe";
import {
  ABOUT,
  BRAND,
  FOOTER_COLS,
  formatReviewCount,
  REVIEW_TOTALS,
  SHIPPING,
} from "@/lib/data/warpath";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.099 1.893-4.785 4.659-4.785 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const PAYMENT_METHODS = [
  "Visa",
  "Mastercard",
  "Amex",
  "Discover",
  "PayPal",
  "Apple Pay",
  "Google Pay",
  "Shop Pay",
];

const TOTAL_REVIEWS = REVIEW_TOTALS.total;

export function SiteFooter() {
  return (
    <footer
      className="bg-combat-900 text-cream-50 mt-0 relative"
      aria-label="Footer"
    >

      {/* Free-ship band — high-contrast brass strip */}
      <div className="bg-brass-500 text-combat-900">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span className="inline-flex items-center gap-2 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.24em] uppercase">
            <Truck size={14} strokeWidth={2} aria-hidden="true" />
            Free USA shipping on orders ${SHIPPING.freeShippingThresholdUsd}+
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-combat-900" aria-hidden="true" />
          <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.24em] uppercase">
            Roasted to order · Ships in 48 hours
          </span>
        </div>
      </div>

      <AmmoStripe variant="brass" thin />

      {/* Newsletter — 15% off welcome offer */}
      <section
        aria-labelledby="footer-newsletter-heading"
        className="border-b border-brass-500/20"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 lg:py-16 grid lg:grid-cols-[1fr_minmax(0,520px)] items-center gap-8 lg:gap-12">
          <div>
            <div className="font-mono font-semibold text-[10px] tracking-[.32em] uppercase text-brass-400 mb-3">
              § Comms · Welcome Offer
            </div>
            <h3
              id="footer-newsletter-heading"
              className="font-display font-black uppercase text-[clamp(1.75rem,4vw,3rem)] tracking-[-.022em] leading-[1] text-cream-50"
            >
              15% off your first order.
              <br />
              <em className="not-italic text-brass-500 tracking-[-0.01em]">
                Drop your email.
              </em>
            </h3>
            <p className="mt-3 sm:mt-4 text-[16px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[52ch]">
              Be the first to hear about bold new blends, insider perks, and seasonal drops. One-time email · No spam · Unsubscribe anytime.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
              <Star size={11} strokeWidth={1.6} className="fill-brass-500 text-brass-500" aria-hidden="true" />
              ★ 4.9 · {formatReviewCount(TOTAL_REVIEWS)}+ verified reviews
            </div>
          </div>
          <div>
            <FooterSubscribe />
          </div>
        </div>
      </section>

      {/* Trust strip — 4 icons */}
      <section
        aria-label="Trust signals"
        className="border-b border-brass-500/10 bg-combat-900"
      >
        <ul className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-6 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          {[
            {
              icon: Award,
              k: "Veteran-Owned",
              v: "Founded by a Navy SEAL",
            },
            {
              icon: Truck,
              k: `Free Ship $${SHIPPING.freeShippingThresholdUsd}+`,
              v: "Roasted to order · USA",
            },
            {
              icon: ShieldCheck,
              k: "30-Day Guarantee",
              v: "Smooth or your money back",
            },
            {
              icon: RotateCcw,
              k: "Low-Acid Process",
              v: "Drink it black, no sugar",
            },
          ].map(({ icon: Icon, k, v }) => (
            <li key={k} className="flex items-start gap-3">
              <span className="shrink-0 w-9 h-9 inline-flex items-center justify-center border border-brass-500/40 bg-combat-800">
                <Icon size={14} strokeWidth={1.8} className="text-brass-400" aria-hidden="true" />
              </span>
              <div>
                <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
                  {k}
                </div>
                <div className="font-mono text-[10px] tracking-[.16em] uppercase text-cream-50/60 font-semibold">
                  {v}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Main grid — brand · links · contact */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 lg:py-16 grid lg:grid-cols-[1.2fr_2.4fr_1fr] gap-10 lg:gap-12">
        {/* Brand block */}
        <div>
          <Link
            href="/"
            aria-label="Warpath Coffee — home"
            className="inline-flex items-center mb-4 sm:mb-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          >
            <Image
              src="/logo.avif"
              alt="Warpath Coffee logo"
              width={96}
              height={96}
              className="h-16 w-16 sm:h-20 sm:w-20"
            />
          </Link>
          <p className="text-[16px] sm:text-[16px] leading-[1.65] text-cream-50/65 max-w-[40ch]">
            Custom-roasted coffee for anyone with standards. Family-operated by Navy
            SEAL combat veteran {BRAND.founderName}, with a team of military, first
            responders, and a {BRAND.roastmasterTenure}.
          </p>
          <div className="mt-6 sm:mt-7">
            <Coords
              tone="dark"
              items={[
                "USA-Roasted",
                `Free Ship $${SHIPPING.freeShippingThresholdUsd}+`,
                "Veteran-Owned",
                "Family-Operated",
              ]}
            />
          </div>

          {/* Social */}
          <ul className="mt-6 flex items-center gap-3" aria-label="Follow Us on Social">
            <li>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Warpath Coffee on Facebook"
                className="w-10 h-10 inline-flex items-center justify-center border border-brass-500/40 text-brass-400 hover:bg-brass-500 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors"
              >
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Warpath Coffee on X (Twitter)"
                className="w-10 h-10 inline-flex items-center justify-center border border-brass-500/40 text-brass-400 hover:bg-brass-500 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors font-mono font-bold text-sm"
              >
                X
              </a>
            </li>
            <li>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Warpath Coffee on Instagram"
                className="w-10 h-10 inline-flex items-center justify-center border border-brass-500/40 text-brass-400 hover:bg-brass-500 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors"
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>

        {/* Link cols — Coffee · Help · Policies */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {FOOTER_COLS.map((c) => (
            <div key={c.label}>
              <h3 className="font-mono font-bold text-[10px] tracking-[.24em] sm:tracking-[.28em] uppercase text-brass-400 pb-3 mb-3 sm:mb-4 border-b border-brass-500/20">
                {c.label}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {c.items.map((it) => (
                  <li key={it.h}>
                    <Link
                      href={it.h}
                      className="group inline-flex items-center gap-1 font-body text-[16px] sm:text-[15px] lg:text-[14px] text-cream-50/72 hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 motion-safe:transition-all motion-safe:duration-200"
                    >
                      <span
                        className="opacity-0 -ml-3 motion-safe:transition-all motion-safe:duration-200 motion-safe:group-hover:opacity-100 motion-safe:group-hover:ml-0 -translate-x-1 motion-safe:group-hover:translate-x-0 text-brass-500"
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      {it.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Direct contact card */}
        <aside
          aria-label="Direct contact"
          className="border border-brass-500/30 bg-combat-800/60 p-5 sm:p-6"
        >
          <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400 mb-3">
            § Standing By
          </div>
          <h3 className="font-display font-black text-[18px] sm:text-[20px] uppercase tracking-[.02em] leading-tight text-cream-50">
            Need a hand?
          </h3>
          <p className="mt-2 text-[16px] leading-[1.55] text-cream-50/60 max-w-[28ch]">
            We&rsquo;re ready and happy to help — most replies inside one business day.
          </p>
          <ul className="mt-4 grid gap-3">
            <li className="flex items-start gap-3">
              <Phone size={14} strokeWidth={1.8} className="text-brass-400 mt-1" aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-mono font-bold text-[9px] tracking-[.22em] uppercase text-brass-400">
                  Phone · Mon–Fri
                </div>
                <a
                  href={`tel:${ABOUT.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="font-display font-black text-[16px] sm:text-[16px] uppercase tracking-[.01em] text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150"
                >
                  {ABOUT.contact.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} strokeWidth={1.8} className="text-brass-400 mt-1" aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-mono font-bold text-[9px] tracking-[.22em] uppercase text-brass-400">
                  Email
                </div>
                <a
                  href={`mailto:${ABOUT.contact.email}`}
                  className="font-display font-black text-[16px] sm:text-[16px] uppercase tracking-[.01em] text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 break-all"
                >
                  {ABOUT.contact.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} strokeWidth={1.8} className="text-brass-400 mt-1" aria-hidden="true" />
              <div className="min-w-0">
                <div className="font-mono font-bold text-[9px] tracking-[.22em] uppercase text-brass-400">
                  Hours
                </div>
                <div className="font-display font-black text-[16px] sm:text-[16px] uppercase tracking-[.01em] text-cream-50">
                  09:00 – 17:00 MST
                </div>
              </div>
            </li>
          </ul>
          <div className="mt-5">
            <Button
              variant="ghost"
              size="sm"
              href="/contact"
              className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] w-full"
              data-event="footer_contact_cta"
            >
              Send a Message
              <ArrowRight size={12} strokeWidth={2} aria-hidden="true" className="ml-2" />
            </Button>
          </div>
        </aside>
      </div>

      {/* Payment methods strip */}
      <section
        aria-label="Accepted payment methods"
        className="border-t border-brass-500/20 bg-combat-800/40"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400">
            We Accept
          </div>
          <ul className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {PAYMENT_METHODS.map((m) => (
              <li
                key={m}
                className="border border-brass-500/30 bg-combat-900 px-2.5 py-1.5 font-mono font-bold text-[10px] tracking-[.16em] uppercase text-cream-50/72"
              >
                {m}
              </li>
            ))}
          </ul>
          <Link
            href="/billing-terms-and-conditions"
            className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400 hover:text-cream-50 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5"
          >
            Billing Terms →
          </Link>
        </div>
      </section>

      {/* Founder signoff */}
      <section className="border-t border-brass-500/10 bg-combat-900">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-5 sm:py-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center font-mono font-semibold text-[11px] tracking-[.18em] uppercase text-cream-50/60">
          <span>Run by</span>
          <span className="text-brass-400 font-bold">{BRAND.founderName}</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND.founderRole}</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND.roastmasterTenure}</span>
        </div>
      </section>

      {/* Bottom legal bar */}
      <div className="border-t border-brass-500/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-5 sm:py-6 flex flex-wrap justify-between gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] tracking-[.20em] sm:tracking-[.22em] uppercase text-cream-50/40 font-semibold">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{BRAND.copyright} · All Rights Reserved</span>
            <span aria-hidden="true">·</span>
            <span>
              Powered by{" "}
              <a
                href="https://op1776.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass-400 hover:text-cream-50 focus-visible:outline-1 focus-visible:outline-brass-500 motion-safe:transition-colors motion-safe:duration-150"
              >
                Operation 1776
              </a>
            </span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <Link
              href="/privacy-policy"
              className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500"
            >
              Terms
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
