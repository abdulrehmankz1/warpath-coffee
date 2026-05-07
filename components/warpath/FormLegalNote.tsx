import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  /** "dark" = on combat/dark backgrounds (cream text). "light" = on bone/light backgrounds (combat text). */
  tone?: "light" | "dark";
  className?: string;
};

export function FormLegalNote({ tone = "light", className }: Props) {
  const base = tone === "dark" ? "text-cream-50/55" : "text-ash-600";
  const linkBase =
    tone === "dark"
      ? "text-brass-400 hover:text-brass-300 decoration-brass-500/40"
      : "text-brass-700 hover:text-combat-900 decoration-brass-500/40";

  return (
    <p
      className={cn(
        "font-mono text-[10px] sm:text-[11px] tracking-[.16em] uppercase leading-[1.6] font-semibold",
        base,
        className,
      )}
    >
      By submitting you agree to the{" "}
      <Link
        href="/terms-of-service"
        className={cn("underline underline-offset-4", linkBase)}
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className={cn("underline underline-offset-4", linkBase)}
      >
        Privacy Policy
      </Link>
      .
    </p>
  );
}
