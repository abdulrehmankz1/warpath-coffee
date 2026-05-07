import { Quote, Star } from "lucide-react";
import { Button } from "@/components/warpath/Button";
import { REVIEWS_PAGE } from "@/lib/data/warpath";

export function ReviewsFeatured() {
  const f = REVIEWS_PAGE.featured;
  return (
    <section
      aria-labelledby="reviews-featured-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: stamp + meta */}
          <div className="lg:col-span-4">
            <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-700 mb-4">
              § Operator Log
            </div>
            <h2
              id="reviews-featured-headline"
              className="font-display font-black uppercase leading-[0.95] tracking-[-.025em] text-[clamp(1.75rem,4.5vw,3.25rem)] text-combat-900 mb-5"
            >
              The five-star
              <br />
              <em className="not-italic text-brass-500">that landed loudest.</em>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-ash-700 leading-[1.65] max-w-[36ch] mb-6">
              We pull one operator log to the top each month. Drawn straight
              from the verified review feed — names, ranks, and roasts intact.
            </p>
            <Button
              variant="primary"
              size="base"
              href="/shop/italian-frogman-espresso"
              data-event="reviews_featured_shop"
            >
              Try the Frogman →
            </Button>
          </div>

          {/* Right: featured quote card */}
          <div className="lg:col-span-8">
            <figure className="relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto]">
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900"
                aria-hidden="true"
              />
              {/* Crate header */}
              <div className="px-5 sm:px-7 py-3 sm:py-4 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase">
                <span className="text-brass-700">{f.code}</span>
                <span
                  className="flex items-center gap-1 text-brass-500"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      strokeWidth={1.4}
                      className="fill-brass-500"
                      aria-hidden="true"
                    />
                  ))}
                </span>
              </div>

              <blockquote className="px-5 sm:px-8 lg:px-10 pt-8 sm:pt-10 pb-7 sm:pb-9 relative">
                <Quote
                  size={48}
                  strokeWidth={1.2}
                  className="text-brass-500/30 absolute top-5 left-5 sm:top-7 sm:left-7"
                  aria-hidden="true"
                />
                <p className="relative font-italic italic text-[18px] sm:text-[21px] lg:text-[26px] leading-[1.45] text-combat-900 max-w-[60ch] pl-12 sm:pl-14">
                  “{f.quote}”
                </p>
              </blockquote>

              <figcaption className="px-5 sm:px-8 py-4 border-t border-canvas-300 bg-bone-100 grid sm:grid-cols-[1fr_auto] gap-2 items-center">
                <div>
                  <div className="font-stencil font-extrabold text-[15px] sm:text-[17px] uppercase leading-none text-combat-900">
                    — {f.name}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-ash-700 font-semibold mt-1.5">
                    {f.role}
                  </div>
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-brass-700 font-bold">
                  {f.location}
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
