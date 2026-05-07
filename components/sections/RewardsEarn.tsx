import { SectionHeader } from "@/components/warpath/SectionHeader";
import { REWARDS } from "@/lib/data/warpath";

export function RewardsEarn() {
  return (
    <section
      id="earn"
      aria-labelledby="rewards-earn-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[140px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={REWARDS.earn.eyebrow}
          sec="§ MISSIONS"
          title={
            <span id="rewards-earn-headline">
              {REWARDS.earn.title}{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                {REWARDS.earn.titleItalic}
              </em>
            </span>
          }
          desc="Every action earns points automatically. No coupon codes, no waiting — credit lands in your account at order ship."
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REWARDS.earn.items.map((item) => (
            <li
              key={item.code}
              className="relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto]"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900"
                aria-hidden="true"
              />
              <div className="px-5 py-3 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase">
                <span className="text-brass-700">{item.code}</span>
                <span className="font-stencil font-black text-[18px] tracking-[.02em] text-brass-500 leading-none">
                  {item.value}
                </span>
              </div>
              <div className="px-5 sm:px-6 pt-6 pb-5">
                <h3 className="font-display font-black uppercase text-[20px] sm:text-[22px] leading-[1.1] tracking-[-.01em] text-combat-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-ash-700">
                  {item.body}
                </p>
              </div>
              <div className="px-5 sm:px-6 py-3 border-t border-canvas-300 bg-bone-100 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-ash-700 flex items-center justify-between">
                <span>Auto-credited</span>
                <span className="text-brass-700" aria-hidden="true">
                  +
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
