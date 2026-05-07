import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "./Button";
import { formatReviewCount, formatUsd, type Product } from "@/lib/data/warpath";

type Props = {
  product: Product;
  /** Eyebrow / context label, e.g. "Mentioned above" */
  eyebrow?: string;
};

/**
 * Mid-article product CTA. Card-style, brass-accented, 2-column layout.
 * Mirrors the editorial tone of the body copy without breaking flow.
 */
export function InContentProductCta({ product, eyebrow = "Field-Tested Pick" }: Props) {
  return (
    <aside
      aria-label={`Featured product: ${product.name}`}
      className="my-6 sm:my-8 border border-combat-900 bg-bone-50 grid sm:grid-cols-[180px_1fr] overflow-hidden"
    >
      <div className="relative aspect-[4/5] sm:aspect-auto bg-bone-200 border-b sm:border-b-0 sm:border-r border-combat-900 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 180px"
          className="object-cover object-center"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col">
        <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-2">
          § {eyebrow}
        </div>
        <h3 className="font-stencil font-extrabold text-[clamp(1.125rem,2.6vw,1.375rem)] uppercase tracking-[.02em] leading-tight text-combat-900">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-2 text-[13px] sm:text-[14px] leading-[1.6] text-ash-700 max-w-[58ch]">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          <span className="font-stencil font-black text-[20px] leading-none tracking-[.01em] text-combat-900 tabular-nums">
            {formatUsd(product.priceUsd)}
          </span>
          {product.reviews && (
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[10px] tracking-[.18em] uppercase text-brass-700">
              <Star size={11} strokeWidth={1.4} className="fill-brass-500 text-brass-500" aria-hidden="true" />
              {(product.rating ?? 4.9).toFixed(1)} · {formatReviewCount(product.reviews)} reviews
            </span>
          )}
        </div>
        <div className="mt-4">
          <Button
            variant="brass"
            size="sm"
            href={product.href}
            data-event="blog_in_content_cta"
          >
            Shop {product.name.split(" ")[0]}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
