type FaqItem = {
  q: string;
  a: string;
  /** Optional anchor id so we can deep-link */
  id?: string;
};

type Props = {
  items: readonly FaqItem[];
  defaultOpenIndex?: number;
};

export function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  return (
    <div className="border border-combat-900 bg-bone-50 divide-y divide-canvas-300">
      {items.map((item, i) => (
        <details
          key={item.q}
          id={item.id}
          open={i === defaultOpenIndex}
          className="group scroll-mt-24"
        >
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 min-h-[56px] font-stencil font-extrabold text-[14px] sm:text-[16px] uppercase tracking-[.02em] text-combat-900 leading-tight hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500">
            <span className="flex items-baseline gap-3">
              <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.q}</span>
            </span>
            <span
              aria-hidden="true"
              className="text-brass-700 group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-200 font-mono text-[14px]"
            >
              ▾
            </span>
          </summary>
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-0 text-[14px] sm:text-[15px] leading-[1.7] text-ash-700 max-w-[68ch]">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
