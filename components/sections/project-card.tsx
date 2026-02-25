"use client"

import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/data/portfolio"

const tagStyles: Record<string, string> = {
  ml: "bg-[#00FF87]/10 text-[#00FF87]",
  frontend: "bg-[#4D9EFF]/10 text-[#4D9EFF]",
  backend: "bg-[#00C2FF]/10 text-[#00C2FF]",
  devops: "bg-[#FFB547]/10 text-[#FFB547]",
}

export function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  demoUrl,
}: Project) {
  return (
    <article
      className="group relative flex w-[280px] shrink-0 flex-col border border-terminal-dim bg-card transition-all duration-300 hover:border-l-terminal-green hover:shadow-[0_0_20px_-8px_rgba(0,255,135,0.15)] sm:w-[300px]"
      style={{ height: "420px" }}
    >
      {/* Left accent border */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-terminal-dim transition-colors duration-300 group-hover:bg-terminal-green group-hover:shadow-[0_0_8px_rgba(0,255,135,0.4)]" />

      {/* Noise texture top area */}
      <div className="noise-texture h-28 w-full border-b border-terminal-dim" />

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-4">
        <h3 className="font-mono text-lg font-bold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 flex-1 font-mono text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Tags - color coded with full names */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`inline-block px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase ${tagStyles[tag.category] || "bg-muted text-muted-foreground"}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-3 border-t border-terminal-dim pt-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:text-terminal-green uppercase"
            aria-label={`View ${title} on GitHub`}
          >
            <Github className="size-3.5" />
            {"source"}
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground transition-colors hover:text-terminal-cyan uppercase"
              aria-label={`View live demo of ${title}`}
            >
              <ExternalLink className="size-3.5" />
              {"demo"}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
