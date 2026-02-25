import { personalInfo, techStackLine } from "@/data/portfolio"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center px-6 py-32 md:px-12 lg:px-24"
      aria-label="Introduction"
    >
      {/* Subtle radial glow behind name */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(0,255,135,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Boot sequence */}
        <div className="mb-8 flex flex-col gap-2 font-mono text-sm text-muted-foreground">
          <p className="animate-line-reveal delay-100">
            <span className="text-terminal-green">{">"}</span>
            {" Initializing..."}
          </p>
          <p className="animate-line-reveal delay-500">
            <span className="text-terminal-green">{">"}</span>
            {" Loading "}
            <span className="text-foreground">{personalInfo.name}</span>
            {"..."}
          </p>
          <p className="animate-line-reveal delay-900">
            <span className="text-terminal-green">{">"}</span>
            {" Status: "}
            <span
              className="animate-hire-pulse inline-flex items-center border border-terminal-green/40 px-2 py-0.5 font-mono text-sm text-terminal-green"
              aria-label="Available for hire"
            >
              {"\u258C AVAILABLE FOR HIRE \u2590"}
            </span>
          </p>
        </div>

        {/* Name — tight unit, leading-none */}
        <h1 className="animate-line-reveal delay-1300 leading-none">
          <span className="block font-mono text-5xl font-bold tracking-tighter text-terminal-green sm:text-7xl md:text-8xl lg:text-9xl">
            {personalInfo.name.split(" ")[0]}
          </span>
          <span className="block font-mono text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
            {personalInfo.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Role */}
        <p className="animate-line-reveal delay-1500 mt-6 font-mono text-base text-muted-foreground sm:text-lg">
          {personalInfo.role}
          <span
            className="animate-blink ml-0.5 inline-block h-[1.1em] w-[10px] translate-y-[2px] bg-terminal-green"
            aria-hidden="true"
          />
        </p>

        {/* Stack */}
        <p className="animate-line-reveal delay-1700 mt-6 font-mono text-xs tracking-wide text-muted-foreground sm:text-sm">
          <span className="text-terminal-green">{"$ "}</span>
          <span className="text-secondary-foreground">{"stack: "}</span>
          {techStackLine}
        </p>

        {/* CTAs */}
        <div className="animate-line-reveal delay-1900 mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="hero-btn-pulse group inline-flex items-center gap-2 border border-terminal-green bg-terminal-green/5 px-6 py-3.5 font-mono text-xs tracking-wider text-terminal-green transition-all hover:bg-terminal-green/15 sm:text-sm uppercase"
          >
            <span className="text-terminal-green/60 transition-colors group-hover:text-terminal-green">
              {"["}
            </span>
            {"RUN: view_work"}
            <span className="text-terminal-green/60 transition-colors group-hover:text-terminal-green">
              {"]"}
            </span>
          </a>
          <a
            href={personalInfo.resumeUrl}
            className="group inline-flex items-center gap-2 border border-terminal-dim px-6 py-3.5 font-mono text-xs tracking-wider text-muted-foreground transition-all hover:border-terminal-cyan hover:text-terminal-cyan sm:text-sm uppercase"
          >
            <span className="opacity-60 transition-opacity group-hover:opacity-100">
              {"["}
            </span>
            {"GET: resume.pdf"}
            <span className="opacity-60 transition-opacity group-hover:opacity-100">
              {"]"}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
