"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import { formatUsd } from "@/lib/data/warpath";

export type VariantOption = {
  value: string;
  label: string;
  subLabel?: string;
  price?: number;
  unavailable?: boolean;
};

type Props = {
  groupLabel: string;
  options: VariantOption[];
  selected: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
  className?: string;
};

export function VariantSelector({
  groupLabel,
  options,
  selected,
  onChange,
  columns = 2,
  className,
}: Props) {
  const id = useId();
  const colsCls =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : columns === 3
        ? "grid-cols-3"
        : "grid-cols-2";

  return (
    <fieldset className={cn("grid gap-2", className)}>
      <legend className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700 mb-1">
        {groupLabel}
      </legend>
      <div className={cn("grid gap-2 sm:gap-3", colsCls)}>
        {options.map((opt) => {
          const active = selected === opt.value;
          const inputId = `${id}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              className={cn(
                "relative cursor-pointer block border px-3 py-3 sm:py-3.5 motion-safe:transition-colors motion-safe:duration-200 min-h-[44px]",
                active
                  ? "border-combat-900 bg-combat-900 text-cream-50 shadow-[inset_0_0_0_2px_var(--color-brass-500)]"
                  : "border-combat-900 bg-bone-50 text-combat-900 hover:bg-bone-100",
                opt.unavailable && "opacity-60 pointer-events-none",
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={id}
                value={opt.value}
                checked={active}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.02em] leading-none">
                {opt.label}
              </div>
              {(opt.subLabel || opt.price !== undefined) && (
                <div
                  className={cn(
                    "mt-1.5 font-mono text-[10px] tracking-[.16em] uppercase font-semibold",
                    active ? "text-brass-400" : "text-ash-600",
                  )}
                >
                  {opt.subLabel}
                  {opt.price !== undefined && (
                    <>
                      {opt.subLabel ? " · " : ""}
                      {formatUsd(opt.price)}
                    </>
                  )}
                </div>
              )}
              {opt.unavailable && (
                <div className="mt-1.5 font-mono text-[9px] tracking-[.20em] uppercase text-alert-red font-bold">
                  Out of Stock
                </div>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
