"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { REVIEWS_PAGE } from "@/lib/data/warpath";

type Tag = (typeof REVIEWS_PAGE.filters)[number]["value"];

export function ReviewsGrid() {
  const [active, setActive] = useState<Tag>("all");

  const filtered = useMemo(() => {
    if (active === "all") return REVIEWS_PAGE.reports;
    return REVIEWS_PAGE.reports.filter((r) => r.tag === active);
  }, [active]);

  const counts = useMemo(() => {
    const map = new Map<Tag, number>();
    map.set("all", REVIEWS_PAGE.reports.length);
    for (const r of REVIEWS_PAGE.reports) {
      map.set(r.tag as Tag, (map.get(r.tag as Tag) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <section
      aria-labelledby="reviews-grid-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[120px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow="Verified Field Reports"
          sec="§ ROSTER"
          title={
            <span id="reviews-grid-headline">
              The unedited{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                verified record.
              </em>
            </span>
          }
          desc="Every name is a real customer. Every quote is verbatim. Filter by roast or by program below."
        />

        {/* Filter row */}
        <div
          role="tablist"
          aria-label="Filter reviews by category"
          className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12 border-b border-combat-900/15 pb-6"
        >
          {REVIEWS_PAGE.filters.map((f) => {
            const isActive = active === f.value;
            const count = counts.get(f.value) ?? 0;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.value)}
                className={cn(
                  "group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.20em] uppercase border motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500",
                  isActive
                    ? "bg-combat-900 text-cream-50 border-combat-900"
                    : "bg-bone-50 text-combat-900 border-combat-900/30 hover:bg-combat-900 hover:text-cream-50 hover:border-combat-900",
                )}
                data-event="reviews_filter"
                data-event-tag={f.value}
              >
                {f.label}
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[.16em] px-1.5 py-0.5 border",
                    isActive
                      ? "border-brass-500 text-brass-400"
                      : "border-combat-900/40 text-ash-700 group-hover:border-brass-500 group-hover:text-brass-400",
                  )}
                >
                  {count.toString().padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((r) => (
            <li
              key={r.code}
              className="relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto] motion-safe:transition-shadow motion-safe:duration-500 hover:shadow-[0_14px_28px_rgba(11,14,12,.10)]"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900"
                aria-hidden="true"
              />
              <div className="px-5 py-3 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase">
                <span className="text-brass-700">{r.code}</span>
                <span
                  className="flex items-center gap-0.5 text-brass-500"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {Array.from({ length: r.rating }).map((_, j) => (
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
                <div className="font-mono text-[9px] tracking-[.20em] uppercase text-brass-700 font-bold mb-3">
                  {r.product}
                </div>
                <p className="font-italic italic text-[16px] leading-[1.55] text-combat-900">
                  “{r.quote}”
                </p>
              </blockquote>

              <figcaption className="px-5 sm:px-6 py-3 border-t border-canvas-300 bg-bone-100 grid grid-cols-[1fr_auto] gap-2 items-center font-mono font-bold text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-ash-700">
                <div className="flex flex-col">
                  <span className="text-combat-900">— {r.name}</span>
                  <span className="text-[9px] text-ash-500 mt-0.5 tracking-[.18em]">
                    {r.role}
                  </span>
                </div>
                <span className="text-brass-700 text-[9px]">{r.date}</span>
              </figcaption>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="mt-10 border border-dashed border-combat-900/30 bg-bone-50 px-6 py-10 text-center">
            <p className="font-mono text-[11px] tracking-[.22em] uppercase text-ash-700 font-semibold">
              No reports filed under this roast yet — be the first to write one.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
