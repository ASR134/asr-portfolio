"use client"

import { useEffect, useRef, useState } from "react"
import { techStack, type TechStackCategory } from "@/data/portfolio"

// ============================================================
// SkillBadge — larger icon, more padding, glow on hover
// ============================================================
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
      className="hover-badge-glow group inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-mono text-sm tracking-wide focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:outline-none"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `var(--surface-1)`,
        color: "#E8ECF1",
      }}
      tabIndex={0}
      role="listitem"
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${color}60`
        el.style.backgroundColor = `var(--surface-2)`
        el.style.boxShadow = `0 0 24px ${color}20, 0 0 8px ${color}15`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${color}25`
        el.style.backgroundColor = `var(--surface-1)`
        el.style.boxShadow = "none"
      }}
    >
      {iconSlug ? (
        <img
          src={`https://cdn.simpleicons.org/${iconSlug}/${hexColor}`}
          alt=""
          width={20}
          height={20}
          className="size-5 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
          loading="lazy"
        />
      ) : (
        <span
          className="flex size-5 items-center justify-center rounded text-xs font-bold opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color, textShadow: `0 0 6px ${color}40` }}
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

// ============================================================
// SkillCategoryGroup — bolder title, accent underline, entrance animation
// ============================================================
function SkillCategoryGroup({
  category,
  index,
}: {
  category: TechStackCategory
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-4"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Category heading — larger, bolder, with hover sweep */}
      <div className="flex items-center gap-3">
        <span
          className="size-2.5 rounded-full shrink-0"
          style={{
            backgroundColor: category.color,
            boxShadow: `0 0 8px ${category.color}50`,
          }}
          aria-hidden="true"
        />
        <h3
          className="category-header-hover font-mono text-sm font-semibold tracking-widest uppercase"
          style={{ color: category.color }}
        >
          {category.title}
        </h3>
        <span
          className="h-px grow opacity-25"
          style={{ backgroundColor: category.color }}
          aria-hidden="true"
        />
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2.5" role="list" aria-label={`${category.title} skills`}>
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

// ============================================================
// SkillsSection — larger section title, more vertical spacing
// ============================================================
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-28 px-6 md:px-12 lg:px-24"
      aria-label="Tech Stack"
    >
      {/* Section title — bigger */}
      <div className="mb-16 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <svg
            width="22"
            height="22"
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
            <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
              <span className="text-terminal-green font-semibold">{"03"}</span>
              {" / "}
              <span className="text-foreground font-semibold">TECH STACK</span>
            </p>
          </div>
        </div>
        <span className="h-px grow bg-border" aria-hidden="true" />
      </div>

      {/* Category groups — increased gap */}
      <div className="flex flex-col gap-10 max-w-4xl">
        {techStack.map((category, i) => (
          <SkillCategoryGroup key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}
