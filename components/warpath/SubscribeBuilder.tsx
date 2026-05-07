"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import {
  PRODUCTS,
  SUBSCRIBE,
  formatUsd,
  type Product,
} from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";

const COFFEE_OPTIONS: Product[] = PRODUCTS.filter(
  (p) => p.category === "coffee" || p.category === "decaf",
).slice(0, 6);

const SUBSCRIBE_DISCOUNT = 0.12;

export function SubscribeBuilder() {
  const { addItem, openCart } = useCart();
  const [productSlug, setProductSlug] = useState<string>(COFFEE_OPTIONS[0].slug);
  const [cadence, setCadence] = useState<string>(SUBSCRIBE.cadences[1].code);
  const [size, setSize] = useState<"12oz" | "2lb">("12oz");
  const [grind, setGrind] = useState<"ground" | "whole-bean">("ground");

  const product = useMemo(
    () => COFFEE_OPTIONS.find((p) => p.slug === productSlug)!,
    [productSlug],
  );

  const baseUnit = size === "2lb" ? product.priceUsd + 20 : product.priceUsd;
  const subscriberUnit = +(baseUnit * (1 - SUBSCRIBE_DISCOUNT)).toFixed(2);
  const savedPerShipment = +(baseUnit - subscriberUnit).toFixed(2);

  const onStart = () => {
    addItem({
      product: {
        slug: product.slug,
        name: `${product.name} · Subscription`,
        image: product.image,
        href: product.href,
        priceUsd: product.priceUsd,
        category: product.category,
      },
      qty: 1,
      grind,
      size,
      unitPriceUsd: subscriberUnit,
    });
    openCart();
  };

  return (
    <div className="grid lg:grid-cols-[6fr_6fr] gap-8 lg:gap-12 items-start">
      {/* Builder */}
      <div className="border border-combat-900 bg-bone-50">
        <div className="bg-combat-900 text-cream-50 px-5 py-3 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase">
          Step · Build Your Subscription
        </div>
        <div className="p-5 sm:p-7 grid gap-6">
          {/* Coffee picker */}
          <fieldset>
            <legend className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 mb-3">
              01 · Pick your roast
            </legend>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {COFFEE_OPTIONS.map((p) => {
                const checked = productSlug === p.slug;
                return (
                  <label
                    key={p.slug}
                    className={`flex items-center gap-3 border px-3 py-2.5 cursor-pointer motion-safe:transition-colors motion-safe:duration-150 ${
                      checked
                        ? "border-combat-900 bg-bone-100 shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                        : "border-canvas-300 hover:border-combat-900"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sub-product"
                      value={p.slug}
                      checked={checked}
                      onChange={() => setProductSlug(p.slug)}
                      className="accent-brass-500"
                    />
                    <span className="relative w-9 h-11 shrink-0 bg-bone-200 border border-canvas-300 overflow-hidden">
                      <Image src={p.image} alt="" fill sizes="36px" className="object-cover object-center" />
                    </span>
                    <span className="font-stencil font-extrabold text-[12px] sm:text-[13px] uppercase tracking-[.01em] text-combat-900 leading-tight line-clamp-2">
                      {p.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Cadence */}
          <fieldset>
            <legend className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 mb-3">
              02 · Pick your cadence
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {SUBSCRIBE.cadences.map((c) => {
                const checked = cadence === c.code;
                return (
                  <label
                    key={c.code}
                    className={`flex flex-col border px-3 py-2.5 cursor-pointer motion-safe:transition-colors motion-safe:duration-150 ${
                      checked
                        ? "border-combat-900 bg-bone-100 shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                        : "border-canvas-300 hover:border-combat-900"
                    } ${c.highlight ? "ring-1 ring-brass-500/30" : ""}`}
                  >
                    <span className="flex items-center justify-between">
                      <input
                        type="radio"
                        name="sub-cadence"
                        value={c.code}
                        checked={checked}
                        onChange={() => setCadence(c.code)}
                        className="accent-brass-500"
                      />
                      {c.highlight && (
                        <span className="font-mono font-bold text-[8px] tracking-[.18em] uppercase bg-brass-500 text-combat-900 px-1.5 py-0.5">
                          Popular
                        </span>
                      )}
                    </span>
                    <span className="mt-1.5 font-stencil font-extrabold text-[13px] uppercase tracking-[.01em] text-combat-900 leading-tight">
                      {c.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold mt-0.5">
                      {c.note}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Size + Grind */}
          <fieldset>
            <legend className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 mb-3">
              03 · Size &amp; Grind
            </legend>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="grid gap-2">
                <span className="font-mono font-bold text-[9px] tracking-[.20em] uppercase text-ash-600">
                  Size
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(["12oz", "2lb"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSize(v)}
                      aria-pressed={size === v}
                      className={`min-h-[42px] px-3 font-mono font-bold text-[10px] tracking-[.20em] uppercase border motion-safe:transition-colors motion-safe:duration-150 ${
                        size === v
                          ? "bg-combat-900 text-brass-400 border-combat-900"
                          : "bg-bone-50 text-combat-900 border-combat-900/30 hover:border-combat-900"
                      }`}
                    >
                      {v.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <span className="font-mono font-bold text-[9px] tracking-[.20em] uppercase text-ash-600">
                  Grind
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {(["ground", "whole-bean"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setGrind(v)}
                      aria-pressed={grind === v}
                      className={`min-h-[42px] px-3 font-mono font-bold text-[10px] tracking-[.20em] uppercase border motion-safe:transition-colors motion-safe:duration-150 ${
                        grind === v
                          ? "bg-combat-900 text-brass-400 border-combat-900"
                          : "bg-bone-50 text-combat-900 border-combat-900/30 hover:border-combat-900"
                      }`}
                    >
                      {v === "ground" ? "Ground" : "Whole Bean"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Summary */}
      <aside aria-label="Subscription summary" className="border border-combat-900 bg-bone-50 lg:sticky lg:top-[88px]">
        <div className="bg-combat-900 text-cream-50 px-5 py-3 flex items-center justify-between">
          <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400">
            Your Plan
          </span>
          <span className="font-mono font-bold text-[10px] tracking-[.18em] uppercase text-cream-50/70">
            12% Off · Always
          </span>
        </div>
        <div className="p-5 sm:p-7">
          <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-700">
            {SUBSCRIBE.cadences.find((c) => c.code === cadence)?.label}
          </div>
          <h3 className="mt-1 font-stencil font-extrabold text-[clamp(1.25rem,2.6vw,1.5rem)] uppercase tracking-[.01em] leading-tight text-combat-900">
            {product.name}
          </h3>
          <div className="mt-1 font-mono text-[11px] tracking-[.18em] uppercase text-ash-600 font-semibold">
            {size.toUpperCase()} · {grind === "ground" ? "GROUND" : "WHOLE BEAN"}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-canvas-300 pt-5">
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-ash-600">
                Per Shipment
              </div>
              <div className="mt-1 font-stencil font-black text-[clamp(1.75rem,3vw,2.25rem)] leading-none tracking-[.01em] text-combat-900 tabular-nums">
                {formatUsd(subscriberUnit)}
              </div>
              <div className="mt-1.5 font-mono text-[10px] tracking-[.18em] uppercase text-brass-700 font-semibold">
                Save {formatUsd(savedPerShipment)} vs one-time
              </div>
            </div>
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-ash-600">
                One-Time Price
              </div>
              <div className="mt-1 font-stencil font-extrabold text-[18px] leading-none tracking-[.01em] text-ash-600 line-through tabular-nums">
                {formatUsd(baseUnit)}
              </div>
            </div>
          </div>

          <ul className="mt-5 grid gap-2.5 border-t border-canvas-300 pt-5">
            {SUBSCRIBE.benefits.map((b) => (
              <li key={b} className="grid grid-cols-[18px_1fr] gap-2 items-baseline text-[13px] sm:text-[14px] leading-[1.55] text-ash-800">
                <Check size={14} strokeWidth={2.4} className="text-brass-700 mt-1" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <BladeButton
            variant="brass"
            size="lg"
            className="w-full mt-6"
            onClick={onStart}
            data-event="subscribe_start"
          >
            Start Subscription
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="ml-2" />
          </BladeButton>
          <p className="mt-3 font-mono text-[10px] tracking-[.20em] uppercase text-ash-600 font-semibold text-center">
            Pause or cancel anytime · No commitment
          </p>
        </div>
      </aside>
    </div>
  );
}
