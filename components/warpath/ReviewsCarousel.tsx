"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { REVIEWS } from "@/lib/data/warpath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AUTOPLAY_MS = 5000;

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || "")
    .join("") || "VB";

const palettes = [
  "bg-combat-900 text-brass-400",
  "bg-brass-500 text-combat-900",
  "bg-olive-600 text-bone-50",
];

/** How many slides are visible per breakpoint. */
function useSlidesPerView() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 3;
      if (w >= 768) return 2;
      return 1;
    };
    const update = () => setN(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

export function ReviewsCarousel() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const id = useId();

  const slidesPerView = useSlidesPerView();
  const total = REVIEWS.length;
  const maxIndex = Math.max(0, total - slidesPerView);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Drag state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    moved: false,
    pointerId: 0,
    width: 0,
  });

  // Track measured viewport width for translate math
  const [viewportWidth, setViewportWidth] = useState(0);
  useLayoutEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ro = new ResizeObserver(() => setViewportWidth(vp.clientWidth));
    ro.observe(vp);
    setViewportWidth(vp.clientWidth);
    return () => ro.disconnect();
  }, []);

  // Reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Clamp active index when slidesPerView changes
  useEffect(() => {
    setActive((a) => Math.min(a, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = ((i % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      setActive(clamped);
    },
    [maxIndex],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Autoplay
  useEffect(() => {
    if (reducedMotion || paused || isDragging || maxIndex === 0) return;
    const id = window.setInterval(() => {
      setActive((a) => (a >= maxIndex ? 0 : a + 1));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, isDragging, maxIndex]);

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setPaused(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Pointer drag handlers (mouse + touch + pen)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const vp = viewportRef.current;
    if (!vp) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
      pointerId: e.pointerId,
      width: vp.clientWidth,
    };
    vp.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
    if (!d.moved && Math.abs(dy) > Math.abs(dx) * 1.4) {
      // Vertical scroll intent — release the carousel
      d.active = false;
      setIsDragging(false);
      return;
    }
    d.moved = true;
    setDragOffset(dx);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const vp = viewportRef.current;
    if (vp && vp.hasPointerCapture(e.pointerId)) {
      vp.releasePointerCapture(e.pointerId);
    }
    const slideW = d.width / slidesPerView;
    const ratio = dragOffset / slideW;
    let delta = 0;
    if (Math.abs(ratio) > 0.18) {
      delta = ratio > 0 ? -1 : 1;
    }
    d.active = false;
    setIsDragging(false);
    setDragOffset(0);
    if (delta !== 0) {
      goTo(active + delta);
    }
  };

  // Suppress click after drag
  const onClickCapture = (e: React.MouseEvent<HTMLUListElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  // GSAP entrance for cards + stat strip
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = sectionRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll("[data-rev-card]"), {
        opacity: 0,
        y: 36,
        rotate: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      gsap.from(root.querySelectorAll("[data-rev-stat]"), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Compute translate
  const slideWidth = viewportWidth / slidesPerView;
  const translateX = -active * slideWidth + (isDragging ? dragOffset : 0);
  const trackStyle: React.CSSProperties = useMemo(
    () => ({
      transform: `translate3d(${translateX}px, 0, 0)`,
      transition:
        isDragging || reducedMotion
          ? "none"
          : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
    }),
    [translateX, isDragging, reducedMotion],
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      onKeyDown={onKeyDown}
    >
      {/* Track viewport — drag receives pointer events here */}
      <div className="relative">
        <div
          ref={viewportRef}
          className={cn(
            "overflow-hidden touch-pan-y select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onPointerLeave={(e) => {
            if (dragRef.current.active) finishDrag(e);
          }}
        >
          <ul
            ref={trackRef}
            className="flex"
            style={trackStyle}
            onClickCapture={onClickCapture}
            aria-live="polite"
          >
            {REVIEWS.map((row, i) => (
              <li
                key={row.code}
                data-rev-card
                id={`${id}-slide-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${i + 1} of ${total}`}
                aria-hidden={
                  i < active || i >= active + slidesPerView ? "true" : "false"
                }
                className="shrink-0 px-2.5 sm:px-3 lg:px-3.5"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <article className="wp-card-hover relative h-full bg-bone-50 border border-combat-900 p-5 sm:p-6 lg:p-7 flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-dashed border-canvas-300">
                    <span className="font-mono text-[9px] tracking-[.22em] uppercase text-brass-700 font-bold">
                      {row.code}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[.20em] uppercase text-olive-600 font-bold">
                      <span
                        className="w-1.5 h-1.5 bg-olive-600 rotate-45 inline-block"
                        aria-hidden="true"
                      />
                      Verified Buyer
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-0.5 text-brass-500 mb-4"
                    aria-label="5 out of 5 stars"
                  >
                    {[0, 1, 2, 3, 4].map((j) => (
                      <Star
                        key={j}
                        size={16}
                        strokeWidth={1.4}
                        className="fill-brass-500"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1 font-display font-bold text-[clamp(1.05rem,1.7vw,1.4rem)] leading-[1.35] text-combat-900 tracking-[-.012em]">
                    <span
                      aria-hidden="true"
                      className="font-italic italic text-brass-500 text-3xl leading-none mr-1 align-top"
                    >
                      “
                    </span>
                    {row.quote}
                  </blockquote>

                  <div className="mt-5 sm:mt-6 pt-5 border-t border-canvas-300 flex items-center gap-4">
                    <div
                      className={cn(
                        "w-11 h-11 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center font-stencil font-extrabold text-base",
                        palettes[i % palettes.length],
                      )}
                      aria-hidden="true"
                    >
                      {initials(row.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-stencil font-bold text-[14px] sm:text-[15px] uppercase tracking-[.02em] text-combat-900 leading-tight truncate">
                        {row.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold truncate">
                        {row.role}
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        {/* Edge fades */}
        <div
          className="hidden md:block absolute top-0 left-0 bottom-0 w-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(241,234,218,1) 0%, rgba(241,234,218,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className="hidden md:block absolute top-0 right-0 bottom-0 w-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(241,234,218,1) 0%, rgba(241,234,218,0) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Overlay arrows (desktop) */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          disabled={active === 0}
          className={cn(
            "hidden md:inline-flex absolute top-1/2 -translate-y-1/2 left-2 lg:-left-5 z-10 w-11 h-11 lg:w-12 lg:h-12 items-center justify-center",
            "border border-combat-900 bg-bone-50 text-combat-900 shadow-[0_8px_18px_rgba(11,14,12,.18)]",
            "hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
            "disabled:opacity-40 disabled:pointer-events-none",
          )}
        >
          <ChevronLeft size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          disabled={active >= maxIndex}
          className={cn(
            "hidden md:inline-flex absolute top-1/2 -translate-y-1/2 right-2 lg:-right-5 z-10 w-11 h-11 lg:w-12 lg:h-12 items-center justify-center",
            "border border-combat-900 bg-combat-900 text-brass-400 shadow-[0_8px_18px_rgba(11,14,12,.28)]",
            "hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
            "disabled:opacity-40 disabled:pointer-events-none",
          )}
        >
          <ChevronRight size={20} strokeWidth={1.6} aria-hidden="true" />
        </button>
      </div>

      {/* Below-track controls */}
      <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4 flex-wrap">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label={`Testimonials, ${maxIndex + 1} pages`}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`${id}-slide-${i}`}
              aria-label={`Go to page ${i + 1}`}
              onClick={() => goTo(i)}
              className="min-w-[28px] min-h-[28px] inline-flex items-center justify-center motion-safe:transition-all motion-safe:duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
            >
              <span
                className={cn(
                  "block transition-all duration-300",
                  active === i
                    ? "w-6 h-1 bg-brass-500"
                    : "w-2 h-2 bg-combat-900/30 hover:bg-combat-900/50",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <span
            className="font-mono text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-ash-600 font-bold tabular-nums"
            aria-live="polite"
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(maxIndex + 1).padStart(2, "0")}
          </span>

          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
              aria-pressed={paused}
              className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center border border-combat-900 bg-bone-50 text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
            >
              {paused ? (
                <Play
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="ml-0.5"
                />
              ) : (
                <Pause size={14} strokeWidth={1.8} aria-hidden="true" />
              )}
            </button>
          )}

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              disabled={active === 0}
              className="w-11 h-11 inline-flex items-center justify-center border border-combat-900 bg-bone-50 text-combat-900 motion-safe:transition-colors motion-safe:duration-200 hover:bg-combat-900 hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              disabled={active >= maxIndex}
              className="w-11 h-11 inline-flex items-center justify-center border border-combat-900 bg-combat-900 text-brass-400 motion-safe:transition-colors motion-safe:duration-200 hover:bg-brass-500 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
