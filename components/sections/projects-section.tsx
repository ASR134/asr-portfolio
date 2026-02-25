import { SectionHeader } from "./section-header"
import { ProjectCard } from "./project-card"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24" aria-label="Featured projects">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Featured Projects"
          subtitle="A selection of projects that showcase my skills across machine learning, full-stack development, and open-source tooling."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}
