import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/warpath/Button";
import { Coords } from "@/components/warpath/Coords";
import { CONTACT } from "@/lib/data/warpath";

const ICONS = {
  "OP · EMAIL": Mail,
  "OP · PHONE": Phone,
  "OP · MAIL": MapPin,
} as const;

export function ContactHero() {
  return (
    <section
      className="relative bg-combat-900 text-cream-50 overflow-hidden"
      aria-labelledby="contact-hero-headline"
    >
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="font-display font-black text-[120px] sm:text-[160px] lg:text-[200px] leading-[0.8] tracking-[-.04em] uppercase whitespace-nowrap text-brass-500/[0.05] flex motion-safe:animate-[marquee_60s_linear_infinite] gap-16">
          <span>
            CONTACT WARPATH ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              real humans
            </em>{" "}
            · 09–17 MST ·
          </span>
          <span>
            CONTACT WARPATH ·{" "}
            <em className="not-italic font-normal text-brass-500/[0.18]">
              real humans
            </em>{" "}
            · 09–17 MST ·
          </span>
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 20%, rgba(196,154,72,.10), transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(74,46,30,.20), transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-t-[3px] border-l-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 border-b-[3px] border-r-[3px] border-brass-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] pt-10 sm:pt-14 lg:pt-20 pb-16 lg:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 sm:mb-7 font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-400/80"
        >
          <a
            href="/"
            className="hover:text-brass-400 motion-safe:transition-colors"
          >
            Home
          </a>
          <span className="mx-2 text-brass-500/60" aria-hidden="true">
            /
          </span>
          <span className="text-cream-50/80">Contact</span>
        </nav>

        <div className="motion-safe:[animation:wp-fade-up_900ms_var(--ease-out-warpath)_both] max-w-[60rem]">
          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
            <span className="w-8 sm:w-12 h-px bg-brass-500" aria-hidden="true" />
            <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
              {CONTACT.hero.eyebrow}
            </span>
          </div>

          <h1
            id="contact-hero-headline"
            className="font-display font-black uppercase leading-[1.02] sm:leading-[1.0] tracking-[-0.035em] text-[clamp(2.5rem,9vw,7.5rem)] text-cream-50"
          >
            <span className="block">{CONTACT.hero.headlinePrimary}</span>
            <span className="block">
              <span className="text-brass-500 tracking-[-0.045em] leading-[1.0] inline-block">
                {CONTACT.hero.headlineItalic}
              </span>
            </span>
          </h1>

          <p className="mt-4 sm:mt-5 font-body font-medium text-brass-300/90 text-[clamp(1.05rem,2.2vw,1.75rem)] leading-[1.35] tracking-[-0.005em] max-w-[36ch]">
            {CONTACT.hero.tagline}
          </p>

          <p className="mt-5 sm:mt-6 max-w-[60ch] text-[16px] sm:text-[16px] lg:text-[17px] leading-[1.65] text-cream-50/72">
            {CONTACT.hero.subhead}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            <Button
              variant="brass"
              size="lg"
              href="#intake"
              opCode="OP-MSG"
              data-event="contact_hero_intake"
            >
              Send a Message
            </Button>
            <Button
              variant="ghost"
              size="base"
              href="mailto:customercare@warpath.coffee"
              className="!text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)] hover:!bg-brass-500 hover:!text-combat-900"
              data-event="contact_hero_email"
            >
              Email Direct →
            </Button>
          </div>

          <div className="mt-10 sm:mt-12 pt-6 sm:pt-7 border-t border-brass-500/20">
            <Coords tone="dark" items={[...CONTACT.hero.proof]} />
          </div>
        </div>

        {/* Channel quick-cards strip */}
        <div className="mt-12 sm:mt-14 grid sm:grid-cols-3 gap-4 sm:gap-5 motion-safe:[animation:wp-fade-up_1100ms_var(--ease-out-warpath)_300ms_both]">
          {CONTACT.channels.map((c) => {
            const Icon = ICONS[c.code as keyof typeof ICONS] ?? Mail;
            const isBest = "best" in c && c.best;
            return (
              <a
                key={c.code}
                href={c.href}
                className={`group relative block bg-combat-800/60 backdrop-blur-sm border ${
                  isBest ? "border-brass-500" : "border-brass-500/30"
                } px-5 py-5 sm:px-6 sm:py-6 motion-safe:transition-colors motion-safe:duration-300 hover:bg-combat-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500`}
                data-event="contact_channel"
                data-event-channel={c.code.toLowerCase()}
              >
                {isBest && (
                  <span className="absolute -top-2.5 left-4 bg-brass-500 text-combat-900 px-2 py-0.5 font-mono font-bold text-[9px] tracking-[.22em] uppercase">
                    Fastest
                  </span>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono font-bold text-[9px] sm:text-[10px] tracking-[.22em] uppercase text-brass-400">
                    {c.code}
                  </span>
                  <Icon
                    size={18}
                    strokeWidth={1.6}
                    className="text-brass-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="font-display font-black text-[13px] sm:text-[14px] uppercase tracking-[.02em] text-brass-300 mb-1.5">
                  {c.label}
                </div>
                <div className="font-mono font-bold text-[14px] sm:text-[15px] text-cream-50 leading-tight break-all">
                  {c.value}
                </div>
                <div className="mt-3 text-[12px] sm:text-[13px] text-cream-50/65 leading-snug">
                  {c.sub}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-400 motion-safe:transition-colors motion-safe:group-hover:text-brass-300">
                  {c.cta}
                  <span aria-hidden="true">→</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
