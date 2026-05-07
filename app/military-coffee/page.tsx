import type { Metadata } from "next";
import { MissionShell } from "@/components/warpath/MissionShell";
import { PRODUCTS, FLAGSHIP, SECONDARY } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Military Coffee · Veteran-Owned, Roasted in the USA",
  description:
    "Bold, resilient, uncompromising. Founded by Navy SEAL combat veteran Tej Gill — premium gourmet coffee roasted small-batch the old-fashioned way.",
};

const featured = [
  FLAGSHIP,
  SECONDARY,
  PRODUCTS.find((p) => p.slug === "italian-frogman-espresso")!,
  PRODUCTS.find((p) => p.slug === "dark-chocolate-coffee")!,
];

export default function MilitaryCoffeePage() {
  return (
    <MissionShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Military Coffee" },
      ]}
      hero={{
        eyebrow: "§ For The Mission",
        headlinePrimary: "Military coffee.",
        headlineItalic: "Built for the brief.",
        subhead:
          "Bold, resilient, and uncompromising — that's Warpath Coffee. Founded by Navy SEAL combat veteran Tej Gill, we deliver superior coffee with consistent, full-bodied flavor. No bitter taste. No acidic finish. Just the cup that fuels your day.",
        primaryCta: { label: "Order Now", href: "/shop", opCode: "OP-SHOP" },
        secondaryCta: { label: "Our Story", href: "/about" },
        trustNumber: "★ 4.9",
        trustLabel: "10,000+ verified reviews",
      }}
      stats={[
        { k: "Founded By", v: "Navy SEAL", sub: "combat veteran" },
        { k: "Roasted", v: "USA", sub: "small batch · to order" },
        { k: "Crew", v: "Family-Operated", sub: "veterans · NYPD · roastmaster" },
      ]}
      pillars={{
        eyebrow: "Why Operators Choose Warpath",
        title: "Taste is our top priority.",
        intro:
          "We use a Civil War-era roasting technique — Jabez Burns' 1860s perforated drum — that prevents scorching and caramelizes the beans for an unbeatable smooth flavor profile.",
        items: [
          {
            code: "PILLAR · 01",
            title: "Crafted in Small Batches",
            body: "Roasted to order in the USA so peak aroma lands in the bag. No bulk runs. No stale inventory.",
          },
          {
            code: "PILLAR · 02",
            title: "Smooth, Never Bitter",
            body: "Dialed-in roast curves keep chlorogenic acidity low — drink it black, no sugar necessary.",
          },
          {
            code: "PILLAR · 03",
            title: "Veteran-Owned Standard",
            body: "Run by veterans, NYPD, and a 30-year coffee professional. We hold the line on quality.",
          },
        ],
      }}
      body={
        <>
          <p>
            Every sip of Warpath Coffee is rich and smooth, so you can drink it black —
            no sugar or cream needed. When the mission demands extra focus, don&rsquo;t
            settle for anything less than absolute coffee excellence.
          </p>
          <p>
            We hoisted the Jolly Roger and went gourmet coffee-hunting. The result: a
            line of expertly-roasted blends that fuel your day without the bitter,
            acidic taste so common in mass-market coffee.
          </p>
        </>
      }
      products={{
        eyebrow: "Signature Blends",
        title: "Six bags. Pick your weapon.",
        intro: "From Mariner's Blend to Italian Frogman Espresso — every blend is built for taste and stimulation.",
        items: featured,
      }}
      testimonial={{
        quote:
          "Out-of-this-world flavor. Never bitter, never acidic — exactly as advertised. I drink it black now.",
        name: "Verified Buyer",
        role: "Mariner's Blend",
      }}
      closing={{
        eyebrow: "It's Time to Get on the Warpath",
        headline: "The brief: get the better cup.",
        body: "Joining the warpath means joining a community of military, first responders, and quality-conscious operators who refuse to compromise on flavor.",
        primary: { label: "Order Now", href: "/shop", opCode: "OP-SHOP" },
        secondary: { label: "Start Subscription", href: "/subscribe" },
      }}
    />
  );
}
