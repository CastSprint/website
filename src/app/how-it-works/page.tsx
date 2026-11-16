import { PageHero } from "@/components/page-shell";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { ArrowRight, Cable, CheckCircle2, MonitorUp, Wifi } from "lucide-react";

export const metadata = pageMetadata(
  "How It Works",
  "Learn how CastSprint connects mobile devices to PC over USB and 5GHz Wi-Fi with sub-15ms sync and OBS Studio composition.",
  "/how-it-works"
);

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Simple 3-Step Setup"
        title="From mobile gameplay to live desktop production."
        description="A streamlined pipeline engineered for creators: connect your smartphone, launch the native receiver, and stream with OBS Studio."
      />

      <section className="content-section container">
        <div className="content-grid">
          <article className="card">
            <span className="number">STEP 01</span>
            <h2>Connect Your Device</h2>
            <p>
              Connect your iPhone or Android via USB cable for locked 60 FPS sub-15ms sync, or pair
              wirelessly over 5GHz Wi-Fi using instant mDNS discovery and session PIN.
            </p>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="status available">
                <Cable size={11} style={{ marginRight: "4px" }} /> USB Wired
              </span>
              <span className="status available">
                <Wifi size={11} style={{ marginRight: "4px" }} /> 5GHz Wi-Fi
              </span>
            </div>
          </article>

          <article className="card">
            <span className="number">STEP 02</span>
            <h2>Open CastSprint Native Core</h2>
            <p>
              Launch the featherlight CastSprint desktop receiver. The pure Rust engine automatically binds
              to hardware decoders, establishes low-latency audio sinks, and displays your high-FPS screen.
            </p>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="status available">
                <CheckCircle2 size={11} style={{ marginRight: "4px" }} /> Sub-15ms Sync
              </span>
              <span className="status available">
                <CheckCircle2 size={11} style={{ marginRight: "4px" }} /> 48kHz Audio
              </span>
            </div>
          </article>

          <article className="card">
            <span className="number">STEP 03</span>
            <h2>Produce &amp; Stream in OBS Studio</h2>
            <p>
              Add CastSprint as a Window Capture source in OBS Studio using Windows Graphics Capture (WGC) or
              macOS ScreenCaptureKit. Enjoy zero-copy capture, pristine audio, and zero watermarks.
            </p>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="status available">
                <MonitorUp size={11} style={{ marginRight: "4px" }} /> OBS Ready
              </span>
              <span className="status available">
                <CheckCircle2 size={11} style={{ marginRight: "4px" }} /> Zero Watermark
              </span>
            </div>
          </article>
        </div>

        <div className="prose narrow" style={{ margin: "70px auto 0" }}>
          <h2>Pro-Tips for Competitive Streamers</h2>
          <p>
            For tournament games such as PUBG Mobile, BGMI, and Call of Duty Mobile:
          </p>
          <ul>
            <li>
              <strong>Use a quality USB-C / Lightning data cable:</strong> High-bandwidth USB 3.0 cables
              eliminate packet retries and guarantee sub-15ms latency.
            </li>
            <li>
              <strong>Enable Thermal Guard (Hotkey &apos;C&apos;):</strong> Tap hotkey &apos;C&apos; when taking a
              break or alt-tabbing to lower idle preview rendering to 15 FPS so your phone battery remains cool.
            </li>
            <li>
              <strong>Direct OBS Audio Capture:</strong> Use OBS 28+ &quot;Application Audio Capture&quot; to grab
              CastSprint sound directly without routing desktop Discord or music into your game stream.
            </li>
          </ul>

          <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
            <Link href="/docs/obs-setup" className="button">
              Read the OBS Studio Setup Guide <ArrowRight size={15} />
            </Link>
            <Link href="/download" className="button secondary">
              Download CastSprint
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
