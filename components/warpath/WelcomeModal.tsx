"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

const STORAGE_DISMISSED = "warpath_modal_dismissed_at";
const STORAGE_SUBSCRIBED = "warpath_modal_subscribed";
const SUPPRESS_DAYS = 30;
const MIN_DELAY_MS = 20_000;
const MOBILE_TIMEOUT_MS = 45_000;
const MOBILE_SCROLL_PCT = 0.8;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; email: string }
  | { kind: "error"; message: string };

function shouldSuppress(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.localStorage.getItem(STORAGE_SUBSCRIBED) === "1") return true;
    const ts = window.localStorage.getItem(STORAGE_DISMISSED);
    if (!ts) return false;
    const dismissedAt = Number(ts);
    if (!Number.isFinite(dismissedAt)) return false;
    const days = (Date.now() - dismissedAt) / 86_400_000;
    return days < SUPPRESS_DAYS;
  } catch {
    return false;
  }
}

export function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const id = useId();

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_DISMISSED, String(Date.now()));
    } catch {}
    setOpen(false);
  }, []);

  // ----- Trigger: exit-intent (desktop) + scroll/time (mobile) -----
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSuppress()) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, MIN_DELAY_MS);

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const fire = () => {
      if (!armed) return;
      if (shouldSuppress()) return;
      setOpen(true);
      cleanup();
    };

    // Desktop exit-intent: cursor leaves through the top edge
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY > 12) return;
      fire();
    };

    // Mobile: 80% scroll depth
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = window.scrollY / max;
      if (pct >= MOBILE_SCROLL_PCT) fire();
    };

    // Mobile fallback timer
    const fallbackTimer = window.setTimeout(() => {
      if (!isCoarsePointer) return; // desktop relies on exit-intent only
      fire();
    }, MOBILE_TIMEOUT_MS);

    if (!isCoarsePointer) {
      document.addEventListener("mouseout", onMouseOut);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    function cleanup() {
      window.clearTimeout(armTimer);
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  // ----- A11y: lock scroll, trap focus, escape -----
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    // Initial focus
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, dismiss]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus({ kind: "error", message: "Enter a valid email." });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      // Stub — wire to /api/marketing/subscribe when ready
      await new Promise((r) => setTimeout(r, 600));
      try {
        window.localStorage.setItem(STORAGE_SUBSCRIBED, "1");
      } catch {}
      setStatus({ kind: "ok", email });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Try again." });
    }
  };

  if (!open) return null;

  const submitting = status.kind === "submitting";
  const errorMsg = status.kind === "error" ? status.message : null;
  const success = status.kind === "ok" ? status : null;
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-combat-900/70 backdrop-blur-[3px]"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-[520px] bg-combat-900 text-cream-50 border border-brass-500 shadow-[0_30px_80px_rgba(0,0,0,.55)] motion-safe:[animation:wp-fade-up_280ms_var(--ease-out-warpath)_both]"
        style={{ position: "relative" }}
      >
        {/* Header bar */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 sm:px-6 py-3 bg-brass-500/[0.10] border-b border-dashed border-brass-500/40 font-mono text-[10px] tracking-[.24em] uppercase text-brass-400 font-bold">
          <span className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-brass-500 before:rounded-full">
            OP-WELCOME · 15
          </span>
          <span aria-hidden="true" className="text-cream-50/40 text-center hidden sm:block text-[9px]">
            ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={dismiss}
            aria-label="Close offer"
            className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center text-cream-50/70 hover:text-brass-400 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass-500"
          >
            <X size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 py-7 sm:py-8">
          {success ? (
            <div className="grid gap-4">
              <div className="flex w-fit items-stretch gap-1.5">
                <span className="inline-flex items-center justify-center min-w-[36px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase bg-olive-500 text-bone-50">
                  ✓
                </span>
                <span className="inline-flex items-center pl-3 pr-4 font-mono font-bold text-[10px] tracking-[.26em] uppercase whitespace-nowrap bg-olive-500 text-bone-50">
                  ENROLLED
                </span>
              </div>
              <h2
                id={titleId}
                className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.5rem,5vw,2.5rem)]"
              >
                Code dispatched.{" "}
                <em className="font-italic italic font-normal text-brass-500 normal-case">
                  Check your inbox.
                </em>
              </h2>
              <p id={descId} className="text-[14px] leading-[1.6] text-cream-50/72">
                We just sent your <b className="text-brass-400">15% off</b> code to{" "}
                <b className="text-cream-50">{success.email}</b>. Drink it black, no sugar necessary.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  "mt-2 relative inline-flex items-center justify-center bg-brass-500 text-combat-900 font-mono font-bold uppercase rounded-none border-0 cursor-pointer px-7 py-3.5 min-h-[48px] text-[11px] tracking-[.22em] gap-3",
                  "motion-safe:transition-colors motion-safe:duration-300 hover:bg-combat-800 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                  "[clip-path:polygon(0_0,calc(100%_-_14px)_0,100%_50%,calc(100%_-_14px)_100%,0_100%)] pr-9",
                )}
              >
                Get Brewing
              </button>
            </div>
          ) : (
            <>
              <div className="flex w-fit items-stretch gap-1.5 mb-5">
                <span className="inline-flex items-center justify-center min-w-[36px] px-2 font-mono font-black text-[11px] tracking-[.18em] uppercase bg-brass-500 text-combat-900">
                  §
                </span>
                <span className="inline-flex items-center pl-3 pr-4 font-mono font-bold text-[10px] tracking-[.26em] uppercase whitespace-nowrap bg-brass-500 text-combat-900">
                  WELCOME · 15% OFF
                </span>
              </div>

              <h2
                id={titleId}
                className="font-display font-black uppercase leading-[0.94] tracking-[-0.025em] text-[clamp(1.75rem,5.5vw,2.75rem)]"
              >
                Your first bag.{" "}
                <em className="font-italic italic font-normal text-brass-500 normal-case tracking-[-.03em]">
                  15% off. Deployed.
                </em>
              </h2>

              <p id={descId} className="mt-4 text-[14px] sm:text-[15px] leading-[1.6] text-cream-50/72">
                Enter your email and we’ll send you a code for{" "}
                <b className="text-brass-400">15% off your first order</b>. No fluff. Just coffee.
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-3">
                <label className="sr-only" htmlFor={`${id}-email`}>
                  Email
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className="w-full bg-bone-100 text-combat-900 placeholder:text-ash-500/70 font-mono text-[14px] sm:text-[15px] px-4 py-3.5 border border-canvas-400 focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500/40 transition-colors"
                />

                {errorMsg && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="border-l-[3px] border-alert-red bg-alert-red/[0.10] px-3 py-2 font-mono text-[10px] tracking-[.18em] uppercase text-alert-red font-bold"
                  >
                    × ERR · {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "relative inline-flex items-center justify-center bg-brass-500 text-combat-900 font-mono font-bold uppercase rounded-none border-0 cursor-pointer px-7 py-3.5 min-h-[48px] text-[11px] tracking-[.22em] gap-3",
                    "motion-safe:transition-colors motion-safe:duration-300 hover:bg-combat-800 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)]",
                    "disabled:opacity-60 disabled:pointer-events-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                    "[clip-path:polygon(0_0,calc(100%_-_14px)_0,100%_50%,calc(100%_-_14px)_100%,0_100%)] pr-9",
                  )}
                >
                  {submitting ? "Dispatching…" : "Claim 15% Off"}
                </button>

                <button
                  type="button"
                  onClick={dismiss}
                  className="mt-1 font-mono text-[11px] tracking-[.20em] uppercase text-cream-50/50 hover:text-cream-50/80 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 self-start"
                >
                  No thanks, I’ll pay full price
                </button>
              </form>

              <p className="mt-5 font-mono text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-cream-50/45 leading-[1.6] font-semibold">
                One-time email · No spam · Unsubscribe anytime
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
