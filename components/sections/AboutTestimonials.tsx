import { Star } from "lucide-react";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { ABOUT } from "@/lib/data/warpath";

export function AboutTestimonials() {
  return (
    <section
      aria-labelledby="about-testimonials-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={ABOUT.testimonials.eyebrow}
          sec="§ FIELD REPORTS"
          title={
            <span id="about-testimonials-headline">
              In the words of the{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                people pouring it.
              </em>
            </span>
          }
          desc="Real customer reviews captured straight from the live Warpath storefront."
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ABOUT.testimonials.items.map((t) => (
            <li
              key={t.code}
              className="relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto] motion-safe:transition-shadow motion-safe:duration-500 hover:shadow-[0_14px_28px_rgba(11,14,12,.10)]"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900"
                aria-hidden="true"
              />
              <div className="px-5 py-3 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase">
                <span className="text-brass-700">{t.code}</span>
                <span
                  className="flex items-center gap-0.5 text-brass-500"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={11}
                      strokeWidth={1.4}
                      className="fill-brass-500"
                      aria-hidden="true"
                    />
                  ))}
                </span>
              </div>

              <blockquote className="px-5 sm:px-6 pt-6 pb-5">
                <p className="font-italic italic text-[16px] leading-[1.55] text-combat-900">
                  “{t.quote}”
                </p>
              </blockquote>

              <figcaption className="px-5 sm:px-6 py-3 border-t border-canvas-300 bg-bone-100 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-ash-700 flex items-center justify-between">
                <span>— {t.name}</span>
                <span className="text-brass-700" aria-hidden="true">
                  ★
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
