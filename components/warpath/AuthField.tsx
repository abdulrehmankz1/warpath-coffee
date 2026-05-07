"use client";

import { useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: ReactNode;
  /** Optional inline-end label slot (e.g. "Forgot password?" link) */
  endSlot?: ReactNode;
  required?: boolean;
  /** Show visibility toggle (only meaningful for type="password") */
  toggleVisibility?: boolean;
  error?: string | null;
};

export function AuthField({
  label,
  hint,
  endSlot,
  required,
  toggleVisibility = false,
  error,
  type = "text",
  className,
  ...rest
}: Props) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const realType =
    toggleVisibility && type === "password" && visible ? "text" : type;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400 inline-flex items-center gap-2"
        >
          {label}
          {required && (
            <span
              aria-hidden="true"
              className="border border-alert-red text-alert-red font-mono text-[8px] tracking-[.20em] px-1.5 py-[1px]"
            >
              REQ
            </span>
          )}
        </label>
        {endSlot}
      </div>

      <div className="relative">
        <input
          id={id}
          type={realType}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={errorId}
          className={cn(
            "w-full bg-bone-100 text-combat-900 placeholder:text-ash-500/70 font-mono text-[14px] sm:text-[15px] px-4 py-3.5 sm:py-4 border border-canvas-400 focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500/40 transition-colors",
            error && "!border-alert-red",
            toggleVisibility && type === "password" && "pr-12",
            className,
          )}
          {...rest}
        />
        {toggleVisibility && type === "password" && (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible((v) => !v)}
            className="absolute inset-y-0 right-0 w-12 inline-flex items-center justify-center text-ash-600 hover:text-combat-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brass-500"
          >
            {visible ? (
              <EyeOff size={16} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="font-mono text-[10px] tracking-[.18em] uppercase text-alert-red font-bold inline-flex items-center gap-1.5"
        >
          <span aria-hidden="true">×</span> ERR · {error}
        </p>
      ) : hint ? (
        <p className="font-mono text-[10px] tracking-[.16em] uppercase text-cream-50/50 font-semibold">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
