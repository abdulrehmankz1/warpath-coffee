import type { Metadata } from "next";
import { MissionShell } from "@/components/warpath/MissionShell";
import { PRODUCTS, FLAGSHIP, SECONDARY } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "American Made Coffee · Roasted in the USA",
  description:
    "American made coffee for America's finest. Every Warpath bean is roasted in the USA using traditional methods that caramelize for smooth, low-acid flavor.",
};

const featured = [
  FLAGSHIP,
  SECONDARY,
  PRODUCTS.find((p) => p.slug === "dark-chocolate-coffee")!,
  PRODUCTS.find((p) => p.slug === "summer-blend")!,
];

export default function AmericanMadeCoffeePage() {
  return (
    <MissionShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "American Made Coffee" },
      ]}
      hero={{
        eyebrow: "§ Made In The U.S. of A.",
        headlinePrimary: "American made coffee",
        headlineItalic: "for America's finest.",
        subhead:
          "Coffee made in the good ol' U.S. of A isn't just the way you start your day — it's a symbol of pride, innovation, and a deep-seated dedication to delivering the best daily brew you can count on.",
        primaryCta: { label: "Visit the Online Store", href: "/shop", opCode: "OP-SHOP" },
        secondaryCta: { label: "Our Mission", href: "/about" },
        trustNumber: "USA",
        trustLabel: "Roasted · Bagged · Shipped",
      }}
      stats={[
        { k: "Roasted", v: "USA", sub: "every batch" },
        { k: "Method", v: "Traditional", sub: "caramelized for smoothness" },
        { k: "Ships From", v: "Las Vegas, NV", sub: "to all 50 states" },
      ]}
      pillars={{
        eyebrow: "Two Roasts. One Standard.",
        title: "We roast for both ends of the day.",
        items: [
          {
            code: "PILLAR · 01",
            title: "Dark Roasts",
            body: "We offer a dark roast for those who prefer a bolder, more intense start to their morning — or that pick-me-up boost in the afternoon.",
          },
          {
            code: "PILLAR · 02",
            title: "Lighter Roasts",
            body: "Maybe you need a little light in your life. Our medium and seasonal roasts have just what you need to get you through the day.",
          },
          {
            code: "PILLAR · 03",
            title: "Caramelized Smoothness",
            body: "Our roasting process places greater emphasis on caramelizing the beans — the secret to Warpath's smoother taste.",
          },
        ],
      }}
      body={
        <>
          <p>
            Roasted in the USA, Warpath Coffee brings a roasting process that places a
            greater emphasis on caramelizing our coffee beans for a smoother taste. No
            burnt edges. No bitter aftertaste. Just clean coffee, the way it&rsquo;s
            supposed to be.
          </p>
          <p>
            Veteran-owned and family-operated, with a 30-year coffee roasting
            professional in the crew. We hold the line on quality so every cup tastes
            the same — whether it&rsquo;s your first or your thousandth bag.
          </p>
        </>
      }
      products={{
        eyebrow: "Made In America",
        title: "Pick your roast.",
        items: featured,
      }}
      closing={{
        eyebrow: "Drink it black, no sugar necessary",
        headline: "Stand the watch with American coffee.",
        body: "Free USA shipping on orders $85+. Roasted to order, dispatched within 48 hours.",
        primary: { label: "Shop Now", href: "/shop", opCode: "OP-SHOP" },
        secondary: { label: "Start Subscription", href: "/subscribe" },
      }}
    />
  );
}
