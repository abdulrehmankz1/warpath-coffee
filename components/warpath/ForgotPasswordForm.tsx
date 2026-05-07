"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthField } from "./AuthField";
import { BladeButton } from "./BladeButton";
import { FormLegalNote } from "./FormLegalNote";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "ok"; email: string }
  | { state: "error"; message: string };

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus({ state: "error", message: "Enter a valid email address." });
      return;
    }
    setStatus({ state: "submitting" });
    try {
      // Stub — wire to /api/auth/forgot-password when ready.
      // Always returns ok to avoid leaking which emails exist.
      await new Promise((r) => setTimeout(r, 600));
      setStatus({ state: "ok", email });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Try again." });
    }
  };

  const submitting = status.state === "submitting";
  const errorMsg = status.state === "error" ? status.message : null;

  if (status.state === "ok") {
    return (
      <div className="grid gap-5">
        <div className="border-l-[3px] border-brass-500 pl-4 py-2">
          <div className="font-mono font-bold text-[10px] tracking-[.24em] uppercase text-brass-400">
            Reset link dispatched
          </div>
        </div>
        <p className="text-[15px] leading-[1.6] text-cream-50/80">
          If an account exists for <b className="text-cream-50">{status.email}</b>,
          we&rsquo;ve sent a secure reset link. The link works once and expires in
          30 minutes.
        </p>
        <p className="font-mono text-[11px] tracking-[.18em] uppercase text-cream-50/55 font-semibold">
          Check spam if it doesn&rsquo;t arrive in 5 minutes.
        </p>
        <BladeButton
          variant="brass"
          size="lg"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Back to Sign In
        </BladeButton>
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
        error={errorMsg}
      />

      <BladeButton type="submit" variant="brass" size="lg" disabled={submitting}>
        {submitting ? "Dispatching…" : "Send Reset Link"}
      </BladeButton>

      <FormLegalNote tone="dark" />

      <div className="text-[12px] sm:text-[13px] font-mono tracking-[.10em] text-cream-50/60">
        Remembered it?{" "}
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
