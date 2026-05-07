import { SectionHeader } from "@/components/warpath/SectionHeader";
import { Button } from "@/components/warpath/Button";
import { REWARDS } from "@/lib/data/warpath";

export function RewardsFAQ() {
  return (
    <section
      aria-labelledby="rewards-faq-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[140px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow="Loyalty FAQ"
          sec="§ INTEL"
          title={
            <span id="rewards-faq-headline">
              Questions, before you{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                enlist.
              </em>
            </span>
          }
          desc="Five answers that cover what people actually ask before signing up."
        />

        <ul className="border border-combat-900 bg-bone-50 divide-y divide-combat-900">
          {REWARDS.faqs.map((f, i) => (
            <li key={f.q}>
              <details className="group">
                <summary
                  className="cursor-pointer list-none flex items-start gap-4 sm:gap-6 px-5 sm:px-7 py-5 sm:py-6 motion-safe:transition-colors motion-safe:duration-300 hover:bg-bone-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brass-500"
                  data-event="rewards_faq_toggle"
                >
                  <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-700 mt-1.5 w-10 sm:w-12 shrink-0">
                    Q · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-stencil font-extrabold text-[16px] sm:text-[18px] lg:text-[20px] uppercase tracking-[0.01em] text-combat-900 leading-tight flex-1">
                    {f.q}
                  </span>
                  <span
                    className="font-display font-black text-[24px] sm:text-[28px] leading-none text-brass-700 motion-safe:transition-transform motion-safe:duration-300 group-open:rotate-45 select-none mt-0.5"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="px-5 sm:px-7 pb-6 sm:pb-7">
                  <div className="ml-14 sm:ml-[72px] max-w-[60ch] text-[14px] sm:text-[15px] leading-[1.65] text-ash-700">
                    {f.a}
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>

        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-5 pt-8 border-t border-combat-900/15">
          <div>
            <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.24em] uppercase text-brass-700 mb-2">
              § Ready to Enlist
            </div>
            <div className="font-stencil font-extrabold text-[18px] sm:text-[20px] uppercase tracking-[0.01em] text-combat-900 leading-none">
              100 points the moment you sign up.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="brass"
              size="base"
              href="/signup"
              opCode="OP-JOIN"
              data-event="rewards_faq_join"
            >
              Join the Roster — Free
            </Button>
            <Button
              variant="ghost"
              size="base"
              href="/contact"
              data-event="rewards_faq_contact"
            >
              Ask a Question →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
