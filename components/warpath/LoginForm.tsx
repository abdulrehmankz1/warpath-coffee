"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthField } from "./AuthField";
import { BladeButton } from "./BladeButton";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "error"; message: string }
  | { state: "ok" };

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ state: "submitting" });
    // Client-side guard rails. Real auth provider plugs in here.
    if (!email || !password) {
      setStatus({ state: "error", message: "Email and password required" });
      return;
    }
    try {
      // Stub — wire to /api/auth/login when ready
      await new Promise((r) => setTimeout(r, 600));
      setStatus({
        state: "error",
        message: "Incorrect email or password. Try again or reset your password.",
      });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Try again." });
    }
  };

  const submitting = status.state === "submitting";
  const errorMsg = status.state === "error" ? status.message : null;

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
        autoComplete="current-password"
        placeholder="••••••••"
        required
        toggleVisibility
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endSlot={
          <Link
            href="/forgot-password"
            className="font-mono text-[10px] tracking-[.20em] uppercase font-bold text-brass-400 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
          >
            Forgot?
          </Link>
        }
      />

      {/* Remember me */}
      <label className="inline-flex items-center gap-3 cursor-pointer select-none w-fit">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="sr-only peer"
        />
        <span
          aria-hidden="true"
          className="w-5 h-5 inline-flex items-center justify-center border-[1.5px] border-brass-500/60 bg-combat-800 peer-checked:bg-brass-500 peer-focus-visible:ring-2 peer-focus-visible:ring-brass-500 transition-colors"
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
        <span className="font-mono text-[11px] sm:text-[12px] tracking-[.18em] uppercase text-cream-50/80 font-semibold">
          Keep me logged in
        </span>
      </label>

      {/* Form-level error (shows beneath fields, but always-rendered alert region) */}
      {errorMsg && (
        <div
          role="alert"
          aria-live="polite"
          className="border-l-[3px] border-alert-red bg-alert-red/[0.10] px-4 py-3 font-mono text-[11px] tracking-[.18em] uppercase text-alert-red font-bold"
        >
          × ERR · {errorMsg}
        </div>
      )}

      <BladeButton type="submit" variant="brass" size="lg" disabled={submitting}>
        {submitting ? "Authenticating…" : "Sign In"}
      </BladeButton>

      <div className="text-[12px] sm:text-[13px] font-mono tracking-[.10em] text-cream-50/60">
        New here?{" "}
        <Link
          href="/signup"
          className="font-bold text-brass-400 hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500"
        >
          Create your account →
        </Link>
      </div>
    </form>
  );
}
