"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { ArrowRight, Clock, Search, TrendingUp, X } from "lucide-react";
import { useSearch } from "@/lib/search/SearchProvider";
import { formatUsd } from "@/lib/data/warpath";
import { cn } from "@/lib/cn";

const QUICK_LINKS = [
  { l: "Mariner’s Blend", q: "mariner" },
  { l: "Decaf", q: "decaf" },
  { l: "K-Cups", q: "k-cups" },
  { l: "Mugs", q: "mug" },
  { l: "Holiday", q: "holiday" },
];

export function SearchDrawer() {
  const {
    isOpen,
    closeSearch,
    query,
    setQuery,
    results,
    recent,
    pushRecent,
    clearRecent,
    suggested,
  } = useSearch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Two-stage visibility: `mounted` keeps the DOM around long enough to play
  // the close transition; `visible` drives the actual opacity/transform state.
  const [mounted, setMounted] = useState(isOpen);
  const [visible, setVisible] = useState(false);
  const EXIT_MS = 240;

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Next frame so the initial closed styles paint before we transition in.
      const id = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(id);
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  // Focus mgmt + escape
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = (document.activeElement as HTMLElement) ?? null;
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, closeSearch]);

  // Reset active index when results change
  useEffect(() => setActiveIndex(0), [results.length, query]);

  if (!mounted) return null;

  const hasQuery = query.trim().length > 0;
  const showResults = hasQuery && results.length > 0;
  const showEmptyResults = hasQuery && results.length === 0;
  const list = showResults ? results : showEmptyResults ? [] : suggested;

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (!list.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % list.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + list.length) % list.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = list[activeIndex];
      if (target) {
        if (hasQuery) pushRecent(query);
        closeSearch();
        window.location.href = target.href;
      }
    }
  };

  const recentOrEmpty = recent.length > 0 && !hasQuery;

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Scrim — fades both in and out */}
      <button
        type="button"
        aria-label="Close search"
        onClick={closeSearch}
        className={cn(
          "absolute inset-0 bg-combat-900/70 backdrop-blur-[2px] motion-safe:transition-opacity motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brass-500",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Top sheet — slides in/out smoothly */}
      <aside
        className={cn(
          "absolute top-0 left-0 right-0 mx-auto max-w-[860px] bg-bone-50 text-combat-900",
          "flex flex-col border-x border-b border-combat-900 shadow-[0_18px_48px_rgba(11,14,12,.45)]",
          "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6",
        )}
      >
        {/* Header */}
        <div className="bg-combat-900 text-cream-50 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-brass-500/30 flex items-center gap-3">
          <Search
            size={20}
            strokeWidth={1.6}
            className="text-brass-400 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <div className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.28em] uppercase text-brass-400 leading-none">
              § Search Roster
            </div>
            <h2
              id={titleId}
              className="font-display font-black text-[16px] sm:text-[18px] uppercase tracking-[.02em] leading-none mt-1.5"
            >
              Find your roast
            </h2>
          </div>
          <span
            className="ml-auto hidden sm:inline-flex items-center gap-1 font-mono font-bold text-[9px] tracking-[.20em] uppercase text-brass-400/70"
            aria-hidden="true"
          >
            <kbd className="px-1.5 py-0.5 border border-brass-500/40 text-[9px]">
              ESC
            </kbd>
            to close
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="ml-2 sm:ml-0 min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          >
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {/* Input row */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-canvas-300 bg-bone-100">
          <label htmlFor="wp-search-input" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <Search
              size={18}
              strokeWidth={1.6}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brass-700 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id="wp-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search Mariner’s Blend, Decaf, K-Cups, Mugs…"
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-bone-50 border border-combat-900 pl-11 pr-12 py-3 sm:py-3.5 font-mono text-[14px] sm:text-[15px] text-combat-900 placeholder:text-ash-500 focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
              data-event="search_input"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[36px] min-h-[36px] inline-flex items-center justify-center text-ash-700 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                <X size={16} strokeWidth={1.8} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Quick chips */}
          {!hasQuery && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-700">
                Quick ·
              </span>
              {QUICK_LINKS.map((q) => (
                <button
                  key={q.q}
                  type="button"
                  onClick={() => {
                    setQuery(q.q);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 font-mono font-bold text-[10px] tracking-[.20em] uppercase border border-combat-900/30 bg-bone-50 text-combat-900 hover:bg-combat-900 hover:text-brass-400 hover:border-combat-900 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                  data-event="search_quick"
                  data-event-q={q.q}
                >
                  {q.l}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {/* Recents row */}
          {recentOrEmpty && (
            <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-700">
                <Clock size={12} strokeWidth={1.8} aria-hidden="true" />
                Recent searches
              </div>
              <button
                type="button"
                onClick={clearRecent}
                className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-ash-700 hover:text-alert-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                Clear
              </button>
            </div>
          )}
          {recentOrEmpty && (
            <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2">
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setQuery(r);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-1 font-mono text-[11px] text-combat-900 bg-bone-100 border border-canvas-400 hover:bg-bone-200 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Section label for non-query results */}
          {!hasQuery && (
            <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center gap-2 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-700 border-t border-canvas-300/70">
              <TrendingUp size={12} strokeWidth={1.8} aria-hidden="true" />
              Top picks · best sellers
            </div>
          )}

          {/* No matches */}
          {showEmptyResults && (
            <div className="px-4 sm:px-6 py-12 text-center">
              <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
                Status · No Match
              </div>
              <p className="font-display font-black uppercase text-[clamp(1.25rem,4vw,1.75rem)] leading-[1.05] tracking-[-0.02em] text-combat-900 max-w-[28ch] mx-auto">
                Nothing fits “{query}.”
              </p>
              <p className="mt-4 text-[14px] text-ash-700 max-w-[40ch] mx-auto leading-snug">
                Try a different keyword — or browse the full arsenal.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {QUICK_LINKS.slice(0, 3).map((q) => (
                  <button
                    key={q.q}
                    type="button"
                    onClick={() => setQuery(q.q)}
                    className="px-3 py-2 font-mono font-bold text-[10px] tracking-[.20em] uppercase border border-combat-900 bg-bone-50 text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200"
                  >
                    {q.l}
                  </button>
                ))}
                <Link
                  href="/shop"
                  onClick={closeSearch}
                  className="px-3 py-2 font-mono font-bold text-[10px] tracking-[.20em] uppercase border border-brass-500 bg-brass-500 text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200"
                >
                  Shop All →
                </Link>
              </div>
            </div>
          )}

          {/* Results / suggestions list */}
          {list.length > 0 && (
            <ul
              role="listbox"
              aria-label={hasQuery ? "Search results" : "Top picks"}
              className="divide-y divide-canvas-300"
            >
              {list.map((p, i) => {
                const isActive = i === activeIndex;
                return (
                  <li key={p.slug}>
                    <Link
                      href={p.href}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        if (hasQuery) pushRecent(query);
                        closeSearch();
                      }}
                      className={cn(
                        "group grid grid-cols-[64px_1fr_auto] sm:grid-cols-[72px_1fr_auto] items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-3.5 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brass-500",
                        isActive
                          ? "bg-brass-500/[0.10]"
                          : "bg-bone-50 hover:bg-bone-100",
                      )}
                      data-event="search_result_click"
                      data-event-slug={p.slug}
                    >
                      <div className="relative aspect-square block bg-bone-200 border border-combat-900/40 overflow-hidden">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="72px"
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-[9px] tracking-[.20em] uppercase text-brass-700">
                            {p.category}
                          </span>
                          {p.outOfStock && (
                            <span className="font-mono font-bold text-[9px] tracking-[.20em] uppercase text-alert-red border border-alert-red px-1.5 py-0.5">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <div className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900 line-clamp-1 group-hover:text-brass-700 motion-safe:transition-colors">
                          {p.name}
                        </div>
                        {p.rating && (
                          <div className="mt-1 font-mono text-[10px] tracking-[.16em] uppercase text-ash-700 font-semibold">
                            ★ {p.rating.toFixed(1)} ·{" "}
                            {p.reviews?.toLocaleString() ?? 0} reviews
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-stencil font-black text-[15px] sm:text-[17px] leading-none text-combat-900 tabular-nums">
                          {formatUsd(p.priceUsd)}
                        </div>
                        <ArrowRight
                          size={14}
                          strokeWidth={2}
                          className="ml-auto mt-1.5 text-brass-700 motion-safe:transition-transform motion-safe:duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Foot */}
        <div className="border-t border-combat-900 bg-combat-900 text-cream-50 px-4 sm:px-6 py-3 flex items-center justify-between font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase">
          <span className="text-brass-400">
            {hasQuery
              ? `${results.length} match${results.length === 1 ? "" : "es"}`
              : `${suggested.length} top picks`}
          </span>
          <Link
            href="/shop"
            onClick={closeSearch}
            className="text-cream-50 hover:text-brass-400 motion-safe:transition-colors flex items-center gap-1"
          >
            Browse All
            <ArrowRight size={12} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </aside>
    </div>
  );
}
