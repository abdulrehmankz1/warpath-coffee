"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatUsd, formatReviewCount } from "@/lib/data/warpath";
import type { Product } from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";
import { useCart } from "@/lib/cart/CartProvider";

type Props = {
  product: Product;
  /** Triggered by the in-card "Add to Cart" button (stub until cart wired) */
  onAddToCart?: (slug: string) => void;
  className?: string;
  /** Hint to Next/Image: this card's image is above the fold (first row of the grid). */
  priority?: boolean;
};

export function ProductCard({ product, onAddToCart, className, priority }: Props) {
  const out = !!product.outOfStock;
  const { addItem } = useCart();
  const handleAdd = () => {
    if (out) return;
    if (onAddToCart) {
      onAddToCart(product.slug);
      return;
    }
    addItem({
      product: {
        slug: product.slug,
        name: product.name,
        image: product.image,
        href: product.href,
        priceUsd: product.priceUsd,
        category: product.category,
      },
      qty: 1,
      // For coffee/decaf the buyer is doing a quick-add — default 12oz / Ground
      ...(product.category === "coffee" || product.category === "decaf"
        ? { size: "12oz" as const, grind: "ground" as const }
        : {}),
    });
  };
  return (
    <article
      data-testid="product-card"
      className={cn(
        "group relative bg-bone-50 border border-combat-900 flex flex-col",
        "motion-safe:transition-[transform,box-shadow] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "motion-safe:hover:-translate-y-[3px] motion-safe:hover:shadow-[0_18px_32px_rgba(11,14,12,0.18)]",
        out && "opacity-90",
        className,
      )}
    >
      {/* Image */}
      <Link
        href={product.href}
        className="relative block aspect-[4/5] overflow-hidden bg-bone-200 border-b border-canvas-300 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
        aria-label={`View ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          priority={priority}
          className={cn(
            "object-cover object-center motion-safe:transition-transform motion-safe:duration-[700ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.05]",
            out && "grayscale-[60%]",
          )}
        />
        {(product.badge || out) && (
          <span
            className={cn(
              "absolute top-3 left-3 inline-flex items-center font-mono font-bold text-[9px] tracking-[.20em] uppercase px-2 py-1",
              out
                ? "bg-brass-700 text-cream-50"
                : "bg-combat-900 text-brass-400",
            )}
          >
            {out ? "Sold Out" : product.badge}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="font-mono font-bold text-[9px] tracking-[.22em] uppercase text-brass-700 mb-2">
          {product.category.replace("-", " ")}
        </div>

        <Link
          href={product.href}
          className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[0.01em] text-combat-900 leading-tight line-clamp-2 min-h-[2.6em] hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
        >
          {product.name}
        </Link>

        {product.description && (
          <p className="mt-2 text-[12px] text-ash-600 leading-snug line-clamp-2 min-h-[2.6em]">
            {product.description}
          </p>
        )}

        {/* Reviews row */}
        <div className="mt-3 min-h-[18px] flex items-center gap-2">
          {product.reviews ? (
            <>
              <Star
                size={11}
                strokeWidth={1.4}
                className="fill-brass-500 text-brass-500"
                aria-hidden="true"
              />
              <span
                className="font-mono font-semibold text-[10px] tracking-[.16em] uppercase text-ash-600"
                aria-label={`${product.rating ?? 4.9} stars, ${formatReviewCount(product.reviews)} reviews`}
              >
                {(product.rating ?? 4.9).toFixed(1)} · {formatReviewCount(product.reviews)} reviews
              </span>
            </>
          ) : (
            <span className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-olive-500">
              New
            </span>
          )}
        </div>

        {/* Footer: price + CTA */}
        <div className="mt-auto pt-4 border-t border-canvas-300 flex items-end justify-between gap-3">
          <div className="font-stencil font-black text-[20px] sm:text-[22px] text-combat-900 leading-none tracking-[0.01em]">
            {formatUsd(product.priceUsd)}
          </div>
          {out ? (
            <BladeButton
              variant="ghost"
              size="sm"
              disabled
              aria-label={`${product.name} is sold out`}
              className="!text-ash-500"
            >
              Sold Out
            </BladeButton>
          ) : (
            <BladeButton
              variant="primary"
              size="sm"
              onClick={handleAdd}
              data-event="cart_add"
              data-event-product={product.slug}
              data-testid="product-card-add-to-cart"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </BladeButton>
          )}
        </div>
      </div>
    </article>
  );
}
