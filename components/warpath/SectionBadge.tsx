import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

type Props = {
  /** Symbol shown in the brass square (defaults to §) */
  symbol?: string;
  /** Section name (e.g. "FLAGSHIP", "OUR STORY") */
  label: string;
  /** Optional terminator dot color cue */
  showTerminator?: boolean;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
};

/**
 * Two-slab section identifier badge — brass `§` cap + dark/brass slab
 * with the section name and a terminator dot.
 *
 * Used at the top of every SectionHeader and inside the WelcomeModal,
 * AuthShell, and any landmark surface.
 */
export function SectionBadge({
  symbol = "§",
  label,
  showTerminator = true,
  tone = "light",
  align = "left",
  className,
}: Props) {
  const slabBg =
    tone === "dark"
      ? "bg-brass-500 text-combat-900"
      : "bg-combat-900 text-brass-400";
  const dotColor =
    tone === "dark" ? "text-combat-900/70" : "text-brass-400/70";

  return (
    <div
      className={cn(
        "flex w-fit items-stretch gap-1.5 sm:gap-2",
        align === "center" && "mx-auto",
        className,
      )}
      data-anim="badge"
    >
      <span
        aria-hidden="true"
        className="inline-flex items-center justify-center min-w-[40px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase bg-brass-500 text-combat-900"
      >
        {symbol}
      </span>
      <span
        className={cn(
          "inline-flex items-center pl-3 pr-4 sm:pl-4 sm:pr-5 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase whitespace-nowrap",
          slabBg,
        )}
      >
        {label}
        {showTerminator && (
          <span aria-hidden="true" className={cn("ml-3 sm:ml-4 text-[9px]", dotColor)}>
            ●
          </span>
        )}
      </span>
    </div>
  );
}
