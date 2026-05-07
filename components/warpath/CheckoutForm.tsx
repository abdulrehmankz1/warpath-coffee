"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CreditCard, Lock, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/lib/cart/CartProvider";
import { formatUsd, SHIPPING } from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";
import { Button } from "./Button";
import { FormLegalNote } from "./FormLegalNote";

type ShippingMethod = "standard" | "priority";
type PaymentMethod = "card" | "paypal";

const SHIPPING_OPTIONS: {
  value: ShippingMethod;
  label: string;
  eta: string;
  costUsd: number;
}[] = [
  { value: "standard", label: "Standard", eta: "5–7 business days", costUsd: 6.95 },
  { value: "priority", label: "Priority", eta: "2–3 business days", costUsd: 14.95 },
];

const TAX_RATE = 0.06;

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 flex items-center justify-between"
    >
      <span>{children}</span>
      {hint && (
        <span className="font-mono font-semibold text-[9px] tracking-[.16em] text-ash-600 normal-case">
          {hint}
        </span>
      )}
    </label>
  );
}

const inputBase =
  "w-full bg-bone-50 border border-combat-900 px-3 py-3 min-h-[48px] font-mono text-[14px] text-combat-900 placeholder:text-ash-500 placeholder:font-normal focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500 motion-safe:transition-shadow motion-safe:duration-150";

export function CheckoutForm() {
  const router = useRouter();
  const { state, totals, clear } = useCart();
  const [shipMethod, setShipMethod] = useState<ShippingMethod>("standard");
  const [payMethod, setPayMethod] = useState<PaymentMethod>("card");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  if (state.hydrated && state.items.length === 0) {
    return (
      <div className="border border-combat-900 bg-bone-100 py-14 sm:py-16 px-6 text-center max-w-[680px] mx-auto">
        <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
          Status · Empty Basket
        </div>
        <h2 className="font-display font-black text-[clamp(1.5rem,4vw,2.25rem)] leading-[1] tracking-[-.018em] uppercase text-combat-900">
          Nothing to check out yet.
        </h2>
        <p className="mt-3 text-[14px] sm:text-[15px] text-ash-700 leading-[1.6] max-w-[44ch] mx-auto">
          Add a bag of coffee or a piece of drinkware before you head to checkout.
        </p>
        <div className="mt-6">
          <Button variant="brass" size="base" href="/shop" opCode="OP-SHOP">
            Browse the Arsenal
          </Button>
        </div>
      </div>
    );
  }

  const shippingCost = totals.qualifiesForFreeShipping
    ? 0
    : SHIPPING_OPTIONS.find((s) => s.value === shipMethod)!.costUsd;
  const tax = +(totals.subtotalUsd * TAX_RATE).toFixed(2);
  const grandTotal = +(totals.subtotalUsd + shippingCost + tax).toFixed(2);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    const fd = new FormData(e.currentTarget);
    const required = [
      "email",
      "firstName",
      "lastName",
      "address1",
      "city",
      "state",
      "zip",
    ];
    for (const k of required) {
      if (!String(fd.get(k) ?? "").trim()) {
        setErrors("Please fill in all required fields.");
        return;
      }
    }
    setSubmitting(true);
    // Stand-in for a real /api/checkout call.
    const orderCode = `OP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const eta =
      shipMethod === "priority"
        ? "2–3 business days"
        : "5–7 business days";
    const sessionPayload = {
      code: orderCode,
      eta,
      total: grandTotal,
      email: String(fd.get("email") ?? ""),
      firstName: String(fd.get("firstName") ?? ""),
      itemCount: totals.itemCount,
    };
    try {
      window.sessionStorage.setItem(
        "warpath:last-order",
        JSON.stringify(sessionPayload),
      );
    } catch {
      // ignore
    }
    clear();
    router.push("/checkout/success");
  };

  return (
    <form onSubmit={onSubmit} className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-start" noValidate>
      {/* Left column — form sections */}
      <div className="grid gap-6 sm:gap-8">
        {/* Express checkout */}
        <section
          aria-labelledby="express-heading"
          className="border border-combat-900 bg-bone-50"
        >
          <header className="bg-combat-900 text-cream-50 px-5 py-3 flex items-center justify-between">
            <h2
              id="express-heading"
              className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
            >
              Express Checkout
            </h2>
            <span className="font-mono text-[9px] tracking-[.20em] uppercase text-cream-50/70 font-semibold">
              One-tap pay
            </span>
          </header>
          <div className="p-5 sm:p-6 grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                aria-label="Pay with Shop Pay"
                data-event="checkout_express_shoppay"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#5A31F4] text-white font-display font-black text-[15px] tracking-[.02em] uppercase border border-[#5A31F4] hover:brightness-110 motion-safe:transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                Shop Pay
              </button>
              <button
                type="button"
                aria-label="Pay with Apple Pay"
                data-event="checkout_express_applepay"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-combat-900 text-cream-50 font-display font-black text-[15px] tracking-[.02em] uppercase border border-combat-900 hover:bg-combat-800 motion-safe:transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                <span aria-hidden="true"></span>Pay
              </button>
              <button
                type="button"
                aria-label="Pay with Google Pay"
                data-event="checkout_express_gpay"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-bone-50 text-combat-900 font-display font-black text-[15px] tracking-[.02em] uppercase border border-combat-900 hover:bg-bone-100 motion-safe:transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                G Pay
              </button>
            </div>
            <div
              role="separator"
              aria-label="Or continue manually"
              className="relative mt-2 mb-1 flex items-center justify-center"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-combat-900/30" />
              <span className="relative bg-bone-50 px-3 font-mono font-bold text-[10px] tracking-[.28em] uppercase text-ash-700">
                Or pay by card
              </span>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          aria-labelledby="contact-heading"
          className="border border-combat-900 bg-bone-50"
        >
          <header className="bg-combat-900 text-cream-50 px-5 py-3 flex items-center justify-between">
            <h2
              id="contact-heading"
              className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
            >
              Step 01 · Contact
            </h2>
            <span className="font-mono text-[9px] tracking-[.20em] uppercase text-cream-50/70 font-semibold">
              Shipping notifications
            </span>
          </header>
          <div className="p-5 sm:p-6 grid gap-4">
            <div>
              <FieldLabel htmlFor="email" hint="Required">
                Email
              </FieldLabel>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="operator@warpath.coffee"
                className={`${inputBase} mt-1.5`}
              />
            </div>
            <label className="flex items-start gap-2.5 font-mono text-[11px] tracking-[.14em] uppercase text-ash-700 font-semibold">
              <input
                type="checkbox"
                name="newsletter"
                defaultChecked
                className="mt-0.5 accent-brass-500"
              />
              <span>Send me drops, new roasts, and Warpath comms.</span>
            </label>
          </div>
        </section>

        {/* Shipping */}
        <section
          aria-labelledby="shipping-heading"
          className="border border-combat-900 bg-bone-50"
        >
          <header className="bg-combat-900 text-cream-50 px-5 py-3">
            <h2
              id="shipping-heading"
              className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
            >
              Step 02 · Ship-To Address
            </h2>
          </header>
          <div className="p-5 sm:p-6 grid gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="firstName" hint="Required">First Name</FieldLabel>
                <input id="firstName" name="firstName" autoComplete="given-name" required className={`${inputBase} mt-1.5`} />
              </div>
              <div>
                <FieldLabel htmlFor="lastName" hint="Required">Last Name</FieldLabel>
                <input id="lastName" name="lastName" autoComplete="family-name" required className={`${inputBase} mt-1.5`} />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="address1" hint="Required">Address</FieldLabel>
              <input id="address1" name="address1" autoComplete="address-line1" required className={`${inputBase} mt-1.5`} />
            </div>
            <div>
              <FieldLabel htmlFor="address2">Apt / Suite</FieldLabel>
              <input id="address2" name="address2" autoComplete="address-line2" className={`${inputBase} mt-1.5`} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <FieldLabel htmlFor="city" hint="Required">City</FieldLabel>
                <input id="city" name="city" autoComplete="address-level2" required className={`${inputBase} mt-1.5`} />
              </div>
              <div>
                <FieldLabel htmlFor="state" hint="Required">State</FieldLabel>
                <input id="state" name="state" autoComplete="address-level1" required className={`${inputBase} mt-1.5`} />
              </div>
              <div>
                <FieldLabel htmlFor="zip" hint="Required">ZIP</FieldLabel>
                <input id="zip" name="zip" inputMode="numeric" autoComplete="postal-code" required className={`${inputBase} mt-1.5`} />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="phone" hint="Optional">Phone</FieldLabel>
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="For delivery questions only" className={`${inputBase} mt-1.5`} />
            </div>
          </div>
        </section>

        {/* Shipping method */}
        <section
          aria-labelledby="ship-method-heading"
          className="border border-combat-900 bg-bone-50"
        >
          <header className="bg-combat-900 text-cream-50 px-5 py-3">
            <h2
              id="ship-method-heading"
              className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
            >
              Step 03 · Shipping Method
            </h2>
          </header>
          <div className="p-5 sm:p-6 grid gap-3">
            {SHIPPING_OPTIONS.map((opt) => {
              const checked = shipMethod === opt.value;
              const free = totals.qualifiesForFreeShipping && opt.value === "standard";
              return (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer motion-safe:transition-colors motion-safe:duration-150 ${
                    checked
                      ? "border-combat-900 bg-bone-100 shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                      : "border-canvas-300 bg-bone-50 hover:border-combat-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipMethod"
                      value={opt.value}
                      checked={checked}
                      onChange={() => setShipMethod(opt.value)}
                      className="accent-brass-500"
                    />
                    <span>
                      <span className="block font-stencil font-extrabold text-[14px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                        {opt.label}
                      </span>
                      <span className="block font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold mt-0.5">
                        {opt.eta}
                      </span>
                    </span>
                  </span>
                  <span className="font-mono font-bold text-[13px] tracking-[.04em] tabular-nums text-combat-900">
                    {free ? "FREE" : formatUsd(opt.costUsd)}
                  </span>
                </label>
              );
            })}
            <p className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold">
              Free standard shipping on orders ${SHIPPING.freeShippingThresholdUsd}+
            </p>
          </div>
        </section>

        {/* Payment (visual only) */}
        <section
          aria-labelledby="payment-heading"
          className="border border-combat-900 bg-bone-50"
        >
          <header className="bg-combat-900 text-cream-50 px-5 py-3 flex items-center justify-between">
            <h2
              id="payment-heading"
              className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
            >
              Step 04 · Payment
            </h2>
            <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[9px] tracking-[.20em] uppercase text-brass-400">
              <Lock size={11} strokeWidth={2} aria-hidden="true" />
              Encrypted
            </span>
          </header>
          <div className="p-5 sm:p-6 grid gap-4">
            <div className="grid grid-cols-2 gap-2.5">
              {(
                [
                  { v: "card", label: "Credit Card", icon: CreditCard },
                  { v: "paypal", label: "PayPal", icon: ShieldCheck },
                ] as const
              ).map(({ v, label, icon: Icon }) => {
                const checked = payMethod === v;
                return (
                  <label
                    key={v}
                    className={`flex items-center gap-2 border px-4 py-3 cursor-pointer motion-safe:transition-colors motion-safe:duration-150 ${
                      checked
                        ? "border-combat-900 bg-bone-100 shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]"
                        : "border-canvas-300 hover:border-combat-900"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payMethod"
                      value={v}
                      checked={checked}
                      onChange={() => setPayMethod(v)}
                      className="accent-brass-500"
                    />
                    <Icon size={14} strokeWidth={1.8} className="text-brass-700" aria-hidden="true" />
                    <span className="font-mono font-bold text-[11px] tracking-[.20em] uppercase text-combat-900">
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
            {payMethod === "card" ? (
              <div className="grid gap-4">
                <div>
                  <FieldLabel htmlFor="cc-name">Name on Card</FieldLabel>
                  <input id="cc-name" name="ccName" autoComplete="cc-name" className={`${inputBase} mt-1.5`} />
                </div>
                <div>
                  <FieldLabel htmlFor="cc-number">Card Number</FieldLabel>
                  <input
                    id="cc-number"
                    name="ccNumber"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    placeholder="•••• •••• •••• ••••"
                    className={`${inputBase} mt-1.5 tabular-nums`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FieldLabel htmlFor="cc-exp">Expiry</FieldLabel>
                    <input id="cc-exp" name="ccExp" autoComplete="cc-exp" placeholder="MM / YY" className={`${inputBase} mt-1.5 tabular-nums`} />
                  </div>
                  <div>
                    <FieldLabel htmlFor="cc-cvc">CVC</FieldLabel>
                    <input id="cc-cvc" name="ccCvc" autoComplete="cc-csc" placeholder="•••" inputMode="numeric" className={`${inputBase} mt-1.5 tabular-nums`} />
                  </div>
                </div>
                <p className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold inline-flex items-center gap-1.5">
                  <Lock size={11} strokeWidth={2} aria-hidden="true" />
                  256-bit SSL · Card details never touch our servers
                </p>
              </div>
            ) : (
              <p className="font-mono text-[12px] tracking-[.04em] text-ash-700 leading-[1.6]">
                You&rsquo;ll be redirected to PayPal to complete payment securely.
              </p>
            )}
          </div>
        </section>

        {/* Order notes */}
        <section className="border border-combat-900 bg-bone-50">
          <header className="bg-combat-900 text-cream-50 px-5 py-3">
            <h2 className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400">
              Optional · Order Notes
            </h2>
          </header>
          <div className="p-5 sm:p-6">
            <FieldLabel htmlFor="notes">Anything we should know?</FieldLabel>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Gift message, drop instructions, etc."
              className={`${inputBase} mt-1.5 leading-[1.5] py-2.5`}
            />
          </div>
        </section>

        {errors && (
          <div
            role="alert"
            className="border border-alert-red bg-alert-red/10 text-alert-red px-4 py-3 font-mono font-bold text-[11px] tracking-[.18em] uppercase"
          >
            {errors}
          </div>
        )}

        <div className="lg:hidden">
          <BladeButton
            variant="brass"
            size="lg"
            type="submit"
            disabled={submitting}
            className="w-full"
            data-event="checkout_place_order"
          >
            {submitting ? "Placing Order…" : `Place Order · ${formatUsd(grandTotal)}`}
          </BladeButton>
          <FormLegalNote tone="light" className="mt-3 text-center" />
        </div>
      </div>

      {/* Right column — order summary */}
      <aside
        aria-labelledby="checkout-summary-heading"
        className="border border-combat-900 bg-bone-50 lg:sticky lg:top-[88px]"
      >
        <div className="bg-combat-900 text-cream-50 px-5 py-3 flex items-center justify-between">
          <h2
            id="checkout-summary-heading"
            className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400"
          >
            Order Summary
          </h2>
          <Link
            href="/cart"
            className="font-mono font-bold text-[10px] tracking-[.20em] uppercase text-cream-50/80 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
          >
            Edit
          </Link>
        </div>

        <ul className="divide-y divide-canvas-300 max-h-[420px] overflow-y-auto">
          {state.items.map((item) => (
            <li key={item.id} className="px-5 py-4 grid grid-cols-[64px_1fr_auto] gap-3 items-center">
              <div className="relative aspect-[4/5] bg-bone-200 border border-canvas-300 overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 inline-flex items-center justify-center bg-combat-900 text-brass-400 font-mono font-bold text-[10px] tabular-nums leading-none"
                >
                  {item.qty}
                </span>
              </div>
              <div className="min-w-0">
                <div className="font-stencil font-extrabold text-[12px] sm:text-[13px] uppercase tracking-[.01em] leading-tight text-combat-900 line-clamp-2">
                  {item.name}
                </div>
                {(item.size || item.grind) && (
                  <div className="mt-1 font-mono text-[9px] tracking-[.18em] uppercase text-ash-600 font-semibold">
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
              <div className="font-mono font-bold text-[12px] tabular-nums text-combat-900">
                {formatUsd(item.unitPriceUsd * item.qty)}
              </div>
            </li>
          ))}
        </ul>

        {/* Promo code */}
        <div className="border-t border-canvas-300 p-5 sm:p-6">
          <FieldLabel htmlFor="promo">Promo Code</FieldLabel>
          <div className="mt-1.5 flex gap-2">
            <input
              id="promo"
              name="promo"
              placeholder="VETERAN15"
              className={`${inputBase} flex-1`}
            />
            <button
              type="button"
              className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900 border border-combat-900 px-4 hover:bg-combat-900 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Totals */}
        <dl className="border-t border-canvas-300 px-5 sm:px-6 py-4 grid gap-2.5">
          <div className="flex items-center justify-between">
            <dt className="font-mono text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold">
              Subtotal
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
              {shippingCost === 0 ? "FREE" : formatUsd(shippingCost)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="font-mono text-[12px] tracking-[.18em] uppercase text-ash-700 font-semibold">
              Tax (est.)
            </dt>
            <dd className="font-mono font-bold text-[14px] tabular-nums text-combat-900">
              {formatUsd(tax)}
            </dd>
          </div>
        </dl>

        <div className="border-t border-combat-900 px-5 sm:px-6 py-4 flex items-center justify-between">
          <span className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-ash-700">
            Total
          </span>
          <span className="font-stencil font-black text-[26px] sm:text-[28px] leading-none tracking-[.01em] text-combat-900 tabular-nums">
            {formatUsd(grandTotal)}
          </span>
        </div>

        {/* Place order — desktop only (mobile shows inline) */}
        <div className="hidden lg:block px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
          <BladeButton
            variant="brass"
            size="lg"
            type="submit"
            disabled={submitting}
            className="w-full"
            data-event="checkout_place_order"
          >
            {submitting ? "Placing Order…" : `Place Order · ${formatUsd(grandTotal)}`}
          </BladeButton>
          <p className="mt-3 font-mono text-[10px] tracking-[.20em] uppercase text-ash-600 font-semibold text-center inline-flex items-center justify-center gap-1.5 w-full">
            <Lock size={11} strokeWidth={2} aria-hidden="true" />
            Secure 256-bit SSL · 30-day guarantee
          </p>
          <FormLegalNote tone="light" className="mt-3 text-center" />
        </div>

        <ul className="hidden lg:grid border-t border-canvas-300 px-5 sm:px-6 py-4 gap-2.5">
          <li className="flex items-start gap-3">
            <Truck size={14} strokeWidth={1.8} className="mt-0.5 text-brass-700" aria-hidden="true" />
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900">
                Ships in 48 hours
              </div>
              <div className="font-mono text-[10px] tracking-[.16em] uppercase text-ash-600 font-semibold">
                Roasted to order, then dispatched
              </div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <ShieldCheck size={14} strokeWidth={1.8} className="mt-0.5 text-brass-700" aria-hidden="true" />
            <div>
              <div className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-combat-900">
                30-Day Guarantee
              </div>
              <div className="font-mono text-[10px] tracking-[.16em] uppercase text-ash-600 font-semibold">
                Smooth or your money back
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </form>
  );
}
