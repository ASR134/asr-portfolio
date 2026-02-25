"use client"

import { skills, skillCategories, type SkillCategory } from "@/data/portfolio"

function SkillCell({ label, shortLabel }: { label: string; shortLabel: string }) {
  return (
    <div
      className="group relative flex size-16 cursor-default items-center justify-center border border-terminal-dim transition-all duration-300 hover:border-terminal-green hover:shadow-[0_0_12px_-4px_rgba(0,255,135,0.3)]"
      title={label}
      role="gridcell"
    >
      <span className="font-mono text-xs font-bold tracking-wider text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-terminal-green">
        {shortLabel}
      </span>
      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-card px-2 py-1 font-mono text-[10px] text-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 border border-terminal-dim">
        {label}
      </span>
    </div>
  )
}

function CategoryRow({ category }: { category: SkillCategory }) {
  const categorySkills = skills.filter((s) => s.category === category)

  return (
    <div>
      {/* Category label - full width glowing header */}
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-terminal-green uppercase">
          {"/// "}
          {category.toUpperCase()}
          {" ///"}
        </span>
        <div className="h-px flex-1 bg-terminal-dim" />
      </div>

      {/* Grid of cells */}
      <div className="flex flex-wrap gap-1" role="row">
        {categorySkills.map((skill) => (
          <SkillCell
            key={skill.label}
            label={skill.label}
            shortLabel={skill.shortLabel}
          />
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="blueprint-grid py-24 px-6 md:px-12 lg:px-24"
      aria-label="Skills"
    >
      {/* Section label */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">{"03"}</span>
          {" / SKILLS"}
        </p>
      </div>

      <div className="max-w-3xl flex flex-col gap-8" role="grid" aria-label="Skills grid">
        {skillCategories.map((category) => (
          <CategoryRow key={category} category={category} />
        ))}
      </div>
    </section>
  )
}
