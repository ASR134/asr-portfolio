"use client"

import { skills, skillCategories, categoryColorMap, type SkillCategory } from "@/data/portfolio"

function LegendRow() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2">
      {skillCategories.map((cat) => (
        <div key={cat} className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: categoryColorMap[cat] }}
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            {cat}
          </span>
        </div>
      ))}
    </div>
  )
}

function SkillIcon({ slug, color }: { slug: string | null; color: string }) {
  if (!slug) {
    return (
      <span
        className="flex size-7 items-center justify-center text-base leading-none"
        aria-hidden="true"
      >
        {"🧠"}
      </span>
    )
  }
  const hexColor = color.replace("#", "")
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${hexColor}`}
      alt=""
      width={28}
      height={28}
      className="size-7 object-contain"
      loading="lazy"
    />
  )
}

function SkillCell({ label, category, iconSlug }: { label: string; category: SkillCategory; iconSlug: string | null }) {
  const catColor = categoryColorMap[category]

  return (
    <div
      className="skill-cell group relative flex h-24 w-[120px] cursor-default flex-col items-center justify-center gap-1.5 border border-[rgba(0,255,135,0.12)] bg-transparent transition-all duration-300 hover:border-[rgba(0,255,135,0.5)] hover:bg-[rgba(0,255,135,0.04)]"
      style={{ "--cat-color": catColor } as React.CSSProperties}
    >
      {/* Category dot top-right */}
      <span
        className="absolute right-1.5 top-1.5 size-2 rounded-full"
        style={{ backgroundColor: catColor }}
        aria-hidden="true"
      />

      {/* Icon with hover glow */}
      <div className="transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_6px_var(--cat-color))]">
        <SkillIcon slug={iconSlug} color={catColor} />
      </div>

      {/* Skill name */}
      <span className="text-center font-mono text-[10px] leading-tight tracking-wide text-muted-foreground transition-all duration-300 group-hover:text-terminal-green group-hover:[text-shadow:0_0_8px_rgba(0,255,135,0.5)]">
        {label}
      </span>
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

      {/* Legend */}
      <LegendRow />

      {/* Skill grid */}
      <div
        className="grid gap-1.5"
        style={{ gridTemplateColumns: "repeat(auto-fill, 120px)" }}
        role="list"
        aria-label="Skills grid"
      >
        {skills.map((skill) => (
          <div key={skill.label} role="listitem">
            <SkillCell label={skill.label} category={skill.category} iconSlug={skill.iconSlug} />
          </div>
        ))}
      </div>
    </section>
  )
}
