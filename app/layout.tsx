import type { Metadata, Viewport } from "next";
import {
  Big_Shoulders,
  Big_Shoulders_Stencil,
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { WelcomeModal } from "@/components/warpath/WelcomeModal";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const bigShouldersStencil = Big_Shoulders_Stencil({
  variable: "--font-big-shoulders-stencil",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic", "normal"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0E0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://warpath.coffee"),
  title: {
    default: "Warpath Coffee · Drink it black, no sugar necessary.",
    template: "%s · Warpath Coffee",
  },
  description:
    "Veteran-owned coffee. Custom dark roast — chocolate, almond, clean finish. Smooth, low-acid, no compromise. Founded by Navy SEAL combat veteran Tej Gill.",
  keywords: [
    "warpath coffee",
    "veteran owned coffee",
    "low acid coffee",
    "smooth dark roast",
    "navy seal coffee",
    "mariner's blend",
  ],
  openGraph: {
    type: "website",
    siteName: "Warpath Coffee",
    title: "Warpath Coffee · Drink it black, no sugar necessary.",
    description:
      "Veteran-owned. Custom dark roast — smooth, low-acid, no compromise.",
    images: [{ url: "/logo.avif", width: 1200, height: 630, alt: "Warpath Coffee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warpath Coffee",
    description: "Drink it black. No sugar necessary.",
    images: ["/logo.avif"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${bigShouldersStencil.variable} ${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bone-100 text-ash-800 font-body">
        {children}
        <WelcomeModal />
      </body>
    </html>
  );
}
