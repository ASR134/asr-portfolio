"use client"

import { personalInfo } from "@/data/portfolio"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const bootLines = [
  { text: "booting system...", delay: 200 },
  { text: "loading modules...", delay: 1000 },
  { text: "establishing connection...", delay: 1400 },
  { text: `user: ${personalInfo.name.toLowerCase().replace(" ", "_")} [verified]`, delay: 1800 },
  { text: "status: online", delay: 2200 },
]

function AnimatedName({ text, color }: { text: string; color: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2900)
    return () => clearTimeout(t)
  }, [])

  return (
    <span style={{ color }} className="block font-mono text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-[7rem]">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(30px) rotateX(-40deg)",
            transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 40}ms`,
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showTag, setShowTag] = useState(false)
  const [showProfilePic, setShowProfilePic] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showCTAs, setShowCTAs] = useState(false)
  const primaryBtnRef = useRef<HTMLAnchorElement>(null)
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    bootLines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay))
    })
    timers.push(setTimeout(() => setShowContent(true), 2800))
    timers.push(setTimeout(() => setShowTag(true), 2850))
    timers.push(setTimeout(() => setShowProfilePic(true), 2870))
    timers.push(setTimeout(() => setShowTagline(true), 3200))
    timers.push(setTimeout(() => setShowCTAs(true), 3500))
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleMagnet = (e: React.MouseEvent, ref: React.RefObject<HTMLAnchorElement | null>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`
  }
  const resetMagnet = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    if (!ref.current) return
    ref.current.style.transform = ""
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[88dvh] flex-col items-center justify-center gap-6 px-6 py-20 md:px-12 md:py-24 lg:px-24"
      aria-label="Introduction"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/3 -z-10 h-[350px] w-[350px] rounded-full opacity-25 blur-[100px] animate-float-gentle"
        style={{ background: "radial-gradient(circle, rgba(0,255,135,0.12), transparent 70%)", animationDuration: "6s" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 top-1/2 -z-10 h-[200px] w-[200px] rounded-full opacity-20 blur-[80px] animate-float-gentle"
        style={{ background: "radial-gradient(circle, rgba(0,194,255,0.1), transparent 70%)", animationDuration: "8s", animationDelay: "1s" }}
        aria-hidden="true"
      />

      {/* Geometric accent */}
      <div className="pointer-events-none absolute right-8 top-1/4 hidden select-none lg:block animate-geo-spin" style={{ animationDuration: "30s" }} aria-hidden="true">
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

      {/* Second geometric accent */}
      <div className="pointer-events-none absolute left-8 bottom-1/4 hidden select-none lg:block animate-geo-spin" style={{ animationDuration: "40s", animationDirection: "reverse" }} aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="opacity-[0.05]">
          <circle cx="40" cy="40" r="35" stroke="#00C2FF" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="20" stroke="#00C2FF" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="5" stroke="#00C2FF" strokeWidth="0.5" />
          <line x1="40" y1="5" x2="40" y2="75" stroke="#00C2FF" strokeWidth="0.3" />
          <line x1="5" y1="40" x2="75" y2="40" stroke="#00C2FF" strokeWidth="0.3" />
        </svg>
      </div>

      {/* ── BOOT LINES: full-width, truly centered ── */}
      <div className="relative z-10 w-full flex flex-col items-center gap-1.5 font-mono text-xs text-muted-foreground sm:text-sm">
        {bootLines.map((line, i) => (
          <p
            key={i}
            style={{
              opacity: visibleLines > i ? 1 : 0,
              transform: visibleLines > i ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <span className="text-terminal-green/70">{">"}</span>
            {" "}
            {i === 4 ? (
              <>{"status: "}<span className="text-terminal-green">{"online"}</span></>
            ) : (
              line.text
            )}
          </p>
        ))}
      </div>

      {/* ── AVAILABLE FOR HIRE: full-width, truly centered ── */}
      <div className="relative z-10 w-full flex justify-center">
        <div
          className="inline-flex items-center gap-2.5 rounded-md border border-terminal-green/25 bg-surface-1 px-3.5 py-1.5"
          style={{
            opacity: showTag ? 1 : 0,
            transform: showTag ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span className="animate-pulse-available size-2 rounded-full bg-terminal-green" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-terminal-white uppercase">
            {"Available for hire"}
          </span>
        </div>
      </div>

      {/* ── PIC + CONTENT: shifted right as a unit ── */}
      <div
        className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-14"
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.6s ease",
          transform: "translateX(6%)",
        }}
      >
        {/* LEFT — Profile picture */}
        <div
          className="flex-shrink-0"
          style={{
            opacity: showProfilePic ? 1 : 0,
            transform: showProfilePic ? "translateX(0) scale(1)" : "translateX(-24px) scale(0.95)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-terminal-green/20 bg-surface-1"
            style={{
              width: "240px",
              height: "300px",
              boxShadow: "0 0 0 1px rgba(0,255,135,0.08), 0 16px 48px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,135,0.07)",
            }}
          >
            <span className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-terminal-green/50 z-10" aria-hidden="true" />
            <span className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-terminal-green/50 z-10" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-terminal-green/50 z-10" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-terminal-green/50 z-10" aria-hidden="true" />
            <Image
              src="/profile_pic.png"
              alt={`${personalInfo.name} profile picture`}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* RIGHT — Name, tagline, CTAs */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Name */}
          <h1 className="leading-[0.9]" style={{ perspective: "600px" }}>
            <AnimatedName text={personalInfo.name.split(" ")[0]} color="var(--terminal-green)" />
            <AnimatedName text={personalInfo.name.split(" ").slice(1).join(" ")} color="var(--foreground)" />
          </h1>

          {/* Tagline */}
          <div
            className="mt-6 flex items-center justify-center gap-3 lg:justify-start"
            style={{
              opacity: showTagline ? 1 : 0,
              transform: showTagline ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <div className="h-px w-8 bg-terminal-green/40" aria-hidden="true" />
            <p className="font-mono text-sm tracking-wide text-muted-foreground sm:text-base">
              {personalInfo.role.split(" / ").map((part, i, arr) => (
                <span key={part}>
                  <span className="text-secondary-foreground">{part}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-terminal-dim">{"/"}</span>}
                </span>
              ))}
              <span className="animate-blink ml-1 inline-block h-[1em] w-[8px] translate-y-[1px] bg-terminal-green" aria-hidden="true" />
            </p>
            <div className="h-px w-8 bg-terminal-green/40" aria-hidden="true" />
          </div>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            style={{
              opacity: showCTAs ? 1 : 0,
              transform: showCTAs ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            <a
              ref={primaryBtnRef}
              href="#projects"
              className="hero-cta-primary hover-btn-glow group relative inline-flex items-center gap-2.5 overflow-hidden rounded-md border border-terminal-green/50 bg-surface-1 px-7 py-3.5 font-mono text-xs tracking-widest text-terminal-green hover:border-terminal-green hover:bg-surface-2 hover:shadow-[0_0_24px_rgba(0,255,135,0.18)] sm:text-sm uppercase"
              style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease" }}
              onMouseMove={(e) => handleMagnet(e, primaryBtnRef)}
              onMouseLeave={() => resetMagnet(primaryBtnRef)}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-terminal-green/8 to-transparent transition-transform duration-700 group-hover:translate-x-full" aria-hidden="true" />
              <span className="relative z-10 flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                {"View Work"}
              </span>
            </a>
            <a
              ref={secondaryBtnRef}
              href={personalInfo.resumeUrl}
              className="hover-btn-glow group inline-flex items-center gap-2.5 rounded-md border border-terminal-dim bg-surface-1 px-7 py-3.5 font-mono text-xs tracking-widest text-muted-foreground hover:border-terminal-cyan/50 hover:bg-surface-2 hover:text-terminal-cyan hover:shadow-[0_0_20px_rgba(0,194,255,0.12)] sm:text-sm uppercase"
              style={{ transition: "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease" }}
              onMouseMove={(e) => handleMagnet(e, secondaryBtnRef)}
              onMouseLeave={() => resetMagnet(secondaryBtnRef)}
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
          <div
            className="mt-10 flex items-center justify-center gap-2 text-muted-foreground/40 lg:justify-start"
            style={{
              opacity: showCTAs ? 1 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
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