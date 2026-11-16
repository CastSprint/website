import {
  Cable,
  Wifi,
  Volume2,
  RotateCw,
  MonitorUp,
  Cpu,
  ShieldCheck,
  Flame,
  Zap,
} from "lucide-react";
import { CTA, FeatureTile, PageHero } from "@/components/page-shell";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Features & Capabilities",
  "Explore CastSprint's pure Rust engine, sub-15ms latency, 48kHz audio forwarding, thermal cooling mode, and zero-copy OBS Studio pipeline.",
  "/features"
);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="High-Performance Capabilities"
        title="A focused toolkit for mobile streamers &amp; gamers."
        description="Mirror mobile gameplay at locked 60+ FPS, route 48kHz audio without lag, and feed zero-copy video straight into OBS Studio."
      />
      <section className="content-section container">
        <div className="feature-grid">
          <FeatureTile icon={Cpu} title="Pure Rust Core">
            Engineered in bare-metal Rust with zero garbage collection pauses and a tiny &lt;30MB RAM footprint.
          </FeatureTile>
          <FeatureTile icon={Zap} title="Sub-15ms Latency">
            Direct OS-level hardware bindings for WASAPI, Metal, and PipeWire ensure imperceptible input lag.
          </FeatureTile>
          <FeatureTile icon={Volume2} title="48kHz Internal Audio">
            Pristine stereo sound forwarding from games like PUBG Mobile and BGMI with zero virtual cable desync.
          </FeatureTile>
          <FeatureTile icon={Cable} title="USB High-Speed Pipeline">
            Hardware-accelerated H.264 decoding and locked 60 FPS streaming over a standard USB data cable.
          </FeatureTile>
          <FeatureTile icon={Flame} title="Thermal Cooling Mode">
            Hotkey &apos;C&apos; toggles 15 FPS idle throttling when alt-tabbed, keeping your phone cool during tournaments.
          </FeatureTile>
          <FeatureTile icon={MonitorUp} title="OBS Studio Direct Pipe">
            Zero-copy Window Capture (WGC / ScreenCaptureKit) and raw stdout pipes for broadcast composition.
          </FeatureTile>
          <FeatureTile icon={Wifi} title="5GHz Wireless Mirroring">
            Zero-configuration mDNS discovery with TLS 1.3 encryption and 6-digit session PIN pairing.
          </FeatureTile>
          <FeatureTile icon={RotateCw} title="Instant Auto-Orientation">
            Seamlessly adapts between portrait lobby screens and widescreen landscape battlefields.
          </FeatureTile>
          <FeatureTile icon={ShieldCheck} title="100% Free &amp; Private">
            Zero watermarks, zero accounts, zero session caps, and zero telemetry daemons running in background.
          </FeatureTile>
        </div>
      </section>
      <CTA />
    </>
  );
}
