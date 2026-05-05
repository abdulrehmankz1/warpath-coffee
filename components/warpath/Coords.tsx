import { cn } from "@/lib/cn";

type Props = { items: string[]; className?: string; tone?: "light" | "dark" };

export function Coords({ items, className, tone = "light" }: Props) {
  const color = tone === "dark" ? "text-cream-50/55" : "text-ash-500";
  return (
    <div
      className={cn(
        "flex gap-6 flex-wrap font-mono text-[10px] font-semibold uppercase tracking-[.22em]",
        color,
        className
      )}
    >
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:bg-brass-500 before:rounded-full before:inline-block">
          {it}
        </span>
      ))}
    </div>
  );
}
