import { cn } from "@/lib/cn";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "brass" | "ghost" | "red";
type Size = "sm" | "base" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  size?: Size;
  opCode?: string;
  children: ReactNode;
};

const bladeClip =
  "[clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_50%,calc(100%_-_16px)_100%,0_100%)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-combat-900 text-bone-50 hover:bg-brass-500 hover:text-combat-900 hover:shadow-[inset_0_0_0_2px_var(--color-combat-900)]",
  brass:
    "bg-brass-500 text-combat-900 hover:bg-combat-900 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]",
  ghost:
    "bg-transparent text-combat-900 shadow-[inset_0_0_0_1.5px_var(--color-combat-900)] hover:bg-combat-900 hover:text-bone-50 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]",
  red: "bg-alert-red text-bone-50 hover:bg-alert-red-dark hover:shadow-[inset_0_0_0_2px_var(--color-brass-400)] [animation:pulseRed_2.4s_ease-in-out_infinite]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-3.5 min-h-[44px] text-[10px] tracking-[.20em] gap-2",
  base: "px-8 py-4 min-h-[48px] text-[11px] tracking-[.22em] gap-3",
  lg: "px-10 py-5 min-h-[56px] text-xs tracking-[.24em] gap-3",
};

export function Button({
  variant = "primary",
  size = "base",
  opCode,
  className,
  children,
  href = "#",
  ...rest
}: ButtonProps) {
  return (
    <span className="relative inline-block">
      {opCode && (
        <span className="absolute -top-2.5 left-5 z-10 bg-bone-100 px-1.5 font-mono text-[8px] font-bold tracking-[.22em] text-brass-700 uppercase pointer-events-none">
          {opCode}
        </span>
      )}
      <a
        href={href}
        className={cn(
          "inline-flex items-center justify-center font-mono font-bold uppercase rounded-none border-0 cursor-pointer",
          "transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
          "motion-safe:hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]",
          "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
          "pr-8",
          bladeClip,
          variants[variant],
          sizes[size],
          className
        )}
        {...rest}
      >
        {children}
      </a>
    </span>
  );
}
