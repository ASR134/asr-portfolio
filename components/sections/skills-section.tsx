"use client"

import { skills, skillCategories, categoryColorMap, type SkillCategory } from "@/data/portfolio"

function LegendRow() {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-6">
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
        className="flex size-7 items-center justify-center text-lg transition-all duration-300 group-hover:[filter:drop-shadow(0_0_6px_var(--glow-color))]"
        style={{ "--glow-color": color } as React.CSSProperties}
        aria-hidden="true"
      >
        {"🧠"}
      </span>
    )
  }
  // Strip the # from the hex for Simple Icons CDN color param
  const hexColor = color.replace("#", "")
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}/${hexColor}`}
      alt=""
      width={28}
      height={28}
      className="size-7 object-contain transition-all duration-300 group-hover:[filter:drop-shadow(0_0_6px_var(--glow-color))]"
      style={{ "--glow-color": color } as React.CSSProperties}
      loading="lazy"
    />
  )
}

function SkillCell({ label, category, iconSlug }: { label: string; category: SkillCategory; iconSlug: string | null }) {
  const catColor = categoryColorMap[category]

  return (
    <div
      className="skill-cell group relative flex h-24 w-[120px] cursor-default flex-col items-center justify-center gap-1.5 border transition-all duration-300"
      style={{
        borderColor: "rgba(0,255,135,0.15)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = "rgba(0,255,135,0.6)"
        el.style.backgroundColor = "rgba(0,255,135,0.05)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = "rgba(0,255,135,0.15)"
        el.style.backgroundColor = "transparent"
      }}
    >
      {/* Category dot in top-right */}
      <span
        className="absolute right-1.5 top-1.5 size-2 rounded-full"
        style={{ backgroundColor: catColor }}
        aria-hidden="true"
      />
      {/* Icon */}
      <SkillIcon slug={iconSlug} color={catColor} />
      {/* Skill name */}
      <span className="font-mono text-[10px] leading-tight tracking-wide text-muted-foreground transition-all duration-300 group-hover:text-terminal-green group-hover:[text-shadow:0_0_8px_#00FF87]">
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
      <div className="flex flex-wrap gap-1" role="grid" aria-label="Skills grid">
        {skills.map((skill) => (
          <SkillCell key={skill.label} label={skill.label} category={skill.category} iconSlug={skill.iconSlug} />
        ))}
      </div>
    </section>
  )
}
