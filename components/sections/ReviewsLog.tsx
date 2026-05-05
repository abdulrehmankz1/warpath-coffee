import { Star } from "lucide-react";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { ReviewsCarousel } from "@/components/warpath/ReviewsCarousel";
import {
  FLAGSHIP,
  SECONDARY,
  formatReviewCount,
} from "@/lib/data/warpath";

export function ReviewsLog() {
  const totalReviews =
    (FLAGSHIP.reviews ?? 0) + (SECONDARY.reviews ?? 0);

  const stats = [
    { k: "Average", v: "4.9", sub: "out of 5", stars: true },
    {
      k: "Mariner’s Blend",
      v: formatReviewCount(FLAGSHIP.reviews ?? 0),
      sub: "verified",
    },
    {
      k: "Breakfast Blend",
      v: formatReviewCount(SECONDARY.reviews ?? 0),
      sub: "verified",
    },
    { k: "Recommend", v: "98%", sub: "would re-order" },
  ];

  return (
    <section
      aria-labelledby="reviews-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={`${formatReviewCount(totalReviews)}+ Verified Reviews`}
          sec="§ FIELD REPORTS"
          title={
            <span id="reviews-headline">
              Verified <em className="font-italic italic font-normal text-brass-500 normal-case">cups in hand.</em>
            </span>
          }
          desc="Real customers, verified through our order system. The best coffee ever — that’s their words, not ours."
        />

        {/* Aggregate stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-combat-900 bg-combat-900 text-cream-50 mb-8 sm:mb-10 lg:mb-12">
          {stats.map((s, i) => (
            <div
              key={s.k}
              data-rev-stat
              className={`group px-4 sm:px-6 py-5 sm:py-6 motion-safe:transition-colors motion-safe:duration-300 hover:bg-combat-800 ${
                i < 1 ? "border-b border-r border-brass-500/30" : ""
              } ${i === 1 ? "border-b border-brass-500/30 lg:border-r" : ""} ${
                i === 2
                  ? "border-r border-brass-500/30 lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <div className="font-mono text-[9px] sm:text-[10px] tracking-[.20em] sm:tracking-[.24em] uppercase text-brass-400 font-bold mb-2">
                {s.k}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-stencil font-black text-[clamp(1.75rem,3.5vw,2.75rem)] text-brass-500 leading-none tracking-[0.01em]">
                  {s.v}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-cream-50/60 font-semibold">
                  {s.sub}
                </span>
              </div>
              {s.stars && (
                <div
                  className="mt-2 flex items-center gap-0.5 text-brass-500"
                  aria-label="4.9 out of 5 stars"
                >
                  {[0, 1, 2, 3, 4].map((j) => (
                    <Star
                      key={j}
                      size={14}
                      strokeWidth={1.4}
                      className="fill-brass-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Carousel */}
        <ReviewsCarousel />

        {/* Footer link */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-500 transition-colors"
            data-event="reviews_view_all"
          >
            Read all {formatReviewCount(totalReviews)}+ reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
