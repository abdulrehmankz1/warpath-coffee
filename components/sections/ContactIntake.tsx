import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BladeButton } from "@/components/warpath/BladeButton";
import { FormLegalNote } from "@/components/warpath/FormLegalNote";
import { CONTACT } from "@/lib/data/warpath";

export function ContactIntake() {
  return (
    <section
      id="intake"
      aria-labelledby="contact-intake-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Left: form */}
        <div>
          <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-700 mb-4">
            § {CONTACT.intake.eyebrow}
          </div>
          <h2
            id="contact-intake-headline"
            className="font-display font-black uppercase leading-[0.95] tracking-[-.025em] text-[clamp(2rem,5vw,4rem)] text-combat-900 mb-5"
          >
            {CONTACT.intake.title}{" "}
            <em className="not-italic text-brass-500">
              {CONTACT.intake.titleItalic}
            </em>
          </h2>
          <p className="text-[15px] sm:text-[16px] text-ash-700 leading-[1.65] mb-8 sm:mb-10 max-w-[52ch]">
            {CONTACT.intake.body}
          </p>

          <form
            action="/api/contact"
            method="post"
            className="border border-combat-900 bg-bone-50"
            data-event="contact_intake_submit"
          >
            <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-3 font-mono font-bold text-[10px] tracking-[.24em] uppercase flex items-center justify-between">
              <span>Intake · Op-Contact · 001</span>
              <span className="text-brass-400 text-[9px]">REQ · 4</span>
            </div>

            <div className="p-5 sm:p-7 lg:p-9 grid sm:grid-cols-2 gap-5 sm:gap-6">
              {CONTACT.intake.fields.map((f) => {
                const isWide =
                  f.type === "textarea" || f.name === "subject";
                const id = `contact-${f.name}`;
                return (
                  <div
                    key={f.name}
                    className={isWide ? "sm:col-span-2" : undefined}
                  >
                    <label
                      htmlFor={id}
                      className="flex items-center gap-2 mb-2 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-brass-700"
                    >
                      {f.label}
                      {f.required && (
                        <span className="font-mono text-[9px] tracking-[.18em] border border-alert-red text-alert-red px-1.5 py-0.5">
                          REQ
                        </span>
                      )}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={id}
                        name={f.name}
                        required={f.required}
                        rows={6}
                        placeholder={f.placeholder}
                        className="w-full bg-bone-100 border border-canvas-400 px-4 py-3 font-mono text-[13px] text-combat-900 leading-[1.6] focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500 placeholder:text-ash-500/70"
                      />
                    ) : (
                      <input
                        id={id}
                        name={f.name}
                        type={f.type}
                        required={f.required}
                        placeholder={f.placeholder}
                        className="w-full bg-bone-100 border border-canvas-400 px-4 py-3 font-mono text-[13px] text-combat-900 focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500 placeholder:text-ash-500/70"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-5 sm:px-7 lg:px-9 pb-7 lg:pb-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 border-t border-dashed border-canvas-300 pt-5">
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-ash-700 font-semibold leading-relaxed max-w-[40ch]">
                {CONTACT.intake.fineprint}
              </p>
              <BladeButton type="submit" variant="brass" size="base">
                {CONTACT.intake.submitLabel} →
              </BladeButton>
            </div>
            <div className="px-5 sm:px-7 lg:px-9 pb-5 lg:pb-6">
              <FormLegalNote tone="light" />
            </div>
          </form>
        </div>

        {/* Right: contact panel */}
        <aside
          aria-label="Contact details"
          className="border border-combat-900 bg-bone-50"
        >
          <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-3 font-mono font-bold text-[10px] tracking-[.24em] uppercase flex items-center justify-between">
            <span>HQ · Comms Channel</span>
            <span className="text-brass-400 text-[9px]">OPEN</span>
          </div>

          <ul className="divide-y divide-canvas-300">
            <li className="px-5 sm:px-6 py-5 sm:py-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail
                  size={16}
                  strokeWidth={1.6}
                  className="text-brass-700"
                  aria-hidden="true"
                />
                <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                  Email
                </span>
              </div>
              <a
                href="mailto:customercare@warpath.coffee"
                className="font-mono font-bold text-[13px] sm:text-[14px] text-combat-900 hover:text-brass-700 wp-link-underline break-all"
                data-event="contact_panel_email"
              >
                customercare@warpath.coffee
              </a>
              <p className="text-[12px] sm:text-[13px] text-ash-700 mt-2 leading-relaxed">
                Best for written details, order numbers, and screenshots.
              </p>
            </li>

            <li className="px-5 sm:px-6 py-5 sm:py-6">
              <div className="flex items-center gap-3 mb-2">
                <Phone
                  size={16}
                  strokeWidth={1.6}
                  className="text-brass-700"
                  aria-hidden="true"
                />
                <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                  Phone
                </span>
              </div>
              <a
                href="tel:+12085996678"
                className="font-mono font-bold text-[13px] sm:text-[14px] text-combat-900 hover:text-brass-700 wp-link-underline"
                data-event="contact_panel_phone"
              >
                +1 208 599-6678
              </a>
              <p className="text-[12px] sm:text-[13px] text-ash-700 mt-2 leading-relaxed">
                Talk to a real person — no menus, no holds.
              </p>
            </li>

            <li className="px-5 sm:px-6 py-5 sm:py-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock
                  size={16}
                  strokeWidth={1.6}
                  className="text-brass-700"
                  aria-hidden="true"
                />
                <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                  {CONTACT.hours.label}
                </span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {CONTACT.hours.schedule.map((s) => (
                  <li
                    key={s.day}
                    className="flex items-center justify-between gap-3 font-mono text-[12px] sm:text-[13px]"
                  >
                    <span className="text-combat-900 font-bold uppercase tracking-[.14em] text-[11px]">
                      {s.day}
                    </span>
                    <span className="text-ash-700 text-right">{s.hours}</span>
                  </li>
                ))}
              </ul>
            </li>

            <li className="px-5 sm:px-6 py-5 sm:py-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin
                  size={16}
                  strokeWidth={1.6}
                  className="text-brass-700"
                  aria-hidden="true"
                />
                <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700">
                  Mailing Address
                </span>
              </div>
              <address className="not-italic font-mono font-bold text-[13px] sm:text-[14px] text-combat-900 leading-relaxed">
                PO Box 1344
                <br />
                Cheyenne, WY 82003
                <br />
                United States
              </address>
            </li>
          </ul>

          <div className="px-5 sm:px-6 py-4 border-t border-combat-900 bg-combat-900 text-brass-400 font-mono font-bold text-[9px] sm:text-[10px] tracking-[.24em] uppercase flex items-center justify-between">
            <span>FR · 14 · A1</span>
            <span>VETERAN-OWNED</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
