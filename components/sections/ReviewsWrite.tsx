import { BladeButton } from "@/components/warpath/BladeButton";
import { FormLegalNote } from "@/components/warpath/FormLegalNote";
import { StarRatingInput } from "@/components/warpath/StarRatingInput";
import { REVIEWS_PAGE } from "@/lib/data/warpath";

export function ReviewsWrite() {
  const w = REVIEWS_PAGE.writeReview;
  return (
    <section
      id="write-a-review"
      aria-labelledby="reviews-write-headline"
      className="bg-bone-100 py-16 sm:py-20 lg:py-[120px]"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px] grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
        <div>
          <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-700 mb-4">
            § {w.eyebrow}
          </div>
          <h2
            id="reviews-write-headline"
            className="font-display font-black uppercase leading-[0.95] tracking-[-.025em] text-[clamp(2rem,5vw,4rem)] text-combat-900"
          >
            {w.title}
            <br />
            <em className="not-italic text-brass-500">{w.titleItalic}</em>
          </h2>
          <p className="mt-5 sm:mt-6 max-w-[44ch] text-[16px] sm:text-[16px] text-ash-700 leading-[1.65]">
            {w.body}
          </p>

          <ul className="mt-8 space-y-3 max-w-[44ch]">
            <li className="flex items-start gap-3 text-[16px] sm:text-[16px] text-combat-900 leading-snug">
              <span className="font-mono font-bold text-brass-700 text-[10px] tracking-[.22em] uppercase mt-1 w-12 shrink-0">
                Step 01
              </span>
              <span>Submit your name, email, and the roast you’re reviewing.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] sm:text-[16px] text-combat-900 leading-snug">
              <span className="font-mono font-bold text-brass-700 text-[10px] tracking-[.22em] uppercase mt-1 w-12 shrink-0">
                Step 02
              </span>
              <span>We verify the order against the receipt — usually within 48 hours.</span>
            </li>
            <li className="flex items-start gap-3 text-[16px] sm:text-[16px] text-combat-900 leading-snug">
              <span className="font-mono font-bold text-brass-700 text-[10px] tracking-[.22em] uppercase mt-1 w-12 shrink-0">
                Step 03
              </span>
              <span>Your report is published, signed with your name. +20 loyalty points credited.</span>
            </li>
          </ul>
        </div>

        {/* Form */}
        <form
          action="/api/reviews"
          method="post"
          className="border border-combat-900 bg-bone-50"
          data-event="reviews_write_submit"
        >
          <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-3 font-mono font-bold text-[10px] tracking-[.24em] uppercase flex items-center justify-between">
            <span>Intake · Op-Review · 001</span>
            <span className="text-brass-400 text-[9px]">REQ · 4</span>
          </div>

          <div className="p-5 sm:p-7 lg:p-9 grid sm:grid-cols-2 gap-5 sm:gap-6">
            {w.fields.map((f) => {
              const isWide = f.type === "textarea" || f.name === "product";
              const id = `review-${f.name}`;
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
                      rows={5}
                      className="w-full bg-bone-100 border border-canvas-400 px-4 py-3 font-mono text-[16px] text-combat-900 leading-[1.6] focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
                    />
                  ) : f.name === "rating" ? (
                    <StarRatingInput
                      id={id}
                      name={f.name}
                      required={f.required}
                    />
                  ) : (
                    <input
                      id={id}
                      name={f.name}
                      type={f.type}
                      required={f.required}
                      className="w-full bg-bone-100 border border-canvas-400 px-4 py-3 font-mono text-[16px] text-combat-900 focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-5 sm:px-7 lg:px-9 pb-7 lg:pb-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 border-t border-dashed border-canvas-300 pt-5">
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-ash-700 font-semibold leading-relaxed max-w-[36ch]">
              {w.fineprint}
            </p>
            <BladeButton type="submit" variant="brass" size="base">
              {w.submitLabel} →
            </BladeButton>
          </div>
          <div className="px-5 sm:px-7 lg:px-9 pb-5 lg:pb-6">
            <FormLegalNote tone="light" />
          </div>
        </form>
      </div>
    </section>
  );
}
