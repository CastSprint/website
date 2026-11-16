import Link from "next/link";
import Image from "next/image";
import {
  Apple,
  ArrowRight,
  Cable,
  Camera,
  Check,
  Code2,
  Download,
  Gamepad2,
  LockKeyhole,
  MonitorUp,
  Radio,
  RotateCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Volume2,
  Wifi,
  Zap,
} from "lucide-react";
import { ProductPreview } from "@/components/product-preview";
import { FAQ } from "@/components/faq";
import { Reveal } from "@/components/reveal";
import { TerminalInstall } from "@/components/terminal-install";
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
          "High-performance open-source mobile screen mirroring software with zero watermark, sub-15ms sync, thermal cooling, and OBS pipe.",
        url: siteUrl,
        downloadUrl: release.html_url,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          name: "TA Shanto",
          url: "https://tashanto.com",
        },
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
                100% Free
              </span>
              <span>
                <Check />
                No Watermarks
              </span>
              <span>
                <Check />
                Sub-15ms Latency
              </span>
              <span>
                <Check />
                Rust-Powered
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

      {/* Competitor Comparison Section */}
      <section className="section container comparison-section">
        <div className="section-heading text-center" style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="eyebrow">Fair Comparison</span>
          <h2>Why creators choose CastSprint over DouWan &amp; competitors.</h2>
          <p style={{ maxWidth: "680px", margin: "10px auto 0", color: "var(--muted)" }}>
            Frustrated by DouWan&apos;s 2-minute trial cutoffs, annoying watermarks, and 200ms audio desync?
            CastSprint was built by gamers for gamers with zero compromises.
          </p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature / Capability</th>
                <th className="featured">CastSprint</th>
                <th>DouWan (VIP)</th>
                <th>Scrcpy</th>
                <th>ApowerMirror</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>License &amp; Pricing</strong></td>
                <td className="featured">100% Free Forever (Open Source)</td>
                <td>$9.99 – $19.99 / yr VIP Paywall</td>
                <td>Free &amp; Open Source</td>
                <td>$29.95 / yr Subscription</td>
              </tr>
              <tr>
                <td><strong>Watermarks &amp; Trial Limits</strong></td>
                <td className="featured">Zero watermarks · Unlimited</td>
                <td>Watermark + 2 min trial disconnect</td>
                <td>Zero watermarks · Unlimited</td>
                <td>Watermark + 10 min session cap</td>
              </tr>
              <tr>
                <td><strong>Audio Latency (Footsteps)</strong></td>
                <td className="featured">&lt;15ms (WASAPI / PipeWire / Metal)</td>
                <td>200–300ms noticeable audio lag</td>
                <td>Requires sndcpy / Android 10+</td>
                <td>High latency buffer lag</td>
              </tr>
              <tr>
                <td><strong>Memory Footprint (RAM)</strong></td>
                <td className="featured">&lt;30 MB (Pure Rust Native)</td>
                <td>&gt;350 MB (Background daemons)</td>
                <td>~45 MB (C / Java)</td>
                <td>&gt;400 MB (Electron)</td>
              </tr>
              <tr>
                <td><strong>Thermal Cooling Mode</strong></td>
                <td className="featured">Hotkey &apos;C&apos; (15 FPS idle throttle)</td>
                <td>None (phone runs hot during play)</td>
                <td>Manual CLI bitrate args</td>
                <td>None</td>
              </tr>
              <tr>
                <td><strong>OBS Studio Pipeline</strong></td>
                <td className="featured">Direct raw stdout pipe &amp; WGC / SCK</td>
                <td>Virtual webcam behind paywall</td>
                <td>v4l2loopback (Linux only)</td>
                <td>Virtual webcam behind paywall</td>
              </tr>
              <tr>
                <td><strong>Account / Cloud Requirement</strong></td>
                <td className="featured">Zero accounts · 100% Local</td>
                <td>Mandatory login to check license</td>
                <td>Zero accounts · 100% Local</td>
                <td>Account required</td>
              </tr>
            </tbody>
          </table>
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
              tashanto.com →
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
        <div className="section-heading">
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
