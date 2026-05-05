import Link from "next/link";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
};

export function Breadcrumbs({ items, tone = "light", className }: Props) {
  const base =
    tone === "dark"
      ? "text-cream-50/55 hover:text-brass-400"
      : "text-ash-600 hover:text-brass-700";
  const current = tone === "dark" ? "text-brass-400" : "text-combat-900";
  const sepColor = tone === "dark" ? "text-brass-500/40" : "text-canvas-400";

  return (
    <nav aria-label="Breadcrumb" className={cn("font-mono", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] tracking-[.20em] uppercase font-semibold">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5 sm:gap-2">
              {i > 0 && (
                <span aria-hidden="true" className={cn("inline-block", sepColor)}>
                  ›
                </span>
              )}
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className={cn("font-bold", current)}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "motion-safe:transition-colors motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-500",
                    base,
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
