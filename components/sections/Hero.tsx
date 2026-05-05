import Image from "next/image";
import { Button } from "@/components/warpath/Button";
import { Coords } from "@/components/warpath/Coords";
import {
  FLAGSHIP,
  HERO,
  formatReviewCount,
} from "@/lib/data/warpath";

export function Hero() {
  return (
    <section
      className="relative bg-combat-900 text-cream-50 overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Marquee watermark — disabled for reduced-motion users */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="font-display font-black text-[120px] sm:text-[160px] lg:text-[200px] leading-[0.8] tracking-[-.04em] uppercase whitespace-nowrap text-brass-500/[0.05] flex motion-safe:animate-[marquee_60s_linear_infinite] gap-16">
          <span>WARPATH · <em className="not-italic font-normal text-brass-500/[0.18]">drink it black</em> · WARPATH ·</span>
          <span>WARPATH · <em className="not-italic font-normal text-brass-500/[0.18]">drink it black</em> · WARPATH ·</span>
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
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-t-[3px] border-l-[3px] border-brass-500 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-b-[3px] border-r-[3px] border-brass-500 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left 7/12 */}
          <div className="lg:col-span-7 motion-safe:[animation:wp-fade-up_900ms_var(--ease-out-warpath)_both]">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <span className="w-8 sm:w-12 h-px bg-brass-500" aria-hidden="true" />
              <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
                {HERO.eyebrow}
              </span>
            </div>

            {/* Headline — relaxed line rhythm */}
            <h1
              id="hero-headline"
              className="font-display font-black uppercase leading-[1.02] sm:leading-[1.0] tracking-[-0.035em] text-[clamp(2.5rem,9vw,7.5rem)] text-cream-50"
            >
              <span className="block">{HERO.headlinePrimary}</span>
              <span className="block">
                <span className="text-brass-500 tracking-[-0.045em] leading-[1.0] inline-block">
                  {HERO.headlineSecondaryItalic}
                </span>
              </span>
            </h1>

            {/* Tagline — sits outside H1 so it doesn't pollute heading semantics */}
            <p className="mt-4 sm:mt-5 font-display font-medium text-brass-300/90 text-[clamp(1.05rem,2.2vw,1.75rem)] leading-[1.25] tracking-[-0.005em] max-w-[34ch]">
              {HERO.headlineThird}
            </p>

            {/* Subhead */}
            <p className="mt-5 sm:mt-6 max-w-[52ch] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-cream-50/70">
              {HERO.subhead}
            </p>

            {/* Social proof line */}
            {FLAGSHIP.reviews && (
              <div className="mt-5 flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[.18em] uppercase text-brass-400 font-bold">
                <span aria-hidden="true">★★★★★</span>
                <span>
                  {formatReviewCount(FLAGSHIP.reviews)} verified reviews
                </span>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                variant="brass"
                size="lg"
                href={HERO.primaryCta.href}
                opCode="OP-SHOP"
                data-event="hero_shop_primary"
              >
                {HERO.primaryCta.label}
              </Button>
              <Button
                variant="ghost"
                size="base"
                href={HERO.secondaryCta.href}
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:!bg-brass-500 hover:!text-combat-900"
                data-event="hero_secondary"
              >
                {HERO.secondaryCta.label}
              </Button>
            </div>

            {/* Proof strip */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-brass-500/20">
              <Coords
                tone="dark"
                items={[
                  "Veteran-Owned",
                  "Roasted in the USA",
                  "Free Ship $85+",
                  "Smooth · Low-Acid",
                ]}
              />
            </div>
          </div>

          {/* Right 5/12 — Product visual (gutter padding so floating chips don't get clipped) */}
          <div className="lg:col-span-5 relative px-3 sm:px-5 pt-4 pb-6 motion-safe:[animation:wp-fade-up_1100ms_var(--ease-out-warpath)_200ms_both]">
            <div className="relative aspect-[4/5] max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] mx-auto group">
              <div className="absolute inset-0 overflow-hidden border border-brass-500/30">
                <Image
                  src={FLAGSHIP.image}
                  alt={`${FLAGSHIP.name} — flagship product`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 440px"
                  priority
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(11,14,12,.55) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Brass roast stamp — sits inside the column gutter so it never gets clipped */}
              <div
                className="wp-stamp-idle absolute top-6 sm:top-10 right-1 sm:right-2 lg:right-3 z-20 inline-flex items-center gap-2 bg-brass-500 text-combat-900 pl-3 sm:pl-4 pr-4 sm:pr-5 py-2 sm:py-2.5 font-mono font-bold text-[9px] sm:text-[10px] lg:text-[11px] tracking-[.20em] sm:tracking-[.22em] uppercase rounded-full ring-2 ring-combat-900 origin-center"
                style={{
                  boxShadow:
                    "0 10px 24px rgba(11,14,12,.50), 0 0 0 4px rgba(196,154,72,.18)",
                  transform: "rotate(-7deg)",
                }}
                aria-hidden="true"
              >
                <span className="inline-block w-1.5 h-1.5 bg-combat-900 rounded-full" />
                Dark Roast · Best Seller
                <span className="text-combat-900/80">★</span>
              </div>

              {/* Spec callout — kept inside the column gutter */}
              <div className="absolute bottom-3 sm:bottom-4 left-1 sm:left-2 lg:left-3 z-10 bg-combat-900 border border-brass-500 px-3 sm:px-4 py-2 sm:py-3 font-mono text-[9px] sm:text-[10px] tracking-[.20em] sm:tracking-[.22em] uppercase text-brass-400 font-bold">
                <div className="text-cream-50/60 text-[8px] mb-1">Price</div>
                <div>${FLAGSHIP.priceUsd.toFixed(2)} · 12oz</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
