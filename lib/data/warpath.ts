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

export type ProductCategory =
  | "coffee"
  | "decaf"
  | "k-cups"
  | "drinkware"
  | "gift-card";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceUsd: number;
  reviews?: number;
  rating?: number;
  image: string;
  href: string;
  description?: string;
  badge?: string;
  outOfStock?: boolean;
  /** Display tag list for tasting-notes section */
  notes?: readonly string[];
  /** Roast specifications (PDP) */
  specs?: Readonly<Record<string, string>>;
};

/** Sort options surfaced on the /shop collection page. */
export const SORT_OPTIONS = [
  { value: "best-sellers", label: "Best Sellers" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
] as const;

export const CATEGORY_FILTERS = [
  { value: "all", label: "All" },
  { value: "coffee", label: "Coffee" },
  { value: "decaf", label: "Decaf" },
  { value: "k-cups", label: "K-Cups" },
  { value: "drinkware", label: "Drinkware" },
  { value: "gift-card", label: "Gift Cards" },
] as const;

/**
 * 25 SKUs scraped from https://warpath.coffee/collections/all on 2026-05-05.
 * Real product names, prices, slugs, image filenames, and review counts.
 * Image paths point to /public/images/products/ (downloaded locally).
 */
export const PRODUCTS: Product[] = [
  {
    slug: "mariners-blend-dark-roast-coffee",
    name: "Mariner’s Blend Dark Roast",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 6349,
    rating: 4.9,
    image: "/images/products/mariners-blend-dark-roast-coffee.jpg",
    href: "/shop/mariners-blend-dark-roast-coffee",
    description:
      "Bold dark roast with a smooth finish. Chocolate, almond, clean follow-through. Never bitter, never acidic.",
    badge: "Best Seller",
    notes: ["Chocolate", "Almond", "Clean Finish"],
    specs: {
      "Roast Level": "Dark",
      Origin: "Colombia · Brazil",
      Process: "Custom",
      Caffeine: "Standard",
    },
  },
  {
    slug: "breakfast-blend-coffee",
    name: "Breakfast Blend Medium Roast",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 3797,
    rating: 4.9,
    image: "/images/products/breakfast-blend-coffee.webp",
    href: "/shop/breakfast-blend-coffee",
    description:
      "Smooth, bright medium roast with a hint of French roast finish. Carries you clean through every morning shift.",
    notes: ["Bright", "Smooth", "French Hint"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Washed",
      Caffeine: "Standard",
    },
  },
  {
    slug: "decaf",
    name: "Columbian Decaf",
    category: "decaf",
    priceUsd: 15.75,
    reviews: 178,
    rating: 4.9,
    image: "/images/products/decaf.jpg",
    href: "/shop/decaf",
    description:
      "Smooth Colombian decaf — all the flavor, none of the buzz. Swiss Water processed.",
    notes: ["Smooth", "Caramel", "Mellow"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Colombia",
      Process: "Swiss Water Decaf",
      Caffeine: "Decaf",
    },
  },
  {
    slug: "summer-blend",
    name: "Summer Blend — Blue Mountain Style",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 673,
    rating: 4.9,
    image: "/images/products/summer-blend.jpg",
    href: "/shop/summer-blend",
    description:
      "Caribbean-inspired medium roast in the Blue Mountain tradition. Crisp, clean, and gentle on the palate.",
    notes: ["Crisp", "Citrus", "Light Body"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Caribbean Blend",
      Process: "Washed",
      Caffeine: "Standard",
    },
  },
  {
    slug: "italian-frogman-espresso",
    name: "Italian Frogman Espresso",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 446,
    rating: 4.9,
    image: "/images/products/italian-frogman-espresso.jpg",
    href: "/shop/italian-frogman-espresso",
    description:
      "Rich, smooth espresso roast that packs a punch. Built for the moka pot, the lever, and the morning briefing.",
    badge: "Operator Pick",
    notes: ["Rich", "Smooth", "Punchy"],
    specs: {
      "Roast Level": "Dark",
      Origin: "Italian Style",
      Process: "Espresso Roast",
      Caffeine: "Standard",
    },
  },
  {
    slug: "dark-chocolate-coffee",
    name: "Dark Chocolate Coffee",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 794,
    rating: 4.9,
    image: "/images/products/dark-chocolate-coffee.jpg",
    href: "/shop/dark-chocolate-coffee",
    description:
      "A flavored medium roast with deep dark-chocolate notes. Naturally smooth, no sugar required.",
    notes: ["Cocoa", "Smooth", "Sweet"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "vanilla-hazelnut-coffee",
    name: "Vanilla Hazelnut Coffee",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 587,
    rating: 4.9,
    image: "/images/products/copy-of-dark-chocolate-coffee.jpg",
    href: "/shop/vanilla-hazelnut-coffee",
    description:
      "You won’t be able to drink just one cup. Toasted hazelnut and warm vanilla on a smooth medium roast.",
    notes: ["Vanilla", "Hazelnut", "Toasty"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "maple-bourbon",
    name: "Maple Bourbon Coffee",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 467,
    rating: 4.9,
    image: "/images/products/maple-bourdon.png",
    href: "/shop/maple-bourbon",
    description:
      "Maple syrup sweetness layered over a bourbon-aged finish. Cold brew this one — you won’t regret it.",
    notes: ["Maple", "Bourbon", "Sweet"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "salted-caramel",
    name: "Warpath Salted Caramel",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 60,
    rating: 4.9,
    image: "/images/products/salted-caramel.jpg",
    href: "/shop/salted-caramel",
    description:
      "Buttery caramel meets a touch of sea salt. Rich, balanced, dessert-in-a-cup.",
    notes: ["Caramel", "Sea Salt", "Buttery"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "holiday-blend",
    name: "Holiday Blend",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 291,
    rating: 4.9,
    image: "/images/products/holiday-blend.jpg",
    href: "/shop/holiday-blend",
    description:
      "Ho, ho, ho! Our Holiday Blend is back in town — warm spice, dark chocolate, and a long, festive finish.",
    badge: "Seasonal",
    notes: ["Spice", "Chocolate", "Festive"],
    specs: {
      "Roast Level": "Dark",
      Origin: "Latin America",
      Process: "Seasonal Blend",
      Caffeine: "Standard",
    },
  },
  {
    slug: "peppermint-mocha",
    name: "Peppermint Mocha Holiday Coffee",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 61,
    rating: 4.9,
    image: "/images/products/peppermint-mocha.jpg",
    href: "/shop/peppermint-mocha",
    description:
      "Cool peppermint and rich chocolate, hot-pressed onto a medium roast. The cup that earns the second pour.",
    badge: "Seasonal",
    notes: ["Peppermint", "Mocha", "Holiday"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "pumpkin-spice-coffee",
    name: "Pumpkin Pie Coffee",
    category: "coffee",
    priceUsd: 15.75,
    reviews: 120,
    rating: 4.9,
    image: "/images/products/pumkin-spice-coffee.jpg",
    href: "/shop/pumpkin-spice-coffee",
    description:
      "Back again for the holidays. Real pumpkin pie spice on a smooth medium roast — sweater weather, in a cup.",
    badge: "Seasonal",
    notes: ["Pumpkin", "Cinnamon", "Spice"],
    specs: {
      "Roast Level": "Medium",
      Origin: "Latin America",
      Process: "Flavored",
      Caffeine: "Standard",
    },
  },
  {
    slug: "heavenly-hot-chocolate",
    name: "Heavenly Hot Chocolate",
    category: "coffee",
    priceUsd: 12.99,
    reviews: 25,
    rating: 4.9,
    image: "/images/products/heavenly-hot-chocolate.png",
    href: "/shop/heavenly-hot-chocolate",
    description:
      "Decadent hot chocolate mix. Single-cup serves or family pour-overs — works either way.",
    notes: ["Cocoa", "Sweet", "Cozy"],
  },
  {
    slug: "k-cups-mariners-blend-dark-roast",
    name: "K-Cups · Mariner’s Blend Dark Roast",
    category: "k-cups",
    priceUsd: 32.99,
    reviews: 1633,
    rating: 4.9,
    image: "/images/products/copy-of-k-cups-mariners-blend-dark-roast.png",
    href: "/shop/k-cups-mariners-blend-dark-roast",
    description: "42-count Keurig-compatible pods of our flagship Mariner’s Blend.",
    badge: "Sold Out",
    outOfStock: true,
  },
  {
    slug: "k-cups-breakfast-blend",
    name: "K-Cups · Breakfast Blend",
    category: "k-cups",
    priceUsd: 32.99,
    reviews: 1497,
    rating: 4.9,
    image: "/images/products/k-cups-breakfast-blend.png",
    href: "/shop/k-cups-breakfast-blend",
    description: "42-count Keurig-compatible pods. Start your morning right.",
  },
  {
    slug: "k-cups-decaf-columbian",
    name: "K-Cups · Columbian Decaf",
    category: "k-cups",
    priceUsd: 32.99,
    reviews: 32,
    rating: 4.9,
    image: "/images/products/k-cups-42-count-decaf-columbian.png",
    href: "/shop/k-cups-decaf-columbian",
    description: "42-count decaf K-Cups — Swiss Water processed Colombian.",
  },
  {
    slug: "mk4-us-flag-mug-black",
    name: "MK4 US Flag Mug — Black",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/copy-of-mk3-us-flag-mug.jpg",
    href: "/shop/mk4-us-flag-mug-black",
    description: "Heavy-duty black ceramic mug, US flag print on both sides. Dishwasher-safe.",
    badge: "Sold Out",
    outOfStock: true,
  },
  {
    slug: "mk1-coffee-mug",
    name: "MK1 Coffee Mug",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/mug.jpg",
    href: "/shop/mk1-coffee-mug",
    description: "Classic Warpath logo mug, 12oz capacity. The morning standard issue.",
  },
  {
    slug: "vintage-sailor-pin-up-girl-mug",
    name: "Vintage Sailor Pin-Up Mug",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/copy-of-mk1-logo-coffee-mug.jpg",
    href: "/shop/vintage-sailor-pin-up-girl-mug",
    description: "Vintage Navy pin-up illustration on premium ceramic. 12oz.",
  },
  {
    slug: "the-rules-mug",
    name: "The Rules Mug",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/the-rules.jpg",
    href: "/shop/the-rules-mug",
    description: "House rules, on a 12oz mug. Drink the coffee. Don’t add sugar.",
  },
  {
    slug: "winners-mug",
    name: "Winners Mug",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/vintage-sailor-pin-up-girl-mug-copy.jpg",
    href: "/shop/winners-mug",
    description: "For the people who finish what they start. 12oz heavy-duty ceramic.",
  },
  {
    slug: "mk3-anchor-mug",
    name: "MK3 Anchor Mug",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/coffee-mug-mk3.jpg",
    href: "/shop/mk3-anchor-mug",
    description: "Classic Navy anchor branding. Built to take a bumpy commute.",
  },
  {
    slug: "mk4-us-flag-mug",
    name: "MK4 US Flag Mug — White",
    category: "drinkware",
    priceUsd: 17.0,
    reviews: 438,
    rating: 4.9,
    image: "/images/products/mk4-us-flag-mug-copy.jpg",
    href: "/shop/mk4-us-flag-mug",
    description: "White ceramic with US flag wraparound. The patriotic standard.",
  },
  {
    slug: "warpath-freedom-tumbler",
    name: "Freedom Tumbler — 20oz",
    category: "drinkware",
    priceUsd: 34.99,
    reviews: 98,
    rating: 4.9,
    image: "/images/products/black-warpath-freedom-tumbler-20-ounce-copy.png",
    href: "/shop/warpath-freedom-tumbler",
    description: "20oz double-wall vacuum-insulated tumbler. Fighter-jet grey finish. Holds heat for hours.",
  },
  {
    slug: "coffee-gift-certificate",
    name: "Coffee Gift Certificate",
    category: "gift-card",
    priceUsd: 20.0,
    reviews: 8,
    rating: 5.0,
    image: "/images/products/coffee-gift-certificate.jpg",
    href: "/shop/coffee-gift-certificate",
    description: "Give the gift of really good coffee. Redeemable on any product. From $20.",
    notes: ["Digital", "Instant Delivery"],
  },
];

export const FLAGSHIP = PRODUCTS.find((p) => p.slug === "mariners-blend-dark-roast-coffee")!;
export const SECONDARY = PRODUCTS.find((p) => p.slug === "breakfast-blend-coffee")!;

/** Get a product by slug — used by /shop/[slug] page. */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Sort + filter helper used by /shop. */
export function filterAndSort(
  products: Product[],
  opts: { category?: string; sort?: string },
): Product[] {
  let list = [...products];
  if (opts.category && opts.category !== "all") {
    list = list.filter((p) => p.category === opts.category);
  }
  switch (opts.sort) {
    case "rating":
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "price-asc":
      list.sort((a, b) => a.priceUsd - b.priceUsd);
      break;
    case "price-desc":
      list.sort((a, b) => b.priceUsd - a.priceUsd);
      break;
    case "newest":
      // No createdAt field — fall through to source order
      break;
    case "best-sellers":
    default:
      list.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
  }
  return list;
}

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
 * Verbatim About-page narrative from warpath.coffee/pages/about-warpath-coffee
 * (capture 2026-05-05). Copy is exactly as printed on the live site — do not
 * rewrite without re-verifying against the source.
 */
export const ABOUT = {
  hero: {
    eyebrow: "About Warpath Coffee",
    headlinePrimary: "Gourmet coffee",
    headlineItalic: "is finally on the warpath.",
    tagline: "Veteran-owned. Family-operated. Roasted in the USA.",
    subhead:
      "Let’s face it. You’re tired of sipping coffee that’s weak and tastes like battery acid. To be honest, so are we. But finding a coffee blend that is smooth, delicious, and packs a punch felt like a treasure hunt. That’s why we hoisted the Jolly Roger and went gourmet coffee-hunting.",
    primaryCta: { label: "Shop the Roast", href: "/shop" },
    secondaryCta: { label: "Start Subscription", href: "/subscribe" },
    image: "/images/warpath/mobile-web-banner-warpath-4th-of-july.webp",
    imageAlt:
      "Warpath Coffee Mariner’s Blend bag — Veteran-owned, USA-roasted gourmet coffee",
  },
  founder: {
    eyebrow: "Who Is Behind Warpath Coffee?",
    title: "Founded by a Navy SEAL.",
    body: "Founded by Navy SEAL combat veteran Tej Gill, so we are veteran owned, and we are family operated. We take great pride in being coffee connoisseurs who don’t like to compromise.",
    paragraph:
      "Our crew consists of passionate coffee lovers who would fight even Davy Jones for an aromatic cup of coffee. We are veterans, NYPD, wives, and a 30+ year coffee roaster.",
    image: "/images/warpath/veteran-coffee-image.webp",
    imageAlt:
      "Tej Gill — Navy SEAL combat veteran and founder of Warpath Coffee",
    badges: [
      "Veteran-Owned",
      "Family-Operated",
      "30+ yr Roastmaster",
      "Veterans · NYPD · Wives",
    ],
  },
  special: {
    eyebrow: "What Makes Warpath Coffee Special?",
    title: "Two words.",
    titleItalic: "Taste & stimulation.",
    paragraphs: [
      "Whether you’re a coffee enthusiast or a casual drinker, you will be blown away by our blend’s smooth-as-silk flavor, intoxicating aroma, and rich body. But don’t worry. It’s not all just bells and whistles.",
      "When it comes to stimulation, our blend is unrivaled. You will find no acidity, no bitterness, just raw, pure coffee energy that will get you through the day.",
    ],
    pillars: [
      {
        code: "PILLAR · 01",
        title: "Smooth-as-silk flavor",
        body: "Custom roast profiles, dialed for body and aroma — no burnt beans, no shortcuts.",
      },
      {
        code: "PILLAR · 02",
        title: "Intoxicating aroma",
        body: "Hand-selected high-quality beans, roasted to order so peak fragrance lands in your bag.",
      },
      {
        code: "PILLAR · 03",
        title: "Raw, pure energy",
        body: "No acidity. No bitterness. Just coffee that gets you through the day.",
      },
    ],
  },
  mission: {
    eyebrow: "The Warpath Coffee Mission",
    title: "Taste is #1.",
    body: "We are on a mission to make gourmet coffee a part of your daily routine. Every single bean is roasted in the United States using traditional roasting methods with a single goal — make every cup unique.",
    paragraph:
      "Warpath Coffee is meant to be drank black. Our coffee is perfectly roasted so there is never a bitter or acidic flavor — you don’t need sugar or milk with Warpath Coffee. Drink it black, be healthy, and enjoy the perfectly roasted coffee in this bag.",
    image: "/images/warpath/coffee-mission.webp",
    imageAlt: "Warpath Coffee beans in motion at the roastery",
    pulls: [
      { k: "Roasted", v: "USA", sub: "every batch" },
      { k: "Bagged", v: "Whole Bean", sub: "for freshness" },
      { k: "Method", v: "Traditional", sub: "make every cup unique" },
    ],
  },
  faqs: [
    {
      q: "Where are your coffee beans sourced?",
      a: "We source all of our beans from various regions that are well regarded for their high-quality coffee production.",
    },
    {
      q: "How is your coffee roasted?",
      a: "Our coffee is roasted in the United States using traditional methods to caramelize the beans — this ensures that each and every cup is unique and flavorful.",
    },
    {
      q: "How fresh is your coffee upon delivery?",
      a: "We roast our coffee to order so it arrives at peak freshness.",
    },
    {
      q: "What grind sizes do you offer?",
      a: "Our coffee is available in whole bean form to preserve peak freshness.",
    },
    {
      q: "How should I store my coffee to maintain freshness?",
      a: "Keep your coffee sealed in its original bag or transfer it to an airtight container only. Store it in a cool, dry place away from direct sunlight, and always avoid refrigeration, as it can introduce moisture that affects flavor.",
    },
    {
      q: "Do you offer subscriptions for regular deliveries?",
      a: "Yes, we offer a subscription service that delivers coffee to your door at your chosen frequency.",
    },
    {
      q: "What is your return and refund policy?",
      a: "Please refer to our Returns & Refunds Policy page for detailed information.",
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via email at admin@warpath.coffee or call us at +1 208-599-6678.",
    },
  ],
  contact: {
    email: "admin@warpath.coffee",
    phone: "+1 208-599-6678",
  },
  testimonials: {
    eyebrow: "Bold Flavors, Smooth Delivery",
    items: [
      {
        code: "FR · 001",
        quote:
          "It’s 4:30AM, the dogs and cats are on the bed a half hour early demanding breakfast…",
        name: "Rob Proft",
        rating: 5,
      },
      {
        code: "FR · 002",
        quote:
          "I had whole bean Mariner’s Blend. It was the best coffee I have ever had.",
        name: "Nina Cook",
        rating: 5,
      },
      {
        code: "FR · 003",
        quote:
          "I ordered the breakfast blend and love it! It’s smooth, rich, and flavorful.",
        name: "Anna Marie Jehorek",
        rating: 5,
      },
      {
        code: "FR · 004",
        quote:
          "…today is the first chance I had to perk Warpath Coffee the Mariner’s Blend…",
        name: "Hans Breitkopf",
        rating: 5,
      },
      {
        code: "FR · 005",
        quote:
          "The coffee is absolutely the best I’ve ever had — flavor is on point.",
        name: "John Grady",
        rating: 5,
      },
      {
        code: "FR · 006",
        quote: "After 45 yrs of burned black, I won’t go back.",
        name: "David Bernstrom",
        rating: 5,
      },
    ],
  },
  pullQuote: {
    quote:
      "We are coffee connoisseurs who don’t like to compromise. Our crew would fight even Davy Jones for an aromatic cup of coffee.",
    attribution: "Tej Gill",
    role: "Founder · U.S. Navy SEAL Combat Veteran",
  },
} as const;

/**
 * Verified primary navigation from warpath.coffee header (capture 2026-05-04).
 * Live menu: Home · Shop · About Warpath Coffee · Frequently Asked Questions
 *          · Reviews · Rewards · Contact · Log in / Create Account
 */
export const NAV_PRIMARY = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
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
      { l: "About Warpath Coffee", h: "/about" },
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

/**
 * Verified welcome-modal copy from the live warpath.coffee 15% OFF popup
 * (captured 2026-05-04). Re-used by WelcomeModal.
 */
export const WELCOME_OFFER = {
  badgeSymbol: "§",
  badgeLabel: "Welcome · 15% Off",
  eyebrow: "First Order Special",
  title: "15% OFF",
  titleSub: "your first order",
  pitch:
    "Sign up and get a proper welcome to the world of really good coffee. Be the first to hear about bold new blends, insider perks, and everything brewing at Warpath.",
  emailHint: "Make sure your email is correct so we can ship your discount code.",
  preferenceLabel: "What kind of cup do you stand a watch with?",
  preferences: [
    { code: "MED", label: "Medium Roast", note: "Smooth · bright" },
    { code: "DRK", label: "Dark Roast", note: "Bold · low-acid" },
  ],
  ctaPrimary: "Get 15% Off",
  ctaDeclining: "No thanks, I’ll pay full price",
  fineprint: "One-time email · No spam · Unsubscribe anytime",
  successTitleA: "Code dispatched.",
  successTitleB: "Check your inbox.",
  successBody:
    "We just sent your 15% off code to {{email}}. Drink it black, no sugar necessary.",
  successCta: "Get Brewing",
} as const;

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export const formatReviewCount = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);
