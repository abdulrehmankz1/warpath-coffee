import type { Metadata } from "next";
import { SiteHeader } from "@/components/warpath/SiteHeader";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SubscribeCTA } from "@/components/sections/SubscribeCTA";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactIntake } from "@/components/sections/ContactIntake";
import { ContactSelfServe } from "@/components/sections/ContactSelfServe";
import { Reveal } from "@/components/warpath/Reveal";
import { BRAND, CONTACT } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Contact · Always Ready, Always Happy to Help",
  description:
    "Contact Warpath Coffee customer support. Email customercare@warpath.coffee, call +1 208 599-6678 (09:00-17:00 MST), or send a message. Most replies within 1 business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Warpath Coffee",
    description:
      "Email customercare@warpath.coffee · +1 208 599-6678 · 09:00-17:00 MST. Real humans, no bots.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Warpath Coffee",
    description: "Real humans · 1-day reply target · Veteran-owned support team.",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  url: "https://warpath.coffee",
  logo: "https://warpath.coffee/logo.avif",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "customercare@warpath.coffee",
      telephone: "+1-208-599-6678",
      contactType: "customer support",
      areaServed: "US",
      availableLanguage: "en",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "PO Box 1344",
    addressLocality: "Cheyenne",
    addressRegion: "WY",
    postalCode: "82003",
    addressCountry: "US",
  },
  sameAs: [
    BRAND.social.facebook,
    BRAND.social.twitter,
    BRAND.social.instagram,
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://warpath.coffee/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://warpath.coffee/contact" },
  ],
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://warpath.coffee/contact",
  name: "Contact Warpath Coffee",
  description:
    "Contact Warpath Coffee for customer support, subscription help, returns, and wholesale inquiries.",
  mainEntity: {
    "@type": "Organization",
    name: BRAND.name,
    email: CONTACT.channels[0].value,
    telephone: CONTACT.channels[1].value,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="flex-1 flex flex-col">
        <ContactHero />
        <Reveal as="div">
          <TrustStrip />
        </Reveal>
        <Reveal as="div">
          <ContactIntake />
        </Reveal>
        <Reveal as="div">
          <ContactSelfServe />
        </Reveal>
        <Reveal as="div">
          <SubscribeCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
