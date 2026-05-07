import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { CheckoutForm } from "@/components/warpath/CheckoutForm";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { AmmoStripe } from "@/components/warpath/AmmoStripe";
import { BRAND } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description:
    "Secure 256-bit SSL checkout. Free USA shipping on orders over $85. 30-day guarantee.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <>
      <header className="bg-combat-900 text-cream-50 border-b border-brass-500/30">
        <AmmoStripe thin />
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] h-[64px] sm:h-[72px] flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
            aria-label={`${BRAND.name} home`}
          >
            <Image
              src="/logo.avif"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display font-black text-[18px] sm:text-[22px] uppercase leading-none tracking-[-0.01em]">
              {BRAND.name.split(" ")[0]}
              <span className="block font-mono text-[8px] sm:text-[9px] tracking-[.24em] sm:tracking-[.28em] mt-0.5 font-semibold text-brass-400">
                {BRAND.shortTag}
              </span>
            </span>
          </Link>
          <span className="inline-flex items-center gap-2 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-400">
            <Lock size={13} strokeWidth={2} aria-hidden="true" />
            Secure Checkout
          </span>
        </div>
      </header>
      <main id="main" className="flex-1 flex flex-col bg-bone-100">
        {/* Breadcrumbs */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Cart", href: "/cart" },
                { label: "Checkout" },
              ]}
            />
          </div>
        </div>

        {/* Hero band */}
        <section
          aria-labelledby="checkout-heading"
          className="bg-bone-200 border-b border-canvas-300"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-8 sm:py-10">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
              § Final Sortie
            </div>
            <h1
              id="checkout-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2rem,5vw,3.75rem)] text-combat-900"
            >
              Checkout
            </h1>
            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-[1.6] text-ash-700 max-w-[58ch]">
              Lock in your details, pick a shipping method, and place your order. We&rsquo;ll roast and dispatch within 48 hours.
            </p>
          </div>
        </section>

        {/* Form body */}
        <section className="bg-bone-100 py-10 sm:py-14 flex-1">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <CheckoutForm />
          </div>
        </section>

        {/* Trust band */}
        <section className="bg-combat-900 text-cream-50 border-t border-brass-500/20 py-8">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
            <span className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              Secure 256-bit SSL
            </span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              30-Day Guarantee
            </span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              Veteran-Owned
            </span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              Roasted in the USA
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
