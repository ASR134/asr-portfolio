import { personalInfo, socialLinks } from "@/data/portfolio"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative px-6 py-24 md:px-12 lg:px-24"
      aria-label="Contact"
    >
      {/* ASCII divider */}
      <div
        className="mb-16 overflow-hidden font-mono text-sm text-terminal-dim select-none"
        aria-hidden="true"
      >
        {"\u2501".repeat(60)}
      </div>

      <div className="max-w-3xl">
        {/* Heading — pure typography, no effects */}
        <h2 className="font-mono text-6xl font-bold tracking-tighter text-foreground sm:text-8xl lg:text-9xl">
          {"OPEN."}
        </h2>

        {/* Subline */}
        <p className="mt-6 font-mono text-sm text-muted-foreground sm:text-base">
          <span className="text-terminal-green">{">"}</span>
          {" ready to collaborate. drop a signal."}
        </p>

        {/* Social links — minimal, just text brightening on hover */}
        <div className="mt-10 flex flex-col gap-0">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 py-3 font-mono text-xs sm:text-sm"
              style={{ transition: "color 0.15s ease" }}
              aria-label={`Visit ${link.platform}`}
            >
              <span className="text-terminal-green">{"$"}</span>
              <span className="text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                {link.command}
              </span>
            </a>
          ))}
        </div>

        {/* Response time line */}
        <p className="mt-8 font-mono text-xs text-muted-foreground/60">
          <span className="text-terminal-green/50">{">"}</span>
          {" response time: usually within 24h"}
        </p>

        {/* Available badge — simple pulse on dot only */}
        {personalInfo.openToOpportunities && (
          <div className="mt-8 inline-flex items-center gap-3 border border-terminal-green/20 bg-terminal-green/5 px-5 py-2.5">
            <span className="animate-pulse-available size-2.5 rounded-full bg-terminal-green" />
            <span className="font-mono text-xs tracking-widest text-terminal-green uppercase">
              {"AVAILABLE"}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
