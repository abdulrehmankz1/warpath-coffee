import { Button } from "@/components/warpath/Button";
import { Coords } from "@/components/warpath/Coords";
import {
  REVIEWS_PAGE,
  REVIEW_TOTALS,
  formatReviewCount,
} from "@/lib/data/warpath";

export function ReviewsHero() {
  return (
    <section
      className="relative bg-combat-900 text-cream-50 overflow-hidden"
      aria-labelledby="reviews-hero-headline"
    >
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="font-display font-black text-[120px] sm:text-[160px] lg:text-[200px] leading-[0.8] tracking-[-.04em] uppercase whitespace-nowrap text-brass-500/[0.05] flex motion-safe:animate-[marquee_60s_linear_infinite] gap-16">
          <span>
            FIELD REPORTS ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              verified
            </em>{" "}
            · WARPATH ·
          </span>
          <span>
            FIELD REPORTS ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              verified
            </em>{" "}
            · WARPATH ·
          </span>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 20%, rgba(196,154,72,.10), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(74,46,30,.20), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-t-[3px] border-l-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-b-[3px] border-r-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 sm:mb-7 font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-400/80"
        >
          <a
            href="/"
            className="hover:text-brass-400 motion-safe:transition-colors"
          >
            Home
          </a>
          <span className="mx-2 text-brass-500/60" aria-hidden="true">
            /
          </span>
          <span className="text-cream-50/80">Reviews</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-8 motion-safe:[animation:wp-fade-up_900ms_var(--ease-out-warpath)_both]">
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <span
                className="w-8 sm:w-12 h-px bg-brass-500"
                aria-hidden="true"
              />
              <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
                {REVIEWS_PAGE.hero.eyebrow}
              </span>
            </div>

            <h1
              id="reviews-hero-headline"
              className="font-display font-black uppercase leading-[1.02] sm:leading-[1.0] tracking-[-0.035em] text-[clamp(2.5rem,9vw,7.5rem)] text-cream-50"
            >
              <span className="block">{REVIEWS_PAGE.hero.headlinePrimary}</span>
              <span className="block">
                <span className="text-brass-500 tracking-[-0.045em] leading-[1.0] inline-block">
                  {REVIEWS_PAGE.hero.headlineItalic}
                </span>
              </span>
            </h1>

            <p className="mt-4 sm:mt-5 font-body font-medium text-brass-300/90 text-[clamp(1.05rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.005em] max-w-[36ch]">
              {REVIEWS_PAGE.hero.tagline}
            </p>

            <p className="mt-5 sm:mt-6 max-w-[60ch] text-[16px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-cream-50/72">
              {REVIEWS_PAGE.hero.subhead}
            </p>

            <div className="mt-5 flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[.18em] uppercase text-brass-400 font-bold">
              <span aria-hidden="true">★★★★★</span>
              <span>
                {formatReviewCount(REVIEW_TOTALS.total)} verified ·{" "}
                {REVIEW_TOTALS.averageRating.toFixed(1)} average
              </span>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                variant="brass"
                size="lg"
                href={REVIEWS_PAGE.hero.primaryCta.href}
                opCode="OP-SHOP"
                data-event="reviews_hero_shop"
              >
                {REVIEWS_PAGE.hero.primaryCta.label}
              </Button>
              <Button
                variant="ghost"
                size="base"
                href={REVIEWS_PAGE.hero.secondaryCta.href}
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:!bg-brass-500 hover:!text-combat-900"
                data-event="reviews_hero_write"
              >
                {REVIEWS_PAGE.hero.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-brass-500/20">
              <Coords
                tone="dark"
                items={[
                  "Verified Buyers Only",
                  "Unedited",
                  "Five-Star · Average 4.9",
                  "20K+ Reports",
                ]}
              />
            </div>
          </div>

          {/* Right column — stat panel */}
          <div className="lg:col-span-4 motion-safe:[animation:wp-fade-up_1100ms_var(--ease-out-warpath)_200ms_both]">
            <div className="border border-brass-500/40 bg-combat-800/60 backdrop-blur-sm">
              <div className="bg-brass-500 text-combat-900 px-4 sm:px-5 py-3 font-mono font-bold text-[10px] tracking-[.24em] sm:tracking-[.28em] uppercase flex items-center justify-between">
                <span>Roster · Live Tally</span>
                <span className="text-[9px]">FR · 2026</span>
              </div>
              <dl className="divide-y divide-brass-500/20">
                {REVIEWS_PAGE.highlights.map((h) => (
                  <div
                    key={h.code}
                    className="px-5 sm:px-6 py-5 sm:py-6 flex items-end justify-between gap-4"
                  >
                    <div>
                      <dt className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[.22em] uppercase text-brass-400 mb-2">
                        {h.code}
                      </dt>
                      <dd className="font-stencil font-black text-[36px] sm:text-[44px] lg:text-[52px] leading-none text-brass-500 tracking-[.01em]">
                        {h.value}
                      </dd>
                      <div className="font-mono text-[10px] sm:text-[11px] mt-2 tracking-[.18em] uppercase text-cream-50/70 font-semibold">
                        {h.unit}
                      </div>
                    </div>
                    <div className="text-right max-w-[10rem]">
                      <span className="font-body text-[11px] sm:text-[12px] text-cream-50/55 leading-tight">
                        {h.label}
                      </span>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
