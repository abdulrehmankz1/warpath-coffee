import Image from "next/image";
import { Button } from "@/components/warpath/Button";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import {
  FLAGSHIP,
  SHIPPING,
  formatReviewCount,
  formatUsd,
} from "@/lib/data/warpath";

export function FlagshipCrate() {
  return (
    <section
      aria-labelledby="flagship-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow="Flagship Roast · Best Seller"
          sec="§ FLAGSHIP"
          title={
            <>
              The cup that <em className="font-italic italic font-normal text-brass-500 normal-case">earns</em> the second pour.
            </>
          }
          desc={FLAGSHIP.description}
        />

        <div className="grid lg:grid-cols-[5fr_7fr] gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Visual — arched bag */}
          <div className="relative order-2 lg:order-1 group">
            <div className="relative aspect-[4/5] max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] mx-auto">
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ borderRadius: "240px 240px 28px 28px" }}
              >
                <Image
                  src={FLAGSHIP.image}
                  alt={`${FLAGSHIP.name} — 12oz bag`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 440px"
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.06]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(11,14,12,.45) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>
              <span className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-combat-900" aria-hidden="true" />
              <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-combat-900" aria-hidden="true" />
            </div>
          </div>

          {/* Crate Tile */}
          <article className="relative bg-combat-900 text-cream-50 grid grid-rows-[auto_1fr_auto] border border-brass-500 min-h-[420px] overflow-hidden order-1 lg:order-2 motion-safe:transition-shadow motion-safe:duration-500 motion-safe:hover:shadow-[0_24px_48px_rgba(196,154,72,0.18)]">
            {/* Crate header */}
            <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 py-3 sm:py-4 bg-brass-500/[0.08] border-b border-dashed border-brass-500/40 gap-3 sm:gap-5 font-mono text-[9px] sm:text-[10px] tracking-[.18em] sm:tracking-[.22em] uppercase text-brass-400 font-bold">
              <div className="flex items-center gap-2 sm:gap-3 before:content-[''] before:w-2 before:h-2 before:bg-brass-500 before:rounded-full">
                <span className="hidden sm:inline">Mariner’s Blend · </span>Dark
              </div>
              <div className="text-cream-50/50 text-center text-[8px] sm:text-[9px] hidden sm:block" aria-hidden="true">
                ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
              </div>
              <div>12oz Bag</div>
            </div>

            {/* Body */}
            <div className="px-5 sm:px-7 py-6 sm:py-8">
              <h3
                id="flagship-headline"
                className="font-stencil font-black text-[clamp(1.5rem,3vw,2.5rem)] uppercase leading-[1] tracking-[0.01em]"
              >
                Smooth as command.{" "}
                <em className="font-italic italic font-normal text-brass-500 normal-case tracking-[-.02em]">
                  Strong as the watch.
                </em>
              </h3>
              <p className="mt-4 max-w-[48ch] text-[13px] sm:text-[14px] text-cream-50/78 leading-[1.55]">
                Custom-roasted dark blend. Chocolate, almond, clean finish — never bitter, never acidic. Roasted in the USA.
              </p>

              {/* Review proof */}
              {FLAGSHIP.reviews && (
                <div className="mt-4 flex items-center gap-3 font-mono text-[11px] tracking-[.20em] uppercase text-brass-400 font-bold">
                  <span aria-hidden="true">★★★★★</span>
                  <span>
                    {formatReviewCount(FLAGSHIP.reviews)} verified reviews
                  </span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-brass-500/20">
                {[
                  ["Roast", "Dark"],
                  ["Profile", "Smooth · Low-Acid"],
                  ["Notes", "Choc · Almond"],
                ].map(([k, v]) => (
                  <div key={k} className="font-mono text-[9px] sm:text-[10px] tracking-[.16em] sm:tracking-[.18em] uppercase text-cream-50/55 font-semibold">
                    {k}
                    <b className="block font-stencil text-xs sm:text-sm text-brass-400 font-bold mt-1.5 tracking-[.04em]">
                      {v}
                    </b>
                  </div>
                ))}
              </div>
            </div>

            {/* Foot */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-t border-dashed border-brass-500/40 bg-black/20 flex justify-between items-center gap-4 sm:gap-6 flex-wrap">
              <div className="font-stencil font-black text-[28px] sm:text-[36px] text-brass-500 leading-none tracking-[0.01em]">
                {formatUsd(FLAGSHIP.priceUsd)}
                <small className="font-mono text-[9px] sm:text-[10px] text-cream-50/55 font-semibold tracking-[.16em] sm:tracking-[.18em] uppercase block mt-1">
                  12oz · Free Ship ${SHIPPING.freeShippingThresholdUsd}+
                </small>
              </div>
              <Button
                variant="brass"
                size="base"
                href={FLAGSHIP.href}
                opCode="OP-CART"
                data-event="flagship_view_product"
              >
                Shop {FLAGSHIP.name.split(" ")[0]} →
              </Button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
