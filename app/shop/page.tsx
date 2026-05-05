import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ProductCard } from "@/components/warpath/ProductCard";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { ShopFilters } from "@/components/warpath/ShopFilters";
import { Button } from "@/components/warpath/Button";
import {
  PRODUCTS,
  filterAndSort,
  formatReviewCount,
  FLAGSHIP,
  SECONDARY,
  SHIPPING,
} from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Shop All Coffee & Gear",
  description:
    "Browse 25 SKUs — dark roasts, breakfast blends, decaf, K-Cups, drinkware, and limited drops. Veteran-owned. Free USA shipping on orders $85+.",
  openGraph: {
    title: "Shop All Coffee & Gear · Warpath Coffee",
    description:
      "Browse 25 SKUs — dark roasts, breakfast blends, decaf, K-Cups, drinkware, and limited drops.",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Warpath Coffee — Full Arsenal",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://warpath.coffee/shop/${p.slug}`,
    name: p.name,
    image: p.image,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee" },
    { "@type": "ListItem", position: 2, name: "Shop", item: "https://warpath.coffee/shop" },
  ],
};

type SearchParams = Promise<{
  category?: string;
  sort?: string;
}>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const category = sp.category ?? "all";
  const sort = sp.sort ?? "best-sellers";
  const products = filterAndSort(PRODUCTS, { category, sort });
  const totalReviews =
    (FLAGSHIP.reviews ?? 0) + (SECONDARY.reviews ?? 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Hero band */}
        <section
          aria-labelledby="shop-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 80% 20%, rgba(196,154,72,.10), transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(74,46,30,.18), transparent 50%)",
            }}
            aria-hidden="true"
          />
          <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 sm:py-14 lg:py-16 grid lg:grid-cols-[8fr_4fr] gap-6 lg:gap-12 items-end">
            <div>
              <Breadcrumbs
                tone="dark"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Shop" },
                ]}
                className="mb-4 sm:mb-5"
              />
              <h1
                id="shop-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,5rem)] text-cream-50"
              >
                The Full Arsenal
              </h1>
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
                {PRODUCTS.length} SKUs — smooth, low-acid roasts, K-Cups, drinkware, and limited drops. Deployed fresh from our roastery.
              </p>
            </div>
            <aside className="border border-brass-500/30 bg-combat-800/60 px-4 sm:px-5 py-4 sm:py-5">
              <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400 mb-2">
                Trust Signal
              </div>
              <div className="font-stencil font-black text-[clamp(1.5rem,2.6vw,2rem)] leading-none text-brass-500">
                ★ 4.9
              </div>
              <div className="mt-2 font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-cream-50/70 font-semibold">
                {formatReviewCount(totalReviews)}+ Verified · Free Ship ${SHIPPING.freeShippingThresholdUsd}+
              </div>
            </aside>
          </div>
        </section>

        {/* Filters bar */}
        <ShopFilters resultsCount={products.length} />

        {/* Grid */}
        <section
          aria-label="Product grid"
          className="bg-bone-100 py-10 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            {products.length === 0 ? (
              <div className="border border-combat-900 bg-bone-50 py-16 px-6 text-center max-w-[680px] mx-auto">
                <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
                  No Products Match These Filters
                </div>
                <h2 className="font-display font-black text-[clamp(1.5rem,3vw,2.25rem)] leading-[1] tracking-[-.018em] uppercase text-combat-900">
                  Clear your filters.
                </h2>
                <p className="mt-3 text-[14px] sm:text-[15px] text-ash-700 leading-[1.6] max-w-[44ch] mx-auto">
                  We carry {PRODUCTS.length} SKUs — try browsing All, or drop to one category at a time.
                </p>
                <div className="mt-6 flex justify-center">
                  <Button variant="ghost" size="base" href="/shop">
                    Clear Filters →
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bottom band — subscribe nudge + FAQ teaser */}
        <section className="bg-combat-900 text-cream-50 py-14 sm:py-16 lg:py-20 border-t border-brass-500/20">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-8 lg:gap-12 items-center">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                Subscribe & Save
              </div>
              <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50">
                Auto-deliver. Never run dry.
              </h2>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
                Pause or swap by SMS. No lock-in. Pick a roast, pick a cadence, we deliver — fresh, on schedule.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Button
                variant="brass"
                size="lg"
                href="/subscribe"
                opCode="OP-SUB"
                data-event="shop_subscribe_cta"
              >
                Start Subscription
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-bone-200 py-10 sm:py-12 border-t border-combat-900">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-6 items-center">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700">
                Common Questions
              </span>
              {[
                { l: "Shipping", h: "/shipping-policy" },
                { l: "Grinding", h: "/faq#grinding" },
                { l: "Returns", h: "/returns-refunds-policy" },
              ].map((q) => (
                <Link
                  key={q.l}
                  href={q.h}
                  className="font-mono font-bold text-[11px] tracking-[.20em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                >
                  {q.l} →
                </Link>
              ))}
            </div>
            <div className="lg:justify-self-end">
              <Button variant="ghost" size="base" href="/faq">
                Browse All FAQs →
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
