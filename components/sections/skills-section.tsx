"use client"

import { useEffect, useRef, useState } from "react"
import { techStack, type TechStackCategory } from "@/data/portfolio"

// ============================================================
// SkillBadge — icon pulse on hover, smooth scale-up entrance
// ============================================================
function SkillBadge({
  label,
  iconSlug,
  color,
  index,
  groupVisible,
}: {
  label: string
  iconSlug: string | null
  color: string
  index: number
  groupVisible: boolean
}) {
  const hexColor = color.replace("#", "")
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className="hover-badge-glow group inline-flex items-center gap-2.5 rounded-full border px-4 py-2.5 font-mono text-sm tracking-wide focus-visible:ring-2 focus-visible:ring-terminal-green focus-visible:outline-none cursor-default"
      style={{
        borderColor: hovered ? `${color}60` : `${color}25`,
        backgroundColor: hovered ? `var(--surface-2)` : `var(--surface-1)`,
        color: "#F0F4F8",
        boxShadow: hovered ? `0 0 24px ${color}20, 0 0 8px ${color}15` : "none",
        // Staggered entrance
        opacity: groupVisible ? 1 : 0,
        transform: groupVisible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.9)",
        transition: `opacity 0.4s ease ${index * 40}ms, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 40}ms, border-color 0.2s, background-color 0.2s, box-shadow 0.2s`,
      }}
      tabIndex={0}
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {iconSlug ? (
        <img
          src={`https://cdn.simpleicons.org/${iconSlug}/${hexColor}`}
          alt=""
          width={20}
          height={20}
          className="size-5 object-contain"
          style={{
            opacity: hovered ? 1 : 0.8,
            filter: hovered ? `drop-shadow(0 0 6px ${color}70)` : `drop-shadow(0 0 4px ${color}40)`,
            transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "opacity 0.3s, filter 0.3s, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          loading="lazy"
        />
      ) : (
        <span
          className="flex size-5 items-center justify-center rounded text-xs font-bold"
          style={{
            color,
            textShadow: hovered ? `0 0 10px ${color}60` : `0 0 6px ${color}40`,
            transform: hovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), text-shadow 0.3s",
          }}
          aria-hidden="true"
        >
          {label.charAt(0)}
        </span>
      )}
      <span
        style={{
          color: hovered ? "var(--foreground)" : undefined,
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>
    </span>
  )
}

// ============================================================
// SkillCategoryGroup
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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex flex-col items-start gap-3.5 text-left"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Category heading */}
      <div className="flex w-full items-center justify-start gap-3">
        <span
          className="size-2.5 rounded-full shrink-0 transition-all duration-300"
          style={{
            backgroundColor: category.color,
            boxShadow: visible ? `0 0 12px ${category.color}60` : `0 0 4px ${category.color}30`,
          }}
          aria-hidden="true"
        />
        <h3
          className="category-header-hover rounded-full border bg-surface-1 px-4 py-1.5 font-mono text-xs font-semibold tracking-[0.18em] uppercase sm:text-sm transition-all duration-300 hover:bg-surface-2"
          style={{
            color: category.color,
            borderColor: `${category.color}35`,
          }}
        >
          {category.title}
        </h3>
        {/* Animated line that grows on visible */}
        <span
          className="h-px flex-1 opacity-25 transition-all duration-700"
          style={{
            backgroundColor: category.color,
            width: visible ? "100%" : "0%",
            transitionDelay: `${index * 120 + 200}ms`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Badges — staggered entrance per badge */}
      <div className="flex flex-wrap justify-start gap-2" role="list" aria-label={`${category.title} skills`}>
        {category.skills.map((skill, i) => (
          <SkillBadge
            key={skill.label}
            label={skill.label}
            iconSlug={skill.iconSlug}
            color={category.color}
            index={i}
            groupVisible={visible}
          />
        ))}
      </div>
    </div>
  )
}

// ============================================================
// SkillsSection
// ============================================================
export function SkillsSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      className="px-6 py-24 md:px-12 md:py-28 lg:px-24"
      aria-label="Tech Stack"
    >
      {/* Section title — fade + slide in */}
      <div
        ref={titleRef}
        className="mb-14 mx-auto flex w-full max-w-5xl flex-col items-start gap-3.5 pl-1 text-left"
        style={{
          opacity: titleVisible ? 1 : 0,
          transform: titleVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="flex items-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-terminal-green"
            style={{
              filter: titleVisible ? "drop-shadow(0 0 6px rgba(0,255,135,0.4))" : "none",
              transition: "filter 0.6s ease 0.3s",
            }}
            aria-hidden="true"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <span className="text-terminal-green font-semibold">{"03"}</span>
            {" / "}
            <span className="text-foreground font-semibold">TECH STACK</span>
          </p>
        </div>
        <h2 className="self-start text-left font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-header-glow">
          Core Skills & Technologies
        </h2>
      </div>

      {/* Category groups */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        {techStack.map((category, i) => (
          <SkillCategoryGroup key={category.title} category={category} index={i} />
        ))}
      </div>
    </section>
  )
}