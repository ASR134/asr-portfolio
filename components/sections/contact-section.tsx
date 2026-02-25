"use client"

import { personalInfo, socialLinks } from "@/data/portfolio"
import { useState } from "react"

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  "X / Twitter": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
}

export function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section
      id="contact"
      className="relative px-6 py-28 md:px-12 lg:px-24"
      aria-label="Contact"
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(0,255,135,0.1), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-terminal-green/40" aria-hidden="true" />
            <span className="font-mono text-sm tracking-[0.3em] text-terminal-green/70 uppercase">
              <span className="font-semibold text-terminal-green">{"05"}</span>
              {" / "}
              <span className="font-semibold text-foreground">{"SIGNAL"}</span>
            </span>
          </div>
          <h2 className="font-mono text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl text-balance">
            {"Let's build something"}
            <br />
            <span className="text-terminal-green">{"together."}</span>
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
            {"Currently open for collaboration, freelance work, and full-time opportunities. Always excited to discuss ML, systems architecture, or your next big idea."}
          </p>
        </div>

        {/* Command cards grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((link) => {
            const isHovered = hoveredCard === link.platform
            return (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform === "Email" ? undefined : "_blank"}
                rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
                className="hover-card-lift group relative flex flex-col gap-4 border border-terminal-dim bg-card/50 p-5 hover:border-terminal-green/40 hover:bg-terminal-green/[0.04]"
                onMouseEnter={() => setHoveredCard(link.platform)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-label={`Connect on ${link.platform}`}
              >
                {/* Subtle top border glow on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent, #00FF87, transparent)",
                    opacity: isHovered ? 0.6 : 0,
                  }}
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center size-10 border border-terminal-dim text-muted-foreground transition-all duration-300 group-hover:border-terminal-green/30 group-hover:text-terminal-green">
                    {iconMap[link.platform]}
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-terminal-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-terminal-green/60"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                <div>
                  <h3 className="font-mono text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-terminal-green">
                    {link.platform}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-muted-foreground/60">
                    <span className="text-terminal-green/40">{"$"}</span>
                    {" "}
                    {link.command}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        {/* Bottom status bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Status */}
          {personalInfo.openToOpportunities && (
            <div className="flex items-center gap-4">
              <div className="relative flex items-center gap-2.5 border border-terminal-green/20 bg-terminal-green/5 px-4 py-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-terminal-green opacity-40" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-terminal-green" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-terminal-green uppercase">
                  {"Available"}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-wide text-muted-foreground/40">
                {"avg response: ~24h"}
              </span>
            </div>
          )}

          {/* Direct email */}
          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:text-terminal-green"
          >
            <span className="text-terminal-green/50 transition-colors group-hover:text-terminal-green">{">"}</span>
            {personalInfo.email}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
