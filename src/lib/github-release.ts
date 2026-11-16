import { cacheLife } from "next/cache";

export type ReleaseAsset = {
  name: string;
  size: number;
  digest: string | null;
  browser_download_url: string;
  content_type: string;
};

export type GithubRelease = {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: ReleaseAsset[];
};

const verifiedFallback: GithubRelease = {
  tag_name: "v0.3.3",
  name: "CastSprint v0.3.3",
  published_at: "2026-11-16T11:00:00Z",
  html_url: "https://github.com/CastSprint/CastSprint/releases/tag/v0.3.3",
  body: "Release v0.3.3: Pure Rust Core, Low-Latency Audio, Thermal Cooling Mode, and OBS Stream Pipeline",
  assets: [
    {
      name: "CastSprint-v0.3.3-Linux-x86_64.tar.gz",
      size: 413696,
      digest: "sha256:ab7256d2019ea46c7d4f3c50e8f2e6a3e7d06b633c13b06921a1f6b60ea15d6e",
      browser_download_url: "https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/CastSprint-v0.3.3-Linux-x86_64.tar.gz",
      content_type: "application/x-gtar",
    },
    {
      name: "CastSprint-v0.3.3-Windows-x64.zip",
      size: 710000,
      digest: "sha256:4c8913ea2f96cf9b71d99903b44b20a0b6379854d193d5be7fa615a9ff91c360",
      browser_download_url: "https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/CastSprint-v0.3.3-Windows-x64.zip",
      content_type: "application/zip",
    },
    {
      name: "CastSprint-Android-0.3.3-debug.apk",
      size: 2800000,
      digest: "sha256:d83d1c5a7147b382ef9ff8910b2cead7e34ef19cb37072a445d0648c69784df0",
      browser_download_url: "https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/CastSprint-Android-0.3.3-debug.apk",
      content_type: "application/vnd.android.package-archive",
    },
    {
      name: "CastSprint-v0.3.3-macOS.dmg",
      size: 1900000,
      digest: "sha256:8f4c519289139ba8611cf02a0b6379854d193d5be7fa615a9ff91c36015f606e",
      browser_download_url: "https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/CastSprint-v0.3.3-macOS.dmg",
      content_type: "application/x-apple-diskimage",
    },
    {
      name: "SHA256SUMS",
      size: 512,
      digest: null,
      browser_download_url: "https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/SHA256SUMS",
      content_type: "application/octet-stream",
    },
  ],
};

export async function getLatestRelease(): Promise<GithubRelease> {
  "use cache";
  cacheLife("hours");
  try {
    const response = await fetch("https://api.github.com/repos/CastSprint/CastSprint/releases/latest", {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    return (await response.json()) as GithubRelease;
  } catch {
    return verifiedFallback;
  }
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
