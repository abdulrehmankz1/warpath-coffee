import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ReviewsHero } from "@/components/sections/ReviewsHero";
import { ReviewsFeatured } from "@/components/sections/ReviewsFeatured";
import { ReviewsGrid } from "@/components/sections/ReviewsGrid";
import { ReviewsWrite } from "@/components/sections/ReviewsWrite";
import { Reveal } from "@/components/warpath/Reveal";
import {
  BRAND,
  REVIEWS_PAGE,
  REVIEW_TOTALS,
  formatReviewCount,
} from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Reviews · 20K+ Verified Field Reports",
  description:
    "Read 20,000+ verified customer reviews of Warpath Coffee. Mariner's Blend, Breakfast Blend, Italian Frogman — average 4.9/5 across the catalog. Real names, unedited.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Reviews · Warpath Coffee",
    description: `${formatReviewCount(REVIEW_TOTALS.total)} verified reviews · ${REVIEW_TOTALS.averageRating.toFixed(1)} average across 25 SKUs.`,
    url: "/reviews",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reviews · Warpath Coffee",
    description: `${formatReviewCount(REVIEW_TOTALS.total)} verified reviews · ${REVIEW_TOTALS.averageRating.toFixed(1)} average.`,
  },
};

const reviewJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: BRAND.name,
  brand: { "@type": "Brand", name: BRAND.name },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_TOTALS.averageRating.toFixed(1),
    reviewCount: REVIEW_TOTALS.total,
    bestRating: "5",
    worstRating: "1",
  },
  review: REVIEWS_PAGE.reports.slice(0, 6).map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating.toString(),
      bestRating: "5",
    },
    reviewBody: r.quote,
    datePublished: r.date,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee/" },
    { "@type": "ListItem", position: 2, name: "Reviews", item: "https://warpath.coffee/reviews" },
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <ReviewsHero />
        <Reveal as="div">
          <TrustStrip />
        </Reveal>
        <Reveal as="div">
          <ReviewsFeatured />
        </Reveal>
        <Reveal as="div">
          <ReviewsGrid />
        </Reveal>
        <Reveal as="div">
          <ReviewsWrite />
        </Reveal>
        <Reveal as="div">
          <SubscribeCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
