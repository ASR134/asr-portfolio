"use client"

import { ProjectCard } from "./project-card"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24" aria-label="Featured projects">
      {/* Section label */}
      <div className="mb-10 px-6 md:px-12 lg:px-24">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">{"02"}</span>
          {" / PROJECTS"}
        </p>
      </div>

      {/* Horizontal scroll area */}
      <div className="relative">
        <div
          className="scrollbar-terminal flex gap-6 overflow-x-auto px-6 pb-6 snap-x snap-mandatory md:px-12 lg:px-24"
          role="list"
          aria-label="Project cards"
        >
          {projects.map((project) => (
            <div key={project.title} className="snap-start" role="listitem">
              <ProjectCard {...project} />
            </div>
          ))}
          {/* End spacer for scroll */}
          <div className="w-6 shrink-0 md:w-12 lg:w-24" aria-hidden="true" />
        </div>

        {/* Scroll hint */}
        <div className="mt-4 flex items-center gap-2 px-6 md:px-12 lg:px-24">
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            {"scroll"}
          </span>
          <span className="animate-scroll-hint inline-block font-mono text-xs text-terminal-green">
            {"->"}
          </span>
        </div>
      </div>
    </section>
  )
}
