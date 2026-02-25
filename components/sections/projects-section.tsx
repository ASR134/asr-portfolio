"use client"

import { ProjectCard } from "./project-card"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-6 md:px-12 lg:px-24" aria-label="Featured projects">
      {/* Section label */}
      <div className="mb-14">
        <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green font-semibold">{"02"}</span>
          {" / "}
          <span className="text-foreground font-semibold">{"PROJECTS"}</span>
        </p>
        <p className="mt-3 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
          {"A selection of recent projects spanning machine learning, data visualization, and developer tooling."}
        </p>
      </div>

      {/* 3-column responsive grid */}
      <div
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Project cards"
      >
        {projects.map((project) => (
          <div key={project.title} role="listitem">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}
