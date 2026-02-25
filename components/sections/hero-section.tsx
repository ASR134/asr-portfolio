"use client"

import { personalInfo, techStackLine } from "@/data/portfolio"
import { useEffect, useState } from "react"

const bootLines = [
  { text: "booting system...", delay: 0 },
  { text: "loading modules...", delay: 400 },
  { text: "establishing connection...", delay: 800 },
  { text: `user: ${personalInfo.name.toLowerCase().replace(" ", "_")} [verified]`, delay: 1200 },
  { text: "status: online", delay: 1600 },
]

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay))
    })
    timers.push(setTimeout(() => setShowContent(true), 2000))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center px-6 py-32 md:px-12 lg:px-24"
      aria-label="Introduction"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-[500px] w-[500px] rounded-full opacity-35 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(0,255,135,0.16), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[300px] w-[300px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(0,194,255,0.14), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Geometric accent */}
      <div className="pointer-events-none absolute right-8 top-1/4 hidden select-none lg:block" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-[0.07]">
          <rect x="10" y="10" width="100" height="100" stroke="#00FF87" strokeWidth="0.5" />
          <rect x="25" y="25" width="70" height="70" stroke="#00FF87" strokeWidth="0.5" />
          <rect x="40" y="40" width="40" height="40" stroke="#00FF87" strokeWidth="0.5" />
          <line x1="10" y1="10" x2="40" y2="40" stroke="#00FF87" strokeWidth="0.3" />
          <line x1="110" y1="10" x2="80" y2="40" stroke="#00FF87" strokeWidth="0.3" />
          <line x1="10" y1="110" x2="40" y2="80" stroke="#00FF87" strokeWidth="0.3" />
          <line x1="110" y1="110" x2="80" y2="80" stroke="#00FF87" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Terminal boot sequence */}
        <div className="mb-10 flex flex-col gap-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
          {bootLines.map((line, i) => (
            <p
              key={i}
              className="transition-all duration-300"
              style={{
                opacity: visibleLines > i ? 1 : 0,
                transform: visibleLines > i ? "translateY(0)" : "translateY(4px)",
              }}
            >
              <span className="text-terminal-green/70">{">"}</span>
              {" "}
              {i === 4 ? (
                <>
                  {"status: "}
                  <span className="text-terminal-green">{"online"}</span>
                </>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>

        {/* Main content - fades in after boot */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {/* Available tag */}
          <div className="mb-6 inline-flex items-center gap-2.5 border border-terminal-green/20 bg-terminal-green/5 px-3.5 py-1.5">
            <span className="animate-pulse-available size-2 rounded-full bg-terminal-green" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-terminal-green uppercase">
              {"Available for hire"}
            </span>
          </div>

          {/* Name */}
          <h1 className="leading-[0.9]">
            <span className="block font-mono text-5xl font-bold tracking-tighter text-terminal-green sm:text-7xl md:text-8xl lg:text-[7rem]">
              {personalInfo.name.split(" ")[0]}
            </span>
            <span className="mt-1 block font-mono text-5xl font-bold tracking-tighter text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]">
              {personalInfo.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* Tagline */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-terminal-green/40" aria-hidden="true" />
            <p className="font-mono text-sm tracking-wide text-muted-foreground sm:text-base">
              {personalInfo.role.split(" / ").map((part, i, arr) => (
                <span key={part}>
                  <span className="text-secondary-foreground">{part}</span>
                  {i < arr.length - 1 && (
                    <span className="mx-2 text-terminal-dim">{"/"}</span>
                  )}
                </span>
              ))}
              <span
                className="animate-blink ml-1 inline-block h-[1em] w-[8px] translate-y-[1px] bg-terminal-green"
                aria-hidden="true"
              />
            </p>
          </div>

          {/* Stack */}
          <p className="mt-5 font-mono text-xs tracking-wide text-muted-foreground/60 sm:text-sm">
            <span className="text-terminal-green/50">{"$ "}</span>
            {techStackLine}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="hero-cta-primary hover-btn-glow group relative inline-flex items-center gap-2.5 overflow-hidden border border-terminal-green/60 bg-terminal-green/10 px-7 py-3.5 font-mono text-xs tracking-widest text-terminal-green hover:border-terminal-green hover:bg-terminal-green/20 hover:shadow-[0_0_24px_rgba(0,255,135,0.18)] sm:text-sm uppercase"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                {"View Work"}
              </span>
            </a>
            <a
              href={personalInfo.resumeUrl}
              className="hover-btn-glow group inline-flex items-center gap-2.5 border border-terminal-dim px-7 py-3.5 font-mono text-xs tracking-widest text-muted-foreground hover:border-terminal-cyan/50 hover:text-terminal-cyan hover:shadow-[0_0_20px_rgba(0,194,255,0.12)] sm:text-sm uppercase"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-y-0.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {"Resume"}
            </a>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 flex items-center gap-2 text-muted-foreground/40">
            <div className="h-8 w-px bg-terminal-dim" aria-hidden="true" />
            <span className="font-mono text-[10px] tracking-widest uppercase">{"scroll"}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce opacity-50">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
