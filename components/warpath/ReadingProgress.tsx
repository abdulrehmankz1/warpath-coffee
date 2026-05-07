"use client";

import { useEffect, useState } from "react";

/**
 * Slim reading-progress bar pinned under the header. Updates as the article
 * scrolls. Reset to 0 outside the article element.
 */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setPct(rect.top < 0 ? 100 : 0);
        return;
      }
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        totalHeight,
      );
      setPct((scrolled / totalHeight) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="fixed top-[64px] sm:top-[72px] left-0 right-0 z-40 h-[2px] bg-canvas-300/40 pointer-events-none"
    >
      <span
        className="block h-full bg-brass-500 motion-safe:transition-[width] motion-safe:duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
