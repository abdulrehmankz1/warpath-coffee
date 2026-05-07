import Image from "next/image";
import { Button } from "@/components/warpath/Button";
import { Coords } from "@/components/warpath/Coords";
import {
  ABOUT,
  REVIEW_TOTALS,
  formatReviewCount,
} from "@/lib/data/warpath";

export function AboutHero() {
  return (
    <section
      className="relative bg-combat-900 text-cream-50 overflow-hidden"
      aria-labelledby="about-hero-headline"
    >
      {/* Marquee watermark */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="font-display font-black text-[120px] sm:text-[160px] lg:text-[200px] leading-[0.8] tracking-[-.04em] uppercase whitespace-nowrap text-brass-500/[0.05] flex motion-safe:animate-[marquee_60s_linear_infinite] gap-16">
          <span>
            VETERAN-OWNED ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              family-operated
            </em>{" "}
            · WARPATH ·
          </span>
          <span>
            VETERAN-OWNED ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              family-operated
            </em>{" "}
            · WARPATH ·
          </span>
        </div>
      </div>

      {/* Radial light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(196,154,72,.10), transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(74,46,30,.20), transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Cover brackets */}
      <div
        className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-t-[3px] border-l-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-b-[3px] border-r-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left 7/12 */}
          <div className="lg:col-span-7 motion-safe:[animation:wp-fade-up_900ms_var(--ease-out-warpath)_both]">
            {/* Crumb */}
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
              <span className="text-cream-50/80">About</span>
            </nav>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <span
                className="w-8 sm:w-12 h-px bg-brass-500"
                aria-hidden="true"
              />
              <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
                {ABOUT.hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              id="about-hero-headline"
              className="font-display font-black uppercase leading-[1.02] sm:leading-[1.0] tracking-[-0.035em] text-[clamp(2.5rem,9vw,7.5rem)] text-cream-50"
            >
              <span className="block">{ABOUT.hero.headlinePrimary}</span>
              <span className="block">
                <span className="text-brass-500 tracking-[-0.045em] leading-[1.0] inline-block">
                  {ABOUT.hero.headlineItalic}
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <p className="mt-4 sm:mt-5 font-body font-medium text-brass-300/90 text-[clamp(1.05rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.005em] max-w-[36ch]">
              {ABOUT.hero.tagline}
            </p>

            {/* Subhead — live-site verbatim */}
            <p className="mt-5 sm:mt-6 max-w-[60ch] text-[16px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-cream-50/72">
              {ABOUT.hero.subhead}
            </p>

            {/* Social proof */}
            {REVIEW_TOTALS.total > 0 && (
              <div className="mt-5 flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[.18em] uppercase text-brass-400 font-bold">
                <span aria-hidden="true">★★★★★</span>
                <span>
                  {formatReviewCount(REVIEW_TOTALS.total)}+ verified reviews · 4.9
                  average
                </span>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                variant="brass"
                size="lg"
                href={ABOUT.hero.primaryCta.href}
                opCode="OP-SHOP"
                data-event="about_hero_shop"
              >
                {ABOUT.hero.primaryCta.label}
              </Button>
              <Button
                variant="ghost"
                size="base"
                href={ABOUT.hero.secondaryCta.href}
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:!bg-brass-500 hover:!text-combat-900"
                data-event="about_hero_subscribe"
              >
                {ABOUT.hero.secondaryCta.label}
              </Button>
            </div>

            {/* Proof strip */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-brass-500/20">
              <Coords
                tone="dark"
                items={[
                  "Veteran-Owned",
                  "Family-Operated",
                  "Roasted in the USA",
                  "Free Ship $85+",
                ]}
              />
            </div>
          </div>

          {/* Right 5/12 — Live banner image */}
          <div className="lg:col-span-5 relative px-3 sm:px-5 pt-4 pb-6 motion-safe:[animation:wp-fade-up_1100ms_var(--ease-out-warpath)_200ms_both]">
            <div className="relative aspect-[4/5] max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] mx-auto group">
              <div className="absolute inset-0 overflow-hidden border border-brass-500/30">
                <Image
                  src={ABOUT.hero.image}
                  alt={ABOUT.hero.imageAlt}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 440px"
                  priority
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(11,14,12,.65) 100%)",
                  }}
                  aria-hidden="true"
                />
                {/* Field-report coord chip */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 font-mono text-[9px] tracking-[.20em] uppercase font-bold text-brass-400 bg-black/55 px-2 py-1 border border-brass-500/40">
                  FR · 01 · A2
                </div>
                {/* Identity card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="bg-combat-900/85 border-l-[3px] border-brass-500 px-4 py-3">
                    <div className="font-stencil font-extrabold text-base sm:text-lg uppercase leading-none text-cream-50">
                      Mariner’s Blend
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-brass-400 mt-1.5 font-semibold">
                      Veteran-Owned · USA Roasted
                    </div>
                  </div>
                </div>
              </div>
              {/* Corner brackets */}
              <span
                className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-brass-500"
                aria-hidden="true"
              />
              <span
                className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-brass-500"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-brass-500"
                aria-hidden="true"
              />
              <span
                className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-brass-500"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
