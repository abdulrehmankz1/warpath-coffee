import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/warpath/SectionHeader";
import { CONTACT } from "@/lib/data/warpath";

export function ContactSelfServe() {
  return (
    <section
      aria-labelledby="contact-self-serve-headline"
      className="bg-bone-200 py-16 sm:py-20 lg:py-[140px] border-y border-combat-900"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <SectionHeader
          eyebrow={CONTACT.selfServe.eyebrow}
          sec="§ DIRECT ROUTE"
          title={
            <span id="contact-self-serve-headline">
              Faster than{" "}
              <em className="not-italic text-brass-500 tracking-[-.025em]">
                the form.
              </em>
            </span>
          }
          desc="Three things you can solve in 30 seconds without writing a message."
        />

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CONTACT.selfServe.items.map((item) => (
            <li
              key={item.code}
              className="relative bg-bone-50 border border-combat-900 grid grid-rows-[auto_1fr_auto] motion-safe:transition-shadow motion-safe:duration-500 hover:shadow-[0_14px_28px_rgba(11,14,12,.10)]"
            >
              <span
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-combat-900"
                aria-hidden="true"
              />
              <div className="px-5 py-3 border-b border-dashed border-canvas-300 flex items-center justify-between font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase">
                <span className="text-brass-700">{item.code}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="text-brass-500"
                  aria-hidden="true"
                />
              </div>
              <div className="px-5 sm:px-6 pt-6 pb-5">
                <h3 className="font-display font-black uppercase text-[20px] sm:text-[22px] leading-[1.1] tracking-[-.01em] text-combat-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-[1.6] text-ash-700">
                  {item.body}
                </p>
              </div>
              <Link
                href={item.cta.href}
                className="px-5 sm:px-6 py-3.5 border-t border-canvas-300 bg-bone-100 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200 flex items-center justify-between focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brass-500"
                data-event="contact_self_serve"
                data-event-action={item.code.toLowerCase()}
              >
                {item.cta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
