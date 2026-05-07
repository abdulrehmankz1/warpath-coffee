import type { Product } from "@/lib/data/warpath";

export type CartLineId = string;

export type CartLine = {
  id: CartLineId;
  slug: Product["slug"];
  name: string;
  image: string;
  href: string;
  unitPriceUsd: number;
  qty: number;
  grind?: "ground" | "whole-bean";
  size?: "12oz" | "2lb";
  category: Product["category"];
};

export type CartState = {
  hydrated: boolean;
  items: CartLine[];
};

export type CartTotals = {
  itemCount: number;
  subtotalUsd: number;
  freeShipRemainingUsd: number;
  freeShipProgressPct: number;
  qualifiesForFreeShipping: boolean;
};

export type AddItemInput = {
  product: Pick<
    Product,
    "slug" | "name" | "image" | "href" | "priceUsd" | "category"
  >;
  qty: number;
  grind?: CartLine["grind"];
  size?: CartLine["size"];
  unitPriceUsd?: number;
};

export type CartAction =
  | { type: "hydrate"; items: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; id: CartLineId }
  | { type: "set-qty"; id: CartLineId; qty: number }
  | { type: "clear" };

export const CART_STORAGE_KEY = "warpath:cart:v1";
