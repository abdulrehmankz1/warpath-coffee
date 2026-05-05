import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Top label e.g. "INTAKE · OP-LOGIN · 001" */
  intakeLabel: string;
  /** Right-side label e.g. "SECURE · TLS" */
  metaRight?: string;
  /** Bottom-bar slot (e.g. cross-link) */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Reusable bordered "intake" card — header bar, body, optional foot bar.
 * Used by login, signup, modal, founder credentials, etc.
 */
export function IntakeCard({
  intakeLabel,
  metaRight = "SECURE · TLS",
  footer,
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "bg-combat-900/60 backdrop-blur-sm border border-brass-500/40 lg:border-brass-500",
        className,
      )}
    >
      {/* Header bar */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 px-5 sm:px-7 py-3 sm:py-3.5 bg-brass-500/[0.08] border-b border-dashed border-brass-500/40 font-mono text-[10px] sm:text-[11px] tracking-[.22em] sm:tracking-[.26em] uppercase text-brass-400 font-bold">
        <span className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-brass-500 before:rounded-full">
          {intakeLabel}
        </span>
        <span aria-hidden="true" className="text-cream-50/45 text-center hidden sm:block text-[9px]">
          ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
        </span>
        <span className="text-cream-50/55 text-[9px] tracking-[.18em]">{metaRight}</span>
      </div>

      <div className="px-5 sm:px-7 lg:px-9 py-7 sm:py-9 lg:py-10">{children}</div>

      {footer && (
        <div className="px-5 sm:px-7 lg:px-9 py-4 sm:py-5 border-t border-dashed border-brass-500/40 bg-black/20 flex items-center justify-between gap-4 flex-wrap">
          {footer}
        </div>
      )}
    </section>
  );
}
