import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Breadcrumbs } from "./Breadcrumbs";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  breadcrumb: { label: string; href?: string }[];
  /** TOC pairs of {anchor, label} so users can jump within long policy pages */
  toc?: { id: string; label: string }[];
  children: ReactNode;
};

export function PolicyShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  breadcrumb,
  toc,
  children,
}: Props) {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Breadcrumbs */}
        <div className="bg-bone-100 border-b border-canvas-300">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4">
            <Breadcrumbs items={breadcrumb} />
          </div>
        </div>

        {/* Hero */}
        <section
          aria-labelledby="policy-heading"
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
              {eyebrow}
            </div>
            <h1
              id="policy-heading"
              className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2rem,5vw,3.75rem)] text-cream-50"
            >
              {title}
            </h1>
            {intro && (
              <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-cream-50/72 max-w-[58ch]">
                {intro}
              </p>
            )}
            {lastUpdated && (
              <div className="mt-4 font-mono font-semibold text-[11px] tracking-[.20em] uppercase text-brass-400">
                Last Updated · {lastUpdated}
              </div>
            )}
          </div>
        </section>

        {/* Body */}
        <section className="bg-bone-100 py-10 sm:py-14">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[3fr_9fr] gap-8 lg:gap-12 items-start">
            {/* TOC */}
            {toc && toc.length > 0 && (
              <aside
                aria-label="On this page"
                className="lg:sticky lg:top-[88px] border border-combat-900 bg-bone-50"
              >
                <div className="bg-combat-900 text-cream-50 px-5 py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase">
                  On This Page
                </div>
                <nav className="p-4 sm:p-5">
                  <ol className="grid gap-2.5">
                    {toc.map((t, i) => (
                      <li key={t.id}>
                        <Link
                          href={`#${t.id}`}
                          className="font-mono font-bold text-[11px] tracking-[.16em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-baseline gap-2 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                        >
                          <span className="font-mono text-[10px] tracking-[.20em] text-brass-700">
                            0{i + 1}
                          </span>
                          {t.label}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            {/* Content */}
            <article className="border border-combat-900 bg-bone-50 px-5 sm:px-8 py-8 sm:py-10 prose-policy max-w-none text-[15px] sm:text-[16px] leading-[1.7] text-ash-800">
              {children}
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/**
 * Section primitive used inside PolicyShell content. Wraps an h2 with stencil
 * styling and a brass divider, then renders children paragraphs.
 */
export function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id?: string;
  number?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 mt-10 first:mt-0 pt-2 first:pt-0 border-t first:border-t-0 border-canvas-300"
    >
      {number && (
        <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-2 mt-8 first:mt-0">
          {number}
        </div>
      )}
      <h2 className="font-stencil font-extrabold text-[clamp(1.25rem,2.6vw,1.75rem)] uppercase tracking-[.02em] leading-[1.1] text-combat-900 mt-2">
        {title}
      </h2>
      <div className="mt-3 sm:mt-4 grid gap-4">{children}</div>
    </section>
  );
}
