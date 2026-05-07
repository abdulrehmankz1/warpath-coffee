import type { Metadata } from "next";
import { MissionShell } from "@/components/warpath/MissionShell";
import { PRODUCTS } from "@/lib/data/warpath";

export const metadata: Metadata = {
  title: "Veteran Coffee Mugs · Heavy-Duty, Dishwasher Safe",
  description:
    "A bold coffee deserves a bold mug. Heavy-duty ceramic mugs and 20oz insulated tumblers — pin-up, US flag, anchor, and Warpath logo designs.",
};

const drinkware = PRODUCTS.filter((p) => p.category === "drinkware").slice(0, 4);

export default function VeteranMugsPage() {
  return (
    <MissionShell
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Mugs & Drinkware" },
      ]}
      hero={{
        eyebrow: "§ Field Drinkware",
        headlinePrimary: "A bold coffee deserves",
        headlineItalic: "a bold mug.",
        subhead:
          "A special coffee calls for a mug just as distinctive — and dishwasher safe. Heavy-duty ceramic, US-flag prints, pin-up classics, and 20oz insulated tumblers built for the morning briefing.",
        primaryCta: {
          label: "Shop Drinkware",
          href: "/shop/collections/drinkware",
          opCode: "OP-MUG",
        },
        secondaryCta: { label: "Pair With Coffee", href: "/shop" },
        trustNumber: "$17",
        trustLabel: "Mugs · 12oz heavy ceramic",
      }}
      stats={[
        { k: "Ceramic", v: "12 oz", sub: "heavy-duty · dishwasher safe" },
        { k: "Tumbler", v: "20 oz", sub: "stainless · vacuum insulated" },
        { k: "Designs", v: "US Flag · Pin-Up", sub: "anchor · Warpath logo" },
      ]}
      pillars={{
        eyebrow: "Built To Take The Bumpy Commute",
        title: "Three things every Warpath mug delivers.",
        items: [
          {
            code: "PILLAR · 01",
            title: "Heavy-Duty Ceramic",
            body: "Thick walls hold heat. Dishwasher-safe glaze stays sharp wash after wash.",
          },
          {
            code: "PILLAR · 02",
            title: "Made In America",
            body: "20oz Freedom Tumbler is double-wall, vacuum-insulated stainless steel — built and printed in the USA.",
          },
          {
            code: "PILLAR · 03",
            title: "Iconic Designs",
            body: "Pin-up classics, US-flag wraparound, MK4 anchor branding — pick the one that fits the watch.",
          },
        ],
      }}
      body={
        <>
          <p>
            Warpath Coffee offers a mouth-watering collection of signature blends to
            satisfy both the sophisticated palette and the coffee greenhorn alike — but
            when you&rsquo;re sipping it from your favorite mug, that just makes it all
            the more enjoyable.
          </p>
          <p>
            We&rsquo;re a family-operated coffee brand serving first responders,
            military veterans, and anyone else who wants smooth coffee made from
            perfectly-roasted beans. Drink it black. Drink it however. Just drink it
            from a Warpath mug.
          </p>
        </>
      }
      products={{
        eyebrow: "The Drinkware Lineup",
        title: "Pick your daily mug.",
        intro: "From the classic MK1 logo mug to the 20oz Freedom Tumbler — every piece is built for the watch.",
        items: drinkware,
      }}
      closing={{
        eyebrow: "Bold Flavors, Smooth Delivery",
        headline: "Brew it. Pour it. Sip it slow.",
        body: "Pair a bag of Mariner's Blend with the mug that fits your morning. Free shipping kicks in at $85.",
        primary: {
          label: "Shop Drinkware",
          href: "/shop/collections/drinkware",
          opCode: "OP-MUG",
        },
        secondary: { label: "Shop Coffee", href: "/shop" },
      }}
    />
  );
}
