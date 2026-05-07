import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AuthShell } from "@/components/warpath/AuthShell";
import { ForgotPasswordForm } from "@/components/warpath/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Reset your Warpath Coffee account password. We'll email a secure reset link.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <>
      <SiteHeader />
      <AuthShell
        opCode="OP-RESET"
        intakeLabel="INTAKE · OP-RESET · 002"
        title={
          <>
            Lock out?{" "}
            <em className="not-italic text-brass-500 tracking-[-.025em]">
              Reset it.
            </em>
          </>
        }
        subtitle="Drop your email and we'll send a secure reset link. The link works once and expires in 30 minutes."
        altCta={{ label: "Remembered it?", href: "/login" }}
      >
        <ForgotPasswordForm />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
