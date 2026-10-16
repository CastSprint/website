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

export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:"CastSprint — Mobile screen mirroring for creators",template:"%s — CastSprint"},description:"Mirror your mobile screen to your desktop for gaming, recording, and OBS workflows. Follow CastSprint's open-source development.",applicationName:"CastSprint",keywords:["mobile screen mirroring","phone screen to computer","OBS mobile gaming","USB screen mirroring"]};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><ThemeProvider><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="flex-1">{children}</main><Footer/></ThemeProvider></body>
    </html>
  );
}
