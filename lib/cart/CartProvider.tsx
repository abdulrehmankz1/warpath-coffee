"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { SHIPPING } from "@/lib/data/warpath";
import {
  CART_STORAGE_KEY,
  type AddItemInput,
  type CartAction,
  type CartLine,
  type CartLineId,
  type CartState,
  type CartTotals,
} from "./types";

const initialState: CartState = { hydrated: false, items: [] };

function lineId(input: AddItemInput): CartLineId {
  const { product, grind, size } = input;
  return [product.slug, size ?? "-", grind ?? "-"].join("|");
}

function effectiveUnitPrice(input: AddItemInput): number {
  if (typeof input.unitPriceUsd === "number") return input.unitPriceUsd;
  // 2lb adds a $20 premium for coffee/decaf. Mirrors PdpBuyBox.
  if (input.size === "2lb") return input.product.priceUsd + 20;
  return input.product.priceUsd;
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { hydrated: true, items: action.items };
    case "add": {
      const idx = state.items.findIndex((i) => i.id === action.line.id);
      if (idx >= 0) {
        const next = [...state.items];
        next[idx] = { ...next[idx], qty: next[idx].qty + action.line.qty };
        return { ...state, items: next };
      }
      return { ...state, items: [...state.items, action.line] };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "set-qty": {
      const qty = Math.max(0, Math.min(99, action.qty));
      if (qty === 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.id ? { ...i, qty } : i)),
      };
    }
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  state: CartState;
  totals: CartTotals;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (input: AddItemInput) => void;
  removeItem: (id: CartLineId) => void;
  setQty: (id: CartLineId, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsed: CartLine[] = raw ? JSON.parse(raw) : [];
      dispatch({
        type: "hydrate",
        items: Array.isArray(parsed) ? parsed : [],
      });
    } catch {
      dispatch({ type: "hydrate", items: [] });
    }
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(state.items),
      );
    } catch {
      // ignore quota / disabled storage
    }
  }, [state.hydrated, state.items]);

  const totals: CartTotals = useMemo(() => {
    const subtotalUsd = state.items.reduce(
      (sum, i) => sum + i.unitPriceUsd * i.qty,
      0,
    );
    const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);
    const threshold: number = SHIPPING.freeShippingThresholdUsd;
    const remaining = Math.max(0, threshold - subtotalUsd);
    const progress =
      threshold > 0 ? Math.min(100, (subtotalUsd / threshold) * 100) : 100;
    return {
      itemCount,
      subtotalUsd,
      freeShipRemainingUsd: remaining,
      freeShipProgressPct: progress,
      qualifiesForFreeShipping: remaining === 0 && subtotalUsd > 0,
    };
  }, [state.items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((input: AddItemInput) => {
    const line: CartLine = {
      id: lineId(input),
      slug: input.product.slug,
      name: input.product.name,
      image: input.product.image,
      href: input.product.href,
      category: input.product.category,
      unitPriceUsd: effectiveUnitPrice(input),
      qty: input.qty,
      grind: input.grind,
      size: input.size,
    };
    dispatch({ type: "add", line });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (id: CartLineId) => dispatch({ type: "remove", id }),
    [],
  );
  const setQty = useCallback(
    (id: CartLineId, qty: number) => dispatch({ type: "set-qty", id, qty }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value: CartContextValue = useMemo(
    () => ({
      state,
      totals,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setQty,
      clear,
    }),
    [
      state,
      totals,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setQty,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCart must be used within <CartProvider>. Wrap your app.");
  return ctx;
}
