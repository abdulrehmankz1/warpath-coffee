"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { WELCOME_OFFER, FLAGSHIP, formatReviewCount } from "@/lib/data/warpath";
import { SectionBadge } from "./SectionBadge";
import { BladeButton } from "./BladeButton";

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
  const [preference, setPreference] = useState<string>(
    WELCOME_OFFER.preferences[1].code, // Dark Roast — flagship default
  );
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

  // Trigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (shouldSuppress()) return;

    let armed = false;
    const armTimer = window.setTimeout(() => (armed = true), MIN_DELAY_MS);
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const fire = () => {
      if (!armed || shouldSuppress()) return;
      setOpen(true);
      cleanup();
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      if (e.clientY > 12) return;
      fire();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= MOBILE_SCROLL_PCT) fire();
    };

    const fallbackTimer = window.setTimeout(() => {
      if (isCoarsePointer) fire();
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

  // A11y: scroll lock + focus trap + escape
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
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
        const f = root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
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
        className="w-full max-w-[560px] bg-combat-900 text-cream-50 border border-brass-500 shadow-[0_30px_80px_rgba(0,0,0,.55)] motion-safe:[animation:wp-fade-up_280ms_var(--ease-out-warpath)_both]"
        style={{ position: "relative" }}
      >
        {/* Header bar — same intake pattern as IntakeCard */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 sm:px-6 py-3 bg-brass-500/[0.10] border-b border-dashed border-brass-500/40 font-mono text-[10px] tracking-[.24em] uppercase text-brass-400 font-bold">
          <span className="flex items-center gap-2 before:content-[''] before:w-2 before:h-2 before:bg-brass-500 before:rounded-full">
            INTAKE · OP-WELCOME · 015
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

        <div className="px-5 sm:px-7 py-7 sm:py-8">
          {success ? (
            // Success state
            <div className="grid gap-4">
              <SectionBadge symbol="✓" label="Enrolled" tone="dark" />
              <h2
                id={titleId}
                className="font-display font-black uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(1.5rem,5vw,2.5rem)]"
              >
                {WELCOME_OFFER.successTitleA}{" "}
                <em className="not-italic text-brass-500 normal-case">
                  {WELCOME_OFFER.successTitleB}
                </em>
              </h2>
              <p id={descId} className="text-[14px] leading-[1.6] text-cream-50/72">
                {WELCOME_OFFER.successBody.split("{{email}}")[0]}
                <b className="text-cream-50">{success.email}</b>
                {WELCOME_OFFER.successBody.split("{{email}}")[1]}
              </p>
              <BladeButton onClick={() => setOpen(false)} variant="brass" size="base">
                {WELCOME_OFFER.successCta}
              </BladeButton>
            </div>
          ) : (
            // Capture state
            <>
              <SectionBadge label={WELCOME_OFFER.badgeLabel} tone="dark" className="mb-5" />

              {/* Big offer headline — typographic ramp matching the live popup */}
              <div className="mb-2 font-mono font-bold text-[10px] sm:text-[11px] tracking-[.28em] uppercase text-brass-400">
                {WELCOME_OFFER.eyebrow}
              </div>
              <h2
                id={titleId}
                className="font-display font-black uppercase leading-[0.86] tracking-[-0.04em] text-[clamp(2.5rem,9vw,4.75rem)] text-cream-50"
              >
                {WELCOME_OFFER.title}
              </h2>
              <p className="mt-2 font-display font-medium text-brass-300/90 text-[clamp(1.1rem,2.4vw,1.65rem)] leading-[1.2]">
                {WELCOME_OFFER.titleSub}
              </p>

              <p
                id={descId}
                className="mt-5 text-[14px] sm:text-[15px] leading-[1.6] text-cream-50/72 max-w-[46ch]"
              >
                {WELCOME_OFFER.pitch}
              </p>

              <form onSubmit={onSubmit} noValidate className="mt-6 grid gap-4">
                {/* Roast-preference radio group — matches live popup */}
                <fieldset className="grid gap-2">
                  <legend className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400">
                    {WELCOME_OFFER.preferenceLabel}
                  </legend>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {WELCOME_OFFER.preferences.map((p) => {
                      const active = preference === p.code;
                      return (
                        <label
                          key={p.code}
                          className={cn(
                            "cursor-pointer relative border px-3 py-3 sm:py-3.5 motion-safe:transition-colors motion-safe:duration-200",
                            active
                              ? "border-brass-500 bg-brass-500/[0.12]"
                              : "border-brass-500/30 hover:border-brass-500/60 bg-combat-800/40",
                          )}
                        >
                          <input
                            type="radio"
                            name="preference"
                            value={p.code}
                            checked={active}
                            onChange={() => setPreference(p.code)}
                            className="sr-only"
                          />
                          <div className="font-stencil font-extrabold text-[15px] sm:text-[16px] uppercase tracking-[.02em] text-cream-50 leading-none">
                            {p.label}
                          </div>
                          <div className="mt-1.5 font-mono text-[9px] sm:text-[10px] tracking-[.18em] uppercase text-brass-400 font-semibold">
                            {p.note}
                          </div>
                          {active && (
                            <span
                              aria-hidden="true"
                              className="absolute top-2 right-2 inline-flex items-center justify-center w-4 h-4 bg-brass-500 text-combat-900 text-[10px] font-bold"
                            >
                              ✓
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Email */}
                <div className="grid gap-2">
                  <label
                    htmlFor={`${id}-email`}
                    className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400 inline-flex items-center gap-2"
                  >
                    Email
                    <span
                      aria-hidden="true"
                      className="bg-brass-500 text-combat-900 font-mono text-[8px] tracking-[.20em] px-1.5 py-0.5"
                    >
                      REQ
                    </span>
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
                  <p className="font-mono text-[10px] tracking-[.16em] uppercase text-cream-50/55 font-semibold">
                    {WELCOME_OFFER.emailHint}
                  </p>
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    aria-live="polite"
                    className="border-l-[3px] border-alert-red bg-alert-red/[0.10] px-3 py-2 font-mono text-[10px] tracking-[.18em] uppercase text-alert-red font-bold"
                  >
                    × ERR · {errorMsg}
                  </div>
                )}

                <BladeButton type="submit" variant="brass" size="base" disabled={submitting}>
                  {submitting ? "Dispatching…" : WELCOME_OFFER.ctaPrimary}
                </BladeButton>

                <button
                  type="button"
                  onClick={dismiss}
                  className="font-mono text-[11px] tracking-[.20em] uppercase text-cream-50/50 hover:text-cream-50/80 motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 self-start"
                >
                  {WELCOME_OFFER.ctaDeclining}
                </button>
              </form>

              {/* Trust strip */}
              <div className="mt-6 pt-5 border-t border-brass-500/20 flex items-center justify-between gap-4 flex-wrap">
                <span
                  className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[.20em] uppercase text-brass-400 font-bold"
                  aria-label={`${formatReviewCount((FLAGSHIP.reviews ?? 0) + 3786)} verified reviews, 4.9 stars`}
                >
                  <span className="inline-flex items-center gap-0.5 mr-1 text-brass-500">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <Star
                        key={j}
                        size={11}
                        strokeWidth={1.4}
                        className="fill-brass-500"
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  {formatReviewCount((FLAGSHIP.reviews ?? 0) + 3786)}+ Reviews
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[.20em] uppercase text-cream-50/45 font-semibold">
                  {WELCOME_OFFER.fineprint}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
