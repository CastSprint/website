import { cacheLife } from "next/cache";

export type ReleaseAsset = { name:string; size:number; digest:string|null; browser_download_url:string; content_type:string };
export type GithubRelease = { tag_name:string; name:string; published_at:string; html_url:string; body:string; assets:ReleaseAsset[] };

const verifiedFallback:GithubRelease={tag_name:"v0.3.1",name:"CastSprint v0.3.1",published_at:"2026-10-15T15:33:21Z",html_url:"https://github.com/CastSprint/CastSprint/releases/tag/v0.3.1",body:"Full changelog: v0.3.0...v0.3.1",assets:[
{name:"CastSprint-0.3.1-Linux-x86_64.tar.gz",size:57078,digest:"sha256:61d39c799cdef3c84defdb76ec7795ca28add199a0312c37fe9a25811fb5790d",browser_download_url:"https://github.com/CastSprint/CastSprint/releases/download/v0.3.1/CastSprint-0.3.1-Linux-x86_64.tar.gz",content_type:"application/x-gtar"},
{name:"CastSprint-0.3.1-Windows-x64.zip",size:205629,digest:"sha256:66c79a4019564ad198e63a9acb34a524dd6508105d583e472615a122b07187e4",browser_download_url:"https://github.com/CastSprint/CastSprint/releases/download/v0.3.1/CastSprint-0.3.1-Windows-x64.zip",content_type:"application/zip"},
{name:"CastSprint-Android-0.3.1-debug.apk",size:2719946,digest:"sha256:2786efa5adbacfaf145b67ec6237680b2fe7208c730d6e91f7c7b00ad55e1989",browser_download_url:"https://github.com/CastSprint/CastSprint/releases/download/v0.3.1/CastSprint-Android-0.3.1-debug.apk",content_type:"application/vnd.android.package-archive"},
{name:"CastSprint-v0.3.1-macOS.dmg",size:1804639,digest:"sha256:bd04d071b5320c9d7910e0ffe10a70bca0d0caad0474a6fdf56efbc290ed7142",browser_download_url:"https://github.com/CastSprint/CastSprint/releases/download/v0.3.1/CastSprint-v0.3.1-macOS.dmg",content_type:"application/x-apple-diskimage"},
{name:"SHA256SUMS",size:499,digest:"sha256:c665aa35d436d6d0f0435bcfc0fbea54939092eaf3b76a56cd119e29ec5b66a2",browser_download_url:"https://github.com/CastSprint/CastSprint/releases/download/v0.3.1/SHA256SUMS",content_type:"application/octet-stream"}]};

export async function getLatestRelease():Promise<GithubRelease>{
  "use cache";
  cacheLife("hours");
  try{const response=await fetch("https://api.github.com/repos/CastSprint/CastSprint/releases/latest",{headers:{Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"}});if(!response.ok)throw new Error(`GitHub ${response.status}`);return await response.json() as GithubRelease}catch{return verifiedFallback}
}

export function formatBytes(bytes:number){if(bytes<1024)return `${bytes} B`;if(bytes<1024*1024)return `${(bytes/1024).toFixed(1)} KB`;return `${(bytes/1024/1024).toFixed(1)} MB`}
