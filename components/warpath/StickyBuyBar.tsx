"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatUsd } from "@/lib/data/warpath";
import { BladeButton } from "./BladeButton";
import { QuantityStepper } from "./QuantityStepper";

type Props = {
  productName: string;
  variantSummary?: string;
  price: number;
  quantity: number;
  onQuantityChange: (n: number) => void;
  onAddToCart: () => void;
  visible: boolean;
  soldOut?: boolean;
};

export function StickyBuyBar(props: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (typeof document === "undefined") return null;

  const node = (
    <div
      data-testid="sticky-buy-bar"
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-40 bg-combat-900 border-t border-brass-500/30 px-3 py-3",
        "motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out",
        props.visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      aria-hidden={!props.visible}
    >
      <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
        <div className="min-w-0">
          <div className="font-stencil font-bold text-[13px] uppercase tracking-[.01em] text-cream-50 leading-tight truncate">
            {props.productName}
          </div>
          <div className="font-mono text-[10px] tracking-[.18em] uppercase text-brass-400 font-semibold truncate">
            {props.variantSummary || formatUsd(props.price)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!props.soldOut && (
            <QuantityStepper
              size="sm"
              value={props.quantity}
              onChange={props.onQuantityChange}
            />
          )}
          <BladeButton
            variant="brass"
            size="sm"
            onClick={props.onAddToCart}
            disabled={props.soldOut}
            data-event="cart_add_sticky"
          >
            <ShoppingBag size={14} strokeWidth={1.8} aria-hidden="true" className="-ml-0.5 mr-1.5" />
            {props.soldOut ? "Sold Out" : "Add"}
          </BladeButton>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
