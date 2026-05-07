import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { Button } from "@/components/warpath/Button";
import { ProductCard } from "@/components/warpath/ProductCard";
import { POSTS } from "@/lib/data/blog";
import { BRAND, FLAGSHIP, SECONDARY } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "News & Brewing Tips · Field Notes from the Roastery",
  description:
    "Brew guides, recipes, maintenance, and buyer's guides from Warpath Coffee — written by founder Tej Gill and the roastery crew.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "News & Brewing Tips · Field Notes from the Roastery · Warpath Coffee",
    description:
      "Brew guides, recipes, maintenance — written by founder Tej Gill and the roastery crew.",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Warpath Coffee — News & Brewing Tips",
  url: "https://warpath.coffee/blogs",
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    datePublished: p.date,
    author: { "@type": "Person", name: p.author },
    image: `https://warpath.coffee${p.hero.src}`,
    url: `https://warpath.coffee/blogs/${p.slug}`,
  })),
};

export default function BlogIndexPage() {
  const [feature, ...rest] = POSTS;
  const upsells = [FLAGSHIP, SECONDARY];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
          </div>
        </div>

        {/* Hero */}
        <section
          aria-labelledby="news-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden"
        >
          <span
            className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-10 sm:py-14">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Field Notes
            </div>
            <h1
              id="news-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6vw,5rem)] text-cream-50"
            >
              News &amp; Brewing Tips
            </h1>
            <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
              Written by founder {BRAND.founderName} and the Warpath crew. Brew guides,
              maintenance routines, recipes, and buyer&rsquo;s guides &mdash; all
              field-tested.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400">
              <span>{POSTS.length} posts</span>
              <span aria-hidden="true">·</span>
              <span>By {BRAND.founderName}</span>
            </div>
          </div>
        </section>

        {/* Featured */}
        <section
          aria-labelledby="featured-heading"
          className="bg-bone-100 py-10 sm:py-14"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <h2 id="featured-heading" className="sr-only">
              Featured post
            </h2>
            <article className="border border-combat-900 bg-bone-50 grid lg:grid-cols-[6fr_6fr] overflow-hidden">
              <Link
                href={`/blogs/${feature.slug}`}
                className="relative aspect-[16/10] lg:aspect-auto bg-bone-200 border-b lg:border-b-0 lg:border-r border-combat-900 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brass-500"
                aria-label={`Read ${feature.title}`}
              >
                <Image
                  src={feature.hero.src}
                  alt={feature.hero.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 720px"
                  priority
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:hover:scale-[1.02]"
                />
                <span className="absolute top-4 left-4 inline-flex items-center bg-combat-900 text-brass-400 font-mono font-bold text-[10px] tracking-[.22em] uppercase px-2.5 py-1.5">
                  Latest Drop · {feature.category}
                </span>
              </Link>
              <div className="bg-combat-900 text-cream-50 p-6 sm:p-8 lg:p-10 flex flex-col">
                <div className="font-mono font-semibold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3 inline-flex items-center gap-3">
                  <span>By {feature.author}</span>
                  <span aria-hidden="true">·</span>
                  <span>{feature.dateLabel}</span>
                </div>
                <h3 className="font-display font-black uppercase leading-[1.05] tracking-[-0.022em] text-[clamp(1.875rem,3.6vw,2.75rem)] text-cream-50">
                  <Link
                    href={`/blogs/${feature.slug}`}
                    className="hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                  >
                    {feature.title}
                  </Link>
                </h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-cream-50/80 max-w-[52ch]">
                  {feature.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 font-mono font-bold text-[11px] tracking-[.22em] uppercase text-brass-400">
                  <Clock size={12} strokeWidth={1.8} aria-hidden="true" />
                  {feature.readMin} min read
                </div>
                <div className="mt-7">
                  <Button
                    variant="brass"
                    size="base"
                    href={`/blogs/${feature.slug}`}
                    opCode="POST-01"
                    data-event="blog_featured_cta"
                  >
                    Read the post
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Grid + sidebar */}
        <section
          aria-labelledby="more-posts-heading"
          className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-8 lg:gap-12 items-start">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                Recent Field Notes
              </div>
              <h2
                id="more-posts-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900 mb-8 sm:mb-10"
              >
                More from the roastery.
              </h2>
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                {rest.map((p) => (
                  <article
                    key={p.slug}
                    className="border border-combat-900 bg-bone-50 flex flex-col motion-safe:transition-shadow motion-safe:duration-300 motion-safe:hover:shadow-[0_14px_32px_rgba(11,14,12,0.18)]"
                  >
                    <Link
                      href={`/blogs/${p.slug}`}
                      className="relative aspect-[16/10] block bg-bone-200 border-b border-combat-900 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
                      aria-label={`Read ${p.title}`}
                    >
                      <Image
                        src={p.hero.src}
                        alt={p.hero.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:hover:scale-[1.03]"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center bg-combat-900 text-brass-400 font-mono font-bold text-[9px] tracking-[.22em] uppercase px-2 py-1">
                        {p.category}
                      </span>
                    </Link>
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="font-mono font-semibold text-[10px] tracking-[.22em] uppercase text-ash-600 mb-2 inline-flex items-center gap-2">
                        <span>{p.dateLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{p.readMin} min read</span>
                      </div>
                      <Link
                        href={`/blogs/${p.slug}`}
                        className="font-stencil font-extrabold text-[18px] sm:text-[19px] uppercase tracking-[.01em] leading-tight text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                      >
                        {p.title}
                      </Link>
                      <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.6] text-ash-700 line-clamp-3">
                        {p.excerpt}
                      </p>
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-canvas-300 mt-4">
                        <span className="font-mono font-semibold text-[11px] tracking-[.18em] uppercase text-brass-700">
                          By {p.author}
                        </span>
                        <Link
                          href={`/blogs/${p.slug}`}
                          className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar — newsletter + bestseller upsell */}
            <aside aria-label="Side rail" className="grid gap-5 lg:sticky lg:top-[88px]">
              <div className="border border-combat-900 bg-combat-900 text-cream-50 p-5 sm:p-6">
                <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                  Field Notes Newsletter
                </div>
                <h3 className="font-display font-black uppercase text-[clamp(1.4rem,2.6vw,1.875rem)] leading-[1] tracking-[-.02em] text-cream-50">
                  Get 15% off your first order.
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-cream-50/72">
                  Join the roster for new posts, brew tips, and seasonal drops &mdash; one email, no spam.
                </p>
                <div className="mt-4">
                  <Button
                    variant="brass"
                    size="base"
                    href="#footer-email"
                    opCode="OP-WELCOME"
                  >
                    Get the Discount
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
                  </Button>
                </div>
              </div>

              <div className="border border-combat-900 bg-bone-50 p-5 sm:p-6">
                <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
                  Read &amp; Brew
                </div>
                <h3 className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                  Pair your read with a bag.
                </h3>
                <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.6] text-ash-700">
                  Top-rated picks from the roastery.
                </p>
                <ul className="mt-4 grid gap-3">
                  {upsells.map((p) => (
                    <li key={p.slug}>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-combat-900 text-cream-50 py-14 sm:py-16">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6 text-center">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              § Stand The Watch
            </div>
            <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-cream-50">
              Brew it. Pour it. Drink it black.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-cream-50/72 max-w-[44ch] mx-auto">
              Free USA shipping on orders $85+. Roasted to order, dispatched within 48 hours.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="brass" size="lg" href="/shop" opCode="OP-SHOP">
                Shop the Roast
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                href="/subscribe"
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
              >
                Start Subscription
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
