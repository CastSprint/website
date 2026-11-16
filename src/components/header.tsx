"use client";

import { Code2, Download, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { githubUrl, navigation } from "@/lib/site";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const active = (href: string) => path === href || path.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              className={active(item.href) ? "active" : undefined}
              aria-current={active(item.href) ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="nav-support hidden sm:inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/50 transition-colors"
            href="https://www.supportkori.com/iamtashanto"
            target="_blank"
            rel="noreferrer"
            title="Support TA Shanto on SupportKori"
          >
            <Heart size={12} className="text-pink-500 fill-pink-500" aria-hidden="true" />
            <span>Support</span>
          </a>

          <a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer">
            <Code2 size={16} aria-hidden="true" /> GitHub
          </a>

          <ThemeToggle />

          <Link href="/download" className="button small">
            <Download size={15} aria-hidden="true" /> Download
          </Link>

          <button
            ref={menuButton}
            className="icon-button menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="sr-only">{open ? "Close" : "Open"} navigation menu</span>
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            className="menu-backdrop"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />
          <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ...navigation,
              { label: "Changelog", href: "/changelog" },
              { label: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                onClick={() => setOpen(false)}
                className={active(item.href) ? "active" : undefined}
                aria-current={active(item.href) ? "page" : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.supportkori.com/iamtashanto"
              target="_blank"
              rel="noreferrer"
              className="text-pink-400 font-medium flex items-center gap-2"
            >
              <Heart size={14} className="fill-pink-500 text-pink-500" />
              <span>Support on SupportKori ↗</span>
            </a>
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <Link onClick={() => setOpen(false)} className="button" href="/download">
              Download CastSprint
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
