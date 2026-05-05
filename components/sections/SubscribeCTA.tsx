import { Button } from "@/components/warpath/Button";
import { Chevron } from "@/components/warpath/Chevron";
import { AmmoStripe } from "@/components/warpath/AmmoStripe";
import { Check } from "lucide-react";
import { SUBSCRIBE } from "@/lib/data/warpath";

export function SubscribeCTA() {
  return (
    <section
      aria-labelledby="subscribe-headline"
      className="bg-combat-900 text-cream-50 relative overflow-hidden"
    >
      <AmmoStripe variant="brass" />
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "url('/images/warpath/coffee-mission.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(196,154,72,.10), transparent 60%), radial-gradient(ellipse at 20% 90%, rgba(74,46,30,.18), transparent 50%), linear-gradient(180deg, rgba(11,14,12,.65), rgba(11,14,12,.92))",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] py-16 sm:py-20 lg:py-[120px]">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-start">
          {/* Left: headline + benefits */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
              <span className="w-8 sm:w-12 h-px bg-brass-500" aria-hidden="true" />
              <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
                Subscribe For Special Offers
              </span>
            </div>
            <h2
              id="subscribe-headline"
              className="font-display font-black uppercase leading-[0.92] tracking-[-.025em] text-[clamp(2rem,5.5vw,5rem)] text-cream-50"
            >
              Auto-deliver.{" "}
              <em className="not-italic text-brass-500 normal-case tracking-[-.03em]">
                Never run dry.
              </em>
            </h2>
            <p className="mt-5 sm:mt-6 max-w-[52ch] text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.6] sm:leading-[1.65] text-cream-50/72">
              Pick a roast. Pick a cadence — every 2 weeks, monthly, every 45
              days, or every 2–3 months. We ship it on time, every time. Pause
              or swap by SMS.
            </p>

            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-3.5">
              {SUBSCRIBE.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 sm:gap-3.5">
                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 bg-brass-500 text-combat-900"
                    aria-hidden="true"
                  >
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-[14px] sm:text-[15px] text-cream-50/85 leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 sm:mt-10 flex items-center gap-4 sm:gap-5 flex-wrap">
              <Button
                variant="brass"
                size="lg"
                href={SUBSCRIBE.ctaHref}
                opCode="OP-SUB"
                data-event="subscribe_primary_cta"
              >
                Start Subscription
              </Button>
              <span className="font-mono text-[10px] tracking-[.20em] sm:tracking-[.22em] uppercase text-cream-50/55 font-semibold">
                Cancel anytime · No lock-in
              </span>
            </div>
          </div>

          {/* Right: cadence ladder */}
          <div className="border border-brass-500/40">
            <div className="bg-brass-500 text-combat-900 px-4 sm:px-6 py-3 font-mono font-bold text-[10px] tracking-[.24em] sm:tracking-[.28em] uppercase flex justify-between items-center">
              <span>Delivery Cadence</span>
              <span className="text-[9px]">
                {SUBSCRIBE.cadences.length.toString().padStart(2, "0")} OPTIONS
              </span>
            </div>

            {SUBSCRIBE.cadences.map((t, i) => (
              <div
                key={t.code}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 px-4 sm:px-6 py-4 sm:py-6 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:bg-brass-500/[0.12] motion-safe:hover:translate-x-1 cursor-pointer ${
                  i > 0 ? "border-t border-brass-500/20" : ""
                } ${t.highlight ? "bg-brass-500/[0.06]" : ""}`}
              >
                <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[60px] sm:min-w-[72px]">
                  <div className="flex items-center gap-1 sm:gap-1.5" aria-hidden="true">
                    {Array.from({ length: i + 1 }).map((_, j) => (
                      <Chevron key={j} size="lg" variant="brass" />
                    ))}
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[.20em] sm:tracking-[.22em] uppercase text-brass-400">
                    {t.code}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-stencil font-extrabold text-[18px] sm:text-[22px] lg:text-[24px] uppercase tracking-[.02em] text-cream-50 leading-none">
                    {t.label}
                    {t.highlight && (
                      <span className="ml-2 sm:ml-3 inline-block align-middle font-mono text-[8px] sm:text-[9px] tracking-[.20em] sm:tracking-[.22em] font-bold text-combat-900 bg-brass-500 px-1.5 sm:px-2 py-0.5 sm:py-1">
                        Most Picked
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-cream-50/65 mt-1 sm:mt-1.5 tracking-[.10em] uppercase font-semibold">
                    {t.note}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[8px] sm:text-[9px] text-cream-50/55 tracking-[.16em] sm:tracking-[.18em] uppercase font-semibold">
                    From
                  </div>
                  <div className="font-stencil font-black text-[18px] sm:text-[22px] text-brass-500 leading-none tracking-[.01em]">
                    $15.75
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AmmoStripe variant="brass" />
    </section>
  );
}
