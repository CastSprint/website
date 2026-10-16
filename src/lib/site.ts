import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://castsprint.app";
export const githubUrl = "https://github.com/CastSprint/CastSprint";
export const navigation = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const;

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${siteUrl}${path}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", siteName: "CastSprint", locale: "en_US" }, twitter: { card: "summary_large_image", title, description } };
}

export const downloadPlatforms = [
  { slug: "macos", name: "macOS", format: "DMG", architecture: "Universal / see release", requirements: "Check release notes", pattern: /macOS\.dmg$/i, note: "The desktop receiver for Mac. A non-notarized build may require approval in Privacy & Security after its checksum is verified." },
  { slug: "windows", name: "Windows", format: "x64 ZIP", architecture: "x64", requirements: "64-bit Windows", pattern: /Windows.*\.zip$/i, note: "A portable ZIP release for 64-bit Windows. Extract the archive before launching the application." },
  { slug: "linux", name: "Linux", format: "TAR.GZ", architecture: "x86_64", requirements: "64-bit Linux", pattern: /Linux.*\.tar\.gz$/i, note: "A compressed x86_64 desktop build. Distribution-specific dependencies and permissions may apply." },
  { slug: "android", name: "Android", format: "Debug APK", architecture: "APK", requirements: "Sideloading required", pattern: /\.apk$/i, note: "The current Android asset is explicitly a debug APK. Review the release and checksum before sideloading." },
] as const;

export const docPages = [
  { slug: "iphone-usb", title: "iPhone USB mirroring", summary: "Understand the planned wired iPhone workflow and current support status.", group: "Connect" },
  { slug: "android-usb", title: "Android USB mirroring", summary: "Prepare Android developer settings and a reliable USB connection.", group: "Connect" },
  { slug: "wifi-mirroring", title: "Wireless mirroring", summary: "Learn the network requirements for Wi-Fi discovery and streaming.", group: "Connect" },
  { slug: "obs-setup", title: "OBS Studio setup", summary: "Add a mirrored phone to a scene and keep the source framed correctly.", group: "Create" },
  { slug: "troubleshooting", title: "Troubleshooting", summary: "A practical checklist for connections, audio, rotation, and permissions.", group: "Support" },
] as const;

export const blogPosts = [
  { slug: "mirror-iphone-to-mac", title: "How to mirror an iPhone screen to a Mac", excerpt: "A clear look at wired and wireless workflows, what each requires, and how to choose.", date: "2026-09-18", read: "6 min", tag: "iPhone" },
  { slug: "stream-mobile-games-obs", title: "How to stream mobile games with OBS", excerpt: "Build a clean creator workflow from phone capture to scenes, audio, and recording.", date: "2026-09-04", read: "8 min", tag: "OBS" },
  { slug: "usb-vs-wifi-mirroring", title: "USB vs Wi-Fi screen mirroring", excerpt: "Compare convenience, stability, setup, and the variables that affect responsiveness.", date: "2026-08-21", read: "5 min", tag: "Guide" },
] as const;
