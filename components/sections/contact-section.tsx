"use client"

import { personalInfo, socialLinks } from "@/data/portfolio"
import { useEffect, useRef, useState } from "react"

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LinkedIn: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  "X / Twitter": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
}

const platformColors: Record<string, { color: string; glow: string; dim: string }> = {
  GitHub:       { color: "#ffffff",  glow: "rgba(255,255,255,0.15)", dim: "rgba(255,255,255,0.06)" },
  LinkedIn:     { color: "#0A66C2",  glow: "rgba(10,102,194,0.2)",  dim: "rgba(10,102,194,0.07)"  },
  "X / Twitter":{ color: "#e7e9ea",  glow: "rgba(231,233,234,0.15)",dim: "rgba(231,233,234,0.05)" },
  Email:        { color: "#00FF87",  glow: "rgba(0,255,135,0.2)",   dim: "rgba(0,255,135,0.07)"   },
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  const lines = [
    "> initializing contact protocol...",
    "> scanning available channels... [4 found]",
    "> encryption: end-to-end",
    "> status: READY TO CONNECT",
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    lines.forEach((line, i) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, line])
      }, 400 + i * 350)
    })
  }, [visible])

  return (
    <section
      id="contact"
      className="relative px-6 py-28 md:px-12 lg:px-24 overflow-hidden"
      aria-label="Contact"
    >
      {/* Large background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,255,135,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      {/* Top fade line */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-px -z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,135,0.2), transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl" ref={sectionRef}>

        {/* ── Section label ── */}
        <div
          className="mb-10 flex items-center justify-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="h-px flex-1 bg-terminal-green/20" />
          <span className="font-mono text-xs tracking-[0.3em] text-terminal-green/60 uppercase">
            <span className="text-terminal-green font-semibold">05</span>
            {" / "}
            <span className="text-foreground/70 font-semibold">SIGNAL</span>
          </span>
          <div className="h-px flex-1 bg-terminal-green/20" />
        </div>

        {/* ── Main CTA block ── */}
        <div
          className="mb-14 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
          }}
        >
          <h2 className="font-mono text-5xl font-bold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
            {"Let's build"}
            <br />
            <span
              className="relative inline-block text-terminal-green"
              style={{ textShadow: "0 0 60px rgba(0,255,135,0.35), 0 0 120px rgba(0,255,135,0.15)" }}
            >
              {"something"}
              {/* underline glow */}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #00FF87, transparent)",
                  opacity: visible ? 0.6 : 0,
                  transition: "opacity 0.6s ease 0.8s",
                }}
                aria-hidden="true"
              />
            </span>
            {" "}
            <span className="text-foreground/30">{"together."}</span>
          </h2>

          <p
            className="mt-6 mx-auto max-w-md font-mono text-sm leading-relaxed text-muted-foreground/70"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.35s",
            }}
          >
            {"Open for collaboration & freelance work.     Always excited to talk ML."}
          </p>
        </div>

        {/* ── Terminal readout ──
        <div
          className="mb-10 mx-auto max-w-lg rounded-xl border border-terminal-green/10 bg-surface-1 px-5 py-4 font-mono text-xs"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.5s",
            boxShadow: "0 0 0 1px rgba(0,255,135,0.04), inset 0 1px 0 rgba(0,255,135,0.04)",
          }} */}
        {/* > */}
          {/* Terminal title bar
          <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/[0.05]">
            <span className="size-2.5 rounded-full bg-red-500/50" />
            <span className="size-2.5 rounded-full bg-yellow-500/50" />
            <span className="size-2.5 rounded-full bg-green-500/50" />
            <span className="ml-3 text-[9px] tracking-widest text-white/20 uppercase">contact.sh</span>
          </div>
          <div className="space-y-1.5 min-h-[80px]">
            {terminalLines.map((line, i) => (
              <p key={i} className="flex items-start gap-2">
                <span
                  className="shrink-0"
                  style={{ color: line.includes("READY") ? "#00FF87" : "rgba(0,255,135,0.4)" }}
                >
                  {line.startsWith(">") ? "›" : " "}
                </span>
                <span
                  style={{ color: line.includes("READY") ? "#00FF87" : "rgba(255,255,255,0.45)" }}
                >
                  {line.replace(/^> /, "")}
                </span>
              </p>
            ))}
            {terminalLines.length < lines.length && (
              <span className="inline-block w-2 h-3 bg-terminal-green/70 animate-pulse ml-4" aria-hidden="true" />
            )}
          </div>
        </div> */}

        {/* ── Social cards ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {socialLinks.map((link, i) => {
            const isHovered = hoveredCard === link.platform
            const palette = platformColors[link.platform] ?? platformColors.Email

            return (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform === "Email" ? undefined : "_blank"}
                rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
                className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl border p-5"
                onMouseEnter={() => setHoveredCard(link.platform)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-label={`Connect on ${link.platform}`}
                style={{
                  borderColor: isHovered ? `${palette.color}30` : "rgba(255,255,255,0.06)",
                  background: isHovered
                    ? `linear-gradient(145deg, ${palette.dim}, rgba(10,14,20,0.98))`
                    : "linear-gradient(145deg, rgba(15,21,30,0.9), rgba(10,14,20,0.98))",
                  boxShadow: isHovered
                    ? `0 0 0 1px ${palette.color}20, 0 8px 40px ${palette.glow}, inset 0 1px 0 ${palette.color}10`
                    : "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.4)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
                  transition: `opacity 0.5s ease ${i * 80 + 300}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 80 + 300}ms, border-color 0.3s, background 0.3s, box-shadow 0.3s`,
                }}
              >
                {/* Top shimmer on hover */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${palette.color}, transparent)`,
                    opacity: isHovered ? 0.7 : 0,
                  }}
                  aria-hidden="true"
                />

                {/* Icon row */}
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center justify-center size-11 rounded-lg border"
                    style={{
                      borderColor: isHovered ? `${palette.color}30` : "rgba(255,255,255,0.07)",
                      background: isHovered ? `${palette.dim}` : "rgba(255,255,255,0.03)",
                      color: isHovered ? palette.color : "rgba(255,255,255,0.4)",
                      transform: isHovered ? "scale(1.08) rotate(-4deg)" : "scale(1) rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.3s, border-color 0.3s, background 0.3s",
                      filter: isHovered ? `drop-shadow(0 0 8px ${palette.color}60)` : "none",
                    }}
                  >
                    {iconMap[link.platform]}
                  </div>

                  {/* Arrow */}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      color: isHovered ? palette.color : "rgba(255,255,255,0.15)",
                      transform: isHovered ? "translate(3px,-3px)" : "translate(0,0)",
                      transition: "transform 0.25s ease, color 0.3s",
                    }}
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="font-mono text-sm font-semibold tracking-wide mb-1"
                    style={{
                      color: isHovered ? palette.color : "rgba(255,255,255,0.85)",
                      transition: "color 0.3s",
                      textShadow: isHovered ? `0 0 20px ${palette.glow}` : "none",
                    }}
                  >
                    {link.platform}
                  </p>
                  <p className="font-mono text-[10px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
                    <span style={{ color: isHovered ? palette.color : "rgba(0,255,135,0.3)" }}>{"$"}</span>
                    {" "}
                    {link.command}
                  </p>
                </div>
              </a>
            )
          })}
        </div>

        {/* ── Bottom status bar ── */}
        <div
          className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/[0.05] bg-surface-1 px-6 py-4 sm:flex-row"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
            boxShadow: "inset 0 1px 0 rgba(0,255,135,0.04)",
          }}
        >
          {personalInfo.openToOpportunities && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 rounded-md border border-terminal-green/25 bg-terminal-green/5 px-3.5 py-1.5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-terminal-green opacity-50" />
                  <span className="relative inline-flex size-2 rounded-full bg-terminal-green" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-terminal-green uppercase font-semibold">
                  Available
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-wide text-white/20">
                avg response: ~24h
              </span>
            </div>
          )}

          <a
            href={`mailto:${personalInfo.email}`}
            className="group flex items-center gap-2 font-mono text-xs text-white/30 transition-all duration-200 hover:text-terminal-green"
          >
            <span className="text-terminal-green/40 group-hover:text-terminal-green transition-colors duration-200">{"›"}</span>
            <span className="underline decoration-white/10 decoration-dashed underline-offset-4 group-hover:decoration-terminal-green/40 transition-all">
              {personalInfo.email}
            </span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}