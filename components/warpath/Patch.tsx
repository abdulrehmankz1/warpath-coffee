import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  variant?: "olive" | "brass" | "combat";
  size?: number;
  className?: string;
};

const bg: Record<string, string> = {
  olive: "radial-gradient(circle at 35% 30%, var(--color-olive-500), var(--color-olive-700))",
  brass: "radial-gradient(circle at 35% 30%, var(--color-brass-400), var(--color-brass-700))",
  combat: "radial-gradient(circle at 35% 30%, var(--color-combat-700), var(--color-combat-900))",
};

const text: Record<string, string> = {
  olive: "text-bone-50",
  brass: "text-combat-900",
  combat: "text-brass-400",
};

const star: Record<string, string> = {
  olive: "text-brass-400",
  brass: "text-combat-900",
  combat: "text-brass-400",
};

export function Patch({ children, variant = "olive", size = 120, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-full border-[3px] border-combat-900 flex flex-col items-center justify-center text-center font-stencil font-extrabold uppercase leading-[1.15] tracking-[.10em]",
        text[variant],
        className
      )}
      style={{
        width: size,
        height: size,
        background: bg[variant],
        fontSize: size > 100 ? 11 : 9,
        padding: 14,
        boxShadow: "0 6px 18px rgba(0,0,0,.35), inset 0 0 0 6px rgba(0,0,0,.12)",
      }}
    >
      <span className={cn("text-base mb-1", star[variant])}>★</span>
      {children}
    </div>
  );
}
