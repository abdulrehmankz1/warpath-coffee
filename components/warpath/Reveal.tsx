"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/cn";

type Direction = "up" | "left" | "right" | "fade" | "scale";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Fade-in offset axis */
  direction?: Direction;
  /** Delay (ms) — useful for staggered children */
  delay?: number;
  /** IntersectionObserver rootMargin — defaults to triggering ~12% before fully visible */
  rootMargin?: string;
  /** Trigger only once (default true) */
  once?: boolean;
};

const directionMap: Record<Direction, string> = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
  fade: "translate-y-0",
  scale: "scale-95",
};

export function Reveal({
  children,
  as: Tag = "div",
  className,
  direction = "up",
  delay = 0,
  rootMargin = "0px 0px -12% 0px",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // Start hidden ONLY after the client confirms motion is allowed and IO is supported.
  // This guarantees content is visible during SSR, no-JS, reduced-motion, screenshot tools,
  // and SEO crawlers — instead of trapping it at opacity:0 forever.
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      setArmed(false);
      return;
    }
    // Arm: hide and animate in on intersect
    setArmed(true);
    setVisible(false);
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { rootMargin, threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, once]);

  const animate = armed && !visible;

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: visible && delay ? `${delay}ms` : undefined }}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "motion-safe:will-change-transform",
        animate
          ? `opacity-0 ${directionMap[direction]}`
          : "opacity-100 translate-x-0 translate-y-0 scale-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
