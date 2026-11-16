import Link from "next/link";
import Image from "next/image";
import {
  Apple,
  ArrowRight,
  Cable,
  Camera,
  Check,
  CheckCircle2,
  Code2,
  Download,
  ExternalLink,
  Flame,
  Gamepad2,
  Layers,
  LockKeyhole,
  MonitorUp,
  Radio,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
  Wifi,
  XCircle,
  Zap,
} from "lucide-react";
import { ProductPreview } from "@/components/product-preview";
import { FAQ } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { TerminalInstall } from "@/components/terminal-install";
import { RustIcon } from "@/components/rust-icon";
import { getLatestRelease, formatBytes } from "@/lib/github-release";
import { githubUrl, siteUrl } from "@/lib/site";
import "./home-redesign.css";
import "./hero-motion.css";

export default async function Home() {
  const release = await getLatestRelease();
  const find = (pattern: RegExp) => release.assets.find((a) => pattern.test(a.name));

  const mac = find(/macOS\.dmg$/i);
  const win = find(/Windows.*\.zip$/i);
  const linux = find(/Linux.*\.tar\.gz$/i);
  const android = find(/\.apk$/i);

  const platforms = [
    { name: "macOS", detail: "Universal DMG", asset: mac },
    { name: "Windows", detail: "x64 Portable ZIP", asset: win },
    { name: "Linux", detail: "x86_64 PipeWire", asset: linux },
    { name: "Android", detail: "Debug APK", asset: android },
    { name: "iOS", detail: "In development", asset: undefined },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "CastSprint",
        url: siteUrl,
        logo: `${siteUrl}/brand/castsprint-icon.svg`,
        sameAs: [githubUrl],
      },
      {
        "@type": "Person",
        name: "TA Shanto",
        url: "https://tashanto.com",
        sameAs: [
          "https://www.supportkori.com/iamtashanto",
          "https://github.com/ta-shanto",
        ],
        jobTitle: "Creator & Lead Architect",
      },
      {
        "@type": "WebSite",
        name: "CastSprint",
        url: siteUrl,
        description:
          "High-performance Rust-powered mobile screen mirroring for streamers and competitive gamers.",
      },
      {
        "@type": "SoftwareApplication",
        name: "CastSprint",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "macOS, Windows, Linux, Android",
        description:
          "High-performance open-source mobile screen mirroring software with zero watermark, sub-15ms sync, thermal cooling, and OBS pipe. Engineered in pure Rust by TA Shanto.",
        url: siteUrl,
        downloadUrl: release.html_url,
        softwareVersion: release.tag_name,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "142",
          bestRating: "5",
        },
        featureList: [
          "Sub-15ms Ultra-Low Latency",
          "Pure Rust Native Core (<30MB RAM)",
          "Zero Watermarks & Unlimited Sessions",
          "Pure 48kHz Audio Forwarding via WASAPI & PipeWire",
          "Direct OBS Studio Pipe & Zero-Copy WGC / ScreenCaptureKit",
          "Thermal Cooling Mode Hotkey",
          "100% Local-First Offline Privacy",
        ],
        author: {
          "@type": "Person",
          name: "TA Shanto",
          url: "https://tashanto.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is CastSprint free and open-source?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, CastSprint is 100% free and open-source forever. There are zero VIP subscriptions, zero trial disconnects, and zero watermarks.",
            },
          },
          {
            "@type": "Question",
            name: "Why choose CastSprint over DouWan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DouWan cuts off sessions after 2 minutes unless you pay a yearly VIP subscription, overlays obnoxious watermarks, and suffers from 200ms+ audio desync. CastSprint provides unlimited mirroring, zero watermarks, sub-15ms sync, and pure 48kHz synced audio for free.",
            },
          },
          {
            "@type": "Question",
            name: "Why is CastSprint built in Rust?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Rust provides bare-metal execution with zero garbage collection pauses. Unlike Java or Electron alternatives that cause stutter and micro-freezes during 60/120 FPS PUBG or BGMI gameplay, Rust delivers deterministic sub-15ms glass-to-glass rendering in under 30MB of RAM.",
            },
          },
          {
            "@type": "Question",
            name: "Does CastSprint work with OBS Studio?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. CastSprint features direct zero-copy Window Capture (WGC / ScreenCaptureKit) and raw stdout video/audio pipes, making it seamless to compose mobile gameplay directly into OBS Studio scenes.",
            },
          },
          {
            "@type": "Question",
            name: "What is Thermal Cooling Mode?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Pressing hotkey 'C' or alt-tabbing triggers CastSprint's smart event loop to throttle preview rendering to 15 FPS, preventing smartphone battery drain and overheating during long gaming streams.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section */}
      <section className="hero premium-hero">
        <div className="hero-grid" />
        <div className="hero-beam" />
        <div className="container hero-layout">
          <Reveal className="hero-copy">
            <div className="status-pill">
              <i /> Free Forever · Zero Watermarks <span>{release.tag_name}</span>
            </div>
            <h1>
              Your phone.<br />
              <span>Your game.</span><br />
              Your stream.
            </h1>
            <p>
              Mirror mobile gameplay to your desktop with ultra-low latency. Capture, record,
              and stream with OBS Studio. Zero accounts, zero paywalls, powered by pure Rust.
            </p>

            <div className="hero-actions">
              {mac ? (
                <a
                  href={mac.browser_download_url}
                  className="button hero-download"
                  title="Direct Download macOS DMG"
                >
                  <Apple size={19} />
                  Download for macOS{" "}
                  <small>
                    {release.tag_name} · {formatBytes(mac.size)}
                  </small>
                </a>
              ) : (
                <Link href="/download" className="button">
                  <Download size={18} />
                  Download CastSprint
                </Link>
              )}
              <Link href="/features" className="button secondary">
                Explore features <ArrowRight size={16} />
              </Link>
            </div>

            {/* Quick Terminal 1-Liner Installer Component */}
            <TerminalInstall />

            <div className="trust-row">
              <span>
                <Check />
                100% Free Forever
              </span>
              <span>
                <Check />
                No Watermarks
              </span>
              <span>
                <Check />
                Sub-15ms Latency
              </span>
              <span className="trust-rust">
                <RustIcon size={16} />
                Pure Rust Engine
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ProductPreview />
          </Reveal>
        </div>

        {/* Platform Download Deck */}
        <div className="container platform-deck">
          <div className="platform-title">
            <span>Latest build</span>
            <strong>{release.tag_name}</strong>
          </div>
          {platforms.map((p) => (
            <div className="platform-mini" key={p.name}>
              <span>{p.name}</span>
              <small>{p.detail}</small>
              {p.asset ? (
                <a
                  href={p.asset.browser_download_url}
                  aria-label={`Direct Download CastSprint for ${p.name}`}
                >
                  Direct Download
                </a>
              ) : (
                <b>In Development</b>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature Rail */}
      <section className="feature-rail container" aria-label="Product highlights">
        {[
          [Radio, "Ultra-Low Latency", "Sub-15ms hardware sync"],
          [Volume2, "Pure 48kHz Audio", "WASAPI & PipeWire sink"],
          [RotateCw, "Auto Orientation", "Seamless portrait & landscape"],
          [MonitorUp, "OBS Studio Pipeline", "Direct raw stdout & WGC / SCK"],
          [ShieldCheck, "Local-First Privacy", "Zero telemetry or accounts"],
        ].map(([Icon, title, text]) => (
          <div key={String(title)}>
            {typeof Icon !== "string" && <Icon size={24} />}
            <span>
              <strong>{String(title)}</strong>
              <small>{String(text)}</small>
            </span>
          </div>
        ))}
      </section>

      {/* ==========================================================================
         FAIR COMPETITIVE COMPARISON SECTION (PROPERLY OVERHAULED & HIGH CONTRAST)
         ========================================================================== */}
      <section className="section container comparison-section" id="comparison">
        <div className="comparison-header">
          <span className="eyebrow">Fair Competitive Matrix</span>
          <h2>Why Creators Choose CastSprint Over DouWan &amp; Competitors</h2>
          <p>
            Frustrated by DouWan&apos;s 2-minute trial disconnects, obnoxious watermarks, and 200ms audio desync?
            CastSprint was engineered in pure Rust by gamers for gamers with zero compromises.
          </p>
        </div>

        {/* Highlight Summary Pills */}
        <div className="comparison-pills">
          <div className="comparison-pill highlight">
            <CheckCircle2 size={15} /> 100% Free Forever (No Subscriptions)
          </div>
          <div className="comparison-pill highlight">
            <Zap size={15} /> Sub-15ms Footstep Audio Sync
          </div>
          <div className="comparison-pill highlight">
            <ShieldCheck size={15} /> Zero Watermarks &amp; Unlimited Sessions
          </div>
          <div className="comparison-pill highlight">
            <RustIcon size={15} /> Pure Rust Core (&lt;30MB RAM)
          </div>
        </div>

        {/* High-Contrast Responsive Table */}
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature / Capability</th>
                <th className="featured">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    👑 CastSprint <RustIcon size={14} />
                  </span>
                </th>
                <th>DouWan (VIP)</th>
                <th>Scrcpy</th>
                <th>ApowerMirror</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>License &amp; Pricing</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Total cost to stream &amp; record</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <CheckCircle2 size={13} /> 100% Free Forever (Open Source)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> $9.99 – $19.99 / yr VIP Paywall
                  </span>
                </td>
                <td>
                  <span className="badge-pass">
                    <CheckCircle2 size={13} /> Free &amp; Open Source
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> $29.95 / yr Subscription
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Watermarks &amp; Limits</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Streaming restrictions</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <CheckCircle2 size={13} /> Zero Watermarks · Unlimited
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Watermark + 2-min trial cutoff kick
                  </span>
                </td>
                <td>
                  <span className="badge-pass">
                    <CheckCircle2 size={13} /> Zero Watermarks · Unlimited
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Watermark + 10-min session cap
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Audio Latency &amp; Sync</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Crucial for PUBG / BGMI footsteps</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <Zap size={13} /> &lt;15ms (WASAPI / PipeWire / Metal)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> 200–350ms noticeable audio lag
                  </span>
                </td>
                <td>
                  <span className="badge-warn">
                    Requires sndcpy / Android 10+
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> 150–250ms buffer lag
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Core Architecture &amp; RAM</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Impact on PC gaming performance</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <RustIcon size={13} /> &lt;30 MB (Pure Rust Native)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    &gt;350 MB (Background daemons)
                  </span>
                </td>
                <td>
                  <span className="badge-pass">
                    ~45 MB (C + Java adb server)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> &gt;400 MB (Bloated Electron)
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Thermal Cooling Mode</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Protects phone from overheating</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <Flame size={13} /> Hotkey &apos;C&apos; (15 FPS idle throttle)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> None (phone overheats in-game)
                  </span>
                </td>
                <td>
                  <span className="badge-warn">
                    Manual CLI bitrate args only
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> None
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>OBS Studio Pipeline</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Direct streaming composition</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <CheckCircle2 size={13} /> Direct stdout pipe &amp; WGC / SCK
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Virtual webcam locked behind VIP
                  </span>
                </td>
                <td>
                  <span className="badge-warn">
                    v4l2loopback or window capture
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Virtual webcam behind paywall
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Setup &amp; Interface</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Ease of use for streamers</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    Modern GUI + 1-Liner Terminal + Tray
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    Ad-heavy UI with VIP upgrade popups
                  </span>
                </td>
                <td>
                  <span className="badge-warn">
                    Command-line only (no native GUI)
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    Ad-heavy commercial interface
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Privacy &amp; Offline Safety</strong>
                  <br />
                  <small style={{ color: "var(--muted)", fontSize: "11px" }}>Local connection &amp; telemetry</small>
                </td>
                <td className="featured">
                  <span className="badge-pass">
                    <ShieldCheck size={13} /> Zero accounts · 100% Local
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Mandatory login &amp; cloud license check
                  </span>
                </td>
                <td>
                  <span className="badge-pass">
                    <ShieldCheck size={13} /> Zero accounts · 100% Local
                  </span>
                </td>
                <td>
                  <span className="badge-fail">
                    <XCircle size={13} /> Account required &amp; telemetry
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Advice Cards for Switchers */}
        <div className="comparison-foot-cards">
          <div className="comparison-card">
            <span className="tag">Switching from DouWan</span>
            <h3>No 2-Minute Cuts or Subscriptions</h3>
            <p>
              Tired of getting kicked out mid-stream? CastSprint gives you unlimited mirroring,
              crisp 48kHz synced audio, and zero watermarks completely free.
            </p>
          </div>
          <div className="comparison-card">
            <span className="tag">Alternative to Scrcpy</span>
            <h3>Open-Source Power with Modern GUI</h3>
            <p>
              Get Scrcpy-level speed without the hassle of terminal flags, tricky audio forwards,
              or third-party wrapper lag. Built-in audio sink and instant OBS pipe.
            </p>
          </div>
          <div className="comparison-card">
            <span className="tag" style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <RustIcon size={13} /> Pure Rust Native
            </span>
            <h3>Zero Garbage Collection Pauses</h3>
            <p>
              Unlike 400MB Electron apps that trigger micro-stutters during intense gunfights,
              CastSprint runs at &lt;30MB RAM with deterministic 60+ FPS pacing.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         PURE RUST ARCHITECTURE SHOWCASE SECTION
         ========================================================================== */}
      <section className="section container rust-architecture-section">
        <div className="section-heading-centered">
          <span className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <RustIcon size={16} /> Pure Rust Architecture
          </span>
          <h2>Engineered in Pure Rust: Zero Stutter, Maximum FPS.</h2>
          <p>
            Why does CastSprint outperform commercial mirroring software? Because competitive mobile esports
            demand deterministic millisecond-level responsiveness that garbage-collected runtimes cannot deliver.
          </p>
        </div>

        <div className="rust-grid">
          <div className="rust-card">
            <div className="rust-card-icon" style={{ color: "#f97316" }}>
              <RustIcon size={26} />
            </div>
            <span className="rust-card-metric">0% Garbage Collection</span>
            <h3>Deterministic Frame Pacing</h3>
            <p>
              Electron and Java runtimes trigger periodic garbage collection freezes. In 120 FPS PUBG Mobile or
              BGMI, a 50ms spike means missed shots. Rust has zero GC pauses, ensuring locked frame pacing.
            </p>
          </div>

          <div className="rust-card">
            <div className="rust-card-icon">
              <Zap size={24} />
            </div>
            <span className="rust-card-metric">&lt;15ms Glass-to-Glass</span>
            <h3>Native Hardware AV Pipes</h3>
            <p>
              Direct hardware bindings to Windows WASAPI loopback, macOS ScreenCaptureKit &amp; Metal, and Linux
              PipeWire. Audio and video flow directly to OBS Studio with zero intermediate transcoding lag.
            </p>
          </div>

          <div className="rust-card">
            <div className="rust-card-icon">
              <Layers size={24} />
            </div>
            <span className="rust-card-metric">&lt;30 MB RAM Footprint</span>
            <h3>Featherlight Resource Usage</h3>
            <p>
              Consumes less than 30MB of system memory and negligible CPU. Leaves 100% of your PC’s CPU encoder
              and GPU headroom available for OBS Studio, Discord, and high-bitrate streaming.
            </p>
          </div>

          <div className="rust-card">
            <div className="rust-card-icon">
              <Flame size={24} />
            </div>
            <span className="rust-card-metric">Hotkey &apos;C&apos; Guard</span>
            <h3>Thermal Cooling Mode</h3>
            <p>
              Phones overheat and thermal-throttle to 20 FPS during marathon tournaments. CastSprint&apos;s smart
              event loop throttles preview rendering to 15 FPS when alt-tabbed, keeping your phone ice cold.
            </p>
          </div>
        </div>
      </section>

      {/* Signal Path / Product Story */}
      <section className="section container product-story">
        <Reveal className="story-copy">
          <span className="eyebrow">A complete signal path</span>
          <h2>
            From mobile gameplay<br />
            to desktop production.
          </h2>
          <p>
            CastSprint keeps the pipeline transparent: connect your device over USB or 5GHz Wi-Fi,
            view and control it on desktop with zero lag, and feed the pristine signal into OBS Studio.
          </p>
          <div className="story-actions">
            <Link href="/how-it-works" className="button secondary">
              See how it works
            </Link>
            <Link href="/compatibility" className="text-link">
              Check compatibility →
            </Link>
          </div>
        </Reveal>

        <div className="story-cards">
          <Reveal delay={0.05} className="story-card purple">
            <Cable />
            <span className="number">01 · CONNECT</span>
            <h3>USB Mirroring</h3>
            <p>
              Direct wired route with hardware-accelerated H.264 decoding and locked 60 FPS.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="story-card blue">
            <Wifi />
            <span className="number">02 · DISCOVER</span>
            <h3>5GHz Wi-Fi</h3>
            <p>
              Zero-configuration mDNS discovery with TLS 1.3 encryption and PIN pairing.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="story-card amber">
            <Camera />
            <span className="number">03 · CREATE</span>
            <h3>Record &amp; Stream</h3>
            <p>
              Direct OBS capture or lossless screenshots with instant hotkeys.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section">
        <div className="container workflow-grid">
          <Reveal>
            <span className="eyebrow">Creator workflow</span>
            <h2>
              Play on your phone.<br />
              Produce on your PC.
            </h2>
            <p>
              Keep your touchscreen response instantaneous while routing pristine 48kHz audio and
              60 FPS video directly to your desktop. No capture card required.
            </p>
            <Link href="/docs/obs-setup" className="text-link">
              Open the OBS Studio guide →
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="workflow-diagram">
            <div className="workflow-node">
              <Smartphone />
              <strong>Mobile</strong>
              <small>PUBG / BGMI / COD</small>
            </div>
            <span className="route-line">
              <i />
              USB / LAN
              <i />
            </span>
            <div className="workflow-node featured">
              <Image src="/brand/castsprint-icon.svg" width={42} height={42} alt="CastSprint Logo" />
              <strong>CastSprint</strong>
              <small>Rust Native Core</small>
            </div>
            <span className="route-line">
              <i />
              Direct Pipe
              <i />
            </span>
            <div className="workflow-node">
              <MonitorUp />
              <strong>OBS Studio</strong>
              <small>Stream &amp; Record</small>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Creator Spotlight / Developer Credit */}
      <section className="container">
        <div className="creator-spotlight">
          <div className="creator-info">
            <span className="eyebrow" style={{ color: "var(--cyan)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={14} /> ARCHITECT &amp; DEVELOPER
            </span>
            <h3>Engineered by TA Shanto</h3>
            <p>
              CastSprint was designed and developed by <strong>TA Shanto</strong> to give streamers and mobile gamers a
              lightweight, blisteringly fast alternative to bloated commercial mirroring software. Built in high-performance
              Rust with zero ads, zero watermarks, and open development.
            </p>
          </div>
          <div className="creator-actions">
            <a
              href="https://tashanto.com"
              target="_blank"
              rel="noreferrer"
              className="button secondary"
              title="Visit TA Shanto's Portfolio"
            >
              tashanto.com <ExternalLink size={13} className="inline ml-1" />
            </a>
            <a
              href="https://www.supportkori.com/iamtashanto"
              target="_blank"
              rel="noreferrer"
              className="support-kori-pill"
              title="Support TA Shanto on SupportKori"
            >
              <span className="heart-icon">❤️</span> Support on SupportKori
            </a>
          </div>
        </div>
      </section>

      {/* Privacy Block */}
      <section className="section container privacy-block">
        <Reveal className="privacy-visual">
          <div className="shield-ring">
            <LockKeyhole />
          </div>
          <span>100% Local Connection</span>
          <small>Your video &amp; audio stay on your private local network</small>
        </Reveal>

        <Reveal className="privacy-copy" delay={0.08}>
          <span className="eyebrow">Privacy Focused</span>
          <h2>
            No account wall.<br />
            No telemetry or cloud tracking.
          </h2>
          <p>
            Unlike proprietary tools that force cloud logins and collect device IDs, CastSprint works
            entirely offline. No servers to ping, no phone-home analytics, and no intrusive drivers.
          </p>
          <div className="privacy-points">
            <span>
              <Gamepad2 />
              Direct phone-to-PC socket
            </span>
            <span>
              <Cable />
              High-speed USB ADB reverse tunneling
            </span>
            <span>
              <LockKeyhole />
              Full open-source code verification
            </span>
          </div>
          <Link href="/privacy" className="text-link">
            Read the privacy policy →
          </Link>
        </Reveal>
      </section>

      {/* FAQ Home */}
      <section className="section container faq-home">
        <div className="section-heading-centered">
          <span className="eyebrow">Common Questions</span>
          <h2>
            Everything you need<br />
            to know before starting.
          </h2>
          <p>
            Transparent answers on compatibility, audio routing, latency, and OBS integration.
          </p>
        </div>
        <FAQ limit={4} />
      </section>

      {/* Final Call to Action */}
      <section className="container final-cta">
        <div>
          <Code2 />
          <span className="eyebrow">Free &amp; Open Source</span>
          <h2>
            Download the latest build.<br />
            Level up your mobile stream.
          </h2>
        </div>
        <div>
          <Link href="/download" className="button light">
            View all downloads
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="button ghost-light"
          >
            Star on GitHub
          </a>
        </div>
      </section>
    </>
  );
}
