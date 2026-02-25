"use client"

import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/data/portfolio"

const categoryColors: Record<string, string> = {
  ml: "text-terminal-green",
  frontend: "text-terminal-cyan",
  backend: "text-secondary-foreground",
  devops: "text-muted-foreground",
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

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={`font-mono text-[10px] tracking-wider uppercase ${categoryColors[tag.category]}`}
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
