import { Shield, Coffee, Truck, Star } from "lucide-react";
import { BRAND, SHIPPING, FLAGSHIP, formatReviewCount } from "@/lib/data/warpath";

const items = [
  {
    icon: Shield,
    code: "TRUST · 01",
    label: "Veteran-Owned",
    sub: `Founded by Navy SEAL ${BRAND.founderName}`,
  },
  {
    icon: Coffee,
    code: "TRUST · 02",
    label: "Smooth · Low-Acid",
    sub: "Drink it black, no sugar needed",
  },
  {
    icon: Truck,
    code: "TRUST · 03",
    label: `Free Ship $${SHIPPING.freeShippingThresholdUsd}+`,
    sub: "Ships fresh across the USA",
  },
  {
    icon: Star,
    code: "TRUST · 04",
    label: `${formatReviewCount(FLAGSHIP.reviews ?? 0)} Reviews`,
    sub: "Verified buyers · 4.9 average",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why customers trust Warpath Coffee"
      className="bg-bone-100 border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] grid grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          const isLastInRow = (i + 1) % 2 === 0; // mobile (2-col)
          return (
            <div
              key={it.code}
              className={`group px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7 flex items-start gap-3 sm:gap-4 border-combat-900 ${
                isLastInRow ? "" : "border-r"
              } ${i < 2 ? "border-b" : ""} lg:border-r lg:border-b-0 lg:[&:last-child]:border-r-0 motion-safe:transition-colors motion-safe:duration-300 hover:bg-bone-50`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-combat-900 text-brass-400 flex items-center justify-center shrink-0 motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:bg-brass-500 motion-safe:group-hover:text-combat-900 motion-safe:group-hover:rotate-[-4deg]">
                <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[9px] font-bold tracking-[.20em] sm:tracking-[.22em] uppercase text-brass-700 mb-1">
                  {it.code}
                </div>
                <div className="font-stencil font-extrabold text-[13px] sm:text-[14px] lg:text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900">
                  {it.label}
                </div>
                <div className="font-body text-[11px] sm:text-[12px] text-ash-600 mt-1 leading-snug">
                  {it.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
