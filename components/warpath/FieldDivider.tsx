import { cn } from "@/lib/cn";

type Props = { label: string; tone?: "light" | "dark"; className?: string };

export function FieldDivider({ label, tone = "light", className }: Props) {
  const color = tone === "dark" ? "text-brass-400" : "text-brass-700";
  const bar = tone === "dark" ? "bg-brass-500/20" : "bg-canvas-300";
  return (
    <div
      className={cn(
        "flex items-center gap-4 my-8 font-mono font-bold text-[10px] tracking-[.28em] uppercase",
        color,
        className
      )}
    >
      <span className={cn("flex-1 h-px", bar)} />
      <span>{label}</span>
      <span className={cn("flex-1 h-px", bar)} />
    </div>
  );
}
