import Image from "next/image";
import { Button } from "@/components/warpath/Button";
import { DogTag } from "@/components/warpath/DogTag";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { FOUNDER, BRAND } from "@/lib/data/warpath";

export function FounderStrip() {
  return (
    <section
      aria-labelledby="founder-headline"
      className="bg-combat-900 text-cream-50 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 30%, rgba(196,154,72,.10), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-16 sm:py-20 lg:py-[140px]">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">
          {/* Portrait */}
          <div className="relative order-2 lg:order-1 group">
            <div className="relative aspect-[3/4] max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] mx-auto">
              <div className="absolute inset-0 overflow-hidden border border-brass-500/30">
                <Image
                  src={FOUNDER.image}
                  alt={`${FOUNDER.name} — ${FOUNDER.role}`}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 440px"
                  className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(11,14,12,.55), rgba(196,154,72,.18))",
                    mixBlendMode: "multiply",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 font-mono text-[9px] tracking-[.20em] uppercase font-bold text-brass-400 bg-black/55 px-2 py-1 border border-brass-500/40">
                  FR · 05 · D2
                </div>
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="bg-combat-900/85 border-l-[3px] border-brass-500 px-3 sm:px-4 py-2 sm:py-3">
                    <div className="font-stencil font-extrabold text-base sm:text-lg uppercase leading-none text-cream-50">
                      {FOUNDER.name}
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] tracking-[.18em] sm:tracking-[.20em] uppercase text-brass-400 mt-1.5 font-semibold">
                      Founder · U.S. Navy SEAL
                    </div>
                  </div>
                </div>
              </div>
              <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-brass-500" aria-hidden="true" />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow="Founded by Veterans"
              sec="§ OUR STORY"
              tone="dark"
              className="!mb-5 sm:!mb-6"
              title={
                <span id="founder-headline">
                  Roasted by people who{" "}
                  <em className="not-italic text-brass-500 normal-case tracking-[-.025em]">
                    stand a watch.
                  </em>
                </span>
              }
              desc={FOUNDER.body}
            />
            <p className="mt-5 sm:mt-6 text-[14px] sm:text-[15px] leading-[1.65] text-cream-50/60 max-w-[58ch]">
              {FOUNDER.team}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <DogTag top="Founder" name={FOUNDER.name} meta="U.S. Navy SEAL · Combat Vet" />
              <DogTag top="Roastmaster" name="30 yrs" meta={BRAND.roastmasterTenure} />
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <Button
                variant="brass"
                size="base"
                href={FOUNDER.storyHref}
                opCode="OP-STORY"
                data-event="founder_read_more"
              >
                Read the Full Story
              </Button>
              <Button
                variant="ghost"
                size="base"
                href={FOUNDER.shopHref}
                className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:!bg-brass-500 hover:!text-combat-900"
                data-event="founder_shop"
              >
                Browse Roasts →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
