import { AmmoStripe } from "@/components/warpath/AmmoStripe";
import { SHIPPING } from "@/lib/data/warpath";

export function AnnouncementBar() {
  return (
    <div
      className="bg-combat-900 text-cream-50"
      role="region"
      aria-label="Site announcement"
    >
      <AmmoStripe thin />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-2.5">
        <div className="flex items-center justify-center md:justify-between gap-3 sm:gap-6 flex-wrap text-center md:text-left">
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[.18em] sm:tracking-[.22em] uppercase">
            <span
              className="inline-block w-2 h-2 bg-brass-500 rounded-full motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span>
              Free USA shipping on orders over ${SHIPPING.freeShippingThresholdUsd}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 font-mono text-[10px] font-semibold tracking-[.22em] uppercase text-brass-400">
            <span>Veteran-Owned · Family-Operated</span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span>Roasted in the USA</span>
          </div>
        </div>
      </div>
      <AmmoStripe thin />
    </div>
  );
}
