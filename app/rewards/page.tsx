import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { RewardsHero } from "@/components/sections/RewardsHero";
import { RewardsTiers } from "@/components/sections/RewardsTiers";
import { RewardsEarn } from "@/components/sections/RewardsEarn";
import { RewardsRedeem } from "@/components/sections/RewardsRedeem";
import { RewardsFAQ } from "@/components/sections/RewardsFAQ";
import { Reveal } from "@/components/warpath/Reveal";
import { REWARDS } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Rewards · Loyalty Program · Earn the Stripe",
  description:
    "Free Warpath Coffee loyalty program. 5 points per $1, 100-point welcome bonus, $5 off at 100 points. Recruit, Operator, Command tier ladder. Cancel anytime.",
  alternates: { canonical: "/rewards" },
  openGraph: {
    title: "Rewards · Warpath Coffee Loyalty",
    description:
      "Earn 5pt/$1. 100pt welcome bonus. Free shipping at Operator tier. Free coffee at Command tier.",
    url: "/rewards",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rewards · Warpath Coffee Loyalty",
    description: "Free loyalty program. Three tiers. Cancel anytime.",
  },
};

const rewardsFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REWARDS.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee/" },
    { "@type": "ListItem", position: 2, name: "Rewards", item: "https://warpath.coffee/rewards" },
  ],
};

export default function RewardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rewardsFaqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <RewardsHero />
        <Reveal as="div">
          <TrustStrip />
        </Reveal>
        <Reveal as="div">
          <RewardsTiers />
        </Reveal>
        <Reveal as="div">
          <RewardsEarn />
        </Reveal>
        <Reveal as="div">
          <RewardsRedeem />
        </Reveal>
        <Reveal as="div">
          <RewardsFAQ />
        </Reveal>
        <Reveal as="div">
          <SubscribeCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
