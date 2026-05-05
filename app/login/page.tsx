import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AuthShell } from "@/components/warpath/AuthShell";
import { LoginForm } from "@/components/warpath/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Warpath Coffee account to manage subscriptions, track orders, and access exclusive drops.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <AuthShell
        opCode="OP-LOGIN"
        intakeLabel="INTAKE · OP-LOGIN · 001"
        title={
          <>
            Stand the watch.{" "}
            <em className="font-italic italic font-normal text-brass-500 normal-case tracking-[-.025em]">
              Sign in.
            </em>
          </>
        }
        subtitle="Manage your subscription, track shipments, redeem rewards, and grab exclusive drops before anyone else."
        altCta={{ label: "New to Warpath?", href: "/signup" }}
      >
        <LoginForm />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
