import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/warpath/Button";
import { Chevron } from "@/components/warpath/Chevron";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { REWARDS } from "@/lib/data/warpath";

export function RewardsTiers() {
  return (
    <section
      aria-labelledby="rewards-tiers-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow="Tier Ladder"
          sec="§ RANKS"
          title={
            <span id="rewards-tiers-headline">
              Three ranks.{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                One ladder.
              </em>
            </span>
          }
          desc="Every dollar you spend pushes you up the ladder. Higher rank — better point rate, free shipping, operator-only drops."
        />

        <ul className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {REWARDS.tiers.map((t) => {
            const isHighlight = "highlight" in t && t.highlight;
            return (
              <li
                key={t.code}
                className={cn(
                  "relative bg-bone-50 border grid grid-rows-[auto_auto_1fr_auto]",
                  isHighlight
                    ? "border-brass-500 border-2 lg:scale-[1.02]"
                    : "border-combat-900",
                )}
              >
                {isHighlight && (
                  <span
                    className="absolute -top-4 left-5 z-10 bg-brass-500 text-combat-900 px-3 py-1.5 font-mono font-bold text-[10px] tracking-[.22em] uppercase"
                    aria-label="Most picked tier"
                  >
                    Most Picked
                  </span>
                )}
                <span
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-[3px]",
                    isHighlight ? "bg-brass-500" : "bg-combat-900",
                  )}
                  aria-hidden="true"
                />

                {/* Crate header */}
                <div
                  className={cn(
                    "px-5 sm:px-6 py-3.5 border-b border-dashed flex items-center justify-between font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase",
                    isHighlight
                      ? "border-brass-500/50 text-brass-700"
                      : "border-canvas-300 text-brass-700",
                  )}
                >
                  <span>{t.code}</span>
                  <span className="text-ash-700 text-[9px]">
                    {t.threshold}
                  </span>
                </div>

                {/* Identity */}
                <div className="px-5 sm:px-7 pt-7 pb-5">
                  <div
                    className="flex items-center gap-1.5 mb-4"
                    aria-hidden="true"
                  >
                    {Array.from({ length: t.chevrons }).map((_, j) => (
                      <Chevron
                        key={j}
                        size="lg"
                        variant={isHighlight ? "brass" : "combat"}
                      />
                    ))}
                  </div>
                  <h3 className="font-display font-black text-[36px] sm:text-[42px] uppercase leading-none tracking-[-0.02em] text-combat-900">
                    {t.name}
                  </h3>
                  <div className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-ash-700 mt-3">
                    {t.threshold_short}
                  </div>
                </div>

                {/* Perks */}
                <ul className="px-5 sm:px-7 pb-6 space-y-3">
                  {t.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[13px] sm:text-[14px] text-combat-900 leading-snug"
                    >
                      <span
                        className={cn(
                          "shrink-0 mt-0.5 inline-flex items-center justify-center w-4 h-4",
                          isHighlight
                            ? "bg-brass-500 text-combat-900"
                            : "bg-combat-900 text-bone-50",
                        )}
                        aria-hidden="true"
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* Foot CTA */}
                <div
                  className={cn(
                    "px-5 sm:px-7 py-5 border-t flex items-center justify-between gap-4",
                    isHighlight
                      ? "bg-brass-500/[0.06] border-brass-500/40"
                      : "bg-bone-100 border-canvas-300",
                  )}
                >
                  <Button
                    variant={isHighlight ? "brass" : "primary"}
                    size="sm"
                    href={t.cta.href}
                    data-event="rewards_tier_cta"
                    data-event-tier={t.name.toLowerCase()}
                  >
                    {t.cta.label}
                  </Button>
                  <span className="font-mono text-[9px] tracking-[.20em] uppercase font-bold text-brass-700">
                    {t.code.split(" · ")[1]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
