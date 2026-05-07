import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "@/components/warpath/Breadcrumbs";
import { Button } from "@/components/warpath/Button";
import { ProductCard } from "@/components/warpath/ProductCard";
import { PostBody, buildToc } from "@/components/warpath/PostBody";
import { ShareRail } from "@/components/warpath/ShareRail";
import { ReadingProgress } from "@/components/warpath/ReadingProgress";
import { InContentProductCta } from "@/components/warpath/InContentProductCta";
import { POSTS, getPostBySlug, relatedPosts } from "@/lib/data/blog";
import { BRAND, FLAGSHIP, SECONDARY, PRODUCTS } from "@/lib/data/warpath";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.hero.src, width: 1200, height: 1200, alt: post.hero.alt }],
      authors: [post.author],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.hero.src],
    },
  };
}

const inContentProductFor = (slug: string) => {
  switch (slug) {
    case "campfire-coffee-techniques":
      return PRODUCTS.find((p) => p.slug === "italian-frogman-espresso") ?? FLAGSHIP;
    case "how-to-clean-your-keurig":
      return PRODUCTS.find((p) => p.slug === "k-cups-mariners-blend-dark-roast") ?? FLAGSHIP;
    case "protein-packed-coffee-smoothie":
      return SECONDARY;
    case "how-to-order-coffee-online":
    default:
      return FLAGSHIP;
  }
};

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? POSTS[idx - 1] : null;
  const next = idx >= 0 && idx < POSTS.length - 1 ? POSTS[idx + 1] : null;
  const related = relatedPosts(slug, 3);
  const featuredProduct = inContentProductFor(slug);

  // Compute a split-point AFTER the second h2 so we can inject an in-content
  // product CTA mid-article without breaking the body renderer.
  const splitIndex = (() => {
    let h2Count = 0;
    for (let i = 0; i < post.body.length; i++) {
      const n = post.body[i];
      if (n.type === "heading" && n.level === 2) {
        h2Count++;
        if (h2Count === 2) return i; // split BEFORE this h2 so the CTA appears just before the section
      }
    }
    return Math.min(6, post.body.length); // fallback
  })();
  const bodyHead = post.body.slice(0, splitIndex);
  const bodyTail = post.body.slice(splitIndex);

  const canonical = `https://warpath.coffee/blogs/${post.slug}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://warpath.coffee${post.hero.src}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: { "@type": "ImageObject", url: "https://warpath.coffee/logo.avif" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee" },
      { "@type": "ListItem", position: 2, name: "News", item: "https://warpath.coffee/blogs" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <ReadingProgress targetId={`article-${post.slug}`} />

      <main id="main" className="flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "News", href: "/blogs" },
                { label: post.title },
              ]}
            />
          </div>
        </div>

        {/* Article hero */}
        <article id={`article-${post.slug}`}>
          <header className="bg-combat-900 text-cream-50 relative overflow-hidden">
            <span
              className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 sm:py-16">
              <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.32em] uppercase text-brass-500 mb-3 sm:mb-4 inline-flex items-center gap-3">
                <span>§ {post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.dateLabel}</span>
              </div>
              <h1 className="font-display font-black uppercase leading-[1.05] tracking-[-0.025em] text-[clamp(2rem,5vw,4rem)] text-cream-50 max-w-[24ch]">
                {post.title}
              </h1>
              <p className="mt-5 text-[15px] sm:text-[17px] leading-[1.6] text-cream-50/80 max-w-[60ch]">
                {post.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono font-bold text-[11px] tracking-[.22em] uppercase text-brass-400">
                <span>By {post.author}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={12} strokeWidth={1.8} aria-hidden="true" />
                  {post.readMin} min read
                </span>
              </div>
            </div>
          </header>

          {/* Hero image */}
          <div className="bg-bone-100 border-b border-canvas-300">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12 lg:px-[90px] -mt-8 sm:-mt-12 lg:-mt-16 pb-10 sm:pb-12">
              <div className="relative aspect-[16/9] border border-combat-900 bg-bone-200 overflow-hidden shadow-[0_24px_48px_rgba(11,14,12,.18)]">
                <Image
                  src={post.hero.src}
                  alt={post.hero.alt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  priority
                  className="object-cover object-center"
                />
                <span className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-brass-500" aria-hidden="true" />
                <span className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-brass-500" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Body grid */}
          <div className="bg-bone-100 pb-10 sm:pb-14">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[3fr_8fr] gap-8 lg:gap-12 items-start">
              {/* Sidebar — TOC + share */}
              <aside aria-label="Article sidebar" className="lg:sticky lg:top-[88px] grid gap-5">
                {toc.length > 0 && (
                  <nav
                    aria-label="On this page"
                    className="border border-combat-900 bg-bone-50"
                  >
                    <div className="bg-combat-900 text-cream-50 px-4 py-2.5 font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
                      On This Page
                    </div>
                    <ol className="p-4 grid gap-2.5">
                      {toc.map((t, i) => (
                        <li key={t.id}>
                          <Link
                            href={`#${t.id}`}
                            className={`font-mono font-bold text-[11px] tracking-[.16em] uppercase hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 ${
                              t.level === 3 ? "ml-3 text-ash-700" : "text-combat-900"
                            }`}
                          >
                            {t.level === 2 && (
                              <span className="font-mono text-[10px] tracking-[.20em] text-brass-700 tabular-nums">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            )}
                            <span className="line-clamp-2">{t.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <ShareRail url={canonical} title={post.title} />

                {/* Author card */}
                <div className="border border-combat-900 bg-combat-900 text-cream-50 p-5">
                  <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-500 mb-2">
                    Author
                  </div>
                  <div className="font-stencil font-extrabold text-[16px] uppercase tracking-[.02em] text-cream-50 leading-tight">
                    {post.author}
                  </div>
                  <div className="mt-1 font-mono text-[11px] tracking-[.16em] uppercase text-brass-400 font-semibold">
                    Founder · Navy SEAL
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.6] text-cream-50/72">
                    Family-operated, family-roasted. {post.author} runs Warpath alongside a 30-year coffee professional.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/about"
                      className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-brass-400 hover:text-cream-50 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5"
                    >
                      Read Our Story →
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Article body */}
              <div className="min-w-0">
                <PostBody body={bodyHead} />
                <InContentProductCta product={featuredProduct} />
                <PostBody body={bodyTail} />

                {/* End-of-article CTA */}
                <div className="mt-12 border border-combat-900 bg-combat-900 text-cream-50 p-6 sm:p-8 text-center">
                  <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
                    § Fueled by Warpath
                  </div>
                  <h2 className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.5rem,3vw,2rem)] text-cream-50 max-w-[24ch] mx-auto">
                    Brew it. Pour it. Drink it black.
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.6] text-cream-50/72 max-w-[44ch] mx-auto">
                    Free USA shipping on orders $85+. Roasted to order, dispatched within 48 hours.
                  </p>
                  <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="brass" size="base" href="/shop" opCode="OP-SHOP">
                      Shop the Roast
                      <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="base"
                      href="/subscribe"
                      className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                    >
                      Start Subscription
                    </Button>
                  </div>
                </div>

                {/* Prev / Next */}
                {(prev || next) && (
                  <nav
                    aria-label="Other posts"
                    className="mt-10 grid sm:grid-cols-2 gap-4"
                  >
                    {prev ? (
                      <Link
                        href={`/blogs/${prev.slug}`}
                        className="border border-combat-900 bg-bone-50 p-4 sm:p-5 hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                      >
                        <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 inline-flex items-center gap-1.5">
                          <ArrowLeft size={12} strokeWidth={1.8} aria-hidden="true" />
                          Previous Post
                        </div>
                        <div className="mt-2 font-stencil font-extrabold text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900 line-clamp-2">
                          {prev.title}
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {next ? (
                      <Link
                        href={`/blogs/${next.slug}`}
                        className="border border-combat-900 bg-bone-50 p-4 sm:p-5 sm:text-right hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                      >
                        <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 inline-flex items-center gap-1.5 sm:flex-row-reverse">
                          Next Post
                          <ArrowRight size={12} strokeWidth={1.8} aria-hidden="true" />
                        </div>
                        <div className="mt-2 font-stencil font-extrabold text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900 line-clamp-2">
                          {next.title}
                        </div>
                      </Link>
                    ) : (
                      <div />
                    )}
                  </nav>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related posts + product upsell */}
        <section
          aria-labelledby="related-heading"
          className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[8fr_4fr] gap-8 lg:gap-12 items-start">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                More Field Notes
              </div>
              <h2
                id="related-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900 mb-8"
              >
                Read next.
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((p) => (
                  <article
                    key={p.slug}
                    className="border border-combat-900 bg-bone-50 flex flex-col motion-safe:transition-shadow motion-safe:duration-300 motion-safe:hover:shadow-[0_14px_32px_rgba(11,14,12,0.18)]"
                  >
                    <Link
                      href={`/blogs/${p.slug}`}
                      className="relative aspect-[16/10] block bg-bone-200 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
                    >
                      <Image
                        src={p.hero.src}
                        alt={p.hero.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover object-center"
                      />
                      <span className="absolute top-3 left-3 inline-flex items-center bg-combat-900 text-brass-400 font-mono font-bold text-[9px] tracking-[.20em] uppercase px-2 py-1">
                        {p.category}
                      </span>
                    </Link>
                    <div className="p-4 flex flex-col flex-1">
                      <Link
                        href={`/blogs/${p.slug}`}
                        className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 line-clamp-3"
                      >
                        {p.title}
                      </Link>
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-canvas-300 mt-3 font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold">
                        <span>{p.dateLabel}</span>
                        <span>{p.readMin} min</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside aria-label="Bestseller upsell" className="grid gap-4 lg:sticky lg:top-[88px]">
              <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-1">
                Pair With
              </div>
              <ProductCard product={FLAGSHIP} />
              <ProductCard product={SECONDARY} />
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

