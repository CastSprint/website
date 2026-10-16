import { ArrowLeft, Download, ExternalLink, FileCheck2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatBytes, getLatestRelease } from "@/lib/github-release";
import { downloadPlatforms, pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return downloadPlatforms.map(({ slug }) => ({ platform: slug }));
}

export async function generateMetadata({ params }: {params: Promise<{platform:string}>}) {
  const { platform } = await params;
  const item = downloadPlatforms.find((entry) => entry.slug === platform);
  return item ? pageMetadata(`Download for ${item.name}`, `Download the official CastSprint ${item.name} release and review requirements, checksum, and installation notes.`, `/download/${platform}`) : {};
}

export default async function PlatformDownloadPage({ params }: {params: Promise<{platform:string}>}) {
  const { platform } = await params;
  const item = downloadPlatforms.find((entry) => entry.slug === platform);
  if (!item) notFound();
  const release = await getLatestRelease();
  const asset = release.assets.find((entry) => item.pattern.test(entry.name));
  const digest = asset?.digest?.replace("sha256:", "");
  const steps = platform === "macos"
    ? ["Download the DMG and compare its SHA-256 checksum.", "Open the DMG and move CastSprint to Applications.", "If Gatekeeper blocks the first launch, review Privacy & Security and use Open Anyway only after verifying the file."]
    : platform === "windows"
      ? ["Download the ZIP and compare its SHA-256 checksum.", "Extract the archive to a folder you control.", "Launch CastSprint from the extracted folder and review any Windows security prompt before continuing."]
      : platform === "linux"
        ? ["Download the TAR.GZ and compare its SHA-256 checksum.", "Extract the archive without elevated privileges.", "Review the included files and release notes, then grant only the permissions required by your distribution."]
        : ["Download the debug APK and compare its SHA-256 checksum.", "Enable installation from the trusted app you used to download the file.", "Review Android’s warning and install only if the verified checksum matches the official release."];

  return <><section className="page-hero"><div className="container narrow"><Link className="text-link back-link" href="/download"><ArrowLeft size={15} aria-hidden="true"/> All downloads</Link><span className="eyebrow">{release.tag_name} · {item.format}</span><h1>CastSprint for {item.name}.</h1><p>{item.note}</p>{asset ? <div className="hero-actions platform-actions"><a className="button" href={asset.browser_download_url}><Download size={18} aria-hidden="true"/> Download {formatBytes(asset.size)}</a><a className="button secondary" href={release.html_url} target="_blank" rel="noreferrer">Release notes <ExternalLink size={15} aria-hidden="true"/></a></div> : <p className="note">No compatible asset is published in the latest release.</p>}</div></section><section className="content-section container platform-page"><div className="platform-main"><article className="card"><span className="eyebrow">Install safely</span><h2>Three steps to get started</h2><ol className="install-steps">{steps.map((step,index)=><li key={step}><span>{index+1}</span><p>{step}</p></li>)}</ol></article><article className="card"><span className="eyebrow">What this build is</span><h2>Release details</h2><dl className="detail-list"><div><dt>Version</dt><dd>{release.tag_name}</dd></div><div><dt>Platform</dt><dd>{item.name}</dd></div><div><dt>Architecture</dt><dd>{item.architecture}</dd></div><div><dt>Requirements</dt><dd>{item.requirements}</dd></div><div><dt>File</dt><dd>{asset?.name ?? "Not published"}</dd></div></dl></article></div><aside className="card verification-card"><ShieldCheck size={30} aria-hidden="true"/><h2>Verify the file</h2><p>Use the checksum from the official GitHub release before opening an installer or archive.</p>{digest&&<div className="checksum"><FileCheck2 size={16} aria-hidden="true"/><span><small>SHA-256</small><code>{digest}</code></span></div>}<a className="text-link" href={release.html_url} target="_blank" rel="noreferrer">Open official release <ExternalLink size={14} aria-hidden="true"/></a></aside></section></>;
}
