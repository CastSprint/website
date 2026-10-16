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

export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:"CastSprint — Mobile screen mirroring for creators",template:"%s — CastSprint"},description:"Mirror mobile gameplay to your desktop for recording and OBS workflows with CastSprint, a free and open-source project.",applicationName:"CastSprint",category:"technology",keywords:["mobile screen mirroring","phone screen to computer","OBS mobile gaming","USB screen mirroring","open source screen mirroring"],alternates:{canonical:siteUrl},openGraph:{type:"website",url:siteUrl,siteName:"CastSprint",title:"CastSprint — Mobile screen mirroring for creators",description:"A free, open-source mobile screen mirroring project for gaming, recording, and creator workflows."},twitter:{card:"summary_large_image",title:"CastSprint — Mobile screen mirroring for creators",description:"A free, open-source mobile screen mirroring project for gaming, recording, and creator workflows."},robots:{index:true,follow:true},icons:{icon:"/favicon.ico",apple:"/apple-icon.png"}};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><ThemeProvider><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main" className="flex-1">{children}</main><Footer/></ThemeProvider></body>
    </html>
  );
}
