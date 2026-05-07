import type { Metadata } from "next";
import Link from "next/link";
import { Compass, MapPinOff, Radio } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Button } from "@/components/warpath/Button";

export const metadata: Metadata = {
  title: "404 · Off-Grid",
  description:
    "The coordinates you requested don't exist on our map. Re-route to home base, the shop, or signal support.",
  robots: { index: false, follow: false },
};

const POPULAR_DESTINATIONS = [
  {
    code: "01",
    label: "Browse the Arsenal",
    href: "/shop",
    body: "Full lineup of dark roasts, blends, and drinkware.",
  },
  {
    code: "02",
    label: "Subscribe & Save",
    href: "/subscribe",
    body: "Lock in fresh coffee on your schedule. Pause by SMS.",
  },
  {
    code: "03",
    label: "Our Story",
    href: "/about",
    body: "Built by a Navy SEAL combat veteran. Roasted with intent.",
  },
  {
    code: "04",
    label: "Contact Support",
    href: "/contact",
    body: "Stand-by operators ready to triage your question.",
  },
];

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <section className="bg-bone-100 py-10 sm:py-14 lg:py-16 flex-1">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-start">
              {/* Primary panel */}
              <div className="border border-combat-900 bg-bone-50">
                <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-4 flex items-center gap-3 border-b border-brass-500/30">
                  <MapPinOff
                    size={20}
                    strokeWidth={1.8}
                    className="text-alert-red"
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-alert-red">
                      Status · 404 · Off-Grid
                    </div>
                    <div className="font-mono text-[11px] tracking-[.16em] uppercase text-cream-50/80 font-semibold mt-0.5">
                      Reference OP-NO-FIX
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                  <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                    Coordinates Unverified
                  </div>
                  <h1 className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.25rem,6vw,4.25rem)] text-combat-900">
                    This position
                    <br />
                    <span className="text-brass-700">isn&rsquo;t on the map.</span>
                  </h1>
                  <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-ash-700 max-w-[58ch]">
                    The page you tried to hit has either been moved, retired, or
                    never existed in the first place. Don&rsquo;t worry &mdash; we&rsquo;ll
                    re-route you to friendly territory.
                  </p>

                  {/* Diagnostic strip */}
                  <dl className="mt-6 sm:mt-8 grid sm:grid-cols-3 gap-px bg-canvas-300 border border-canvas-300">
                    <div className="bg-bone-50 p-4 sm:p-5">
                      <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                        Error Code
                      </dt>
                      <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight tabular-nums">
                        404
                      </dd>
                    </div>
                    <div className="bg-bone-50 p-4 sm:p-5">
                      <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                        Signal
                      </dt>
                      <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                        Not Found
                      </dd>
                    </div>
                    <div className="bg-bone-50 p-4 sm:p-5">
                      <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                        Mission
                      </dt>
                      <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                        Re-Route
                      </dd>
                    </div>
                  </dl>

                  {/* CTAs */}
                  <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
                    <Button variant="brass" size="base" href="/" opCode="OP-HOME">
                      Back to Base
                    </Button>
                    <Button variant="ghost" size="base" href="/shop">
                      Browse the Arsenal &rarr;
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar — popular destinations + radio support */}
              <aside
                aria-label="Where to go next"
                className="grid gap-4 sm:gap-6 lg:sticky lg:top-[88px]"
              >
                <div className="border border-combat-900 bg-bone-50 p-5 sm:p-6">
                  <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3 inline-flex items-center gap-2">
                    <Compass size={14} strokeWidth={1.8} aria-hidden="true" />
                    Popular Destinations
                  </div>
                  <ul className="grid gap-2.5">
                    {POPULAR_DESTINATIONS.map(({ code, label, href, body }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="grid grid-cols-[auto_1fr] gap-3 items-start border border-canvas-300 bg-bone-100 px-4 py-3 hover:border-combat-900 hover:bg-bone-50 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                        >
                          <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 pt-0.5">
                            {code}
                          </span>
                          <span>
                            <span className="block font-stencil font-extrabold text-[14px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                              {label} &rarr;
                            </span>
                            <span className="block font-mono text-[11px] tracking-[.04em] text-ash-700 mt-0.5 normal-case">
                              {body}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-combat-900 bg-combat-900 text-cream-50 p-5 sm:p-6">
                  <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3 inline-flex items-center gap-2">
                    <Radio size={14} strokeWidth={1.8} aria-hidden="true" />
                    Lost? Radio In.
                  </div>
                  <h2 className="font-display font-black uppercase text-[clamp(1.4rem,2.6vw,1.875rem)] leading-[1] tracking-[-.02em]">
                    Can&rsquo;t find what you came for?
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.6] text-cream-50/72">
                    Tell us what you were looking for and we&rsquo;ll point you in the
                    right direction.
                  </p>
                  <div className="mt-4">
                    <Button variant="brass" size="base" href="/contact" opCode="OP-COMMS">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
