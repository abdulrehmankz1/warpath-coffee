"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { useCart } from "@/lib/cart/CartProvider";
import { useSearch } from "@/lib/search/SearchProvider";
import { NAV_PRIMARY, BRAND, HERO } from "@/lib/data/warpath";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { totals, openCart } = useCart();
  const { openSearch } = useSearch();
  const cartCount = totals.itemCount;
  const cartLabel = `View cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:bg-brass-500 focus:text-combat-900 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-bold focus:tracking-[.22em] focus:uppercase"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 bg-combat-900 transition-shadow duration-200",
          scrolled
            ? "shadow-[0_1px_0_var(--color-brass-500)] border-b border-brass-500/20"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
          <div className="grid grid-cols-[auto_1fr_auto] items-stretch h-[64px] sm:h-[72px] gap-0">
            {/* Brand */}
            <Link
              href="/"
              className="flex items-center pr-4 sm:pr-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              data-event="nav_brand"
              aria-label={`${BRAND.name} home`}
            >
              <Image
                src="/logo.avif"
                alt={`${BRAND.name} logo`}
                width={64}
                height={64}
                priority
                className="h-12 w-auto sm:h-14"
              />
            </Link>

            {/* Nav */}
            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center justify-center gap-7 xl:gap-8"
            >
              {NAV_PRIMARY.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative font-mono text-xs tracking-[.18em] uppercase motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass-500 group",
                      active ? "font-bold" : "font-semibold",
                      active
                        ? "text-brass-400"
                        : "text-cream-50 hover:text-brass-400",
                    )}
                    data-event="nav_link"
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 right-0 h-[2px] bg-brass-500 origin-left motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 motion-safe:group-hover:scale-x-100",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search trigger — desktop pill */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search products"
                className="hidden md:inline-flex items-center gap-2 min-h-[40px] px-3 lg:px-4 font-mono font-semibold text-[11px] tracking-[.20em] uppercase border border-brass-500/40 text-cream-50 hover:bg-brass-500 hover:text-combat-900 hover:border-brass-500 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                data-event="nav_search"
              >
                <Search size={14} strokeWidth={1.8} aria-hidden="true" />
                <span className="hidden lg:inline">Search</span>
                <span
                  className="hidden xl:inline-flex items-center gap-1 ml-1 pl-2 border-l border-brass-500/30 text-brass-400/70 text-[9px] tracking-[.18em]"
                  aria-hidden="true"
                >
                  <kbd className="px-1 py-0.5 border border-current font-bold">⌘K</kbd>
                </span>
              </button>
              {/* Mobile-only icon search trigger */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Search products"
                className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                data-event="nav_search_mobile"
              >
                <Search size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
              <Link
                href="/login"
                className="hidden md:inline-flex items-center min-h-[44px] px-2 font-mono font-semibold text-[11px] tracking-[.20em] uppercase text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
                data-event="nav_signin"
              >
                Sign In
              </Link>
              {/* Mobile-only icon-style cart trigger */}
              <button
                type="button"
                onClick={openCart}
                aria-label={cartLabel}
                className="md:hidden relative inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-cream-50 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
                data-event="nav_cart"
              >
                <ShoppingBag size={18} strokeWidth={1.6} aria-hidden="true" />
                {cartCount > 0 && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 inline-flex items-center justify-center bg-brass-500 text-combat-900 font-mono font-bold text-[10px] tracking-[.04em] tabular-nums leading-none"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Primary brass CTA — opens cart drawer */}
              <div className="hidden md:block py-2 sm:py-3">
                <button
                  type="button"
                  onClick={openCart}
                  data-event="nav_cart_cta"
                  aria-label={cartLabel}
                  className={cn(
                    "group relative inline-flex items-center justify-center font-mono font-bold uppercase rounded-none border-0 cursor-pointer",
                    "transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
                    "motion-safe:hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.985]",
                    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                    "px-5 py-3.5 min-h-[44px] text-[10px] tracking-[.20em] gap-2 pr-8",
                    "[clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_50%,calc(100%_-_16px)_100%,0_100%)]",
                    "bg-brass-500 text-combat-900 hover:bg-combat-900 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]"
                  )}
                >
                  <ShoppingBag
                    size={15}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-[-6deg] -ml-1 mr-2"
                  />
                  Cart · {cartCount}
                </button>
              </div>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(true)}
                className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] text-cream-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-drawer"
          className="lg:hidden fixed inset-0 z-[60] bg-combat-900 text-cream-50 flex flex-col motion-safe:[animation:wp-fade-up_300ms_var(--ease-out-warpath)_both]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 h-[64px] sm:h-[72px] border-b border-brass-500/30">
            <span className="font-mono font-bold text-[10px] tracking-[.28em] sm:tracking-[.32em] uppercase text-brass-400">
              § Menu
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center text-cream-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
            >
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <nav className="flex-1 px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-5 sm:gap-6 overflow-y-auto" aria-label="Mobile primary">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openSearch();
              }}
              className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 border border-brass-500/40 text-cream-50 hover:bg-brass-500 hover:text-combat-900 hover:border-brass-500 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 -mt-2"
              data-event="nav_search_drawer"
            >
              <Search size={18} strokeWidth={1.6} aria-hidden="true" />
              <span className="font-mono font-bold text-[12px] tracking-[.22em] uppercase">
                Search products
              </span>
              <span className="ml-auto font-mono text-[10px] tracking-[.18em] uppercase text-brass-400 group-hover:text-combat-900/70">
                Open →
              </span>
            </button>
            {NAV_PRIMARY.map((l, i) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-stencil font-extrabold text-2xl sm:text-3xl uppercase tracking-[.02em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors flex items-center gap-3 sm:gap-4",
                    active ? "text-brass-400" : "text-cream-50 hover:text-brass-400",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[.22em] w-8 sm:w-10",
                      active ? "text-brass-500" : "text-brass-400",
                    )}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex items-center gap-3">
                    {l.label}
                    {active && (
                      <span
                        className="font-mono text-[9px] tracking-[.24em] bg-brass-500 text-combat-900 px-2 py-0.5"
                        aria-hidden="true"
                      >
                        Active
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCart();
              }}
              className="font-stencil font-extrabold text-2xl sm:text-3xl uppercase tracking-[.02em] text-cream-50 hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors flex items-center gap-3 sm:gap-4 mt-2 text-left w-full"
            >
              <span className="font-mono text-[11px] text-brass-400 tracking-[.22em] w-8 sm:w-10">
                0{NAV_PRIMARY.length + 1}
              </span>
              Cart
              <span className="ml-auto font-mono text-[10px] tracking-[.22em] text-brass-400">
                {cartCount} item{cartCount === 1 ? "" : "s"}
              </span>
            </button>
          </nav>
          <div className="px-4 sm:px-6 pb-8 sm:pb-10 pt-5 sm:pt-6 border-t border-brass-500/30 flex flex-col gap-3 sm:gap-4">
            <Button variant="brass" size="lg" href={HERO.primaryCta.href} opCode="OP-SHOP" className="w-full">
              Shop Coffee
            </Button>
            <Button variant="ghost" size="base" href="/subscribe" className="w-full !text-cream-50 !shadow-[inset_0_0_0_1.5px_var(--color-brass-500)]">
              Subscribe
            </Button>
            <div className="grid grid-cols-2 gap-3 pt-2 mt-2 border-t border-brass-500/20">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-cream-50 text-center py-3 border border-brass-500/40 hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-cream-50 text-center py-3 border border-brass-500/40 hover:bg-brass-500 hover:text-combat-900 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
