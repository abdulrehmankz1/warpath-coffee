"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { cn } from "@/lib/cn";
import {
  CATEGORY_FILTERS,
  SORT_OPTIONS,
} from "@/lib/data/warpath";

type Props = {
  resultsCount: number;
};

const COLLECTION_PREFIX = "/shop/collections/";

export function ShopFilters({ resultsCount }: Props) {
  const router = useRouter();
  const pathname = usePathname() ?? "/shop";
  const params = useSearchParams();
  const [pending, start] = useTransition();

  const activeCategory = pathname.startsWith(COLLECTION_PREFIX)
    ? pathname.slice(COLLECTION_PREFIX.length).split("/")[0]
    : "all";
  const activeSort = params.get("sort") ?? "best-sellers";

  const navigateToCategory = useCallback(
    (value: string) => {
      const sortParam = activeSort === "best-sellers" ? "" : `?sort=${activeSort}`;
      const target =
        value === "all" ? `/shop${sortParam}` : `${COLLECTION_PREFIX}${value}${sortParam}`;
      start(() => {
        router.push(target, { scroll: false });
      });
    },
    [activeSort, router],
  );

  const updateSort = useCallback(
    (value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value === "best-sellers") next.delete("sort");
      else next.set("sort", value);
      const qs = next.toString();
      start(() => {
        router.replace(qs ? `?${qs}` : "?", { scroll: false });
      });
    },
    [params, router],
  );

  return (
    <div
      className={cn(
        "sticky top-[64px] sm:top-[72px] z-20 bg-bone-100 border-b border-canvas-300",
        pending && "opacity-90",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4 flex items-center gap-3 sm:gap-5 flex-wrap">
        {/* Category chips */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex items-center gap-2 flex-wrap"
        >
          {CATEGORY_FILTERS.map((c) => {
            const active = activeCategory === c.value;
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={active}
                onClick={() => navigateToCategory(c.value)}
                className={cn(
                  "min-h-[40px] px-3 sm:px-4 font-mono font-bold text-[10px] tracking-[.20em] uppercase border motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                  active
                    ? "bg-combat-900 text-brass-400 border-combat-900"
                    : "bg-bone-50 text-combat-900 border-combat-900/30 hover:border-combat-900",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4 flex-wrap">
          <label className="inline-flex items-center gap-2">
            <span className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-ash-600">
              Sort
            </span>
            <select
              value={activeSort}
              onChange={(e) => updateSort(e.target.value)}
              className="bg-bone-50 border border-combat-900 text-combat-900 font-mono font-bold text-[11px] tracking-[.20em] uppercase px-3 py-2 min-h-[40px] focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <span className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-ash-600 tabular-nums">
            {resultsCount} {resultsCount === 1 ? "Product" : "Products"}
          </span>
        </div>
      </div>
    </div>
  );
}
