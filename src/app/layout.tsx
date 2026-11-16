import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./brand.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CastSprint — High-Performance Mobile Screen Mirroring for Creators & Gamers",
    template: "%s — CastSprint",
  },
  description:
    "Mirror mobile gameplay to desktop with sub-15ms latency, zero watermarks, 48kHz audio sync, and native OBS Studio integration. 100% free and open-source, engineered in pure Rust by TA Shanto.",
  applicationName: "CastSprint",
  category: "technology",
  authors: [{ name: "TA Shanto", url: "https://tashanto.com" }],
  creator: "TA Shanto",
  publisher: "TA Shanto",
  keywords: [
    "mobile screen mirroring",
    "phone screen to computer",
    "OBS mobile gaming",
    "USB screen mirroring",
    "open source screen mirroring",
    "DouWan alternative",
    "PUBG Mobile screen mirror",
    "BGMI screen mirror to PC",
    "Free Fire PC streaming",
    "zero watermark screen mirror",
    "sub 15ms screen mirror",
    "Rust screen mirroring",
    "TA Shanto",
    "CastSprint",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "CastSprint",
    title: "CastSprint — High-Performance Mobile Screen Mirroring for Creators & Gamers",
    description:
      "Mirror mobile gameplay to desktop with sub-15ms latency, zero watermarks, 48kHz audio sync, and native OBS Studio pipeline. Engineered in pure Rust by TA Shanto.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CastSprint — Mobile Screen Mirroring for Creators & Gamers",
    description:
      "Sub-15ms latency, zero watermarks, 48kHz audio sync, and OBS integration. 100% free & open-source, engineered by TA Shanto.",
    creator: "@iamtashanto",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
