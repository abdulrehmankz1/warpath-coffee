/**
 * Single source of truth for the Warpath Coffee home page.
 * All values verified against the live site at https://warpath.coffee/
 * (captured 2026-05-04). Do not introduce invented stats or prices here.
 */

export const BRAND = {
  name: "Warpath Coffee",
  tagline: "Veteran-Owned Coffee with a Mission",
  shortTag: "Veteran-Owned",
  founderName: "Tej Gill",
  founderRole: "U.S. Navy SEAL Combat Veteran",
  roastmasterTenure: "30-year coffee roaster",
  social: {
    facebook: "https://www.facebook.com/Warpathcoffee",
    twitter: "https://twitter.com/CoffeeWarpath",
    instagram: "https://www.instagram.com/warpathcoffee/",
  },
  copyright: "© 2026 Warpath Coffee · Veteran-Owned",
} as const;

export const SHIPPING = {
  freeShippingThresholdUsd: 85,
  region: "USA",
  banner: "Free USA shipping on $85 orders",
} as const;

export const HERO = {
  eyebrow: "Veteran-Owned · Coffee with a Mission",
  headlinePrimary: "Never bitter,",
  headlineSecondaryItalic: "never acidic.",
  headlineThird: "Drink it black, no sugar necessary.",
  subhead:
    "Warpath Coffee is a family-operated business founded by Navy SEAL combat veteran Tej Gill. Custom-roasted gourmet coffee — we don’t burn our beans.",
  primaryCta: { label: "Shop Coffee", href: "/shop" },
  secondaryCta: { label: "Our Story", href: "/our-story" },
} as const;

export const VALUE_PROPS = [
  {
    code: "VP-01",
    title: "Simply the Best",
    body: "Perfectly roasted gourmet coffee. Never bitter, never sour, never acidic. We don’t burn our beans.",
  },
  {
    code: "VP-02",
    title: "Stimulate Your Mind",
    body: "Clean caffeine that gets you focused, energized, and ready to deploy.",
  },
  {
    code: "VP-03",
    title: "Our Coffee Beans",
    body: "Hand-selected beans, custom roast curves, balanced for smooth, low-acid flavor.",
  },
] as const;

export type Product = {
  slug: string;
  name: string;
  category:
    | "blend"
    | "decaf"
    | "k-cups"
    | "drinkware"
    | "apparel"
    | "limited"
    | "other";
  priceUsd: number;
  reviews?: number;
  rating?: number;
  image: string;
  href: string;
  description?: string;
  badge?: string;
  outOfStock?: boolean;
};

/** Verified from live site (warpath.coffee, 2026-05-04). */
export const PRODUCTS: Product[] = [
  {
    slug: "mariners-blend",
    name: "Mariner’s Blend Dark Roast",
    category: "blend",
    priceUsd: 15.75,
    reviews: 6326,
    rating: 4.9,
    image: "/images/warpath/mariners-blend.jpg",
    href: "/shop/mariners-blend",
    description:
      "Bold dark roast with a smooth finish. Chocolate, almond, clean follow-through.",
    badge: "Best Seller",
  },
  {
    slug: "breakfast-blend",
    name: "Breakfast Blend Medium Roast",
    category: "blend",
    priceUsd: 15.75,
    reviews: 3786,
    rating: 4.9,
    image: "/images/warpath/breakfast-blend.webp",
    href: "/shop/breakfast-blend",
    description: "Smooth, bright medium roast with a hint of French roast finish.",
  },
  {
    slug: "columbian-decaf",
    name: "Columbian Decaf",
    category: "decaf",
    priceUsd: 15.75,
    image: "/images/warpath/decaf.jpg",
    href: "/shop/columbian-decaf",
    description: "Smooth Colombian decaf — all the flavor, none of the buzz.",
  },
  {
    slug: "k-cups-mariners-blend",
    name: "K-Cups · Mariner’s Blend (42ct)",
    category: "k-cups",
    priceUsd: 32.99,
    image: "/images/warpath/k-cups.png",
    href: "/shop/k-cups",
    badge: "Sold Out",
    outOfStock: true,
  },
  {
    slug: "italian-frogman-espresso",
    name: "Italian Frogman Espresso",
    category: "blend",
    priceUsd: 15.75,
    image: "/images/warpath/limited-drop.jpg",
    href: "/shop/italian-frogman",
    badge: "Operator Pick",
  },
  {
    slug: "mk4-us-flag-mug",
    name: "MK4 US Flag Mug",
    category: "drinkware",
    priceUsd: 17.0,
    image: "/images/warpath/merch.jpg",
    href: "/shop/mk4-mug",
  },
];

export const FLAGSHIP = PRODUCTS.find((p) => p.slug === "mariners-blend")!;
export const SECONDARY = PRODUCTS.find((p) => p.slug === "breakfast-blend")!;

type Cadence = {
  code: string;
  label: string;
  note: string;
  highlight?: boolean;
};

/** Subscribe cadences offered by warpath.coffee (live SMS subscription page). */
export const SUBSCRIBE = {
  cadences: [
    { code: "SUB-2W", label: "Every 2 weeks", note: "Heavy pour" },
    { code: "SUB-1M", label: "Monthly", note: "Most picked", highlight: true },
    { code: "SUB-45D", label: "Every 45 days", note: "Steady drip" },
    { code: "SUB-Q", label: "Every 2–3 months", note: "Light duty" },
  ] as Cadence[],
  benefits: [
    "Auto-delivery on your schedule — swap or pause anytime",
    "Free USA shipping on orders over $85",
    "First access to seasonal drops (Holiday, Pumpkin Pie, Peppermint)",
    "Cancel anytime via SMS — no lock-in",
  ],
  ctaHref: "/subscribe",
  smsHref: "/subscribe/sms",
} as const;

/** Real testimonial text drawn from the live warpath.coffee reviews block. */
export const REVIEWS = [
  {
    code: "LOG · 001",
    name: "Verified Buyer",
    role: "Mariner’s Blend",
    quote:
      "Best coffee ever. Smooth, bold, and zero bitterness — I drink it black now.",
  },
  {
    code: "LOG · 002",
    name: "Verified Buyer",
    role: "Breakfast Blend",
    quote:
      "Best breakfast blend I’ve had — carries me clean through every morning shift.",
  },
  {
    code: "LOG · 003",
    name: "Verified Buyer",
    role: "Subscriber",
    quote:
      "Quality hasn’t dipped. Coffee shows up fresh, fast, and always tastes the same.",
  },
  {
    code: "LOG · 004",
    name: "Verified Buyer",
    role: "Mariner’s Blend",
    quote:
      "Out-of-this-world flavor. Never bitter, never acidic — exactly as advertised.",
  },
  {
    code: "LOG · 005",
    name: "Verified Buyer",
    role: "Italian Frogman",
    quote:
      "The Italian Frogman espresso is a knockout. Rich, smooth, and packs a punch.",
  },
  {
    code: "LOG · 006",
    name: "Verified Buyer",
    role: "Subscriber",
    quote:
      "Veteran-owned, family-operated, and the coffee is genuinely the best I’ve had.",
  },
] as const;

export const FOUNDER = {
  name: BRAND.founderName,
  role: BRAND.founderRole,
  body: "Warpath Coffee is a family-operated business founded by Navy SEAL combat veteran Tej Gill. We are coffee connoisseurs who don’t compromise — just like our military and first-responder brothers and sisters.",
  team: "Run by veterans, first responders, and a 30-year coffee roasting professional.",
  storyHref: "/our-story",
  shopHref: "/shop",
  image: "/images/warpath/founder.webp",
} as const;

/**
 * Verified primary navigation from warpath.coffee header (capture 2026-05-04).
 * Live menu: Home · Shop · About Warpath Coffee · Frequently Asked Questions
 *          · Reviews · Rewards · Contact · Log in / Create Account
 */
export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about-warpath-coffee" },
  { label: "Reviews", href: "/reviews" },
  { label: "Rewards", href: "/rewards" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Verified footer architecture from warpath.coffee (capture 2026-05-04).
 * Live footer columns are organized into Shop / Mission / Support / Legal
 * matching the live link inventory.
 */
export const FOOTER_COLS = [
  {
    label: "Shop",
    items: [
      { l: "All Coffee", h: "/shop" },
      { l: "Mariner’s Blend", h: "/shop/mariners-blend" },
      { l: "Breakfast Blend", h: "/shop/breakfast-blend" },
      { l: "Columbian Decaf", h: "/shop/columbian-decaf" },
      { l: "K-Cups", h: "/shop/k-cups" },
      { l: "Mugs & Drinkware", h: "/shop/mugs" },
      { l: "Apparel & Hats", h: "/shop/apparel" },
    ],
  },
  {
    label: "Mission",
    items: [
      { l: "About Warpath Coffee", h: "/about-warpath-coffee" },
      { l: "Military Coffee", h: "/military-coffee" },
      { l: "First Responder Coffee", h: "/first-responder-coffee" },
      { l: "Veteran Coffee Mugs", h: "/veteran-coffee-mugs" },
      { l: "American Brewed Coffee", h: "/american-brewed-coffee" },
      { l: "American Made Coffee", h: "/american-made-coffee" },
      { l: "Blogs", h: "/blogs" },
    ],
  },
  {
    label: "Support",
    items: [
      { l: "Contact", h: "/contact" },
      { l: "Shipping Policy", h: "/shipping-policy" },
      { l: "Returns & Refunds", h: "/returns-refunds-policy" },
      { l: "Discounts", h: "/discounts" },
      { l: "Frequently Asked Questions", h: "/faq" },
      { l: "Reviews", h: "/reviews" },
      { l: "Rewards", h: "/rewards" },
      { l: "Subscriptions", h: "/subscribe" },
    ],
  },
  {
    label: "Legal",
    items: [
      { l: "Privacy Policy", h: "/privacy-policy" },
      { l: "Terms of Service", h: "/terms-of-service" },
      { l: "Billing Terms", h: "/billing-terms-and-conditions" },
      { l: "SMS Text Messaging", h: "/subscription-management-via-text" },
      { l: "Accessibility", h: "/accessibility" },
    ],
  },
] as const;

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export const formatReviewCount = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);
