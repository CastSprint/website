"use client";

import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

const options = [
  {
    id: "bash",
    name: "macOS / Linux",
    badge: "Bash",
    command: "curl -fsSL https://castsprint.tashanto.com/install.sh | bash",
    description: "Auto-detects architecture, verifies checksum, and installs binary.",
  },
  {
    id: "powershell",
    name: "Windows",
    badge: "PowerShell",
    command: "irm https://castsprint.tashanto.com/install.ps1 | iex",
    description: "Downloads x64 release, creates Desktop shortcut, and adds to PATH.",
  },
  {
    id: "curl",
    name: "Manual Download",
    badge: "Direct CLI",
    command: "curl -LO https://github.com/CastSprint/CastSprint/releases/download/v0.3.3/CastSprint-v0.3.3-Linux-x86_64.tar.gz",
    description: "Direct curl download from verified GitHub Release v0.3.3 assets.",
  },
] as const;

export function TerminalInstall() {
  const [activeTab, setActiveTab] = useState<(typeof options)[number]["id"]>("bash");
  const [copied, setCopied] = useState(false);

  const selected = options.find((o) => o.id === activeTab) ?? options[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selected.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="terminal-install-card">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>
        <div className="terminal-tabs">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`terminal-tab ${activeTab === opt.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(opt.id);
                setCopied(false);
              }}
            >
              <span>{opt.name}</span>
              <small>{opt.badge}</small>
            </button>
          ))}
        </div>
      </div>

      <div className="terminal-body">
        <div className="terminal-prompt-line">
          <span className="terminal-prompt">$</span>
          <code className="terminal-command">{selected.command}</code>
          <button
            type="button"
            className="terminal-copy-btn"
            onClick={handleCopy}
            title="Copy command to clipboard"
            aria-label="Copy terminal install command"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <p className="terminal-caption">
          <Terminal size={13} className="inline mr-1 opacity-70" />
          {selected.description}
        </p>
      </div>
    </div>
  );
}
