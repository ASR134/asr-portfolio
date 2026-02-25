"use client"

import { personalInfo, socialLinks } from "@/data/portfolio"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-[#080E14] px-6 py-24 md:px-12 lg:px-24"
      aria-label="Contact"
    >
      {/* ASCII divider */}
      <div
        className="mb-16 overflow-hidden font-mono text-sm text-terminal-dim select-none"
        aria-hidden="true"
      >
        {"━".repeat(60)}
      </div>

      <div className="max-w-3xl">
        {/* Big heading */}
        <h2 className="font-mono text-6xl font-bold tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
          {"OPEN."}
        </h2>

        {/* Subline */}
        <p className="mt-6 font-mono text-sm text-muted-foreground sm:text-base">
          <span className="text-terminal-green">{">"}</span>
          {" ready to collaborate. drop a signal."}
        </p>

        {/* Social links as commands */}
        <div className="mt-10 flex flex-col gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-terminal-cyan sm:text-sm"
              aria-label={`Visit ${link.platform}`}
            >
              <span className="text-terminal-green/60 transition-colors group-hover:text-terminal-green">
                {"$"}
              </span>
              <span className="transition-colors group-hover:text-terminal-cyan">
                {link.command}
              </span>
            </a>
          ))}
        </div>

        {/* Available badge */}
        {personalInfo.openToOpportunities && (
          <div className="mt-12 inline-flex items-center gap-2.5 border border-terminal-green/20 bg-terminal-green/5 px-4 py-2">
            <span className="animate-pulse-available size-2 rounded-full bg-terminal-green" />
            <span className="font-mono text-xs tracking-widest text-terminal-green uppercase">
              {"AVAILABLE"}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
