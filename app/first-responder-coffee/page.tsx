import type { Metadata } from "next";
import { MissionShell } from "@/components/warpath/MissionShell";
import { PRODUCTS, SECONDARY } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "First Responder Coffee · Veteran-Owned",
  description:
    "Coffee for police, firefighters, paramedics, and dispatchers. Bold, smooth, low-acid — built to fuel the people who fuel our communities.",
};

const featured = [
  SECONDARY,
  PRODUCTS.find((p) => p.slug === "italian-frogman-espresso")!,
  PRODUCTS.find((p) => p.slug === "vanilla-hazelnut-coffee")!,
  PRODUCTS.find((p) => p.slug === "warpath-freedom-tumbler")!,
];

export default function FirstResponderCoffeePage() {
  return (
    <MissionShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "First Responder Coffee" },
      ]}
      hero={{
        eyebrow: "§ Watch · 24 / 7 / 365",
        headlinePrimary: "Fueling the heroes",
        headlineItalic: "who fuel our communities.",
        subhead:
          "For the everyday heroes — police officers, firefighters, paramedics, and dispatchers — coffee isn't just a drink. It's the lifeblood that keeps the watch awake. We salute the men and women who protect and serve, and we built bold, high-quality roasts worthy of their commitment.",
        primaryCta: { label: "Shop the Roast", href: "/shop", opCode: "OP-SHOP" },
        secondaryCta: { label: "Our Story", href: "/about" },
        trustNumber: "★ 4.9",
        trustLabel: "10,000+ verified reviews",
      }}
      stats={[
        { k: "Roasted", v: "Small Batch", sub: "USA · to order" },
        { k: "Acidity", v: "Low", sub: "smooth, drink it black" },
        { k: "Built For", v: "The Watch", sub: "PD · FD · EMS" },
      ]}
      pillars={{
        eyebrow: "Coffee Blends for First Responders",
        title: "Three bags. One mission.",
        intro: "Whether you take the morning shift or the overnight, there's a Warpath blend dialed in for it.",
        items: [
          {
            code: "BLEND · 01",
            title: "Breakfast Blend",
            body: "A first-responder mainstay — smooth, earthy medium roast finished with dark French Roast notes. Carries you clean through every shift.",
          },
          {
            code: "BLEND · 02",
            title: "Italian Frogman Espresso",
            body: "Bold richness from premium espresso beans. Built for the moka pot, the lever, and the morning briefing.",
          },
          {
            code: "BLEND · 03",
            title: "Vanilla Hazelnut",
            body: "Toasted hazelnut and warm vanilla on a smooth medium roast. A delight for the senses — perfection in every cup.",
          },
        ],
      }}
      body={
        <>
          <p>
            Warpath Coffee is veteran-owned and family-operated. Run by veterans, NYPD,
            and a 30-year coffee roaster, we know the cost of standing the watch — and
            we know what good coffee tastes like.
          </p>
          <p>
            <strong className="text-combat-900 font-semibold">Don&rsquo;t forget the tumbler.</strong>{" "}
            Our 20-ounce stainless-steel double-wall vacuum-insulated tumblers hold heat
            for hours — built for the cruiser, the firehouse, and the rig. Made in
            America.
          </p>
        </>
      }
      products={{
        eyebrow: "Built for the Watch",
        title: "Carry the brew. Keep the heat.",
        intro: "The tumbler holds it. The roast earns it. Add both to your kit.",
        items: featured,
      }}
      testimonial={{
        quote:
          "It's 4:30 AM, the dogs and cats are on the bed a half hour early demanding breakfast — Warpath gets the day moving right.",
        name: "Rob Proft",
        role: "Verified Buyer",
      }}
      closing={{
        eyebrow: "Stand The Watch",
        headline: "Stock the firehouse. Stock the cruiser.",
        body: "Pause or swap by SMS. No lock-in. We deliver fresh, on schedule — so the watch never runs dry.",
        primary: { label: "Order Now", href: "/shop", opCode: "OP-SHOP" },
        secondary: { label: "Start Subscription", href: "/subscribe" },
      }}
    />
  );
}
