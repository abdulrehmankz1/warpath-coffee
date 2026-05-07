"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.099 1.893-4.785 4.659-4.785 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);

const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const PinterestIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

type Props = {
  url: string;
  title: string;
};

export function ShareRail({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const enc = (s: string) => encodeURIComponent(s);
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
  const x = `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`;
  const pin = `https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(
    title,
  )}`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="border border-combat-900 bg-bone-50">
      <div className="bg-combat-900 text-cream-50 px-4 py-2.5 font-mono font-bold text-[10px] tracking-[.28em] uppercase text-brass-400">
        Share
      </div>
      <ul className="grid grid-cols-4 sm:grid-cols-1 sm:gap-px bg-canvas-300">
        {[
          {
            label: "Facebook",
            href: fb,
            icon: FacebookIcon,
          },
          {
            label: "X (Twitter)",
            href: x,
            icon: XIcon,
          },
          {
            label: "Pinterest",
            href: pin,
            icon: PinterestIcon,
          },
        ].map(({ label, href, icon: Icon }) => (
          <li key={label} className="bg-bone-50">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-[20px_1fr] sm:grid-cols-[24px_1fr] gap-2 sm:gap-3 items-center px-3 sm:px-4 py-3 hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
              data-event={`share_${label.toLowerCase()}`}
            >
              <Icon />
              <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-combat-900 hidden sm:inline">
                {label}
              </span>
            </a>
          </li>
        ))}
        <li className="bg-bone-50">
          <button
            type="button"
            onClick={onCopy}
            className="w-full grid grid-cols-[20px_1fr] sm:grid-cols-[24px_1fr] gap-2 sm:gap-3 items-center px-3 sm:px-4 py-3 hover:bg-bone-100 motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brass-500"
            data-event="share_copy"
            aria-label="Copy link"
          >
            {copied ? <Check size={14} strokeWidth={2.4} className="text-brass-700" aria-hidden="true" /> : <Link2 size={14} strokeWidth={1.8} aria-hidden="true" />}
            <span className="font-mono font-bold text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-combat-900 hidden sm:inline">
              {copied ? "Copied" : "Copy Link"}
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
