import {
  Apple,
  ArrowRight,
  Download,
  ExternalLink,
  FileCheck2,
  Monitor,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { TerminalInstall } from "@/components/terminal-install";
import { formatBytes, getLatestRelease } from "@/lib/github-release";
import { downloadPlatforms, pageMetadata } from "@/lib/site";
import "./download.css";
import "./mac-install.css";

export const metadata = pageMetadata(
  "Download CastSprint",
  "Download the latest verified CastSprint release for macOS, Windows, Linux, and Android with direct downloads or 1-liner terminal installers.",
  "/download"
);

const icons = {
  macos: Apple,
  windows: Monitor,
  linux: Terminal,
  android: Smartphone,
} as const;

export default async function Page() {
  const release = await getLatestRelease();
  const published = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "Asia/Dhaka",
  }).format(new Date(release.published_at));
  const checksum = release.assets.find((a) => a.name === "SHA256SUMS");

  return (
    <>
      <PageHero
        eyebrow={`Latest Release · ${release.tag_name}`}
        title="Download CastSprint"
        description="Official binaries, terminal one-liners, checksums, and platform-specific guides. 100% free, zero watermarks, no accounts."
      />

      <section className="content-section container">
        {/* Release Summary Header */}
        <div className="release-summary">
          <div>
            <span className="status available">OFFICIAL PRODUCTION RELEASE</span>
            <h2>{release.name}</h2>
            <p>
              Published {published} · Pure Rust Engine · Sub-15ms AV Sync · OBS Direct Pipe
            </p>
          </div>
          <a
            className="button secondary"
            href={release.html_url}
            target="_blank"
            rel="noreferrer"
          >
            Release notes <ExternalLink size={15} aria-hidden="true" />
          </a>
        </div>

        {/* Terminal 1-Liner Quick Install Section */}
        <div style={{ margin: "32px 0 44px" }}>
          <div style={{ marginBottom: "16px" }}>
            <span
              className="eyebrow"
              style={{
                color: "var(--cyan)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Terminal size={14} /> 1-Liner Terminal Installers
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0" }}>
              Install via Terminal or PowerShell
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", margin: 0 }}>
              Prefer using your terminal? Run these verified one-liners to automatically download,
              verify, and install CastSprint.
            </p>
          </div>
          <TerminalInstall />
        </div>

        {/* Direct Download Grid */}
        <div style={{ marginBottom: "16px" }}>
          <span className="eyebrow">GUI &amp; Standalone Binaries</span>
          <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "4px 0" }}>
            Direct Download by Platform
          </h3>
        </div>

        <div className="content-grid download-grid">
          {downloadPlatforms.map((platform) => {
            const asset = release.assets.find((a) =>
              platform.pattern.test(a.name)
            );
            const Icon = icons[platform.slug];
            return (
              <article className="card download-card" key={platform.slug}>
                <div className="download-card-head">
                  <span className="platform-icon">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <span className={`status ${asset ? "available" : "dev"}`}>
                    {asset
                      ? platform.slug === "android"
                        ? "BETA · DEBUG"
                        : "AVAILABLE"
                      : "NOT PUBLISHED"}
                  </span>
                </div>
                <h2>{platform.name}</h2>
                <p>{platform.note}</p>
                <dl className="asset-details">
                  <div>
                    <dt>Version</dt>
                    <dd>{asset ? release.tag_name : "—"}</dd>
                  </div>
                  <div>
                    <dt>Format</dt>
                    <dd>{platform.format}</dd>
                  </div>
                  <div>
                    <dt>Architecture</dt>
                    <dd>{platform.architecture}</dd>
                  </div>
                  <div>
                    <dt>File size</dt>
                    <dd>{asset ? formatBytes(asset.size) : "—"}</dd>
                  </div>
                </dl>
                {asset && (
                  <a
                    className="button download-button"
                    style={{ marginBottom: "10px", width: "100%", justifyContent: "center" }}
                    href={asset.browser_download_url}
                  >
                    <Download size={16} aria-hidden="true" />
                    Direct Download ({formatBytes(asset.size)})
                  </a>
                )}
                <Link
                  className="button secondary"
                  style={{ width: "100%", justifyContent: "center" }}
                  href={`/download/${platform.slug}`}
                >
                  Installation guide <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            );
          })}

          <article className="card download-card">
            <div className="download-card-head">
              <span className="platform-icon">
                <Smartphone size={26} aria-hidden="true" />
              </span>
              <span className="status dev">COMING SOON</span>
            </div>
            <h2>iOS Receiver</h2>
            <p>
              No installable iOS receiver artifact is published yet. The macOS app is a desktop
              receiver that mirrors iPhones without needing any iOS companion app.
            </p>
            <dl className="asset-details">
              <div>
                <dt>Status</dt>
                <dd>Zero-App Mac Mode</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Native Protocol</dd>
              </div>
            </dl>
            <Link
              className="button secondary"
              style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
              href="/docs/iphone-usb"
            >
              Zero-App iPhone guide <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>

        {/* Verification Card */}
        <div className="card release-foot" style={{ marginTop: "40px" }}>
          <div>
            <h2>Cryptographic Verification</h2>
            <p>
              Always verify downloaded files against their published SHA-256 checksums to ensure
              security and package authenticity.
            </p>
          </div>
          {checksum && (
            <a
              className="button secondary"
              href={checksum.browser_download_url}
              target="_blank"
              rel="noreferrer"
            >
              <FileCheck2 size={16} aria-hidden="true" /> Download SHA256SUMS
            </a>
          )}
        </div>

        {/* Creator Spotlight / Developer Credit */}
        <div className="creator-spotlight" style={{ marginTop: "50px" }}>
          <div className="creator-info">
            <span
              className="eyebrow"
              style={{
                color: "var(--cyan)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Sparkles size={14} /> DEVELOPER CREDIT &amp; SUPPORT
            </span>
            <h3>Developed by TA Shanto</h3>
            <p>
              CastSprint is free and open source. If CastSprint saves you money on expensive capture
              cards or VIP subscriptions, consider supporting ongoing development!
            </p>
          </div>
          <div className="creator-actions">
            <a
              href="https://tashanto.com"
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              tashanto.com →
            </a>
            <a
              href="https://www.supportkori.com/iamtashanto"
              target="_blank"
              rel="noreferrer"
              className="support-kori-pill"
            >
              <span className="heart-icon">❤️</span> Support on SupportKori
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
