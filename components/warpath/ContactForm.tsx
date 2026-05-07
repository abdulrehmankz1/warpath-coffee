"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { BladeButton } from "./BladeButton";
import { FormLegalNote } from "./FormLegalNote";

const inputBase =
  "w-full bg-bone-50 border border-combat-900 px-3 py-3 min-h-[48px] font-mono text-[14px] text-combat-900 placeholder:text-ash-500 placeholder:font-normal focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500 motion-safe:transition-shadow motion-safe:duration-150";

const labelBase =
  "font-mono font-bold text-[10px] sm:text-[11px] tracking-[.22em] uppercase text-combat-900 flex items-center justify-between";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "err"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const required = ["name", "email", "message"];
    for (const k of required) {
      if (!String(fd.get(k) ?? "").trim()) {
        setStatus({ kind: "err", message: "Please fill in name, email, and message." });
        return;
      }
    }
    setStatus({ kind: "sending" });
    // Stand-in for /api/contact
    await new Promise((r) => setTimeout(r, 700));
    setStatus({ kind: "ok" });
    e.currentTarget.reset();
  };

  if (status.kind === "ok") {
    return (
      <div className="border border-combat-900 bg-bone-50 px-5 sm:px-8 py-10 sm:py-12 text-center">
        <div className="font-mono font-bold text-[10px] tracking-[.32em] uppercase text-brass-700 mb-3">
          Message Received
        </div>
        <h2 className="font-display font-black uppercase text-[clamp(1.5rem,4vw,2.25rem)] leading-[1] tracking-[-.018em] text-combat-900">
          Stand by — we&rsquo;re on it.
        </h2>
        <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] text-ash-700 max-w-[44ch] mx-auto">
          Thanks for reaching out. We&rsquo;ll get back to you as soon as possible — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelBase}>
            <span>Name</span>
            <span className="font-mono font-semibold text-[9px] tracking-[.16em] text-ash-600 normal-case">
              Required
            </span>
          </label>
          <input id="contact-name" name="name" required autoComplete="name" className={`${inputBase} mt-1.5`} />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelBase}>
            <span>Phone</span>
            <span className="font-mono font-semibold text-[9px] tracking-[.16em] text-ash-600 normal-case">
              Optional
            </span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="For callbacks only"
            className={`${inputBase} mt-1.5`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-email" className={labelBase}>
          <span>Email</span>
          <span className="font-mono font-semibold text-[9px] tracking-[.16em] text-ash-600 normal-case">
            Required
          </span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="operator@warpath.coffee"
          className={`${inputBase} mt-1.5`}
        />
      </div>
      <div>
        <label htmlFor="contact-topic" className={labelBase}>
          <span>Topic</span>
        </label>
        <select id="contact-topic" name="topic" defaultValue="general" className={`${inputBase} mt-1.5 pr-10`}>
          <option value="general">General Question</option>
          <option value="order">Order Issue / Status</option>
          <option value="returns">Returns &amp; Refunds</option>
          <option value="subscription">Subscription</option>
          <option value="wholesale">Wholesale</option>
          <option value="press">Press</option>
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelBase}>
          <span>Message</span>
          <span className="font-mono font-semibold text-[9px] tracking-[.16em] text-ash-600 normal-case">
            Required
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help."
          className={`${inputBase} mt-1.5 leading-[1.6] py-3`}
        />
      </div>
      {status.kind === "err" && (
        <div role="alert" className="border border-alert-red bg-alert-red/10 text-alert-red px-4 py-3 font-mono font-bold text-[11px] tracking-[.18em] uppercase">
          {status.message}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] tracking-[.18em] uppercase text-ash-600 font-semibold max-w-[42ch]">
          We typically reply within one business day. Hours · 09:00–17:00 MST.
        </p>
        <BladeButton
          variant="brass"
          size="lg"
          type="submit"
          disabled={status.kind === "sending"}
          data-event="contact_submit"
        >
          {status.kind === "sending" ? "Sending…" : "Send Message"}
          <Send size={14} strokeWidth={2} aria-hidden="true" className="ml-2" />
        </BladeButton>
      </div>
      <FormLegalNote tone="light" />
    </form>
  );
}
