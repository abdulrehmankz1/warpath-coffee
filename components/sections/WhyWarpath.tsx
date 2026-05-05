import Image from "next/image";
import { Star, Droplet, Repeat, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { Button } from "@/components/warpath/Button";
import { cn } from "@/lib/cn";
import { VALUE_PROPS } from "@/lib/data/warpath";

const icons = [Star, Droplet, Repeat];

export function WhyWarpath() {
  return (
    <section
      aria-labelledby="why-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[140px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow="Coffee with a Mission"
          sec="§ WHY"
          title={
            <span id="why-headline">
              Built for the cup that{" "}
              <em className="not-italic text-brass-500 normal-case">earns</em>{" "}
              daily duty.
            </span>
          }
          desc="Three things we don’t compromise on. Everything else is negotiable."
        />

        <div className="grid lg:grid-cols-[5fr_7fr] gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {/* Feature image panel */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden border border-combat-900">
              <Image
                src="/images/warpath/coffee-mission.webp"
                alt="Hand-roasted Warpath coffee beans"
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(11,14,12,.20) 0%, rgba(11,14,12,.35) 55%, rgba(11,14,12,.85) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Top-left tactical sticker */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 inline-flex items-center gap-2 bg-brass-500 text-combat-900 px-3 py-2 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase">
                <span className="w-1.5 h-1.5 bg-combat-900 rounded-full" aria-hidden="true" />
                Coffee · With a Mission
              </div>

              {/* Bottom credit block */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-cream-50">
                <div className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.28em] uppercase text-brass-400 mb-2">
                  § Field Note
                </div>
                <div className="font-display font-black uppercase tracking-[-0.018em] leading-[0.95] text-[clamp(1.4rem,2.2vw,2rem)] text-cream-50">
                  We don’t burn{" "}
                  <em className="not-italic text-brass-500 normal-case">
                    our beans.
                  </em>
                </div>
                <p className="mt-2 sm:mt-3 max-w-[42ch] text-[13px] sm:text-[14px] leading-[1.55] text-cream-50/75">
                  Custom-developed roast profiles, dialed in to keep the cup smooth — never bitter, never acidic.
                </p>
              </div>

              {/* Corner brackets */}
              <span className="absolute -top-px -left-px w-6 h-6 border-t-2 border-l-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -top-px -right-px w-6 h-6 border-t-2 border-r-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -bottom-px -left-px w-6 h-6 border-b-2 border-l-2 border-brass-500" aria-hidden="true" />
              <span className="absolute -bottom-px -right-px w-6 h-6 border-b-2 border-r-2 border-brass-500" aria-hidden="true" />
            </div>
          </div>

          {/* Indexed spec rows */}
          <div className="order-1 lg:order-2 flex flex-col">
            <ul className="border border-combat-900 bg-bone-50 divide-y divide-combat-900">
              {VALUE_PROPS.map((s, i) => {
                const Icon = icons[i] ?? Star;
                return (
                  <li
                    key={s.code}
                    className={cn(
                      "group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 lg:gap-8 px-5 sm:px-7 lg:px-8 py-6 sm:py-7 lg:py-8",
                      "motion-safe:transition-colors motion-safe:duration-300 hover:bg-bone-100 cursor-default",
                    )}
                  >
                    {/* Index + icon */}
                    <div className="flex items-center gap-4 sm:gap-5">
                      <div className="font-stencil font-black text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-combat-900/15 motion-safe:transition-colors motion-safe:duration-300 motion-safe:group-hover:text-brass-500 select-none">
                        0{i + 1}
                      </div>
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 bg-combat-900 text-brass-400 flex items-center justify-center motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:bg-brass-500 motion-safe:group-hover:text-combat-900 motion-safe:group-hover:rotate-[-8deg]"
                        aria-hidden="true"
                      >
                        <Icon size={20} strokeWidth={1.6} />
                      </div>
                    </div>

                    {/* Title + body */}
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] sm:text-[10px] font-bold tracking-[.22em] sm:tracking-[.24em] uppercase text-brass-700 mb-1.5">
                        SPEC · 0{i + 1} · {s.code}
                      </div>
                      <h3 className="font-stencil font-extrabold text-[18px] sm:text-[20px] lg:text-[22px] uppercase tracking-[0.01em] text-combat-900 leading-tight mb-1.5 sm:mb-2">
                        {s.title}
                      </h3>
                      <p className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] text-ash-700 leading-[1.55] sm:leading-[1.6] max-w-[52ch]">
                        {s.body}
                      </p>
                    </div>

                    {/* Trailing arrow */}
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.6}
                      className="hidden sm:block text-combat-900/30 motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:text-brass-500 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </li>
                );
              })}
            </ul>

            {/* Footer CTA bar */}
            <div className="mt-6 sm:mt-8 flex items-center justify-between gap-4 flex-wrap">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-ash-600 font-semibold">
                Veteran-Owned · Family-Operated · USA
              </p>
              <Button
                variant="ghost"
                size="base"
                href="/about-warpath-coffee"
                opCode="OP-WHY"
                data-event="why_learn_more"
              >
                The Full Mission →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
