"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { AuthField } from "./AuthField";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "ok" };

const checks = [
  { label: "8+ characters", test: (v: string) => v.length >= 8 },
  { label: "1 uppercase", test: (v: string) => /[A-Z]/.test(v) },
  { label: "1 number", test: (v: string) => /\d/.test(v) },
];

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const passwordStrong = useMemo(
    () => checks.every((c) => c.test(password)),
    [password],
  );
  const passwordsMatch = password.length > 0 && password === confirm;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !passwordStrong) {
      setStatus({
        state: "error",
        message: "Email and a strong password are required.",
      });
      return;
    }
    if (!passwordsMatch) {
      setStatus({ state: "error", message: "Passwords do not match." });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      // Stub — wire to /api/auth/signup when ready
      await new Promise((r) => setTimeout(r, 700));
      setStatus({ state: "ok" });
    } catch {
      setStatus({ state: "error", message: "Could not create account. Try again." });
    }
  };

  const submitting = status.state === "submitting";
  const formError = status.state === "error" ? status.message : null;
  const success = status.state === "ok";

  if (success) {
    return (
      <div className="grid gap-5">
        <div className="border-l-[3px] border-olive-500 bg-olive-600/[0.20] px-5 py-4">
          <div className="font-mono text-[10px] tracking-[.24em] uppercase font-bold text-brass-400 mb-1.5">
            ✓ ENROLLED · OP-ENROLL · 001
          </div>
          <p className="font-display font-bold text-lg leading-tight text-cream-50">
            Welcome to the Warpath. Your 15% off code is on the way.
          </p>
          <p className="mt-2 text-[14px] leading-[1.55] text-cream-50/72">
            Check {email} for a verification email and your code. Then it’s time to drink it black.
          </p>
        </div>
        <Link
          href="/"
          className="font-mono font-bold text-[11px] tracking-[.22em] uppercase text-brass-400 hover:text-brass-300 inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
        >
          Back to home →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:gap-6">
      <AuthField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        placeholder="you@example.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthField
        label="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="••••••••"
        required
        toggleVisibility
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Inline strength checklist */}
      <ul className="grid grid-cols-3 gap-2 -mt-3">
        {checks.map((c) => {
          const ok = c.test(password);
          return (
            <li
              key={c.label}
              className={cn(
                "flex items-center gap-2 font-mono text-[10px] tracking-[.16em] uppercase font-semibold transition-colors",
                ok ? "text-brass-400" : "text-cream-50/40",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "w-4 h-4 inline-flex items-center justify-center border",
                  ok
                    ? "bg-brass-500 border-brass-500 text-combat-900"
                    : "border-cream-50/30 bg-transparent",
                )}
              >
                {ok && <Check size={10} strokeWidth={3} />}
              </span>
              {c.label}
            </li>
          );
        })}
      </ul>

      <AuthField
        label="Confirm Password"
        type="password"
        name="confirm"
        autoComplete="new-password"
        placeholder="••••••••"
        required
        toggleVisibility
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={confirm.length > 0 && !passwordsMatch ? "Passwords do not match" : null}
      />

      <AuthField
        label="First Name (optional)"
        type="text"
        name="firstName"
        autoComplete="given-name"
        placeholder="For shipment updates"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      {/* Marketing opt-in */}
      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className="mt-0.5 w-5 h-5 shrink-0 inline-flex items-center justify-center border-[1.5px] border-brass-500/60 bg-combat-800 peer-checked:bg-brass-500 peer-focus-visible:ring-2 peer-focus-visible:ring-brass-500"
        >
          <svg
            className="w-3 h-3 text-combat-900 opacity-0 peer-checked:opacity-100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="text-[12px] sm:text-[13px] leading-[1.5] text-cream-50/75 font-mono tracking-[.04em]">
          Send me exclusive drops, subscriber deals, and the occasional field report.
        </span>
      </label>

      {formError && (
        <div
          role="alert"
          aria-live="polite"
          className="border-l-[3px] border-alert-red bg-alert-red/[0.10] px-4 py-3 font-mono text-[11px] tracking-[.18em] uppercase text-alert-red font-bold"
        >
          × ERR · {formError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="relative inline-flex items-center justify-center bg-brass-500 text-combat-900 font-mono font-bold uppercase rounded-none border-0 cursor-pointer px-8 py-4 min-h-[52px] text-[12px] tracking-[.24em] gap-3 motion-safe:transition-[background-color,color,transform] motion-safe:duration-300 motion-safe:hover:-translate-y-[1px] hover:bg-combat-900 hover:text-brass-400 hover:shadow-[inset_0_0_0_2px_var(--color-brass-500)] active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500 [clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_50%,calc(100%_-_16px)_100%,0_100%)] pr-9"
      >
        {submitting ? "Enrolling…" : "Create Account + Claim 15% Off"}
      </button>

      <p className="font-mono text-[10px] sm:text-[11px] tracking-[.16em] uppercase text-cream-50/55 leading-[1.6] font-semibold">
        By creating your account, you agree to our{" "}
        <Link href="/terms-of-service" className="text-brass-400 hover:text-brass-300 underline underline-offset-4 decoration-brass-500/40">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-brass-400 hover:text-brass-300 underline underline-offset-4 decoration-brass-500/40">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="text-[12px] sm:text-[13px] font-mono tracking-[.10em] text-cream-50/60">
        Already enrolled?{" "}
        <Link
          href="/login"
          className="font-bold text-brass-400 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
        >
          Sign in →
        </Link>
      </div>
    </form>
  );
}
