import { cn } from "@/lib/cn";

type Props = {
  size?: "sm" | "lg";
  variant?: "brass" | "combat" | "olive";
  className?: string;
};

const colors = {
  brass: "border-t-brass-500",
  combat: "border-t-combat-900",
  olive: "border-t-olive-600",
};

export function Chevron({ size = "sm", variant = "brass", className }: Props) {
  const dims = size === "lg"
    ? "border-l-[20px] border-r-[20px] border-t-[14px]"
    : "border-l-[14px] border-r-[14px] border-t-[10px]";
  return (
    <span
      className={cn(
        "inline-block border-l-transparent border-r-transparent",
        dims,
        colors[variant],
        className
      )}
      aria-hidden
    />
  );
}
