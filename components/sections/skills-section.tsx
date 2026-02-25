"use client"

import { techStack, type TechStackCategory } from "@/data/portfolio"

function SkillBadge({
  label,
  iconSlug,
  color,
}: {
  label: string
  iconSlug: string | null
  color: string
}) {
  const hexColor = color.replace("#", "")

  return (
    <span
      className="hover-badge-glow group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-xs tracking-wide focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:outline-none"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `${color}08`,
        color: "#E0E6ED",
      }}
      tabIndex={0}
      role="listitem"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${color}60`
        el.style.backgroundColor = `${color}15`
        el.style.boxShadow = `0 0 16px ${color}20, 0 0 4px ${color}15`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${color}25`
        el.style.backgroundColor = `${color}08`
        el.style.boxShadow = "none"
      }}
    >
      {iconSlug ? (
        <img
          src={`https://cdn.simpleicons.org/${iconSlug}/${hexColor}`}
          alt=""
          width={16}
          height={16}
          className="size-4 object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          loading="lazy"
        />
      ) : (
        <span
          className="flex size-4 items-center justify-center rounded-sm text-[10px] font-bold opacity-70 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color }}
          aria-hidden="true"
        >
          {label.charAt(0)}
        </span>
      )}
      <span className="transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>
    </span>
  )
}

function SkillCategoryGroup({ category }: { category: TechStackCategory }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Category heading */}
      <div className="flex items-center gap-2.5">
        <span
          className="size-2 rounded-full shrink-0"
          style={{ backgroundColor: category.color }}
          aria-hidden="true"
        />
        <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: category.color }}>
          {category.title}
        </h3>
        <span
          className="h-px grow opacity-20"
          style={{ backgroundColor: category.color }}
          aria-hidden="true"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2" role="list" aria-label={`${category.title} skills`}>
        {category.skills.map((skill) => (
          <SkillBadge
            key={skill.label}
            label={skill.label}
            iconSlug={skill.iconSlug}
            color={category.color}
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
      className="py-24 px-6 md:px-12 lg:px-24"
      aria-label="Tech Stack"
    >
      {/* Section title */}
      <div className="mb-12 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-terminal-green"
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <div>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              <span className="text-terminal-green">{"03"}</span>
              {" / TECH STACK"}
            </p>
          </div>
        </div>
        <span className="h-px grow bg-border" aria-hidden="true" />
      </div>

      {/* Category groups */}
      <div className="flex flex-col gap-8 max-w-4xl">
        {techStack.map((category) => (
          <SkillCategoryGroup key={category.title} category={category} />
        ))}
      </div>
    </section>
  )
}
