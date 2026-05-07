"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, type Product } from "@/lib/data/warpath";

const RECENT_KEY = "warpath_search_recent";
const RECENT_MAX = 5;

type SearchCtx = {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
  results: Product[];
  recent: string[];
  pushRecent: (q: string) => void;
  clearRecent: () => void;
  /** Top sellers shown when query is empty. */
  suggested: Product[];
};

const Ctx = createContext<SearchCtx | null>(null);

const SUGGESTED = [...PRODUCTS]
  .filter((p) => !p.outOfStock)
  .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
  .slice(0, 4);

function score(product: Product, q: string): number {
  const needle = q.toLowerCase().trim();
  if (!needle) return 0;
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  const desc = product.description?.toLowerCase() ?? "";
  const notes = (product.notes ?? []).join(" ").toLowerCase();
  let s = 0;
  if (name.startsWith(needle)) s += 100;
  if (name.includes(needle)) s += 60;
  if (cat.includes(needle)) s += 25;
  if (notes.includes(needle)) s += 18;
  if (desc.includes(needle)) s += 8;
  return s;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  // Hydrate recents
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setRecent(parsed.filter((s): s is string => typeof s === "string"));
        }
      }
    } catch {}
  }, []);

  const openSearch = useCallback(() => setOpen(true), []);
  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  const pushRecent = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setRecent((prev) => {
      const next = [trimmed, ...prev.filter((r) => r !== trimmed)].slice(
        0,
        RECENT_MAX,
      );
      try {
        window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      window.localStorage.removeItem(RECENT_KEY);
    } catch {}
  }, []);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    return PRODUCTS.map((p) => ({ p, s: score(p, trimmed) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.p);
  }, [query]);

  // Cmd/Ctrl + K to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "/" && !isOpen) {
        const tag = (document.activeElement?.tagName ?? "").toUpperCase();
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const value = useMemo<SearchCtx>(
    () => ({
      isOpen,
      openSearch,
      closeSearch,
      query,
      setQuery,
      results,
      recent,
      pushRecent,
      clearRecent,
      suggested: SUGGESTED,
    }),
    [isOpen, openSearch, closeSearch, query, results, recent, pushRecent, clearRecent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSearch(): SearchCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
}
