import type { Metadata } from "next";
import { MissionShell } from "@/components/warpath/MissionShell";
import { PRODUCTS, FLAGSHIP, SECONDARY } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "American Brewed Coffee · Drip Done Right",
  description:
    "The true taste of American drip coffee. Hot water, ground beans, paper filter — done right with Warpath's smooth, low-acid roasts.",
};

const featured = [
  FLAGSHIP,
  SECONDARY,
  PRODUCTS.find((p) => p.slug === "summer-blend")!,
  PRODUCTS.find((p) => p.slug === "italian-frogman-espresso")!,
];

export default function AmericanBrewedCoffeePage() {
  return (
    <MissionShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "American Brewed Coffee" },
      ]}
      hero={{
        eyebrow: "§ Drip · The American Standard",
        headlinePrimary: "The true taste of",
        headlineItalic: "American drip coffee.",
        subhead:
          "When you're on the go and you need a rich, bold, strong cup of coffee without the wait, Warpath is ready to deliver. We roast beans to produce a rich, robust, yet smooth flavor — built for the drip coffee tradition.",
        primaryCta: { label: "Visit the Online Store", href: "/shop", opCode: "OP-SHOP" },
        secondaryCta: { label: "How We Roast", href: "/about" },
      }}
      stats={[
        { k: "Grind", v: "Medium", sub: "best for drip" },
        { k: "Water", v: "195–205°F", sub: "90–96°C" },
        { k: "Process", v: "Paper Filter", sub: "complex flavor stands out" },
      ]}
      pillars={{
        eyebrow: "Brew The Better Cup",
        title: "Three rules for American-style coffee.",
        items: [
          {
            code: "RULE · 01",
            title: "Medium Grind",
            body: "Too coarse and the water rushes through. Too fine and it stalls. Medium grind is the drip-coffee sweet spot.",
          },
          {
            code: "RULE · 02",
            title: "Right Temperature",
            body: "195–205°F (90–96°C). Below that and you under-extract. Above and you scorch — that's where bitterness comes from.",
          },
          {
            code: "RULE · 03",
            title: "Paper Filter",
            body: "Filtered brew lets the complex flavors of the bean stand out. Cleaner cup, smoother finish.",
          },
        ],
      }}
      body={
        <>
          <p>
            True coffee lovers know that you don&rsquo;t need much more for an amazing,
            flavorful cup of coffee than hot water and ground coffee beans. American
            drip done right is one of the cleanest ways to taste a roast.
          </p>
          <p>
            Warpath Coffee offers a range of flavors and roasts to suit your everyday
            cup of American-style coffee — from the dark Mariner&rsquo;s Blend to the
            bright Breakfast Blend and the seasonal flavored line.
          </p>
        </>
      }
      products={{
        eyebrow: "Drip-Ready",
        title: "Roasts dialed for the carafe.",
        items: featured,
      }}
      closing={{
        eyebrow: "Drip Smooth · Drink Black",
        headline: "Brew the better cup.",
        body: "Free USA shipping on orders $85+. 30-day guarantee. We roast to order.",
        primary: { label: "Shop Roasts", href: "/shop", opCode: "OP-SHOP" },
        secondary: { label: "Start Subscription", href: "/subscribe" },
      }}
    />
  );
}
