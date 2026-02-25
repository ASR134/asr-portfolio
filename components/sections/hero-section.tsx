"use client"

import { personalInfo, techStackLine } from "@/data/portfolio"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center px-6 py-32 md:px-12 lg:px-24"
      aria-label="Introduction"
    >
      <div className="relative z-10 max-w-4xl">
        {/* Boot sequence lines */}
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
            <span className="text-terminal-green">
              {"Available for hire "}
            </span>
            <span className="text-terminal-green" aria-hidden="true">
              {"[OK]"}
            </span>
          </p>
        </div>

        {/* Name - large, left-aligned, mono, green */}
        <h1 className="animate-line-reveal delay-1300">
          <span className="block font-mono text-5xl font-bold tracking-tighter text-terminal-green sm:text-7xl lg:text-8xl">
            {personalInfo.name.split(" ")[0]}
          </span>
          <span className="mt-1 block font-mono text-5xl font-bold tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
            {personalInfo.name.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        {/* Role with blinking cursor */}
        <p className="animate-line-reveal delay-1500 mt-6 font-mono text-base text-muted-foreground sm:text-lg">
          {personalInfo.role}
          <span
            className="animate-blink ml-0.5 inline-block h-[1.1em] w-[10px] translate-y-[2px] bg-terminal-green"
            aria-hidden="true"
          />
        </p>

        {/* Tech stack as terminal command */}
        <p className="animate-line-reveal delay-1700 mt-6 font-mono text-xs tracking-wide text-muted-foreground sm:text-sm">
          <span className="text-terminal-green">{"$ "}</span>
          <span className="text-secondary-foreground">
            {"stack: "}
          </span>
          {techStackLine}
        </p>

        {/* CTA buttons as terminal commands */}
        <div className="animate-line-reveal delay-1900 mt-10 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 border border-terminal-green bg-terminal-green/5 px-5 py-3 font-mono text-xs tracking-wider text-terminal-green transition-all hover:bg-terminal-green/15 sm:text-sm uppercase"
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
            className="group inline-flex items-center gap-2 border border-terminal-dim px-5 py-3 font-mono text-xs tracking-wider text-muted-foreground transition-all hover:border-terminal-cyan hover:text-terminal-cyan sm:text-sm uppercase"
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
