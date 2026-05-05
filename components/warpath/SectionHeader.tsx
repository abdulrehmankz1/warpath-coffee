"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  /**
   * Section identifier — accepts either "§ FLAGSHIP" or just "FLAGSHIP".
   * Anything before/around the word is stripped for the badge label.
   */
  sec: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

const cleanSecLabel = (sec: string) =>
  sec.replace(/^[§\s·\-]+/, "").replace(/[§\s·\-]+$/, "").trim();

export function SectionHeader({
  eyebrow,
  title,
  desc,
  sec,
  tone = "light",
  align = "left",
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      gsap.set(root.querySelectorAll("[data-anim]"), {
        clearProps: "all",
        opacity: 1,
        y: 0,
        x: 0,
        scaleX: 1,
        rotate: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const ease = "power3.out";
      const tl = gsap.timeline({
        defaults: { ease, duration: 0.85 },
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.from('[data-anim="badge"]', {
        opacity: 0,
        x: -16,
        duration: 0.55,
      });
      tl.from(
        '[data-anim="rule"]',
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.25",
      );
      tl.from(
        '[data-anim="eyebrow"]',
        { opacity: 0, x: -10, duration: 0.5 },
        "-=0.4",
      );

      const lines = root.querySelectorAll('[data-anim="line"]');
      if (lines.length) {
        tl.from(
          lines,
          {
            opacity: 0,
            y: 36,
            rotate: 1.5,
            stagger: 0.09,
            duration: 0.85,
          },
          "-=0.45",
        );
      } else {
        tl.from(
          '[data-anim="title"]',
          { opacity: 0, y: 28, duration: 0.85 },
          "-=0.45",
        );
      }
      tl.from(
        '[data-anim="desc"]',
        { opacity: 0, y: 16, duration: 0.6 },
        "-=0.55",
      );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const titleColor = tone === "dark" ? "text-cream-50" : "text-combat-900";
  const eyebrowColor = tone === "dark" ? "text-brass-400" : "text-brass-600";
  const descColor = tone === "dark" ? "text-cream-50/72" : "text-ash-600";

  // Badge palette (the new section name treatment)
  const badgeBg =
    tone === "dark"
      ? "bg-brass-500 text-combat-900"
      : "bg-combat-900 text-brass-400";
  const badgeAccent =
    tone === "dark" ? "text-combat-900/70" : "text-brass-400/70";

  const secLabel = cleanSecLabel(sec);

  const titleLines =
    typeof title === "string"
      ? title
          .split(/\n/)
          .map((ln, i) => (
            <span key={i} data-anim="line" className="block overflow-hidden">
              <span className="block">{ln}</span>
            </span>
          ))
      : (
          <span data-anim="title" className="block">
            {title}
          </span>
        );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative max-w-[760px] mb-10 sm:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {/* Section badge — brass ribbon + framed number tag */}
      <div
        data-anim="badge"
        className={cn(
          "flex w-fit items-stretch gap-1.5 sm:gap-2 mb-7 sm:mb-9",
          align === "center" && "mx-auto",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center min-w-[40px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase",
            tone === "dark" ? "bg-brass-500 text-combat-900" : "bg-brass-500 text-combat-900",
          )}
        >
          §
        </span>
        <span
          className={cn(
            "inline-flex items-center pl-3 pr-4 sm:pl-4 sm:pr-5 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase whitespace-nowrap",
            badgeBg,
          )}
        >
          {secLabel}
          <span className={cn("ml-3 sm:ml-4 text-[9px]", badgeAccent)}>
            ●
          </span>
        </span>
      </div>

      <div
        className={cn(
          "font-mono font-semibold text-[11px] tracking-[.28em] uppercase mb-5 sm:mb-6 flex w-fit items-center gap-3.5",
          eyebrowColor,
          align === "center" && "mx-auto",
        )}
      >
        <span
          data-anim="rule"
          className="w-10 h-px bg-current inline-block"
          aria-hidden="true"
        />
        <span data-anim="eyebrow">{eyebrow}</span>
      </div>

      <h2
        className={cn(
          "font-display font-black text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.024em] mb-6 sm:mb-7 uppercase pb-1",
          titleColor,
        )}
      >
        {titleLines}
      </h2>

      {desc && (
        <p
          data-anim="desc"
          className={cn(
            "font-body text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.65] max-w-[64ch]",
            descColor,
            align === "center" && "mx-auto",
          )}
        >
          {desc}
        </p>
      )}
    </div>
  );
}
