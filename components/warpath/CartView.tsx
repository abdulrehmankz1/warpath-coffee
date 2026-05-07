"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Trash2, Truck } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import { formatUsd, SHIPPING } from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";
import { Button } from "./Button";
import { QuantityStepper } from "./QuantityStepper";

export function CartView() {
  const { state, totals, setQty, removeItem } = useCart();

  if (!state.hydrated) {
    // Skeleton — single frame so layout doesn't jump while we read localStorage.
    return (
      <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12">
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-[140px] border border-canvas-300 bg-bone-50 animate-pulse"
            />
          ))}
        </div>
        <div className="h-[320px] border border-canvas-300 bg-bone-50 animate-pulse" />
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="border border-combat-900 bg-bone-100 py-14 sm:py-16 px-6 text-center max-w-[680px] mx-auto">
        <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
          Status · Empty Basket
        </div>
        <h2 className="font-display font-black text-[clamp(1.5rem,4vw,2.25rem)] leading-[1] tracking-[-.018em] uppercase text-combat-900">
          Your basket is empty.
        </h2>
        <p className="mt-3 text-[14px] sm:text-[15px] text-ash-700 leading-[1.6] max-w-[44ch] mx-auto">
          Pick up a bag of Mariner&rsquo;s Blend or browse the full arsenal &mdash; smooth, low-acid,
          never bitter.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="brass" size="base" href="/shop" opCode="OP-SHOP">
            Continue Shopping
          </Button>
          <Button variant="ghost" size="base" href="/shop/mariners-blend-dark-roast-coffee">
            Try the Flagship →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-start">
      {/* Line items */}
      <section aria-labelledby="line-items-heading" className="grid gap-3">
        <h2 id="line-items-heading" className="sr-only">
          Items in your cart
        </h2>
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-4 px-4 py-3 border border-combat-900 bg-combat-900 text-cream-50">
          <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400">
            Item
          </span>
          <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400">
            Quantity
          </span>
          <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400 text-right">
            Total
          </span>
          <span className="sr-only">Remove</span>
        </div>
        <ul className="grid gap-3" aria-label="Cart line items">
          {state.items.map((item) => (
            <li
              key={item.id}
              className="border border-combat-900 bg-bone-50 grid grid-cols-[96px_1fr] md:grid-cols-[120px_2fr_1fr_1fr_auto] gap-4 p-3 sm:p-4 items-center"
            >
              <Link
                href={item.href}
                className="relative aspect-[4/5] block bg-bone-200 border border-canvas-300 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </Link>
              <div className="min-w-0">
                <div className="font-mono font-bold text-[9px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                  {item.category.replace("-", " ")}
                </div>
                <Link
                  href={item.href}
                  className="font-stencil font-extrabold text-[15px] sm:text-[16px] uppercase tracking-[.01em] leading-tight text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 line-clamp-2"
                >
                  {item.name}
                </Link>
                {(item.size || item.grind) && (
                  <div className="mt-1.5 font-mono text-[10px] tracking-[.20em] uppercase text-ash-600 font-semibold">
                    {[
                      item.size?.toUpperCase(),
                      item.grind === "ground"
                        ? "Ground"
                        : item.grind === "whole-bean"
                          ? "Whole Bean"
                          : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                )}
                <div className="mt-2 font-mono text-[11px] tracking-[.16em] uppercase text-ash-600 font-semibold md:hidden">
                  {formatUsd(item.unitPriceUsd)} each
                </div>
                {/* Mobile: stepper + remove + total inline */}
                <div className="mt-3 flex items-center justify-between gap-3 md:hidden">
                  <QuantityStepper
                    size="sm"
                    value={item.qty}
                    onChange={(n) => setQty(item.id, n)}
                  />
                  <div className="font-stencil font-black text-[18px] leading-none tracking-[.01em] text-combat-900 tabular-nums">
                    {formatUsd(item.unitPriceUsd * item.qty)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-ash-600 hover:text-alert-red motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                  >
                    <Trash2 size={16} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                </div>
              </div>
              {/* Desktop: stepper, total, remove */}
              <div className="hidden md:block">
                <QuantityStepper
                  value={item.qty}
                  onChange={(n) => setQty(item.id, n)}
                />
              </div>
              <div className="hidden md:block font-stencil font-black text-[20px] leading-none tracking-[.01em] text-combat-900 text-right tabular-nums">
                {formatUsd(item.unitPriceUsd * item.qty)}
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
                className="hidden md:inline-flex min-w-[44px] min-h-[44px] items-center justify-center text-ash-600 hover:text-alert-red motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                <Trash2 size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center justify-between border-t border-canvas-300 pt-4">
          <Link
            href="/shop"
            className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
          >
            ← Continue Shopping
          </Link>
        </div>
      </section>

      {/* Summary sidebar */}
      <aside
        aria-labelledby="summary-heading"
        className="lg:sticky lg:top-[88px] border border-combat-900 bg-bone-50"
      >
        <div className="bg-combat-900 text-cream-50 px-5 py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase">
          Order Summary
        </div>
        <div className="p-5 sm:p-6">
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          {/* Free-ship progress */}
          <div className="border border-canvas-300 bg-bone-100 p-3 sm:p-4 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Truck
                size={14}
                strokeWidth={1.8}
                className="text-brass-700"
                aria-hidden="true"
              />
              <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900">
                {totals.qualifiesForFreeShipping
                  ? "Free shipping unlocked"
                  : `${formatUsd(totals.freeShipRemainingUsd)} away from free shipping`}
              </span>
            </div>
            <div
              className="relative h-1.5 w-full bg-canvas-300 overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(totals.freeShipProgressPct)}
            >
              <span
                className="absolute inset-y-0 left-0 bg-brass-500 motion-safe:transition-[width] motion-safe:duration-300"
                style={{ width: `${totals.freeShipProgressPct}%` }}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Totals */}
          <dl className="grid gap-2.5 mb-5">
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold">
                Subtotal ({totals.itemCount} item{totals.itemCount === 1 ? "" : "s"})
              </dt>
              <dd className="font-mono font-bold text-[14px] tabular-nums text-combat-900">
                {formatUsd(totals.subtotalUsd)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold">
                Shipping
              </dt>
              <dd className="font-mono font-bold text-[14px] tabular-nums text-combat-900">
                {totals.qualifiesForFreeShipping ? "FREE" : "Calculated at checkout"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold">
                Estimated Tax
              </dt>
              <dd className="font-mono text-[12px] tabular-nums text-ash-600">
                Calculated at checkout
              </dd>
            </div>
          </dl>
          <div className="flex items-center justify-between border-t border-combat-900 pt-4 mb-5">
            <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-ash-700">
              Estimated Total
            </span>
            <span className="font-stencil font-black text-[26px] sm:text-[28px] leading-none tracking-[.01em] text-combat-900 tabular-nums">
              {formatUsd(totals.subtotalUsd)}
            </span>
          </div>

          <BladeButton
            variant="brass"
            size="lg"
            className="w-full"
            data-event="cart_checkout"
            onClick={() => {
              window.location.href = "/checkout";
            }}
          >
            Proceed to Checkout
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
          </BladeButton>

          <p className="mt-3 font-mono text-[10px] tracking-[.20em] uppercase text-ash-600 font-semibold text-center">
            Secure checkout · 30-day guarantee
          </p>

          {/* Trust strip */}
          <ul className="mt-5 grid gap-2.5 border-t border-canvas-300 pt-4">
            {[
              {
                icon: Truck,
                title: `Free ship $${SHIPPING.freeShippingThresholdUsd}+`,
                body: "Ships within 48 hours",
              },
              {
                icon: ShieldCheck,
                title: "30-Day Guarantee",
                body: "Smooth or your money back",
              },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3">
                <Icon
                  size={14}
                  strokeWidth={1.8}
                  className="mt-0.5 text-brass-700"
                  aria-hidden="true"
                />
                <div>
                  <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900">
                    {title}
                  </div>
                  <div className="font-mono text-[10px] tracking-[.16em] uppercase text-ash-600 font-semibold">
                    {body}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
