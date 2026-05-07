import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { OrderConfirmation } from "@/components/warpath/OrderConfirmation";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Thanks for ordering from Warpath Coffee. Your roast is on the warpath.",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <section className="bg-bone-100 py-10 sm:py-14 lg:py-16 flex-1">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-12 lg:px-[90px]">
            <OrderConfirmation />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
