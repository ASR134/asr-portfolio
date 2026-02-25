"use client"

import { personalInfo, techStackLine, leetcode } from "@/data/portfolio"

const terminalLines = [
  { type: "cmd" as const, text: "$ whoami" },
  { type: "out" as const, text: "> ML Engineer + Problem Solver" },
  { type: "cmd" as const, text: "$ cat skills.txt" },
  { type: "out" as const, text: "> Python, C++, NumPy, Pandas," },
  { type: "out" as const, text: "  FastAPI, Streamlit, scikit-learn" },
  { type: "cmd" as const, text: "$ leetcode --stats" },
  { type: "out" as const, text: `> solved: ${leetcode.profile.solved}  rating: ${leetcode.profile.contestRating}` },
  { type: "out" as const, text: `  streak: ${leetcode.profile.maxStreak}d  rank: ${leetcode.profile.contestPercentile.toLowerCase()}` },
  { type: "cmd" as const, text: "$ status --check" },
  { type: "out" as const, text: "> \u25CF open to internships & projects" },
]

const floatingPills = [
  { label: `${leetcode.profile.solved} Solved`, icon: "\u2606", delay: "0s", top: "12%", right: "-32px" },
  { label: leetcode.profile.contestPercentile, icon: "\u26A1", delay: "0.7s", top: "40%", right: "-40px" },
  { label: `${leetcode.profile.maxStreak}d Streak`, icon: "\u2605", delay: "1.4s", top: "68%", right: "-28px" },
]

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center px-6 py-32 md:px-12 lg:px-24"
      aria-label="Introduction"
    >
      <div className="relative z-10 flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* LEFT COLUMN — 60% */}
        <div className="flex-[3] lg:max-w-[60%]">
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

          {/* Name */}
          <h1 className="animate-line-reveal delay-1300">
            <span className="block font-mono text-5xl font-bold tracking-tighter text-terminal-green sm:text-7xl lg:text-8xl">
              {personalInfo.name.split(" ")[0]}
            </span>
            <span className="mt-1 block font-mono text-5xl font-bold tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
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

        {/* RIGHT COLUMN — 40%: Floating Terminal */}
        <div className="relative flex-[2] lg:max-w-[40%]">
          {/* Floating stat pills */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            {floatingPills.map((pill) => (
              <div
                key={pill.label}
                className="animate-float-pill absolute z-20 flex items-center gap-1.5 border border-terminal-green/25 bg-[#050A0F]/80 px-3 py-1.5 font-mono text-[10px] tracking-wider text-terminal-green backdrop-blur-sm"
                style={{
                  top: pill.top,
                  right: pill.right,
                  animationDelay: pill.delay,
                }}
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </div>
            ))}
          </div>

          {/* Terminal window */}
          <div
            className="terminal-window relative overflow-hidden border border-terminal-green/25 bg-terminal-green/[0.03] lg:[transform:perspective(1000px)_rotateY(-3deg)_rotateX(2deg)] lg:hover:[transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)]"
            style={{ transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-terminal-green/15 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#FF5F56]" />
                <span className="size-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="size-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                {"terminal v2.1"}
              </span>
            </div>

            {/* Terminal body */}
            <div className="px-4 py-4 font-mono text-xs leading-relaxed sm:text-sm">
              {terminalLines.map((line, i) => (
                <p
                  key={i}
                  className="animate-terminal-typeout"
                  style={{
                    animationDelay: `${1.8 + i * 0.35}s`,
                    opacity: 0,
                  }}
                >
                  {line.type === "cmd" ? (
                    <span className="text-terminal-green">{line.text}</span>
                  ) : (
                    <span className="text-[#8892a4]">{line.text}</span>
                  )}
                </p>
              ))}

              {/* Blinking cursor at bottom */}
              <p
                className="mt-2 animate-terminal-typeout"
                style={{
                  animationDelay: `${1.8 + terminalLines.length * 0.35}s`,
                  opacity: 0,
                }}
              >
                <span className="animate-blink inline-block bg-terminal-green text-terminal-green">
                  {"\u2588"}
                </span>
                <span className="animate-blink ml-0.5 text-muted-foreground">{"_"}</span>
              </p>
            </div>

            {/* Subtle box shadow glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "0 0 40px rgba(0,255,135,0.08)" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
