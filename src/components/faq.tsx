"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const items = [
  [
    "Is CastSprint really 100% free with no watermarks?",
    "Yes. CastSprint is 100% free and open-source forever. Unlike DouWan which kicks you out after 2 minutes or forces a yearly VIP subscription, CastSprint has zero time caps, zero watermarks, and zero paywalls.",
  ],
  [
    "Why does CastSprint have lower latency than DouWan or Scrcpy?",
    "CastSprint is engineered in pure native Rust with direct bindings to low-level OS media frameworks (WASAPI loopback on Windows, ScreenCaptureKit and Metal on macOS, and PipeWire on Linux). By eliminating garbage collection pauses and virtual soundcard transcoding, CastSprint delivers deterministic sub-15ms glass-to-glass latency.",
  ],
  [
    "How does internal audio routing work for mobile gaming?",
    "On Android, CastSprint taps into the high-performance AudioPlaybackCapture API via ADB to stream pristine 48kHz stereo internal game audio. On macOS and Windows, audio is forwarded directly into your default desktop audio sink without requiring complex third-party virtual audio cables.",
  ],
  [
    "How do I set up CastSprint in OBS Studio for live streaming?",
    "In OBS Studio 28+, add a 'Window Capture' source selecting CastSprint and set the capture method to 'Windows Graphics Capture (WGC)' on Windows or 'ScreenCaptureKit' on macOS for zero-copy GPU capture. You can also use CastSprint's raw stdout pipe for lossless direct feed ingestion.",
  ],
  [
    "What is Thermal Cooling Mode and how do I use it?",
    "When playing intensive titles like PUBG Mobile, BGMI, or COD Mobile, phones can heat up and thermal-throttle. Pressing hotkey 'C' or alt-tabbing away from the preview window automatically drops the render loop to 15 FPS while keeping the internal audio pipe intact, allowing your mobile device to cool down quickly.",
  ],
  [
    "Can I mirror over Wi-Fi without a USB cable?",
    "Yes. CastSprint supports 5GHz local Wi-Fi mirroring using mDNS discovery and TLS 1.3 encryption with a 6-digit session PIN. For competitive tournament gaming where every millisecond counts, USB wired mode is recommended for guaranteed sub-15ms latency.",
  ],
  [
    "Which platforms are supported right now?",
    "Production builds are available for macOS (Universal DMG for Apple Silicon and Intel), Windows (portable x64 ZIP & PowerShell 1-liner), Linux (x86_64 PipeWire tarball), and Android (debug APK). iOS wireless mirroring is supported via AirPlay receiver mode.",
  ],
];

export function FAQ({ limit }: { limit?: number }) {
  const displayItems = limit ? items.slice(0, limit) : items;
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {displayItems.map(([q, a], i) => (
        <Accordion.Item value={`item-${i}`} className="faq-item" key={q}>
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              <span>{q}</span>
              <ChevronDown size={18} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <div>{a}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
