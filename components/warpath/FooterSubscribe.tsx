"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { BladeButton } from "./BladeButton";
import { FormLegalNote } from "./FormLegalNote";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; email: string };

export function FooterSubscribe() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) return;
    setStatus({ kind: "sending" });
    await new Promise((r) => setTimeout(r, 500));
    setStatus({ kind: "ok", email });
  };

  if (status.kind === "ok") {
    return (
      <div
        role="status"
        className="border border-brass-500 bg-brass-500/10 px-5 py-4 grid grid-cols-[24px_1fr] gap-3 items-center"
      >
        <Check size={18} strokeWidth={2.4} className="text-brass-400" aria-hidden="true" />
        <div>
          <div className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.24em] uppercase text-brass-400">
            Code Dispatched
          </div>
          <div className="mt-1 font-stencil font-extrabold text-[14px] sm:text-[15px] uppercase tracking-[.01em] text-cream-50 leading-tight">
            Check {status.email} for your 15% off code.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 w-full"
      data-event="footer_newsletter"
      noValidate
    >
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <label className="sr-only" htmlFor="footer-email">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@warpath.coffee"
          className="flex-1 bg-combat-800 border border-brass-500/40 text-cream-50 placeholder:text-cream-50/40 px-4 sm:px-5 py-3 sm:py-4 font-mono text-sm w-full focus:outline-none focus:border-brass-500 focus-visible:ring-2 focus-visible:ring-brass-500"
        />
        <BladeButton
          type="submit"
          variant="brass"
          size="base"
          disabled={status.kind === "sending"}
          data-event="footer_newsletter_submit"
        >
          {status.kind === "sending" ? "Sending…" : "Get 15% Off"}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
        </BladeButton>
      </div>
      <FormLegalNote tone="dark" />
    </form>
  );
}
