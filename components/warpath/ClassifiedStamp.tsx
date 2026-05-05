import { cn } from "@/lib/cn";

type Props = {
  label: string;
  sub?: string;
  variant?: "red" | "brass" | "bone";
  className?: string;
};

const variants = {
  red: "border-alert-red text-alert-red",
  brass: "border-brass-500 text-brass-500",
  bone: "border-bone-100 text-bone-100",
};

export function ClassifiedStamp({ label, sub, variant = "red", className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center border-2 px-5 py-2.5 font-stencil font-extrabold text-lg tracking-[.16em] uppercase leading-tight -rotate-3",
        variants[variant],
        className
      )}
    >
      {label}
      {sub && (
        <span className="mt-1 font-mono text-[9px] font-semibold tracking-[.24em] opacity-85">
          {sub}
        </span>
      )}
    </div>
  );
}
