import { ABOUT, BRAND } from "@/lib/data/warpath";

export function AboutFounderQuote() {
  return (
    <section
      aria-label="Founder pull quote"
      className="bg-bone-200 py-16 sm:py-20 lg:py-24 border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <div className="relative">
          {/* Big brass open quote — decorative */}
          <span
            className="absolute -top-6 sm:-top-10 -left-1 sm:-left-3 font-italic italic font-normal text-brass-500/30 leading-none select-none pointer-events-none text-[clamp(7rem,18vw,14rem)]"
            aria-hidden="true"
          >
            “
          </span>

          <blockquote className="relative font-italic italic font-normal text-combat-900 text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.3] tracking-[-0.005em] max-w-[36ch]">
            {ABOUT.pullQuote.quote}
          </blockquote>

          <div className="mt-7 sm:mt-9 flex items-center gap-4 pt-6 border-t border-combat-900/15">
            <span
              className="block w-10 sm:w-14 h-px bg-brass-500"
              aria-hidden="true"
            />
            <div>
              <div className="font-stencil font-extrabold text-[16px] sm:text-[18px] uppercase tracking-[0.02em] text-combat-900 leading-none">
                {ABOUT.pullQuote.attribution}
              </div>
              <div className="mt-1.5 font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-brass-700 font-semibold">
                {ABOUT.pullQuote.role}
              </div>
            </div>
            <span
              className="ml-auto font-mono text-[9px] sm:text-[10px] tracking-[.24em] uppercase text-ash-500 font-semibold"
              aria-hidden="true"
            >
              {BRAND.shortTag}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
