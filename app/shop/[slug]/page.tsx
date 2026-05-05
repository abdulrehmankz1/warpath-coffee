import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { ProductCard } from "@/components/warpath/ProductCard";
import { PdpBuyBox } from "@/components/warpath/PdpBuyBox";
import {
  PRODUCTS,
  getProductBySlug,
  formatReviewCount,
} from "@/lib/data/warpath";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · Warpath Coffee`,
      description: product.description,
      images: [{ url: product.image, width: 800, height: 1000, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Cross-sell: 4 products from a different category
  const crossSell = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  ).slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Warpath Coffee" },
    image: [`https://warpath.coffee${product.image}`],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUsd.toFixed(2),
      availability: product.outOfStock
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
      url: `https://warpath.coffee/shop/${product.slug}`,
      seller: { "@type": "Organization", name: "Warpath Coffee" },
    },
    aggregateRating: product.reviews
      ? {
          "@type": "AggregateRating",
          ratingValue: (product.rating ?? 4.9).toString(),
          reviewCount: product.reviews.toString(),
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://warpath.coffee/shop" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://warpath.coffee/shop/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Breadcrumb band */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: product.name },
              ]}
            />
          </div>
        </div>

        {/* Product hero — image left, buy box right */}
        <section
          aria-labelledby="product-name"
          className="bg-bone-100 py-10 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[5fr_7fr] gap-8 sm:gap-10 lg:gap-14">
            {/* Image column */}
            <div className="relative">
              <div className="relative aspect-[4/5] max-w-[520px] mx-auto border border-combat-900 overflow-hidden bg-bone-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  priority
                  className="object-cover object-center"
                />
                {(product.badge || product.outOfStock) && (
                  <span
                    className={`absolute top-4 left-4 inline-flex items-center font-mono font-bold text-[10px] tracking-[.22em] uppercase px-2.5 py-1.5 ${
                      product.outOfStock
                        ? "bg-brass-700 text-cream-50"
                        : "bg-combat-900 text-brass-400"
                    }`}
                  >
                    {product.outOfStock ? "Sold Out" : product.badge}
                  </span>
                )}
                {/* Brand corner registration brackets */}
                <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-brass-500" aria-hidden="true" />
              </div>
            </div>

            {/* Buy box (client component) */}
            <div>
              <span id="product-name" className="sr-only">
                {product.name}
              </span>
              <PdpBuyBox product={product} />
            </div>
          </div>
        </section>

        {/* Tasting notes / specs / brew guide */}
        {(product.notes || product.specs) && (
          <section
            aria-labelledby="notes-heading"
            className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
              <div className="border border-combat-900 bg-bone-50">
                <div className="bg-combat-900 text-brass-500 px-5 py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase">
                  Tasting Notes · {product.slug.toUpperCase().slice(0, 28)}
                </div>
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-canvas-300">
                  {/* Specs */}
                  {product.specs && (
                    <div className="p-5 sm:p-6">
                      <h2
                        id="notes-heading"
                        className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700 mb-4"
                      >
                        Roast Specs
                      </h2>
                      <dl className="grid grid-cols-2 gap-y-3 gap-x-4">
                        {Object.entries(product.specs).map(([k, v]) => (
                          <div key={k}>
                            <dt className="font-mono text-[9px] tracking-[.20em] uppercase text-ash-500 font-semibold">
                              {k}
                            </dt>
                            <dd className="mt-1 font-stencil font-extrabold text-[14px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                              {v}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                  {/* Notes */}
                  {product.notes && (
                    <div className="p-5 sm:p-6">
                      <h3 className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700 mb-4">
                        Tasting Notes
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {product.notes.map((n) => (
                          <li
                            key={n}
                            className="inline-flex items-center bg-brass-500 text-combat-900 px-3 py-1.5 font-stencil font-extrabold text-[13px] uppercase tracking-[.02em]"
                          >
                            {n}
                          </li>
                        ))}
                      </ul>
                      {product.description && (
                        <p className="mt-4 text-[14px] leading-[1.6] text-ash-700">
                          {product.description}
                        </p>
                      )}
                    </div>
                  )}
                  {/* Brew guides */}
                  <div className="p-5 sm:p-6">
                    <h3 className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700 mb-4">
                      Brew Guides
                    </h3>
                    <ul className="grid gap-3">
                      {[
                        { method: "French Press", grind: "Coarse" },
                        { method: "Drip", grind: "Medium" },
                        { method: "Pour-Over", grind: "Medium-Fine" },
                      ].map((b) => (
                        <li
                          key={b.method}
                          className="flex items-center justify-between gap-3 border border-canvas-300 px-3 py-2"
                        >
                          <span className="font-mono font-bold text-[11px] tracking-[.18em] uppercase text-combat-900">
                            {b.method}
                          </span>
                          <span className="font-mono text-[10px] tracking-[.20em] uppercase text-ash-600 font-semibold">
                            {b.grind}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cross-sell */}
        {crossSell.length > 0 && (
          <section
            aria-labelledby="cross-sell-heading"
            className="bg-bone-100 py-12 sm:py-16 lg:py-20"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
              <div className="mb-8 sm:mb-10">
                <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                  Pairs Well With
                </div>
                <h2
                  id="cross-sell-heading"
                  className="font-display font-black uppercase leading-[1.0] tracking-[-0.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900"
                >
                  Deploy the full kit.
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {crossSell.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews stub — links to homepage reviews carousel */}
        <section
          id="reviews"
          aria-labelledby="reviews-heading"
          className="bg-combat-900 text-cream-50 py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-8 lg:gap-12 items-end">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                Field Reports
              </div>
              <h2
                id="reviews-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-0.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50"
              >
                Verified buyers, real cups.
              </h2>
              {product.reviews && (
                <p className="mt-4 max-w-[58ch] text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72">
                  {formatReviewCount(product.reviews)} verified reviews on this SKU. Average rating {(product.rating ?? 4.9).toFixed(1)} stars. Read all reviews on the home page Field Reports section.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
