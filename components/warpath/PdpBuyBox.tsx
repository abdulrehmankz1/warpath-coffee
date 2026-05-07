"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShoppingBag, Star, Truck, ShieldCheck, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/cn";
import { BladeButton } from "./BladeButton";
import { QuantityStepper } from "./QuantityStepper";
import { VariantSelector, type VariantOption } from "./VariantSelector";
import { StickyBuyBar } from "./StickyBuyBar";
import { useCart } from "@/lib/cart/CartProvider";
import {
  formatUsd,
  formatReviewCount,
  type Product,
  SHIPPING,
} from "@/lib/data/warpath";

const GRIND_OPTIONS: VariantOption[] = [
  { value: "ground", label: "Ground", subLabel: "Ready to brew" },
  { value: "whole-bean", label: "Whole Bean", subLabel: "Bring your grinder" },
];

const SIZE_OPTIONS: VariantOption[] = [
  { value: "12oz", label: "12 oz", subLabel: "Standard bag" },
  { value: "2lb", label: "2 lb", subLabel: "Pirate size" },
];

type Props = {
  product: Product;
};

export function PdpBuyBox({ product }: Props) {
  const isCoffee = product.category === "coffee" || product.category === "decaf";
  const [grind, setGrind] = useState("ground");
  const [size, setSize] = useState("12oz");
  const [qty, setQty] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const inlineCtaRef = useRef<HTMLDivElement | null>(null);
  const { addItem } = useCart();

  // 2lb adds a $20 premium
  const effectivePrice = useMemo(() => {
    if (!isCoffee) return product.priceUsd;
    return size === "2lb" ? product.priceUsd + 20 : product.priceUsd;
  }, [isCoffee, product.priceUsd, size]);

  const variantSummary = useMemo(() => {
    if (!isCoffee) return formatUsd(product.priceUsd);
    return `${size.toUpperCase()} · ${grind === "ground" ? "GROUND" : "WHOLE BEAN"}`;
  }, [isCoffee, size, grind, product.priceUsd]);

  // Sticky bar — IntersectionObserver on the inline CTA
  useEffect(() => {
    const el = inlineCtaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when inline CTA leaves viewport
        setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0, rootMargin: "0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onAdd = () => {
    if (product.outOfStock) return;
    addItem({
      product: {
        slug: product.slug,
        name: product.name,
        image: product.image,
        href: product.href,
        priceUsd: product.priceUsd,
        category: product.category,
      },
      qty,
      grind: isCoffee ? (grind as "ground" | "whole-bean") : undefined,
      size: isCoffee ? (size as "12oz" | "2lb") : undefined,
      unitPriceUsd: effectivePrice,
    });
  };

  const out = !!product.outOfStock;

  return (
    <>
      {/* Product name */}
      <h1 className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2rem,4.5vw,3.75rem)] text-combat-900">
        {product.name}
      </h1>

      {/* Price */}
      <div className="mt-4 sm:mt-5 font-stencil font-black text-[clamp(1.875rem,3.5vw,2.5rem)] leading-none tracking-[0.01em] text-combat-900">
        {formatUsd(effectivePrice)}
        {isCoffee && size === "2lb" && (
          <span className="ml-3 font-mono text-[11px] tracking-[.18em] uppercase text-ash-600 font-semibold align-middle">
            (12 oz {formatUsd(product.priceUsd)})
          </span>
        )}
      </div>

      {/* Stars + reviews */}
      {product.reviews && (
        <a
          href="#reviews"
          className="mt-3 inline-flex items-center gap-2 motion-safe:transition-colors motion-safe:duration-150 hover:text-brass-700 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
          aria-label={`${product.rating ?? 4.9} stars from ${formatReviewCount(product.reviews)} reviews — jump to reviews`}
        >
          <span className="inline-flex items-center gap-0.5 text-brass-500">
            {[0, 1, 2, 3, 4].map((j) => (
              <Star key={j} size={14} strokeWidth={1.4} className="fill-brass-500" aria-hidden="true" />
            ))}
          </span>
          <span className="font-mono font-bold text-[11px] tracking-[.18em] uppercase text-combat-900">
            {(product.rating ?? 4.9).toFixed(1)} · {formatReviewCount(product.reviews)} reviews
          </span>
        </a>
      )}

      {/* Description */}
      {product.description && (
        <p className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] leading-[1.6] text-ash-700 max-w-[52ch]">
          {product.description}
        </p>
      )}

      {/* Variants */}
      {isCoffee && !out && (
        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 max-w-[480px]">
          <VariantSelector
            groupLabel="Grind"
            options={GRIND_OPTIONS}
            selected={grind}
            onChange={setGrind}
          />
          <VariantSelector
            groupLabel="Size"
            options={SIZE_OPTIONS.map((o) =>
              o.value === "2lb"
                ? { ...o, price: product.priceUsd + 20 }
                : { ...o, price: product.priceUsd },
            )}
            selected={size}
            onChange={setSize}
          />
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div ref={inlineCtaRef} className="mt-6 sm:mt-8 grid gap-4 sm:flex sm:items-center sm:gap-5">
        {!out && (
          <QuantityStepper value={qty} onChange={setQty} />
        )}
        <BladeButton
          variant="primary"
          size="lg"
          disabled={out}
          onClick={onAdd}
          data-event="cart_add"
          data-event-product={product.slug}
          data-testid="pdp-add-to-cart"
          className={cn("w-full sm:w-auto sm:flex-1", out && "!bg-ash-500")}
        >
          <ShoppingBag size={16} strokeWidth={1.8} aria-hidden="true" className="-ml-1 mr-2" />
          {out ? "Sold Out" : `Add to Cart · ${formatUsd(effectivePrice * qty)}`}
        </BladeButton>
      </div>

      {/* Trust line */}
      <p className="mt-3 font-mono text-[10px] sm:text-[11px] tracking-[.20em] uppercase text-ash-600 font-semibold">
        Free ship on orders ${SHIPPING.freeShippingThresholdUsd}+ · Ships in 48 hours · 30-day guarantee
      </p>

      {/* Trust accordion */}
      <details
        open
        className="mt-8 sm:mt-10 group border border-canvas-300"
      >
        <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 min-h-[44px] font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150">
          <span className="inline-flex items-center gap-3">
            <Truck size={14} strokeWidth={1.8} aria-hidden="true" className="text-brass-700" />
            Shipping & Delivery
          </span>
          <span aria-hidden="true" className="text-brass-700 group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-200">▾</span>
        </summary>
        <div className="px-4 sm:px-5 py-3 text-[14px] leading-[1.6] text-ash-700 border-t border-canvas-300">
          Free shipping on orders ${SHIPPING.freeShippingThresholdUsd}+. Ships within 48 hours of roasting. Tracking email on dispatch.
        </div>
      </details>

      {[
        {
          icon: ShieldCheck,
          title: "30-Day Guarantee",
          body: "If it’s not the smoothest cup you’ve had, return the unopened bag within 30 days for a full refund — no questions asked.",
        },
        {
          icon: RotateCcw,
          title: "Low-Acid Process",
          body: "Custom roast profile dialed in for low chlorogenic acidity. No additives. Tested in-house.",
        },
        {
          icon: Award,
          title: "Veteran-Owned",
          body: "Founded by Navy SEAL combat veteran Tej Gill. Family-operated, run by veterans, first responders, and a 30-year roastmaster.",
        },
      ].map(({ icon: Icon, title, body }) => (
        <details key={title} className="border border-canvas-300 border-t-0 group">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 min-h-[44px] font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150">
            <span className="inline-flex items-center gap-3">
              <Icon size={14} strokeWidth={1.8} aria-hidden="true" className="text-brass-700" />
              {title}
            </span>
            <span aria-hidden="true" className="text-brass-700 group-open:rotate-180 motion-safe:transition-transform motion-safe:duration-200">▾</span>
          </summary>
          <div className="px-4 sm:px-5 py-3 text-[14px] leading-[1.6] text-ash-700 border-t border-canvas-300">
            {body}
          </div>
        </details>
      ))}

      {/* Sticky mobile bar */}
      <StickyBuyBar
        productName={product.name}
        variantSummary={variantSummary}
        price={effectivePrice}
        quantity={qty}
        onQuantityChange={setQty}
        onAddToCart={onAdd}
        visible={stickyVisible}
        soldOut={out}
      />
    </>
  );
}
