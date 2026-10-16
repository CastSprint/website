"use client";
import {SunMoon} from "lucide-react"; import {useTheme} from "next-themes";
export function ThemeToggle(){const {theme,setTheme}=useTheme();function cycleTheme(){const current=theme??"system";setTheme(current==="light"?"dark":current==="dark"?"system":"light")}return <button className="icon-button" onClick={cycleTheme} aria-label="Change color theme: light, dark, or system"><SunMoon size={17}/></button>}
