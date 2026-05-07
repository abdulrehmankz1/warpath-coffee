import { SectionHeader } from "@/components/warpath/SectionHeader";
import { Button } from "@/components/warpath/Button";
import { ABOUT } from "@/lib/data/warpath";

export function AboutSpecial() {
  return (
    <section
      aria-labelledby="about-special-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={ABOUT.special.eyebrow}
          sec="§ DOCTRINE"
          title={
            <span id="about-special-headline">
              {ABOUT.special.title}{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                {ABOUT.special.titleItalic}
              </em>
            </span>
          }
          desc={ABOUT.special.paragraphs[0]}
        />

        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-ash-700 max-w-[64ch] mb-10 sm:mb-12">
          {ABOUT.special.paragraphs[1]}
        </p>

        <ul className="grid lg:grid-cols-3 gap-5 sm:gap-6">
          {ABOUT.special.pillars.map((p, i) => (
            <li
              key={p.code}
              className="group relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto] motion-safe:transition-shadow motion-safe:duration-500 hover:shadow-[0_18px_36px_rgba(11,14,12,.12)]"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900 motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-hover:bg-brass-500"
                aria-hidden="true"
              />

              <div className="px-6 sm:px-7 py-3 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                <span>{p.code}</span>
                <span className="text-ash-500/80">Rule · 0{i + 1}</span>
              </div>

              <div className="px-6 sm:px-7 pt-7 sm:pt-8 pb-7">
                <div className="font-display font-black text-[clamp(1.4rem,3vw,2rem)] leading-[1.05] uppercase tracking-[0.01em] text-combat-900 mb-4 sm:mb-5">
                  {p.title}
                </div>
                <p className="text-[16px] sm:text-[16px] leading-[1.65] text-ash-700 max-w-[44ch]">
                  {p.body}
                </p>
              </div>

              <div className="px-6 sm:px-7 py-3 border-t border-canvas-300 bg-bone-100 font-mono text-[9px] tracking-[.22em] uppercase text-ash-600 font-semibold flex items-center justify-between">
                <span>Warpath · Doctrine</span>
                <span className="text-brass-700" aria-hidden="true">
                  ★
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-between gap-5 pt-8 border-t border-combat-900/15">
          <p className="font-mono text-[11px] sm:text-[12px] tracking-[.20em] uppercase text-ash-600 font-semibold max-w-[44ch]">
            Standards on paper are just words. Taste them in the cup.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="base"
              href="/shop"
              data-event="about_special_shop"
            >
              Shop the Roast
            </Button>
            <Button
              variant="ghost"
              size="base"
              href="/subscribe"
              data-event="about_special_subscribe"
            >
              Subscribe →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
