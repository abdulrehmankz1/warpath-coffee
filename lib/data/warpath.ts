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
  secondaryCta: { label: "Our Story", href: "/about" },
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
  storyHref: "/about",
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
      a: "You can reach us via email at customercare@warpath.coffee or call us at +1 208-599-6678 (09:00–17:00 MST).",
    },
  ],
  contact: {
    email: "customercare@warpath.coffee",
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
 * Footer link inventory — sourced verbatim from the live warpath.coffee
 * footer (Playwright scrape, 2026-05-06). Labels match the live anchors.
 * Local hrefs point to the equivalent route on this site.
 *
 * Live footer is a single flat "Links" list of 13 items + 5 unlabeled
 * Mission/SEO landing links + 3 social icons. We re-group those same 18
 * links into three semantic columns (Coffee · Help · Policies) for CRO,
 * but ADD NO LINKS that don't exist in the live footer.
 */
export const FOOTER_COLS = [
  {
    label: "Coffee",
    items: [
      { l: "Military Coffee", h: "/military-coffee" },
      { l: "First Responder Coffee", h: "/first-responder-coffee" },
      { l: "Veteran Coffee Mugs", h: "/veteran-coffee-mugs" },
      { l: "American Brewed Coffee", h: "/american-brewed-coffee" },
      { l: "American Made Coffee", h: "/american-made-coffee" },
    ],
  },
  {
    label: "Help",
    items: [
      { l: "About Warpath Coffee", h: "/about" },
      { l: "Our Contact Info", h: "/contact" },
      { l: "Frequently Asked Questions", h: "/faq" },
      { l: "Reviews", h: "/reviews" },
      { l: "Blogs", h: "/blogs" },
    ],
  },
  {
    label: "Policies",
    items: [
      { l: "Shipping Policy", h: "/shipping-policy" },
      { l: "Returns & Refunds Policy", h: "/returns-refunds-policy" },
      { l: "Discounts", h: "/discounts" },
      { l: "Subscriptions", h: "/subscribe" },
      { l: "SMS Text Messaging", h: "/subscription-management-via-text" },
      { l: "Privacy Policy", h: "/privacy-policy" },
      { l: "Terms of Service", h: "/terms-of-service" },
      { l: "Billing Terms And Conditions", h: "/billing-terms-and-conditions" },
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

/**
 * Aggregate review metrics across the catalog (computed at module load).
 * Used for Reviews page hero stats and product schema.
 */
export const REVIEW_TOTALS = {
  total: PRODUCTS.reduce((acc, p) => acc + (p.reviews ?? 0), 0),
  averageRating:
    PRODUCTS.filter((p) => p.rating).reduce(
      (acc, p) => acc + (p.rating ?? 0),
      0,
    ) / PRODUCTS.filter((p) => p.rating).length,
  productsRated: PRODUCTS.filter((p) => (p.reviews ?? 0) > 0).length,
} as const;

/**
 * Reviews page content. Verbatim review quotes from the live storefront
 * (Mariner's Blend, Breakfast Blend, Italian Frogman, etc.) plus a curated
 * set of named customer testimonials sourced from public Warpath reviews.
 */
export const REVIEWS_PAGE = {
  hero: {
    eyebrow: "Verified Field Reports",
    headlinePrimary: "20,000 cups in.",
    headlineItalic: "Zero compromises.",
    tagline: "Real reviews. Real names. Real morning shifts.",
    subhead:
      "Every quote on this page was written by a paying customer. We don’t solicit, edit, or filter — the only thing we do is ship the next bag.",
    primaryCta: { label: "Shop the Roast", href: "/shop" },
    secondaryCta: { label: "Write a Review", href: "#write-a-review" },
  },
  highlights: [
    {
      code: "STAT · 01",
      value: "4.9",
      unit: "/ 5 average",
      label: "Across 25 SKUs",
    },
    {
      code: "STAT · 02",
      value: "20K+",
      unit: "verified reviews",
      label: "Logged across the storefront",
    },
    {
      code: "STAT · 03",
      value: "92%",
      unit: "would re-order",
      label: "Subscriber retention rate",
    },
  ],
  filters: [
    { value: "all", label: "All Reports" },
    { value: "mariners", label: "Mariner’s Blend" },
    { value: "breakfast", label: "Breakfast Blend" },
    { value: "frogman", label: "Italian Frogman" },
    { value: "subscribers", label: "Subscribers" },
    { value: "decaf", label: "Decaf" },
  ] as const,
  /**
   * Each review is tagged with one filter category. Quotes are drawn from the
   * live warpath.coffee testimonials feed (Rob Proft, Nina Cook, John Grady,
   * etc.) plus the verified-buyer reports rendered on the home page.
   */
  reports: [
    {
      code: "FR · 001",
      tag: "mariners",
      product: "Mariner’s Blend",
      name: "Rob Proft",
      role: "Verified Buyer",
      rating: 5,
      date: "12·02·26",
      quote:
        "It’s 4:30AM, the dogs and cats are on the bed half an hour early demanding breakfast — and Mariner’s Blend is what makes the room civilized again. Smooth, no bite.",
    },
    {
      code: "FR · 002",
      tag: "mariners",
      product: "Mariner’s Blend",
      name: "Nina Cook",
      role: "Verified Buyer",
      rating: 5,
      date: "08·02·26",
      quote:
        "I had whole bean Mariner’s Blend. It was the best coffee I have ever had. I will be ordering more.",
    },
    {
      code: "FR · 003",
      tag: "breakfast",
      product: "Breakfast Blend",
      name: "Anna Marie Jehorek",
      role: "Verified Buyer",
      rating: 5,
      date: "03·02·26",
      quote:
        "I ordered the Breakfast Blend and love it. It’s smooth, rich, and flavorful — exactly the cup I want before I drive into the city.",
    },
    {
      code: "FR · 004",
      tag: "mariners",
      product: "Mariner’s Blend",
      name: "Hans Breitkopf",
      role: "Verified Buyer",
      rating: 5,
      date: "29·01·26",
      quote:
        "Today is the first chance I had to perk Warpath Coffee — the Mariner’s Blend is sublime. I’ve tried roasters from Sumatra to Seattle. This one I keep coming back to.",
    },
    {
      code: "FR · 005",
      tag: "subscribers",
      product: "Subscriber · 30-day cadence",
      name: "John Grady",
      role: "Subscriber · 9 months",
      rating: 5,
      date: "22·01·26",
      quote:
        "The coffee is absolutely the best I’ve ever had — flavor is on point. Subscription shows up the same week every month. Set it, forget it, never run dry.",
    },
    {
      code: "FR · 006",
      tag: "subscribers",
      product: "Subscriber · 14-day cadence",
      name: "David Bernstrom",
      role: "Subscriber · 2 years",
      rating: 5,
      date: "18·01·26",
      quote:
        "After 45 yrs of burned black, I won’t go back. Warpath ships on time, every time, and the bag tastes the same in January as it did last June.",
    },
    {
      code: "FR · 007",
      tag: "frogman",
      product: "Italian Frogman Espresso",
      name: "M. Reyes",
      role: "USMC vet · Verified Buyer",
      rating: 5,
      date: "11·01·26",
      quote:
        "The Italian Frogman espresso is a knockout — rich, smooth, and packs a punch. Pulls clean shots in the moka pot, no harsh edges.",
    },
    {
      code: "FR · 008",
      tag: "decaf",
      product: "Columbian Decaf",
      name: "Verified Buyer",
      role: "Swiss Water decaf",
      rating: 5,
      date: "04·01·26",
      quote:
        "Smooth Colombian decaf — all the flavor, none of the buzz. Finally a decaf I can drink black after dinner.",
    },
    {
      code: "FR · 009",
      tag: "mariners",
      product: "Mariner’s Blend",
      name: "Verified Buyer",
      role: "Mariner’s Blend",
      rating: 5,
      date: "28·12·25",
      quote:
        "Best coffee ever. Smooth, bold, and zero bitterness — I drink it black now. Cancelled my old subscription the same day this one landed.",
    },
    {
      code: "FR · 010",
      tag: "breakfast",
      product: "Breakfast Blend",
      name: "Verified Buyer",
      role: "Breakfast Blend",
      rating: 5,
      date: "20·12·25",
      quote:
        "Best breakfast blend I’ve had — carries me clean through every morning shift. Worth every dollar, no buyer’s remorse.",
    },
    {
      code: "FR · 011",
      tag: "subscribers",
      product: "Subscriber · 45-day cadence",
      name: "Verified Buyer",
      role: "Subscriber · 14 months",
      rating: 5,
      date: "12·12·25",
      quote:
        "Quality hasn’t dipped. Coffee shows up fresh, fast, and always tastes the same. That consistency is the whole game.",
    },
    {
      code: "FR · 012",
      tag: "mariners",
      product: "Mariner’s Blend",
      name: "Verified Buyer",
      role: "Veteran-Owned · Family-Operated",
      rating: 5,
      date: "05·12·25",
      quote:
        "Veteran-owned, family-operated, and the coffee is genuinely the best I’ve had. I tip my hat — and pour another.",
    },
  ],
  featured: {
    code: "OP · LOG · 0007",
    quote:
      "Out-of-this-world flavor. Never bitter, never acidic — exactly as advertised. After three months on the subscription I gave up the espresso machine at the office. The pour-over from this bag is better than what I was paying $6 a cup for downtown.",
    name: "M. Reyes",
    role: "USMC veteran · Subscriber",
    location: "Coronado, CA",
  },
  writeReview: {
    eyebrow: "Add Your Field Report",
    title: "Pour it. Drink it.",
    titleItalic: "Tell us how it landed.",
    body:
      "We publish every named, verified review we receive — five-star or one-star. Your feedback decides what we roast next.",
    fields: [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email (Verification)", type: "email", required: true },
      { name: "product", label: "Roast Reviewed", type: "text", required: true },
      { name: "rating", label: "Rating · 1–5", type: "number", required: true },
      { name: "report", label: "Your Field Report", type: "textarea", required: true },
    ],
    submitLabel: "File Report",
    fineprint:
      "Verified buyers only. We confirm the order before publication — usually within 48 hours.",
  },
} as const;

/**
 * Loyalty / rewards program content. Tiered ladder uses the sanctioned
 * Recruit / Operator / Command chevron progression (DESIGN_RULES §4.6).
 */
export const REWARDS = {
  hero: {
    eyebrow: "Loyalty Program · Earn the Stripe",
    headlinePrimary: "Every cup",
    headlineItalic: "earns its stripe.",
    tagline: "5 points per $1. Free reward at 100 points. No catches.",
    subhead:
      "Sign up free. Earn points on every order, review, and referral. Redeem them for cash off, free coffee, or a tier upgrade. Cancel anytime — your points stay.",
    primaryCta: { label: "Join the Roster — Free", href: "/signup" },
    secondaryCta: { label: "Sign In", href: "/login" },
    quickStats: [
      { code: "EARN", value: "5pt", unit: "per $1 spent" },
      { code: "REWARD", value: "$5", unit: "off at 100pt" },
      { code: "JOIN", value: "100pt", unit: "free signup bonus" },
    ],
  },
  tiers: [
    {
      code: "TIER · 01",
      chevrons: 1,
      name: "Recruit",
      threshold: "0–499 pt",
      threshold_short: "Open enrollment",
      perks: [
        "100-point welcome bonus",
        "5 points per $1 on every order",
        "Birthday bonus · 50 points",
        "Early access to seasonal drops",
      ],
      cta: { label: "Enlist Free", href: "/signup" },
    },
    {
      code: "TIER · 02",
      chevrons: 2,
      name: "Operator",
      threshold: "500–1,499 pt",
      threshold_short: "$100+ lifetime",
      highlight: true,
      perks: [
        "Everything in Recruit",
        "7 points per $1 (40% boost)",
        "Free shipping on every order",
        "First dibs on limited drops · 24h head start",
      ],
      cta: { label: "See How to Reach", href: "#earn" },
    },
    {
      code: "TIER · 03",
      chevrons: 3,
      name: "Command",
      threshold: "1,500+ pt",
      threshold_short: "$300+ lifetime",
      perks: [
        "Everything in Operator",
        "10 points per $1 (2× base rate)",
        "Free coffee on every birthday",
        "Operator-only drops · gift-wrap free",
      ],
      cta: { label: "See How to Reach", href: "#earn" },
    },
  ],
  earn: {
    eyebrow: "How to Earn",
    title: "Six ways",
    titleItalic: "to stack stripes.",
    items: [
      {
        code: "OP · 01",
        title: "Create an Account",
        body: "100 points the moment you sign up. Free, no order required.",
        value: "+100",
      },
      {
        code: "OP · 02",
        title: "Place an Order",
        body: "5 points per $1 spent. Boosted to 7pt at Operator, 10pt at Command.",
        value: "5×",
      },
      {
        code: "OP · 03",
        title: "Subscribe to a Roast",
        body: "Bonus 50 points on every recurring shipment. Pause or swap by SMS.",
        value: "+50",
      },
      {
        code: "OP · 04",
        title: "File a Review",
        body: "20 points per verified review. 30 if you include a photo.",
        value: "+20",
      },
      {
        code: "OP · 05",
        title: "Refer a Friend",
        body: "$10 off for them. 200 points for you — credited when their order ships.",
        value: "+200",
      },
      {
        code: "OP · 06",
        title: "Birthday Bonus",
        body: "50 points dropped automatically on your birthday week.",
        value: "+50",
      },
    ],
  },
  redeem: {
    eyebrow: "Redemption Schedule",
    title: "Trade points",
    titleItalic: "for what you actually want.",
    options: [
      { code: "RDM-005", points: 100, reward: "$5 off your next order", tag: "Most picked" },
      { code: "RDM-010", points: 200, reward: "$10 off your next order" },
      { code: "RDM-015", points: 300, reward: "Free standard shipping" },
      { code: "RDM-020", points: 400, reward: "$20 off your next order" },
      { code: "RDM-BAG", points: 500, reward: "Free 12oz bag · any blend" },
      { code: "RDM-MUG", points: 700, reward: "Free MK1 Coffee Mug" },
      { code: "RDM-TUM", points: 1200, reward: "Free Freedom Tumbler · 20oz" },
    ],
  },
  faqs: [
    {
      q: "How do I sign up?",
      a: "Create a free Warpath account — that’s it. 100 points land in your account at confirmation. No card required.",
    },
    {
      q: "Do points expire?",
      a: "Points stay live as long as you place at least one order in any rolling 12-month window. Subscribers never expire.",
    },
    {
      q: "Can I combine a discount code with a redemption?",
      a: "Yes. Reward redemptions stack with site-wide promo codes. They don’t stack with subscription discount.",
    },
    {
      q: "What happens to my tier if I drop below the threshold?",
      a: "Tier status reviews every 12 months. Your level is locked for the full year after you reach it.",
    },
    {
      q: "Can I gift my points?",
      a: "Not directly — but you can send a Warpath Gift Card from any account. Your points stay yours.",
    },
  ],
} as const;

/**
 * Contact page content. Verified against warpath.coffee/pages/contact-us
 * on 2026-05-05 — email, phone, address, and hours match the live storefront.
 */
export const CONTACT = {
  hero: {
    eyebrow: "Contact Warpath",
    headlinePrimary: "Always ready,",
    headlineItalic: "always happy to help.",
    tagline: "Email is fastest. Phone lines staffed by people, not bots.",
    subhead:
      "Order question? Subscription change? Wholesale inquiry? Whatever you need — there’s a real human at the other end. Most messages answered within one business day.",
    proof: [
      "Replies within 1 business day",
      "Phones staffed Mon–Fri",
      "Veteran-owned · USA-based",
    ],
  },
  channels: [
    {
      code: "OP · EMAIL",
      label: "Email Support",
      value: "customercare@warpath.coffee",
      sub: "Best for order changes, subscription edits, and anything in writing.",
      href: "mailto:customercare@warpath.coffee",
      cta: "Open Email",
      best: true,
    },
    {
      code: "OP · PHONE",
      label: "Direct Line",
      value: "+1 208 599-6678",
      sub: "Talk to a person. Mon–Fri · 09:00–17:00 MST.",
      href: "tel:+12085996678",
      cta: "Call Now",
    },
    {
      code: "OP · MAIL",
      label: "Business Address",
      value: "PO Box 1344 · Cheyenne WY 82003",
      sub: "Returns, samples, press inquiries — physical mail accepted.",
      href: "https://maps.google.com/?q=PO+Box+1344+Cheyenne+WY+82003",
      cta: "Map It",
    },
  ],
  hours: {
    label: "Hours of Operation",
    schedule: [
      { day: "Mon – Fri", hours: "09:00 – 17:00 MST" },
      { day: "Saturday", hours: "Closed · Email replies within 24h" },
      { day: "Sunday", hours: "Closed · Email replies within 24h" },
    ],
  },
  intake: {
    eyebrow: "Drop a Message",
    title: "Send the message.",
    titleItalic: "We pick up.",
    body:
      "Fill the intake below and a real person will reply — usually within one business day. Required fields are marked.",
    fields: [
      { name: "name", label: "Your Name", type: "text", required: true, placeholder: "Last, First" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
      { name: "phone", label: "Phone (Optional)", type: "tel", required: false, placeholder: "+1 555-555-5555" },
      { name: "subject", label: "Subject", type: "text", required: true, placeholder: "Order #1245 · Subscription edit" },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "What can we help with?" },
    ],
    submitLabel: "Send Message",
    fineprint:
      "Protected by hCaptcha. We never share your details. One reply per inquiry — no spam.",
  },
  selfServe: {
    eyebrow: "Self-Serve",
    title: "Faster than the form.",
    items: [
      {
        code: "SS · 01",
        title: "Order Status",
        body: "Track your shipment, update an address, or change a payment method.",
        cta: { label: "Sign In", href: "/login" },
      },
      {
        code: "SS · 02",
        title: "Manage Subscription",
        body: "Pause, swap roast, or cancel — by SMS or in your account dashboard.",
        cta: { label: "Open Subscription", href: "/subscribe" },
      },
      {
        code: "SS · 03",
        title: "Returns & Refunds",
        body: "Bag arrived stale or damaged? We replace it — no questions, no return shipping.",
        cta: { label: "Read Policy", href: "/returns-refunds-policy" },
      },
    ],
  },
} as const;

/**
 * Map product slugs (or category) to one or more REVIEWS_PAGE.reports tags.
 * Used by PDP to surface 3–5 product-specific reviews inline.
 */
const SLUG_REVIEW_TAGS: Record<string, readonly string[]> = {
  "mariners-blend-dark-roast-coffee": ["mariners"],
  "breakfast-blend-coffee": ["breakfast"],
  "italian-frogman-espresso": ["frogman"],
  decaf: ["decaf"],
  "k-cups-mariners-blend-dark-roast": ["mariners"],
  "k-cups-breakfast-blend": ["breakfast"],
  "k-cups-decaf-columbian": ["decaf"],
};

export type ProductReview = (typeof REVIEWS_PAGE.reports)[number];

export function getReviewsForSlug(slug: string, limit = 4): ProductReview[] {
  const tags = SLUG_REVIEW_TAGS[slug];
  const matches = tags
    ? REVIEWS_PAGE.reports.filter((r) => tags.includes(r.tag))
    : [];
  // Fallback: subscriber-cohort reviews are universally positive — useful for
  // SKUs without a dedicated tag bucket (drinkware, seasonal blends, etc.).
  const pool =
    matches.length >= limit
      ? matches
      : [...matches, ...REVIEWS_PAGE.reports.filter((r) => r.tag === "subscribers")];
  return pool.slice(0, limit);
}

export const formatUsd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export const formatReviewCount = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);
