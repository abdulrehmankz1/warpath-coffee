import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { BRAND, REVIEW_TOTALS, formatReviewCount } from "@/lib/data/warpath";
import { SectionBadge } from "./SectionBadge";
import { IntakeCard } from "./IntakeCard";

type Props = {
  /** Top-right intake code (e.g. "OP-LOGIN", "OP-ENROLL") */
  opCode: string;
  /** Form-card heading bar text (e.g. "INTAKE · OP-LOGIN · 001") */
  intakeLabel: string;
  /** Page H1 */
  title: ReactNode;
  /** Sub-headline beneath the title */
  subtitle: ReactNode;
  /** Form node — already styled */
  children: ReactNode;
  /** Cross-link to the opposite auth page */
  altCta: { label: string; href: string };
};

export function AuthShell({
  opCode,
  intakeLabel,
  title,
  subtitle,
  children,
  altCta,
}: Props) {
  return (
    <main
      id="main"
      className="min-h-[calc(100vh-72px)] bg-combat-900 text-cream-50 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 20%, rgba(196,154,72,.10), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(74,46,30,.18), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <span className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 border-t-[3px] border-l-[3px] border-brass-500" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 border-b-[3px] border-r-[3px] border-brass-500" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
        {/* Left: brand panel — desktop only.
            On mobile this aside is hidden and the same content is rendered inside the form card.
            We keep the H1 in the mobile card (since the desktop aside is removed from the a11y tree
            via display:none), so semantic hierarchy stays correct on every breakpoint. */}
        <aside className="hidden lg:flex flex-col justify-between min-h-[560px]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
              aria-label={`${BRAND.name} home`}
            >
              <Image
                src="/logo.avif"
                alt=""
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="font-display font-black text-2xl uppercase leading-none">
                {BRAND.name.split(" ")[0]}
                <span className="block font-mono text-[9px] tracking-[.28em] mt-1 font-semibold text-brass-400">
                  {BRAND.shortTag}
                </span>
              </span>
            </Link>

            <SectionBadge label={opCode} tone="dark" className="mb-7" />

            <h1 className="font-display font-black uppercase leading-[1.02] tracking-[-0.025em] text-[clamp(2rem,4.4vw,3.75rem)] text-cream-50">
              {title}
            </h1>

            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-cream-50/72">
              {subtitle}
            </p>

            <ul className="mt-10 grid grid-cols-3 gap-3 max-w-[440px]">
              {[
                { v: "Veteran", k: "Owned" },
                { v: "4.9 ★", k: `${formatReviewCount(REVIEW_TOTALS.total)}+ Reviews` },
                { v: "No", k: "Lock-In" },
              ].map((s) => (
                <li
                  key={s.k}
                  className="border border-brass-500/30 bg-combat-800/60 p-3"
                >
                  <div className="font-stencil font-black text-[18px] leading-none text-brass-500 tracking-[0.01em]">
                    {s.v}
                  </div>
                  <div className="mt-1.5 font-mono text-[9px] tracking-[.20em] uppercase text-cream-50/65 font-semibold">
                    {s.k}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="border-l-[3px] border-brass-500 pl-5 mt-12 max-w-[44ch]">
            <div className="flex items-center gap-1 mb-2 text-brass-500">
              {[0, 1, 2, 3, 4].map((j) => (
                <Star key={j} size={13} strokeWidth={1.4} className="fill-brass-500" aria-hidden="true" />
              ))}
            </div>
            <p className="font-display font-bold text-[18px] leading-[1.4] text-cream-50">
              “Best coffee ever. Smooth, bold, and zero bitterness — I drink it black now.”
            </p>
            <footer className="mt-3 font-mono text-[10px] tracking-[.20em] uppercase font-semibold text-cream-50/55">
              Verified buyer · Mariner’s Blend
            </footer>
          </blockquote>
        </aside>

        {/* Right: form */}
        <IntakeCard
          intakeLabel={intakeLabel}
          footer={
            <>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-cream-50/60 font-semibold">
                {altCta.label.replace(/→/g, "").trim()}
              </span>
              <Link
                href={altCta.href}
                className="font-mono text-[11px] tracking-[.22em] uppercase font-bold text-brass-400 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 inline-flex items-center gap-1.5"
              >
                Continue →
              </Link>
            </>
          }
        >
          {/* Mobile-only title block — uses h1 because the desktop aside is display:none here.
              At lg+ the aside h1 is rendered and this block is removed via lg:hidden. The two
              h1 nodes never coexist in the same a11y tree. */}
          <div className="lg:hidden mb-7">
            <SectionBadge label={opCode} tone="dark" className="mb-5" />
            <h1
              id="auth-form-heading"
              className="font-display font-black uppercase leading-[1.05] tracking-[-0.024em] text-[clamp(1.875rem,7vw,2.5rem)] text-cream-50"
            >
              {title}
            </h1>
            <p className="mt-4 text-[16px] leading-[1.55] text-cream-50/70">
              {subtitle}
            </p>
          </div>
          {children}
        </IntakeCard>
      </div>
    </main>
  );
}
