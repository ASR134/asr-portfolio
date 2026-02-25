"use client"

import { ExternalLink, Github } from "lucide-react"
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
  return (
    <article
      className="hover-card-lift group relative flex flex-col overflow-hidden rounded-lg border border-terminal-dim bg-surface-1 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-terminal-green/25"
    >
      {/* Inner gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 rounded-lg bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" aria-hidden="true" />
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: "0 0 40px rgba(0,255,135,0.06)" }} aria-hidden="true" />
      {/* Abstract visual header — solid surface, no grid */}
      <div className="relative z-[1] h-36 w-full overflow-hidden bg-surface-2">
        {/* Subtle top-to-bottom gradient for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}08 0%, transparent 50%, ${accentColor}04 100%)`,
          }}
          aria-hidden="true"
        />
        {/* Accent glow orb */}
        <div
          className="absolute -bottom-10 -right-10 size-40 rounded-full blur-3xl opacity-15 transition-opacity duration-500 group-hover:opacity-30"
          style={{ backgroundColor: accentColor }}
        />
        {/* Second smaller orb */}
        <div
          className="absolute -top-6 -left-6 size-24 rounded-full blur-2xl opacity-10 transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: accentColor }}
        />
        {/* Project number watermark */}
        <div
          className="absolute bottom-3 right-4 font-mono text-6xl font-bold leading-none opacity-[0.04] select-none"
          style={{ color: accentColor }}
        >
          {title.charAt(0)}
        </div>
        {/* Top-left label */}
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <span
            className="inline-block size-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {"featured project"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[1] flex flex-1 flex-col px-5 pt-5 pb-5">
        {/* Title */}
        <h3 className="font-mono text-lg font-bold tracking-tight text-foreground">
          {title}
        </h3>

        {/* Tagline */}
        <p
          className="mt-1 font-mono text-xs font-medium leading-snug"
          style={{ color: accentColor, opacity: 0.7 }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p className="mt-3 flex-1 font-mono text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide ${tagStyles[tag.category] || "bg-muted text-muted-foreground border-border"}`}
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
              className="hover-btn-glow inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 font-mono text-[11px] font-medium tracking-wide uppercase"
              style={{
                backgroundColor: `var(--surface-2)`,
                color: accentColor,
                border: `1px solid ${accentColor}35`,
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
              <ExternalLink className="size-3" />
              {"Live Demo"}
            </a>
          )}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-btn-glow inline-flex items-center gap-1.5 rounded-md border border-terminal-dim bg-surface-2 px-3.5 py-2 font-mono text-[11px] font-medium tracking-wide text-muted-foreground hover:border-foreground/20 hover:bg-surface-3 hover:text-foreground uppercase"
            aria-label={`View ${title} source code on GitHub`}
          >
            <Github className="size-3" />
            {"Source"}
          </a>
        </div>
      </div>
    </article>
  )
}
