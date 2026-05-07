import Image from "next/image";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { ABOUT } from "@/lib/data/warpath";

export function AboutMission() {
  return (
    <section
      aria-labelledby="about-mission-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[140px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <div className="grid lg:grid-cols-[6fr_6fr] gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Image */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative aspect-[4/5] max-w-[460px] mx-auto overflow-hidden border border-combat-900">
              <Image
                src={ABOUT.mission.image}
                alt={ABOUT.mission.imageAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 46vw"
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(11,14,12,.55) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 font-mono text-[9px] tracking-[.20em] uppercase font-bold text-brass-400 bg-black/55 px-2 py-1 border border-brass-500/40">
                FR · 03 · B1
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-cream-50">
                <div className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.28em] uppercase text-brass-400 mb-2">
                  § Mission Note
                </div>
                <div className="font-display font-black uppercase tracking-[-0.018em] leading-[0.95] text-[clamp(1.25rem,2.4vw,1.85rem)] text-cream-50">
                  Drink it{" "}
                  <em className="not-italic text-brass-500">black, be healthy.</em>
                </div>
              </div>
            </div>
            <span
              className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-combat-900"
              aria-hidden="true"
            />
            <span
              className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-combat-900"
              aria-hidden="true"
            />
          </div>

          {/* Copy — verbatim live-site mission */}
          <div className="order-1 lg:order-2">
            <SectionHeader
              eyebrow={ABOUT.mission.eyebrow}
              sec="§ MISSION"
              title={
                <span id="about-mission-headline">
                  Taste is{" "}
                  <em className="not-italic text-brass-500 tracking-[-.025em]">#1.</em>
                </span>
              }
              desc={ABOUT.mission.body}
              className="!mb-7 sm:!mb-8"
            />

            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-ash-700 max-w-[58ch]">
              {ABOUT.mission.paragraph}
            </p>

            <ul className="mt-8 sm:mt-10 grid grid-cols-3 border border-combat-900 bg-bone-50">
              {ABOUT.mission.pulls.map((p, i) => (
                <li
                  key={p.k}
                  className={`group px-4 py-5 sm:px-5 sm:py-6 ${
                    i < ABOUT.mission.pulls.length - 1
                      ? "border-r border-combat-900"
                      : ""
                  } motion-safe:transition-colors motion-safe:duration-300 hover:bg-bone-100`}
                >
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-700 font-bold mb-2">
                    {p.k}
                  </div>
                  <div className="font-stencil font-black text-[clamp(1.25rem,2.6vw,1.75rem)] uppercase leading-none tracking-[.01em] text-combat-900">
                    {p.v}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] tracking-[.16em] uppercase text-ash-600 mt-2 font-semibold">
                    {p.sub}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
