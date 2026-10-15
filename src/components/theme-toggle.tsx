"use client";
import {Laptop,Moon,Sun} from "lucide-react"; import {useTheme} from "next-themes";
export function ThemeToggle(){const {theme,setTheme}=useTheme();const current=theme??"system";const next=current==="light"?"dark":current==="dark"?"system":"light";const Icon=current==="system"?Laptop:current==="dark"?Moon:Sun;return <button suppressHydrationWarning className="icon-button" onClick={()=>setTheme(next)} aria-label={`Color theme: ${current}. Switch to ${next}.`}><Icon size={17}/></button>}
