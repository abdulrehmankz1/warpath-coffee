import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutFounder } from "@/components/sections/AboutFounder";
import { AboutSpecial } from "@/components/sections/AboutSpecial";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutFounderQuote } from "@/components/sections/AboutFounderQuote";
import { AboutTestimonials } from "@/components/sections/AboutTestimonials";
import { AboutFAQ } from "@/components/sections/AboutFAQ";
import { Reveal } from "@/components/warpath/Reveal";
import { ABOUT, BRAND } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "About · Veteran-Owned, Family-Operated",
  description:
    "Founded by Navy SEAL combat veteran Tej Gill. Veteran-owned, family-operated coffee — roasted in the USA, smooth, low-acid, never bitter.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Warpath Coffee · Veteran-Owned",
    description:
      "Founded by Navy SEAL combat veteran Tej Gill. Custom-roasted gourmet coffee — smooth, low-acid, no compromise.",
    url: "/about",
    type: "article",
    images: [
      {
        url: ABOUT.hero.image,
        width: 1200,
        height: 1500,
        alt: ABOUT.hero.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Warpath Coffee · Veteran-Owned",
    description:
      "Founded by Navy SEAL combat veteran Tej Gill. Smooth, low-acid, roasted in the USA.",
    images: [ABOUT.hero.image],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://warpath.coffee/about",
  name: "About Warpath Coffee",
  description:
    "Veteran-owned, family-operated coffee roaster founded by Navy SEAL combat veteran Tej Gill.",
  mainEntity: {
    "@type": "Organization",
    name: BRAND.name,
    url: "https://warpath.coffee",
    logo: "https://warpath.coffee/logo.avif",
    foundingLocation: { "@type": "Place", name: "United States" },
    founder: {
      "@type": "Person",
      name: BRAND.founderName,
      jobTitle: BRAND.founderRole,
      description:
        "Navy SEAL combat veteran, founder of Warpath Coffee — a veteran-owned, family-operated roaster.",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: ABOUT.contact.email,
      telephone: ABOUT.contact.phone,
      contactType: "customer support",
    },
    sameAs: [
      BRAND.social.facebook,
      BRAND.social.twitter,
      BRAND.social.instagram,
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://warpath.coffee/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://warpath.coffee/about",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ABOUT.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <AboutHero />
        <Reveal as="div">
          <TrustStrip />
        </Reveal>
        <Reveal as="div">
          <AboutFounder />
        </Reveal>
        <Reveal as="div">
          <AboutSpecial />
        </Reveal>
        <Reveal as="div">
          <AboutMission />
        </Reveal>
        <Reveal as="div">
          <AboutFounderQuote />
        </Reveal>
        <Reveal as="div">
          <AboutTestimonials />
        </Reveal>
        <Reveal as="div">
          <AboutFAQ />
        </Reveal>
        <Reveal as="div">
          <SubscribeCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
