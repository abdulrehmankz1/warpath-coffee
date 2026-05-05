import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FlagshipCrate } from "@/components/sections/FlagshipCrate";
import { ProductMatrix } from "@/components/sections/ProductMatrix";
import { WhyWarpath } from "@/components/sections/WhyWarpath";
import { FounderStrip } from "@/components/sections/FounderStrip";
import { ReviewsLog } from "@/components/sections/ReviewsLog";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/warpath/Reveal";
import { BRAND, FLAGSHIP } from "@/lib/data/warpath";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: FLAGSHIP.name,
  description:
    "Custom dark roast. Chocolate, almond, clean finish. Smooth, low-acid, no compromise.",
  brand: { "@type": "Brand", name: BRAND.name },
  image: FLAGSHIP.image,
  sku: FLAGSHIP.slug,
  offers: {
    "@type": "Offer",
    price: FLAGSHIP.priceUsd.toFixed(2),
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: FLAGSHIP.reviews
    ? {
        "@type": "AggregateRating",
        ratingValue: (FLAGSHIP.rating ?? 4.9).toString(),
        reviewCount: FLAGSHIP.reviews.toString(),
      }
    : undefined,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: "https://warpath.coffee",
  logo: "/logo.avif",
  founder: {
    "@type": "Person",
    name: BRAND.founderName,
    jobTitle: `Founder · ${BRAND.founderRole}`,
  },
  description:
    "Veteran-owned premium coffee roaster — smooth, low-acid, no compromise.",
  sameAs: [
    BRAND.social.facebook,
    BRAND.social.twitter,
    BRAND.social.instagram,
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        {/* Hero — no Reveal wrapper, content needs to render immediately for LCP */}
        <Hero />
        <Reveal as="div"><TrustStrip /></Reveal>
        <Reveal as="div"><FlagshipCrate /></Reveal>
        <Reveal as="div"><ProductMatrix /></Reveal>
        <Reveal as="div"><WhyWarpath /></Reveal>
        <Reveal as="div"><FounderStrip /></Reveal>
        <Reveal as="div"><ReviewsLog /></Reveal>
        <Reveal as="div"><SubscribeCTA /></Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
