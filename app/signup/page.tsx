import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AuthShell } from "@/components/warpath/AuthShell";
import { SignupForm } from "@/components/warpath/SignupForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a Warpath Coffee account — get 15% off your first order, manage subscriptions, and access exclusive seasonal drops.",
  robots: { index: true, follow: true },
};

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <AuthShell
        opCode="OP-ENROLL"
        intakeLabel="INTAKE · OP-ENROLL · 001"
        title={
          <>
            Get 15% off your first order.{" "}
            <em className="not-italic text-brass-500 normal-case tracking-[-.025em]">
              Enroll.
            </em>
          </>
        }
        subtitle="Create your account in under a minute. Skip checkout fields next time, manage your subscription via SMS, and get first access to limited drops."
        altCta={{ label: "Already a subscriber?", href: "/login" }}
      >
        <SignupForm />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
