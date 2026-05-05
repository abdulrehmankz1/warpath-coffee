import { cn } from "@/lib/cn";

type Props = {
  variant?: "brass" | "olive";
  thin?: boolean;
  className?: string;
};

export function AmmoStripe({ variant = "brass", thin = false, className }: Props) {
  const colorA = variant === "olive" ? "var(--color-olive-600)" : "var(--color-brass-500)";
  const tile = thin ? 12 : 16;
  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        thin ? "h-2" : "h-3.5",
        "border-y border-combat-900",
        className
      )}
      style={{
        backgroundImage: `repeating-linear-gradient(135deg, ${colorA} 0 ${tile}px, var(--color-combat-900) ${tile}px ${tile * 2}px)`,
      }}
    />
  );
}
