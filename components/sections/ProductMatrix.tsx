import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { Button } from "@/components/warpath/Button";
import {
  PRODUCTS,
  formatUsd,
  formatReviewCount,
} from "@/lib/data/warpath";

const featured = PRODUCTS[0]; // Mariner's Blend
const grid = PRODUCTS.slice(1); // Breakfast, Decaf, K-Cups, Italian Frogman, MK4 Mug

export function ProductMatrix() {
  return (
    <section
      aria-labelledby="matrix-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <div className="flex justify-between items-end gap-6 flex-wrap mb-10 lg:mb-12">
          <SectionHeader
            eyebrow="The Arsenal"
            sec="§ SHOP"
            title={
              <span id="matrix-headline">
                Every roast,{" "}
                <em className="font-italic italic font-normal text-brass-500 normal-case">
                  one mission.
                </em>
              </span>
            }
            desc="Smooth, low-acid coffee — blends, decaf, K-cups, and gear. Pick your weapon, deploy when ready."
            className="!mb-0"
          />
          <Link
            href="/shop"
            className="font-mono font-bold text-[11px] tracking-[.20em] sm:tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-500 inline-flex items-center gap-2 mb-1 sm:mb-2 group"
            data-event="matrix_view_all"
          >
            <span className="wp-link-underline">Shop the full lineup</span>
            <ArrowUpRight
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Featured + grid layout */}
        <div className="grid lg:grid-cols-[5fr_7fr] gap-6 lg:gap-7">
          {/* Featured product card */}
          <Link
            href={featured.href}
            data-event="matrix_featured"
            data-event-product={featured.slug}
            className="group relative bg-combat-900 text-cream-50 border border-combat-900 overflow-hidden flex flex-col motion-safe:transition-shadow motion-safe:duration-500 motion-safe:hover:shadow-[0_24px_48px_rgba(11,14,12,0.30)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
          >
            {/* Image — top half */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[360px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,14,12,.15) 0%, rgba(11,14,12,.45) 70%, rgba(11,14,12,.85) 100%)",
                }}
                aria-hidden="true"
              />
              {featured.badge && (
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-1.5 bg-brass-500 text-combat-900 px-3 py-1.5 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase">
                  <span className="w-1.5 h-1.5 bg-combat-900 rounded-full" aria-hidden="true" />
                  {featured.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-5 sm:p-7 lg:p-8 grid gap-4 sm:gap-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.24em] uppercase text-brass-400">
                  Flagship · Dark Roast
                </span>
                {featured.reviews && (
                  <span
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-brass-400 font-bold"
                    aria-label={`${featured.rating ?? 4.9} out of 5, ${formatReviewCount(featured.reviews)} reviews`}
                  >
                    <Star size={13} strokeWidth={1.4} className="fill-brass-500 text-brass-500" aria-hidden="true" />
                    {featured.rating ?? 4.9} · {formatReviewCount(featured.reviews)} reviews
                  </span>
                )}
              </div>
              <h3 className="font-stencil font-black uppercase text-[clamp(1.5rem,3vw,2.4rem)] leading-[0.98] tracking-[-0.012em]">
                {featured.name}
              </h3>
              <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-cream-50/72 max-w-[52ch]">
                {featured.description}
              </p>
              <div className="flex items-center justify-between gap-4 pt-3 sm:pt-4 border-t border-brass-500/25 flex-wrap">
                <div className="font-stencil font-black text-[28px] sm:text-[32px] text-brass-500 leading-none tracking-[0.01em]">
                  {formatUsd(featured.priceUsd)}
                  <span className="ml-2 font-mono text-[10px] tracking-[.18em] uppercase text-cream-50/55 font-semibold">
                    · 12oz
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 font-mono font-bold text-[11px] tracking-[.22em] uppercase text-brass-400 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1">
                  Shop now
                  <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>

          {/* Grid of 5 product cards (2x2 on lg → 1 + 4 stacked) */}
          <ul className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 auto-rows-fr">
            {grid.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.href}
                  data-event="matrix_tile"
                  data-event-product={p.slug}
                  className="group relative h-full bg-bone-50 border border-combat-900 overflow-hidden flex flex-col motion-safe:transition-[transform,box-shadow] motion-safe:duration-400 motion-safe:hover:-translate-y-[3px] motion-safe:hover:shadow-[0_18px_32px_rgba(11,14,12,0.18)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                >
                  {/* Image */}
                  <div className="relative aspect-[5/4] overflow-hidden bg-bone-200">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[700ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.08]"
                    />
                    {p.badge && (
                      <span
                        className={`absolute top-3 left-3 inline-flex items-center font-mono font-bold text-[9px] tracking-[.20em] uppercase px-2 py-1 ${
                          p.outOfStock
                            ? "bg-alert-red text-bone-50"
                            : "bg-combat-900 text-brass-400"
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                    <div className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-700">
                      {p.category.toUpperCase()}
                    </div>
                    <h3 className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[0.01em] text-combat-900 leading-tight line-clamp-2 min-h-[2.4em]">
                      {p.name}
                    </h3>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-3 border-t border-canvas-300">
                      <div>
                        <div className="font-stencil font-black text-[18px] sm:text-[20px] text-combat-900 leading-none tracking-[0.01em]">
                          {formatUsd(p.priceUsd)}
                        </div>
                        {p.reviews ? (
                          <div className="mt-1 font-mono text-[9px] tracking-[.18em] uppercase text-ash-600 font-semibold inline-flex items-center gap-1">
                            <Star size={10} strokeWidth={1.4} className="fill-brass-500 text-brass-500" aria-hidden="true" />
                            {formatReviewCount(p.reviews)}
                          </div>
                        ) : (
                          <div className="mt-1 font-mono text-[9px] tracking-[.18em] uppercase text-ash-500 font-semibold">
                            New
                          </div>
                        )}
                      </div>
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-combat-900 text-brass-400 motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:bg-brass-500 motion-safe:group-hover:text-combat-900 motion-safe:group-hover:rotate-[-12deg]"
                        aria-hidden="true"
                      >
                        <ArrowUpRight size={15} strokeWidth={1.8} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom action row */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid sm:grid-cols-[1fr_auto] items-center gap-5 border-t border-combat-900/15 pt-8 sm:pt-10">
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-ash-600 font-semibold">
            {PRODUCTS.length}+ SKUs · Coffee · Drinkware · Apparel · Limited Drops
          </p>
          <Button
            variant="brass"
            size="base"
            href="/shop"
            opCode="OP-SHOP"
            data-event="matrix_shop_cta"
          >
            Shop All Products →
          </Button>
        </div>
      </div>
    </section>
  );
}
