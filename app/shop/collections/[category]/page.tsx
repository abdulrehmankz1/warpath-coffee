import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  SHIPPING,
  type ProductCategory,
} from "@/lib/data/warpath";

type CollectionMeta = {
  category: ProductCategory;
  title: string;
  eyebrow: string;
  copy: string;
};

const COLLECTIONS: Record<string, CollectionMeta> = {
  coffee: {
    category: "coffee",
    title: "Roasted Coffee",
    eyebrow: "Whole Bean & Ground",
    copy: "Smooth, low-acid roasts and seasonal flavored blends. Roasted to order in the USA.",
  },
  decaf: {
    category: "decaf",
    title: "Decaf",
    eyebrow: "All flavor, no buzz",
    copy: "Swiss Water-processed decaf — same Warpath roast curve, none of the caffeine.",
  },
  "k-cups": {
    category: "k-cups",
    title: "K-Cups",
    eyebrow: "Keurig-Compatible",
    copy: "Maybe you prefer to make your coffee with a Keurig. No problem — same roast, same smooth-as-silk pour. 42 pods per box.",
  },
  drinkware: {
    category: "drinkware",
    title: "Mugs & Drinkware",
    eyebrow: "Heavy-duty ceramic & insulated",
    copy: "Mugs, tumblers, and the kit you stand a watch with. Built for the morning briefing.",
  },
  "gift-card": {
    category: "gift-card",
    title: "Gift Cards",
    eyebrow: "Digital · Instant Delivery",
    copy: "Give the gift of really good coffee. Redeemable on any Warpath product. From $20.",
  },
};

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ sort?: string }>;

export function generateStaticParams() {
  return Object.keys(COLLECTIONS).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = COLLECTIONS[category];
  if (!meta) return { title: "Collection Not Found" };
  return {
    title: meta.title,
    description: meta.copy,
    openGraph: {
      title: `${meta.title} · Warpath Coffee`,
      description: meta.copy,
    },
  };
}

export default async function CategoryCollectionPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const meta = COLLECTIONS[category];
  if (!meta) notFound();

  const sort = sp.sort ?? "best-sellers";
  const products = filterAndSort(PRODUCTS, {
    category: meta.category,
    sort,
  });
  const totalReviews = products.reduce((s, p) => s + (p.reviews ?? 0), 0);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://warpath.coffee/shop" },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: `https://warpath.coffee/shop/collections/${category}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Hero */}
        <section
          aria-labelledby="collection-heading"
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
                  { label: "Shop", href: "/shop" },
                  { label: meta.title },
                ]}
                className="mb-4 sm:mb-5"
              />
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                {meta.eyebrow}
              </div>
              <h1
                id="collection-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,5rem)] text-cream-50"
              >
                {meta.title}
              </h1>
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
                {meta.copy}
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

        {/* Filters */}
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
                  Nothing in this collection yet
                </div>
                <h2 className="font-display font-black text-[clamp(1.5rem,3vw,2.25rem)] leading-[1] tracking-[-.018em] uppercase text-combat-900">
                  Browse the full arsenal.
                </h2>
                <div className="mt-6 flex justify-center">
                  <Button variant="brass" size="base" href="/shop" opCode="OP-SHOP">
                    See All Products
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {products.map((p, i) => (
                  <ProductCard key={p.slug} product={p} priority={i < 4} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
