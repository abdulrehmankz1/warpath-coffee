import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { SiteHeader } from "./SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "./Button";
import { ProductCard } from "./ProductCard";
import {
  type Product,
  formatReviewCount,
  SHIPPING,
} from "@/lib/data/warpath";

type Pillar = {
  code: string;
  title: string;
  body: string;
};

type Props = {
  /** Breadcrumb trail */
  breadcrumb: { label: string; href?: string }[];
  /** Hero */
  hero: {
    eyebrow: string;
    headlinePrimary: string;
    headlineItalic?: string;
    subhead: string;
    primaryCta: { label: string; href: string; opCode?: string };
    secondaryCta?: { label: string; href: string };
    /** Trust counter (review total etc.) — optional */
    trustNumber?: string;
    trustLabel?: string;
  };
  /** Sticky stats band — 3-up bullets that anchor the page */
  stats?: { k: string; v: string; sub?: string }[];
  /** Pillars / value props (3-up) */
  pillars?: {
    eyebrow: string;
    title: string;
    titleItalic?: string;
    intro?: string;
    items: Pillar[];
  };
  /** Long-form body — appears under pillars */
  body?: ReactNode;
  /** Curated featured product grid */
  products?: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: Product[];
  };
  /** Mid-page testimonial pull quote */
  testimonial?: {
    quote: string;
    name: string;
    role?: string;
  };
  /** Closing CTA band */
  closing: {
    eyebrow: string;
    headline: string;
    body: string;
    primary: { label: string; href: string; opCode?: string };
    secondary?: { label: string; href: string };
  };
};

export function MissionShell({
  breadcrumb,
  hero,
  stats,
  pillars,
  body,
  products,
  testimonial,
  closing,
}: Props) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Breadcrumb */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={breadcrumb} />
          </div>
        </div>

        {/* Hero */}
        <section
          aria-labelledby="mission-heading"
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
          <span
            className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500"
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-12 sm:py-16 lg:py-20 grid lg:grid-cols-[8fr_4fr] gap-8 lg:gap-12 items-end">
            <div>
              <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.32em] uppercase text-brass-500 mb-3 sm:mb-4">
                {hero.eyebrow}
              </div>
              <h1
                id="mission-heading"
                className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2.4rem,6.5vw,5.5rem)] text-cream-50"
              >
                {hero.headlinePrimary}
                {hero.headlineItalic && (
                  <>
                    <br />
                    <em className="not-italic text-brass-500 tracking-[-0.01em]">
                      {hero.headlineItalic}
                    </em>
                  </>
                )}
              </h1>
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-[1.6] text-cream-50/80 max-w-[60ch]">
                {hero.subhead}
              </p>
              <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="brass"
                  size="lg"
                  href={hero.primaryCta.href}
                  opCode={hero.primaryCta.opCode}
                  data-event="mission_primary_cta"
                >
                  {hero.primaryCta.label}
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="ml-2"
                  />
                </Button>
                {hero.secondaryCta && (
                  <Button
                    variant="ghost"
                    size="lg"
                    href={hero.secondaryCta.href}
                    className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                  >
                    {hero.secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>
            {hero.trustNumber && (
              <aside className="border border-brass-500/30 bg-combat-800/60 px-5 py-5 lg:justify-self-end lg:max-w-[280px]">
                <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400 mb-2 inline-flex items-center gap-1.5">
                  <Star
                    size={11}
                    strokeWidth={1.4}
                    className="fill-brass-500 text-brass-500"
                    aria-hidden="true"
                  />
                  Trust Signal
                </div>
                <div className="font-stencil font-black text-[clamp(1.875rem,3vw,2.5rem)] leading-none text-brass-500 tracking-[.01em]">
                  {hero.trustNumber}
                </div>
                {hero.trustLabel && (
                  <div className="mt-2 font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-cream-50/70 font-semibold">
                    {hero.trustLabel}
                  </div>
                )}
              </aside>
            )}
          </div>
        </section>

        {/* Stats band */}
        {stats && stats.length > 0 && (
          <section
            aria-label="Quick facts"
            className="bg-bone-200 border-b border-combat-900"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-combat-900">
              {stats.map((s) => (
                <div key={s.k} className="px-2 sm:px-6 py-5 sm:py-6">
                  <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-1.5">
                    {s.k}
                  </div>
                  <div className="font-stencil font-black text-[clamp(1.5rem,2.6vw,2rem)] leading-none uppercase tracking-[.01em] text-combat-900">
                    {s.v}
                  </div>
                  {s.sub && (
                    <div className="mt-1.5 font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold">
                      {s.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pillars */}
        {pillars && (
          <section
            aria-labelledby="pillars-heading"
            className="bg-bone-100 py-12 sm:py-16 lg:py-20"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
              <div className="mb-8 sm:mb-10 max-w-[64ch]">
                <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                  {pillars.eyebrow}
                </div>
                <h2
                  id="pillars-heading"
                  className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900"
                >
                  {pillars.title}
                  {pillars.titleItalic && (
                    <>
                      {" "}
                      <em className="not-italic font-normal text-brass-700">
                        {pillars.titleItalic}
                      </em>
                    </>
                  )}
                </h2>
                {pillars.intro && (
                  <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-ash-700">
                    {pillars.intro}
                  </p>
                )}
              </div>
              <div className="grid sm:grid-cols-3 gap-px bg-canvas-300 border border-combat-900">
                {pillars.items.map((p) => (
                  <article
                    key={p.title}
                    className="bg-bone-50 p-5 sm:p-7"
                  >
                    <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700 mb-3">
                      {p.code}
                    </div>
                    <h3 className="font-stencil font-extrabold text-[clamp(1.125rem,2vw,1.375rem)] uppercase tracking-[.02em] leading-tight text-combat-900">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-ash-700">
                      {p.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Long-form body */}
        {body && (
          <section className="bg-bone-200 border-y border-combat-900 py-12 sm:py-16">
            <div className="mx-auto max-w-[800px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
              <div className="text-[15px] sm:text-[17px] leading-[1.75] text-ash-800 grid gap-5">
                {body}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {testimonial && (
          <section className="bg-combat-900 text-cream-50 py-12 sm:py-16 border-y border-brass-500/20">
            <div className="mx-auto max-w-[960px] px-4 sm:px-6 md:px-12 lg:px-[90px] text-center">
              <div className="inline-flex items-center gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star
                    key={j}
                    size={16}
                    strokeWidth={1.4}
                    className="fill-brass-500 text-brass-500"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="font-italic italic font-normal text-[clamp(1.25rem,2.6vw,1.875rem)] leading-[1.4] text-cream-50">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-5 font-mono font-bold text-[11px] tracking-[.24em] uppercase text-brass-400">
                {testimonial.name}
                {testimonial.role && (
                  <span className="text-cream-50/60"> · {testimonial.role}</span>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Featured products */}
        {products && products.items.length > 0 && (
          <section
            aria-labelledby="products-heading"
            className="bg-bone-100 py-12 sm:py-16 lg:py-20"
          >
            <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
              <div className="mb-8 sm:mb-10 max-w-[64ch]">
                <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
                  {products.eyebrow}
                </div>
                <h2
                  id="products-heading"
                  className="font-display font-black uppercase leading-[1.0] tracking-[-.022em] text-[clamp(1.875rem,4vw,3rem)] text-combat-900"
                >
                  {products.title}
                </h2>
                {products.intro && (
                  <p className="mt-3 sm:mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-ash-700">
                    {products.intro}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {products.items.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section
          aria-labelledby="closing-heading"
          className="bg-combat-900 text-cream-50 relative overflow-hidden py-14 sm:py-20 lg:py-24"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, rgba(196,154,72,.18), transparent 50%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] text-center">
            <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
              {closing.eyebrow}
            </div>
            <h2
              id="closing-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2rem,5vw,3.75rem)] text-cream-50 max-w-[18ch] mx-auto"
            >
              {closing.headline}
            </h2>
            <p className="mt-5 max-w-[60ch] mx-auto text-[15px] sm:text-[17px] leading-[1.6] text-cream-50/80">
              {closing.body}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                variant="brass"
                size="lg"
                href={closing.primary.href}
                opCode={closing.primary.opCode}
                data-event="mission_closing_cta"
              >
                {closing.primary.label}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
              </Button>
              {closing.secondary && (
                <Button
                  variant="ghost"
                  size="lg"
                  href={closing.secondary.href}
                  className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                >
                  {closing.secondary.label}
                </Button>
              )}
            </div>
            <div className="mt-7 inline-flex items-center gap-2 font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
              <span>
                Free ship ${SHIPPING.freeShippingThresholdUsd}+
              </span>
              <span aria-hidden="true">·</span>
              <span>30-day guarantee</span>
              <span aria-hidden="true">·</span>
              <span>Veteran-owned</span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
