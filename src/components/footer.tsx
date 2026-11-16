import Link from "next/link";
import { Code2, ExternalLink, Heart } from "lucide-react";
import { githubUrl } from "@/lib/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Logo />
          <p>
            Open-source, ultra-low-latency mobile screen &amp; audio mirroring.
            Engineered in pure Rust for competitive mobile gamers and livestreamers.
          </p>
          <div className="creator-badge-box mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted">Created by</span>
              <a
                href="https://tashanto.com"
                target="_blank"
                rel="author noreferrer"
                className="font-bold text-cyan hover:underline inline-flex items-center gap-1 text-sm"
              >
                TA Shanto
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            </div>
            <a
              href="https://www.supportkori.com/iamtashanto"
              target="_blank"
              rel="noreferrer"
              className="support-kori-pill"
            >
              <Heart size={13} className="heart-icon" aria-hidden="true" />
              <span>Support on SupportKori</span>
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <strong>Product</strong>
          <Link href="/features">Features</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/compatibility">Compatibility</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/download">All Downloads</Link>
        </div>

        <div>
          <strong>Downloads</strong>
          <Link href="/download/macos">macOS (DMG)</Link>
          <Link href="/download/windows">Windows (ZIP / Installer)</Link>
          <Link href="/download/linux">Linux (TAR.GZ)</Link>
          <Link href="/download/android">Android (APK)</Link>
        </div>

        <div>
          <strong>Resources</strong>
          <Link href="/docs">Documentation</Link>
          <Link href="/docs/obs-setup">OBS Studio Guide</Link>
          <Link href="/blog">Blog &amp; Guides</Link>
          <Link href="/faq">FAQ</Link>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Code2 size={15} aria-hidden="true" /> GitHub Source
          </a>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="container footer-base">
        <span>© 2026 CastSprint · 100% Free &amp; Open Source</span>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <a
            className="dev-credit hover:text-cyan transition-colors"
            href="https://tashanto.com"
            target="_blank"
            rel="author noreferrer"
          >
            Designed &amp; developed by <strong>TA Shanto</strong>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
          <span>·</span>
          <a
            className="hover:text-pink-400 transition-colors inline-flex items-center gap-1.5"
            href="https://www.supportkori.com/iamtashanto"
            target="_blank"
            rel="noreferrer"
          >
            <Heart size={12} className="text-pink-500 fill-pink-500" aria-hidden="true" />
            <span>Support on SupportKori</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
