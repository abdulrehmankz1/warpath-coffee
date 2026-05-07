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

  const onCollectionRoute = pathname.startsWith(COLLECTION_PREFIX);
  const activeCategory = onCollectionRoute
    ? pathname.slice(COLLECTION_PREFIX.length).split("/")[0]
    : (params.get("category") ?? "all");
  const activeSort = params.get("sort") ?? "best-sellers";

  const navigateToCategory = useCallback(
    (value: string) => {
      const next = new URLSearchParams();
      if (value !== "all") next.set("category", value);
      if (activeSort !== "best-sellers") next.set("sort", activeSort);
      const qs = next.toString();
      const target = qs ? `/shop?${qs}` : "/shop";
      start(() => {
        if (onCollectionRoute) {
          router.push(target, { scroll: false });
        } else {
          router.replace(target, { scroll: false });
        }
      });
    },
    [activeSort, onCollectionRoute, router],
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
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-3 sm:py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5 sm:flex-wrap">
        {/* Category chips — horizontal scroll on mobile, wrap on desktop */}
        <div
          role="group"
          aria-label="Filter by category"
          className="flex items-center gap-2 -mx-4 px-4 overflow-x-auto sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  "shrink-0 min-h-[40px] px-3 sm:px-4 font-mono font-bold text-[10px] tracking-[.20em] uppercase border motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
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

        <div className="flex items-center justify-between gap-3 sm:ml-auto sm:justify-end sm:gap-4">
          <label className="inline-flex items-center gap-2 min-w-0">
            <span className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-ash-600 shrink-0">
              Sort
            </span>
            <select
              value={activeSort}
              onChange={(e) => updateSort(e.target.value)}
              className="w-auto max-w-[180px] bg-bone-50 border border-combat-900 text-combat-900 font-mono font-bold text-[11px] tracking-[.20em] uppercase px-3 py-2 min-h-[40px] focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <span className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-ash-600 tabular-nums shrink-0">
            {resultsCount} {resultsCount === 1 ? "Product" : "Products"}
          </span>
        </div>
      </div>
    </div>
  );
}
