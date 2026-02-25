"use client"

import type { SkillCategory } from "@/data/portfolio"

const categoryStyles: Record<SkillCategory, string> = {
  "Machine Learning":
    "bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20 hover:shadow-purple-500/10",
  Backend:
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20 hover:shadow-emerald-500/10",
  Frontend:
    "bg-sky-500/10 text-sky-300 border-sky-500/20 hover:bg-sky-500/20 hover:shadow-sky-500/10",
  "Tools & DevOps":
    "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20 hover:shadow-amber-500/10",
}

type SkillBadgeProps = {
  label: string
  category: SkillCategory
}

export function SkillBadge({ label, category }: SkillBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:shadow-md ${categoryStyles[category]}`}
    >
      {label}
    </span>
  )
}
