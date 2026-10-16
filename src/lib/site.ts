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
  {
    slug: "iphone-usb",
    title: "iPhone USB Screen Mirroring",
    summary: "Zero-app wired capture on macOS with sub-15ms Metal rendering, and USB Hotspot mode on Windows with WASAPI audio.",
    group: "Wired Connections",
    badge: "Zero-App · <15ms",
    readTime: "6 min",
  },
  {
    slug: "android-usb",
    title: "Android USB Gaming & ADB",
    summary: "High-speed USB streaming with reverse port tunneling, 48kHz internal game audio via AudioPlaybackCapture, and locked 60 FPS.",
    group: "Wired Connections",
    badge: "ADB Reverse · 60 FPS",
    readTime: "6 min",
  },
  {
    slug: "wifi-mirroring",
    title: "Local Wi-Fi & AirPlay Mirroring",
    summary: "Cable-free streaming over 5GHz Wi-Fi with mDNS discovery, SHA-256 certificate pinning, 6-digit session PINs, and native AirPlay.",
    group: "Wireless Streaming",
    badge: "TLS 1.3 · mDNS Discovery",
    readTime: "5 min",
  },
  {
    slug: "obs-setup",
    title: "OBS Studio Livestreaming Setup",
    summary: "Complete guide to zero-copy Window Capture (WGC / ScreenCaptureKit), isolated Application Audio Capture, and aspect ratio framing.",
    group: "Streaming & Production",
    badge: "OBS 28+ · Zero-Copy WGC",
    readTime: "7 min",
  },
  {
    slug: "installation",
    title: "Installation & Platform Setup",
    summary: "Installation guide and security verification for macOS DMG, Windows portable x64, Linux PipeWire receiver, and Android companion APK.",
    group: "Getting Started",
    badge: "macOS · Win · Linux · Android",
    readTime: "5 min",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting & Diagnostics",
    summary: "Step-by-step diagnostic checklist for black screen DRM, ADB authorization, Wi-Fi discovery, audio desync, and firewall issues.",
    group: "Diagnostics & Support",
    badge: "Diagnostics Matrix",
    readTime: "8 min",
  },
  {
    slug: "architecture",
    title: "Architecture & Latency Benchmarks",
    summary: "Deep-dive into Protocol V1 framing, hardware AV synchronization, zero-copy Metal/D3D11 rendering, and verified latency benchmarks.",
    group: "Architecture & Deep-Dive",
    badge: "Protocol V1 · Benchmarks",
    readTime: "6 min",
  },
] as const;

export const blogPosts = [
  { slug: "mirror-iphone-to-mac", title: "How to mirror an iPhone screen to a Mac", excerpt: "A clear look at wired and wireless workflows, what each requires, and how to choose.", date: "2026-09-18", read: "6 min", tag: "iPhone" },
  { slug: "stream-mobile-games-obs", title: "How to stream mobile games with OBS", excerpt: "Build a clean creator workflow from phone capture to scenes, audio, and recording.", date: "2026-09-04", read: "8 min", tag: "OBS" },
  { slug: "usb-vs-wifi-mirroring", title: "USB vs Wi-Fi screen mirroring", excerpt: "Compare convenience, stability, setup, and the variables that affect responsiveness.", date: "2026-08-21", read: "5 min", tag: "Guide" },
] as const;
