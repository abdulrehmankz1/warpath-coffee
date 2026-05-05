"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "brass" | "ghost" | "primary" | "red";
type Size = "sm" | "base" | "lg";

const variants: Record<Variant, string> = {
  brass:
    "bg-brass-500 text-combat-900 hover:bg-combat-900 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]",
  primary:
    "bg-combat-900 text-bone-50 hover:bg-brass-500 hover:text-combat-900 hover:shadow-[inset_0_0_0_2px_var(--color-combat-900)]",
  ghost:
    "bg-transparent text-cream-50 shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:bg-brass-500 hover:text-combat-900",
  red: "bg-alert-red text-bone-50 hover:bg-alert-red-dark hover:shadow-[inset_0_0_0_2px_var(--color-brass-400)]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-3 min-h-[44px] text-[10px] tracking-[.20em] gap-2 pr-7",
  base: "px-7 py-3.5 min-h-[48px] text-[11px] tracking-[.22em] gap-3 pr-9",
  lg: "px-9 py-5 min-h-[56px] text-xs tracking-[.24em] gap-3 pr-10",
};

const blade =
  "[clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_50%,calc(100%_-_16px)_100%,0_100%)]";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/**
 * Real <button>-element variant of the brand blade-cut Button.
 * Use this inside <form>, modals, or any place that needs a true
 * button (Button.tsx renders an <a>).
 */
export const BladeButton = forwardRef<HTMLButtonElement, Props>(
  function BladeButton(
    { variant = "brass", size = "base", className, children, type = "button", ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "relative inline-flex items-center justify-center font-mono font-bold uppercase rounded-none border-0 cursor-pointer",
          "motion-safe:transition-[background-color,color,box-shadow,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "motion-safe:hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]",
          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
          "disabled:opacity-60 disabled:pointer-events-none",
          blade,
          variants[variant],
          sizes[size],
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
