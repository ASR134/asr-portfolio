"use client"

import { personalInfo, socialLinks } from "@/data/portfolio"

const contactInfo = [
  { icon: "\u25C8", label: "India" },
  { icon: "\u25B7", label: "B.Tech CSE" },
  { icon: "\u25CF", label: "Open to Internships" },
  { icon: "\u2606", label: "LeetCode Top 33%" },
]

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#080E14] px-6 py-24 md:px-12 lg:px-24"
      aria-label="Contact"
    >
      {/* Background dot grid (slightly more visible) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #1A2A36 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.55,
        }}
        aria-hidden="true"
      />

      {/* Huge watermark */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 -rotate-[15deg] select-none font-mono text-[20rem] font-bold leading-none tracking-tighter text-foreground opacity-[0.02] sm:text-[28rem]"
        aria-hidden="true"
      >
        {"OPEN"}
      </div>

      {/* ASCII divider */}
      <div
        className="relative z-10 mb-16 overflow-hidden font-mono text-sm text-terminal-dim select-none"
        aria-hidden="true"
      >
        {"\u2501".repeat(60)}
      </div>

      <div className="relative z-10 flex flex-col gap-16 lg:flex-row lg:gap-20">
        {/* LEFT COLUMN -- Terminal text */}
        <div className="flex-[3]">
          {/* OPEN. heading with glitch */}
          <h2 className="glitch-text relative inline-block font-mono text-6xl font-bold tracking-tighter text-foreground sm:text-8xl lg:text-9xl" data-text="OPEN.">
            {"OPEN."}
          </h2>

          {/* Subline */}
          <p className="mt-6 font-mono text-sm text-muted-foreground sm:text-base">
            <span className="text-terminal-green">{">"}</span>
            {" ready to collaborate. drop a signal."}
          </p>

          {/* Social links as interactive rows */}
          <div className="mt-10 flex flex-col border-t border-terminal-green/8">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row group flex items-center justify-between border-b border-terminal-green/8 py-3.5 font-mono text-xs transition-all duration-200 sm:text-sm"
                aria-label={`Visit ${link.platform}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-terminal-green/50 transition-colors duration-200 group-hover:text-terminal-green">
                    {"$"}
                  </span>
                  <span className="text-muted-foreground transition-colors duration-200 group-hover:text-terminal-cyan">
                    {link.command}
                  </span>
                </div>
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="max-w-0 truncate font-mono text-[11px] text-terminal-green/60 opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
                    {link.url.replace("https://", "").replace("mailto:", "")}
                  </span>
                  <span className="text-terminal-green/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-terminal-green">
                    {"\u2192"}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Available badge with sonar pulse */}
          {personalInfo.openToOpportunities && (
            <div className="mt-12 inline-flex items-center gap-3 border border-terminal-green/20 bg-terminal-green/5 px-5 py-2.5">
              <span className="sonar-dot relative">
                <span className="size-2.5 block rounded-full bg-terminal-green" />
              </span>
              <span className="font-mono text-xs tracking-widest text-terminal-green uppercase">
                {"AVAILABLE"}
              </span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN -- Contact card */}
        <div className="flex-[2]">
          <div className="contact-card-breathe border border-terminal-green/15 bg-terminal-green/[0.03] p-6 backdrop-blur-md sm:p-8">
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center border border-terminal-green/40 font-mono text-lg font-bold text-terminal-green">
                {personalInfo.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">
                  {personalInfo.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {"ML Engineer"}
                </p>
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase">
                  {"G.P.U.A&T"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-terminal-green/10" />

            {/* Info rows */}
            <div className="flex flex-col gap-2.5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                  <span className="text-terminal-green/50">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-5 h-px bg-terminal-green/10" />

            {/* Download resume button */}
            <a
              href={personalInfo.resumeUrl}
              className="group flex w-full items-center justify-center border border-terminal-green/40 bg-transparent py-3 font-mono text-xs tracking-wider text-terminal-green transition-all duration-200 hover:bg-terminal-green hover:text-[#050A0F] uppercase"
            >
              {"[ DOWNLOAD RESUME ]"}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
