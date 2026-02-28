"use client"

import { ExternalLink, Github } from "lucide-react"
import { useRef, useState } from "react"
import type { Project } from "@/data/portfolio"

const tagStyles: Record<string, string> = {
  ml: "bg-surface-2 text-[#00FF87]/90 border-[#00FF87]/20",
  frontend: "bg-surface-2 text-[#A78BFA]/90 border-[#A78BFA]/20",
  backend: "bg-surface-2 text-[#00C2FF]/90 border-[#00C2FF]/20",
  devops: "bg-surface-2 text-[#FFB547]/90 border-[#FFB547]/20",
}

export function ProjectCard({
  title,
  tagline,
  description,
  tags,
  githubUrl,
  demoUrl,
  accentColor,
}: Project) {
  const cardRef = useRef<HTMLElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const y = -(e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    setTilt({ x: x * 4, y: y * 4 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <article
      ref={cardRef}
      className="hover-card-lift group relative flex flex-col overflow-hidden rounded-lg border border-terminal-dim bg-surface-1 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-terminal-green/25"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.015)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        transition: isHovered
          ? "transform 0.1s ease"
          : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
        boxShadow: isHovered
          ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}22, 0 0 40px ${accentColor}10`
          : "0 4px 24px rgba(0,0,0,0.4)",
        willChange: "transform",
      }}
    >
      {/* Inner gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" aria-hidden="true" />

      {/* Scan line on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px opacity-0 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}80, transparent)`,
          opacity: isHovered ? 0.8 : 0,
          animation: isHovered ? "scan-line 1.2s ease-in-out" : "none",
        }}
        aria-hidden="true"
      />

      {/* Corner accent lines */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderTop: `2px solid ${accentColor}60`, borderLeft: `2px solid ${accentColor}60`, borderRadius: "4px 0 0 0" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-10 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderBottom: `2px solid ${accentColor}60`, borderRight: `2px solid ${accentColor}60`, borderRadius: "0 0 4px 0" }}
        aria-hidden="true"
      />

      {/* Abstract visual header */}
      <div className="relative z-[1] h-36 w-full overflow-hidden bg-surface-2">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%, ${accentColor}04 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Accent glow orb — moves on hover via CSS */}
        <div
          className="absolute -bottom-10 -right-10 size-40 rounded-full blur-3xl opacity-15 transition-all duration-500 group-hover:opacity-40 group-hover:-bottom-6 group-hover:-right-6"
          style={{ backgroundColor: accentColor }}
        />
        <div
          className="absolute -top-6 -left-6 size-24 rounded-full blur-2xl opacity-10 transition-all duration-500 group-hover:opacity-25 group-hover:-top-2 group-hover:-left-2"
          style={{ backgroundColor: accentColor }}
        />
        {/* Project letter watermark — scales on hover */}
        <div
          className="absolute bottom-3 right-4 font-mono text-6xl font-bold leading-none select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07]"
          style={{ color: accentColor, opacity: "0.04" }}
        >
          {title.charAt(0)}
        </div>
        {/* Top-left label */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full transition-all duration-300 group-hover:scale-125"
            style={{
              backgroundColor: accentColor,
              boxShadow: isHovered ? `0 0 8px ${accentColor}80` : "none",
            }}
          />
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {"featured project"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[1] flex flex-1 flex-col px-5 pt-5 pb-5">
        {/* Title — color shift on hover */}
        <h3
          className="font-mono text-lg font-bold tracking-tight transition-colors duration-300"
          style={{ color: isHovered ? accentColor : "var(--foreground)" }}
        >
          {title}
        </h3>

        {/* Tagline */}
        <p
          className="mt-1 font-mono text-xs font-medium leading-snug transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p className="mt-3 flex-1 font-mono text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Tags — pop in with stagger on hover */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span
              key={tag.label}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide transition-all duration-200 hover:scale-105 ${tagStyles[tag.category] || "bg-muted text-muted-foreground border-border"}`}
              style={{
                transitionDelay: isHovered ? `${i * 30}ms` : "0ms",
                transform: isHovered ? "translateY(0)" : "translateY(0)",
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-btn-glow group/btn inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 font-mono text-[11px] font-medium tracking-wide uppercase"
              style={{
                backgroundColor: `var(--surface-2)`,
                color: accentColor,
                border: `1px solid ${accentColor}35`,
                transition: "background-color 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `var(--surface-3)`
                e.currentTarget.style.borderColor = `${accentColor}60`
                e.currentTarget.style.boxShadow = `0 0 16px ${accentColor}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `var(--surface-2)`
                e.currentTarget.style.borderColor = `${accentColor}35`
                e.currentTarget.style.boxShadow = `none`
              }}
              aria-label={`View live demo of ${title}`}
            >
              <ExternalLink className="size-3 transition-transform duration-200 group-hover/btn:rotate-12" />
              {"Live Demo"}
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-btn-glow group/btn inline-flex items-center gap-1.5 rounded-md border border-terminal-dim bg-surface-2 px-3.5 py-2 font-mono text-[11px] font-medium tracking-wide text-muted-foreground hover:border-foreground/20 hover:bg-surface-3 hover:text-foreground uppercase"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github className="size-3 transition-transform duration-200 group-hover/btn:rotate-12" />
            {"Source"}
          </a>
        </div>
      </div>
    </article>
  )
}