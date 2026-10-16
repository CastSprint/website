import Image from "next/image";import Link from "next/link";
export function Logo({compact=false}:{compact?:boolean}){return <Link href="/" className="brand-logo" aria-label="CastSprint home"><Image src="/brand/castsprint-icon.svg" alt="" width={38} height={38} priority/><span className={compact?"sr-only":"brand-word"}>Cast<span>Sprint</span></span></Link>}
