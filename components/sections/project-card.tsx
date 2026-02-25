"use client"

import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/data/portfolio"

const categoryColors: Record<string, string> = {
  ml: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  frontend: "bg-sky-500/15 text-sky-300 border-sky-500/20",
  backend: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  devops: "bg-amber-500/15 text-amber-300 border-amber-500/20",
}

export function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  demoUrl,
}: Project) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-white/[0.08] bg-card/50 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/10">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.label}
              variant="outline"
              className={`text-[11px] font-medium ${categoryColors[tag.category]}`}
            >
              {tag.label}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            asChild
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub`}
            >
              <Github className="size-4" />
            </a>
          </Button>
          {demoUrl && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              asChild
            >
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${title}`}
              >
                <ExternalLink className="size-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
