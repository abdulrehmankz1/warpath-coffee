"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Mail, Package, Truck } from "lucide-react";
import { Button } from "./Button";
import { formatUsd } from "@/lib/data/warpath";

type LastOrder = {
  code: string;
  eta: string;
  total: number;
  email: string;
  firstName: string;
  itemCount: number;
};

const FALLBACK: LastOrder = {
  code: "OP-WARPATH",
  eta: "5–7 business days",
  total: 0,
  email: "you@warpath.coffee",
  firstName: "Operator",
  itemCount: 0,
};

export function OrderConfirmation() {
  const [order, setOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("warpath:last-order");
      if (raw) {
        const parsed = JSON.parse(raw) as LastOrder;
        setOrder(parsed);
        return;
      }
    } catch {
      // ignore
    }
    setOrder(FALLBACK);
  }, []);

  const o = order ?? FALLBACK;

  return (
    <div className="grid lg:grid-cols-[7fr_5fr] gap-8 lg:gap-12 items-start">
      {/* Confirmation panel */}
      <div className="border border-combat-900 bg-bone-50">
        <div className="bg-combat-900 text-cream-50 px-5 sm:px-6 py-4 flex items-center gap-3 border-b border-brass-500/30">
          <CheckCircle2 size={20} strokeWidth={1.8} className="text-brass-400" aria-hidden="true" />
          <div>
            <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400">
              Status · Order Confirmed
            </div>
            <div className="font-mono text-[11px] tracking-[.16em] uppercase text-cream-50/80 font-semibold mt-0.5">
              Reference {o.code}
            </div>
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
            Mission Accomplished
          </div>
          <h1 className="font-display font-black uppercase leading-[1.0] tracking-[-0.025em] text-[clamp(2rem,5vw,3.5rem)] text-combat-900">
            Thanks{o.firstName ? `, ${o.firstName}` : ""}.
            <br />
            <span className="text-brass-700">Your coffee is on the warpath.</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[16px] leading-[1.6] text-ash-700 max-w-[58ch]">
            We just dispatched your confirmation to{" "}
            <span className="font-mono text-[13px] tracking-[.04em] text-combat-900 font-bold">
              {o.email}
            </span>
            . Hold tight while we roast and pack your order.
          </p>

          {/* Order summary card */}
          <dl className="mt-6 sm:mt-8 grid sm:grid-cols-3 gap-px bg-canvas-300 border border-canvas-300">
            <div className="bg-bone-50 p-4 sm:p-5">
              <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                Order Code
              </dt>
              <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight tabular-nums">
                {o.code}
              </dd>
            </div>
            <div className="bg-bone-50 p-4 sm:p-5">
              <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                Estimated Arrival
              </dt>
              <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight">
                {o.eta}
              </dd>
            </div>
            <div className="bg-bone-50 p-4 sm:p-5">
              <dt className="font-mono font-bold text-[10px] tracking-[.22em] uppercase text-brass-700 mb-1.5">
                Total Charged
              </dt>
              <dd className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight tabular-nums">
                {formatUsd(o.total)}
              </dd>
            </div>
          </dl>

          {/* What happens next */}
          <div className="mt-8 sm:mt-10">
            <h2 className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-4">
              What Happens Next
            </h2>
            <ol className="grid gap-3">
              {[
                {
                  icon: Mail,
                  title: "Confirmation Email",
                  body: `Receipt and order details are on their way to ${o.email}.`,
                },
                {
                  icon: Package,
                  title: "Roast & Pack",
                  body: "Your beans are roasted to order and bagged within 48 hours.",
                },
                {
                  icon: Truck,
                  title: "Tracking Drop",
                  body: "We&rsquo;ll send a tracking link as soon as your order is dispatched.",
                },
              ].map(({ icon: Icon, title, body }, i) => (
                <li
                  key={title}
                  className="grid grid-cols-[40px_auto_1fr] sm:grid-cols-[48px_auto_1fr] items-center gap-3 sm:gap-4 border border-canvas-300 bg-bone-100 px-4 py-3"
                >
                  <span className="font-mono font-bold text-[10px] tracking-[.22em] text-brass-700">
                    0{i + 1}
                  </span>
                  <Icon size={18} strokeWidth={1.6} className="text-combat-900" aria-hidden="true" />
                  <div>
                    <div className="font-stencil font-extrabold text-[14px] uppercase tracking-[.01em] text-combat-900 leading-tight">
                      {title}
                    </div>
                    <div
                      className="font-mono text-[11px] tracking-[.04em] text-ash-700 mt-0.5"
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3">
            <Button variant="brass" size="base" href="/shop" opCode="OP-SHOP">
              Continue Shopping
            </Button>
            <Button variant="ghost" size="base" href="/">
              Back to Home →
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar — subscribe + support */}
      <aside aria-label="Next steps" className="grid gap-4 sm:gap-6 lg:sticky lg:top-[88px]">
        <div className="border border-combat-900 bg-combat-900 text-cream-50 p-5 sm:p-6">
          <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-500 mb-3">
            Subscribe & Save
          </div>
          <h2 className="font-display font-black uppercase text-[clamp(1.4rem,2.6vw,1.875rem)] leading-[1] tracking-[-.02em]">
            Make sure you never run dry.
          </h2>
          <p className="mt-3 text-[14px] leading-[1.6] text-cream-50/72">
            Pause or swap by SMS. No lock-in. We&rsquo;ll deliver fresh, on schedule.
          </p>
          <div className="mt-4">
            <Button variant="brass" size="base" href="/subscribe" opCode="OP-SUB">
              Start Subscription
            </Button>
          </div>
        </div>

        <div className="border border-combat-900 bg-bone-50 p-5 sm:p-6">
          <div className="font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-700 mb-3">
            Need a Hand?
          </div>
          <h3 className="font-stencil font-extrabold text-[18px] uppercase tracking-[.02em] text-combat-900 leading-tight">
            We&rsquo;re standing by.
          </h3>
          <ul className="mt-3 grid gap-2">
            <li>
              <Link
                href="/contact"
                className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5"
              >
                Contact Support →
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5"
              >
                Browse FAQs →
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-policy"
                className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-combat-900 hover:text-brass-700 motion-safe:transition-colors motion-safe:duration-150 inline-flex items-center gap-1.5"
              >
                Shipping Policy →
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
