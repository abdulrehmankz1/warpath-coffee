"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  name: string;
  required?: boolean;
  defaultValue?: number;
};

const LABELS = ["Poor", "Fair", "Good", "Great", "Excellent"];

export function StarRatingInput({ id, name, required, defaultValue = 0 }: Props) {
  const [value, setValue] = useState<number>(defaultValue);
  const [hover, setHover] = useState<number>(0);

  const display = hover || value;

  return (
    <div>
      <div
        className="flex items-center gap-1.5"
        role="radiogroup"
        aria-required={required}
        aria-label="Rating, 1 to 5 stars"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = n <= display;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={value === n}
              aria-label={`${n} star${n === 1 ? "" : "s"} — ${LABELS[n - 1]}`}
              onClick={() => setValue(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onFocus={() => setHover(n)}
              onBlur={() => setHover(0)}
              className="min-w-[44px] min-h-[44px] -ml-1 first:ml-0 inline-flex items-center justify-center text-brass-500 hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 motion-safe:transition-colors motion-safe:duration-150"
            >
              <Star
                size={28}
                strokeWidth={1.6}
                className={cn(active ? "fill-brass-500" : "fill-transparent")}
                aria-hidden="true"
              />
            </button>
          );
        })}
        <span className="ml-2 font-mono font-bold text-[11px] tracking-[.18em] uppercase text-brass-700 min-w-[7ch]">
          {display ? `${display} · ${LABELS[display - 1]}` : "Tap a star"}
        </span>
      </div>
      <input
        id={id}
        type="hidden"
        name={name}
        value={value || ""}
        required={required}
      />
    </div>
  );
}
