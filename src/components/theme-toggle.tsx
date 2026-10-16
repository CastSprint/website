"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const current = themes.includes(theme as (typeof themes)[number]) ? theme : "system";
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Laptop;
  function cycleTheme() {
    const index = themes.indexOf(current as (typeof themes)[number]);
    setTheme(themes[(index + 1) % themes.length]);
  }
  return <button className="icon-button" onClick={cycleTheme} aria-label={`Color theme: ${current}. Activate to change.`} title={`Theme: ${current}`}><Icon size={17} aria-hidden="true" /></button>;
}
