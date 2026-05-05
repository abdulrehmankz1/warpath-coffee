"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { NAV_PRIMARY, BRAND, HERO } from "@/lib/data/warpath";

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          "sticky top-0 z-50 transition-colors duration-200",
          scrolled
            ? "bg-bone-100/95 backdrop-blur-md border-b border-canvas-300 shadow-[0_1px_0_var(--color-brass-500)]"
            : "bg-combat-900"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
          <div className="grid grid-cols-[auto_1fr_auto] items-stretch h-[64px] sm:h-[72px] gap-0">
            {/* Brand */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 sm:gap-3 pr-4 sm:pr-8 sm:border-r focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500",
                scrolled ? "border-combat-900" : "border-brass-500"
              )}
              data-event="nav_brand"
              aria-label={`${BRAND.name} home`}
            >
              <Image
                src="/logo.avif"
                alt=""
                width={40}
                height={40}
                priority
                className="h-8 sm:h-10 w-auto"
              />
              <span
                className={cn(
                  "font-display font-black text-[18px] sm:text-[22px] uppercase leading-none tracking-[-0.01em]",
                  scrolled ? "text-combat-900" : "text-cream-50"
                )}
              >
                {BRAND.name.split(" ")[0]}
                <span
                  className={cn(
                    "block font-mono text-[8px] sm:text-[9px] tracking-[.24em] sm:tracking-[.28em] mt-0.5 font-semibold",
                    scrolled ? "text-brass-700" : "text-brass-400"
                  )}
                >
                  {BRAND.shortTag}
                </span>
              </span>
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
                        ? scrolled
                          ? "text-brass-700"
                          : "text-brass-400"
                        : scrolled
                          ? "text-combat-900 hover:text-brass-700"
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
              <Link
                href="/login"
                className={cn(
                  "hidden md:inline-flex items-center min-h-[44px] px-2 font-mono font-semibold text-[11px] tracking-[.20em] uppercase motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                  scrolled ? "text-combat-900 hover:text-brass-700" : "text-cream-50 hover:text-brass-400",
                )}
                data-event="nav_signin"
              >
                Sign In
              </Link>
              <Link
                href="/cart"
                aria-label="View cart, 0 items"
                className={cn(
                  "group inline-flex items-center justify-center min-w-[44px] min-h-[44px] sm:gap-2 font-mono font-semibold text-xs tracking-[.18em] uppercase motion-safe:transition-colors motion-safe:duration-150 px-2 sm:px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500",
                  scrolled ? "text-combat-900 hover:text-brass-700" : "text-cream-50 hover:text-brass-400"
                )}
                data-event="nav_cart"
              >
                <ShoppingBag
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:rotate-[-6deg]"
                />
                <span className="hidden md:inline">Cart · 0</span>
              </Link>
              <div className="hidden md:block py-2 sm:py-3">
                <Button
                  variant="brass"
                  size="sm"
                  href={HERO.primaryCta.href}
                  opCode="OP-SHOP"
                  data-event="nav_cta"
                >
                  Shop Coffee
                </Button>
              </div>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(true)}
                className={cn(
                  "lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500",
                  scrolled ? "text-combat-900" : "text-cream-50"
                )}
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
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="font-stencil font-extrabold text-2xl sm:text-3xl uppercase tracking-[.02em] hover:text-brass-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500 transition-colors flex items-center gap-3 sm:gap-4 mt-2"
            >
              <span className="font-mono text-[11px] text-brass-400 tracking-[.22em] w-8 sm:w-10">
                0{NAV_PRIMARY.length + 1}
              </span>
              Cart
              <span className="ml-auto font-mono text-[10px] tracking-[.22em] text-brass-400">0 items</span>
            </Link>
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
