import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/warpath/Button";
import { Coords } from "@/components/warpath/Coords";
import { BRAND, FOOTER_COLS, SHIPPING } from "@/lib/data/warpath";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.099 1.893-4.785 4.659-4.785 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export function SiteFooter() {
  return (
    <footer
      className="bg-combat-900 text-cream-50 mt-0"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Newsletter */}
      <div className="border-b border-brass-500/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 lg:py-12 grid lg:grid-cols-[1fr_auto] items-center gap-6 lg:gap-8">
          <div>
            <div className="font-mono font-semibold text-[10px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400 mb-3">
              Comms · Join the Roster
            </div>
            <h3 className="font-display font-black uppercase text-[clamp(1.5rem,3.5vw,2.5rem)] tracking-[-.018em] leading-[1] text-cream-50">
              Get the drops <em className="font-italic italic font-normal text-brass-500 normal-case">before they ship.</em>
            </h3>
          </div>
          <form
            action="/api/subscribe"
            method="post"
            className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto"
            data-event="footer_newsletter"
          >
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input
              id="footer-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="bg-combat-800 border border-brass-500/40 text-cream-50 placeholder:text-cream-50/40 px-4 sm:px-5 py-3 sm:py-4 font-mono text-sm w-full sm:min-w-[280px] focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
            />
            <Button variant="brass" size="base" href="#" opCode="OP-JOIN">
              Join the Roster →
            </Button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 lg:py-16 grid lg:grid-cols-[1.4fr_3fr] gap-10 lg:gap-12">
        {/* Brand block */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-4 sm:mb-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          >
            <Image src="/logo.avif" alt="Warpath Coffee logo" width={48} height={48} className="h-10 sm:h-12 w-auto" />
            <span className="font-display font-black text-xl sm:text-2xl uppercase leading-none text-cream-50">
              {BRAND.name.split(" ")[0]}
              <span className="block font-mono text-[9px] tracking-[.24em] sm:tracking-[.28em] mt-1 font-semibold text-brass-400">
                {BRAND.shortTag}
              </span>
            </span>
          </Link>
          <p className="text-[13px] sm:text-[14px] leading-[1.65] text-cream-50/65 max-w-[40ch]">
            Custom-roasted coffee for anyone with standards. Family-operated by
            Navy SEAL combat veteran {BRAND.founderName}, with a team of military,
            first responders, and a {BRAND.roastmasterTenure}.
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
          <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
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

        {/* Link cols */}
        <nav aria-label="Footer" className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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
                      className="group inline-flex items-center gap-1 font-body text-[13px] sm:text-[14px] text-cream-50/72 hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 motion-safe:transition-all motion-safe:duration-200"
                    >
                      <span className="opacity-0 -ml-3 motion-safe:transition-all motion-safe:duration-200 motion-safe:group-hover:opacity-100 motion-safe:group-hover:ml-0 motion-safe:group-hover:translate-x-0 -translate-x-1 text-brass-500" aria-hidden="true">›</span>
                      {it.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Legal */}
      <div className="border-t border-brass-500/20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-5 sm:py-6 flex flex-wrap justify-between gap-3 sm:gap-4 font-mono text-[9px] sm:text-[10px] tracking-[.20em] sm:tracking-[.22em] uppercase text-cream-50/40 font-semibold">
          <div>{BRAND.copyright} · All Rights Reserved</div>
          <div className="flex gap-4 sm:gap-5">
            <Link href="/privacy" className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500">Privacy</Link>
            <Link href="/terms" className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500">Terms</Link>
            <Link href="/accessibility" className="hover:text-brass-400 focus-visible:outline-1 focus-visible:outline-brass-500">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
