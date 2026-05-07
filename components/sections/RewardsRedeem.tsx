import { Button } from "@/components/warpath/Button";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { REWARDS } from "@/lib/data/warpath";

export function RewardsRedeem() {
  return (
    <section
      aria-labelledby="rewards-redeem-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={REWARDS.redeem.eyebrow}
          sec="§ REDEEM"
          title={
            <span id="rewards-redeem-headline">
              {REWARDS.redeem.title}{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                {REWARDS.redeem.titleItalic}
              </em>
            </span>
          }
          desc="Stack points. Cash them in. Reward redemptions stack with most promo codes — they don't expire when you reach the next tier."
        />

        <div className="border border-combat-900 bg-bone-50 overflow-hidden">
          <div className="bg-combat-900 text-cream-50 px-5 sm:px-7 py-3.5 grid grid-cols-[100px_1fr_auto] sm:grid-cols-[140px_1fr_auto] gap-4 sm:gap-6 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.24em] uppercase">
            <span>Code</span>
            <span>Reward</span>
            <span>Points</span>
          </div>

          <ul className="divide-y divide-canvas-300">
            {REWARDS.redeem.options.map((opt) => (
              <li
                key={opt.code}
                className="px-5 sm:px-7 py-4 sm:py-5 grid grid-cols-[100px_1fr_auto] sm:grid-cols-[140px_1fr_auto] gap-4 sm:gap-6 items-center motion-safe:transition-colors motion-safe:duration-200 hover:bg-brass-500/[0.06]"
              >
                <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-700">
                  {opt.code}
                </span>
                <div>
                  <span className="font-display font-bold text-[15px] sm:text-[17px] text-combat-900 leading-snug block">
                    {opt.reward}
                  </span>
                  {"tag" in opt && opt.tag && (
                    <span className="inline-block mt-1.5 font-mono text-[9px] tracking-[.20em] uppercase font-bold text-combat-900 bg-brass-500 px-2 py-0.5">
                      {opt.tag}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-stencil font-black text-[20px] sm:text-[24px] text-brass-700 leading-none tracking-[.01em]">
                    {opt.points}
                  </span>
                  <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[.18em] text-ash-700 font-semibold mt-0.5">
                    pt
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-5 pt-7 border-t border-combat-900/15">
          <p className="font-mono text-[11px] sm:text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold leading-relaxed max-w-[44ch]">
            Redeem at checkout. One reward per order. Cancel anytime — your
            points stay yours.
          </p>
          <Button
            variant="brass"
            size="base"
            href="/signup"
            opCode="OP-JOIN"
            data-event="rewards_redeem_join"
          >
            Start Earning →
          </Button>
        </div>
      </div>
    </section>
  );
}
