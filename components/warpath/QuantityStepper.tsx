"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
  disabled?: boolean;
  size?: "sm" | "base";
  className?: string;
};

export function QuantityStepper({
  value,
  min = 1,
  max = 12,
  onChange,
  disabled,
  size = "base",
  className,
}: Props) {
  const dim = size === "sm" ? "w-9 h-9 sm:w-10 sm:h-10" : "w-11 h-11";
  const fontSize = size === "sm" ? "text-[14px]" : "text-[16px]";

  const step = (delta: number) => {
    if (disabled) return;
    const next = Math.min(max, Math.max(min, value + delta));
    if (next !== value) onChange(next);
  };

  return (
    <div
      className={cn(
        "inline-flex items-stretch border border-combat-900 bg-bone-50 select-none",
        disabled && "opacity-60 pointer-events-none",
        className,
      )}
      role="group"
      aria-label="Quantity"
    >
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          "inline-flex items-center justify-center text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500 disabled:opacity-40 disabled:pointer-events-none border-r border-combat-900",
          dim,
        )}
      >
        <Minus size={14} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        className={cn(
          "min-w-[44px] inline-flex items-center justify-center font-mono font-bold tabular-nums text-combat-900 bg-bone-100 border-r border-combat-900",
          fontSize,
        )}
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          "inline-flex items-center justify-center text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500 disabled:opacity-40 disabled:pointer-events-none",
          dim,
        )}
      >
        <Plus size={14} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );
}
