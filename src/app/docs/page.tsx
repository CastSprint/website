import Link from "next/link";
import {
  Cable,
  Smartphone,
  Wifi,
  MonitorUp,
  Download,
  Wrench,
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { PageHero } from "@/components/page-shell";
import { docPages, pageMetadata, githubUrl } from "@/lib/site";
import "./docs.css";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "iphone-usb": Cable,
  "android-usb": Smartphone,
  "wifi-mirroring": Wifi,
  "obs-setup": MonitorUp,
  installation: Download,
  troubleshooting: Wrench,
  architecture: Cpu,
};

export const metadata = pageMetadata(
  "Documentation",
  "CastSprint connection, OBS livestreaming, architecture, and troubleshooting documentation.",
  "/docs"
);

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documentation & Guides"
        title="Engineered for creators."
        description="Comprehensive guides for driverless iPhone USB capture, Android ADB reverse streaming, OBS Studio broadcast setup, and troubleshooting."
      />

      {/* Quick Start Highlights */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="eyebrow">Quick Start</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Choose your primary workflow
            </h2>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition"
          >
            GitHub Repository <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/docs/iphone-usb"
            className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#081a28] to-[#040e16] p-6 shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                <Cable size={22} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/60">
                Zero-App · &lt;15ms
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              iPhone to Mac (USB)
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Driverless CoreMediaIO pipeline with zero-copy Metal texture rendering and raw 48kHz IDAM audio.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-cyan-400 group-hover:underline">
              Start iPhone guide <ArrowRight size={15} />
            </div>
          </Link>

          <Link
            href="/docs/android-usb"
            className="group relative overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-b from-[#09172a] to-[#050e1b] p-6 shadow-xl transition-all duration-300 hover:border-blue-400 hover:shadow-blue-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <Smartphone size={22} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-800/60">
                ADB Reverse · 60 FPS
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
              Android USB Gaming
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Mapped local reverse TCP tunneling with 48kHz internal game sound via AudioPlaybackCapture.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:underline">
              Start Android guide <ArrowRight size={15} />
            </div>
          </Link>

          <Link
            href="/docs/obs-setup"
            className="group relative overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-b from-[#140f26] to-[#090616] p-6 shadow-xl transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/10 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/30">
                <MonitorUp size={22} />
              </span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-800/60">
                OBS 29+ · WGC
              </span>
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              OBS Studio Setup
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Direct GPU memory sharing via Windows Graphics Capture and macOS ScreenCaptureKit with isolated audio.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-purple-400 group-hover:underline">
              Start OBS guide <ArrowRight size={15} />
            </div>
          </Link>
        </div>
      </section>

      {/* Platform & Connection Matrix */}
      <section className="container py-8">
        <div className="rounded-2xl border border-slate-800 bg-[#061019] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="eyebrow">Connection Matrix</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Verified Routes &amp; Hardware Targets
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
              CastSprint Protocol V1 · 0.2.2-beta
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#091724] text-cyan-400">
                  <th className="p-3.5 font-semibold">Device</th>
                  <th className="p-3.5 font-semibold">Host Receiver</th>
                  <th className="p-3.5 font-semibold">Connection</th>
                  <th className="p-3.5 font-semibold">Mobile App?</th>
                  <th className="p-3.5 font-semibold">Audio Pipeline</th>
                  <th className="p-3.5 font-semibold">Latency</th>
                  <th className="p-3.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">iPhone / iPad</td>
                  <td className="p-3.5">Apple Mac (macOS 14+)</td>
                  <td className="p-3.5 font-mono text-cyan-300">USB Cable</td>
                  <td className="p-3.5 text-emerald-400 font-bold">NO (Zero-App)</td>
                  <td className="p-3.5">Uncompressed IDAM 48kHz</td>
                  <td className="p-3.5 font-mono text-cyan-400 font-bold">12 – 18 ms</td>
                  <td className="p-3.5"><span className="text-emerald-400 font-medium">Supported</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">Android</td>
                  <td className="p-3.5">Mac / Windows / Linux</td>
                  <td className="p-3.5 font-mono text-cyan-300">USB (ADB)</td>
                  <td className="p-3.5">Yes (Companion APK)</td>
                  <td className="p-3.5">AudioPlaybackCapture 48kHz</td>
                  <td className="p-3.5 font-mono text-cyan-400 font-bold">25 – 35 ms</td>
                  <td className="p-3.5"><span className="text-emerald-400 font-medium">Supported</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">iPhone / iPad</td>
                  <td className="p-3.5">Windows 10/11</td>
                  <td className="p-3.5 font-mono text-cyan-300">USB Hotspot</td>
                  <td className="p-3.5">Optional (AirPlay Mode)</td>
                  <td className="p-3.5">WASAPI 48kHz Shared</td>
                  <td className="p-3.5 font-mono text-cyan-400 font-bold">~24 ms</td>
                  <td className="p-3.5"><span className="text-emerald-400 font-medium">Supported</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">iPhone / iPad</td>
                  <td className="p-3.5">Mac / Windows / Linux</td>
                  <td className="p-3.5 font-mono text-cyan-300">Wi-Fi (5 GHz)</td>
                  <td className="p-3.5">Yes (CastSprint iOS)</td>
                  <td className="p-3.5">ReplayKit PCM / AAC</td>
                  <td className="p-3.5 font-mono text-cyan-400">20 – 35 ms</td>
                  <td className="p-3.5"><span className="text-emerald-400 font-medium">Supported</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">Android</td>
                  <td className="p-3.5">Windows / Mac / Linux</td>
                  <td className="p-3.5 font-mono text-cyan-300">Wi-Fi (5 GHz)</td>
                  <td className="p-3.5">Yes (Companion APK)</td>
                  <td className="p-3.5">AudioPlaybackCapture 48kHz</td>
                  <td className="p-3.5 font-mono text-cyan-400">45 – 65 ms</td>
                  <td className="p-3.5"><span className="text-emerald-400 font-medium">Supported</span></td>
                </tr>
                <tr className="hover:bg-slate-900/40 transition">
                  <td className="p-3.5 font-semibold text-white">iPhone / iPad</td>
                  <td className="p-3.5">Apple Mac / Windows</td>
                  <td className="p-3.5 font-mono text-cyan-300">AirPlay (LAN)</td>
                  <td className="p-3.5 text-emerald-400 font-bold">NO (Zero-App)</td>
                  <td className="p-3.5">AirPlay 2 Audio Stream</td>
                  <td className="p-3.5 font-mono text-slate-400">80 – 150 ms</td>
                  <td className="p-3.5"><span className="text-amber-400 font-medium">Demo / Presentation</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Comprehensive Guides Directory */}
      <section className="container py-12">
        <span className="eyebrow">Documentation Directory</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 mb-8">
          All Guides &amp; Specifications
        </h2>

        <div className="docs-hub-grid">
          {docPages.map((d) => {
            const Icon = iconMap[d.slug] ?? Cable;
            return (
              <Link
                key={d.slug}
                href={`/docs/${d.slug}`}
                className="doc-hub-card group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="card-icon group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
                    {d.badge}
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                  {d.group}
                </span>
                <h3 className="group-hover:text-cyan-300 transition-colors">
                  {d.title}
                </h3>
                <p>{d.summary}</p>
                <div className="card-footer">
                  <span>{d.readTime} read</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Open guide →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="container py-12">
        <div className="rounded-2xl border border-slate-800 bg-[#07131e] p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="eyebrow">The CastSprint Standard</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">
              Why streamers rely on CastSprint
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Commercial screen mirroring software locks high frame rates behind paywalls, plasters
              intrusive watermarks across mobile tournament gameplay, or pipes video through remote
              cloud servers. CastSprint does none of that.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl border border-slate-800/80 bg-[#091826]">
              <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">100% Free &amp; Private</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero paywalls, zero watermarks, zero accounts, and zero telemetry. Video stays strictly
                on your physical USB wire or private home subnet.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800/80 bg-[#091826]">
              <div className="h-9 w-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Zap size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">Hardware AV Synchronization</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Proprietary monotonic clock regression alignment (AvSynchronizer) guarantees game sound
                and action stay locked in sync during multi-hour livestreams.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-800/80 bg-[#091826]">
              <div className="h-9 w-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-white mb-2">Zero-Copy GPU Presentation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Decoded frames stay entirely in VRAM via Metal CVMetalTextureCache and Direct3D 11
                flip-discard swapchains for sub-frame presentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
