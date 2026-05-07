"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { ArrowRight, ShoppingBag, Truck, Trash2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart/CartProvider";
import { formatUsd, SHIPPING } from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";
import { Button } from "./Button";
import { QuantityStepper } from "./QuantityStepper";

export function CartDrawer() {
  const {
    state,
    totals,
    isOpen,
    closeCart,
    setQty,
    removeItem,
  } = useCart();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Focus mgmt + escape
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const empty = state.items.length === 0;
  const remaining = totals.freeShipRemainingUsd;
  const progress = totals.freeShipProgressPct;

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-combat-900/70 backdrop-blur-[2px] motion-safe:animate-[fadeIn_200ms_ease-out_both] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brass-500"
      />

      {/* Panel */}
      <aside
        ref={dialogRef}
        className={cn(
          "absolute right-0 top-0 h-full w-full sm:w-[440px] md:w-[480px] bg-bone-50 text-combat-900",
          "flex flex-col border-l border-combat-900 shadow-[-12px_0_32px_rgba(11,14,12,0.35)]",
          "motion-safe:[animation:wp-slide-in-right_280ms_var(--ease-out-warpath)_both]",
        )}
      >
        {/* Header */}
        <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-4 sm:py-5 border-b border-brass-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} strokeWidth={1.8} className="text-brass-400" aria-hidden="true" />
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
                § Field Pack
              </div>
              <h2
                id={titleId}
                className="font-stencil font-extrabold text-[20px] sm:text-[22px] uppercase tracking-[.02em] leading-none mt-1"
              >
                Your Cart
                <span className="ml-2 font-mono text-[12px] tracking-[.18em] text-brass-400 align-middle">
                  ({totals.itemCount})
                </span>
              </h2>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          >
            <X size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

        {/* Free-ship progress */}
        <div className="px-5 sm:px-6 py-4 border-b border-canvas-300 bg-bone-100">
          <div className="flex items-center gap-2 mb-2">
            <Truck size={14} strokeWidth={1.8} className="text-brass-700" aria-hidden="true" />
            <span className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900">
              {totals.qualifiesForFreeShipping
                ? "Free shipping unlocked"
                : remaining > 0 && totals.subtotalUsd > 0
                  ? `${formatUsd(remaining)} away from free shipping`
                  : `Free shipping on $${SHIPPING.freeShippingThresholdUsd}+`}
            </span>
          </div>
          <div
            className="relative h-1.5 w-full bg-canvas-300 overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Free-shipping progress"
          >
            <span
              className="absolute inset-y-0 left-0 bg-brass-500 motion-safe:transition-[width] motion-safe:duration-300"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Body */}
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">
            <div className="w-16 h-16 border border-combat-900 inline-flex items-center justify-center bg-bone-100 mb-5">
              <ShoppingBag size={28} strokeWidth={1.4} className="text-brass-700" aria-hidden="true" />
            </div>
            <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-2">
              Status · Empty
            </div>
            <h3 className="font-display font-black uppercase text-[clamp(1.5rem,5vw,1.875rem)] leading-[1] tracking-[-0.02em] text-combat-900">
              Your basket is empty.
            </h3>
            <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-ash-700 max-w-[36ch]">
              Pick up a bag of Mariner&rsquo;s Blend or browse the full arsenal.
            </p>
            <div className="mt-6">
              <Button
                variant="brass"
                size="base"
                href="/shop"
                onClick={closeCart}
                data-event="cart_drawer_continue"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul
              aria-label="Cart line items"
              className="flex-1 overflow-y-auto divide-y divide-canvas-300"
            >
              {state.items.map((item) => (
                <li
                  key={item.id}
                  className="px-5 sm:px-6 py-4 grid grid-cols-[88px_1fr] gap-4"
                >
                  <Link
                    href={item.href}
                    onClick={closeCart}
                    className="relative aspect-[4/5] block bg-bone-200 border border-combat-900 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="88px"
                      className="object-cover object-center"
                    />
                  </Link>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={item.href}
                          onClick={closeCart}
                          className="font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.01em] leading-tight text-combat-900 line-clamp-2 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150"
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
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="shrink-0 min-w-[40px] min-h-[40px] inline-flex items-center justify-center text-ash-600 hover:text-alert-red motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                      >
                        <Trash2 size={16} strokeWidth={1.6} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QuantityStepper
                        size="sm"
                        value={item.qty}
                        onChange={(n) => setQty(item.id, n)}
                      />
                      <div className="font-stencil font-black text-[16px] sm:text-[17px] leading-none tracking-[.01em] text-combat-900 tabular-nums">
                        {formatUsd(item.unitPriceUsd * item.qty)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-combat-900 bg-bone-100 px-5 sm:px-6 py-5 grid gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-ash-700">
                  Subtotal
                </span>
                <span className="font-stencil font-black text-[22px] sm:text-[24px] leading-none tracking-[0.01em] text-combat-900 tabular-nums">
                  {formatUsd(totals.subtotalUsd)}
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold">
                Shipping &amp; tax calculated at checkout
              </p>
              <div className="mt-1">
                <BladeButton
                  variant="brass"
                  size="lg"
                  className="w-full"
                  data-event="cart_drawer_checkout"
                  onClick={() => {
                    closeCart();
                    window.location.href = "/checkout";
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
                </BladeButton>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
