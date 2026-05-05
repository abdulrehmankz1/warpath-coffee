import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { BRAND, FLAGSHIP, formatReviewCount } from "@/lib/data/warpath";
import { Star } from "lucide-react";

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
      {/* Brass radial light + corner brackets, on-brand with hero */}
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
        {/* Left: brand panel (hidden on smaller than lg) */}
        <aside className="hidden lg:flex flex-col justify-between min-h-[560px]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
              aria-label={`${BRAND.name} home`}
            >
              <Image src="/logo.avif" alt="" width={48} height={48} className="h-12 w-auto" />
              <span className="font-display font-black text-2xl uppercase leading-none">
                {BRAND.name.split(" ")[0]}
                <span className="block font-mono text-[9px] tracking-[.28em] mt-1 font-semibold text-brass-400">
                  {BRAND.shortTag}
                </span>
              </span>
            </Link>

            <div className="flex w-fit items-stretch gap-1.5 sm:gap-2 mb-7">
              <span className="inline-flex items-center justify-center min-w-[40px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase bg-brass-500 text-combat-900">
                §
              </span>
              <span className="inline-flex items-center pl-3 pr-4 sm:pl-4 sm:pr-5 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] sm:tracking-[.32em] uppercase whitespace-nowrap bg-brass-500 text-combat-900">
                {opCode}
                <span className="ml-3 sm:ml-4 text-[9px] text-combat-900/70">●</span>
              </span>
            </div>

            <h1 className="font-display font-black uppercase leading-[1.02] tracking-[-0.025em] text-[clamp(2rem,4.4vw,3.75rem)] text-cream-50">
              {title}
            </h1>

            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-cream-50/72">
              {subtitle}
            </p>

            {/* Trust strip */}
            <ul className="mt-10 grid grid-cols-3 gap-3 max-w-[440px]">
              {[
                { v: "Veteran", k: "Owned" },
                { v: "4.9 ★", k: `${formatReviewCount((FLAGSHIP.reviews ?? 0) + 3786)}+ Reviews` },
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

          {/* Bottom callout */}
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
        <section
          aria-labelledby="auth-form-heading"
          className="bg-combat-900/60 backdrop-blur-sm border border-brass-500/40 lg:border-brass-500"
        >
          {/* Header bar */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-7 py-3.5 bg-brass-500/[0.08] border-b border-dashed border-brass-500/40 font-mono text-[10px] sm:text-[11px] tracking-[.22em] sm:tracking-[.26em] uppercase text-brass-400 font-bold">
            <span className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-brass-500 before:rounded-full">
              {intakeLabel}
            </span>
            <span aria-hidden="true" className="text-cream-50/45 text-center hidden sm:block">
              ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
            </span>
            <span className="text-cream-50/55 text-[9px]">SECURE · TLS</span>
          </div>

          <div className="px-5 sm:px-7 lg:px-9 py-7 sm:py-9 lg:py-10">
            {/* Mobile-only title (lg-aside is hidden) */}
            <div className="lg:hidden mb-7">
              <div className="flex w-fit items-stretch gap-1.5 mb-5">
                <span className="inline-flex items-center justify-center min-w-[36px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase bg-brass-500 text-combat-900">
                  §
                </span>
                <span className="inline-flex items-center pl-3 pr-4 font-mono font-bold text-[10px] tracking-[.26em] uppercase whitespace-nowrap bg-brass-500 text-combat-900">
                  {opCode}
                </span>
              </div>
              <h1 id="auth-form-heading" className="font-display font-black uppercase leading-[1.05] tracking-[-0.024em] text-[clamp(1.875rem,7vw,2.5rem)] text-cream-50">
                {title}
              </h1>
              <p className="mt-4 text-[14px] leading-[1.55] text-cream-50/70">
                {subtitle}
              </p>
            </div>

            {/* Form */}
            <h2 className="sr-only" id="auth-form-heading">
              Form
            </h2>
            {children}
          </div>

          {/* Foot — alt CTA */}
          <div className="px-5 sm:px-7 lg:px-9 py-4 sm:py-5 border-t border-dashed border-brass-500/40 bg-black/20 flex items-center justify-between gap-4 flex-wrap">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-cream-50/60 font-semibold">
              {altCta.label.replace(/→/g, "").trim()}
            </span>
            <Link
              href={altCta.href}
              className="font-mono text-[11px] tracking-[.22em] uppercase font-bold text-brass-400 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 inline-flex items-center gap-1.5"
            >
              Continue →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
