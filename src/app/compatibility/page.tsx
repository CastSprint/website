import { PageHero } from "@/components/page-shell";
import { pageMetadata } from "@/lib/site";
import { CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = pageMetadata(
  "Device & OS Compatibility",
  "Review CastSprint verified platform support, audio forwarding, and connection pipelines for iPhone, Android, macOS, Windows, and Linux.",
  "/compatibility"
);

const compatibilityList = [
  {
    pair: "iPhone → macOS",
    status: "available",
    statusText: "OFFICIALLY VERIFIED",
    pipeline: "Direct USB / ScreenCaptureKit / Metal",
    latency: "<15ms",
    audio: "CoreAudio 48kHz Direct Sink",
    notes: "Zero-app plug-and-play wired capture. Hardware-accelerated Metal rendering.",
  },
  {
    pair: "Android → Windows",
    status: "available",
    statusText: "OFFICIALLY VERIFIED",
    pipeline: "High-Speed USB ADB / WASAPI Loopback",
    latency: "<15ms",
    audio: "WASAPI 48kHz Stereo",
    notes: "Requires USB Debugging. Internal game audio forwarded via AudioPlaybackCapture.",
  },
  {
    pair: "Android → Linux",
    status: "available",
    statusText: "OFFICIALLY VERIFIED",
    pipeline: "USB ADB / PipeWire Sink",
    latency: "<15ms",
    audio: "PipeWire Native Sink",
    notes: "x86_64 native build with direct PipeWire audio bridge and raw stdout pipe.",
  },
  {
    pair: "Android → macOS",
    status: "available",
    statusText: "OFFICIALLY VERIFIED",
    pipeline: "USB ADB / Apple Metal",
    latency: "<15ms",
    audio: "CoreAudio Loopback",
    notes: "Universal binary for Apple Silicon (M1/M2/M3/M4) and Intel Macs.",
  },
  {
    pair: "Wireless 5GHz Wi-Fi",
    status: "available",
    statusText: "OFFICIALLY VERIFIED",
    pipeline: "mDNS Discovery / TLS 1.3 PIN",
    latency: "<35ms",
    audio: "Encrypted AAC 48kHz",
    notes: "Zero-configuration local network discovery with 6-digit session PIN pairing.",
  },
  {
    pair: "iPhone → Windows",
    status: "dev",
    statusText: "IN ACTIVE TESTING",
    pipeline: "USB Hotspot / WASAPI Bridge",
    latency: "~25ms",
    audio: "WASAPI Ingestion",
    notes: "Tethered USB hotspot mode currently in canary test. Public release in v0.3.4.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Device & OS Matrix"
        title="Compatibility, without guesswork."
        description="Every connection mode and platform tested against real devices with verified latency and audio benchmarks."
      />

      <section className="content-section container">
        <div className="content-grid">
          {compatibilityList.map((item) => (
            <article className="card" key={item.pair}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className={`status ${item.status}`}>
                  {item.status === "available" ? (
                    <CheckCircle2 size={11} style={{ marginRight: "4px" }} />
                  ) : (
                    <AlertCircle size={11} style={{ marginRight: "4px" }} />
                  )}
                  {item.statusText}
                </span>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--cyan)" }}>
                  {item.latency}
                </span>
              </div>
              <h2 style={{ fontSize: "20px", margin: "6px 0 10px" }}>{item.pair}</h2>
              <p style={{ fontSize: "13.5px", margin: "0 0 14px", color: "var(--muted)" }}>
                {item.notes}
              </p>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: "12px", display: "grid", gap: "6px", fontSize: "12px" }}>
                <div>
                  <strong style={{ color: "var(--text)" }}>Pipeline:</strong>{" "}
                  <span style={{ color: "var(--muted)" }}>{item.pipeline}</span>
                </div>
                <div>
                  <strong style={{ color: "var(--text)" }}>Audio:</strong>{" "}
                  <span style={{ color: "var(--muted)" }}>{item.audio}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
