import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { ProductCard } from "@/components/warpath/ProductCard";
import { CartView } from "@/components/warpath/CartView";
import { PRODUCTS } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the bags and gear in your cart. Free USA shipping on orders over $85. 30-day guarantee.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  // Quick-pick recommendations: top 4 best-sellers
  const recommended = [...PRODUCTS]
    .filter((p) => !p.outOfStock)
    .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 4);

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Cart" },
              ]}
            />
          </div>
        </div>

        {/* Hero band */}
        <section
          aria-labelledby="cart-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
          <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 sm:py-14">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Field Pack
            </div>
            <h1
              id="cart-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,4.5rem)] text-cream-50"
            >
              Your Cart
            </h1>
            <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
              Review your items, lock in your roast, and head to checkout. Free USA shipping kicks in at $85.
            </p>
          </div>
        </section>

        {/* Cart body */}
        <section className="bg-bone-100 py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <CartView />
          </div>
        </section>

        {/* Recommended */}
        <section
          aria-labelledby="recommended-heading"
          className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <div className="mb-8 sm:mb-10">
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                Stack the Bag
              </div>
              <h2
                id="recommended-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900"
              >
                You might also like.
              </h2>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-ash-700 max-w-[58ch]">
                Top-rated picks from the roastery. Add another bag and unlock free shipping faster.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {recommended.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
